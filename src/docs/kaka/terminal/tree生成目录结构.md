<!--
 * @Description: Terminal文件夹
 * @Author: xiehuaqiang
 * @FilePath: /kaka-blog/src/docs/kaka/terminal/tree生成目录结构.md
 * @Date: 2021-06-24 17:41:52
 * @LastEditTime: 2021-06-24 18:04:01
-->

# Mac 环境快速生成目录结构树

## 1. 安装 tree

```bash
brew install tree
```

### 2. 参数介绍

```bash
参数选项
-a # 显示所有文件，包括隐藏文件（以  “.” 点开头的文件 ）
-d # 只显示目录
-f # 只显示每个文件的全路径
-i # 不显示树枝，常与-f参数配合使用
-L # level 遍历目录的最大层数，level 为大于0的正整数
-F # 在执行文件、目录、Socket符号链接、管道名称等不同类型文件的结尾，各自加上“*”、 "/"、"="、"@"、"|"号、类似ls命令的-F选项
```

## 3. demo 目录

```bash
# 测试项目的文件层级关系
.
└── src
    └── components
        └── common
            ├── FootCell
            │   └── index.vue
            ├── Pagination
            │   └── index.vue
            ├── Table
            │   └── index.vue
            └── TitleCell
                └── index.vue
```

### 4. 生成指定文件

> 进入到要生成tree目录: `tree [-d] -L ${number} > ${文件名[.后缀]}`

- tree -L 3 > test1.md

  ```bash
  .
  └── src
      └── components
          └── common

  3 directories

  ```

- tree -d -L 3 > test2.md

  ```bash
  .
  ├── src
  │   └── components
  │       └── common

  3 directories, 3 files

  ```

### 5. 不带任何参数，直接调用 tree

```bash
tree # 会在终端直接输出上述demo结果
```

### 6. 以树形结构显示目录下的所有内容（-a 的功能）

```text
.
├── .DS_Store
└── src
    ├── .DS_Store
    └── components
        ├── .DS_Store
        └── common
            ├── .DS_Store
            ├── FootCell
            │   └── index.vue
            ├── Pagination
            │   └── index.vue
            ├── Table
            │   └── index.vue
            └── TitleCell
                └── index.vue

7 directories, 8 files
```

### 7. 只列出目录下第一层目录的结构（-L 功能）

- 一层 `tree -L 1`

  ```text
  .
  └── src
  ```

- 二层 `tree -L 2`

  ```text
  .
  └── src
      └── components
  ```

- 三层 `tree -L 3`

  ```text
  .
  └── src
      └── components
          └── common
  ```

### 8. 显示所有目录（但不显示文件）

- 不带路径 `tree -d`

  > 显示`当前文件`的目录

  ```bash
  KaKa:test hhdd$ tree -d
  # 结果
  .
  └── src
      └── components
          └── common
              ├── FootCell
              ├── Pagination
              ├── Table
              └── TitleCell

  7 directories
  ```

- 带路径 `tree -d ${路径}`

  > 显示`指定路径下的文件`的目录

  ```bash
  KaKa-3:test hhdd$ tree -d /Users/hhdd/Desktop/test
  # 输出结果
  /Users/hhdd/Desktop/test
  └── src
      └── components
          └── common
              ├── FootCell
              ├── Pagination
              ├── Table
              └── TitleCell

  7 directories
  ```

- 带参数 `tree -dL ${number}` || `tree -d -L ${number}`  
  -d 参数只显示目录，-L 参数显示层数

  ```bash
  KaKa-3:test hhdd$ tree -dL 1
  # 结果
  .
  └── src

  1 directory
  ```

### 9. `-f`选项和`-i`选项的使用

> 使用`-f`选项可显示完整的路径名称，使用`-i`选项则不显示树枝部分，示例代码如下：

- `-f` 可显示完整的路径名称

  ```bash
  KaKa-3:test hhdd$ tree -d -L 2 -f
  # 结果
  .
  └── ./src
      └── ./src/components

  2 directories
  ```

- `-i` 不显示树枝部分

  ```bash
  KaKa-3:test hhdd$ tree -d -L 2 -f -i
  # 输出结果
  .
  ./src
  ./src/components

  2 directories
  ```

### 10. 使用 tree 命令 区分 `目录`和`文件`的方法（常用）

> 使用`-F`参数会在目录后面添加 “/ ”，方便区分目录

- 形式 `tree -L ${number} -F [${路径}]`

- 有路径

  ```bash
  KaKa-3:test hhdd$ tree -L 1 -F /Users

  # 输出结果
  /Users
  ├── Guest/
  ├── Shared/
  └── hhdd/

  3 directories, 0 files
  ```

- 无路径参数

  ```bash
  KaKa-3:test hhdd$ tree -L 1 -F

  # 输出结果
  .
  └── src/

  1 directory, 0 files
  ```

- 对比不加 `-F`

  ```bash
  KaKa-3:test hhdd$ tree -L 1

  # 输出结果
  .
  └── src

  1 directory, 0 files
  ```

<!-- [阅读原文](https://blog.51cto.com/scajy/2317151) -->