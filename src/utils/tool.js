// import mxgraph from './mxgraph'
// import init from './init'
// const {
//   mxEvent,
//   mxUndoManager
// } = mxgraph
// const {
//   graph
// } = init

// let MxUndoManager = mxUndoManager

// class Tool {
//   static undoManager = new MxUndoManager()

//   constructor () {
//     graph.getModel().addListener(mxEvent.UNDO, this._listener)
//     graph.getView().addListener(mxEvent.UNDO, this._listener)
//   }

//   static _listener (sender, evt) {
//     this.undoManager.undoableEditHappened(evt.getProperty('edit'))
//   }

//   static zoomIn () {
//     console.log(123)
//     // console.log(graph.view.scale, 1)
//     graph.zoomIn()
//   }

//   static zoomOut () {
//     // console.log(graph.view.scale)
//     graph.zoomOut()
//   }

//   static handleUndo () {
//     this.undoManager.undo()
//   }

//   static handleRedo () {
//     this.undoManager.redo()
//   }
// }

// export default Tool
