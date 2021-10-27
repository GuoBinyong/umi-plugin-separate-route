// ref:
// - https://umijs.org/plugins/api
import { IApi } from '@umijs/types';
import {parseComponentPath,routesMap,getRouteConfigPaths} from "./untils"
import {accessSync} from "fs"

export default function (api: IApi) {
  api.describe({
    key: 'separateRoute',
    config: {
      default:{
        fileName:"route",
        extNames:["ts","js","json"]
      },
      schema:function(joi) {
        return joi.object({
          fileName:joi.string(),
          extNames:joi.array().items(joi.string)
        });
      },
    },
  });

  if(!api.userConfig.separateRoute){
    return
  }



  


  api.modifyRoutes((routes,args) => {
    const separateRoute = api.config.separateRoute;
    const {fileName,extNames} = separateRoute;
    return routesMap(routes,function(route){
      const comPath = route.component;
      if(!comPath){
       return route;
      }

      const absPath = parseComponentPath(comPath,api.paths);
      const allPaths = getRouteConfigPaths(absPath,fileName,extNames);
      
      for (const routePath of allPaths){
        try{
          accessSync(routePath);
          // return import(routePath).then(function(component){
          //   const comRoute = component;
          //   return comRoute ? {...route,...comRoute} :route;
          // })
          const comRoute = require(routePath);
          if (comRoute){
            return {...route,...comRoute}
          }
        }catch(err){}
      }
      return route;
      
    });
  });



}