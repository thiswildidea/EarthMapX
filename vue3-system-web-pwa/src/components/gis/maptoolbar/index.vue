<template>
	<div class="esri-widget esri-maptoolbar">
	  <div class="esri-maptoolbar-control">
         <div class="esri-maptoolbar-control-button"   @click="openmaptoolbar">
            <span class="esri-icon-toolbar"></span>
		 </div>
		  <!-- <span>{{$t(maptoolbarUIlang)}}</span> -->
	  </div>
	<transition name="el-zoom-in-center">
	  <div class="esri-maptoolbar-container" v-show='isopen'>
         <div class="esri-maptoolbar-container-left">
           
		 </div>
		  <div class="esri-maptoolbar-container-right">
			 <div  class="esri-maptoolbar-toolitem-sepator"></div>
			 <el-tooltip :content="$t('message.gis.maptoolbar.maphomeUI')" placement="left">
               <div  class="esri-maptoolbar-toolitem" @click="initmapcamera">
                  <span class="esri-icon-home"></span>
			  </div>
			 </el-tooltip>
			 <div  class="esri-maptoolbar-toolitem-sepator"></div>
			 <div class='esri-maptoolbar-toolitem-zoom-container'>
			  <div class='esri-maptoolbar-toolitem-zoomitems'>
				<el-tooltip :content="$t('message.gis.maptoolbar.mapzoominUI')" placement="left">
			      <div  class="esri-maptoolbar-toolitem" @mousedown="maptoolbarzoomMoveInaction"  @click="viewzoomin">
                     <span class="esri-icon-zoomIn"></span>
			       </div>
				</el-tooltip>
				  <el-tooltip :content="$t('message.gis.maptoolbar.mapzoomoutUI')" placement="left">
			        <div  class="esri-maptoolbar-toolitem" @mousedown="maptoolbarzoomMoveInaction" @click="viewzoomout">
                       <span class="esri-icon-zoomOut"></span>
			         </div>
				  </el-tooltip>
			   </div>
			   	<transition name="el-zoom-in-center">
					<div class="esri-maptoolbar-toolitem-zoomlevel-container" v-show='zoombarisopen'>
					    <el-slider  vertical class="esri-maptoolbar-toolitem-zoomlevel" v-model="mapzoom"  :min=mapminzoom :max=mapmaxzoom :step=0.1 @change="changeviewzoom"/>
					 </div>
				</transition>
			 </div>
			 <div  class="esri-maptoolbar-toolitem-sepator" v-show="false"></div>
			<el-tooltip :content="$t('message.gis.maptoolbar.fullscreenUI')" placement="left">
			   <div  class="esri-maptoolbar-toolitem" v-show="false">
                <span class="esri-icon-fullscreen"></span>
			  </div>
			</el-tooltip>
             <div  class="esri-maptoolbar-toolitem-sepator"></div>
			 <el-tooltip :content="$t('message.gis.maptoolbar.measurement.measureUITool')" placement="right">
			  <div class='esri-maptoolbar-toolitem-measurement-container'>
			   <div class='esri-maptoolbar-toolitem-measurement'>
			      <div  class="esri-maptoolbar-toolitem"   @click="openMeasurement">
                     <span class="esri-icon-measurement"></span>
			       </div>
			    </div>
			    	<transition name="el-zoom-in-center">
					<div class="esri-maptoolbar-toolitem-measurementitem-container" v-show='measurementbarisopen'>
					   <el-tooltip :content="$t('message.gis.maptoolbar.measurement.measure_point')" placement="top">
					    <div  class="esri-maptoolbar-toolitem sencondardy" @click="measure_point">
                            <span class="esri-icon-measure-point" :class="{active:active_measure_point}"></span>
			            </div>
					   </el-tooltip>
					   <div  class="esri-maptoolbar-toolitem-measurement-sepator"></div>
					  <el-tooltip :content="$t('message.gis.maptoolbar.measurement.measure_polyline')" placement="top">
					     <div  class="esri-maptoolbar-toolitem sencondardy" @click="measure_polyline" >
                            <span class="esri-icon-measure-polyline" :class="{active:active_measure_polyline}"></span>
			             </div>
					  </el-tooltip>
					  <el-tooltip :content="$t('message.gis.maptoolbar.measurement.measure_rectangle')" placement="top">
					     <div  class="esri-maptoolbar-toolitem sencondardy" @click="measure_rectangle" >
                            <span class="esri-icon-measure-rectangle" :class="{active:active_measure_rectangle}"></span>
			             </div>
					  </el-tooltip>
					 <div  class="esri-maptoolbar-toolitem-measurement-sepator"></div>
					  <el-tooltip :content="$t('message.gis.maptoolbar.measurement.measure_polygon')" placement="top">
					     <div  class="esri-maptoolbar-toolitem sencondardy" @click="measure_polygon">
                            <span class="esri-icon-measure-polygon" :class="{active:active_measure_polygon}"></span>
			            </div>
					  </el-tooltip>
					  <div  class="esri-maptoolbar-toolitem-measurement-sepator"></div>
					   <el-tooltip :content="$t('message.gis.maptoolbar.measurement.measure_circle')" placement="top">
					     <div  class="esri-maptoolbar-toolitem sencondardy" @click="measure_circle">
                            <span class="esri-icon-measure-circle" :class="{active:active_measure_polycircle}"  ></span>
			             </div>
					   </el-tooltip>
					    <div  class="esri-maptoolbar-toolitem-measurement-sepator"></div>
						<el-tooltip :content="$t('message.gis.maptoolbar.measurement.measure_clean')" placement="top">
						 <div  class="esri-maptoolbar-toolitem sencondardy"  @click="measure_clean">
                            <span class="esri-icon-measure-clean"></span>
			             </div>
						</el-tooltip>
					 </div>
			 	</transition>
			  </div>
			 </el-tooltip>
			 <div  class="esri-maptoolbar-toolitem-sepator"></div>
			 <el-tooltip :content="$t('message.gis.maptoolbar.locate')" placement="left">
			   <div  class="esri-maptoolbar-toolitem" @click="btnlocate" >
                <span :class="[{'esri-icon-locate':!islocate},{'esri-icon-locate':islocate},{'active':islocate}]"></span>
			   </div>
			</el-tooltip>
			  <div  class="esri-maptoolbar-toolitem-sepator"></div>
			 <el-tooltip :content="$t('message.gis.maptoolbar.map23dswitch')" placement="left">
			   <div  class="esri-maptoolbar-toolitem" @click="switch23dmode">
                <span :class="[{'esri-icon-3d':is3dmode},{'esri-icon-2d':!is3dmode}]"></span>
			   </div>
			</el-tooltip>
			<div  class="esri-maptoolbar-toolitem-sepator"></div>
			 <el-tooltip :content="$t('message.gis.maptoolbar.splitscreen')" placement="left">
			   <div  class="esri-maptoolbar-toolitem" @click="splitscreen">
                <span class="esri-icon-splitscreen" :class="{active:Issplitscreen}"></span>
			   </div>
			</el-tooltip>
			<div  class="esri-maptoolbar-toolitem-sepator" v-show="Issplitscreen"></div>
			 <el-tooltip :content="$t('message.gis.maptoolbar.screenInteract')" placement="left">
			   <div  class="esri-maptoolbar-toolitem" @click="screenInteract" v-show="Issplitscreen">
                <span class="esri-icon-screeninteract" :class="{active:IsScreenInteract}"></span>
			   </div>
			</el-tooltip>
		 </div>
	  </div>
	</transition>
	</div>
</template>

<script lang="ts">
import { ref, toRefs, reactive,onBeforeMount,onMounted, nextTick, computed, watch } from 'vue';
import { useStore } from '/@/store/index';
import{pointMeasurement,polylineMeasurement,rectangleMeasurement,polygonMeasurement,polycircleMeasurement} from '/@/components/gis/maptoolbar/measurement';
import { get_mapconfig } from '/@/api/gis/3dmenus/index';
import GeoSenceConfig from '/@/config/GeoSenceConfig';
import SpatialReference from "@arcgis/core/geometry/SpatialReference";
import Camera from "@arcgis/core/Camera";
import Extent from "@arcgis/core/geometry/Extent";
import { createLocateService } from '/@/components/gis/maptoolbar/locateService';
export default {
	name: 'maptoolbar',
	emits: ['switchmapmode'],
	props: {
		ViewContainer_type: {
			type: String,
			default: () => 'MainScreen',
		},
		modelValue: String,
	},
	setup(props, { emit }) {
		const store = useStore();

		const state: any = reactive({
		 is3dmode:store.state.GisConfig.GisConfig.is3dmode,
		 initextent:null,
		 initcamera: null,
		 isopen:true,
		 zoombarisopen:false,
		 mapzoom:0,
		 mapminzoom:0,
		 mapmaxzoom:23,
		 islocate:false,
		 maptoolbarUIlang:'message.gis.maptoolbar.UIName',
	     measurementbarisopen:false,
		 active_measure_point:false,
		 active_measure_polyline:false,
		 active_measure_rectangle:false,
		 active_measure_polygon:false,
		 active_measure_polycircle:false,
		 drawmeasuregraphiclayerID:'drawmeasuregraphiclayer',
		 Issplitscreen:store.state.GisConfig.GisConfig.Issplitscreen,
		 IsScreenInteract:store.state.GisConfig.GisConfig.IsScreenInteract
		});
    // const is3dmode = computed(() => {
	// 	state.is3dmode=store.state.GisConfig.GisConfig.is3dmode;
	// });
     onBeforeMount(async()=>{
        let mapconfig:any = await get_mapconfig()
		state.initcamera=mapconfig.initcamera
		state.initextent=mapconfig.initextent
     })
	onMounted(() => {
		
	});
	watch(()=>store.state.GisConfig.GisConfig.is3dmode, (val:any) => {
		 state.is3dmode= val;
	   }
	);
    watch(()=>store.state.GisConfig.GisConfig.Issplitscreen, (val:any) => {
		 state.Issplitscreen= val;
	   }
	);

   watch(()=>store.state.GisConfig.GisConfig.IsScreenInteract, (val:any) => {
		 state.IsScreenInteract= val;
	   }
	);
   watch(()=>store.state.GisConfig.GisConfig.isGeoSenceViewStatary, (val:any) => {
		if(val){
			const geoview =GeoSenceConfig.getGeoSenceView(props.ViewContainer_type)
			if(geoview)
			  state.mapzoom=geoview.mapzoom
		}
	   }
	);
   watch(
	 ()=>store.state.GisConfig.GisConfig.isMainViewloaded||store.state.GisConfig.GisConfig.isSencondaryViewloaded, (val:any) => {
		if(val){
		    const geoview =GeoSenceConfig.getGeoSenceView(props.ViewContainer_type)
	        if(geoview){
		        state.mapzoom=geoview.mapzoom
				state.mapminzoom=geoview.mapminzoom
                state.mapmaxzoom=geoview.mapmaxzoom
			}
		  }
	  }
	);

	 const openmaptoolbar = () => {
          state.isopen=! state.isopen
	   };
	const changeviewzoom=()=>{
		const geosenceView =GeoSenceConfig.getGeoSenceView(props.ViewContainer_type).view
		geosenceView.zoom=state.mapzoom
        //  state.zoombarisopen=false
	  };

		// 创建定位服务实例
    let locateService = createLocateService(props.ViewContainer_type);
    const btnlocate=()=>{
      state.islocate=!state.islocate;
      if(state.islocate){
        locateService.startLocate();
      }else{
        locateService.stopLocate();
      }
    };
	const maptoolbarzoomMoveInaction=()=>{
        state.zoombarisopen=true
	};

	const viewzoomin=()=>{
		const geosenceView =GeoSenceConfig.getGeoSenceView(props.ViewContainer_type)
		let step=0
		geosenceView.view.type==='3d'?step=0.1 :step=1
        if((geosenceView.view.zoom+step)<geosenceView.mapmaxzoom)
		geosenceView.view.zoom= geosenceView.view.zoom+step
		state.mapzoom =geosenceView.view.zoom
	};
	const viewzoomout=()=>{
		const geosenceView =GeoSenceConfig.getGeoSenceView(props.ViewContainer_type)
	    let step=0
		geosenceView.view.type==='3d'?step=0.1 :step=1
       if((geosenceView.view.zoom-step)>geosenceView.mapminzoom)
		geosenceView.view.zoom= geosenceView.view.zoom-step
		state.mapzoom =geosenceView.view.zoom
	};
	const initmapcamera=()=>{
	if(state.is3dmode){
	  const camera = new Camera({
      fov: state.initcamera.fov,
      heading: state.initcamera.heading,
      position: {
        x: state.initcamera.x,
        y: state.initcamera.y,
        z: state.initcamera.z,
        spatialReference: SpatialReference.WebMercator
      },
      tilt: state.initcamera.tilt
    });
	  const geosenceView =GeoSenceConfig.getGeoSenceView(props.ViewContainer_type).view
      geosenceView.goTo(camera,state.initcamera.options)
	 }
	else{
	  const initextent = new Extent({
        xmin: state.initextent.xmin,
        ymin: state.initextent.ymin,
        xmax: state.initextent.xmax,
        ymax: state.initextent.ymax,
        spatialReference: {wkid: 102100}
       })
	   const geosenceView =GeoSenceConfig.getGeoSenceView(props.ViewContainer_type).view
       geosenceView.goTo({
             extent: initextent,
             zoom: state.initextent.zoom
		}).then(()=>{
			geosenceView.rotation=0
		})
	  }
	};
	
	const openMeasurement=()=>{
        state.measurementbarisopen=!state.measurementbarisopen
	};
	
	const measure_point=()=>{
	   state.active_measure_point=true
	   state.active_measure_polyline=false
	   state.active_measure_rectangle=false
	   state.active_measure_polygon=false
	   state.active_measure_polycircle=false
       pointMeasurement(state.drawmeasuregraphiclayerID,props.ViewContainer_type,(iscomplete:any)=>{
         state.active_measure_point=iscomplete
	   })
	}
	const measure_polyline=()=>{
	   state.active_measure_point=false
	   state.active_measure_polyline=true
	   state.active_measure_rectangle=false
	   state.active_measure_polygon=false
	   state.active_measure_polycircle=false
       polylineMeasurement(state.drawmeasuregraphiclayerID,props.ViewContainer_type,(iscomplete:any)=>{
         state.active_measure_polyline=iscomplete
	   })
	}
   const measure_rectangle=()=>{
	   state.active_measure_point=false
	   state.active_measure_polyline=false
	   state.active_measure_rectangle=true
	   state.active_measure_polygon=false
	   state.active_measure_polycircle=false
       rectangleMeasurement(state.drawmeasuregraphiclayerID,props.ViewContainer_type,(iscomplete:any)=>{
         state.active_measure_rectangle=iscomplete
	   })
	}
	const measure_polygon=()=>{
	   state.active_measure_point=false
	   state.active_measure_polyline=false
	   state.active_measure_rectangle=false
	   state.active_measure_polygon=true
	   state.active_measure_polycircle=false
       polygonMeasurement(state.drawmeasuregraphiclayerID,props.ViewContainer_type,(iscomplete:any)=>{
         state.active_measure_polygon=iscomplete
	   })
	}
	const measure_circle=()=>{
	   state.active_measure_point=false
	   state.active_measure_polyline=false
	   state.active_measure_rectangle=false
	   state.active_measure_polygon=false
	   state.active_measure_polycircle=true
       polycircleMeasurement(state.drawmeasuregraphiclayerID,props.ViewContainer_type,(iscomplete:any)=>{
         state.active_measure_polycircle=iscomplete
	   })
	}
	
	const measure_clean=()=>{
    GeoSenceConfig.geosence_drawmeasuretool =null
    const geosenceView =GeoSenceConfig.getGeoSenceView(props.ViewContainer_type).view
	let drawmeasuregraphiclayer = geosenceView.map.findLayerById(state.drawmeasuregraphiclayerID);
	if (drawmeasuregraphiclayer) {
         geosenceView.map.remove(drawmeasuregraphiclayer);
	   }
	}
   const switch23dmode=()=>{
	  state.is3dmode=!state.is3dmode
      store.dispatch('GisConfig/setis3dmode', state.is3dmode);
	}
	
   const splitscreen=()=>{
      state.Issplitscreen=!state.Issplitscreen
	  store.dispatch('GisConfig/setIssplitscreen', state.Issplitscreen);
	  if(!state.Issplitscreen){
        state.IsScreenInteract=false
	    store.dispatch('GisConfig/setIsScreenInteract', false);
	  }

	}
    const screenInteract=()=>{
      state.IsScreenInteract=!state.IsScreenInteract
	  store.dispatch('GisConfig/setIsScreenInteract', state.IsScreenInteract);
	}
	
	return {
		openmaptoolbar,
		changeviewzoom,
		maptoolbarzoomMoveInaction,
        viewzoomin,
		viewzoomout,
		initmapcamera,
		openMeasurement,
		measure_point,
		measure_polyline,
		measure_rectangle,
		measure_polygon,
		measure_circle,
		measure_clean,
		btnlocate,
		switch23dmode,
		splitscreen,
		screenInteract,
		...toRefs(state),
	};
	},
};
</script>
