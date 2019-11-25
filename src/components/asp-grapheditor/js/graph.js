/*
 * @Description: graph
 * @Author: liuqiyu
 * @Date: 2019-11-25 09:43:50
 * @LastEditors: liuqiyu
 * @LastEditTime: 2019-11-25 10:38:13
 */

import Base64 from './../utils/base64'
import mxgraph from './mxgraph'

const {
  mxImage
} = mxgraph

function Graph () {

}

Graph.createSvgImage = function (w, h, data) {
  var tmp = unescape(encodeURIComponent(
    '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">' +
    '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="' + w + 'px" height="' + h + 'px" ' +
    'version="1.1">' + data + '</svg>'))

  return new mxImage('data:image/svg+xml;base64,' + ((window.btoa) ? btoa(tmp) : Base64.encode(tmp, true)), w, h)
}

export default Graph
