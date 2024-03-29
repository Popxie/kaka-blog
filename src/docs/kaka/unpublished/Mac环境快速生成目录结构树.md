<!--
 * @Description: Terminal文件夹
 * @Author: xiehuaqiang
 * @FilePath: /kaka-blog/src/docs/kaka/unpublished/Mac环境快速生成目录结构树.md
 * @Date: 2021-06-24 17:41:52
 * @LastEditTime: 2022-05-30 16:48:56
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
#######
-a # 显示所有文件和目录。
-A # 使用 ASNI 绘图字符显示树状图而非以ASCII字符组合。
-C # 在文件和目录清单加上色彩，便于区分各种类型。
-d # 显示目录名称而非内容。
-D # 列出文件或目录的更改时间。
-f # 在每个文件或目录之前，显示完整的相对路径名称。
-F # 在执行文件，目录，Socket，符号连接，管道名称名称，各自加上"*","/","=","@","|"号。
-g # 列出文件或目录的所属群组名称，没有对应的名称时，则显示群组识别码。
-i # 不以阶梯状列出文件或目录名称。
-I # 不显示符合范本样式的文件或目录名称。
-l # 如遇到性质为符号连接的目录，直接列出该连接所指向的原始目录。
-n # 不在文件和目录清单加上色彩。
-N # 直接列出文件和目录名称，包括控制字符。
-p # 列出权限标示。
-P # 只显示符合范本样式的文件或目录名称。
-q # 用"?"号取代控制字符，列出文件和目录名称。
-s # 列出文件或目录大小。
-t # 用文件和目录的更改时间排序。
-u # 列出文件或目录的拥有者名称，没有对应的名称时，则显示用户识别码。
-x # 将范围局限在现行的文件系统中，若指定目录下的某些子目录，其存放于另一个文件系统上，则将该子目录予以排除在寻找范围外。
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

> 进入到要生成 tree 目录: `tree [-d] -L ${number} > ${文件名[.后缀]}`

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
