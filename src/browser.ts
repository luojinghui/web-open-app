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

export const systemInfo = (): ISystemInfo => {
	const u = window.navigator ? window.navigator.userAgent : navigator.userAgent;
	const chrome = u.indexOf('Chrome') || -1;

	// 是否是android
	const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
	// 是否是ios
	const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
	const isSafari = /Safari/.test(u) && !/Chrome/.test(u);
	// 是否是chrome
	const isChrome = chrome > 0;
	const isFirefox = u.indexOf('Firefox') >= 0;
	// 是否是三星浏览器
	const isSamsung = u.indexOf('SamsungBrowser') >= 0;
	//判断是否是微信
	const isWeixin = (function() {
		const ua = u.toLowerCase();

		// @ts-ignore
		return ua.match(/MicroMessenger/i) == 'micromessenger';
	})();
	// 微信版本
	const weixinVersion = (function() {
		let version = [];

		try {
			version = navigator.appVersion.match(/micromessenger\/(\d+\.\d+\.\d+)/i) || [];
		} catch (err) {
			version = [];
		}

		return version[1] || '';
	})();

	return {
		isAndroid,
		isIOS,
		isSafari,
		isChrome,
		isFirefox,
		isWeixin,
		isSamsung,
		weixinVersion
	};
};
