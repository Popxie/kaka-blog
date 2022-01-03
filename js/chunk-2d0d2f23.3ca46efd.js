(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-2d0d2f23"],{"5b55":function(s,t,a){"use strict";a.r(t);var n=a("2877"),l=Object(n.a)({},(function(){var s=this;s.$createElement;return s._self._c,s._m(0)}),[function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("section",[a("html",[a("head"),a("body",[a("h1",[s._v("03 执行上下文栈")]),a("blockquote",[a("p",[s._v("JavaScript 深入系列第三篇，讲解执行上下文栈的是如何执行的，也回答了第二篇中的略难的思考题。")])]),a("h2",[s._v("顺序执行？")]),a("p",[s._v("如果要问到 JavaScript 代码执行顺序的话，想必写过 JavaScript 的开发者都会有个直观的印象，那就是顺序执行，毕竟：")]),a("pre",{pre:!0},[a("code",{pre:!0,attrs:{"v-pre":"",class:"language-js"}},[a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("var")]),s._v(" foo = "),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("function")]),s._v("("),a("span",{pre:!0,attrs:{class:"hljs-params"}}),s._v(") {\n  "),a("span",{pre:!0,attrs:{class:"hljs-variable language_"}},[s._v("console")]),s._v("."),a("span",{pre:!0,attrs:{class:"hljs-title function_"}},[s._v("log")]),s._v("("),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'foo1'")]),s._v(")\n}\n\n"),a("span",{pre:!0,attrs:{class:"hljs-title function_"}},[s._v("foo")]),s._v("() "),a("span",{pre:!0,attrs:{class:"hljs-comment"}},[s._v("// foo1")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("var")]),s._v(" foo = "),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("function")]),s._v("("),a("span",{pre:!0,attrs:{class:"hljs-params"}}),s._v(") {\n  "),a("span",{pre:!0,attrs:{class:"hljs-variable language_"}},[s._v("console")]),s._v("."),a("span",{pre:!0,attrs:{class:"hljs-title function_"}},[s._v("log")]),s._v("("),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'foo2'")]),s._v(")\n}\n\n"),a("span",{pre:!0,attrs:{class:"hljs-title function_"}},[s._v("foo")]),s._v("() "),a("span",{pre:!0,attrs:{class:"hljs-comment"}},[s._v("// foo2")]),s._v("\n")])]),a("p",[s._v("然而去看这段代码：")]),a("pre",{pre:!0},[a("code",{pre:!0,attrs:{"v-pre":"",class:"language-js"}},[a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("function")]),s._v(" "),a("span",{pre:!0,attrs:{class:"hljs-title function_"}},[s._v("foo")]),s._v("("),a("span",{pre:!0,attrs:{class:"hljs-params"}}),s._v(") {\n  "),a("span",{pre:!0,attrs:{class:"hljs-variable language_"}},[s._v("console")]),s._v("."),a("span",{pre:!0,attrs:{class:"hljs-title function_"}},[s._v("log")]),s._v("("),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'foo1'")]),s._v(")\n}\n\n"),a("span",{pre:!0,attrs:{class:"hljs-title function_"}},[s._v("foo")]),s._v("() "),a("span",{pre:!0,attrs:{class:"hljs-comment"}},[s._v("// foo2")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("function")]),s._v(" "),a("span",{pre:!0,attrs:{class:"hljs-title function_"}},[s._v("foo")]),s._v("("),a("span",{pre:!0,attrs:{class:"hljs-params"}}),s._v(") {\n  "),a("span",{pre:!0,attrs:{class:"hljs-variable language_"}},[s._v("console")]),s._v("."),a("span",{pre:!0,attrs:{class:"hljs-title function_"}},[s._v("log")]),s._v("("),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'foo2'")]),s._v(")\n}\n\n"),a("span",{pre:!0,attrs:{class:"hljs-title function_"}},[s._v("foo")]),s._v("() "),a("span",{pre:!0,attrs:{class:"hljs-comment"}},[s._v("// foo2")]),s._v("\n")])]),a("p",[s._v("打印的结果却是两个 "),a("code",{pre:!0},[s._v("foo2")]),s._v("。")]),a("p",[s._v("刷过面试题的都知道这是因为 JavaScript 引擎并非一行一行地分析和执行程序，而是一段一段地分析执行。当执行一段代码的时候，会进行一个“准备工作”，比如第一个例子中的变量提升，和第二个例子中的函数提升。")]),a("p",[s._v("但是本文真正想让大家思考的是：这个“一段一段”中的“段”究竟是怎么划分的呢？")]),a("p",[s._v("到底 JavaScript 引擎遇到一段怎样的代码时才会做“准备工作”呢？")]),a("h2",[s._v("可执行代码")]),a("p",[s._v("这就要说到 JavaScript 的可执行代码(executable code)的类型有哪些了？")]),a("p",[s._v("其实很简单，就三种，全局代码、函数代码、eval 代码。")]),a("p",[s._v('举个例子，当执行到一个函数的时候，就会进行准备工作，这里的“准备工作”，让我们用个更专业一点的说法，就叫做"执行上下文(execution context)"。')]),a("h2",[s._v("执行上下文栈")]),a("p",[s._v("接下来问题来了，我们写的函数多了去了，如何管理创建的那么多执行上下文呢？")]),a("p",[s._v("所以 JavaScript 引擎创建了执行上下文栈（Execution context stack，ECS）来管理执行上下文")]),a("p",[s._v("为了模拟执行上下文栈的行为，让我们定义执行上下文栈是一个数组：")]),a("pre",{pre:!0},[a("code",{pre:!0,attrs:{"v-pre":"",class:"language-js"}},[a("span",{pre:!0,attrs:{class:"hljs-title class_"}},[s._v("ECStack")]),s._v(" = []\n")])]),a("p",[s._v("试想当 JavaScript 开始要解释执行代码的时候，最先遇到的就是全局代码，所以初始化的时候首先就会向执行上下文栈压入一个全局执行上下文，我们用 globalContext 表示它，并且只有当整个应用程序结束的时候，ECStack 才会被清空，所以 ECStack 最底部永远有个 globalContext：")]),a("pre",{pre:!0},[a("code",{pre:!0,attrs:{"v-pre":"",class:"language-js"}},[a("span",{pre:!0,attrs:{class:"hljs-title class_"}},[s._v("ECStack")]),s._v(" = [globalContext]\n")])]),a("p",[s._v("现在 JavaScript 遇到下面的这段代码了：")]),a("pre",{pre:!0},[a("code",{pre:!0,attrs:{"v-pre":"",class:"language-js"}},[a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("function")]),s._v(" "),a("span",{pre:!0,attrs:{class:"hljs-title function_"}},[s._v("fun3")]),s._v("("),a("span",{pre:!0,attrs:{class:"hljs-params"}}),s._v(") {\n  "),a("span",{pre:!0,attrs:{class:"hljs-variable language_"}},[s._v("console")]),s._v("."),a("span",{pre:!0,attrs:{class:"hljs-title function_"}},[s._v("log")]),s._v("("),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'fun3'")]),s._v(")\n}\n\n"),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("function")]),s._v(" "),a("span",{pre:!0,attrs:{class:"hljs-title function_"}},[s._v("fun2")]),s._v("("),a("span",{pre:!0,attrs:{class:"hljs-params"}}),s._v(") {\n  "),a("span",{pre:!0,attrs:{class:"hljs-title function_"}},[s._v("fun3")]),s._v("()\n}\n\n"),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("function")]),s._v(" "),a("span",{pre:!0,attrs:{class:"hljs-title function_"}},[s._v("fun1")]),s._v("("),a("span",{pre:!0,attrs:{class:"hljs-params"}}),s._v(") {\n  "),a("span",{pre:!0,attrs:{class:"hljs-title function_"}},[s._v("fun2")]),s._v("()\n}\n\n"),a("span",{pre:!0,attrs:{class:"hljs-title function_"}},[s._v("fun1")]),s._v("()\n")])]),a("p",[s._v("当执行一个函数的时候，就会创建一个执行上下文，并且压入执行上下文栈，当函数执行完毕的时候，就会将函数的执行上下文从栈中弹出。知道了这样的工作原理，让我们来看看如何处理上面这段代码：")]),a("pre",{pre:!0},[a("code",{pre:!0,attrs:{"v-pre":"",class:"language-js"}},[a("span",{pre:!0,attrs:{class:"hljs-comment"}},[s._v("// 伪代码")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"hljs-comment"}},[s._v("// fun1()")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"hljs-title class_"}},[s._v("ECStack")]),s._v("."),a("span",{pre:!0,attrs:{class:"hljs-title function_"}},[s._v("push")]),s._v("(<fun1> functionContext);\n\n"),a("span",{pre:!0,attrs:{class:"hljs-comment"}},[s._v("// fun1中竟然调用了fun2，还要创建fun2的执行上下文")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"hljs-title class_"}},[s._v("ECStack")]),s._v("."),a("span",{pre:!0,attrs:{class:"hljs-title function_"}},[s._v("push")]),s._v("(<fun2> functionContext);\n\n"),a("span",{pre:!0,attrs:{class:"hljs-comment"}},[s._v("// 擦，fun2还调用了fun3！")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"hljs-title class_"}},[s._v("ECStack")]),s._v("."),a("span",{pre:!0,attrs:{class:"hljs-title function_"}},[s._v("push")]),s._v("(<fun3> functionContext);\n\n"),a("span",{pre:!0,attrs:{class:"hljs-comment"}},[s._v("// fun3执行完毕")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"hljs-title class_"}},[s._v("ECStack")]),s._v("."),a("span",{pre:!0,attrs:{class:"hljs-title function_"}},[s._v("pop")]),s._v("();\n\n"),a("span",{pre:!0,attrs:{class:"hljs-comment"}},[s._v("// fun2执行完毕")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"hljs-title class_"}},[s._v("ECStack")]),s._v("."),a("span",{pre:!0,attrs:{class:"hljs-title function_"}},[s._v("pop")]),s._v("();\n\n"),a("span",{pre:!0,attrs:{class:"hljs-comment"}},[s._v("// fun1执行完毕")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"hljs-title class_"}},[s._v("ECStack")]),s._v("."),a("span",{pre:!0,attrs:{class:"hljs-title function_"}},[s._v("pop")]),s._v("();\n\n"),a("span",{pre:!0,attrs:{class:"hljs-comment"}},[s._v("// javascript接着执行下面的代码，但是ECStack底层永远有个globalContext")]),s._v("\n")])]),a("h2",[s._v("解答思考题")]),a("p",[s._v("好啦，现在我们已经了解了执行上下文栈是如何处理执行上下文的，所以让我们看看上篇文章"),a("a",{attrs:{href:"#/qingfeng/deep/deep-02"}},[s._v("《02 词法作用域和动态作用域》")]),s._v("最后的问题：")]),a("pre",{pre:!0},[a("code",{pre:!0,attrs:{"v-pre":"",class:"language-js"}},[a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("var")]),s._v(" scope = "),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'global scope'")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("function")]),s._v(" "),a("span",{pre:!0,attrs:{class:"hljs-title function_"}},[s._v("checkscope")]),s._v("("),a("span",{pre:!0,attrs:{class:"hljs-params"}}),s._v(") {\n  "),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("var")]),s._v(" scope = "),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'local scope'")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("function")]),s._v(" "),a("span",{pre:!0,attrs:{class:"hljs-title function_"}},[s._v("f")]),s._v("("),a("span",{pre:!0,attrs:{class:"hljs-params"}}),s._v(") {\n    "),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("return")]),s._v(" scope\n  }\n  "),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("return")]),s._v(" "),a("span",{pre:!0,attrs:{class:"hljs-title function_"}},[s._v("f")]),s._v("()\n}\n"),a("span",{pre:!0,attrs:{class:"hljs-title function_"}},[s._v("checkscope")]),s._v("()\n")])]),a("pre",{pre:!0},[a("code",{pre:!0,attrs:{"v-pre":"",class:"language-js"}},[a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("var")]),s._v(" scope = "),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'global scope'")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("function")]),s._v(" "),a("span",{pre:!0,attrs:{class:"hljs-title function_"}},[s._v("checkscope")]),s._v("("),a("span",{pre:!0,attrs:{class:"hljs-params"}}),s._v(") {\n  "),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("var")]),s._v(" scope = "),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'local scope'")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("function")]),s._v(" "),a("span",{pre:!0,attrs:{class:"hljs-title function_"}},[s._v("f")]),s._v("("),a("span",{pre:!0,attrs:{class:"hljs-params"}}),s._v(") {\n    "),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("return")]),s._v(" scope\n  }\n  "),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("return")]),s._v(" f\n}\n"),a("span",{pre:!0,attrs:{class:"hljs-title function_"}},[s._v("checkscope")]),s._v("()()\n")])]),a("p",[s._v("两段代码执行的结果一样，但是两段代码究竟有哪些不同呢？")]),a("p",[s._v("答案就是执行上下文栈的变化不一样。")]),a("p",[s._v("让我们模拟第一段代码：")]),a("pre",{pre:!0},[a("code",{pre:!0,attrs:{"v-pre":"",class:"language-js"}},[a("span",{pre:!0,attrs:{class:"hljs-title class_"}},[s._v("ECStack")]),s._v("."),a("span",{pre:!0,attrs:{class:"hljs-title function_"}},[s._v("push")]),s._v("(<checkscope> functionContext);\n"),a("span",{pre:!0,attrs:{class:"hljs-title class_"}},[s._v("ECStack")]),s._v("."),a("span",{pre:!0,attrs:{class:"hljs-title function_"}},[s._v("push")]),s._v("(<f> functionContext);\n"),a("span",{pre:!0,attrs:{class:"hljs-title class_"}},[s._v("ECStack")]),s._v("."),a("span",{pre:!0,attrs:{class:"hljs-title function_"}},[s._v("pop")]),s._v("();\n"),a("span",{pre:!0,attrs:{class:"hljs-title class_"}},[s._v("ECStack")]),s._v("."),a("span",{pre:!0,attrs:{class:"hljs-title function_"}},[s._v("pop")]),s._v("();\n")])]),a("p",[s._v("让我们模拟第二段代码：")]),a("pre",{pre:!0},[a("code",{pre:!0,attrs:{"v-pre":"",class:"language-js"}},[a("span",{pre:!0,attrs:{class:"hljs-title class_"}},[s._v("ECStack")]),s._v("."),a("span",{pre:!0,attrs:{class:"hljs-title function_"}},[s._v("push")]),s._v("(<checkscope> functionContext);\n"),a("span",{pre:!0,attrs:{class:"hljs-title class_"}},[s._v("ECStack")]),s._v("."),a("span",{pre:!0,attrs:{class:"hljs-title function_"}},[s._v("pop")]),s._v("();\n"),a("span",{pre:!0,attrs:{class:"hljs-title class_"}},[s._v("ECStack")]),s._v("."),a("span",{pre:!0,attrs:{class:"hljs-title function_"}},[s._v("push")]),s._v("(<f> functionContext);\n"),a("span",{pre:!0,attrs:{class:"hljs-title class_"}},[s._v("ECStack")]),s._v("."),a("span",{pre:!0,attrs:{class:"hljs-title function_"}},[s._v("pop")]),s._v("();\n")])]),a("p",[s._v("是不是有些不同呢？")]),a("p",[s._v("当然了，这样概括的回答执行上下文栈的变化不同，是不是依然有一种意犹未尽的感觉呢，为了更详细讲解两个函数执行上的区别，我们需要探究一下执行上下文到底包含了哪些内容，所以欢迎阅读下一篇《变量对象》。")]),a("h2",[s._v("下一篇文章")]),a("p",[a("a",{attrs:{href:"#/qingfeng/deep/deep-04"}},[s._v("《04 变量对象》")])])])])])}],!1,null,null,null);t.default=l.exports}}]);