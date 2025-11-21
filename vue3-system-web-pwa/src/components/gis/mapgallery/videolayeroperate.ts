

import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import Graphic from "@arcgis/core/Graphic";
import Point from "@arcgis/core/geometry/Point";
import SpatialReference from "@arcgis/core/geometry/SpatialReference";
import GeoSenceConfig from '/@/config/GeoSenceConfig';
import * as webMercatorUtils from "@arcgis/core/geometry/support/webMercatorUtils";
import  camerapng  from '/@/assets/background/air.png';
export async function addVidolayer(layer:any,ViewContainer_type:any) {
  const geosenceView =GeoSenceConfig.getGeoSenceView(ViewContainer_type).view
  if (!geosenceView) return
  let clientoperateLayer;
  let PointGraphic;
  let graphicsource = [];
   if(layer.location){
    let point = new Point({
        x: layer.location.X,
        y: layer.location.Y,
        spatialReference: {
                  wkid: 102100
        }
    });
    PointGraphic = new Graphic({
            geometry: point,
            attributes: {
                
                    name:layer.attrs.name,
                    time:layer.attrs.time
              }});
    graphicsource.push(PointGraphic);
   }else{ return}
    clientoperateLayer=geosenceView.map.findLayerById(layer.id) 
    if(clientoperateLayer){
          clientoperateLayer.renderer = layer.renderer;
          clientoperateLayer.source = graphicsource;
          clientoperateLayer.refresh();
    }else{
    clientoperateLayer = new FeatureLayer({
           source:graphicsource,
            id: layer.id,
            title: layer.title,
            objectIdField: "ObjectID",
            geometryType: "point",
            fields: layer.fields,
            visible:true,
            labelingInfo:cameralabel(),
            renderer:cameraPointRenderer(),
            spatialReference: SpatialReference.WebMercator
          });
        clientoperateLayer.refresh();
        geosenceView.map.add(clientoperateLayer);
    }
 geosenceView.goTo({
        center: [graphicsource[0].geometry.longitude, graphicsource[0].geometry.latitude],
        zoom: 17,
        tilt: 75,
        heading: 105
      })}

export function cameralabel(){
     const  labelingInfo= [{
           labelExpressionInfo: {
             expression: "$feature.name + '  ' + $feature.time"
           },
           symbol: {
             type: 'label-3d',
             symbolLayers: [{
               type: 'text',
               material: {
                 color: 'white'
               },
               halo: {
                 size: 1,
                 color: [50, 50, 50]
               },
               size: 18
             }],
             verticalOffset: {
               screenLength: 60,
               maxWorldLength: 200,
               minWorldLength: 100
             },
             callout: {
               type: 'line',
               color: [50, 50, 50],
               size: 2,
               border: {
                 color: [50, 50, 50]
               }
             }
           },
           labelPlacement: 'above-center',
           maxScale: 0,
           minScale: 640000
         }]
  return labelingInfo  
}

 export function cameraPointRenderer() {
    let cameraPointrendrer = {
      type: "simple",
      symbol: {
        type: "point-3d",
        symbolLayers: [
          {
            type: "object",
            width: 32,
            resource: {
              href: './model/camera.gltf'
            }
          }
        ],
        verticalOffset: {
          screenLength: 30,
          maxWorldLength: 200,
          minWorldLength: 50
        },
        callout: {
          type: "line",
          color: [0, 0, 0],
          size: 2,
          border: {
            color: [255, 255, 255,0]
          }
        }
      }
    };
    return cameraPointrendrer;
  }