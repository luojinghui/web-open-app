/**
 * Browser Info
 *
 * @authors Luo-jinghui (luojinghui424@gmail.com)
 * @date  2019-09-27 16:18:30
 */
export interface ISystemInfo {
    isAndroid: boolean;
    isIOS: boolean;
    isSafari: boolean;
    isChrome: boolean;
    isFirefox: boolean;
    isSamsung: boolean;
    isWeixin: boolean;
    weixinVersion: string;
}
export declare const systemInfo: () => ISystemInfo;
