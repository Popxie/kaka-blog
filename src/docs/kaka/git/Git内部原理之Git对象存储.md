<!--
 * @Description: Git文件
 * @Author: xiehuaqiang
 * @FilePath: \kaka-blog\src\docs\kaka\git\Git内部原理之Git对象存储.md
 * @Date: 2021-07-31 20:25:33
 * @LastEditTime: 2021-07-31 21:31:29
-->

# Git 内部原理之 Git 对象存储

## 原理

数据对象、树对象和提交对象都是存储在`.git/objects` 目录下，目录的结构如下：

```bash
.git
|-- objects
    |-- 01
    |   |-- 55eb4229851634a0f03eb265b69f5a2d56f341
    |-- 1f
    |   |-- 7a7a472abf3dd9643fd615f6da379c4acb3e3a
    |-- 83
        |-- baae61804e65cc73a7201a7252750c76066a30
```

从上面的目录结构可以看出，Git 对象的 40 位 `hash` 分为两部分：头两位作为文件夹，后 38 位作为对象文件名。所以一个 `Git` 对象的存储路径规则为：

```bash
.git/objects/hash[0, 2]/hash[2, 40]
```

这里就产生了一个疑问：为什么 `Git` 要这么设计目录结构，而不直接用 `Git` 对象的 40 位 `hash` 作为文件名？原因是有两点：

- 1.有些文件系统对目录下的文件数量有限制。例如，`FAT32` 限制单目录下的最大文件数量是 65535 个，如果使用 U 盘拷贝 `Git` 文件就可能出现问题。
- 2.有些文件系统访问文件是一个线性查找的过程，目录下的文件越多，访问越慢。

在在 `Git` 内部原理之 `Git` 对象哈希中，我们知道 `Git` 对象会在原内容前加个一个头部：

```bash
store = header + content
```

Git 对象在存储前，会使用 `zlib` 的 `deflate` 算法进行压缩，即简要描述为：

```bash
zlib_store = zlib.deflate(store)
```

压缩后的 `zlib_store` 按照 `Git` 对象的路径规则存储到`.git/objects` 目录下。

总结下 Git 对象存储的算法步骤：

- 1.计算 `content` 长度，构造 `header` ;
- 2.将 `header` 添加到 `content` 前面，构造 `Git` 对象；
- 3.使用 `sha1` 算法计算 `Git` 对象的 40 位 `hash` 码；
- 4.使用 `zlib` 的 `deflate` 算法压缩 `Git` 对象；
- 5.将压缩后的 `Git` 对象存储到`.git/objects/hash[0, 2]/hash[2, 40]`路径下;

## Nodejs 实现

接下来，我们使用 `Nodejs` 来实现 `git hash-object -w` 的功能，即计算 Git 对象的 `hash` 值并存储到 Git 文件系统中：

```js
const fs = require('fs')
const crypto = require('crypto')
const zlib = require('zlib')

function gitHashObject(content, type) {
  // 构造header
  const header = `${type} ${Buffer.from(content).length}\0`

  // 构造Git对象
  const store = Buffer.concat([Buffer.from(header), Buffer.from(content)])

  // 计算hash
  const sha1 = crypto.createHash('sha1')
  sha1.update(store)
  const hash = sha1.digest('hex')

  // 压缩Git对象
  const zlib_store = zlib.deflateSync(store)

  // 存储Git对象
  fs.mkdirSync(`.git/objects/${hash.substring(0, 2)}`)
  fs.writeFileSync(`.git/objects/${hash.substring(0, 2)}/${hash.substring(2, 40)}`, zlib_store)

  console.log(hash)
}

// 调用入口
gitHashObject(process.argv[2], process.argv[3])
```

最后，测试下能否正确存储 Git 对象：

```bash
$ node index.js 'hello, world' blob
8c01d89ae06311834ee4b1fab2f0414d35f01102

$ git cat-file -p 8c01d89ae06311834ee4b1fab2f0414d35f01102
hello, world
```

由此可见，我们生成了一个合法的 Git 数据对象，证明算法是正确的。

[阅读原文](https://jingsam.github.io/2018/06/15/git-storage.html)
