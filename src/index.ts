// ref:
// - https://umijs.org/plugins/api
import { IApi } from '@umijs/types';
import {parseComponentPath,routesMap,getRouteConfigPaths} from "./untils"

export default function (api: IApi) {
  api.describe({
    key: 'separateRoute',
    config: {
      default:{
        fileName:"route"
      },
      schema:function(joi) {
        return joi.object({
          fileName:joi.string()
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
      const allPaths = getRouteConfigPaths(absPath,fileName);
      
      for (const routePath of allPaths){
        try{
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