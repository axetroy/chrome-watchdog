/**
 * Created by axetroy on 16-12-21.
 */

import _ from 'underscore';
import co from 'co';
import Q from 'q';

export function loadImg(src) {
  let deferred = Q.defer();
  let img = new Image();
  img.src = src;
  img.onerror = err=>deferred.reject(err);
  img.onload = ()=>deferred.resolve(img);
  return deferred.promise;
}

export function resolveImg(path, exts = ['.png', '.jpg', '.gif', '.svg']) {
  return co(function*() {
    let list = [];
    _.each(exts, function (ext) {
      list.push(loadImg(path + ext).then(img=>Q.resolve(img)).catch(()=>Q.resolve()));
    });
    let imgs = yield list;
    imgs = _.filter(imgs, img=>img instanceof Image);
    if (_.isEmpty(imgs)) return yield loadImg('/ico/unknown.ico');
    return yield Q.resolve(imgs[0]);
  }).catch(err=>Q.reject(err));
}