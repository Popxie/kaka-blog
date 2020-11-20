<!--
 * @Description: 
 * @Author: xiehuaqiang
 * @FilePath: /kaka-blog/src/docs/kaka/unpublished/终端shell命令解析.md
 * @Date: 2021-06-17 21:20:56
 * @LastEditTime: 2021-06-17 21:21:00
-->

# 终端shell命令解析

```bash
scp kada.official.web.zip web@10.0.10.61:/home/admin/software/
```

```bash
# drwxr-xr-x =>    d      rwx  r-x    r-x
#              directory  user group other
r read
w write
x excute

chmod u+x run.sh  # 加x给 run.sh 增加x权限
```

```js
unzip kada.official.web.zip // 解压
```

```bash
# man(ual) ( 手册)
man unzip 
```

```bash
uname -a  # 查看操作系统版本
```

```bash
# 查看文件md5编码，用来验证文件是否相同

md5sum kada.official.web.zip 

md5 kada.official.web.zip   
```

```bash
 pwd  # 打印工作目录
```