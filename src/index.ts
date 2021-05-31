/**
 * Openapp.ts
 *
 * Description: open and launch app in H5 page
 * Support: mobile and pc
 * @authors Luo-jinghui (luojinghui424@gmail.com)
 * @date  2019-09-25 20:55:35
 */

import { systemInfo, ISystemInfo } from "./browser";

interface IOpenStatus {
  FAILED: "FAILED";
  SUCCESS: "SUCCESS";
  UNKNOW: "UNKNOW";
}

interface IOptions {
  timeout: number;
  scheme: string;
  intent: string;
  applink: string;
  yyb: string;
  appstore: string;
  downloadUrl: string;
  wechatJumpYYB: boolean;
  iosUseScheme: boolean;
  copyText: string;
  callback: (status: string, msg?: string) => void;
}

interface IPrefix {
  property: string;
  eventName: string;
}

export default class OpenApp {
  public options: IOptions;
  public openStatus: IOpenStatus;
  public timer: any;
  public systemInfo: ISystemInfo;
  private msg: string;

  constructor(options) {
    const defaultOptions: IOptions = {
      timeout: 1000,
      scheme: "",
      intent: "",
      applink: "",
      yyb: "",
      appstore: "",
      downloadUrl: "",
      wechatJumpYYB: false,
      iosUseScheme: false,
      copyText: "",
      callback: function () {},
    };
    this.options = { ...defaultOptions, ...options };
    this.init();
  }

  public init() {
    this.systemInfo = systemInfo();

    // 打开状态，failed，success，unknow
    this.openStatus = {
      FAILED: "FAILED",
      SUCCESS: "SUCCESS",
      UNKNOW: "UNKNOW",
    };
  }

  public open() {
    const { applink, scheme, intent, iosUseScheme } = this.options;
    const {
      weixinVersion,
      isIOS,
      isWeixin,
      isAndroid,
      isChrome,
      isSafari,
      isFirefox,
      isIPad,
    } = this.systemInfo;

    this.timeoutEvent();

    console.log({
      isIOS,
      isWeixin,
      weixinVersion,
      applink,
      iosUseScheme,
      scheme,
      isIPad,
      isAndroid,
      isChrome,
    });

    if (isIOS) {
      // 微信7.0.5放开了universal link，直接使用即可
      // 否则，直接反馈唤起失败，让调用者决定是否需要采取其他方式
      if (isWeixin && weixinVersion < "7.0.5") {
        this.msg = "isIosLowVersionWechat";

        this.locationCall(scheme);
      } else if (applink) {
        this.locationCall(applink);
      } else if (iosUseScheme && scheme) {
        this.locationByIframeCall(scheme);
        this.locationCall(scheme);
      }
    } else if (isIPad && iosUseScheme) {
      // this.locationByIframeCall(scheme);
      this.locationCall(scheme);
    } else if (isAndroid) {
      if (isWeixin) {
        this.msg = "isAndroidWechat";
      }

      if (isChrome && !isWeixin) {
        if (intent) {
          this.locationCall(intent);
          this.locationCall(scheme);
          return;
        }
      }

      this.locationCall(scheme);
    } else if (isSafari || isFirefox) {
      // safari和firefox调用iframe唤起应用
      // 这两个浏览器通过scheme唤起时，如果不存在应用，那么会跳转并提示警告信息
      this.locationByIframeCall(scheme);
    } else {
      this.locationCall(scheme);
    }
  }

  public download() {
    const { wechatJumpYYB, downloadUrl, yyb, appstore } = this.options;
    const { isIOS, isWeixin, isAndroid } = this.systemInfo;

    if (isWeixin && isAndroid) {
      if (wechatJumpYYB) {
        this.locationCall(yyb);
      }
    } else if (isWeixin && isIOS) {
      if (wechatJumpYYB) {
        this.locationCall(appstore);
      }
    } else if (isAndroid) {
      if (downloadUrl) {
        this.locationCall(downloadUrl);
      } else {
        if (yyb) {
          this.locationCall(yyb);
        } else {
          console.log("没有配置下载地址");
        }
      }
    } else if (isIOS) {
      this.locationCall(appstore);
    } else {
      if (downloadUrl) {
        this.locationCall(downloadUrl);
        return;
      }
      if (yyb) {
        this.locationCall(yyb);

        return;
      } else {
        console.log("没有配置下载地址");
      }
    }
  }

  public timeoutEvent() {
    let haveChange = false;
    let isHaveApp = false;
    let isInputTimeout = false;
    let timeout = this.options.timeout;
    const { property = "", eventName = "" } = this.getVisibilityPrefix();
    const { isIOS, isSafari } = this.systemInfo;

    // 三星浏览器存在一定的页面跳转延迟，如果设置小于1s，那么再加上300ms时间
    if (this.systemInfo.isSamsung) {
      timeout = timeout <= 1000 ? timeout + 300 : timeout;
    }

    const pageChange = (e) => {
      const isHide =
        document[property] || e.hidden || document.visibilityState == "hidden";

      haveChange = true;

      if (isHide) {
        isHaveApp = true;
      }

      document.removeEventListener(eventName, pageChange);
      document.removeEventListener("baiduboxappvisibilitychange", pageChange);
    };

    const pageBlur = () => {
      haveChange = true;
      isHaveApp = true;
    };

    window.addEventListener("blur", pageBlur);
    document.addEventListener(eventName, pageChange, false);
    document.addEventListener("baiduboxappvisibilitychange", pageChange, false);

    // 如果ios使用safari浏览器，那么
    if (!(isIOS && isSafari && this.options.iosUseScheme)) {
      const input = document.createElement("input");
      let timmer = null;
      const onBlur = function (e) {
        if (!isInputTimeout) {
          haveChange = true;
          isHaveApp = true;
        }
      };

      input.setAttribute("id", "input");
      input.setAttribute("readonly", "");
      input.setAttribute("autocomplete", "off");
      input.setAttribute("type", "text");
      if (this.options.copyText) {
        input.setAttribute("value", this.options.copyText);
      }
      input.setAttribute(
        "style",
        "opacity: 0; position: fixed; top: 0; left: -999px; width: 1px; height: 1px"
      );
      document.body.appendChild(input);
      input.addEventListener("blur", onBlur);

      setTimeout(function () {
        isInputTimeout = true;
        input.removeEventListener("blur", onBlur);
        clearInterval(timmer);

        input.remove();
      }, this.options.timeout);

      input.focus();

      if (this.options.copyText) {
        input.select();
        input.setSelectionRange(0, input.value.length);
        document.execCommand("copy");
      }
    }

    this.timer = setTimeout(() => {
      if (
        (haveChange && isHaveApp) ||
        document.visibilityState === "hidden" ||
        document.hidden
      ) {
        this.openEnd(this.openStatus.SUCCESS);

        return;
      }

      if (haveChange) {
        return;
      }

      // @ts-ignore
      const isHidden = document.visibilityState === "hidden";

      window.removeEventListener("blur", pageBlur);
      document.removeEventListener(eventName, pageChange);
      document.removeEventListener("baiduboxappvisibilitychange", pageChange);

      if (!(isHidden || document.hidden) && !haveChange) {
        this.openEnd(this.openStatus.FAILED);
      } else {
        this.openEnd(this.openStatus.UNKNOW);
      }

      haveChange = true;
    }, this.options.timeout);
  }

  public getVisibilityPrefix(): IPrefix {
    const prefixes = [
      {
        property: "webkit",
        eventName: "webkitvisibilitychange",
      },
      {
        property: "moz",
        eventName: "mozvisibilitychange",
      },
      {
        property: "ms",
        eventName: "msvisibilitychange",
      },
      {
        property: "o",
        eventName: "ovisibilitychange",
      },
    ];
    let correctPrefix: IPrefix;

    if ("hidden" in document)
      return {
        property: "hidden",
        eventName: "visibilitychange",
      };

    prefixes.forEach(function (prefix) {
      if (prefix.property + "Hidden" in document) {
        correctPrefix = prefix;
      }
    });

    return correctPrefix;
  }

  public openEnd(status: string) {
    clearTimeout(this.timer);

    this.options.callback(status, this.msg);
    this.msg = "";

    // 调起失败处理
    if (status != this.openStatus.SUCCESS) {
      switch (status) {
        case "FAILED":
          break;
        case "UNKNOW":
          break;
        default:
          break;
      }
    }
  }

  public locationCall(url: string) {
    if (window.location) {
      window.location.href = url;
    } else if (document.location) {
      document.location.href = url;
    }
  }

  public locationByIframeCall(url: string) {
    const iframe = document.createElement("iframe");

    iframe.setAttribute("src", url);
    iframe.setAttribute("style", "display:none");

    document.body.appendChild(iframe);
    setTimeout(function () {
      document.body.removeChild(iframe);
    }, 300);
  }
}

// @ts-ignore
window.OpenApp = OpenApp;
