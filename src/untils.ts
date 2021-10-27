import { join, parse } from 'path';
import { IApi, IRoute } from '@umijs/types';

/**
 * 把组件路径解析为绝对路径
 * @param comPath 
 * @param paths 
 * @returns 
 */
export function parseComponentPath(comPath: string, paths: IApi['paths']) {
  if (comPath.startsWith('@/')) {
    return join(paths.absSrcPath ?? '', comPath.slice(2));
  }
  return join(paths.absPagesPath ?? '', comPath);
}


/**
 * 生成路由配置配置的所有可能的文件路径
 * @param comPath 
 * @param routeFileName 
 * @returns 
 */
 export function getRouteConfigPaths(comPath: string, routeFileName: string) {
    const pathInfo = parse(comPath);
    const { dir, name } = pathInfo;
    const allPaths: string[] = [];
    if (name === 'index') {
      const routePath = join(dir, routeFileName);
      allPaths.push(routePath)
    }
  
    const routePath = join(dir, `${name}.${routeFileName}`);
    allPaths.push(routePath)
    return allPaths;
  }

/**
 * 路由的迭代器，支持异步操作
 * @param routes 
 * @param mapper 
 */
export function routesMap(
  routes: IRoute[],
  mapper: (route: IRoute) => IRoute,
): IRoute[];
export function routesMap(
  routes: IRoute[],
  mapper: (route: IRoute) => Promise<IRoute>,
): Promise<IRoute[]>;
export function routesMap(
  routes: IRoute[],
  mapper: (route: IRoute) => IRoute | Promise<IRoute>,
): IRoute[] | Promise<IRoute[]>;
export function routesMap(
  routes: IRoute[],
  mapper: (route: IRoute) => IRoute | Promise<IRoute>,
): IRoute[] | Promise<IRoute[]> {
  let isAsync = false;

  const newRoutes = routes.map(function(route) {
    const children = route.routes;
    const newRou = mapper(route);

    const childrenRes = children ? routesMap(children, mapper) : undefined;

    if (newRou instanceof Promise || childrenRes instanceof Promise) {
      isAsync = true;
      return Promise.all([newRou, childrenRes]).then(
        ([newRou, childrenRes]) => {
          if (childrenRes) {
            newRou.routes = childrenRes;
          }
          return newRou;
        },
      );
    }

    if (childrenRes) {
      newRou.routes = childrenRes;
    }

    return newRou;
  });

  return isAsync ? Promise.all(newRoutes) : newRoutes;
}
