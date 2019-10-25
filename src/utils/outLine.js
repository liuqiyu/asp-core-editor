import mxgraph from '@/utils/mxgraph'

const {
  mxOutline
} = mxgraph

let MxOutline = mxOutline

class OutLine {
  static init (graph, container) {
    /* eslint-disable no-new */
    new MxOutline(graph, container)
  }
}

export default OutLine
