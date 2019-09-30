# Open App
Html5 page to launch app, if not install app, will open yyb and appstore by auto or handle  to download.

Support copying to the clipboard for data continuation.

H5唤起已经安装的app，如果没有安装，则跳到appstore/android store等应用下载页面，或自动触发下载。

支持复制到剪贴板做数据延续。

### Use Guide
install
```bash
$ npm install open-app

$ yarn add open-app
````

```js
import OpenApp from open-app;

openapp = new OpenApp({
  // scheme地址
  scheme: "",
  // intent地址
  intent: "",
  // android applink url or ios universal links url
  applink: "",
  // 复制到剪贴板数据
  copyText: "",
  // 唤起app状态回调
  callback: function (status, msg) {
    console.log("status: ", status, "  msg: ", msg);
  }
})

openapp.open();
```

### 详细参数介绍

```js
interface IOptions {
  // 超时时间
  timeout: number;
  // scheme地址
  scheme: string;
  // intent地址
  intent: string;
  // ios universal links address / android applink address
  applink: string;
  // 应用宝地址
  yyb: string;
  // appstore地址
  appstore: string;
  // 下载app地址
  downloadUrl: string;
  // 微信是否跳转到应用宝
  wechatJumpYYB: boolean;
  // ios是否使用scheme跳转，默认不使用
  iosUseScheme: boolean;
  // copy文本内容到剪贴板
  copyText: string;
  // 唤起回调
	callback: (status: string, msg?: string) => void;
}
```

### callback回调
```js
interface IOpenStatus {
	FAILED: 'FAILED';
	SUCCESS: 'SUCCESS';
	UNKNOW: 'UNKNOW';
}
```
