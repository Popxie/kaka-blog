<!--
 * @Description:
 * @Author: xiehuaqiang
 * @FilePath: \kaka-blog\.vscode\将本地初始化项目提交到Github远端仓库.md
 * @Date: 2021-07-31 21:21:14
 * @LastEditTime: 2021-07-31 21:22:32
-->

# 将本地初始化项目提交到 Github 远端仓库

## 前置条件

- 本地项目未被 git 跟踪（git init）
- 还未创建 git 仓库（存放当前本地项目）

## 方式一

- 1.创建 GitHub 仓库地址

- 2.执行下列命令 方式 1

  ```bash
  1. git init # 初始化git配置
  2. git add . # 暂存文件
  3. git commit -m xxxx # 提交commit
  4. git remote add <名称> <地址>`   # 名称可以随便写，建议跟项目名保持一致 地址即第一步生成的仓库地址
  5. git push --set-upstream <名称> master # 推送到远端 ok~
  ```

  > 正常情况下如项目没有被 Git 跟踪，直接 push 的话就会提示已下提示

  ```bash
  fatal: 没有配置推送目标。
  或通过命令行指定 URL，或用下面命令配置一个远程仓库

      git remote add <名称> <地址>

  然后使用该远程仓库名执行推送

      git push <名称>
  ```

## 方式二

```bash
1. git init # 初始化git配置
2. git add . # 暂存文件
3. git commit -m xxxx # 提交commit
4. git remote add origin <地址> # git remote add origin git@github.com:Popxie/temp.git
5. git push --set-upstream origin master # 推送到远端 ok~
```

## 方式三

通过命令行工具将已存在的项目推送到远端

```bash
git remote add origin <仓库地址>
git branch -M main
git push -u origin main
```

这里要说明一下 GitHub 在 2020 年的时候就对 `master` 名进行了 [rename]()，改成 `main` 了 所以还是推荐使用方式三
