<!--
 * @Description: Git文件夹
 * @Author: xiehuaqiang
 * @FilePath: /kaka-blog/src/docs/kaka/git/配置ssh key.md
 * @Date: 2021-08-23 17:03:54
 * @LastEditTime: 2021-08-23 17:22:08
-->

# GitHub 如何配置 ssh key

## 前提须知

首先要知道自己的电脑有个全局的 `.gitconfig` 文件里面有个 `email`，这个是关键后面要用到！

```bash
  $ vim ~/.gitconfig
```

```bash
[user]
    name = "xiehuaqiang"
    email = mrxiehuaqiang@163.com # 后面要用到！
[alias]
    sta = status
    com = commit
    che = checkout
    br = branch
    unstage = reset HEAD --
    last = log -1 HEAD
[color]
    branch = auto
    diff = auto
    status = auto
    ui = auto
[color "branch"]
    current = magenta
    local = yellow
    remote = cyan
```

## 先问题描述？

就在根据 `GitHub` 官网设置 `ssh` 完以后，出现了一个问题，就是从 `GitHub` 上通过 `ssh` 的形式来 `clone` 的时候死活不成功！提示如下 ↓

```bash
Mr-Xies-Mac-Pro:test kaka$ git clone git@github.com:***/**_demo.git
Cloning into 'html_demo'...
git@github.com: Permission denied (publickey).
fatal: Could not read from remote repository.

Please make sure you have the correct access rights
and the repository exists.
```

## 问题如何产生的呢？

因为生成 ssh 的时候配置的 email 地址跟全局的不一致！导致无法 `git clone` 下来！

## 如何解决问题？

so easy~  
就是修改全局的 `git` 配置中的 `email`，让他跟生成 ssh 时设置的一致就 ojbk 了

```bash
  $ git config --global user.email 'mrxiehuaqiang@163.com'
```

**结论：以后多个仓库地址（GitHub GitLab）最好用一个邮箱！不论是全局的还是本地的**

## A.开始生成 ssh （以 GitHub 为例）

- 第一步:

  ```bash
    $ ssh-keygen -t rsa -b 4096 -C "mrxiehuaqiang@163.com" # 这是GitHub官网的命令
    $ ssh-keygen -t rsa -C "mrxiehuaqiang@163.com" # 其他情况
  ```

- 第二步 设置公钥秘钥的文件名 (为了以后扩展有多个仓库 自己 || 公司的)

  ```bash
  Enter file in which to save the key (/Users/kaka/.ssh/id_rsa): id_rsa_home
  ```

- 第三步 一路回车

  最后会生成 id_rsa_home， id_rsa_home.pub

  ```bash
  +---[RSA 4096]----+
  |     .+B=@B.o    |
  |     oB+OB+= .   |
  |    o++=Oo+...   |
  |     + +...o. .  |
  |      . S o    . |
  |         + .   ..|
  |        . o    o+|
  |           .    E|
  |                 |
  +----[SHA256]-----+
  ```

- 第四步 查看公钥

  ```bash
    $ cat id_rsa_home.pub
  ```

  ```bash
  # 公钥
  ssh-rsa AAAAB3NzaC1yc2EAAAADAQA……
  ```

## B. Adding your SSH key to the ssh-agent 将 ssh 添加到 ssh 代理中

[命令行解释](https://coderwall.com/p/7smjkq/multiple-ssh-keys-for-different-accounts-on-github-or-gitlab)

```bash
ssh-add -D # delete cached keys
ssh-add -l # 查看添加哪些
```

- 第一步 生成代理 （自己的理解）

  ```bash
    $  eval `ssh-agent -s` || eval "$(ssh-agent -s)" # 两种写法都可以

    > Agent pid 8833 # 输出
  ```

- 第二步 写入代理

  ```bash
    $ ssh-add -K ~/.ssh/id_rsa_home

    > Identity added: /Users/kaka/.ssh/id_rsa_home (mrxiehuaqiang@163.com) # 输出
  ```

- 第三步 查看代理

  ```bash
    $ ssh-add -l

    4096 SHA256:tp……qA3ERkSoU mrxiehuaqiang@163.com (RSA) # 输出
  ```

  第二步声明：

  > If you're using macOS Sierra 10.12.2 or later, you will need to modify your ~/.ssh/config file to automatically load keys into the ssh-agent and store passphrases in your keychain

  ```bash
  Host *
    AddKeysToAgent yes
    UseKeychain yes
    IdentityFile ~/.ssh/id_rsa_home
  ```

## C. Add the SSH key to your GitHub account.

- 第一步 将 ssh key 添加到 GitHub 账户

- 第二步 检验是否设置成功

  ```bash
    $ ssh -T git@home.github.com # 配置文件中的地址

    Hi Popxie! You've successfully authenticated, but GitHub does not provide shell access' # 输出
  ```

- 第三步 git clone project

  如果 clone 不下来 请将公钥重新添加一次。（我写完这篇文档以后发现还是不行，就重新添加了一下，然后就 ojbk 了）

## 最后查看 config 文件内容

```bash
# 家
Host home.github.com
     HostName github.com
     AddKeysToAgent yes
     UseKeychain yes
     PreferredAuthentications publickey
     IdentityFile ~/.ssh/id_rsa_home

#公司
Host company.xx.yy.com
     HostName xx.yy.com
     PreferredAuthentications publickey
     IdentityFile ~/.ssh/id_rsa_company
```
