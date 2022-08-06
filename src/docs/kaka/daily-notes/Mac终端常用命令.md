<!--
 * @Description: Terminal文件夹
 * @Author: xiehuaqiang
 * @FilePath: /kaka-blog/src/docs/kaka/daily-notes/Mac终端常用命令.md
 * @Date: 2021-03-03 17:38:15
 * @LastEditTime: 2022-08-06 15:55:56
-->

# Mac Terminal 常用命令

## [mv](https://blog.csdn.net/guoqx/article/details/124031830)

## 1、 [cat](https://blog.csdn.net/weixin_43025071/article/details/122416263) （读取 ||创建 || 合并）

```bash
cat xxx  # 直接在终端里显示xxx文件（不是文件夹）的内容（只读）
```

## 2.1、vim（编辑 || 读取 || 新建）

```bash
vim  xxx  # 查看当前xxx文件的内容
```

打开终端以后各种模式下的命令

- 写入模式

  ```bash
  :q  # 退出，如果对缓冲区进行修改过，则会提示
  :q! # 强制退出，放弃修改
  :w  # 保存修改
  :wq # 保存修改并退出
  ```

- 非写入模式

  ```bash
  u     # 是撤销上次修改
  cc    # 删除当前行 并进入insert模式(非写入状态时)
  gg    # 返回顶部
  shift + g # 前往底部
  dd    # 删除当前行 (${n}dd 从当前行向下删除n行,eg: 3dd, 4dd)
  set nu        # 显示行序号
  set nonumber  # 关闭显示行序号
  shitf + g     # 返回到底部
  gg            # 顶部
  control + d   # 半屏翻页
  control + A || E # 命令行头部 或 尾部
  /xxxx       # 查找xxxxx
  :set hls    # 高亮：
  :%s/pick/s  #将所有pick替换成s
  ```

## 2.2 echo 新建文件

```bash
# 创建内容为 console.log(1) 的test.js文件
echo "console.log(1)" > test.js  # 同理可以创建其他的后缀的文件
```

结果如下

```js
// test.js
console.log(1)
```

## 3 ls

```bash
ls                   # 查看当前文件下的包含的文件
ls -a   ||   ls -all # 查看当前目录所有文件（包含隐藏文件）
```

## 4 cd

```bash
cd    # 进入用户主目录；
cd ~  # 进入主目录 （home）
cd -  # 返回上一次目录（历史记录）
cd .. # 返回上一级
cd ../.. # 返回上两级目录；
pwd      # 以绝对路径的方式显示用户当前的工作目录。将当前目录的全路径名称（从根目录）写入标准输出。全部目录使用‘/’分隔。第一个‘/’表示根目录，最后一个目录是当前目录。执行pwd命令可立刻得知您目前所在
```

## 5 删除

```bash
rm -rf xxx # 删除xxx
```

## 6 复制

```bash
cp source_file target_file  #（cp 源文件  目标文件 ）
eg:  cp ./README.md ./test  # 将同级目录的README.md 复制到当前目录的test文件夹下（如果没有test文件夹系统自动创建）
```
