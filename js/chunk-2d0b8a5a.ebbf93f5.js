(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-2d0b8a5a"],{3029:function(e,s,a){"use strict";a.r(s);var r=a("2877"),t=Object(r.a)({},(function(){var e=this;e.$createElement;return e._self._c,e._m(0)}),[function(){var e=this,s=e.$createElement,a=e._self._c||s;return a("section",[a("html",[a("head"),a("body",[a("h1",[e._v("06 从 ECMAScript 规范解读 this")]),a("blockquote",[a("p",[e._v("JavaScript 深入系列第六篇，本篇我们追根溯源，从 ECMAScript5 规范解读 this 在函数调用时到底是如何确定的。")])]),a("h2",[e._v("前言")]),a("p",[e._v("在"),a("a",{attrs:{href:"#/qingfeng/deep/deep-03"}},[e._v("《03 执行上下文栈》")]),e._v("中讲到，当 JavaScript 代码执行一段可执行代码(executable code)时，会创建对应的执行上下文(execution context)。")]),a("p",[e._v("对于每个执行上下文，都有三个重要属性")]),a("ul",[a("li",[e._v("变量对象(Variable object，VO)")]),a("li",[e._v("作用域链(Scope chain)")]),a("li",[e._v("this")])]),a("p",[e._v("今天重点讲讲 this，然而不好讲。")]),a("p",[e._v("……")]),a("p",[e._v("因为我们要从 ECMASciript5 规范开始讲起。")]),a("p",[e._v("先奉上 ECMAScript 5.1 规范地址：")]),a("p",[e._v("英文版："),a("a",{attrs:{href:"http://es5.github.io/#x15.1"}},[e._v("http://es5.github.io/#x15.1")])]),a("p",[e._v("中文版："),a("a",{attrs:{href:"http://yanhaijing.com/es5/#115"}},[e._v("http://yanhaijing.com/es5/#115")])]),a("p",[e._v("让我们开始了解规范吧！")]),a("h2",[e._v("Types")]),a("p",[e._v("首先是第 8 章 Types：")]),a("blockquote",[a("p",[e._v("Types are further subclassified into ECMAScript language types and specification types.")])]),a("blockquote",[a("p",[e._v("An ECMAScript language type corresponds to values that are directly manipulated by an ECMAScript programmer using the ECMAScript language. The ECMAScript language types are Undefined, Null, Boolean, String, Number, and Object.")])]),a("blockquote",[a("p",[e._v("A specification type corresponds to meta-values that are used within algorithms to describe the semantics of ECMAScript language constructs and ECMAScript language types. The specification types are Reference, List, Completion, Property Descriptor, Property Identifier, Lexical Environment, and Environment Record.")])]),a("p",[e._v("我们简单的翻译一下：")]),a("p",[e._v("ECMAScript 的类型分为语言类型和规范类型。")]),a("p",[e._v("ECMAScript 语言类型是开发者直接使用 ECMAScript 可以操作的。其实就是我们常说的 Undefined, Null, Boolean, String, Number, 和 Object。")]),a("p",[e._v("而规范类型相当于 meta-values，是用来用算法描述 ECMAScript 语言结构和 ECMAScript 语言类型的。规范类型包括：Reference, List, Completion, Property Descriptor, Property Identifier, Lexical Environment, 和 Environment Record。")]),a("p",[e._v("没懂？没关系，我们只要知道在 ECMAScript 规范中还有一种只存在于规范中的类型，它们的作用是用来描述语言底层行为逻辑。")]),a("p",[e._v("今天我们要讲的重点是便是其中的 Reference 类型。它与 this 的指向有着密切的关联。")]),a("h2",[e._v("Reference")]),a("p",[e._v("那什么又是 Reference ？")]),a("p",[e._v("让我们看 8.7 章 The Reference Specification Type：")]),a("blockquote",[a("p",[e._v("The Reference type is used to explain the behaviour of such operators as delete, typeof, and the assignment operators.")])]),a("p",[e._v("所以 Reference 类型就是用来解释诸如 delete、typeof 以及赋值等操作行为的。")]),a("p",[e._v("抄袭尤雨溪大大的话，就是：")]),a("blockquote",[a("p",[e._v("这里的 Reference 是一个 Specification Type，也就是 “只存在于规范里的抽象类型”。它们是为了更好地描述语言的底层行为逻辑才存在的，但并不存在于实际的 js 代码中。")])]),a("p",[e._v("再看接下来的这段具体介绍 Reference 的内容：")]),a("blockquote",[a("p",[e._v("A Reference is a resolved name binding.")])]),a("blockquote",[a("p",[e._v("A Reference consists of three components, the base value, the referenced name and the Boolean valued strict reference flag.")])]),a("blockquote",[a("p",[e._v("The base value is either undefined, an Object, a Boolean, a String, a Number, or an environment record (10.2.1).")])]),a("blockquote",[a("p",[e._v("A base value of undefined indicates that the reference could not be resolved to a binding. The referenced name is a String.")])]),a("p",[e._v("这段讲述了 Reference 的构成，由三个组成部分，分别是：")]),a("ul",[a("li",[e._v("base value")]),a("li",[e._v("referenced name")]),a("li",[e._v("strict reference")])]),a("p",[e._v("可是这些到底是什么呢？")]),a("p",[e._v("我们简单的理解的话：")]),a("p",[e._v("base value 就是属性所在的对象或者就是 EnvironmentRecord，它的值只可能是 undefined, an Object, a Boolean, a String, a Number, or an environment record 其中的一种。")]),a("p",[e._v("referenced name 就是属性的名称。")]),a("p",[e._v("举个例子：")]),a("pre",{pre:!0},[a("code",{pre:!0,attrs:{"v-pre":"",class:"language-js"}},[a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[e._v("var")]),e._v(" foo = "),a("span",{pre:!0,attrs:{class:"hljs-number"}},[e._v("1")]),e._v("\n\n"),a("span",{pre:!0,attrs:{class:"hljs-comment"}},[e._v("// 对应的Reference是：")]),e._v("\n"),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[e._v("var")]),e._v(" fooReference = {\n  "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[e._v("base")]),e._v(": "),a("span",{pre:!0,attrs:{class:"hljs-title class_"}},[e._v("EnvironmentRecord")]),e._v(",\n  "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[e._v("name")]),e._v(": "),a("span",{pre:!0,attrs:{class:"hljs-string"}},[e._v("'foo'")]),e._v(",\n  "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[e._v("strict")]),e._v(": "),a("span",{pre:!0,attrs:{class:"hljs-literal"}},[e._v("false")]),e._v("\n}\n")])]),a("p",[e._v("再举个例子：")]),a("pre",{pre:!0},[a("code",{pre:!0,attrs:{"v-pre":"",class:"language-js"}},[a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[e._v("var")]),e._v(" foo = {\n  "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[e._v("bar")]),e._v(": "),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[e._v("function")]),e._v("("),a("span",{pre:!0,attrs:{class:"hljs-params"}}),e._v(") {\n    "),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[e._v("return")]),e._v(" "),a("span",{pre:!0,attrs:{class:"hljs-variable language_"}},[e._v("this")]),e._v("\n  }\n}\n\nfoo."),a("span",{pre:!0,attrs:{class:"hljs-title function_"}},[e._v("bar")]),e._v("() "),a("span",{pre:!0,attrs:{class:"hljs-comment"}},[e._v("// foo")]),e._v("\n\n"),a("span",{pre:!0,attrs:{class:"hljs-comment"}},[e._v("// bar对应的Reference是：")]),e._v("\n"),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[e._v("var")]),e._v(" "),a("span",{pre:!0,attrs:{class:"hljs-title class_"}},[e._v("BarReference")]),e._v(" = {\n  "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[e._v("base")]),e._v(": foo,\n  "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[e._v("propertyName")]),e._v(": "),a("span",{pre:!0,attrs:{class:"hljs-string"}},[e._v("'bar'")]),e._v(",\n  "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[e._v("strict")]),e._v(": "),a("span",{pre:!0,attrs:{class:"hljs-literal"}},[e._v("false")]),e._v("\n}\n")])]),a("p",[e._v("而且规范中还提供了获取 Reference 组成部分的方法，比如 GetBase 和 IsPropertyReference。")]),a("p",[e._v("这两个方法很简单，简单看一看：")]),a("p",[e._v("1.GetBase")]),a("blockquote",[a("p",[e._v("GetBase(V). Returns the base value component of the reference V.")])]),a("p",[e._v("返回 reference 的 base value。")]),a("p",[e._v("2.IsPropertyReference")]),a("blockquote",[a("p",[e._v("IsPropertyReference(V). Returns true if either the base value is an object or HasPrimitiveBase(V) is true; otherwise returns false.")])]),a("p",[e._v("简单的理解：如果 base value 是一个对象，就返回 true。")]),a("h2",[e._v("GetValue")]),a("p",[e._v("除此之外，紧接着在 8.7.1 章规范中就讲了一个用于从 Reference 类型获取对应值的方法： GetValue。")]),a("p",[e._v("简单模拟 GetValue 的使用：")]),a("pre",{pre:!0},[a("code",{pre:!0,attrs:{"v-pre":"",class:"language-js"}},[a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[e._v("var")]),e._v(" foo = "),a("span",{pre:!0,attrs:{class:"hljs-number"}},[e._v("1")]),e._v("\n\n"),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[e._v("var")]),e._v(" fooReference = {\n  "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[e._v("base")]),e._v(": "),a("span",{pre:!0,attrs:{class:"hljs-title class_"}},[e._v("EnvironmentRecord")]),e._v(",\n  "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[e._v("name")]),e._v(": "),a("span",{pre:!0,attrs:{class:"hljs-string"}},[e._v("'foo'")]),e._v(",\n  "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[e._v("strict")]),e._v(": "),a("span",{pre:!0,attrs:{class:"hljs-literal"}},[e._v("false")]),e._v("\n}\n\n"),a("span",{pre:!0,attrs:{class:"hljs-title class_"}},[e._v("GetValue")]),e._v("(fooReference) "),a("span",{pre:!0,attrs:{class:"hljs-comment"}},[e._v("// 1;")]),e._v("\n")])]),a("p",[e._v("GetValue 返回对象属性真正的值，但是要注意：")]),a("p",[a("strong",[e._v("调用 GetValue，返回的将是具体的值，而不再是一个 Reference")])]),a("p",[e._v("这个很重要，这个很重要，这个很重要。")]),a("h2",[e._v("如何确定 this 的值")]),a("p",[e._v("关于 Reference 讲了那么多，为什么要讲 Reference 呢？到底 Reference 跟本文的主题 this 有哪些关联呢？如果你能耐心看完之前的内容，以下开始进入高能阶段：")]),a("p",[e._v("看规范 11.2.3 Function Calls：")]),a("p",[e._v("这里讲了当函数调用的时候，如何确定 this 的取值。")]),a("p",[e._v("只看第一步、第六步、第七步：")]),a("blockquote",[a("p",[e._v("1.Let "),a("em",[e._v("ref")]),e._v(" be the result of evaluating MemberExpression.")])]),a("blockquote",[a("p",[e._v("6.If Type("),a("em",[e._v("ref")]),e._v(") is Reference, then")])]),a("blockquote",[a("pre",{pre:!0},[a("code",{pre:!0,attrs:{"v-pre":""}},[e._v("  a.If IsPropertyReference(ref) is true, then\n")])])]),a("blockquote",[a("pre",{pre:!0},[a("code",{pre:!0,attrs:{"v-pre":""}},[e._v("      i.Let thisValue be GetBase(ref).\n")])])]),a("blockquote",[a("pre",{pre:!0},[a("code",{pre:!0,attrs:{"v-pre":""}},[e._v("  b.Else, the base of ref is an Environment Record\n")])])]),a("blockquote",[a("pre",{pre:!0},[a("code",{pre:!0,attrs:{"v-pre":""}},[e._v("      i.Let thisValue be the result of calling the ImplicitThisValue concrete method of GetBase(ref).\n")])])]),a("blockquote",[a("p",[e._v("7.Else, Type("),a("em",[e._v("ref")]),e._v(") is not Reference.")])]),a("blockquote",[a("pre",{pre:!0},[a("code",{pre:!0,attrs:{"v-pre":""}},[e._v("  a. Let thisValue be undefined.\n")])])]),a("p",[e._v("让我们描述一下：")]),a("ul",[a("li",[a("p",[e._v("1.计算 MemberExpression 的结果赋值给 ref")])]),a("li",[a("p",[e._v("2.判断 ref 是不是一个 Reference 类型")]),a("ul",[a("li",[a("p",[e._v("2.1 如果 ref 是 Reference，并且 IsPropertyReference(ref) 是 true, 那么 this 的值为 GetBase(ref)")])]),a("li",[a("p",[e._v("2.2 如果 ref 是 Reference，并且 base value 值是 Environment Record, 那么this的值为 ImplicitThisValue(ref)")])]),a("li",[a("p",[e._v("2.3 如果 ref 不是 Reference，那么 this 的值为 undefined")])])])])]),a("h2",[e._v("具体分析")]),a("p",[e._v("让我们一步一步看：")]),a("ol",[a("li",[e._v("计算 MemberExpression 的结果赋值给 ref")])]),a("p",[e._v("什么是 MemberExpression？看规范 11.2 Left-Hand-Side Expressions：")]),a("p",[e._v("MemberExpression :")]),a("ul",[a("li",[e._v("PrimaryExpression // 原始表达式 可以参见《JavaScript 权威指南第四章》")]),a("li",[e._v("FunctionExpression // 函数定义表达式")]),a("li",[e._v("MemberExpression [ Expression ] // 属性访问表达式")]),a("li",[e._v("MemberExpression . IdentifierName // 属性访问表达式")]),a("li",[e._v("new MemberExpression Arguments // 对象创建表达式")])]),a("p",[e._v("举个例子：")]),a("pre",{pre:!0},[a("code",{pre:!0,attrs:{"v-pre":"",class:"language-js"}},[a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[e._v("function")]),e._v(" "),a("span",{pre:!0,attrs:{class:"hljs-title function_"}},[e._v("foo")]),e._v("("),a("span",{pre:!0,attrs:{class:"hljs-params"}}),e._v(") {\n  "),a("span",{pre:!0,attrs:{class:"hljs-variable language_"}},[e._v("console")]),e._v("."),a("span",{pre:!0,attrs:{class:"hljs-title function_"}},[e._v("log")]),e._v("("),a("span",{pre:!0,attrs:{class:"hljs-variable language_"}},[e._v("this")]),e._v(")\n}\n\n"),a("span",{pre:!0,attrs:{class:"hljs-title function_"}},[e._v("foo")]),e._v("() "),a("span",{pre:!0,attrs:{class:"hljs-comment"}},[e._v("// MemberExpression 是 foo")]),e._v("\n\n"),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[e._v("function")]),e._v(" "),a("span",{pre:!0,attrs:{class:"hljs-title function_"}},[e._v("foo")]),e._v("("),a("span",{pre:!0,attrs:{class:"hljs-params"}}),e._v(") {\n  "),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[e._v("return")]),e._v(" "),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[e._v("function")]),e._v("("),a("span",{pre:!0,attrs:{class:"hljs-params"}}),e._v(") {\n    "),a("span",{pre:!0,attrs:{class:"hljs-variable language_"}},[e._v("console")]),e._v("."),a("span",{pre:!0,attrs:{class:"hljs-title function_"}},[e._v("log")]),e._v("("),a("span",{pre:!0,attrs:{class:"hljs-variable language_"}},[e._v("this")]),e._v(")\n  }\n}\n\n"),a("span",{pre:!0,attrs:{class:"hljs-title function_"}},[e._v("foo")]),e._v("()() "),a("span",{pre:!0,attrs:{class:"hljs-comment"}},[e._v("// MemberExpression 是 foo()")]),e._v("\n\n"),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[e._v("var")]),e._v(" foo = {\n  "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[e._v("bar")]),e._v(": "),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[e._v("function")]),e._v("("),a("span",{pre:!0,attrs:{class:"hljs-params"}}),e._v(") {\n    "),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[e._v("return")]),e._v(" "),a("span",{pre:!0,attrs:{class:"hljs-variable language_"}},[e._v("this")]),e._v("\n  }\n}\n\nfoo."),a("span",{pre:!0,attrs:{class:"hljs-title function_"}},[e._v("bar")]),e._v("() "),a("span",{pre:!0,attrs:{class:"hljs-comment"}},[e._v("// MemberExpression 是 foo.bar")]),e._v("\n")])]),a("p",[e._v("所以简单理解 MemberExpression 其实就是()左边的部分。")]),a("p",[e._v("2.判断 ref 是不是一个 Reference 类型。")]),a("p",[e._v("关键就在于看规范是如何处理各种 MemberExpression，返回的结果是不是一个 Reference 类型。")]),a("p",[e._v("举最后一个例子：")]),a("pre",{pre:!0},[a("code",{pre:!0,attrs:{"v-pre":"",class:"language-js"}},[a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[e._v("var")]),e._v(" value = "),a("span",{pre:!0,attrs:{class:"hljs-number"}},[e._v("1")]),e._v("\n\n"),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[e._v("var")]),e._v(" foo = {\n  "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[e._v("value")]),e._v(": "),a("span",{pre:!0,attrs:{class:"hljs-number"}},[e._v("2")]),e._v(",\n  "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[e._v("bar")]),e._v(": "),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[e._v("function")]),e._v("("),a("span",{pre:!0,attrs:{class:"hljs-params"}}),e._v(") {\n    "),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[e._v("return")]),e._v(" "),a("span",{pre:!0,attrs:{class:"hljs-variable language_"}},[e._v("this")]),e._v("."),a("span",{pre:!0,attrs:{class:"hljs-property"}},[e._v("value")]),e._v("\n  }\n}\n\n"),a("span",{pre:!0,attrs:{class:"hljs-comment"}},[e._v("//示例1")]),e._v("\n"),a("span",{pre:!0,attrs:{class:"hljs-variable language_"}},[e._v("console")]),e._v("."),a("span",{pre:!0,attrs:{class:"hljs-title function_"}},[e._v("log")]),e._v("(foo."),a("span",{pre:!0,attrs:{class:"hljs-title function_"}},[e._v("bar")]),e._v("())\n"),a("span",{pre:!0,attrs:{class:"hljs-comment"}},[e._v("//示例2")]),e._v("\n"),a("span",{pre:!0,attrs:{class:"hljs-variable language_"}},[e._v("console")]),e._v("."),a("span",{pre:!0,attrs:{class:"hljs-title function_"}},[e._v("log")]),e._v("(foo."),a("span",{pre:!0,attrs:{class:"hljs-title function_"}},[e._v("bar")]),e._v("())\n"),a("span",{pre:!0,attrs:{class:"hljs-comment"}},[e._v("//示例3")]),e._v("\n"),a("span",{pre:!0,attrs:{class:"hljs-variable language_"}},[e._v("console")]),e._v("."),a("span",{pre:!0,attrs:{class:"hljs-title function_"}},[e._v("log")]),e._v("((foo."),a("span",{pre:!0,attrs:{class:"hljs-property"}},[e._v("bar")]),e._v(" = foo."),a("span",{pre:!0,attrs:{class:"hljs-property"}},[e._v("bar")]),e._v(")())\n"),a("span",{pre:!0,attrs:{class:"hljs-comment"}},[e._v("//示例4")]),e._v("\n"),a("span",{pre:!0,attrs:{class:"hljs-variable language_"}},[e._v("console")]),e._v("."),a("span",{pre:!0,attrs:{class:"hljs-title function_"}},[e._v("log")]),e._v("(("),a("span",{pre:!0,attrs:{class:"hljs-literal"}},[e._v("false")]),e._v(" || foo."),a("span",{pre:!0,attrs:{class:"hljs-property"}},[e._v("bar")]),e._v(")())\n"),a("span",{pre:!0,attrs:{class:"hljs-comment"}},[e._v("//示例5")]),e._v("\n"),a("span",{pre:!0,attrs:{class:"hljs-variable language_"}},[e._v("console")]),e._v("."),a("span",{pre:!0,attrs:{class:"hljs-title function_"}},[e._v("log")]),e._v("((foo."),a("span",{pre:!0,attrs:{class:"hljs-property"}},[e._v("bar")]),e._v(", foo."),a("span",{pre:!0,attrs:{class:"hljs-property"}},[e._v("bar")]),e._v(")())\n")])]),a("h3",[e._v("foo.bar()")]),a("p",[e._v("在示例 1 中，MemberExpression 计算的结果是 foo.bar，那么 foo.bar 是不是一个 Reference 呢？")]),a("p",[e._v("查看规范 11.2.1 Property Accessors，这里展示了一个计算的过程，什么都不管了，就看最后一步：")]),a("blockquote",[a("p",[e._v("Return a value of type Reference whose base value is baseValue and whose referenced name is propertyNameString, and whose strict mode flag is strict.")])]),a("p",[e._v("我们得知该表达式返回了一个 Reference 类型！")]),a("p",[e._v("根据之前的内容，我们知道该值为：")]),a("pre",{pre:!0},[a("code",{pre:!0,attrs:{"v-pre":"",class:"language-js"}},[a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[e._v("var")]),e._v(" "),a("span",{pre:!0,attrs:{class:"hljs-title class_"}},[e._v("Reference")]),e._v(" = {\n  "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[e._v("base")]),e._v(": foo,\n  "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[e._v("name")]),e._v(": "),a("span",{pre:!0,attrs:{class:"hljs-string"}},[e._v("'bar'")]),e._v(",\n  "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[e._v("strict")]),e._v(": "),a("span",{pre:!0,attrs:{class:"hljs-literal"}},[e._v("false")]),e._v("\n}\n")])]),a("p",[e._v("接下来按照 2.1 的判断流程走：")]),a("blockquote",[a("p",[e._v("2.1 如果 ref 是 Reference，并且 IsPropertyReference(ref) 是 true, 那么 this 的值为 GetBase(ref)")])]),a("p",[e._v("该值是 Reference 类型，那么 IsPropertyReference(ref) 的结果是多少呢？")]),a("p",[e._v("前面我们已经铺垫了 IsPropertyReference 方法，如果 base value 是一个对象，结果返回 true。")]),a("p",[e._v("base value 为 foo，是一个对象，所以 IsPropertyReference(ref) 结果为 true。")]),a("p",[e._v("这个时候我们就可以确定 this 的值了：")]),a("pre",{pre:!0},[a("code",{pre:!0,attrs:{"v-pre":"",class:"language-js"}},[a("span",{pre:!0,attrs:{class:"hljs-variable language_"}},[e._v("this")]),e._v(" = "),a("span",{pre:!0,attrs:{class:"hljs-title class_"}},[e._v("GetBase")]),e._v("(ref)，\n")])]),a("p",[e._v("GetBase 也已经铺垫了，获得 base value 值，这个例子中就是 foo，所以 this 的值就是 foo ，示例 1 的结果就是 2！")]),a("p",[e._v("唉呀妈呀，为了证明 this 指向 foo，真是累死我了！但是知道了原理，剩下的就更快了。")]),a("h3",[e._v("(foo.bar)()")]),a("p",[e._v("看示例 2：")]),a("pre",{pre:!0},[a("code",{pre:!0,attrs:{"v-pre":"",class:"language-js"}},[a("span",{pre:!0,attrs:{class:"hljs-variable language_"}},[e._v("console")]),e._v("."),a("span",{pre:!0,attrs:{class:"hljs-title function_"}},[e._v("log")]),e._v("(foo."),a("span",{pre:!0,attrs:{class:"hljs-title function_"}},[e._v("bar")]),e._v("())\n")])]),a("p",[e._v("foo.bar 被 () 包住，查看规范 11.1.6 The Grouping Operator")]),a("p",[e._v("直接看结果部分：")]),a("blockquote",[a("p",[e._v("Return the result of evaluating Expression. This may be of type Reference.")])]),a("blockquote",[a("p",[e._v("NOTE This algorithm does not apply GetValue to the result of evaluating Expression.")])]),a("p",[e._v("实际上 () 并没有对 MemberExpression 进行计算，所以其实跟示例 1 的结果是一样的。")]),a("h3",[e._v("(foo.bar = foo.bar)()")]),a("p",[e._v("看示例 3，有赋值操作符，查看规范 11.13.1 Simple Assignment ( = ):")]),a("p",[e._v("计算的第三步：")]),a("blockquote",[a("p",[e._v("3.Let rval be GetValue(rref).")])]),a("p",[e._v("因为使用了 GetValue，所以返回的值不是 Reference 类型，")]),a("p",[e._v("按照之前讲的判断逻辑：")]),a("blockquote",[a("p",[e._v("2.3 如果 ref 不是 Reference，那么 this 的值为 undefined")])]),a("p",[e._v("this 为 undefined，非严格模式下，this 的值为 undefined 的时候，其值会被隐式转换为全局对象。")]),a("h3",[e._v("(false || foo.bar)()")]),a("p",[e._v("看示例 4，逻辑与算法，查看规范 11.11 Binary Logical Operators：")]),a("p",[e._v("计算第二步：")]),a("blockquote",[a("p",[e._v("2.Let lval be GetValue(lref).")])]),a("p",[e._v("因为使用了 GetValue，所以返回的不是 Reference 类型，this 为 undefined")]),a("h3",[e._v("(foo.bar, foo.bar)()")]),a("p",[e._v("看示例 5，逗号操作符，查看规范 11.14 Comma Operator ( , )")]),a("p",[e._v("计算第二步：")]),a("blockquote",[a("p",[e._v("2.Call GetValue(lref).")])]),a("p",[e._v("因为使用了 GetValue，所以返回的不是 Reference 类型，this 为 undefined")]),a("h3",[e._v("揭晓结果")]),a("p",[e._v("所以最后一个例子的结果是：")]),a("pre",{pre:!0},[a("code",{pre:!0,attrs:{"v-pre":"",class:"language-js"}},[a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[e._v("var")]),e._v(" value = "),a("span",{pre:!0,attrs:{class:"hljs-number"}},[e._v("1")]),e._v("\n\n"),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[e._v("var")]),e._v(" foo = {\n  "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[e._v("value")]),e._v(": "),a("span",{pre:!0,attrs:{class:"hljs-number"}},[e._v("2")]),e._v(",\n  "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[e._v("bar")]),e._v(": "),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[e._v("function")]),e._v("("),a("span",{pre:!0,attrs:{class:"hljs-params"}}),e._v(") {\n    "),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[e._v("return")]),e._v(" "),a("span",{pre:!0,attrs:{class:"hljs-variable language_"}},[e._v("this")]),e._v("."),a("span",{pre:!0,attrs:{class:"hljs-property"}},[e._v("value")]),e._v("\n  }\n}\n\n"),a("span",{pre:!0,attrs:{class:"hljs-comment"}},[e._v("//示例1")]),e._v("\n"),a("span",{pre:!0,attrs:{class:"hljs-variable language_"}},[e._v("console")]),e._v("."),a("span",{pre:!0,attrs:{class:"hljs-title function_"}},[e._v("log")]),e._v("(foo."),a("span",{pre:!0,attrs:{class:"hljs-title function_"}},[e._v("bar")]),e._v("()) "),a("span",{pre:!0,attrs:{class:"hljs-comment"}},[e._v("// 2")]),e._v("\n"),a("span",{pre:!0,attrs:{class:"hljs-comment"}},[e._v("//示例2")]),e._v("\n"),a("span",{pre:!0,attrs:{class:"hljs-variable language_"}},[e._v("console")]),e._v("."),a("span",{pre:!0,attrs:{class:"hljs-title function_"}},[e._v("log")]),e._v("(foo."),a("span",{pre:!0,attrs:{class:"hljs-title function_"}},[e._v("bar")]),e._v("()) "),a("span",{pre:!0,attrs:{class:"hljs-comment"}},[e._v("// 2")]),e._v("\n"),a("span",{pre:!0,attrs:{class:"hljs-comment"}},[e._v("//示例3")]),e._v("\n"),a("span",{pre:!0,attrs:{class:"hljs-variable language_"}},[e._v("console")]),e._v("."),a("span",{pre:!0,attrs:{class:"hljs-title function_"}},[e._v("log")]),e._v("((foo."),a("span",{pre:!0,attrs:{class:"hljs-property"}},[e._v("bar")]),e._v(" = foo."),a("span",{pre:!0,attrs:{class:"hljs-property"}},[e._v("bar")]),e._v(")()) "),a("span",{pre:!0,attrs:{class:"hljs-comment"}},[e._v("// 1")]),e._v("\n"),a("span",{pre:!0,attrs:{class:"hljs-comment"}},[e._v("//示例4")]),e._v("\n"),a("span",{pre:!0,attrs:{class:"hljs-variable language_"}},[e._v("console")]),e._v("."),a("span",{pre:!0,attrs:{class:"hljs-title function_"}},[e._v("log")]),e._v("(("),a("span",{pre:!0,attrs:{class:"hljs-literal"}},[e._v("false")]),e._v(" || foo."),a("span",{pre:!0,attrs:{class:"hljs-property"}},[e._v("bar")]),e._v(")()) "),a("span",{pre:!0,attrs:{class:"hljs-comment"}},[e._v("// 1")]),e._v("\n"),a("span",{pre:!0,attrs:{class:"hljs-comment"}},[e._v("//示例5")]),e._v("\n"),a("span",{pre:!0,attrs:{class:"hljs-variable language_"}},[e._v("console")]),e._v("."),a("span",{pre:!0,attrs:{class:"hljs-title function_"}},[e._v("log")]),e._v("((foo."),a("span",{pre:!0,attrs:{class:"hljs-property"}},[e._v("bar")]),e._v(", foo."),a("span",{pre:!0,attrs:{class:"hljs-property"}},[e._v("bar")]),e._v(")()) "),a("span",{pre:!0,attrs:{class:"hljs-comment"}},[e._v("// 1")]),e._v("\n")])]),a("p",[e._v("注意：以上是在非严格模式下的结果，严格模式下因为 this 返回 undefined，所以示例 3 会报错。")]),a("h3",[e._v("补充")]),a("p",[e._v("最最后，忘记了一个最最普通的情况：")]),a("pre",{pre:!0},[a("code",{pre:!0,attrs:{"v-pre":"",class:"language-js"}},[a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[e._v("function")]),e._v(" "),a("span",{pre:!0,attrs:{class:"hljs-title function_"}},[e._v("foo")]),e._v("("),a("span",{pre:!0,attrs:{class:"hljs-params"}}),e._v(") {\n  "),a("span",{pre:!0,attrs:{class:"hljs-variable language_"}},[e._v("console")]),e._v("."),a("span",{pre:!0,attrs:{class:"hljs-title function_"}},[e._v("log")]),e._v("("),a("span",{pre:!0,attrs:{class:"hljs-variable language_"}},[e._v("this")]),e._v(")\n}\n\n"),a("span",{pre:!0,attrs:{class:"hljs-title function_"}},[e._v("foo")]),e._v("()\n")])]),a("p",[e._v("MemberExpression 是 foo，解析标识符，查看规范 10.3.1 Identifier Resolution，会返回一个 Reference 类型的值：")]),a("pre",{pre:!0},[a("code",{pre:!0,attrs:{"v-pre":"",class:"language-js"}},[a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[e._v("var")]),e._v(" fooReference = {\n  "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[e._v("base")]),e._v(": "),a("span",{pre:!0,attrs:{class:"hljs-title class_"}},[e._v("EnvironmentRecord")]),e._v(",\n  "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[e._v("name")]),e._v(": "),a("span",{pre:!0,attrs:{class:"hljs-string"}},[e._v("'foo'")]),e._v(",\n  "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[e._v("strict")]),e._v(": "),a("span",{pre:!0,attrs:{class:"hljs-literal"}},[e._v("false")]),e._v("\n}\n")])]),a("p",[e._v("接下来进行判断：")]),a("blockquote",[a("p",[e._v("2.1 如果 ref 是 Reference，并且 IsPropertyReference(ref) 是 true, 那么 this 的值为 GetBase(ref)")])]),a("p",[e._v("因为 base value 是 EnvironmentRecord，并不是一个 Object 类型，还记得前面讲过的 base value 的取值可能吗？ 只可能是 undefined, an Object, a Boolean, a String, a Number, 和 an environment record 中的一种。")]),a("p",[e._v("IsPropertyReference(ref) 的结果为 false，进入下个判断：")]),a("blockquote",[a("p",[e._v("2.2 如果 ref 是 Reference，并且 base value 值是 Environment Record, 那么 this 的值为 ImplicitThisValue(ref)")])]),a("p",[e._v("base value 正是 Environment Record，所以会调用 ImplicitThisValue(ref)")]),a("p",[e._v("查看规范 10.2.1.1.6，ImplicitThisValue 方法的介绍：该函数始终返回 undefined。")]),a("p",[e._v("所以最后 this 的值就是 undefined。")]),a("h2",[e._v("多说一句")]),a("p",[e._v("尽管我们可以简单的理解 this 为调用函数的对象，如果是这样的话，如何解释下面这个例子呢？")]),a("pre",{pre:!0},[a("code",{pre:!0,attrs:{"v-pre":"",class:"language-js"}},[a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[e._v("var")]),e._v(" value = "),a("span",{pre:!0,attrs:{class:"hljs-number"}},[e._v("1")]),e._v("\n\n"),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[e._v("var")]),e._v(" foo = {\n  "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[e._v("value")]),e._v(": "),a("span",{pre:!0,attrs:{class:"hljs-number"}},[e._v("2")]),e._v(",\n  "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[e._v("bar")]),e._v(": "),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[e._v("function")]),e._v("("),a("span",{pre:!0,attrs:{class:"hljs-params"}}),e._v(") {\n    "),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[e._v("return")]),e._v(" "),a("span",{pre:!0,attrs:{class:"hljs-variable language_"}},[e._v("this")]),e._v("."),a("span",{pre:!0,attrs:{class:"hljs-property"}},[e._v("value")]),e._v("\n  }\n}\n"),a("span",{pre:!0,attrs:{class:"hljs-variable language_"}},[e._v("console")]),e._v("."),a("span",{pre:!0,attrs:{class:"hljs-title function_"}},[e._v("log")]),e._v("(("),a("span",{pre:!0,attrs:{class:"hljs-literal"}},[e._v("false")]),e._v(" || foo."),a("span",{pre:!0,attrs:{class:"hljs-property"}},[e._v("bar")]),e._v(")()) "),a("span",{pre:!0,attrs:{class:"hljs-comment"}},[e._v("// 1")]),e._v("\n")])]),a("p",[e._v("此外，又如何确定调用函数的对象是谁呢？在写文章之初，我就面临着这些问题，最后还是放弃从多个情形下给大家讲解 this 指向的思路，而是追根溯源的从 ECMASciript 规范讲解 this 的指向，尽管从这个角度写起来和读起来都比较吃力，但是一旦多读几遍，明白原理，绝对会给你一个全新的视角看待 this 。而你也就能明白，尽管 foo() 和 (foo.bar = foo.bar)() 最后结果都指向了 undefined，但是两者从规范的角度上却有着本质的区别。")]),a("p",[e._v("此篇讲解执行上下文的 this，即便不是很理解此篇的内容，依然不影响大家了解执行上下文这个主题下其他的内容。所以，依然可以安心的看下一篇文章。")]),a("h2",[e._v("下一篇文章")]),a("p",[a("a",{attrs:{href:"#/qingfeng/deep/deep-07"}},[e._v("《07 执行上下文》")])])])])])}],!1,null,null,null);s.default=t.exports}}]);