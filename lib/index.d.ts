/**
 * Openapp.ts
 *
 * Description: open and launch app in H5 page
 * Support: mobile and pc
 * @authors Luo-jinghui (luojinghui424@gmail.com)
 * @date  2019-09-25 20:55:35
 */
import { ISystemInfo } from './browser';
interface IOpenStatus {
    FAILED: 'FAILED';
    SUCCESS: 'SUCCESS';
    UNKNOW: 'UNKNOW';
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
    options: IOptions;
    openStatus: IOpenStatus;
    timer: any;
    systemInfo: ISystemInfo;
    private msg;
    constructor(options: any);
    init(): void;
    open(): void;
    download(): void;
    timeoutEvent(): void;
    getVisibilityPrefix(): IPrefix;
    openEnd(status: string): void;
    locationCall(url: string): void;
    locationByIframeCall(url: string): void;
}
export {};
