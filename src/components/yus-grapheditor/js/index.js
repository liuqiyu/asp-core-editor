
import mxgraph from './mxgraph'
import { initEditor } from './editor'

const {
  mxUtils,
  mxClient
} = mxgraph

function Editor (container, editorType = true) {
  if (!mxClient.isBrowserSupported()) {
    // 判断是否支持mxgraph
    mxUtils.error('Browser is not supported!', 200, false)
  } else {
    console.log(Editor)
    this._init(container, editorType = true)
  }
  // const graph = editor.init(container, editorType = true)
  // this.
}

initEditor(Editor)

export default Editor
