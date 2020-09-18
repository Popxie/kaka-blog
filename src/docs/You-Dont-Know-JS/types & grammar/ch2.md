# 你不懂JS：类型与语法
# 第二章：值

`array`、`string`、和 `number` 是任何程序的最基础构建块，但是 JavaScript 在这些类型上有一些或使你惊喜或使你惊讶的独特性质。

让我们来看几种 JS 内建的值类型，并探讨一下我们如何才能更加全面地理解并正确地利用它们的行为。

## Array

和其他强制类型的语言相比，JavaScript 的 `array` 只是值的容器，而这些值可以是任何类型：`string` 或者 `number` 或者 `object`，甚至是另一个 `array`（这也是你得到多维数组的方法）。

```js
var a = [ 1, "2", [3] ];

a.length;		// 3
a[0] === 1;		// true
a[2][0] === 3;	// true
```

你不需要预先指定 `array` 的大小，你可以仅声明它们并加入你觉得合适的值：

```js
var a = [ ];

a.length;	// 0

a[0] = 1;
a[1] = "2";
a[2] = [ 3 ];

a.length;	// 3
```

**警告：** 在一个 `array` 值上使用 `delete` 将会从这个 `array` 上移除一个值槽，但就算你移除了最后一个元素，它也 **不会** 更新 `length` 属性，所以多加小心！我们会在第五章讨论 `delete` 操作符的更多细节。

要小心创建“稀散”的 `array`（留下或创建空的/丢失的值槽）：

```js
var a = [ ];

a[0] = 1;
// 这里没有设置值槽 `a[1]`
a[2] = [ 3 ];

a[1];		// undefined

a.length;	// 3
```

虽然这可以工作，但你留下的“空值槽”可能会导致一些令人困惑的行为。虽然这样的值槽看起来拥有 `undefined` 值，但是它不会像被明确设置（`a[1] = undefined`）的值槽那样动作。更多信息可以参见第三章的“Array”。

`array` 是被数字索引的（正如你所想的那样），但微妙的是它们也是对象，可以在它们上面添加 `string` 键/属性（但是这些属性不会计算在 `array` 的 `length` 中）：

```js
var a = [ ];

a[0] = 1;
a["foobar"] = 2;

a.length;		// 1
a["foobar"];	// 2
a.foobar;		// 2
```

然而，一个需要小心的坑是，如果一个可以被强制转换为10进制 `number` 的 `string` 值被用作键的话，它会认为你想使用 `number` 索引而不是一个 `string` 键！

```js
var a = [ ];

a["13"] = 42;

a.length; // 14
```

一般来说，向 `array` 添加 `string` 键/属性不是一个好主意。最好使用 `object` 来持有键/属性形式的值，而将 `array` 专用于严格地数字索引的值。

### 类 Array

偶尔你需要将一个类 `array` 值（一个数字索引的值的集合）转换为一个真正的 `array`，通常你可以对这些值的集合调用数组的工具函数（比如 `indexOf(..)`、`concat(..)`、`forEach(..)` 等等）。

举个例子，各种 DOM 查询操作会返回一个 DOM 元素的列表，对于我们转换的目的来说，这些列表不是真正的 `array` 但是也足够类似 `array`。另一个常见的例子是，函数为了像列表一样访问它的参数值，而暴露了 `arguments` 对象（类 `array`，在 ES6 中被废弃了）。

一个进行这种转换的很常见的方法是对这个值借用 `slice(..)` 工具：

```js
function foo() {
	var arr = Array.prototype.slice.call( arguments );
	arr.push( "bam" );
	console.log( arr );
}

foo( "bar", "baz" ); // ["bar","baz","bam"]
```

如果 `slice()` 没有用其他额外的参数调用，就像上面的代码段那样，它的参数的默认值会使它具有复制这个 `array`（或者，在这个例子中，是一个类 `array`）的效果。

在 ES6 中，还有一种称为 `Array.from(..)` 的内建工具可以执行相同的任务：

```js
...
var arr = Array.from( arguments );
...
```

**注意：** `Array.from(..)` 拥有其他几种强大的能力，我们将在本系列的 *ES6 与未来* 中涵盖它的细节。

## String

一个很常见的想法是，`string` 实质上只是字符的 `array`。虽然内部的实现可能是也可能不是 `array`，但重要的是要理解 JavaScript 的 `string` 与字符的 `array` 确实不一样。它们的相似性几乎只是表面上的。

举个例子，让我们考虑这两个值：

```js
var a = "foo";
var b = ["f","o","o"];
```

String 确实与 `array` 有很肤浅的相似性 -- 也就是上面说的，类 `array` -- 举例来说，它们都有一个 `length` 属性，一个 `indexOf(..)` 方法（在 ES5 中仅有 `array` 版本），和一个 `concat(..)` 方法：

```js
a.length;							// 3
b.length;							// 3

a.indexOf( "o" );					// 1
b.indexOf( "o" );					// 1

var c = a.concat( "bar" );			// "foobar"
var d = b.concat( ["b","a","r"] );	// ["f","o","o","b","a","r"]

a === c;							// false
b === d;							// false

a;									// "foo"
b;									// ["f","o","o"]
```

那么，它们基本上都仅仅是“字符的数组”，对吧？ **不确切**：

```js
a[1] = "O";
b[1] = "O";

a; // "foo"
b; // ["f","O","o"]
```

JavaScript 的 `string` 是不可变的，而 `array` 是相当可变的。另外，在 JavaScript 中用位置访问字符的 `a[1]` 形式不总是广泛合法的。老版本的 IE 就不允许这种语法（但是它们现在允许了）。相反，*正确的* 方式是 `a.charAt(1)`。

`string` 不可变性的进一步的后果是，`string` 上没有一个方法是可以原地修改它的内容的，而是创建并返回一个新的 `string`。与之相对的是，许多改变 `array` 内容的方法实际上 *是* 原地修改的。

```js
c = a.toUpperCase();
a === c;	// false
a;			// "foo"
c;			// "FOO"

b.push( "!" );
b;			// ["f","O","o","!"]
```

另外，许多 `array` 方法在处理 `string` 时非常有用，虽然这些方法不属于 `string`，但我们可以对我们的 `string` “借用”非变化的 `array` 方法：

```js
a.join;			// undefined
a.map;			// undefined

var c = Array.prototype.join.call( a, "-" );
var d = Array.prototype.map.call( a, function(v){
	return v.toUpperCase() + ".";
} ).join( "" );

c;				// "f-o-o"
d;				// "F.O.O."
```

让我们来看另一个例子：翻转一个 `string`（顺带一提，这是一个 JavaScript 面试中常见的细节问题！）。`array` 拥有一个原地的 `reverse()` 修改器方法，但是 `string` 没有：

```js
a.reverse;		// undefined

b.reverse();	// ["!","o","O","f"]
b;				// ["!","o","O","f"]
```

不幸的是，这种“借用” `array` 修改器不起作用，因为 `string` 是不可变的，因此它不能被原地修改：

```js
Array.prototype.reverse.call( a );
// 仍然返回一个“foo”的 String 对象包装器（见第三章） :(
```

另一种迂回的做法（也是黑科技）是，将 `string` 转换为一个 `array`，实施我们想做的操作，然后将它转回 `string`。

```js
var c = a
	// 将 `a` 切分成一个字符的数组
	.split( "" )
	// 翻转字符的数组
	.reverse()
	// 将字符的数组连接回一个字符串
	.join( "" );

c; // "oof"
```

如果你觉得这很难看，没错。不管怎样，对于简单的 `string` 它 *好用*，所以如果你需要某些快速但是“脏”的东西，像这样的方式经常能满足你。

**警告：** 小心！这种方法对含有复杂（unicode）字符（星型字符、多字节字符等）的 `string` **不起作用**。你需要支持 unicode 的更精巧的工具库来准确地处理这种操作。在这个问题上可以咨询 Mathias Bynens 的作品：*Esrever*（https://github.com/mathiasbynens/esrever）。

另外一种考虑这个问题的方式是：如果你更经常地将你的“string”基本上作为 *字符的数组* 来执行一些任务的话，也许就将它们作为 `array` 而不是作为 `string` 存储更好。你可能会因此省去很多每次都将 `string` 转换为 `array` 的麻烦。无论何时你确实需要 `string` 的表现形式的话，你总是可以调用 *字符的* `array` 的 `join("")` 方法。

## Number

JavaScript 只有一种数字类型：`number`。这种类型包含“整数”值和小数值。我说“整数”时加了引号，因为 JS 的一个长久以来为人诟病的原因是，和其他语言不同，JS 没有真正的整数。这可能在未来某个时候会改变，但是目前，我们只有 `number` 可用。

所以，在 JS 中，一个“整数”只是一个没有小数部分的小数值。也就是说，`42.0` 和 `42` 一样是“整数”。

像大多数现代计算机语言，以及几乎所有的脚本语言一样，JavaScript 的 `number` 的实现基于“IEEE 754”标准，通常被称为“浮点”。JavaScript 明确地使用了这个标准的“双精度”（也就是“64位二进制”）格式。

在网络上有许多了不起的文章都在介绍二进制浮点数如何在内存中存储的细节，以及选择这些做法的意义。因为对于理解如何在 JS 中正确使用 `number` 来说，理解内存中的位模式不是必须的，所以我们将这个话题作为练习留给那些想要进一步挖掘 IEEE 754 的细节的读者。

### 数字的语法

在 JavaScript 中字面数字一般用十进制小数表达。例如：

```js
var a = 42;
var b = 42.3;
```

小数的整数部分如果是 `0`，是可选的：

```js
var a = 0.42;
var b = .42;
```

相似地，一个小数在 `.` 之后的小数部分如果是 `0`，是可选的：

```js
var a = 42.0;
var b = 42.;
```

**警告：** `42.` 是极不常见的，如果你正在努力避免别人阅读你的代码时感到困惑，它可能不是一个好主意。但不管怎样，它是合法的。

默认情况下，大多数 `number` 将会以十进制小数的形式输出，并去掉末尾小数部分的 `0`。所以：

```js
var a = 42.300;
var b = 42.0;

a; // 42.3
b; // 42
```

非常大或非常小的 `number` 将默认以指数形式输出，与 `toExponential()` 方法的输出一样，比如：

```js
var a = 5E10;
a;					// 50000000000
a.toExponential();	// "5e+10"

var b = a * a;
b;					// 2.5e+21

var c = 1 / a;
c;					// 2e-11
```

因为 `number` 值可以用 `Number` 对象包装器封装（见第三章），所以 `number` 值可以访问内建在 `Number.prototype` 上的方法（见第三章）。举个例子，`toFixed(..)` 方法允许你指定一个值在被表示时，带有多少位小数：

```js
var a = 42.59;

a.toFixed( 0 ); // "43"
a.toFixed( 1 ); // "42.6"
a.toFixed( 2 ); // "42.59"
a.toFixed( 3 ); // "42.590"
a.toFixed( 4 ); // "42.5900"
```

要注意的是，它的输出实际上是一个 `number` 的 `string` 表现形式，而且如果你指定的位数多于值持有的小数位数时，会在右侧补 `0`。

`toPrecision(..)` 很相似，但它指定的是有多少 *有效数字* 用来表示这个值：

```js
var a = 42.59;

a.toPrecision( 1 ); // "4e+1"
a.toPrecision( 2 ); // "43"
a.toPrecision( 3 ); // "42.6"
a.toPrecision( 4 ); // "42.59"
a.toPrecision( 5 ); // "42.590"
a.toPrecision( 6 ); // "42.5900"
```

你不必非得使用持有这个值的变量来访问这些方法；你可以直接在 `number` 的字面上访问这些方法。但你不得不小心 `.` 操作符。因为 `.` 是一个合法数字字符，如果可能的话，它会首先被翻译为 `number` 字面的一部分，而不是被翻译为属性访问操作符。

```js
// 不合法的语法：
42.toFixed( 3 );	// SyntaxError

// 这些都是合法的：
(42).toFixed( 3 );	// "42.000"
0.42.toFixed( 3 );	// "0.420"
42..toFixed( 3 );	// "42.000"
```

`42.toFixed(3)` 是不合法的语法，因为 `.` 作为 `42.` 字面（这是合法的 -- 参见上面的讨论！）的一部分被吞掉了，因此没有 `.` 属性操作符来表示 `.toFixed` 访问。

`42..toFixed(3)` 可以工作，因为第一个 `.` 是 `number` 的一部分，而第二个 `.` 是属性操作符。但它可能看起来很古怪，而且确实在实际的 JavaScript 代码中很少会看到这样的东西。实际上，在任何基本类型上直接访问方法是十分不常见的。但是不常见并不意味着 *坏* 或者 *错*。

**注意：** 有一些库扩展了内建的 `Number.prototype`（见第三章），使用 `number` 或在 `number` 上提供了额外的操作，所以在这些情况下，像使用 `10..makeItRain()` 来设定一个十秒钟的下钱雨的动画，或者其他诸如此类的傻事是完全合法的。

在技术上讲，这也是合法的（注意那个空格）：

```js
42 .toFixed(3); // "42.000"
```

但是，尤其是对 `number` 字面量来说，**这是特别使人糊涂的代码风格**，而且除了使其他开发者（和未来的你）糊涂以外没有任何用处。避免它。

`number` 还可以使用科学计数法的形式指定，这在表示很大的 `number` 时很常见，比如：

```js
var onethousand = 1E3;						// 代表 1 * 10^3
var onemilliononehundredthousand = 1.1E6;	// 代表 1.1 * 10^6
```

`number` 字面量还可以使用其他进制表达，比如二进制，八进制，和十六进制。

这些格式是可以在当前版本的 JavaScript 中使用的：

```js
0xf3; // 十六进制的: 243
0Xf3; // 同上

0363; // 八进制的: 243
```

**注意：** 从 ES6 + `strict` 模式开始，不再允许 `0363` 这样的的八进制形式（新的形式参见后面的讨论）。`0363` 在非 `strict` 模式下依然是允许的，但是不管怎样你应当停止使用它，来拥抱未来（而且因为你现在应当在使用 `strict` 模式了！）。

至于 ES6，下面的新形式也是合法的：

```js
0o363;		// 八进制的: 243
0O363;		// 同上

0b11110011;	// 二进制的: 243
0B11110011; // 同上
```

请为你的开发者同胞们做件好事：绝不要使用 `0O363` 形式。把 `0` 放在大写的 `O` 旁边就是在制造困惑。保持使用小写的谓词 `0x`、`0b`、和`0o`。

### 小数值

使用二进制浮点数的最出名（臭名昭著）的副作用是（记住，这是对 **所有** 使用 IEEE 754 的语言都成立的 —— 不是许多人认为/假装 *仅* 在 JavaScript 中存在的问题）：

```js
0.1 + 0.2 === 0.3; // false
```

从数学的意义上，我们知道这个语句应当为 `true`。为什么它是 `false`？

简单地说，`0.1` 和 `0.2` 的二进制表示形式是不精确的，所以它们相加时，结果不是精确地 `0.3`。而是 **非常** 接近的值：`0.30000000000000004`，但是如果你的比较失败了，“接近”是无关紧要的。

**注意：** JavaScript 应当切换到可以精确表达所有值的一个不同的 `number` 实现吗？有些人认为应该。多年以来有许多选项出现过。但是没有一个被采纳，而且也许永远也不会。它看起来就像挥挥手然后说“已经改好那个 bug 了!”那么简单，但根本不是那么回事儿。如果真有这么简单，它绝对在很久以前就被改掉了。

现在的问题是，如果一些 `number` 不能被 *信任* 为精确的，这不是意味着我们根本不能使用 `number` 吗？ **当然不是。**

在一些应用程序中你需要多加小心，特别是在对付小数的时候。还有许多（也许是大多数？）应用程序只处理整数，而且，最大只处理到几百万到几万亿。这些应用程序使用 JS 中的数字操作是，而且将总是，**非常安全** 的。

要是我们 *确实* 需要比较两个 `number`，就像 `0.1 + 0.2` 与 `0.3`，而且知道这个简单的相等测试将会失败呢？

可以接受的最常见的做法是使用一个很小的“错误舍入”值作为比较的 *容差*。这个很小的值经常被称为“机械极小值（machine epsilon）”，对于 JavaScript 来说这种 `number` 通常为 `2^-52`（`2.220446049250313e-16`）。

在 ES6 中，使用这个容差值预定义了 `Number.EPSILON`，所以你将会想要使用它，你也可以在前 ES6 中安全地填补这个定义：

```js
if (!Number.EPSILON) {
	Number.EPSILON = Math.pow(2,-52);
}
```

我们可以使用这个 `Number.EPSILON` 来比较两个 `number` 的“等价性”（带有错误舍入的容差）：

```js
function numbersCloseEnoughToEqual(n1,n2) {
	return Math.abs( n1 - n2 ) < Number.EPSILON;
}

var a = 0.1 + 0.2;
var b = 0.3;

numbersCloseEnoughToEqual( a, b );					// true
numbersCloseEnoughToEqual( 0.0000001, 0.0000002 );	// false
```

可以被表示的最大的浮点值大概是 `1.798e+308`（它真的非常，非常，非常大！），它为你预定义为 `Number.MAX_VALUE`。在极小的一端，`Number.MIN_VALUE` 大概是 `5e-324`，它不是负数但是非常接近于0！

### 安全整数范围

由于 `number` 的表示方式，对完全是 `number` 的“整数”而言有一个“安全”的值的范围，而且它要比 `Number.MAX_VALUE` 小得多。

可以“安全地”被表示的最大整数（也就是说，可以保证被表示的值是实际可以无误地表示的）是`2^53 - 1`，也就是`9007199254740991`，如果你插入一些数字分隔符，可以看到它刚好超过9万亿。所以对于`number`能表示的上限来说它确实是够TM大的。

在ES6中这个值实际上是自动预定义的，它是`Number.MAX_SAFE_INTEGER`。意料之中的是，还有一个最小值，`-9007199254740991`，它在ES6中定义为`Number.MIN_SAFE_INTEGER`。

JS 程序面临处理这样大的数字的主要情况是，处理数据库中的64位 ID 等等。64位数字不能使用 `number` 类型准确表达，所以在 JavaScript 中必须使用 `string` 表现形式存储（和传递）。

谢天谢地，在这样的大 ID `number` 值上的数字操作（除了比较，它使用 `string` 也没问题）并不很常见。但是如果你 *确实* 需要在这些非常大的值上实施数学操作，目前来讲你需要使用一个 *大数字* 工具。在未来版本的 JavaScript 中，大数字也许会得到官方支持。

### 测试整数

测试一个值是否是整数，你可以使用 ES6 定义的 `Number.isInteger(..)`：

```js
Number.isInteger( 42 );		// true
Number.isInteger( 42.000 );	// true
Number.isInteger( 42.3 );	// false
```

可以为前 ES6 填补 `Number.isInteger(..)`：

```js
if (!Number.isInteger) {
	Number.isInteger = function(num) {
		return typeof num == "number" && num % 1 == 0;
	};
}
```

要测试一个值是否是 *安全整数*，使用 ES6 定义的 `Number.isSafeInteger(..)`：

```js
Number.isSafeInteger( Number.MAX_SAFE_INTEGER );	// true
Number.isSafeInteger( Math.pow( 2, 53 ) );			// false
Number.isSafeInteger( Math.pow( 2, 53 ) - 1 );		// true
```

可以为前 ES6 浏览器填补 `Number.isSafeInteger(..)`：

```js
if (!Number.isSafeInteger) {
	Number.isSafeInteger = function(num) {
		return Number.isInteger( num ) &&
			Math.abs( num ) <= Number.MAX_SAFE_INTEGER;
	};
}
```
### 32位（有符号）整数

虽然整数可以安全地最大达到约九万亿（53比特），但有一些数字操作（比如位操作符）是仅仅为32位 `number` 定义的，所以对于被这样使用的 `number` 来说，“安全范围”一定会小得多。

这个范围是从 `Math.pow(-2,31)`（`-2147483648`，大约-21亿）到 `Math.pow(2,31)-1`（`2147483647`，大约+21亿）。

要强制 `a` 中的 `number` 值是32位有符号整数，使用 `a | 0`。这可以工作是因为 `|` 位操作符仅仅对32位值起作用（意味着它可以只关注32位，而其他的位将被丢掉）。而且，和 0 进行“或”的位操作实质上是什么也不做。

**注意：** 特定的特殊值（我们将在下一节讨论），比如 `NaN` 和 `Infinity` 不是“32位安全”的，当这些值被传入位操作符时将会通过一个抽象操作 `ToInt32`（见第四章）并为了位操作而简单地变成 `+0` 值。

## 特殊值

在各种类型中散布着一些特殊值，需要 *警惕* 的 JS 开发者小心，并正确使用。

### 不是值的值

对于 `undefined` 类型来说，有且仅有一个值：`undefined`。对于 `null` 类型来说，有且仅有一个值：`null`。所以对它们而言，这些文字既是它们的类型也是它们的值。

`undefined` 和 `null` 作为“空”值或者“没有”值，经常被认为是可以互换的。另一些开发者偏好于使用微妙的区别将它们区分开。举例来讲：

* `null` 是一个空值
* `undefined` 是一个丢失的值

或者：

* `undefined` 还没有值
* `null` 曾经有过值但现在没有

不管你选择如何“定义”和使用这两个值，`null` 是一个特殊的关键字，不是一个标识符，因此你不能将它作为一个变量对待来给它赋值（为什么你要给它赋值呢？！）。然而，`undefined`（不幸地）*是* 一个标识符。噢。

### Undefined

在非 `strict` 模式下，给在全局上提供的 `undefined` 标识符赋一个值实际上是可能的（虽然这是一个非常不好的做法！）：

```js
function foo() {
	undefined = 2; // 非常差劲儿的主意！
}

foo();
```

```js
function foo() {
	"use strict";
	undefined = 2; // TypeError!
}

foo();
```

但是，在非 `strict` 模式和 `strict` 模式下，你可以创建一个名叫 `undefined` 局部变量。但这又是一个很差劲儿的主意！

```js
function foo() {
	"use strict";
	var undefined = 2;
	console.log( undefined ); // 2
}

foo();
```

**朋友永远不让朋友覆盖 `undefined`。**

#### `void` 操作符

虽然 `undefined` 是一个持有内建的值 `undefined` 的内建标识符（除非被修改 —— 见上面的讨论！），另一个得到这个值的方法是 `void` 操作符。

表达式 `void __` 会“躲开”任何值，所以这个表达式的结果总是值 `undefined`。它不会修改任何已经存在的值；只是确保不会有值从操作符表达式中返回来。

```js
var a = 42;

console.log( void a, a ); // undefined 42
```

从惯例上讲（大约是从 C 语言编程中发展而来），要通过使用 `void` 来独立表现值 `undefined`，你可以使用 `void 0`（虽然，很明显，`void true` 或者任何其他的 `void` 表达式都做同样的事情）。在 `void 0`、`void 1` 和 `undefined` 之间没有实际上的区别。

但是在几种其他的环境下 `void` 操作符可以十分有用：如果你需要确保一个表达式没有结果值（即便它有副作用）。

举个例子：

```js
function doSomething() {
	// 注意：`APP.ready` 是由我们的应用程序提供的
	if (!APP.ready) {
		// 稍后再试一次
		return void setTimeout( doSomething, 100 );
	}

	var result;

	// 做其他一些事情
	return result;
}

// 我们能立即执行吗？
if (doSomething()) {
	// 马上处理其他任务
}
```

这里，`setTimeout(..)` 函数返回一个数字值（时间间隔定时器的唯一标识符，用于取消它自己），但是我们想 `void` 它，这样我们函数的返回值不会在 `if` 语句上给出一个成立的误报。

许多开发者宁愿将这些动作分开，这样的效用相同但不使用 `void` 操作符：

```js
if (!APP.ready) {
	// 稍后再试一次
	setTimeout( doSomething, 100 );
	return;
}
```

一般来说，如果有那么一个地方，有一个值存在（来自某个表达式）而你发现这个值如果是 `undefined` 才有用，就使用 `void` 操作符。这可能在你的程序中不是非常常见，但如果在一些稀有的情况下你需要它，它就十分有用。

### 特殊的数字

`number` 类型包含几种特殊值。我们将会仔细考察每一种。

#### 不是数字的数字

如果你不使用同为 `number`（或者可以被翻译为十进制或十六进制的普通 `number` 的值）的两个操作数进行任何算数操作，那么操作的结果将失败而产生一个不合法的 `number`，在这种情况下你将得到 `NaN` 值。

`NaN` 在字面上代表“不是一个 `number`（Not a Number）”，但是正如我们即将看到的，这种文字描述十分失败而且容易误导人。将 `NaN` 考虑为“不合法数字”，“失败的数字”，甚至是“坏掉的数字”都要比“不是一个数字”准确得多。

举例来说：

```js
var a = 2 / "foo";		// NaN

typeof a === "number";	// true
```

换句话说：“‘不是一个数字’的类型是‘数字’”！为这使人糊涂的名字和语义欢呼吧。

`NaN` 是一种“哨兵值”（一个被赋予了特殊意义的普通的值），它代表 `number` 集合内的一种特殊的错误情况。这种错误情况实质上是：“我试着进行数学操作但是失败了，而这就是失败的 `number` 结果。”

那么，如果你有一个值存在某个变量中，而且你想要测试它是否是这个特殊的失败数字 `NaN`，你也许认为你可以直接将它与 `NaN` 本身比较，就像你能对其它的值做的那样，比如 `null` 和 `undefined`。不是这样。

```js
var a = 2 / "foo";

a == NaN;	// false
a === NaN;	// false
```

`NaN` 是一个非常特殊的值，它从来不会等于另一个 `NaN` 值（也就是，它从来不等于它自己）。实际上，它是唯一一个不具有反射性的值（没有恒等性 `x === x`）。所以，`NaN !== NaN`。有点奇怪，对吧？

那么，如果不能与 `NaN` 进行比较（因为这种比较将总是失败），我们该如何测试它呢？

```js
var a = 2 / "foo";

isNaN( a ); // true
```

够简单的吧？我们使用称为 `isNaN(..)` 的内建全局工具，它告诉我们这个值是否是 `NaN`。问题解决了！

别高兴得太早。

`isNaN(..)` 工具有一个重大缺陷。它似乎过于按照字面的意思（“不是一个数字”）去理解 `NaN` 的含义了 —— 它的工作基本上是：“测试这个传进来的东西是否不是一个 `number` 或者是一个 `number`”。但这不是十分准确。

```js
var a = 2 / "foo";
var b = "foo";

a; // NaN
b; // "foo"

window.isNaN( a ); // true
window.isNaN( b ); // true -- 噢!
```

很明显，`"foo"` 根本 *不是一个 `number`*，但它也绝不是一个 `NaN` 值！这个 bug 从最开始的时候就存在于 JS 中了（存在超过了十九年的坑）。

在 ES6 中，终于提供了一个替代它的工具：`Number.isNaN(..)`。有一个简单的填补，可以让你即使是在前 ES6 的浏览器中安全地检查 `NaN` 值：

```js
if (!Number.isNaN) {
	Number.isNaN = function(n) {
		return (
			typeof n === "number" &&
			window.isNaN( n )
		);
	};
}

var a = 2 / "foo";
var b = "foo";

Number.isNaN( a ); // true
Number.isNaN( b ); // false -- 咻!
```

实际上，通过利用 `NaN` 与它自己不相等这个特殊的事实，我们可以更简单地实现 `Number.isNaN(..)` 的填补。在整个语言中 `NaN` 是唯一一个这样的值；其他的值都总是 **等于它自己**。

所以：

```js
if (!Number.isNaN) {
	Number.isNaN = function(n) {
		return n !== n;
	};
}
```

怪吧？但是好用！

不管有意还是无意，在许多真实世界的 JS 程序中 `NaN` 可能是一个现实的问题。使用 `Number.isNaN(..)`（或者它的填补）这样的可靠测试来正确地识别它们是一个非常好的主意。

如果你正在程序中仅使用 `isNaN(..)`，悲惨的现实是你的程序 *有 bug*，即便是你还没有被它咬到！

#### 无穷

来自于像 C 这样的传统编译型语言的开发者，可能习惯于看到编译器错误或者是运行时异常，比如对这样一个操作给出的“除数为 0”：

```js
var a = 1 / 0;
```

然而在 JS 中，这个操作是明确定义的，而且它的结果是值 `Infinity`（也就是 `Number.POSITIVE_INFINITY`）。意料之中的是：

```js
var a = 1 / 0;	// Infinity
var b = -1 / 0;	// -Infinity
```

如你所见，`-Infinity`（也就是 `Number.NEGATIVE_INFINITY`）是从任一个被除数为负（不是两个都是负数！）的除 0 操作得来的。

JS 使用有限的数字表现形式（IEEE 754 浮点，我们早先讨论过），所以和单纯的数学相比，它看起来甚至在做加法和减法这样的操作时都有可能溢出，这样的情况下你将会得到 `Infinity` 或 `-Infinity`。

例如：

```js
var a = Number.MAX_VALUE;	// 1.7976931348623157e+308
a + a;						// Infinity
a + Math.pow( 2, 970 );		// Infinity
a + Math.pow( 2, 969 );		// 1.7976931348623157e+308
```

根据语言规范，如果一个像加法这样的操作得到一个太大而不能表示的值，IEEE 754 “就近舍入”模式将会指明结果应该是什么。所以粗略的意义上，`Number.MAX_VALUE + Math.pow( 2, 969 )` 比起 `Infinity` 更接近于 `Number.MAX_VALUE`，所以它“向下舍入”，而 `Number.MAX_VALUE + Math.pow( 2, 970 )` 距离 `Infinity` 更近，所以它“向上舍入”。

如果你对此考虑的太多，它会使你头疼的。所以别想了。我是认真的，停！

一旦你溢出了任意一个 *无限值*，那么，就没有回头路了。换句最有诗意的话说，你可以从有限迈向无限，但不能从无限回归有限。

“无限除以无限等于什么”，这简直是一个哲学问题。我们幼稚的大脑可能会说“1”或“无限”。事实表明它们都不对。在数学上和在 JavaScript 中，`Infinity / Infinity` 不是一个有定义的操作。在 JS 中，它的结果为 `NaN`。

一个有限的正 `number` 除以 `Infinity` 呢？简单！`0`。那一个有限的负 `number` 处理 `Infinity` 呢？接着往下读！

#### 零

虽然这可能使有数学头脑的读者困惑，但 JavaScript 拥有普通的零 `0`（也称为正零 `+0`） *和* 一个负零 `-0`。在我们讲解为什么 `-0` 存在之前，我们应该考察 JS 如何处理它，因为它可能十分令人困惑。

除了使用字面量 `-0` 指定，负的零还可以从特定的数学操作中得出。比如：

```js
var a = 0 / -3; // -0
var b = 0 * -3; // -0
```

加法和减法无法得出负零。

在开发者控制台中考察一个负的零，经常显示为 `-0`，然而直到最近这才是一个常见情况，所以一些你可能遇到的老版本浏览器也许依然将它报告为 `0`。

但是根据语言规范，如果你试着将一个负零转换为字符串，它将总会被报告为 `"0"`。

```js
var a = 0 / -3;

// 至少（有些浏览器）控制台是对的
a;							// -0

// 但是语言规范坚持要向你撒谎！
a.toString();				// "0"
a + "";						// "0"
String( a );				// "0"

// 奇怪的是，就连 JSON 也加入了骗局之中
JSON.stringify( a );		// "0"
```

有趣的是，反向操作（从 `string` 到 `number`）不会撒谎：

```js
+"-0";				// -0
Number( "-0" );		// -0
JSON.parse( "-0" );	// -0
```

**警告：** 当你观察的时候，`JSON.stringify( -0 )` 产生 `"0"` 显得特别奇怪，因为它与反向操作不符：`JSON.parse( "-0" )` 将像你期望地那样报告`-0`。

除了一个负零的字符串化会欺骗性地隐藏它实际的值外，比较操作符也被设定为（有意地） *要说谎*。

```js
var a = 0;
var b = 0 / -3;

a == b;		// true
-0 == 0;	// true

a === b;	// true
-0 === 0;	// true

0 > -0;		// false
a > b;		// false
```

很明显，如果你想在你的代码中区分 `-0` 和 `0`，你就不能仅依靠开发者控制台的输出，你必须更聪明一些：

```js
function isNegZero(n) {
	n = Number( n );
	return (n === 0) && (1 / n === -Infinity);
}

isNegZero( -0 );		// true
isNegZero( 0 / -3 );	// true
isNegZero( 0 );			// false
```

那么，除了学院派的细节以外，我们为什么需要一个负零呢？

在一些应用程序中，开发者使用值的大小来表示一部分信息（比如动画中每一帧的速度），而这个 `number` 的符号来表示另一部分信息（比如移动的方向）。

在这些应用程序中，举例来说，如果一个变量的值变成了 0，而它丢失了符号，那么你就丢失了它是从哪个方向移动到 0 的信息。保留零的符号避免了潜在的意外信息丢失。

### 特殊等价

正如我们上面看到的，当使用等价性比较时，值 `NaN` 和值 `-0` 拥有特殊的行为。`NaN` 永远不会和自己相等，所以你不得不使用 ES6 的 `Number.isNaN(..)`（或者它的填补）。相似地，`-0` 撒谎并假装它和普通的正零相等（即使使用 `===` 严格等价 —— 见第四章），所以你不得不使用我们上面建议的某些 `isNegZero(..)` 黑科技工具。

在 ES6 中，有一个新工具可以用于测试两个值的绝对等价性，而没有任何这些例外。它称为 `Object.is(..)`:

```js
var a = 2 / "foo";
var b = -3 * 0;

Object.is( a, NaN );	// true
Object.is( b, -0 );		// true

Object.is( b, 0 );		// false
```

对于前 ES6 环境，这是一个相当简单的 `Object.is(..)` 填补：

```js
if (!Object.is) {
	Object.is = function(v1, v2) {
		// 测试 `-0`
		if (v1 === 0 && v2 === 0) {
			return 1 / v1 === 1 / v2;
		}
		// 测试 `NaN`
		if (v1 !== v1) {
			return v2 !== v2;
		}
		// 其他情况
		return v1 === v2;
	};
}
```

`Object.is(..)` 可能不应当用于那些 `==` 或 `===` 已知 *安全* 的情况（见第四章“强制转换”），因为这些操作符可能高效得多，并且更惯用/常见。`Object.is(..)` 很大程度上是为这些特殊的等价情况准备的。

## 值与引用

在其他许多语言中，根据你使用的语法，值可以通过值拷贝，也可以通过引用拷贝来赋予/传递。

比如，在 C++ 中如果你想要把一个 `number` 变量传递进一个函数，并使这个变量的值被更新，你可以用 `int& myNum` 这样的东西来声明函数参数，当你传入一个变量 `x` 时，`myNum` 将是一个 **指向 `x` 的引用**；引用就像一个特殊形式的指针，你得到的是一个指向另一个变量的指针（像一个 *别名（alias）*） 。如果你没有声明一个引用参数，被传入的值将 *总是* 被拷贝的，就算它是一个复杂的对象。

在 JavaScript 中，没有指针，并且引用的工作方式有一点儿不同。你不能拥有一个从一个 JS 变量到另一个 JS 变量的引用。这是完全不可能的。

JS 中的引用指向一个（共享的） **值**，所以如果你有十个不同的引用，它们都总是同一个共享值的不同引用；**它们没有一个是另一个的引用/指针。**

另外，在 JavaScript 中，没有语法上的提示可以控制值和引用的赋值/传递。取而代之的是，值的 *类型* 用来 *唯一* 控制值是通过值拷贝，还是引用拷贝来赋予。

让我们来展示一下：

```js
var a = 2;
var b = a; // `b` 总是 `a` 中的值的拷贝
b++;
a; // 2
b; // 3

var c = [1,2,3];
var d = c; // `d` 是共享值 `[1,2,3]` 的引用
d.push( 4 );
c; // [1,2,3,4]
d; // [1,2,3,4]
```

简单值（也叫基本标量） *总是* 通过值拷贝来赋予/传递：`null`、`undefined`、`string`、`number`、 `boolean`、以及 ES6 的 `symbol`。

复合值 —— `object`（包括 `array`，和所有的对象包装器 —— 见第三章）和 `function` —— *总是* 在赋值或传递时创建一个引用的拷贝。

在上面的代码段中，因为 `2` 是一个基本标量，`a` 持有一个这个值的初始拷贝，而 `b` 被赋予了这个值的另一个拷贝。当改变 `b` 时，你根本没有在改变 `a` 中的值。

但 **`c` 和 `d` 两个都** 是同一个共享的值 `[1,2,3]` 的分离的引用。重要的是，`c` 和 `d` 对值 `[1,2,3]` 的“拥有”程度上是一样的 —— 它们只是同一个值的对等引用。所以，不管使用哪一个引用去修改（`.push(4)`）实际上共享的 `array` 值本身，影响的仅仅是这一个共享值，而且这两个引用将会指向新修改的值 `[1,2,3,4]`。

因为引用指向的是值本身而不是变量，你不能使用一个引用来改变另一个引用所指向的值：

```js
var a = [1,2,3];
var b = a;
a; // [1,2,3]
b; // [1,2,3]

// 稍后
b = [4,5,6];
a; // [1,2,3]
b; // [4,5,6]
```

当我们做赋值操作 `b = [4,5,6]` 时，我们做的事情绝对不会对 `a` 所指向的 *位置*（`[1,2,3]`）造成任何影响。如果那可能的话，`b` 就会是 `a` 的指针而不是这个 `array` 的引用 —— 但是这样的能力在 JS 中是不存在的！

这样的困惑最常见于函数参数：

```js
function foo(x) {
	x.push( 4 );
	x; // [1,2,3,4]

	// 稍后
	x = [4,5,6];
	x.push( 7 );
	x; // [4,5,6,7]
}

var a = [1,2,3];

foo( a );

a; // [1,2,3,4] 不是 [4,5,6,7]
```

当我们传入参数 `a` 时，它将一份 `a` 引用的拷贝赋值给 `x`。`x` 和 `a` 是指向相同的 `[1,2,3]` 的不同引用。现在，在函数内部，我们可以使用这个引用来改变值本身（`push(4)`）。但是当我们进行赋值操作 `x = [4,5,6]` 时，不可能影响原来的引用 `a` 所指向的东西 —— 它仍然指向（已经被修改了的）值 `[1,2,3,4]`。

没有办法可以使用 `x` 引用来改变 `a` 指向哪里。我们只能修改 `a` 和 `x` 共通指向的那个共享值的内容。

要想改变 `a` 来使它拥有内容为 `[4,5,6,7]` 的值，你不能创建一个新的 `array` 并赋值 —— 你必须修改现存的 `array` 值：

```js
function foo(x) {
	x.push( 4 );
	x; // [1,2,3,4]

	// 稍后
	x.length = 0; // 原地清空既存的数组
	x.push( 4, 5, 6, 7 );
	x; // [4,5,6,7]
}

var a = [1,2,3];

foo( a );

a; // [4,5,6,7] 不是 [1,2,3,4]
```

正如你看到的，`x.length = 0` 和 `x.push(4,5,6,7)` 没有创建一个新的 `array`，但是修改了现存的共享 `array`。所以理所当然地，`a` 引用了新的内容 `[4,5,6,7]`。

记住：你不能直接控制/覆盖值拷贝和引用拷贝的行为 —— 这些语义是完全由当前值的类型来控制的。

为了实质上地通过值拷贝传递一个复合值（比如一个 `array`），你需要手动制造一个它的拷贝，使被传递的引用不指向原来的值。比如：

```js
foo( a.slice() );
```

不带参数的 `slice(..)` 方法默认地为这个 `array` 制造一个全新的（浅）拷贝。所以，我们传入的引用仅指向拷贝的 `array`，这样 `foo(..)` 不会影响 `a` 的内容。

反之 —— 传递一个基本标量值，使它的值的变化可见，就像引用那样 —— 你不得不将这个值包装在另一个可以通过引用拷贝来传递的复合值中（`object`、`array` 等等）：

```js
function foo(wrapper) {
	wrapper.a = 42;
}

var obj = {
	a: 2
};

foo( obj );

obj.a; // 42
```

这里，`obj` 作为基本标量属性 `a` 的包装。当传递给 `foo(..)` 时，一个 `obj` 引用的拷贝被传入并设置给 `wrapper` 参数。我们现在可以使用 `wrapper` 引用来访问这个共享的对象，并更新它的值。在函数完成时，`obj.a` 将被更新为值 `42`。

你可能会遇到这样的情况，如果你想要传入一个像 `2` 这样的基本标量值的引用，你可以将这个值包装在它的 `Number` 对象包装器中（见第三章）。

这个 `Number` 对象的引用的拷贝 *将* 会被传递给函数是事实，但不幸的是，和你可能期望的不同，拥有一个共享独享的引用不会给你修改这个共享的基本值的能力：

```js
function foo(x) {
	x = x + 1;
	x; // 3
}

var a = 2;
var b = new Number( a ); // 或等价的 `Object(a)`

foo( b );
console.log( b ); // 2, 不是 3
```

这里的问题是，底层的基本标量值是 *不可变的*（`String` 和 `Boolean` 也一样）。如果一个 `Number` 对象持有一个基本标量值 `2`，那么这个 `Number` 对象就永远不能再持有另一个值；你只能用一个不同的值创建一个全新的 `Number` 对象。

当 `x` 用于表达式 `x + 1` 时，底层的基本标量值 `2` 被自动地从 `Number` 对象中开箱（抽出），所以 `x = x + 1` 这一行很微妙地将 `x` 从一个共享的 `Number` 对象的引用，改变为仅持有加法操作 `2 + 1` 的结果 `3` 的基本标量值。因此，外面的 `b` 仍然引用原来的未被改变/不可变的，持有 `2` 的 `Number` 对象。

你 *可以* 在 `Number` 对象上添加属性（只是不要改变它内部的基本值），所以你可间接地通过这些额外的属性交换信息。

不过，这可不太常见；对大多数开发者来说这可能不是一个好的做法。

与其这样使用 `Number` 包装器对象，使用早先的代码段中那样的手动对象包装器（`obj`）要好得多。这不是说像 `Number` 这样包装好的对象包装器没有用处 —— 而是说在大多数情况下，你可能应该优先使用基本标量值的形式。

引用十分强大，但是有时候它们碍你的事儿，而有时你会在它们不存在时需要它们。你唯一可以用来控制引用与值拷贝的东西是值本身的类型，所以你必须通过你选用的值的类型来间接地影响赋值/传递行为。

## 复习

在 JavaScript 中，`array` 仅仅是数字索引的集合，可以容纳任何类型的值。`string` 是某种“类 `array`”，但它们有着不同的行为，如果你想要将它们作为 `array` 对待的话，必须要小心。JavaScript 中的数字既包括“整数”也包括浮点数。

几种特殊值被定义在基本类型内部。

`null` 类型只有一个值 `null`，`undefined` 类型同样地只有 `undefined` 值。对于任何没有值存在的变量或属性，`undefined` 基本上是默认值。`void` 操作符允许你从任意另一个值中创建 `undefined` 值。

`number` 包含几种特殊值，比如 `NaN`（意为“不是一个数字”，但称为“非法数字”更合适）；`+Infinity` 和 `-Infinity`；还有 `-0`。

简单基本标量（`string`、`number` 等）通过值拷贝进行赋值/传递，而复合值（`object` 等）通过引用拷贝进行赋值/传递。引用与其他语言中的引用/指针不同 —— 它们从不指向其他的变量/引用，而仅指向底层的值。