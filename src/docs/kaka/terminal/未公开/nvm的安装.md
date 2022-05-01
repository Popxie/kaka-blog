<!--
 * @Description: Terminal文件夹
 * @Author: xiehuaqiang
 * @FilePath: /kaka-blog/src/docs/kaka/terminal/未公开/nvm的安装.md
 * @Date: 2022-05-01 15:19:43
 * @LastEditTime: 2022-05-01 15:20:54
-->

# nvm

## 1.安装

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
```

## 2.设置.bash_profile 或 .zshrc

- .bash_profile

  ```sh
  # 如果你的shell使用的是bash
  vim ~/.bash_profile
  ```

  ```sh
  export NVM_DIR="$HOME/.nvm"
  [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

  ```

- .zshrc

  ```sh
  # 如果使用的是 zsh
  vim ~/.zshrc
  ```

  ```sh
  export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
  [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
  ```

## 3.重启一个终端 验证

```sh
nvm list
```
