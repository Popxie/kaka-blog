<!--
 * @Description: Git文件
 * @Author: xiehuaqiang
 * @FilePath: \kaka-blog\src\docs\kaka\git\git标识.md
 * @Date: 2021-06-24 14:40:54
 * @LastEditTime: 2021-07-31 23:06:57
-->

# Git 标识 A,C,D,M,R,T,U,X

> 在开发过程中我们经常会看到文件变更后末尾都会有 `A`,`U`,`M`,`D`,`R` 等符号,那么这些符号到底什么含义呢?

| 标识 | 作用                             |
| ---- | -------------------------------- |
| `A`  | 增加的文件. (git add .) U 变成 A |
| `C`  | 文件的一个新拷贝.                |
| `D`  | 删除的一个文件.                  |
| `M`  | 文件的内容或者 mode 被修改了.    |
| `R`  | 文件名被修改了。                 |
| `T`  | 文件的类型被修改了。             |
| `U`  | 新增文件 未被 git 跟踪记录       |
| `X`  | 未知状态。                       |

# vscode 代码里的左侧菜单文件颜色标识

| 标识                                  | 作用                                                                                                                                                              |
| ------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <font color="green">绿色</font>       | 未加入版本控制 <font color="green">U</font> <br> 已经加入版本控制(git add .) <font color="green">A</font> <br>被重命名(git rm xxx -r)<font color="green">R</font> |
| <font color="Goldenrod">金黄色</font> | 加入版本控制，已提交，有改动（修改部分）<font color="Goldenrod">M</font>                                                                                          |
| <font color="WhiteSmoke">白色</font>  | 加入版本控制，已提交，无改动。                                                                                                                                    |
| <font color="gray">灰色</font>        | 版本控制已忽略文件。                                                                                                                                              |
