import { Module } from 'vuex';
// 此处加上 `.ts` 后缀报错，具体原因不详
import { GisConfigState, RootStateTypes } from '/@/store/interface/index';

/**
 * 修改一下配置时，需要每次都清理 `window.localStorage` 浏览器永久缓存，配置才会生效
 * 哪个大佬有解决办法，欢迎pr，感谢💕！
 */
const GisConfigModule: Module<GisConfigState, RootStateTypes> = {
	namespaced: true,
	state: {
		GisConfig: {
			maptoken: '',
			isMainViewloaded: false,
			isSencondaryViewloaded: false,
			isGeoSenceViewStatary: false,
			is3dmode:true,
			Issplitscreen:false,
			IsScreenInteract:false
		},
	},
	mutations: {
		getmaptoken(state: any, data: any) {
			state.GisConfig.maptoken = data;
		},
		getMainViewloaded(state: any, data: boolean) {
			state.GisConfig.isMainViewloaded = data;
		},
		getSencondaryViewloaded(state: any, data: boolean) {
			state.GisConfig.isSencondaryViewloaded = data;
		},
		getGeoSenceViewStatary(state: any, data: boolean) {
			state.GisConfig.isGeoSenceViewStatary = data;
		},
		getis3dmode(state: any, data: boolean) {
			state.GisConfig.is3dmode = data;
		},
		getIssplitscreen(state: any, data: any) {
			state.GisConfig.Issplitscreen = data;
		},
		getIsScreenInteract(state: any, data: any) {
			state.GisConfig.IsScreenInteract = data;
		}
	},
	actions: {
		setmaptoken({ commit }, data: any) {
			commit('getmaptoken', data);
		},
		setMainViewloaded({ commit }, data: boolean) {
			commit('getMainViewloaded', data);
		},
		setSencondaryViewloaded({ commit }, data: boolean) {
			commit('getSencondaryViewloaded', data);
		},
		setGeoSenceViewStatary({ commit }, data: boolean) {
			commit('getGeoSenceViewStatary', data);
		},
		setis3dmode({ commit }, data: boolean) {
			commit('getis3dmode', data);
		},
		setIssplitscreen({ commit }, data: any) {
			commit('getIssplitscreen', data);
		},
        setIsScreenInteract({ commit }, data: any) {
			commit('getIsScreenInteract', data);
		},
	},
};

export default GisConfigModule;
