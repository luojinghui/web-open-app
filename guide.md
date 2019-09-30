# H5唤起App方案总结

针对H5唤起app方案和H5在新安装App后的数据延续问题做了一些研究，因此梳理一下手头现有的方案，进行总结。

### First
基于本篇的介绍文档，已经对应的开发了一个[OpenApp](https://github.com/luojinghui/launch-app)的插件，第一版本能够全面的唤起App，并在相应的浏览器返回唤起的状态，并且支持在唤起时，将相应的数据存放到剪贴板上，方便后续的App延续功能开发。

### 唤起App方案
###### common
1. scheme
2. 应用宝+applinks

###### ios
1. [Universal Link](https://developer.apple.com/library/archive/documentation/General/Conceptual/AppSearch/UniversalLinks.html#//apple_ref/doc/uid/TP40016308-CH12-SW1)
2. Mate标签(针对safari)

###### android
1. [App links](https://developer.android.com/training/app-links/index.html)
2. Deep link
3. [Intents](https://developer.chrome.com/multidevice/android/intents)

### Deeper Link（新装App的数据延续）
1. 剪切板
2. 设备信息识别方案
3. iOSSafariCookie互通方案

### H5唤起App需求

首页需要明确H5唤起app的需求：
1. 未安装 - 通过事件或自动触发下载app操作
2. 已安装 - 通过事件或自动唤起App操作

由于各个平台之间的差异比较大，为了能够满足我们在常见的浏览器上实现这些需求，我们可能需要在后续的方案上，分浏览器版本进行兼容处理。

首先，我们先看看一个较为全面的知乎的解决方案和展示效果：

### 知乎分析

#### 没有安装APP：

##### ios：

1. 微信浏览器：

详情页无反应，点击App内打开，提示“即将离开微信，打开‘知乎’”

点击允许，提示“可能离开微信，打开第三方应用”

点击继续，跳转到 **`oia.zhihu.com/answer`** 页面，没有反应。

点击立即下载，跳转到应用宝页面，提示通过appstore打开应用。

2. safari浏览器：

ios13：

详情页无反应

点击App内打开，跳转到 **`oia.zhihu.com/answer`** 页面后，自动唤起appstore应用商店。

ios12：

详情页无反应

点击App内打开，跳转到 **`oia.zhihu.com/answer`** 页面后

弹出在App store中打开链接吗？对话框，点击打开，跳转到appstore

> **这里做个说明，ios12通过universal link唤起app时，会存在弹窗提示，ios13已经取消了弹窗提示，直接唤起app**

3. chrome浏览器

（ios13）详情页无反应，点击App内打开，跳转到 **`oia.zhihu.com/answer`** 页面，弹出此页面将在其他应用中打开对话框，点击打开，跳转到appstore进行下载。
（ios12）详情页无反应，点击App内打开，跳转到 **`oia.zhihu.com/answer`**页面，弹出在App store中打开链接吗？对话框，点击打开，跳转到appstore

##### android

1. 微信浏览器：

打开详情页，提示，没有安装响应app，请确认是否卸载。点击App内打开，跳转到 **`oia.zhihu.com/answer`** 页面，无任何反应，点击立即下载跳转到应用宝页面进行下载操作。

2. chrome浏览器

点击App内打开，跳转到 **`"https://www.zhihu.com/oia/answers/502877088`** 下载页面，无任何反应，点击下载，自动弹出下载app的提示框，点击下载直接下载app。

3. qq浏览器

详情页无反应，点击App内打开按钮，跳转到 **`"https://www.zhihu.com/oia/answers/502877088`**下载页面，无任何反应，点击下载，提示检测应用拦截高风险，推荐使用应用宝下载，点击直接下载，下载app。

4. UC浏览器

详情页一直在重复刷新，无法正常操作，无法显示在App内打开按钮。

5. 华为浏览器、360浏览器

详情页无反应，点击App内打开，跳转到 **`"https://www.zhihu.com/oia/answers/502877088`** 下载页面，页面无反应，点击立即下载，弹出下载app的弹窗，点击立即下载，开始下载

#### 安装APP：

##### ios

1. 微信浏览器

（ios12）详情页无反应，点击App内打开，提示：即将离开微信，打开知乎，点击允许，提示：微信将要打开应用xxx，点击打开，直接唤起知乎app
（ios13）详情页无反应，点击App内打开，提示：即将离开微信，打开支付，点击允许，直接唤起知乎app

2. sfari浏览器

详情页点击App内打开按钮，直接唤起App

3. chrome浏览器

详情页点击App内打开，直接唤起App

##### android

1. 微信浏览器

详情页点击App内打开，等待大概1s后，自动唤起app并跳到相应的详情页。

2. chrome浏览器

打开详情页，自动唤起app入会

3. qq浏览器

打开详情页，没有反应，点击App内打开按钮，跳转到下载详情页，并提示打开app的提示框。

4. uc浏览器、华为自带浏览器、360浏览器

打开详情页，弹出是否在app中打开，点击立即打开，打开app

### 知乎方案总结
知乎应用在ios端，采用Universal Link的方案，进行唤醒app操作。在android端，采用scheme的方案进行唤醒操作。

知乎由于和腾讯是深度合作关系，所以在android端微信浏览器上，能够以scheme的方式进行唤起app的操作。这个暂时针对于三方是无解的方案。

知乎数据延续上，采用了剪贴板的方式，针对用户安装了app，那么第一次打开app时，会自动延续用户之前在wap页面上的操作。

> 这里面有一个细节，知乎在详情页的App打开的按钮上，触发后，会存在1s左右的延迟效果。根据经验来看，是知乎的检测app是否安装的检验时间导致的。

### 整体方案流程：

有了知乎的方案，我们可以进行响应的参考，来满足我们的需求；

用户在详情页面，通过事件（按钮）触发后，先进行大概1s左右检测是否安装app
1. 没有安装app，那么统一跳到详情下载页面，此页面再次检测并提供下载app的功能（自动下载或手动触发下载）；
2. 安装了app，那么直接唤起app进行跳转，并进行数据延续。

但是这里面涉及到两个点需要注意：

* android微信端，无法直接通过scheme唤起app操作，可以通过引导或应用宝的形式解决
* ios微信端，在<7.0.5版本之前，无法直接通过universal link直接唤起app，需要兼容处理，具体也是通过引导到外部浏览器

### 数据延续

##### ios
通过剪切板技术，先拷贝剪切板，再跳转Appstore，在Appstore点击打开按钮，打开App进行剪切板定位，必须iOS10+

##### Android
通过剪贴板技术，先拷贝剪贴板，在通过浏览器下载，安装并打开app后，检测剪贴板数据内容定位，跳转到相应的页面。

### Callback唤起状态的兼容情况
#### 未安装App时
1. android
* 微信浏览器 ok
* 小米自带浏览器 ok
* uc浏览器 ok
* 华为自带浏览器 
* 三星自带浏览 ok
* qq浏览器 ok
* chrome ok
* 360浏览 ok

2. ios
* safari浏览器 ios<=12  ok
* safari浏览器 ios>13 not work(可以根据universal link判断没有安装app的状态)
* 微信浏览器 ios<=12  ok
* 微信浏览器 ios>12  同Safari浏览器
* chrome浏览器 ok

3. mac
* chrome ok
* safari ok
* 火狐 ok
* 欧朋 ok
* qq浏览器 ok

4. windows

没有测试

#### 安装App时
1. android
* 微信浏览器 not work（会回调相应错误，可以走应用宝或外部浏览器）
* chrome ok
* qq浏览器 not work
* 360浏览器 not work

2. ios
* safari not work
* chroem ok
* 微信浏览 not work

3. pc/mac
都支持

### 问题记录
1. 为了安全考虑，多数Android无法直接通过scheme唤起app，需要有一次手动操作或跳转才可以进行唤起app操作。
2. 为了安全考虑，copy内容数据到系统剪贴板，需要用户手动触发事件，才可以执行copy操作。
3. ios>13版本，无法通过hidden/blur等事件监听到是否安装app，唯一的解决方法是通过universal link的回调去监听是否安装app；

### OpenApp插件介绍
以上的测试数据来自已经完成的[OpenApp](https://github.com/luojinghui/launch-app)插件，第一版本已经开发完毕了，欢迎大家使用反馈体验。

### Demo

1.[飞机✈️](https://devcdn.xylink.com/miniProgram/ulink/ulink.html)

2. 扫码体验
![扫一扫](https://devcdn.xylink.com/miniProgram/ulink/1569827210.png)

### 参考

2. [Universal Links踩坑之旅](https://www.jianshu.com/p/77b530f0c67b)
3. [Universal Link 前端部署采坑记
](http://awhisper.github.io/2017/09/02/universallink/)
4. [Apple Support Universal Links](https://developer.apple.com/library/archive/documentation/General/Conceptual/AppSearch/UniversalLinks.html#//apple_ref/doc/uid/TP40016308-CH12-SW1)
5. [App Search API Validation Tool](https://search.developer.apple.com/appsearch-validation-tool/)
6. [知乎 ioa](https://oia.zhihu.com/apple-app-site-association)
7. [web-launch-app h5调起app、调用端能力、应用商店下载](https://github.com/jawidx/web-launch-app)
8. [Android深度链接 Deep Links 和 App Links](https://www.jianshu.com/p/1632be1c2451)
9. [iOS app与浏览器深度链接 DeeperLink](http://awhisper.github.io/2016/05/11/iOSBrowserDomainBridge/)
10. [H5主流浏览器下App导流方案选取](https://awhisper.github.io/2018/03/24/wap-app-growth/)
