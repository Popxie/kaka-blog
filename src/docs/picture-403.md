## 图片资源403

> 情景描述： 通过浏览器地址栏访问图片地址时可以访问，可是一旦放到html（或者别的域名项目）里面访问就会出现403无权限  

**解决方案**

```
<!--在header标签内引入这个-->
<meta name="referrer" content="no-referrer" />
```

**原理**

- http请求体的header中有一个referrer字段，用来表示发起http请求的源地址信息，这个referrer信息是可以省略但是不可修改的，就是说你只能设置是否带上这个referrer信息，不能定制referrer里面的值。
- 服务器端在拿到这个referrer值后就可以进行相关的处理，比如图片资源，可以通过referrer值判断请求是否来自本站，若不是则返回403或者重定向返回其他信息，从而实现图片的防盗链。上面出现403就是因为，请求的是别人服务器上的资源，但把自己的referrer信息带过去了，被对方服务器拦截返回了403。
- 在前端可以通过meta来设置referrer policy(来源策略)，具体可以设置哪些值以及对应的结果参考[这里](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Referrer-Policy)。所以针对上面的403情况的解决方法，就是把referrer设置成`no-referrer`，这样发送请求不会带上referrer信息，对方服务器也就无法拦截了。
- 浏览器中referrer默认的值是no-referrer-when-downgrade，就是除了降级请求的情况以外都会带上referrer信息。降级请求是指https协议的地址去请求http协议，所以上面403的情况还有另一种解决方法就是，请求的图片地址换成http协议，自己的地址使用http协议，这样降级请求也不会带上referrer。

[阅读原文·简书](https://www.jianshu.com/p/56df73d0d128?utm_source=oschina-app)


