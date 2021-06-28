<!--
 * @Description: Git文件
 * @Author: xiehuaqiang
 * @FilePath: \kaka-blog\src\docs\kaka\git\Git内部原理之Git对象hash.md
 * @Date: 2021-07-31 19:31:23
 * @LastEditTime: 2021-07-31 20:23:12
-->

# Git 内部原理之 Git 对象哈希

## Git 对象的 hash 方法

Git 中的数据对象、树对象和提交对象的 hash 方法原理是一样的，可以描述为：

```bash
header = "<type> " + content.length + "\0"
hash = sha1(header + content)
```

上面公式表示，Git 在计算对象 hash 时，首先会在对象头部添加一个 `header` 。这个 `header` 由 3 部分组成：第一部分表示对象的类型，可以取值 `blob`、 `tree`、 `commit` 以分别表示数据对象、树对象、提交对象；第二部分是数据的字节长度；第三部分是一个空字节，用来将 `header` 和 `content` 分隔开。将 `header` 添加到 `content` 头部之后，使用 sha1 算法计算出一个 40 位的 `hash` 值。

在手动计算 Git 对象的 hash 时，有两点需要注意：

- 1.`header` 中第二部分关于数据长度的计算，一定是字节的长度而不是字符串的长度；
- 2.`header + content` 的操作并不是字符串级别的拼接，而是二进制级别的拼接。

各种 Git 对象的 `hash` 方法相同，不同的在于：

- 1.头部类型不同，数据对象是 `blob`，树对象是 `tree`，提交对象是 `commit`；
- 2.数据内容不同，数据对象的内容可以是任意内容，而树对象和提交对象的内容有固定的格式。

接下来分别讲数据对象、树对象和提交对象的具体的 `hash` 方法。

### 数据对象

数据对象的格式如下：

```bash
blob <content length><NULL><content>
```

从上一篇[文章]()中我们知道，使用 `git hash-object` 可以计算出一个 40 位的 `hash` 值，例如：

```bash
$ echo -n "what is up, doc?" | git hash-object --stdin
bd9dbf5aae1a3862dd1526723246b20206e5fc37
```

注意，上面在 `echo` 后面使用了`-n` 选项，用来阻止自动在字符串末尾添加换行符，否则会导致实际传给 `git hash-object` 是 `what is up, doc?\n`，而不是我们直观认为的 `what is up, doc?`。

为验证前面提到的 Git 对象 hash 方法，我们使用 `openssl sha1` 来手动计算 `what is up, doc?`的 hash 值：

```bash
$ echo -n "blob 16\0what is up, doc?" | openssl sha1
bd9dbf5aae1a3862dd1526723246b20206e5fc37
```

可以发现，手动计算出的 `hash` 值与 `git hash-object` 计算出来的一模一样。

在 Git 对象 `hash` 方法的注意事项中，提到`header`中第二部分关于数据长度的计算，一定是字节的长度而不是字符串的长度。由于 `what is up, doc?`只有英文字符，在 UTF8 中恰好字符的长度和字节的长度都等于 16，很容易将这个长度误解为字符的长度。假设我们以中文来试验：

```bash
$ echo -n "中文" | git hash-object --stdin
efbb13322ba66f682e179ebff5eeb1bd6ef83972
$ echo -n "blob 2\0中文" | openssl sha1
d1dc2c3eed26b05289bddb857713b60b8c23ed29
```

我们可以看到，`git hash-object` 和 `openssl sha1` 计算出来的 `hash` 值根本不一样。这是因为中文两个字符作为 UTF 格式存储后的字符长度不是 2，具体是多少呢？可以使用 wc 来计算：

```bash
$ echo -n "中文" | wc -c
6
```

`中文`字符串的字节长度是 6，重新手动计算发现得出的 `hash` 值就能对应上了：

```bash
$ echo -n "blob 6\0中文" | openssl sha1
efbb13322ba66f682e179ebff5eeb1bd6ef83972
```

### 数对象

树对象的内容格式如下：

```bash
tree <content length><NUL><file mode> <filename><NUL><item sha>...
```

需要注意的是，`<item sha>` 部分是二进制形式的 `sha1` 码，而不是十六进制形式的 `sha1` 码。

我们从上一篇[文章]()摘出一个树对象做实验，其内容如下：

```bash
$ git cat-file -p d8329fc1cc938780ffdd9f94e0d364e0ea74f579
100644 blob 83baae61804e65cc73a7201a7252750c76066a30  test.txt
```

我们首先使用 `xxd` 把 `83baae61804e65cc73a7201a7252750c76066a30` 转换成为二进制形式，并将结果保存为 `sha1.txt` 以方便后面做追加操作：

```bash
$ echo -n "83baae61804e65cc73a7201a7252750c76066a30" | xxd -r -p > sha1.txt
$ cat tree-items.txt
���a�Ne�s� rRu
              vj0%
```

接下来构造 `content` 部分，并保存至文件 `content.tx`t：

```bash
$ echo -n "100644 test.txt\0" | cat - sha1.txt > content.txt
$ cat content.txt
100644 test.txt���a�Ne�s� rRu
                             vj0%
```

计算 `content` 的长度：

````bash
$ cat content.txt | wc -c
36
那么最终该树对象的内容为：

```bash
$ echo -n "tree 36\0" | cat - content.txt
tree 36100644 test.txt���a�Ne�s� rRu
                                    vj0%
````

最后使用 `openssl sha1` 计算 `hash` 值，可以发现和实验的 `hash` 值是一样的：

```bash
$ echo -n "tree 36\0" | cat - content.txt | openssl sha1
d8329fc1cc938780ffdd9f94e0d364e0ea74f579
```

### 提交对象

提交对象的格式如下：

```bash
commit <content length><NUL>tree <tree sha>
parent <parent sha>
[parent <parent sha> if several parents from merges]
author <author name> <author e-mail> <timestamp> <timezone>
committer <author name> <author e-mail> <timestamp> <timezone>

<commit message>
```

我们从上一篇[文章]()摘出一个提交对象做实验，其内容如下：

```bash
$ echo 'first commit' | git commit-tree d8329fc1cc938780ffdd9f94e0d364e0ea74f579
db1d6f137952f2b24e3c85724ebd7528587a067a
$ git cat-file -p db1d6f137952f2b24e3c85724ebd7528587a067a
tree d8329fc1cc938780ffdd9f94e0d364e0ea74f579
author jingsam <jing-sam@qq.com> 1528022503 +0800
committer jingsam <jing-sam@qq.com> 1528022503 +0800

first commit
```

这里需要注意的是，由于`echo 'first commit'`没有添加-n 选项，因此实际的提交信息是`first commit\n`。使用 wc 计算出提交内容的字节数：

```bash
$ echo -n "tree d8329fc1cc938780ffdd9f94e0d364e0ea74f579
author jingsam <jing-sam@qq.com> 1528022503 +0800
committer jingsam <jing-sam@qq.com> 1528022503 +0800

first commit\n" | wc -c
163
```

那么，这个提交对象的 `header` 就是`commit 163\0`，手动把头部添加到提交内容中：

```bash
commit 163\0tree d8329fc1cc938780ffdd9f94e0d364e0ea74f579
author jingsam <jing-sam@qq.com> 1528022503 +0800
committer jingsam <jing-sam@qq.com> 1528022503 +0800

first commit\n
```

使用 `openssl sha1` 计算这个上面内容的 `hash` 值：

```bash
$ echo -n "commit 163\0tree d8329fc1cc938780ffdd9f94e0d364e0ea74f579
author jingsam <jing-sam@qq.com> 1528022503 +0800
committer jingsam <jing-sam@qq.com> 1528022503 +0800

first commit\n" | openssl sha1
db1d6f137952f2b24e3c85724ebd7528587a067a
```

可以看见，与实验的 hash 值是一样的。

## 总结

这篇文章详细地分析了 Git 中的`数据对象`、`树对象`和`提交对象`的 `hash` 方法，可以发现原理是非常简单的。数据对象和提交对象打印出来的内容与存储内容组织是一模一样的，可以很直观的理解。对于树对象，其打印出来的内容和实际存储是有区别的，增加了一些实现上的难度。例如，使用二进制形式的 hash 值而不是直观的十六进制形式，我现在还没有从已有资料中搜到这么设计的理由，这个问题留待以后解决。

[阅读原文](https://jingsam.github.io/2018/06/09/git-hash.html)
