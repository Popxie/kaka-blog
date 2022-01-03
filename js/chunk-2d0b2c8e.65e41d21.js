(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-2d0b2c8e"],{"261e":function(s,a,t){"use strict";t.r(a);var r=t("2877"),l=Object(r.a)({},(function(){var s=this;s.$createElement;return s._self._c,s._m(0)}),[function(){var s=this,a=s.$createElement,t=s._self._c||a;return t("section",[t("html",[t("head"),t("body",[t("h1",[s._v("15 JavaScript 继承的多种方式和优缺点")]),t("blockquote",[t("p",[s._v("JavaScript 深入系列第十五篇，讲解 JavaScript 各种继承方式和优缺点。")])]),t("h2",[s._v("写在前面")]),t("p",[s._v("本文讲解 JavaScript 各种继承方式和优缺点。")]),t("p",[s._v("但是注意：")]),t("p",[s._v("这篇文章更像是笔记，哎，再让我感叹一句：《JavaScript 高级程序设计》写得真是太好了！")]),t("h2",[s._v("1.原型链继承")]),t("pre",{pre:!0},[t("code",{pre:!0,attrs:{"v-pre":"",class:"language-js"}},[t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("function")]),s._v(" "),t("span",{pre:!0,attrs:{class:"hljs-title function_"}},[s._v("Parent")]),s._v("("),t("span",{pre:!0,attrs:{class:"hljs-params"}}),s._v(") {\n  "),t("span",{pre:!0,attrs:{class:"hljs-variable language_"}},[s._v("this")]),s._v("."),t("span",{pre:!0,attrs:{class:"hljs-property"}},[s._v("name")]),s._v(" = "),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'kevin'")]),s._v("\n}\n\n"),t("span",{pre:!0,attrs:{class:"hljs-title class_"}},[s._v("Parent")]),s._v("."),t("span",{pre:!0,attrs:{class:"hljs-property"}},[t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("prototype")])]),s._v("."),t("span",{pre:!0,attrs:{class:"hljs-property"}},[s._v("getName")]),s._v(" = "),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("function")]),s._v("("),t("span",{pre:!0,attrs:{class:"hljs-params"}}),s._v(") {\n  "),t("span",{pre:!0,attrs:{class:"hljs-variable language_"}},[s._v("console")]),s._v("."),t("span",{pre:!0,attrs:{class:"hljs-title function_"}},[s._v("log")]),s._v("("),t("span",{pre:!0,attrs:{class:"hljs-variable language_"}},[s._v("this")]),s._v("."),t("span",{pre:!0,attrs:{class:"hljs-property"}},[s._v("name")]),s._v(")\n}\n\n"),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("function")]),s._v(" "),t("span",{pre:!0,attrs:{class:"hljs-title function_"}},[s._v("Child")]),s._v("("),t("span",{pre:!0,attrs:{class:"hljs-params"}}),s._v(") {}\n\n"),t("span",{pre:!0,attrs:{class:"hljs-title class_"}},[s._v("Child")]),s._v("."),t("span",{pre:!0,attrs:{class:"hljs-property"}},[t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("prototype")])]),s._v(" = "),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("new")]),s._v(" "),t("span",{pre:!0,attrs:{class:"hljs-title class_"}},[s._v("Parent")]),s._v("()\n\n"),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("var")]),s._v(" child1 = "),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("new")]),s._v(" "),t("span",{pre:!0,attrs:{class:"hljs-title class_"}},[s._v("Child")]),s._v("()\n\n"),t("span",{pre:!0,attrs:{class:"hljs-variable language_"}},[s._v("console")]),s._v("."),t("span",{pre:!0,attrs:{class:"hljs-title function_"}},[s._v("log")]),s._v("(child1."),t("span",{pre:!0,attrs:{class:"hljs-title function_"}},[s._v("getName")]),s._v("()) "),t("span",{pre:!0,attrs:{class:"hljs-comment"}},[s._v("// kevin")]),s._v("\n")])]),t("p",[s._v("问题：")]),t("p",[s._v("1.引用类型的属性被所有实例共享，举个例子：")]),t("pre",{pre:!0},[t("code",{pre:!0,attrs:{"v-pre":"",class:"language-js"}},[t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("function")]),s._v(" "),t("span",{pre:!0,attrs:{class:"hljs-title function_"}},[s._v("Parent")]),s._v("("),t("span",{pre:!0,attrs:{class:"hljs-params"}}),s._v(") {\n  "),t("span",{pre:!0,attrs:{class:"hljs-variable language_"}},[s._v("this")]),s._v("."),t("span",{pre:!0,attrs:{class:"hljs-property"}},[s._v("names")]),s._v(" = ["),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'kevin'")]),s._v(", "),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'daisy'")]),s._v("]\n}\n\n"),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("function")]),s._v(" "),t("span",{pre:!0,attrs:{class:"hljs-title function_"}},[s._v("Child")]),s._v("("),t("span",{pre:!0,attrs:{class:"hljs-params"}}),s._v(") {}\n\n"),t("span",{pre:!0,attrs:{class:"hljs-title class_"}},[s._v("Child")]),s._v("."),t("span",{pre:!0,attrs:{class:"hljs-property"}},[t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("prototype")])]),s._v(" = "),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("new")]),s._v(" "),t("span",{pre:!0,attrs:{class:"hljs-title class_"}},[s._v("Parent")]),s._v("()\n\n"),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("var")]),s._v(" child1 = "),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("new")]),s._v(" "),t("span",{pre:!0,attrs:{class:"hljs-title class_"}},[s._v("Child")]),s._v("()\n\nchild1."),t("span",{pre:!0,attrs:{class:"hljs-property"}},[s._v("names")]),s._v("."),t("span",{pre:!0,attrs:{class:"hljs-title function_"}},[s._v("push")]),s._v("("),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'yayu'")]),s._v(")\n\n"),t("span",{pre:!0,attrs:{class:"hljs-variable language_"}},[s._v("console")]),s._v("."),t("span",{pre:!0,attrs:{class:"hljs-title function_"}},[s._v("log")]),s._v("(child1."),t("span",{pre:!0,attrs:{class:"hljs-property"}},[s._v("names")]),s._v(") "),t("span",{pre:!0,attrs:{class:"hljs-comment"}},[s._v('// ["kevin", "daisy", "yayu"]')]),s._v("\n\n"),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("var")]),s._v(" child2 = "),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("new")]),s._v(" "),t("span",{pre:!0,attrs:{class:"hljs-title class_"}},[s._v("Child")]),s._v("()\n\n"),t("span",{pre:!0,attrs:{class:"hljs-variable language_"}},[s._v("console")]),s._v("."),t("span",{pre:!0,attrs:{class:"hljs-title function_"}},[s._v("log")]),s._v("(child2."),t("span",{pre:!0,attrs:{class:"hljs-property"}},[s._v("names")]),s._v(") "),t("span",{pre:!0,attrs:{class:"hljs-comment"}},[s._v('// ["kevin", "daisy", "yayu"]')]),s._v("\n")])]),t("p",[s._v("2.在创建 Child 的实例时，不能向 Parent 传参")]),t("h2",[s._v("2.借用构造函数(经典继承)")]),t("pre",{pre:!0},[t("code",{pre:!0,attrs:{"v-pre":"",class:"language-js"}},[t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("function")]),s._v(" "),t("span",{pre:!0,attrs:{class:"hljs-title function_"}},[s._v("Parent")]),s._v("("),t("span",{pre:!0,attrs:{class:"hljs-params"}}),s._v(") {\n  "),t("span",{pre:!0,attrs:{class:"hljs-variable language_"}},[s._v("this")]),s._v("."),t("span",{pre:!0,attrs:{class:"hljs-property"}},[s._v("names")]),s._v(" = ["),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'kevin'")]),s._v(", "),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'daisy'")]),s._v("]\n}\n\n"),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("function")]),s._v(" "),t("span",{pre:!0,attrs:{class:"hljs-title function_"}},[s._v("Child")]),s._v("("),t("span",{pre:!0,attrs:{class:"hljs-params"}}),s._v(") {\n  "),t("span",{pre:!0,attrs:{class:"hljs-title class_"}},[s._v("Parent")]),s._v("."),t("span",{pre:!0,attrs:{class:"hljs-title function_"}},[s._v("call")]),s._v("("),t("span",{pre:!0,attrs:{class:"hljs-variable language_"}},[s._v("this")]),s._v(")\n}\n\n"),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("var")]),s._v(" child1 = "),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("new")]),s._v(" "),t("span",{pre:!0,attrs:{class:"hljs-title class_"}},[s._v("Child")]),s._v("()\n\nchild1."),t("span",{pre:!0,attrs:{class:"hljs-property"}},[s._v("names")]),s._v("."),t("span",{pre:!0,attrs:{class:"hljs-title function_"}},[s._v("push")]),s._v("("),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'yayu'")]),s._v(")\n\n"),t("span",{pre:!0,attrs:{class:"hljs-variable language_"}},[s._v("console")]),s._v("."),t("span",{pre:!0,attrs:{class:"hljs-title function_"}},[s._v("log")]),s._v("(child1."),t("span",{pre:!0,attrs:{class:"hljs-property"}},[s._v("names")]),s._v(") "),t("span",{pre:!0,attrs:{class:"hljs-comment"}},[s._v('// ["kevin", "daisy", "yayu"]')]),s._v("\n\n"),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("var")]),s._v(" child2 = "),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("new")]),s._v(" "),t("span",{pre:!0,attrs:{class:"hljs-title class_"}},[s._v("Child")]),s._v("()\n\n"),t("span",{pre:!0,attrs:{class:"hljs-variable language_"}},[s._v("console")]),s._v("."),t("span",{pre:!0,attrs:{class:"hljs-title function_"}},[s._v("log")]),s._v("(child2."),t("span",{pre:!0,attrs:{class:"hljs-property"}},[s._v("names")]),s._v(") "),t("span",{pre:!0,attrs:{class:"hljs-comment"}},[s._v('// ["kevin", "daisy"]')]),s._v("\n")])]),t("p",[s._v("优点：")]),t("p",[s._v("1.避免了引用类型的属性被所有实例共享")]),t("p",[s._v("2.可以在 Child 中向 Parent 传参")]),t("p",[s._v("举个例子：")]),t("pre",{pre:!0},[t("code",{pre:!0,attrs:{"v-pre":"",class:"language-js"}},[t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("function")]),s._v(" "),t("span",{pre:!0,attrs:{class:"hljs-title function_"}},[s._v("Parent")]),s._v("("),t("span",{pre:!0,attrs:{class:"hljs-params"}},[s._v("name")]),s._v(") {\n  "),t("span",{pre:!0,attrs:{class:"hljs-variable language_"}},[s._v("this")]),s._v("."),t("span",{pre:!0,attrs:{class:"hljs-property"}},[s._v("name")]),s._v(" = name\n}\n\n"),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("function")]),s._v(" "),t("span",{pre:!0,attrs:{class:"hljs-title function_"}},[s._v("Child")]),s._v("("),t("span",{pre:!0,attrs:{class:"hljs-params"}},[s._v("name")]),s._v(") {\n  "),t("span",{pre:!0,attrs:{class:"hljs-title class_"}},[s._v("Parent")]),s._v("."),t("span",{pre:!0,attrs:{class:"hljs-title function_"}},[s._v("call")]),s._v("("),t("span",{pre:!0,attrs:{class:"hljs-variable language_"}},[s._v("this")]),s._v(", name)\n}\n\n"),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("var")]),s._v(" child1 = "),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("new")]),s._v(" "),t("span",{pre:!0,attrs:{class:"hljs-title class_"}},[s._v("Child")]),s._v("("),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'kevin'")]),s._v(")\n\n"),t("span",{pre:!0,attrs:{class:"hljs-variable language_"}},[s._v("console")]),s._v("."),t("span",{pre:!0,attrs:{class:"hljs-title function_"}},[s._v("log")]),s._v("(child1."),t("span",{pre:!0,attrs:{class:"hljs-property"}},[s._v("name")]),s._v(") "),t("span",{pre:!0,attrs:{class:"hljs-comment"}},[s._v("// kevin")]),s._v("\n\n"),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("var")]),s._v(" child2 = "),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("new")]),s._v(" "),t("span",{pre:!0,attrs:{class:"hljs-title class_"}},[s._v("Child")]),s._v("("),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'daisy'")]),s._v(")\n\n"),t("span",{pre:!0,attrs:{class:"hljs-variable language_"}},[s._v("console")]),s._v("."),t("span",{pre:!0,attrs:{class:"hljs-title function_"}},[s._v("log")]),s._v("(child2."),t("span",{pre:!0,attrs:{class:"hljs-property"}},[s._v("name")]),s._v(") "),t("span",{pre:!0,attrs:{class:"hljs-comment"}},[s._v("// daisy")]),s._v("\n")])]),t("p",[s._v("缺点：")]),t("p",[s._v("方法都在构造函数中定义，每次创建实例都会创建一遍方法。")]),t("h2",[s._v("3.组合继承")]),t("p",[s._v("原型链继承和经典继承双剑合璧。")]),t("pre",{pre:!0},[t("code",{pre:!0,attrs:{"v-pre":"",class:"language-js"}},[t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("function")]),s._v(" "),t("span",{pre:!0,attrs:{class:"hljs-title function_"}},[s._v("Parent")]),s._v("("),t("span",{pre:!0,attrs:{class:"hljs-params"}},[s._v("name")]),s._v(") {\n  "),t("span",{pre:!0,attrs:{class:"hljs-variable language_"}},[s._v("this")]),s._v("."),t("span",{pre:!0,attrs:{class:"hljs-property"}},[s._v("name")]),s._v(" = name\n  "),t("span",{pre:!0,attrs:{class:"hljs-variable language_"}},[s._v("this")]),s._v("."),t("span",{pre:!0,attrs:{class:"hljs-property"}},[s._v("colors")]),s._v(" = ["),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'red'")]),s._v(", "),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'blue'")]),s._v(", "),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'green'")]),s._v("]\n}\n\n"),t("span",{pre:!0,attrs:{class:"hljs-title class_"}},[s._v("Parent")]),s._v("."),t("span",{pre:!0,attrs:{class:"hljs-property"}},[t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("prototype")])]),s._v("."),t("span",{pre:!0,attrs:{class:"hljs-property"}},[s._v("getName")]),s._v(" = "),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("function")]),s._v("("),t("span",{pre:!0,attrs:{class:"hljs-params"}}),s._v(") {\n  "),t("span",{pre:!0,attrs:{class:"hljs-variable language_"}},[s._v("console")]),s._v("."),t("span",{pre:!0,attrs:{class:"hljs-title function_"}},[s._v("log")]),s._v("("),t("span",{pre:!0,attrs:{class:"hljs-variable language_"}},[s._v("this")]),s._v("."),t("span",{pre:!0,attrs:{class:"hljs-property"}},[s._v("name")]),s._v(")\n}\n\n"),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("function")]),s._v(" "),t("span",{pre:!0,attrs:{class:"hljs-title function_"}},[s._v("Child")]),s._v("("),t("span",{pre:!0,attrs:{class:"hljs-params"}},[s._v("name, age")]),s._v(") {\n  "),t("span",{pre:!0,attrs:{class:"hljs-title class_"}},[s._v("Parent")]),s._v("."),t("span",{pre:!0,attrs:{class:"hljs-title function_"}},[s._v("call")]),s._v("("),t("span",{pre:!0,attrs:{class:"hljs-variable language_"}},[s._v("this")]),s._v(", name)\n\n  "),t("span",{pre:!0,attrs:{class:"hljs-variable language_"}},[s._v("this")]),s._v("."),t("span",{pre:!0,attrs:{class:"hljs-property"}},[s._v("age")]),s._v(" = age\n}\n\n"),t("span",{pre:!0,attrs:{class:"hljs-title class_"}},[s._v("Child")]),s._v("."),t("span",{pre:!0,attrs:{class:"hljs-property"}},[t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("prototype")])]),s._v(" = "),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("new")]),s._v(" "),t("span",{pre:!0,attrs:{class:"hljs-title class_"}},[s._v("Parent")]),s._v("()\n\n"),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("var")]),s._v(" child1 = "),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("new")]),s._v(" "),t("span",{pre:!0,attrs:{class:"hljs-title class_"}},[s._v("Child")]),s._v("("),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'kevin'")]),s._v(", "),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'18'")]),s._v(")\n\nchild1."),t("span",{pre:!0,attrs:{class:"hljs-property"}},[s._v("colors")]),s._v("."),t("span",{pre:!0,attrs:{class:"hljs-title function_"}},[s._v("push")]),s._v("("),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'black'")]),s._v(")\n\n"),t("span",{pre:!0,attrs:{class:"hljs-variable language_"}},[s._v("console")]),s._v("."),t("span",{pre:!0,attrs:{class:"hljs-title function_"}},[s._v("log")]),s._v("(child1."),t("span",{pre:!0,attrs:{class:"hljs-property"}},[s._v("name")]),s._v(") "),t("span",{pre:!0,attrs:{class:"hljs-comment"}},[s._v("// kevin")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"hljs-variable language_"}},[s._v("console")]),s._v("."),t("span",{pre:!0,attrs:{class:"hljs-title function_"}},[s._v("log")]),s._v("(child1."),t("span",{pre:!0,attrs:{class:"hljs-property"}},[s._v("age")]),s._v(") "),t("span",{pre:!0,attrs:{class:"hljs-comment"}},[s._v("// 18")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"hljs-variable language_"}},[s._v("console")]),s._v("."),t("span",{pre:!0,attrs:{class:"hljs-title function_"}},[s._v("log")]),s._v("(child1."),t("span",{pre:!0,attrs:{class:"hljs-property"}},[s._v("colors")]),s._v(") "),t("span",{pre:!0,attrs:{class:"hljs-comment"}},[s._v('// ["red", "blue", "green", "black"]')]),s._v("\n\n"),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("var")]),s._v(" child2 = "),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("new")]),s._v(" "),t("span",{pre:!0,attrs:{class:"hljs-title class_"}},[s._v("Child")]),s._v("("),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'daisy'")]),s._v(", "),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'20'")]),s._v(")\n\n"),t("span",{pre:!0,attrs:{class:"hljs-variable language_"}},[s._v("console")]),s._v("."),t("span",{pre:!0,attrs:{class:"hljs-title function_"}},[s._v("log")]),s._v("(child2."),t("span",{pre:!0,attrs:{class:"hljs-property"}},[s._v("name")]),s._v(") "),t("span",{pre:!0,attrs:{class:"hljs-comment"}},[s._v("// daisy")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"hljs-variable language_"}},[s._v("console")]),s._v("."),t("span",{pre:!0,attrs:{class:"hljs-title function_"}},[s._v("log")]),s._v("(child2."),t("span",{pre:!0,attrs:{class:"hljs-property"}},[s._v("age")]),s._v(") "),t("span",{pre:!0,attrs:{class:"hljs-comment"}},[s._v("// 20")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"hljs-variable language_"}},[s._v("console")]),s._v("."),t("span",{pre:!0,attrs:{class:"hljs-title function_"}},[s._v("log")]),s._v("(child2."),t("span",{pre:!0,attrs:{class:"hljs-property"}},[s._v("colors")]),s._v(") "),t("span",{pre:!0,attrs:{class:"hljs-comment"}},[s._v('// ["red", "blue", "green"]')]),s._v("\n")])]),t("p",[s._v("优点：融合原型链继承和构造函数的优点，是 JavaScript 中最常用的继承模式。")]),t("h2",[s._v("4.原型式继承")]),t("pre",{pre:!0},[t("code",{pre:!0,attrs:{"v-pre":"",class:"language-js"}},[t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("function")]),s._v(" "),t("span",{pre:!0,attrs:{class:"hljs-title function_"}},[s._v("createObj")]),s._v("("),t("span",{pre:!0,attrs:{class:"hljs-params"}},[s._v("o")]),s._v(") {\n  "),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("function")]),s._v(" "),t("span",{pre:!0,attrs:{class:"hljs-title function_"}},[s._v("F")]),s._v("("),t("span",{pre:!0,attrs:{class:"hljs-params"}}),s._v(") {}\n  F."),t("span",{pre:!0,attrs:{class:"hljs-property"}},[t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("prototype")])]),s._v(" = o\n  "),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("return")]),s._v(" "),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("new")]),s._v(" "),t("span",{pre:!0,attrs:{class:"hljs-title function_"}},[s._v("F")]),s._v("()\n}\n")])]),t("p",[s._v("就是 ES5 Object.create 的模拟实现，将传入的对象作为创建的对象的原型。")]),t("p",[s._v("缺点：")]),t("p",[s._v("包含引用类型的属性值始终都会共享相应的值，这点跟原型链继承一样。")]),t("pre",{pre:!0},[t("code",{pre:!0,attrs:{"v-pre":"",class:"language-js"}},[t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("var")]),s._v(" person = {\n  "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("name")]),s._v(": "),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'kevin'")]),s._v(",\n  "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("friends")]),s._v(": ["),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'daisy'")]),s._v(", "),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'kelly'")]),s._v("]\n}\n\n"),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("var")]),s._v(" person1 = "),t("span",{pre:!0,attrs:{class:"hljs-title function_"}},[s._v("createObj")]),s._v("(person)\n"),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("var")]),s._v(" person2 = "),t("span",{pre:!0,attrs:{class:"hljs-title function_"}},[s._v("createObj")]),s._v("(person)\n\nperson1."),t("span",{pre:!0,attrs:{class:"hljs-property"}},[s._v("name")]),s._v(" = "),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'person1'")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"hljs-variable language_"}},[s._v("console")]),s._v("."),t("span",{pre:!0,attrs:{class:"hljs-title function_"}},[s._v("log")]),s._v("(person2."),t("span",{pre:!0,attrs:{class:"hljs-property"}},[s._v("name")]),s._v(") "),t("span",{pre:!0,attrs:{class:"hljs-comment"}},[s._v("// kevin")]),s._v("\n\nperson1."),t("span",{pre:!0,attrs:{class:"hljs-property"}},[s._v("firends")]),s._v("."),t("span",{pre:!0,attrs:{class:"hljs-title function_"}},[s._v("push")]),s._v("("),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'taylor'")]),s._v(")\n"),t("span",{pre:!0,attrs:{class:"hljs-variable language_"}},[s._v("console")]),s._v("."),t("span",{pre:!0,attrs:{class:"hljs-title function_"}},[s._v("log")]),s._v("(person2."),t("span",{pre:!0,attrs:{class:"hljs-property"}},[s._v("friends")]),s._v(") "),t("span",{pre:!0,attrs:{class:"hljs-comment"}},[s._v('// ["daisy", "kelly", "taylor"]')]),s._v("\n")])]),t("p",[s._v("注意：修改"),t("code",{pre:!0},[s._v("person1.name")]),s._v("的值，"),t("code",{pre:!0},[s._v("person2.name")]),s._v("的值并未发生改变，并不是因为"),t("code",{pre:!0},[s._v("person1")]),s._v("和"),t("code",{pre:!0},[s._v("person2")]),s._v("有独立的 name 值，而是因为"),t("code",{pre:!0},[s._v("person1.name = 'person1'")]),s._v("，给"),t("code",{pre:!0},[s._v("person1")]),s._v("添加了 name 值，并非修改了原型上的 name 值。")]),t("h2",[s._v("5. 寄生式继承")]),t("p",[s._v("创建一个仅用于封装继承过程的函数，该函数在内部以某种形式来做增强对象，最后返回对象。")]),t("pre",{pre:!0},[t("code",{pre:!0,attrs:{"v-pre":"",class:"language-js"}},[t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("function")]),s._v(" "),t("span",{pre:!0,attrs:{class:"hljs-title function_"}},[s._v("createObj")]),s._v("("),t("span",{pre:!0,attrs:{class:"hljs-params"}},[s._v("o")]),s._v(") {\n  "),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("var")]),s._v(" clone = object."),t("span",{pre:!0,attrs:{class:"hljs-title function_"}},[s._v("create")]),s._v("(o)\n  clone."),t("span",{pre:!0,attrs:{class:"hljs-property"}},[s._v("sayName")]),s._v(" = "),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("function")]),s._v("("),t("span",{pre:!0,attrs:{class:"hljs-params"}}),s._v(") {\n    "),t("span",{pre:!0,attrs:{class:"hljs-variable language_"}},[s._v("console")]),s._v("."),t("span",{pre:!0,attrs:{class:"hljs-title function_"}},[s._v("log")]),s._v("("),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'hi'")]),s._v(")\n  }\n  "),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("return")]),s._v(" clone\n}\n")])]),t("p",[s._v("缺点：跟借用构造函数模式一样，每次创建对象都会创建一遍方法。")]),t("h2",[s._v("6. 寄生组合式继承")]),t("p",[s._v("为了方便大家阅读，在这里重复一下组合继承的代码：")]),t("pre",{pre:!0},[t("code",{pre:!0,attrs:{"v-pre":"",class:"language-js"}},[t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("function")]),s._v(" "),t("span",{pre:!0,attrs:{class:"hljs-title function_"}},[s._v("Parent")]),s._v("("),t("span",{pre:!0,attrs:{class:"hljs-params"}},[s._v("name")]),s._v(") {\n  "),t("span",{pre:!0,attrs:{class:"hljs-variable language_"}},[s._v("this")]),s._v("."),t("span",{pre:!0,attrs:{class:"hljs-property"}},[s._v("name")]),s._v(" = name\n  "),t("span",{pre:!0,attrs:{class:"hljs-variable language_"}},[s._v("this")]),s._v("."),t("span",{pre:!0,attrs:{class:"hljs-property"}},[s._v("colors")]),s._v(" = ["),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'red'")]),s._v(", "),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'blue'")]),s._v(", "),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'green'")]),s._v("]\n}\n\n"),t("span",{pre:!0,attrs:{class:"hljs-title class_"}},[s._v("Parent")]),s._v("."),t("span",{pre:!0,attrs:{class:"hljs-property"}},[t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("prototype")])]),s._v("."),t("span",{pre:!0,attrs:{class:"hljs-property"}},[s._v("getName")]),s._v(" = "),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("function")]),s._v("("),t("span",{pre:!0,attrs:{class:"hljs-params"}}),s._v(") {\n  "),t("span",{pre:!0,attrs:{class:"hljs-variable language_"}},[s._v("console")]),s._v("."),t("span",{pre:!0,attrs:{class:"hljs-title function_"}},[s._v("log")]),s._v("("),t("span",{pre:!0,attrs:{class:"hljs-variable language_"}},[s._v("this")]),s._v("."),t("span",{pre:!0,attrs:{class:"hljs-property"}},[s._v("name")]),s._v(")\n}\n\n"),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("function")]),s._v(" "),t("span",{pre:!0,attrs:{class:"hljs-title function_"}},[s._v("Child")]),s._v("("),t("span",{pre:!0,attrs:{class:"hljs-params"}},[s._v("name, age")]),s._v(") {\n  "),t("span",{pre:!0,attrs:{class:"hljs-title class_"}},[s._v("Parent")]),s._v("."),t("span",{pre:!0,attrs:{class:"hljs-title function_"}},[s._v("call")]),s._v("("),t("span",{pre:!0,attrs:{class:"hljs-variable language_"}},[s._v("this")]),s._v(", name)\n  "),t("span",{pre:!0,attrs:{class:"hljs-variable language_"}},[s._v("this")]),s._v("."),t("span",{pre:!0,attrs:{class:"hljs-property"}},[s._v("age")]),s._v(" = age\n}\n\n"),t("span",{pre:!0,attrs:{class:"hljs-title class_"}},[s._v("Child")]),s._v("."),t("span",{pre:!0,attrs:{class:"hljs-property"}},[t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("prototype")])]),s._v(" = "),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("new")]),s._v(" "),t("span",{pre:!0,attrs:{class:"hljs-title class_"}},[s._v("Parent")]),s._v("()\n\n"),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("var")]),s._v(" child1 = "),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("new")]),s._v(" "),t("span",{pre:!0,attrs:{class:"hljs-title class_"}},[s._v("Child")]),s._v("("),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'kevin'")]),s._v(", "),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'18'")]),s._v(")\n\n"),t("span",{pre:!0,attrs:{class:"hljs-variable language_"}},[s._v("console")]),s._v("."),t("span",{pre:!0,attrs:{class:"hljs-title function_"}},[s._v("log")]),s._v("(child1)\n")])]),t("p",[s._v("组合继承最大的缺点是会调用两次父构造函数。")]),t("p",[s._v("一次是设置子类型实例的原型的时候：")]),t("pre",{pre:!0},[t("code",{pre:!0,attrs:{"v-pre":"",class:"language-js"}},[t("span",{pre:!0,attrs:{class:"hljs-title class_"}},[s._v("Child")]),s._v("."),t("span",{pre:!0,attrs:{class:"hljs-property"}},[t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("prototype")])]),s._v(" = "),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("new")]),s._v(" "),t("span",{pre:!0,attrs:{class:"hljs-title class_"}},[s._v("Parent")]),s._v("()\n")])]),t("p",[s._v("一次在创建子类型实例的时候：")]),t("pre",{pre:!0},[t("code",{pre:!0,attrs:{"v-pre":"",class:"language-js"}},[t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("var")]),s._v(" child1 = "),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("new")]),s._v(" "),t("span",{pre:!0,attrs:{class:"hljs-title class_"}},[s._v("Child")]),s._v("("),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'kevin'")]),s._v(", "),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'18'")]),s._v(")\n")])]),t("p",[s._v("回想下 new 的模拟实现，其实在这句中，我们会执行：")]),t("pre",{pre:!0},[t("code",{pre:!0,attrs:{"v-pre":"",class:"language-js"}},[t("span",{pre:!0,attrs:{class:"hljs-title class_"}},[s._v("Parent")]),s._v("."),t("span",{pre:!0,attrs:{class:"hljs-title function_"}},[s._v("call")]),s._v("("),t("span",{pre:!0,attrs:{class:"hljs-variable language_"}},[s._v("this")]),s._v(", name)\n")])]),t("p",[s._v("在这里，我们又会调用了一次 Parent 构造函数。")]),t("p",[s._v("所以，在这个例子中，如果我们打印 child1 对象，我们会发现 Child.prototype 和 child1 都有一个属性为"),t("code",{pre:!0},[s._v("colors")]),s._v("，属性值为"),t("code",{pre:!0},[s._v("['red', 'blue', 'green']")]),s._v("。")]),t("p",[s._v("那么我们该如何精益求精，避免这一次重复调用呢？")]),t("p",[s._v("如果我们不使用 Child.prototype = new Parent() ，而是间接的让 Child.prototype 访问到 Parent.prototype 呢？")]),t("p",[s._v("看看如何实现：")]),t("pre",{pre:!0},[t("code",{pre:!0,attrs:{"v-pre":"",class:"language-js"}},[t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("function")]),s._v(" "),t("span",{pre:!0,attrs:{class:"hljs-title function_"}},[s._v("Parent")]),s._v("("),t("span",{pre:!0,attrs:{class:"hljs-params"}},[s._v("name")]),s._v(") {\n  "),t("span",{pre:!0,attrs:{class:"hljs-variable language_"}},[s._v("this")]),s._v("."),t("span",{pre:!0,attrs:{class:"hljs-property"}},[s._v("name")]),s._v(" = name\n  "),t("span",{pre:!0,attrs:{class:"hljs-variable language_"}},[s._v("this")]),s._v("."),t("span",{pre:!0,attrs:{class:"hljs-property"}},[s._v("colors")]),s._v(" = ["),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'red'")]),s._v(", "),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'blue'")]),s._v(", "),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'green'")]),s._v("]\n}\n\n"),t("span",{pre:!0,attrs:{class:"hljs-title class_"}},[s._v("Parent")]),s._v("."),t("span",{pre:!0,attrs:{class:"hljs-property"}},[t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("prototype")])]),s._v("."),t("span",{pre:!0,attrs:{class:"hljs-property"}},[s._v("getName")]),s._v(" = "),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("function")]),s._v("("),t("span",{pre:!0,attrs:{class:"hljs-params"}}),s._v(") {\n  "),t("span",{pre:!0,attrs:{class:"hljs-variable language_"}},[s._v("console")]),s._v("."),t("span",{pre:!0,attrs:{class:"hljs-title function_"}},[s._v("log")]),s._v("("),t("span",{pre:!0,attrs:{class:"hljs-variable language_"}},[s._v("this")]),s._v("."),t("span",{pre:!0,attrs:{class:"hljs-property"}},[s._v("name")]),s._v(")\n}\n\n"),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("function")]),s._v(" "),t("span",{pre:!0,attrs:{class:"hljs-title function_"}},[s._v("Child")]),s._v("("),t("span",{pre:!0,attrs:{class:"hljs-params"}},[s._v("name, age")]),s._v(") {\n  "),t("span",{pre:!0,attrs:{class:"hljs-title class_"}},[s._v("Parent")]),s._v("."),t("span",{pre:!0,attrs:{class:"hljs-title function_"}},[s._v("call")]),s._v("("),t("span",{pre:!0,attrs:{class:"hljs-variable language_"}},[s._v("this")]),s._v(", name)\n  "),t("span",{pre:!0,attrs:{class:"hljs-variable language_"}},[s._v("this")]),s._v("."),t("span",{pre:!0,attrs:{class:"hljs-property"}},[s._v("age")]),s._v(" = age\n}\n\n"),t("span",{pre:!0,attrs:{class:"hljs-comment"}},[s._v("// 关键的三步")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("var")]),s._v(" F = "),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("function")]),s._v("("),t("span",{pre:!0,attrs:{class:"hljs-params"}}),s._v(") {}\n\nF."),t("span",{pre:!0,attrs:{class:"hljs-property"}},[t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("prototype")])]),s._v(" = "),t("span",{pre:!0,attrs:{class:"hljs-title class_"}},[s._v("Parent")]),s._v("."),t("span",{pre:!0,attrs:{class:"hljs-property"}},[t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("prototype")])]),s._v("\n\n"),t("span",{pre:!0,attrs:{class:"hljs-title class_"}},[s._v("Child")]),s._v("."),t("span",{pre:!0,attrs:{class:"hljs-property"}},[t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("prototype")])]),s._v(" = "),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("new")]),s._v(" "),t("span",{pre:!0,attrs:{class:"hljs-title function_"}},[s._v("F")]),s._v("()\n\n"),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("var")]),s._v(" child1 = "),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("new")]),s._v(" "),t("span",{pre:!0,attrs:{class:"hljs-title class_"}},[s._v("Child")]),s._v("("),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'kevin'")]),s._v(", "),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'18'")]),s._v(")\n\n"),t("span",{pre:!0,attrs:{class:"hljs-variable language_"}},[s._v("console")]),s._v("."),t("span",{pre:!0,attrs:{class:"hljs-title function_"}},[s._v("log")]),s._v("(child1)\n")])]),t("p",[s._v("最后我们封装一下这个继承方法：")]),t("pre",{pre:!0},[t("code",{pre:!0,attrs:{"v-pre":"",class:"language-js"}},[t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("function")]),s._v(" "),t("span",{pre:!0,attrs:{class:"hljs-title function_"}},[s._v("object")]),s._v("("),t("span",{pre:!0,attrs:{class:"hljs-params"}},[s._v("o")]),s._v(") {\n  "),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("function")]),s._v(" "),t("span",{pre:!0,attrs:{class:"hljs-title function_"}},[s._v("F")]),s._v("("),t("span",{pre:!0,attrs:{class:"hljs-params"}}),s._v(") {}\n  F."),t("span",{pre:!0,attrs:{class:"hljs-property"}},[t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("prototype")])]),s._v(" = o\n  "),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("return")]),s._v(" "),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("new")]),s._v(" "),t("span",{pre:!0,attrs:{class:"hljs-title function_"}},[s._v("F")]),s._v("()\n}\n\n"),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("function")]),s._v(" "),t("span",{pre:!0,attrs:{class:"hljs-title function_"}},[s._v("prototype")]),s._v("("),t("span",{pre:!0,attrs:{class:"hljs-params"}},[s._v("child, parent")]),s._v(") {\n  "),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("var")]),s._v(" prototype = "),t("span",{pre:!0,attrs:{class:"hljs-title function_"}},[s._v("object")]),s._v("(parent."),t("span",{pre:!0,attrs:{class:"hljs-property"}},[t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("prototype")])]),s._v(")\n  prototype."),t("span",{pre:!0,attrs:{class:"hljs-property"}},[s._v("constructor")]),s._v(" = child\n  child."),t("span",{pre:!0,attrs:{class:"hljs-property"}},[t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("prototype")])]),s._v(" = prototype\n}\n\n"),t("span",{pre:!0,attrs:{class:"hljs-comment"}},[s._v("// 当我们使用的时候：")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"hljs-title function_"}},[s._v("prototype")]),s._v("("),t("span",{pre:!0,attrs:{class:"hljs-title class_"}},[s._v("Child")]),s._v(", "),t("span",{pre:!0,attrs:{class:"hljs-title class_"}},[s._v("Parent")]),s._v(")\n")])]),t("p",[s._v("引用《JavaScript 高级程序设计》中对寄生组合式继承的夸赞就是：")]),t("p",[s._v("这种方式的高效率体现它只调用了一次 Parent 构造函数，并且因此避免了在 Parent.prototype 上面创建不必要的、多余的属性。与此同时，原型链还能保持不变；因此，还能够正常使用 instanceof 和 isPrototypeOf。开发人员普遍认为寄生组合式继承是引用类型最理想的继承范式。")]),t("h2",[s._v("相关链接")]),t("p",[t("a",{attrs:{href:"#/qingfeng/deep/deep-01"}},[s._v("《01 从原型到原型链》")])]),t("p",[t("a",{attrs:{href:"#/qingfeng/deep/deep-10"}},[s._v("《10 call 和 apply 的模拟实现》")])]),t("p",[t("a",{attrs:{href:"#/qingfeng/deep/deep-12"}},[s._v("《12 new 的模拟实现》")])]),t("p",[t("a",{attrs:{href:"#/qingfeng/deep/deep-14"}},[s._v("《14 创建对象》")])])])])])}],!1,null,null,null);a.default=l.exports}}]);