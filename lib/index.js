/*!
 * openapp.js v1.0.1
 * https://github.com/luojinghui/launch-app
 * 
 * Licensed MIT © Luo Jinghui
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/browser.ts":
/*!************************!*\
  !*** ./src/browser.ts ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n/**\n * Browser Info\n *\n * @authors Luo-jinghui (luojinghui424@gmail.com)\n * @date  2019-09-27 16:18:30\n */\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nexports.systemInfo = function () {\n  var u = window.navigator ? window.navigator.userAgent : navigator.userAgent;\n  var chrome = u.indexOf(\"Chrome\") || -1; // 是否是android\n\n  var isAndroid = u.indexOf(\"Android\") > -1 || u.indexOf(\"Adr\") > -1; // 是否是ios\n\n  var isIOS = !!u.match(/\\(i[^;]+;( U;)? CPU.+Mac OS X/);\n  var isSafari = /Safari/.test(u) && !/Chrome/.test(u); // 是否是chrome\n\n  var isChrome = chrome > 0;\n  var isFirefox = u.indexOf(\"Firefox\") >= 0; // 是否是三星浏览器\n\n  var isSamsung = u.indexOf(\"SamsungBrowser\") >= 0; //判断是否是微信\n\n  var isWeixin = function () {\n    var ua = u.toLowerCase(); // @ts-ignore\n\n    return ua.match(/MicroMessenger/i) == \"micromessenger\";\n  }();\n\n  var isIPad = navigator.userAgent.match(/(iPad)/)\n  /* iOS pre 13 */\n  || navigator.platform === \"MacIntel\" && navigator.maxTouchPoints > 1; // 微信版本\n\n  var weixinVersion = function () {\n    var version = [];\n\n    try {\n      version = navigator.appVersion.match(/micromessenger\\/(\\d+\\.\\d+\\.\\d+)/i) || [];\n    } catch (err) {\n      version = [];\n    }\n\n    return version[1] || \"\";\n  }();\n\n  return {\n    isAndroid: isAndroid,\n    isIOS: isIOS,\n    isSafari: isSafari,\n    isChrome: isChrome,\n    isFirefox: isFirefox,\n    isWeixin: isWeixin,\n    isSamsung: isSamsung,\n    weixinVersion: weixinVersion,\n    isIPad: isIPad\n  };\n};\n\n//# sourceURL=webpack:///./src/browser.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n/**\n * Openapp.ts\n *\n * Description: open and launch app in H5 page\n * Support: mobile and pc\n * @authors Luo-jinghui (luojinghui424@gmail.com)\n * @date  2019-09-25 20:55:35\n */\n\nvar __assign = this && this.__assign || function () {\n  __assign = Object.assign || function (t) {\n    for (var s, i = 1, n = arguments.length; i < n; i++) {\n      s = arguments[i];\n\n      for (var p in s) {\n        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];\n      }\n    }\n\n    return t;\n  };\n\n  return __assign.apply(this, arguments);\n};\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar browser_1 = __webpack_require__(/*! ./browser */ \"./src/browser.ts\");\n\nvar OpenApp =\n/** @class */\nfunction () {\n  function OpenApp(options) {\n    var defaultOptions = {\n      timeout: 1000,\n      scheme: \"\",\n      intent: \"\",\n      applink: \"\",\n      yyb: \"\",\n      appstore: \"\",\n      downloadUrl: \"\",\n      wechatJumpYYB: false,\n      iosUseScheme: false,\n      copyText: \"\",\n      callback: function callback() {}\n    };\n    this.options = __assign(__assign({}, defaultOptions), options);\n    this.init();\n  }\n\n  OpenApp.prototype.init = function () {\n    this.systemInfo = browser_1.systemInfo(); // 打开状态，failed，success，unknow\n\n    this.openStatus = {\n      FAILED: \"FAILED\",\n      SUCCESS: \"SUCCESS\",\n      UNKNOW: \"UNKNOW\"\n    };\n  };\n\n  OpenApp.prototype.open = function () {\n    var _a = this.options,\n        applink = _a.applink,\n        scheme = _a.scheme,\n        intent = _a.intent,\n        iosUseScheme = _a.iosUseScheme;\n    var _b = this.systemInfo,\n        weixinVersion = _b.weixinVersion,\n        isIOS = _b.isIOS,\n        isWeixin = _b.isWeixin,\n        isAndroid = _b.isAndroid,\n        isChrome = _b.isChrome,\n        isSafari = _b.isSafari,\n        isFirefox = _b.isFirefox,\n        isIPad = _b.isIPad;\n    this.timeoutEvent();\n\n    if (isIOS) {\n      // 微信7.0.5放开了universal link，直接使用即可\n      // 否则，直接反馈唤起失败，让调用者决定是否需要采取其他方式\n      if (isWeixin && weixinVersion < \"7.0.5\") {\n        this.msg = \"isIosLowVersionWechat\";\n        this.locationCall(scheme);\n      } else if (applink) {\n        this.locationCall(applink);\n      } else if (iosUseScheme && scheme) {\n        this.locationByIframeCall(scheme);\n        this.locationCall(scheme);\n      }\n    } else if (isIPad && iosUseScheme) {\n      this.locationByIframeCall(scheme);\n      this.locationCall(scheme);\n    } else if (isAndroid) {\n      if (isWeixin) {\n        this.msg = \"isAndroidWechat\";\n      }\n\n      if (isChrome && !isWeixin) {\n        if (intent) {\n          this.locationCall(intent);\n          this.locationCall(scheme);\n          return;\n        }\n      }\n\n      this.locationCall(scheme);\n    } else if (isSafari || isFirefox) {\n      // safari和firefox调用iframe唤起应用\n      // 这两个浏览器通过scheme唤起时，如果不存在应用，那么会跳转并提示警告信息\n      this.locationByIframeCall(scheme);\n    } else {\n      this.locationCall(scheme);\n    }\n  };\n\n  OpenApp.prototype.download = function () {\n    var _a = this.options,\n        wechatJumpYYB = _a.wechatJumpYYB,\n        downloadUrl = _a.downloadUrl,\n        yyb = _a.yyb,\n        appstore = _a.appstore;\n    var _b = this.systemInfo,\n        isIOS = _b.isIOS,\n        isWeixin = _b.isWeixin,\n        isAndroid = _b.isAndroid;\n\n    if (isWeixin && isAndroid) {\n      if (wechatJumpYYB) {\n        this.locationCall(yyb);\n      }\n    } else if (isWeixin && isIOS) {\n      if (wechatJumpYYB) {\n        this.locationCall(appstore);\n      }\n    } else if (isAndroid) {\n      if (downloadUrl) {\n        this.locationCall(downloadUrl);\n      } else {\n        if (yyb) {\n          this.locationCall(yyb);\n        } else {\n          console.log(\"没有配置下载地址\");\n        }\n      }\n    } else if (isIOS) {\n      this.locationCall(appstore);\n    } else {\n      if (downloadUrl) {\n        this.locationCall(downloadUrl);\n        return;\n      }\n\n      if (yyb) {\n        this.locationCall(yyb);\n        return;\n      } else {\n        console.log(\"没有配置下载地址\");\n      }\n    }\n  };\n\n  OpenApp.prototype.timeoutEvent = function () {\n    var _this = this;\n\n    var haveChange = false;\n    var isHaveApp = false;\n    var isInputTimeout = false;\n    var timeout = this.options.timeout;\n\n    var _a = this.getVisibilityPrefix(),\n        _b = _a.property,\n        property = _b === void 0 ? \"\" : _b,\n        _c = _a.eventName,\n        eventName = _c === void 0 ? \"\" : _c;\n\n    var _d = this.systemInfo,\n        isIOS = _d.isIOS,\n        isSafari = _d.isSafari; // 三星浏览器存在一定的页面跳转延迟，如果设置小于1s，那么再加上300ms时间\n\n    if (this.systemInfo.isSamsung) {\n      timeout = timeout <= 1000 ? timeout + 300 : timeout;\n    }\n\n    var pageChange = function pageChange(e) {\n      var isHide = document[property] || e.hidden || document.visibilityState == \"hidden\";\n      haveChange = true;\n\n      if (isHide) {\n        isHaveApp = true;\n      }\n\n      document.removeEventListener(eventName, pageChange);\n      document.removeEventListener(\"baiduboxappvisibilitychange\", pageChange);\n    };\n\n    var pageBlur = function pageBlur() {\n      haveChange = true;\n      isHaveApp = true;\n    };\n\n    window.addEventListener(\"blur\", pageBlur);\n    document.addEventListener(eventName, pageChange, false);\n    document.addEventListener(\"baiduboxappvisibilitychange\", pageChange, false); // 如果ios使用safari浏览器，那么\n\n    if (!(isIOS && isSafari && this.options.iosUseScheme)) {\n      var input_1 = document.createElement(\"input\");\n      var timmer_1 = null;\n\n      var onBlur_1 = function onBlur_1(e) {\n        if (!isInputTimeout) {\n          haveChange = true;\n          isHaveApp = true;\n        }\n      };\n\n      input_1.setAttribute(\"id\", \"input\");\n      input_1.setAttribute(\"readonly\", \"\");\n      input_1.setAttribute(\"autocomplete\", \"off\");\n      input_1.setAttribute(\"type\", \"text\");\n\n      if (this.options.copyText) {\n        input_1.setAttribute(\"value\", this.options.copyText);\n      }\n\n      input_1.setAttribute(\"style\", \"opacity: 0; position: fixed; top: 0; left: -999px; width: 1px; height: 1px\");\n      document.body.appendChild(input_1);\n      input_1.addEventListener(\"blur\", onBlur_1);\n      setTimeout(function () {\n        isInputTimeout = true;\n        input_1.removeEventListener(\"blur\", onBlur_1);\n        clearInterval(timmer_1);\n        input_1.remove();\n      }, this.options.timeout);\n      input_1.focus();\n\n      if (this.options.copyText) {\n        input_1.select();\n        input_1.setSelectionRange(0, input_1.value.length);\n        document.execCommand(\"copy\");\n      }\n    }\n\n    this.timer = setTimeout(function () {\n      if (haveChange && isHaveApp || document.visibilityState === \"hidden\" || document.hidden) {\n        _this.openEnd(_this.openStatus.SUCCESS);\n\n        return;\n      }\n\n      if (haveChange) {\n        return;\n      } // @ts-ignore\n\n\n      var isHidden = document.visibilityState === \"hidden\";\n      window.removeEventListener(\"blur\", pageBlur);\n      document.removeEventListener(eventName, pageChange);\n      document.removeEventListener(\"baiduboxappvisibilitychange\", pageChange);\n\n      if (!(isHidden || document.hidden) && !haveChange) {\n        _this.openEnd(_this.openStatus.FAILED);\n      } else {\n        _this.openEnd(_this.openStatus.UNKNOW);\n      }\n\n      haveChange = true;\n    }, this.options.timeout);\n  };\n\n  OpenApp.prototype.getVisibilityPrefix = function () {\n    var prefixes = [{\n      property: \"webkit\",\n      eventName: \"webkitvisibilitychange\"\n    }, {\n      property: \"moz\",\n      eventName: \"mozvisibilitychange\"\n    }, {\n      property: \"ms\",\n      eventName: \"msvisibilitychange\"\n    }, {\n      property: \"o\",\n      eventName: \"ovisibilitychange\"\n    }];\n    var correctPrefix;\n    if (\"hidden\" in document) return {\n      property: \"hidden\",\n      eventName: \"visibilitychange\"\n    };\n    prefixes.forEach(function (prefix) {\n      if (prefix.property + \"Hidden\" in document) {\n        correctPrefix = prefix;\n      }\n    });\n    return correctPrefix;\n  };\n\n  OpenApp.prototype.openEnd = function (status) {\n    clearTimeout(this.timer);\n    this.options.callback(status, this.msg);\n    this.msg = \"\"; // 调起失败处理\n\n    if (status != this.openStatus.SUCCESS) {\n      switch (status) {\n        case \"FAILED\":\n          break;\n\n        case \"UNKNOW\":\n          break;\n\n        default:\n          break;\n      }\n    }\n  };\n\n  OpenApp.prototype.locationCall = function (url) {\n    if (window.location) {\n      window.location.href = url;\n    } else if (document.location) {\n      document.location.href = url;\n    }\n  };\n\n  OpenApp.prototype.locationByIframeCall = function (url) {\n    var iframe = document.createElement(\"iframe\");\n    iframe.setAttribute(\"src\", url);\n    iframe.setAttribute(\"style\", \"display:none\");\n    document.body.appendChild(iframe);\n    setTimeout(function () {\n      document.body.removeChild(iframe);\n    }, 300);\n  };\n\n  return OpenApp;\n}();\n\nexports[\"default\"] = OpenApp; // @ts-ignore\n\nwindow.OpenApp = OpenApp;\n\n//# sourceURL=webpack:///./src/index.ts?");

/***/ }),

/***/ 0:
/*!****************************!*\
  !*** multi ./src/index.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./src/index.ts */\"./src/index.ts\");\n\n\n//# sourceURL=webpack:///multi_./src/index.ts?");

/***/ })

/******/ });
});