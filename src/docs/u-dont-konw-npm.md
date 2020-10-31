## npm 中的依赖包  

#### 依赖包类型  

npm 目前支持一下几种类型的依赖包管理  

- `dependencies`
- `devDependencies`
- `peerDependencies`
- `optionalDependencies`
- `bundledDependencies / bundleDependencies`  
```
 "dependencies": {
    "lodash": "^4.17.19"
  },
  "devDependencies": {
    "@babel/cli": "^7.1.0"
  },
  "peerDependencies": {},
  "optionalDependencies": {},
  "bundledDependencies": []
```  

##### `dependencies`  

应用依赖，或者叫做业务依赖，是我们最常用的一种。这种依赖是应用发布后上线所需要的，也就是说其中的依赖项属于线上代码的一部分。比如框架react，第三方的组件库ant-design等。可通过下面的命令来安装:

```
npm i ${packageName} -S
```  

##### `devDependencies`  

开发环境依赖。这种依赖只在项目开发时所需要，比如构建工具webpack、gulp，单元测试工具jest、mocha等。可通过下面的命令来安装:  

```
npm i ${packageName} -D
```  

##### `peerDependencies`  

同行依赖。这种依赖的作用是提示宿主环境去安装插件在`peerDependencies`中所指定依赖的包，用于解决插件与所依赖包不一致的问题。

听起来可能没有那么好理解，举个例子来说明下。`antd@3.19.5`只是提供了一套基于`react`的`ui`组件库，但它要求宿主环境需要安装指定的`react`版本，所以你可以看到 node_modules 中 antd 的`package.json`中有这么一项配置:  

```
"peerDependencies": {
    "react": ">=16.0.0",
    "react-dom": ">=16.0.0"
}
```  

它要求宿主环境安装大于等于`16.0.0`版本的`react`，也就是`antd`的运行依赖宿主环境提供的该范围的`react`安装包。  

> 在安装插件的时候，peerDependencies 在`npm 2.x`和`npm 3.x`中表现不一样。npm2.x 会自动安装同等依赖，npm3.x 不再自动安装，会产生警告！手动在`package.json`文件中添加依赖项可以解决。  

##### `optionalDependencies`  

可选依赖。这种依赖中的依赖包即使安装失败了，也不影响整个安装的过程。需要注意的是，`optionalDependencies`会覆盖`dependencies`中的同名依赖包，所以不要在两个地方都写。  

> 在实际项目中，如果某个包已经失效，我们通常会寻找它的替代方案。不确定的依赖会增加代码判断和测试难度，所以这个依赖项还是尽量不要使用。

##### `bundledDependencies / bundleDependencies`  

打包依赖。如果在打包发布时希望一些依赖包也出现在最终的包里，那么可以将包的名字放在bundledDependencies中，bundledDependencies 的值是一个字符串数组，如:  

```
{
  "name": "test",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "mysql2": "^2.1.0"
  },
  "devDependencies": {
    "sequelize": "^5.21.3"
  },
   "bundledDependencies": [
    "mysql2",
    "sequelize"
  ]
}
```  

执行打包命令npm pack，在生成的sequelize-test-1.0.0.tgz包中，将包含mysql2和sequelize。  

> 需要注意的是，在bundledDependencies中指定的依赖包，必须先在 dependencies 和 devDependencies 声明过，否则打包会报错。  


#### 语义化版本控制  

为了在软件版本号中包含更多意义，反映代码所做的修改，产生了语义化版本，软件的使用者能从版本号中推测软件做的修改。npm 包使用语义化版控制，我们可安装一定版本范围的 npm 包，npm 会选择和你指定的版本相匹配 的 (`latest`)最新版本安装。

npm 采用了`semver`规范作为依赖版本管理方案。版本号由三部分组成:`主版本`、`次版本号`、`补丁版本号`。变更不同的版本号，代表不同的意义:

- `主版本号（major）`：软件做了不兼容的变更（breaking change 重大变更）
- `次版本号（minor）`：添加功能或者废弃功能，向下兼容
- `补丁版本号（patch）`：bug 修复，向下兼容


下面让我们来看下常用的几个版本格式:  

- `"compression": "1.7.4"`  

表示精确版本号。任何其他版本号都不匹配。在一些比较重要的线上项目中，建议使用这种方式锁定版本。  

- `"typescript": "^3.4.3"`  

表示兼容补丁和小版本更新的版本号。官方的定义是能够兼容除了最左侧的非 0 版本号之外的其他变化。这句话不是很好理解，举几个例子大家就明白了:  

```
"^3.4.3" 等价于 `">= 3.4.3 < 4.0.0"。即只要最左侧的 "3" 不变，其他都可以改变。所以 "3.4.5", "3.6.2" 都可以兼容。

"^0.4.3" 等价于 ">= 0.4.3 < 0.5.0"。因为最左侧的是 "0"，那么只要第二位 "4" 不变，其他的都兼容，比如 "0.4.5" 和 "0.4.99"。

"^0.0.3" 等价于 ">= 0.0.3 < 0.0.4"。大版本号和小版本号都为 "0" ，所以也就等价于精确的 "0.0.3"。
```  

- `"mime-types": "~2.1.24"`  

表示只兼容补丁更新的版本号。关于 ~ 的定义分为两部分：如果列出了小版本号（第二位），则只兼容补丁（第三位）的修改；如果没有列出小版本号，则兼容第二和第三位的修改。我们分两种情况理解一下这个定义:  

```
"~2.1.24" 列出了小版本号 "1"，因此只兼容第三位的修改，等价于 ">= 2.1.24 < 2.2.0"。

"~2.1" 也列出了小版本号 "2"，因此和上面一样兼容第三位的修改，等价于 ">= 2.1.0 < 2.2.0"。

"~2" 没有列出小版本号，可以兼容第二第三位的修改，因此等价于 ">= 2.0.0 < 3.0.0"
``` 

- `"underscore-plus": "1.x"` `"uglify-js": "3.4.x"`  

除了上面的`x`、`X`还有`*`和(`空`)，这些都表示使用通配符的版本号，可以匹配任何内容。具体来说:

```
"*" 、"x" 或者 （空） 表示可以匹配任何版本。
"1.x", "1.*" 和 "1" 表示匹配主版本号为 "1" 的所有版本，因此等价于 ">= 1.0.0 < 2.0.0"。

"1.2.x", "1.2.*" 和 "1.2" 表示匹配版本号以 "1.2" 开头的所有版本，因此等价于 ">= 1.2.0 < 1.3.0"。
```  

- `"css-tree": "1.0.0-alpha.33"` `"@vue/test-utils": "1.0.0-beta.29"`  

有时候为了表达更加确切的版本，还会在版本号后面添加标签或者扩展，来说明是预发布版本或者测试版本等。常见的标签有:  

|标签|含义|补充
--|--|--|
|demo|demo版本|可能用于验证问题的版本
|dev|开发版|开发阶段用的，bug 多，体积较大等特点，功能不完善
|alpha|α 版本|预览版，或者叫内部测试版；一般不向外发布，会有很多 bug；一般只有测试人员使用。
|beta|测试版(β 版本)|测试版，或者叫公开测试版；这个阶段的版本会一直加入新的功能；在 alpha 版之后推出。
|gamma|（γ）伽马版本|较 α 和 β 版本有很大的改进，与稳定版相差无几，用户可使用
|trial|试用版本|本软件通常都有时间限制，过期之后用户如果希望继续使用，一般得交纳一定的费用进行注册或购买。有些试用版软件还在功能上做了一定的限制。
|csp|内容安全版本|js 库常用
|rc|最终测试版本|可能成为最终产品的候选版本，如果未出现问题则可发布成为正式版本
|latest|最新版|不指定版本和标签，npm 默认安最新版
|stable|稳定版|  

## npm install 原理分析  

我们都知道，执行`npm install`后，依赖包被安装到了`node_modules`中。虽然在实际开发中我们无需十分关注里面具体的细节，但了解`node_modules`中的内容可以帮助我们更好的理解`npm`安装依赖包的具体机制。  

#### 嵌套结构  

在 npm 的早期版本中，npm 处理依赖的方式简单粗暴，以递归的方式，严格按照 `package.json` 结构以及子依赖包的 `package.json` 结构将依赖安装到他们各自的 `node_modules` 中。

举个例子，我们的项目`ts-axios`现在依赖了两个模块: `axios`、`body-parser`: 

```
{
  "name": "ts-axios",
  "dependencies": {
    "axios": "^0.19.0",
    "body-parser": "^1.19.0",
  }
}
```  

axios依赖了follow-redirects和is-buffer模块:

```
{
  "name": "axios",
  "dependencies": {
      "follow-redirects": "1.5.10",
      "is-buffer": "^2.0.2"
    },
}
```

body-parser依赖了bytes和content-type等模块:  

```
{
  "name": "body-parser",
  "dependencies": {
    "bytes": "3.1.0",
    "content-type": "~1.0.4",
     ...
  }
}
```

那么，执行 npm install 后，得到的 node_modules 中模块目录结构就是下面这样的：

![1.png](http://upload-images.jianshu.io/upload_images/12297114-a95713f3c8429ecf.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

这样的方式优点很明显， `node_modules` 的结构和 `package.json` 结构一一对应，层级结构明显，并且保证了每次安装目录结构都是相同的。

但是，试想一下，如果你依赖的模块非常之多，你的 `node_modules` 将非常庞大，嵌套层级非常之深:

从上图这种情况，我们不难得出嵌套结构拥有以下缺点：

- 在不同层级的依赖中，可能引用了同一个模块，导致大量冗余
- 嵌套层级过深可能导致不可预知的问题

#### 扁平结构  

为了解决以上问题，npm 在 3.x 版本做了一次较大更新。其将早期的嵌套结构改为扁平结构。

安装模块时，不管其是直接依赖还是子依赖的依赖，优先将其安装在 `node_modules` 根目录。

还是上面的依赖结构，我们在执行 npm install 后将得到下面的目录结构：

![2.png](http://upload-images.jianshu.io/upload_images/12297114-c5cc86b7f2b6922e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)  

此时我们若在模块中又依赖了 `is-buffer@2.0.1` 版本：  

```
{
  "name": "ts-axios",
  "dependencies": {
    "axios": "^0.19.0",
    "body-parser": "^1.19.0",
    "is-buffer": "^2.0.1"
  }
}
``` 

当安装到相同模块时，判断已安装的模块版本是否符合新模块的版本范围，如果符合则跳过，不符合则在当前模块的 node_modules 下安装该模块。

此时，我们在执行 npm install 后将得到下面的目录结构：

![3.png](http://upload-images.jianshu.io/upload_images/12297114-1c7ff0eef1980fed.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

对应的，如果我们在项目代码中引用了一个模块，模块查找流程如下：

- 在当前模块路径下搜索
- 在当前模块 node_modules 路径下搜索
- 在上级模块的 node_modules 路径下搜索
- ...
- 直到搜索到全局路径中的 node_modules

假设我们又依赖了一个包 axios2@^0.19.0，而它依赖了包 is-buffer@^2.0.3，则此时的安装结构是下面这样的：  

![4.png](http://upload-images.jianshu.io/upload_images/12297114-3c4c49c1911568b6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

所以 npm 3.x 版本并未完全解决老版本的模块冗余问题，甚至还会带来新的问题。

我们在 `package.json` 通常只会锁定大版本，这意味着在某些依赖包小版本更新后，同样可能造成依赖结构的改动，依赖结构的不确定性可能会给程序带来不可预知的问题。

#### package-lock.json  

为了解决 `npm install` 的不确定性问题，在 `npm 5.x` 版本新增了 `package-lock.json` 文件，而安装方式还沿用了 `npm 3.x` 的扁平化的方式。

package-lock.json 的作用是锁定依赖结构，即只要你目录下有 `package-lock.json` 文件，那么你每次执行 `npm install` 后生成的 `node_modules` 目录结构一定是完全相同的。

例如，我们有如下的依赖结构：

```
{
  "name": "ts-axios",
  "dependencies": {
    "axios": "^0.19.0",
  }
}
```

在执行 npm install 后生成的 `package-lock.json` 如下：

```
{
  "name": "ts-axios",
  "version": "0.1.0",
  "dependencies": {
      "axios": {
        "version": "0.19.0",
        "resolved": "https://registry.npmjs.org/axios/-/axios-0.19.0.tgz",
        "integrity": "sha512-1uvKqKQta3KBxIz14F2v06AEHZ/dIoeKfbTRkK1E5oqjDnuEerLmYTgJB5AiQZHJcljpg1TuRzdjDR06qNk0DQ==",
        "requires": {
          "follow-redirects": "1.5.10",
          "is-buffer": "^2.0.2"
        },
        "dependencies": {
          "debug": {
            "version": "3.1.0",
            "resolved": "https://registry.npmjs.org/debug/-/debug-3.1.0.tgz",
            "integrity": "sha512-OX8XqP7/1a9cqkxYw2yXss15f26NKWBpDXQd0/uK/KPqdQhxbPa994hnzjcE2VqQpDslf55723cKPUOGSmMY3g==",
            "requires": {
              "ms": "2.0.0"
            }
          },
          "follow-redirects": {
            "version": "1.5.10",
            "resolved": "https://registry.npmjs.org/follow-redirects/-/follow-redirects-1.5.10.tgz",
            "integrity": "sha512-0V5l4Cizzvqt5D44aTXbFZz+FtyXV1vrDN6qrelxtfYQKW0KO0W2T/hkE8xvGa/540LkZlkaUjO4ailYTFtHVQ==",
            "requires": {
              "debug": "=3.1.0"
            }
          },
          "is-buffer": {
            "version": "2.0.3",
            "resolved": "https://registry.npmjs.org/is-buffer/-/is-buffer-2.0.3.tgz",
            "integrity": "sha512-U15Q7MXTuZlrbymiz95PJpZxu8IlipAp4dtS3wOdgPXx3mqBnslrWU14kxfHB+Py/+2PVKSr37dMAgM2A4uArw=="
          },
          "ms": {
            "version": "2.0.0",
            "resolved": "https://registry.npmjs.org/ms/-/ms-2.0.0.tgz",
            "integrity": "sha1-VgiurfwAvmwpAd9fmGF4jeDVl8g="
          }
      }
    },
  }
}
```  

最外面的两个属性 `name` 、`version` 同 `package.json` 中的 `name` 和 `version` ，用于描述当前包名称和版本。

`dependencies` 是一个对象，对象和 `node_modules` 中的包结构一一对应，对象的 `key` 为包名称，值为包的一些描述信息：  

- `version`: 包唯一的版本号
- `resolved`: 安装来源
- `integrity`: 表明包完整性的 hash 值（验证包是否已失效）
- `requires`: 依赖包所需要的所有依赖项，与子依赖的 package.json 中   
- `dependencies`的依赖项相同。
- `dependencies`: 依赖包node_modules中依赖的包，与顶层的dependencies一样的结构  

这里注意，并不是所有的子依赖都有 `dependencies` 属性，只有子依赖的依赖和当前已安装在根目录的 `node_modules` 中的依赖冲突之后，才会有这个属性。

通过以上几个步骤，说明`package-lock.json`文件和`node_modules`目录结构是一一对应的，即项目目录下存在`package-lock.json`可以让每次安装生成的依赖目录结构保持相同。

在开发一个应用时，建议把`package-lock.json`文件提交到代码版本仓库，从而让你的团队成员、运维部署人员或`CI系统`可以在执行`npm` install时安装的依赖版本都是一致的。


## npm scripts 脚本  

`脚本功能`是 npm 最强大、最常用的功能之一。  

npm 允许在`package.json`文件中使用`scripts`字段来定义脚本命令。以`vue-cli3`为例:  

```
"scripts": {
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build",
    "lint": "vue-cli-service lint",
    "test:unit": "vue-cli-service test:unit"
}
```

这样就可以通过`npm run serve`脚本替代`vue-cli-service serve`脚本来启动项目，而无需每次都敲一遍冗长的脚本。  

#### 原理  

这里我们参考一下阮老师的文章:  

> npm 脚本的原理非常简单。每当执行 npm run，就会自动新建一个 Shell，在这个 Shell 里面执行指定的脚本命令。因此，只要是 Shell（一般是 Bash）可以运行的命令，就可以写在 npm 脚本里面。
比较特别的是，npm run 新建的这个 Shell，会将当前目录的node_modules/.bin子目录加入 PATH 变量，执行结束后，再将 PATH 变量恢复原样。  

#### 传入参数  

在原有脚本后面加上 `--` 分隔符, 后面再加上参数，就可以将参数传递给 script 命令了，比如 eslint 内置了代码风格自动修复模式，只需给它传入 `--fix` 参数即可，我们可以这样写:  

```
"scripts": {
    "lint": "vue-cli-service lint --fix",
}
```  

除了第一个可执行的命令，以空格分割的任何字符串（除了一些 shell 的语法）都是参数，并且都能通过`process.argv`属性访问。 

> `process.argv` 属性返回一个数组，其中包含当启动 Node.js 进程时传入的命令行参数。 第一个元素是 `process.execPath`，表示启动 node 进程的可执行文件的绝对路径名。第二个元素为当前执行的 JavaScript 文件路径。剩余的元素为其他命令行参数。  

#### 执行顺序  

如果 npm 脚本里面需要执行多个任务，那么需要明确它们的执行顺序。

如果是串行执行，即要求前一个任务执行成功之后才能执行下一个任务。使用`&&`符号连接。

```
npm run script1 && npm run script2
```  

> 串行命令执行过程中，只要一个命令执行失败，则整个脚本将立刻终止。  

如果是并行执行，即多个任务可以同时执行。使用`&`符号来连接。  

```
npm run script1 & npm run script2
```  

#### 钩子  

这里的钩子和`vue`或`react`里面的生命周期有点相似。

npm 脚本有`pre`和`post`两个钩子。在执行 npm scripts 命令（无论是自定义还是内置）时，都经历了 pre 和 post 两个钩子，在这两个钩子中可以定义某个命令执行前后的命令。  

比如，在用户执行`npm run build`的时候，会自动按照下面的顺序执行。  

```
npm run prebuild && npm run build && npm run postbuild
```  

当然，如果没有指定`prebuild`、`postbuild`，会默默的跳过。如果想要指定钩子，必须严格按照 pre 和 post 前缀来添加。

#### 环境变量  

npm 脚本有一个非常强大的功能，就是可以使用 npm 的内部变量。

在执行`npm run`脚本时，npm 会设置一些特殊的`env`环境变量。其中 package.json 中的所有字段，都会被设置为以`npm_package_` 开头的环境变量。比如 package.json 中有如下字段内容：

```
{
  "name": "sequelize-test",
  "version": "1.0.0",
  "description": "sequelize测试",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "mysql2": "^2.1.0",
    "sequelize": "^5.21.3"
  }
}
```  
那么，变量`npm_package_name`返回`sequelize-test`，变量`npm_package_description`返回sequelize测试。也就是:  

```
// 这两个是在node环境环境执行 非浏览器 
// test.js  执行 node test.js
console.log(process.env.npm_package_name)  // sequelize-test

console.log(process.env.npm_package_description)  // sequelize测试
```  

## npm配置  

#### 优先级  

npm 从以下来源获取配置信息（优先级由高到低）：

##### `命令行`  

```
npm run dev --foo=bar
```  

执行上述命令，会将配置项`foo`的值设为`bar`，通过`process.env.npm_config_foo`可以访问其配置值。这个时候的 foo 配置值将覆盖所有其他来源存在的 foo 配置值。

##### `环境变量`  

如果 env 环境变量中存在以`npm_config_`为前缀的环境变量，则会被识别为 npm 的配置属性。比如，环境变量中的`npm_config_foo=bar` 将会设置配置参数 `foo` 的值为 "`bar`"。

如果只指定了参数名却没有指定任何值的配置参数，其值将会被设置为 `true`。  

##### `npmrc文件`   

通过修改 `npmrc` 文件可以直接修改配置。系统中存在多个 npmrc 文件，这些 npmrc 文件被访问的优先级从高到低的顺序为:  

- `项目配置文件`  

只作用在本项目下。在其他项目中，这些配置不生效。通过创建这个.npmrc 文件可以统一团队的 `npm` 配置规范。路径为`/path/to/my/project/.npmrc`。

- `用户配置文件`

默认为`~/.npmrc/`，可通过`npm config get userconfig`查看存放的路径。

- `全局配置文件`

通过`npm config get globalconfig`可以查看具体存放的路径。

- `npm 内置的配置文件`

这是一个不可更改的内置配置文件，为了维护者以标准和一致的方式覆盖默认配置。`mac`下的路径为`/path/to/npm/npmrc`。

##### `默认配置`  

通过`npm config ls -l`查看 npm 内部的默认配置参数。如果命令行、环境变量、所有配置文件都没有配置参数，则使用默认参数值。

#### npm config 指令  

##### `set`  

```
npm config set <key> <value> [-g|--global]
npm config set registry <url>  # 指定下载 npm 包的来源，默认为 https://registry.npmjs.org/ ，可以指定私有源
```  

设置配置参数 key 的值为 value，如果省略 value，key 会被设置为 true。  

##### `get`  

```
npm config get <key>
```  

查看配置参数 key 的值。  

##### `delete`  

```
npm config delete <key>
```  

删除配置参数 key  

##### `list`  

```
npm config list [-l] [--json]
```  

查看所有设置过的配置参数。使用 -l 查看所有设置过的以及默认的配置参数。使用 --json 以 json 格式查看。  

##### edit  

```
npm config edit
``` 

在编辑器中打开 npmrc 文件，使用 --global 参数打开全局 npmrc 文件。

<!--[参考至·GitHub](https://github.com/Cosen95/blog/issues/8)-->