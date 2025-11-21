
import location from '/@/assets/location.svg';
import GeoSenceView from '/@/maputils/GeoSenceView';
export default class GeoSenceConfig {

  // arcgis js api for esri-loader
  public static jsapiurl =import.meta.env.VITE_APP_BASE_JSAPI_URL as any;
  public static jscssurl =import.meta.env.VITE_APP_BASE_JSCSS_URL as any;
  
//arcgis js api @arcgis/core
// public static assetsPath =import.meta.env.VITE_APP_BASE_ASSETS_PATH as any;
// public static defaultAssetsPath =import.meta.env.VITE_APP_BASE_DEFAULT_ASSETS_PATH as any;
// public static fontsUrl =import.meta.env.VITE_APP_BASE_FONTS_URL as any;

  public static assetsPath='esri';
//arcgis  measurement  symbol
 public static marksymbol = {
      type: "point-3d",
      symbolLayers: [{
        type: "icon",
        resource: {
        href: location
        },
         size: 20
       }],
      //  verticalOffset: {
      //   screenLength: 40,
      //   maxWorldLength: 100,
      //   minWorldLength: 20
      //  },
      //  callout: {
      //     type: "line",
      //     size: 1.5,
      //     color: "white",
      //     border: {
      //     color: "black"
      //    } 
      // }
}
 public static polylinesymbol = {
      type: "simple-line",
      color: [255, 0, 0],
      width: 4
 }

  public static  textsymbol = {
      type: "text",
      color: "white",
      angle: 0,
      text: "",
      xoffset: 60,
      yoffset: 10,
      horizontalAlignment: 'right',
      verticalAlignment: 'bottom',
      font: {
        size: 12,
        family: "Josefin Slab",
        weight: "bold"
      }
  }
  public static  textsymbolcopy = {
      type: "text",
      color: "white",
      angle: 0,
      text: "",
      xoffset: 60,
      yoffset: 10,
      horizontalAlignment: 'right',
      verticalAlignment: 'bottom',
      font: {
        size: 12,
        family: "Josefin Slab",
        weight: "bold"
      }
  }
  public static polygonsymbol = {
      type: "simple-fill",
      color: [51, 51, 204, 0.1],
      style: "solid",
      outline: {
        color: "blue",
        width: 3
      }
  }
  public static gisService = {
    baseMapServices: {
      layers: []
    }
  }

  private static GeosenceViews: GeoSenceView[] = [];
  // private static GeosenceLegends:GeoSenceLegend[] = [];
  public static Main_ViewContainer_Type='MainScreen'
  public static Sencondary_ViewContainer_Type='SencondaryScreen'
  // tslint:disable-next-line:no-empty
  constructor() {

  }

  public static  addGeoSenceView(view:GeoSenceView)
  {
    return this.GeosenceViews.push(view)
  }
  public static  getGeoSenceView(view_Name:any):any{
    const viewdata= this.GeosenceViews.find(viewitem=>viewitem.view_Type_Name===view_Name)
    return viewdata
  }
  public static  replaceGeoSenceView(view:GeoSenceView){
    this.GeosenceViews =  this.GeosenceViews.filter(viewitem=>viewitem.view_Type_Name!==view.view_Type_Name)
    this.GeosenceViews.push(view)
  }
  public static delGeoSenceView(view:GeoSenceView){
    this.GeosenceViews=  this.GeosenceViews.filter(viewitem=>viewitem.view_Type_Name!==view.view_Type_Name)
  }

  //   public static  addGeoSenceLegend(legend:GeoSenceLegend)
  // {
  //   return this.GeosenceLegends.push(legend)
  // }

  // public static  getGeoSenceLegend(view_Name:any):any{
  //   const legenddata= this.GeosenceLegends.find(viewitem=>viewitem.view_Type_Name===view_Name
  //   )
  //   return legenddata
  // }
  // public static  replaceGeoSenceLengend(legend:GeoSenceLegend){
  //   this.GeosenceLegends =  this.GeosenceLegends.filter(viewitem=>viewitem.view_Type_Name!==legend.view_Type_Name)
  //   this.GeosenceLegends.push(legend)
  // }
  // public static delGeoSenceLengend(legend:GeoSenceLegend){
  //   this.GeosenceLegends=  this.GeosenceLegends.filter(viewitem=>viewitem.view_Type_Name!==legend.view_Type_Name)
  // }

}