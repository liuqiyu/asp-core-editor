/*
 * @Description: constant
 * @Author: liuqiyu
 * @Date: 2019-12-05 15:35:57
 * @LastEditors: liuqiyu
 * @LastEditTime: 2019-12-05 15:38:30
 */
import mxgraph from './mxgraph'
const { mxClient } = mxgraph

export const ctrlKey = (mxClient.IS_MAC) ? 'Cmd' : 'Ctrl'
