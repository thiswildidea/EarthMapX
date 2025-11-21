
import { store }from '/@/store/index.ts';
import TileLayer from "@arcgis/core/layers/TileLayer";
import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer";
import MapImageLayer from "@arcgis/core/layers/MapImageLayer";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import SceneLayer from "@arcgis/core/layers/SceneLayer";
import SpatialReference from "@arcgis/core/geometry/SpatialReference";
import Extent from "@arcgis/core/geometry/Extent";
import SHCTiledLayer from '/@/maputils/layers/SHCTiledLayer';
import ElevationLayer from "@arcgis/core/layers/ElevationLayer";
import GeoSenceConfig from '/@/config/GeoSenceConfig';
import Camera from "@arcgis/core/Camera";
 export async function addlayertoMap(layer:any,ViewContainer_type:any) {
   const geosence =GeoSenceConfig.getGeoSenceView(ViewContainer_type)
   const maplayer=geosence.view.map.findLayerById(layer.id) 
   if(maplayer) {
     geosence.view.map.remove(maplayer) 
     return;
   }
   switch (layer.maptype) {
     case "TileLayer": 
       geosence.view.map.add(new TileLayer( {
           url:layer.url,
           id: layer.id,
           title: layer.title,
         }

       ));
     break;
   case "SHCMapServiceLayer": 
    const fuExtent = new Extent({
            "xmin": -65000,
            "ymin": -76000,
            "xmax": 75000.00000000003,
            "ymax": 72000.00000000003,
            "spatialReference": SpatialReference.WebMercator
          });
    geosence.view.map.add(new SHCTiledLayer({
        id: layer.id,
        title: layer.title,
        opacity: layer.opacity,
        url: layer.url,
        token:  store.state.GisConfig.GisConfig.maptoken,
        fullExtent: fuExtent,
    }));
    break;
     case "MapImageLayer": 
     geosence.view.map.add(new MapImageLayer( {
           url:layer.url,
           id: layer.id,
           title: layer.title,
         }
       ));
        break;

     case "FeatureLayer": 
     if(layer.url){
       const flayer =new FeatureLayer({
           url:layer.url,
           id: layer.id,
           title: layer.title
         })
        geosence.view.map.add(flayer)
      }
     break;

     case "SceneLayer": 
     geosence.view.map.add(new SceneLayer( {
           url:layer.url,
           id: layer.id,
           title: layer.title,
         }
       ));
       break;
       case "GeoJSONLayer": 
        geosence.view.map.add(new GeoJSONLayer( {
            url: layer.url,
            id: layer.id,
            popupTemplate: layer.template,
            labelingInfo: layer.labelingInfo,
            renderer: layer.renderer
         }
       ));
       break;
   }
 }

 export async function removelayerfromMap(layer:any,ViewContainer_type:any) {
   const geosenceView =GeoSenceConfig.getGeoSenceView(ViewContainer_type).view
   const maplayer=geosenceView.map.findLayerById(layer.id) 
   if(maplayer) {
     geosenceView.map.remove(maplayer)
   }
    if(layer.ElevationLayer&&layer.elevation_url){
      const  layers=  geosenceView.map.ground.layers.filter((item:any)=>{return item.id === layer.elevation_id})
      geosenceView.map.ground.layers.removeMany(layers)
    }
 }

 export async function changlayeropacity(layer:any,ViewContainer_type:any) {
   const geosenceView =GeoSenceConfig.getGeoSenceView(ViewContainer_type).view
   const maplayer=geosenceView.map.findLayerById(layer.id)
    if(maplayer) {
     maplayer.opacity=layer.opacity
   }
 }

 export async function closeAllMaplayers(layers:any,ViewContainer_type:any) {
   const geosence=GeoSenceConfig.getGeoSenceView(ViewContainer_type)
     if( !layers.length) return;
      layers.map((layer:any)=> {
       const maplayer=geosence.view.map.findLayerById(layer.id) 
       if(maplayer) {
         geosence.view.map.remove(maplayer)
       }
       if(layer.ElevationLayer&&layer.elevation_url){
         const  layers=  geosence.view.map.ground.layers.filter((item:any)=>{return item.id === layer.elevation_id})
         geosence.view.map.ground.layers.removeMany(layers)
       }
     }
   )
   if(geosence.legend){
     geosence.view.ui.remove(geosence.legend)
     geosence.legend=null
   }
 }

 export async function setlayervisbile(layer:any,ViewContainer_type:any) {
  const geosenceView =GeoSenceConfig.getGeoSenceView(ViewContainer_type).view
    const maplayer=geosenceView.map.findLayerById(layer.id) 
      if(maplayer) {
         maplayer.visible=layer.visible
      }
 }
 