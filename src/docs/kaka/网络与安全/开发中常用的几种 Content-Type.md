<!--
 * @Description: 网络与安全文件夹
 * @Author: xiehuaqiang
 * @FilePath: /kaka-blog/src/docs/kaka/网络与安全/开发中常用的几种 Content-Type.md
 * @Date: 2021-09-02 16:20:16
 * @LastEditTime: 2021-09-02 16:44:33
-->

# 开发中常用的几种 Content-Type

Http 的实体首部字段，用于说明请求或返回的消息主体是用何种方式编码，在 request header 和 response header 里都存在。

几个常见的类型如下：

- `application/x-www-form-urlencoded`
- `multipart/form-data`
- `application/json`
- `text/xml`

下面来依依说明

## 1. application/x-www-form-urlencoded

浏览器的原生 `form` 表单，如果不设置 `enctype` 属性，那么最终就会以 `application/x-www-form-urlencoded` 方式提交数据。请求如下面形式：

```js
POST http://www.example.com HTTP/1.1
Content-Type: application/x-www-form-urlencoded;charset=utf-8

title=test&sub%5B%5D=1&sub%5B%5D=2&sub%5B%5D=3
```

该种方式提交的数据放在 `body` 里面，数据按照 `key1=val1&key2=val2` 的方式进行编码，`key` 和 `val` 都进行了 `URL` 转码。

## 2. multipart/form-data

该种方式也是一个常见的 `POST` 提交方式，通常表单上传文件时使用该种方式。

使用表单上传文件时，必须让 `form` 的 `enctype` 等于这个值。

```html
<form action="/" method="post" enctype="multipart/form-data">
  <input type="text" name="description" value="some text" />
  <input type="file" name="myFile" />
  <button type="submit">Submit</button>
</form>
```

请求头看起来像这样

```js
POST /foo HTTP/1.1
Content-Length: 68137
Content-Type: multipart/form-data; boundary=---------------------------974767299852498929531610575

---------------------------974767299852498929531610575
Content-Disposition: form-data; name="description"

some text
---------------------------974767299852498929531610575
Content-Disposition: form-data; name="myFile"; filename="foo.txt"
Content-Type: text/plain

(content of the uploaded file foo.txt)
---------------------------974767299852498929531610575--
```

是不是不太容易看懂，我们来略微分析一下

首先生成了一个 `boundary` 用于分割不同的字段，为了避免与正文内容重复，`boundary` 很长很复杂。

然后 `Content-Type` 里指明了数据是以 `multipart/form-data` 来编码，本次请求的 `boundary` 是什么内容。

消息主体里按照字段个数又分为多个结构类似的部分，每部分都是以 `--boundary` 开始，紧接着是内容描述信息，然后是回车，最后是字段具体内容（文本或二进制）。

如果传输的是文件，还要包含文件名和文件类型信息。消息主体最后以 `--boundary--` 标示结束。

关于 multipart/form-data 的详细定义，可前往 rfc1867 查看。

## 3. application/json

application/json 作为响应头大家都不陌生，现在越来越多的人把其作为请求头，用来告诉服务器消息主体是序列化后的 JSON 字符串。请求类似下面形式

```js
POST http://www.example.com HTTP/1.1
Content-Type: application/json;charset=utf-8

{"title":"test","sub":[1,2,3]}
```

这种方案，可以方便的提交复杂的结构化数据，特别适合 `RESTful` 的接口。各大抓包工具如 Chrome 自带的开发者工具、Firebug、Fiddler，都会以树形结构展示 JSON 数据，非常友好。

## 4. text/xml

该种方式主要用来提交 `XML` 格式的数据，请求形式如下：

```js
POST http://www.example.com HTTP/1.1
Content-Type: text/xml

<?xml version="1.0"?>
<methodCall>
  <methodName>examples.getStateName</methodName>
  <params>
      <param>
          <value><i4>41</i4></value>
      </param>
  </params>
</methodCall>
```

虽然在 API 方面现在 `JSON` 大有取代 `XML` 的意思，但是 `XML` 依然有其不可代替的领域。
