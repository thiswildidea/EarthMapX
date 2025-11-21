<template>
	<div class="home-container" :style="{minHeight: `calc(100vh - ${headerHeight})`,maxHeight: `calc(100vh - ${headerHeight})`}">

        <div id="MainScreen_ViewDiv_EarthMapX" ref="MainScreen_viewDiv_EarthMapX" :class="[{'MainScreen-fullscreen':!Issplitscreen},{'MainScreen-splitscreen':Issplitscreen}]"  :style="{minHeight: `calc(100vh - ${headerHeight})`,maxHeight: `calc(100vh - ${headerHeight})`}">
        </div>
        <div id="SencondaryScreen_ViewDiv_EarthMapX" ref="SencondaryScreen_viewDiv_EarthMapX" :class="[{'SencondaryScreen-halfscreen':Issplitscreen},{'SencondaryScreen-Displayscreen':!Issplitscreen}]"  :style="{minHeight: `calc(100vh - ${headerHeight})`,maxHeight: `calc(100vh - ${headerHeight})`}">
        </div>

      <Bmapgallery id="MainScreen_Bmapgallery" ViewContainer_type='MainScreen' v-show="isMainMapUIVisible"></Bmapgallery> 
      <Mapgallery  id="MainScreen_Mapgallery"   ViewContainer_type='MainScreen' v-show="isMainMapUIVisible" ></Mapgallery> 
      <Maptoolbar  id="MainScreen_Maptoolbar"  ViewContainer_type='MainScreen' v-show="isMainMapUIVisible"></Maptoolbar>

      <Bmapgallery id="SencondaryScreen_Bmapgallery" ViewContainer_type='SencondaryScreen' v-show="isSencondaryMapUIVisible"></Bmapgallery> 
      <Mapgallery  id="SencondaryScreen_Mapgallery"   ViewContainer_type='SencondaryScreen' v-show="isSencondaryMapUIVisible" ></Mapgallery> 
      <Maptoolbar  id="SencondaryScreen_Maptoolbar"  ViewContainer_type='SencondaryScreen'  v-show="isSencondaryMapUIVisible"></Maptoolbar>
	</div>
</template>

<script lang="ts">
import {  reactive,onBeforeMount,onMounted,onUnmounted,toRefs, nextTick, computed, getCurrentInstance, watch, onActivated } from 'vue';
import * as echarts from 'echarts';
import Bmapgallery from '/@/components/gis/bmapgallery/index.vue';
import Mapgallery from '/@/components/gis/mapgallery/index.vue';
import Maptoolbar from '/@/components/gis/maptoolbar/index.vue';
import { ElMessageBox, ElMessage } from "element-plus";
import { formatAxis } from '/@/utils/formatTime';
import { useStore } from '/@/store/index';
import { useRouter } from 'vue-router';
// import { initMap } from '/@/maputils/3dmenus/changedetection/Map';
import { get_mapconfig } from '/@/api/gis/3dmenus/index';
import GeoSenceView from '/@/maputils/GeoSenceView';
import GeoSenceConfig from '/@/config/GeoSenceConfig';
import * as reactiveUtils from "@arcgis/core/core/reactiveUtils";
import GeoSenceLegend from '/@/maputils/GeoSenceLegend';
export default {
 name: "map",
 components: {Bmapgallery,Mapgallery,Maptoolbar},
 setup() {
      const { proxy } = getCurrentInstance() as any;
      const store = useStore();
      const router = useRouter();
      const state = reactive({
        MainViewContainer:GeoSenceConfig.Main_ViewContainer_Type,
        SencondaryViewContainer:GeoSenceConfig.Sencondary_ViewContainer_Type,
        headerHeight: '',
        mapconfig:null,
        isMainMapUIVisible:false,
        isSencondaryMapUIVisible:false,
        Issplitscreen:false
     });
    // const isTagsview = computed(() => {
		// 	return store.state.themeConfig.themeConfig.isTagsview;
		// });
    
    /** 获取地图token */
    const getMapToken = async () => {
         store.dispatch('GisConfig/setMainViewloaded', false);
         const MainView= new GeoSenceView(state.MainViewContainer,{
           mapconfig:state.mapconfig,
           is3dmode:store.state.GisConfig.GisConfig.is3dmode
         }) 
          await MainView.initView()
          GeoSenceConfig.replaceGeoSenceView(MainView)
    };
    const initHeaderHeight = () => {
			let { isTagsview } = store.state.themeConfig.themeConfig;
			if (isTagsview) return (state.headerHeight = `84px`);
			else return (state.headerHeight = `50px`);
		};

    // 页面加载前
    onBeforeMount(() => {
      store.dispatch('GisConfig/setMainViewloaded', false);
      store.dispatch('GisConfig/setSencondaryViewloaded', false);
      store.dispatch('GisConfig/setis3dmode', true);
      store.dispatch('GisConfig/setIssplitscreen', false);
      store.dispatch('GisConfig/setIsScreenInteract', false);
			initHeaderHeight();
    })
     
     const onLayoutResize = () => {
       initHeaderHeight();
       proxy.$refs.MainScreen_viewDiv_EarthMapX.style.minHeight=`calc(100vh - ${state.headerHeight})`
       if(state.Issplitscreen){
         proxy.$refs.SencondaryScreen_viewDiv_EarthMapX.style.minHeight=`calc(100vh - ${state.headerHeight})`
       }
     }
     // 页面加载时
     onMounted(async() => {
      let getmapconfig:any = await get_mapconfig()
      state.mapconfig=getmapconfig
       console.log(state.mapconfig)
       getMapToken()
       window.addEventListener('resize', onLayoutResize);
     });
     onUnmounted(()=>{
       window.removeEventListener('resize', onLayoutResize);
     })
     // 由于页面缓存原因，keep-alive
     onActivated(() => {
     
     });
    watch(()=>store.state.themeConfig.themeConfig.isTagsview, (val:any) => {
			  state.headerHeight = val ? '84px' : '50px';
			}
		);

    watch(()=>store.state.GisConfig.GisConfig.isMainViewloaded, (val:any) => {
			  state.isMainMapUIVisible = val;
			}
		);

     watch(()=>store.state.GisConfig.GisConfig.isSencondaryViewloaded, (val:any) => {
        state.isSencondaryMapUIVisible= val;
			}
		);

    watch(()=>store.state.GisConfig.GisConfig.is3dmode, async(val:any) => {
		  store.dispatch('GisConfig/setMainViewloaded', false);
      const MainView= new GeoSenceView(state.MainViewContainer,{
        mapconfig:state.mapconfig,
        maptoken:store.state.GisConfig.GisConfig.maptoken,
        is3dmode:store.state.GisConfig.GisConfig.is3dmode
      }) 
      await MainView.initView()
       GeoSenceConfig.replaceGeoSenceView(MainView)

  
      //分屏
      if(state.Issplitscreen){
        store.dispatch('GisConfig/setSencondaryViewloaded', false);
         const SencondaryView= new GeoSenceView(state.SencondaryViewContainer,{
         mapconfig:state.mapconfig,
         maptoken:store.state.GisConfig.GisConfig.maptoken,
         is3dmode:store.state.GisConfig.GisConfig.is3dmode
       }) 
        await SencondaryView.initView()
        GeoSenceConfig.replaceGeoSenceView(SencondaryView)
      }
	   }
	);
    watch(()=>store.state.GisConfig.GisConfig.Issplitscreen, async(val:any) => {
         if(state.Issplitscreen!=val){
           state.Issplitscreen = val;
         }
			   if(state.Issplitscreen){
           store.dispatch('GisConfig/setMainViewloaded', false);
           const MainView= new GeoSenceView(state.MainViewContainer,{
            mapconfig:state.mapconfig,
            maptoken:store.state.GisConfig.GisConfig.maptoken,
            is3dmode:store.state.GisConfig.GisConfig.is3dmode
          }) 
          await MainView.initView()
          GeoSenceConfig.replaceGeoSenceView(MainView)

          store.dispatch('GisConfig/setSencondaryViewloaded', false);
          const SencondaryView= new GeoSenceView(state.SencondaryViewContainer,{
           mapconfig:state.mapconfig,
           maptoken:store.state.GisConfig.GisConfig.maptoken,
           is3dmode:store.state.GisConfig.GisConfig.is3dmode
           }) 
           await SencondaryView.initView()
           GeoSenceConfig.replaceGeoSenceView(SencondaryView)
         }
			}
		);
     watch(()=>store.state.GisConfig.GisConfig.IsScreenInteract, async(val:any) => {

      const MainGeoView =GeoSenceConfig.getGeoSenceView(state.MainViewContainer)
      const SencondaryGeoView =GeoSenceConfig.getGeoSenceView(state.SencondaryViewContainer)
      if(val){
             MainGeoView.removestationaryHandler()
             MainGeoView.addstationaryHandler(()=>{
              if(MainGeoView.activated&&!SencondaryGeoView.activated)
                {
                  if(MainGeoView.view.type==='3d'){
                    SencondaryGeoView.view.goTo(MainGeoView.view.camera)
                  }else{
                    SencondaryGeoView.view.goTo(MainGeoView.view.extent,MainGeoView.mapzoom)
                  }
                }
              });
             SencondaryGeoView.removestationaryHandler()
             SencondaryGeoView.addstationaryHandler(()=>{
             if(SencondaryGeoView.activated&&!MainGeoView.activated){
                  if(SencondaryGeoView.view.type==='3d'){
                    MainGeoView.view.goTo(SencondaryGeoView.view.camera)
                  }else{
                    MainGeoView.view.goTo(SencondaryGeoView.view.extent,SencondaryGeoView.mapzoom)
                  }
              }
        })
      }else{
             MainGeoView.removestationaryHandler()
             MainGeoView.addstationaryHandler(()=>{})
             SencondaryGeoView.removestationaryHandler()
             SencondaryGeoView.addstationaryHandler(()=>{})
         }
     })
  
    return {
       getMapToken,
      ...toRefs(state),
     }
  }
}
</script>

<style scoped lang="scss">
.home-container {
  padding: 0px !important;
  margin: 0px !important;
  display: flex;
  flex-direction: row;
   	.MainScreen-fullscreen{
       padding: 0;
       margin: 0;
       width:  100%;
     }
     .MainScreen-splitscreen{
       padding: 0;
       margin: 0;
       width:  50%;
       border-right:  1px solid rgba(32, 136, 245, 1);
     }
    .SencondaryScreen-halfscreen{
       padding: 0;
       margin: 0;
       width:  50%;
    }
    .SencondaryScreen-Displayscreen{
      display: none;
    }
}
</style>
