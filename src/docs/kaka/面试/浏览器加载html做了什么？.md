<!--
 * @Description: 
 * @Author: xiehuaqiang
 * @FilePath: /kaka-blog/src/docs/kaka/面试/浏览器加载html做了什么？.md
 * @Date: 2022-02-14 22:29:40
 * @LastEditTime: 2022-02-14 22:37:16
-->

# 浏览器加载html时做了什么?

![浏览器加载html时做了什么](https://user-images.githubusercontent.com/24952644/153883537-af5a2076-65fe-4b2b-95b6-480644b9f704.png)

所有浏览器的引擎工作流程都差不多，如上图大致分5步：

> 创建DOM tree –> 创建Style Rules -> 构建Render tree -> 布局Layout –> 绘制Painting

- 第一步，用HTML分析器，分析HTML元素，构建一颗DOM树。

- 第二步：用CSS分析器，分析CSS文件和元素上的inline样式，生成页面的样式表。

- 第三步：将上面的DOM树和样式表，关联起来，构建一颗Render树。这一过程又称为Attachment。每个DOM节点都有attach方法，接受样式信息，返回一个render对象（又名renderer）。这些render对象最终会被构建成一颗Render树。

- 第四步：有了Render树后，浏览器开始布局，会为每个Render树上的节点确定一个在显示屏上出现的精确坐标值。

- 第五步：Render数有了，节点显示的位置坐标也有了，最后就是调用每个节点的paint方法，让它们显示出来。


