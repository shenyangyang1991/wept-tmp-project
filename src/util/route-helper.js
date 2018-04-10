import _ from 'loadsh'

export const createRoute = (router) => {
  if (router instanceof Array) return router
  if (router instanceof Object) return _.values(router)
  return []
}