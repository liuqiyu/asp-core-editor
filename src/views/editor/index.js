/*
 * @Description:index
 * @Author: liuqiyu
 * @Date: 2019-12-12 14:17:29
 * @LastEditors: liuqiyu
 * @LastEditTime: 2019-12-12 14:23:45
 */
import mx from 'mxgraph'
const mxgraph = mx({
  mxImageBasePath: './src/images',
  mxBasePath: './src'
})
// decode bug https://github.com/jgraph/mxgraph/issues/49
window.mxGraph = mxgraph.mxGraph
window.mxGraphModel = mxgraph.mxGraphModel
window.mxEditor = mxgraph.mxEditor
window.mxGeometry = mxgraph.mxGeometry
window.mxDefaultKeyHandler = mxgraph.mxDefaultKeyHandler
window.mxDefaultPopupMenu = mxgraph.mxDefaultPopupMenu
window.mxStylesheet = mxgraph.mxStylesheet
window.mxDefaultToolbar = mxgraph.mxDefaultToolbar
export default mxgraph
