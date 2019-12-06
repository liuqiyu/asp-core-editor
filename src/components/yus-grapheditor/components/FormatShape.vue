<template>
  <div class="graph-format">
    <header class="title">文本</header>
    <div class="format-wrapper">
      <!-- 名称 -->
      <div class="format-item">
        <div class="format-label">名称</div>
        <div class="format-content">
          <el-input v-model="format.value"
                    title="名称"
                    placeholder="请输入名称"
                    @change="handleChangeValue"></el-input>
        </div>
      </div>
      <!-- 背景颜色 -->
      <div class="format-item"
           v-if="['singleVertex', 'multipleVertex', 'multipleAll'].includes(selectedType)">
        <div class="format-label">背景颜色</div>
        <div class="format-content">
          <el-color-picker v-model="format.fillColor"
                           title="背景颜色"
                           @change="handleChangeStyle('fillColor')"
                           show-alpha></el-color-picker>
        </div>
      </div>
      <!-- 边框颜色 -->
      <div class="format-item"
           v-if="['singleVertex', 'multipleVertex', 'multipleAll'].includes(selectedType)">
        <div class="format-label">边框颜色</div>
        <div class="format-content">
          <el-color-picker v-model="format.strokeColor"
                           title="边框颜色"
                           @change="handleChangeStyle('strokeColor')"
                           show-alpha></el-color-picker>
        </div>
      </div>
      <!-- 元件大小 -->
      <div class="format-item"
           v-if="['singleVertex', 'multipleVertex', 'multipleAll'].includes(selectedType)">
        <div class="format-label">大小</div>
        <div class="format-content">
          <el-input-number style="width: 65px"
                           title="宽"
                           class="mini-input-number"
                           v-model="geometry.width"
                           placeholder="宽"
                           controls-position="right"
                           @change="handleChangeGeometry('width')"
                           :min="1"></el-input-number>
          <span class="character">
            *
          </span>
          <el-input-number style="width: 65px"
                           title="高"
                           class="mini-input-number"
                           v-model="geometry.height"
                           placeholder="高"
                           controls-position="right"
                           @change="handleChangeGeometry('height')"
                           :min="1"></el-input-number>
        </div>
      </div>
      <!-- 位置 -->
      <div class="format-item"
           v-if="['singleVertex', 'multipleVertex', 'multipleAll'].includes(selectedType)">
        <div class="format-label">位置</div>
        <div class="format-content">
          <el-input-number title="X轴"
                           style="width: 65px"
                           class="mini-input-number"
                           v-model="geometry.x"
                           placeholder="X"
                           controls-position="right"
                           @change="handleChangeGeometry('x')"
                           :min="1"></el-input-number>
          <span class="character">
            *
          </span>
          <el-input-number title="Y轴"
                           style="width: 65px"
                           class="mini-input-number"
                           v-model="geometry.y"
                           placeholder="Y"
                           controls-position="right"
                           @change="handleChangeGeometry('y')"
                           :min="1"></el-input-number>
        </div>
      </div>
      <el-divider content-position="left">字体</el-divider>
      <!-- 字体大小和样式 -->
      <div class="format-item">
        <div class="format-label">字体</div>
        <div class="format-content font">
          <!-- 字体大小 -->
          <el-input-number title="字体大小"
                           class="mini-input-number"
                           v-model="format.fontSize"
                           controls-position="right"
                           @change="handleChangeStyle('fontSize')"
                           :min="1"
                           :max="100"></el-input-number>
          <!-- font-style -->
          <el-checkbox-group style="margin-left: 5px;"
                             class="mini-checkbox-group"
                             v-model="format.fontStyle">
            <el-checkbox-button label="bold"
                                title="加粗"
                                key="bold"
                                @change="handleToggleFontStyle('bold')">
              <span class="iconfont iconjiacu"></span></el-checkbox-button>
            <el-checkbox-button label="italic"
                                title="斜体"
                                key="italic"
                                @change="handleToggleFontStyle('italic')">
              <span class="iconfont iconxieti"></span></el-checkbox-button>
            <el-checkbox-button label="underline"
                                title="下划线"
                                key="underline"
                                @change="handleToggleFontStyle('underline')">
              <span class="iconfont iconUnderline"></span></el-checkbox-button>
          </el-checkbox-group>
        </div>
      </div>
      <!-- 字体颜色 -->
      <div class="format-item">
        <div class="format-label">字体颜色</div>
        <div class="format-content">
          <el-color-picker title="字体颜色"
                           v-model="format.fontColor"
                           @change="handleChangeStyle('fontColor')"
                           show-alpha></el-color-picker>
        </div>
      </div>
      <!-- 字体背景 -->
      <div class="format-item">
        <div class="format-label">字体背景</div>
        <div class="format-content">
          <el-color-picker title="字体背景"
                           v-model="format.labelBackgroundColor"
                           @change="handleChangeStyle('labelBackgroundColor')"
                           show-alpha></el-color-picker>
        </div>
      </div>
      <!-- 翻转 -->
      <el-divider content-position="left"
                  v-if="['singleVertex', 'multipleVertex'].includes(selectedType)"></el-divider>
      <div class="format-item"
           v-if="['singleVertex', 'multipleVertex'].includes(selectedType)">
        <div class="format-label">翻转</div>
        <div class="format-content">
          <el-button-group class="mini-button-group">
            <el-button type="primary"
                       icon="iconfont iconshuipingduiqi"
                       title="水平"
                       @click="handleFlipCells('flipH')"></el-button>
            <el-button type="primary"
                       icon="iconfont iconchuizhiduiqi"
                       title="垂直"
                       @click="handleFlipCells('flipV')"></el-button>
          </el-button-group>
        </div>
      </div>
      <!-- 对齐 -->
      <el-divider content-position="left"
                  v-if="['multipleVertex', 'multipleAll'].includes(selectedType)"></el-divider>
      <!-- 对齐 -->
      <div class="format-item"
           v-if="['multipleVertex', 'multipleAll'].includes(selectedType)">
        <div class="format-label">对齐</div>
        <div class="format-content">
          <el-button-group class="mini-button-group">
            <el-button type="primary"
                       icon="iconfont iconjuzuo"
                       title="左"
                       @click="handleAlign('left')"></el-button>
            <el-button type="primary"
                       icon="iconfont iconjuzhong"
                       title="居中"
                       @click="handleAlign('center')"></el-button>
            <el-button type="primary"
                       icon="iconfont iconT-juyou"
                       title="右"
                       @click="handleAlign('right')"></el-button>
            <el-button type="primary"
                       icon="iconfont iconalign-top"
                       title="顶"
                       @click="handleAlign('top')"></el-button>
            <el-button type="primary"
                       icon="iconfont iconchuizhijuzhong"
                       title="垂直居中"
                       @click="handleAlign('middle')"></el-button>
            <el-button type="primary"
                       icon="iconfont iconalign-bottom"
                       title="底"
                       @click="handleAlign('bottom')"></el-button>
          </el-button-group>
        </div>
      </div>
      <!-- 等距分布 -->
      <div class="format-item"
           v-if="['multipleVertex', 'multipleAll'].includes(selectedType)">
        <div class="format-label">等距分布</div>
        <div class="format-content">
          <el-button-group class="mini-button-group">
            <el-button type="primary"
                       icon="iconfont iconshuipingduiqi"
                       title="水平"
                       @click="handleDistributeCells(true)"></el-button>
            <el-button type="primary"
                       icon="iconfont iconchuizhiduiqi"
                       title="垂直"
                       @click="handleDistributeCells(false)"></el-button>
          </el-button-group>
        </div>
      </div>
      <!-- -- -->
      <!-- 线条 -->
      <!-- -- -->
      <el-divider content-position="left"
                  v-if="['singleEdge', 'multipleEdge', 'multipleAll'].includes(selectedType)">线条</el-divider>
      <!-- 线条类型 -->
      <div class="format-item"
           v-if="['singleEdge', 'multipleEdge', 'multipleAll'].includes(selectedType)">
        <div class="format-label">线条类型</div>
        <div class="format-content">
          <el-select v-model="format.edgeType"
                     placeholder=""
                     @change="handleEdgeTypeChange">
            <el-option v-for="item in edgeType"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
          <el-color-picker style="margin-left: 12px"
                           v-model="format.strokeColor"
                           @change="handleChangeStyle('strokeColor')"
                           show-alpha></el-color-picker>
        </div>
      </div>
      <!-- 线条样式 -->
      <div class="format-item"
           v-if="['singleEdge', 'multipleEdge', 'multipleAll'].includes(selectedType)">
        <div class="format-label">线条样式</div>
        <div class="format-content">
          <el-select style="width: 75px;"
                     v-model="format.edgeStyle"
                     placeholder=""
                     @change="handleEdgeStyleChange">
            <el-option v-for="item in edgeStyle"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
          <el-input-number style="width: 65px; margin-left: 10px;"
                           class="mini-input-number"
                           v-model="format.strokeWidth"
                           placeholder="宽"
                           controls-position="right"
                           @change="handleChangeStyle('strokeWidth')"
                           :min="1"></el-input-number>
        </div>
      </div>
      <!-- 线条航点 -->
      <div class="format-item"
           v-if="['singleEdge', 'multipleEdge', 'multipleAll'].includes(selectedType)">
        <div class="format-label">线条航点</div>
        <div class="format-content font">
          <el-radio-group v-model="format.waypoints"
                          class="mini-radio-group"
                          @change="handleChangeStyle('waypoints')">
            <el-radio-button label="none"
                             key="none"
                             title="直线"
                             @click.native="handleChangeEdgeStyle([mxConstants.STYLE_EDGE, mxConstants.STYLE_CURVED, mxConstants.STYLE_NOEDGESTYLE], [null, null, null])">
              <span class="iconfont iconedgeStyle"></span></el-radio-button>
            <el-radio-button label="orthogonalEdgeStyle"
                             key="orthogonalEdgeStyle"
                             title="正交"
                             @click.native="handleChangeEdgeStyle([mxConstants.STYLE_EDGE, mxConstants.STYLE_CURVED, mxConstants.STYLE_NOEDGESTYLE], ['orthogonalEdgeStyle', null, null])">
              <span class="iconfont iconedgeStyle1"></span></el-radio-button>
            <el-radio-button label="elbowEdgeStyle"
                             key="elbowEdgeStyle"
                             title="简单"
                             @click.native="handleChangeEdgeStyle([mxConstants.STYLE_EDGE, mxConstants.STYLE_ELBOW, mxConstants.STYLE_CURVED, mxConstants.STYLE_NOEDGESTYLE], ['elbowEdgeStyle', null, null, null])">
              <span class="iconfont iconedgeStyle2"></span></el-radio-button>
            <el-radio-button label="elbowEdgeStyleVertical"
                             key="elbowEdgeStyleVertical"
                             title="等尺寸"
                             @click.native="handleChangeEdgeStyle([mxConstants.STYLE_EDGE, mxConstants.STYLE_ELBOW, mxConstants.STYLE_CURVED, mxConstants.STYLE_NOEDGESTYLE], ['elbowEdgeStyle', 'vertical', null, null])">
              <span class="iconfont iconedgeStyle4"></span></el-radio-button>
            <el-radio-button label="entityRelationEdgeStyle"
                             key="entityRelationEdgeStyle"
                             title="实体关系"
                             @click.native="handleChangeEdgeStyle([mxConstants.STYLE_EDGE, mxConstants.STYLE_CURVED, mxConstants.STYLE_NOEDGESTYLE], ['entityRelationEdgeStyle', null, null])">
              <span class="iconfont iconedgeStyle7"></span></el-radio-button>
          </el-radio-group>
        </div>
      </div>
      <!-- 线条箭头 -->
      <div class="format-item"
           v-if="['singleEdge', 'multipleEdge', 'multipleAll'].includes(selectedType)">
        <div class="format-label">线条箭头</div>
        <div class="format-content">
          <el-select style="width: 65px;"
                     title="线始端箭头"
                     v-model="format.startFill"
                     placeholder=""
                     @change="handleEdgeStartFillchange">
            <el-option v-for="item in startFillOptions"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
          <span class="character">
            *
          </span>
          <el-select style="width: 65px;"
                     title="线末端箭头"
                     v-model="format.endFill"
                     placeholder=""
                     @change="handleEdgeEndFillchange">
            <el-option v-for="item in endFillOptions"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <!-- -- -->
      <!-- 其他 -->
      <!-- -- -->
      <el-divider content-position="left">其他</el-divider>
      <!-- 层级 -->
      <div class="format-item">
        <div class="format-label">层级</div>
        <div class="format-content">
          <el-button style="padding: 7px 10px"
                     type="primary"
                     title="移至最前"
                     @click="handleToFront">移至最前</el-button>
          <el-button style="padding: 7px 10px"
                     type="primary"
                     title="移至最后"
                     @click="handleToBack">移至最后</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import editor from '@/utils/editor'
import mxgraph from './../core/mxgraph'
import format from './../core/format'
import { typeofElement } from './../core/utils'
const { mxConstants, mxUtils } = mxgraph
export default {
  name: 'Format',
  computed: {
    mxConstants () {
      return mxConstants
    }
  },
  data () {
    return {
      cells: null,
      selectedType: '', // 选中的元件类型
      format: {
        value: '', // value
        fontColor: '', // 背景颜色
        strokeColor: '', // 边框颜色
        fontSize: '', // 字体大小
        labelBackgroundColor: '',
        fillColor: '',

        fontStyle: [], // 粗细 斜体 下划线

        edgeType: '',
        edgeStyle: '',
        strokeWidth: '',
        waypoints: 'none', // 航点

        startFill: '', // 线始端 箭头
        endFill: '' // 线末端 箭头
      },
      geometry: {
        x: '', // 位置
        y: '', // 位置
        width: '',
        height: ''
      },
      // 线条类型
      edgeType: [
        {
          label: '尖角',
          value: 'sharp'
        },
        {
          label: '圆角',
          value: 'rounded'
        },
        {
          label: '曲线',
          value: 'curved'
        }
      ],
      // 线条样式
      edgeStyle: [
        {
          label: '实线',
          value: 'solid'
        },
        {
          label: '虚线',
          value: 'dashed'
        }
      ],
      // 开始箭头
      startFillOptions: [
        {
          label: '无',
          value: 'none'
        },
        {
          label: '箭头',
          value: 'default'
        }
      ],
      // 结尾箭头
      endFillOptions: [
        {
          label: '无',
          value: 'none'
        },
        {
          label: '箭头',
          value: 'default'
        }
      ]
    }
  },
  mounted () {
    this.cells = []
  },
  methods: {
    // 条线类型
    handleEdgeTypeChange (e) {
      switch (e) {
        case 'sharp':
          format.edgeStyleChange([mxConstants.STYLE_ROUNDED, mxConstants.STYLE_CURVED], ['0', null])
          break
        case 'rounded':
          format.edgeStyleChange([mxConstants.STYLE_ROUNDED, mxConstants.STYLE_CURVED], ['1', null])
          break
        case 'curved':
          format.edgeStyleChange([mxConstants.STYLE_ROUNDED, mxConstants.STYLE_CURVED], [null, '1'])
          break
      }
    },
    // 线条样式
    handleEdgeStyleChange (e) {
      switch (e) {
        case 'solid':
          format.edgeStyleChange([mxConstants.STYLE_DASHED, mxConstants.STYLE_DASH_PATTERN], [null, null])
          break
        case 'dashed':
          format.edgeStyleChange([mxConstants.STYLE_DASHED, mxConstants.STYLE_DASH_PATTERN], ['1', null])
          break
      }
    },
    // 选中
    selectionChanged (graph) {
      var cells = graph.getSelectionCells()
      this.selectedType = typeofElement(cells)
      this.cells = cells
      if (cells && cells.length === 1) {
        const geometry = cells[0].geometry
        const ss = format.getSelectionState()
        this.selectionChangedFormat(cells[0], geometry, ss)
        this.selectionChangedGeometry(cells[0], geometry, ss)
      }
    },
    // 初始化样式
    selectionChangedFormat (cell, geometry, ss) {
      this.$set(this.format, 'fontColor', ss.fontColor || '')
      this.$set(this.format, 'labelBackgroundColor', ss.labelBackgroundColor || '')
      this.$set(this.format, 'fillColor', ss.fillColor || '')
      this.$set(this.format, 'strokeColor', ss.strokeColor || '')
      this.$set(this.format, 'strokeWidth', ss.strokeWidth || '')
      this.$set(this.format, 'fontSize', ss.fontSize || 12)
      this.$set(this.format, 'value', cell.value || '')

      // 线条类型 曲线 圆角 尖角
      const curved = mxUtils.getValue(ss, mxConstants.STYLE_CURVED, null)
      const rounded = mxUtils.getValue(ss, mxConstants.STYLE_ROUNDED, null)
      if (!curved && rounded === 1) {
        this.format.edgeType = 'rounded'
      } else if (curved === 1 && rounded === 1) {
        this.format.edgeType = 'curved'
      } else {
        this.format.edgeType = 'sharp'
      }

      // 线条航点
      var es = mxUtils.getValue(ss, mxConstants.STYLE_EDGE, null)
      if (mxUtils.getValue(ss, mxConstants.STYLE_NOEDGESTYLE, null) === '1') {
        es = null
      }
      if (es === 'orthogonalEdgeStyle') {
        this.format.waypoints = 'orthogonalEdgeStyle' // 正交
      } else if (es === 'straight' || es === 'none' || es == null) {
        this.format.waypoints = 'none' // 直线
      } else if (es === 'entityRelationEdgeStyle') {
        this.format.waypoints = 'entityRelationEdgeStyle' // 实体关系
      } else if (es === 'elbowEdgeStyle') {
        if (mxUtils.getValue(ss, mxConstants.STYLE_ELBOW, null) === 'vertical') {
          this.format.waypoints = 'elbowEdgeStyleVertical' // 等尺寸
        } else {
          this.format.waypoints = 'elbowEdgeStyle' // 简单
        }
      } else if (es === 'isometricEdgeStyle') {
        this.format.waypoints = 'isometricEdgeStyle'
      } else {
        this.format.waypoints = 'none'
      }

      // edgeStyle 线条样式 实线 虚线
      const dashed = mxUtils.getValue(ss, mxConstants.STYLE_DASHED, null)
      this.format.edgeStyle = (dashed === 1 ? 'dashed' : 'solid')

      // fontStyle 初始化字体样式 粗细 斜体 下划线
      var fontStyle = mxUtils.getValue(ss, mxConstants.STYLE_FONTSTYLE, 0)
      if ((fontStyle & mxConstants.FONT_BOLD) === mxConstants.FONT_BOLD) {
        this.format.fontStyle.push('bold')
      }
      if ((fontStyle & mxConstants.FONT_ITALIC) === mxConstants.FONT_ITALIC) {
        this.format.fontStyle.push('italic')
      }
      if ((fontStyle & mxConstants.FONT_UNDERLINE) === mxConstants.FONT_UNDERLINE) {
        this.format.fontStyle.push('underline')
      }
    },
    // todo update style
    handleChangeStyle (keyword) {
      format.updateStyleHandler(keyword, this.format[keyword])
    },
    // todo update edge style
    handleChangeEdgeStyle (keys, values) {
      // console.log(keys, values)
      format.edgeStyleChange(keys, values)
    },
    // 线始端
    handleEdgeStartFillchange (e) {
      console.log(e)
      switch (e) {
        case 'none':
          format.edgeStyleChange([mxConstants.STYLE_STARTARROW, 'startFill'], [mxConstants.NONE, 0])
          break
        case 'default':
          format.edgeStyleChange([mxConstants.STYLE_STARTARROW, 'startFill'], [mxConstants.ARROW_CLASSIC, 1])
          break
      }
    },
    // 线始端
    handleEdgeEndFillchange (e) {
      console.log(e)
      switch (e) {
        case 'none':
          format.edgeStyleChange([mxConstants.STYLE_ENDARROW, 'endFill'], [mxConstants.NONE, 0])
          break
        case 'default':
          format.edgeStyleChange([mxConstants.STYLE_ENDARROW, 'endFill'], [mxConstants.ARROW_CLASSIC, 1])
          break
      }
    },
    // fontStyle
    handleToggleFontStyle (style) {
      format.toggleFontStyle(style)
    },
    // update value
    handleChangeValue (e) {
      console.log(e)
      format.updateValueHandler(e)
    },
    // geometry
    selectionChangedGeometry (cell, geometry, ss) {
      this.$set(this.geometry, 'width', geometry.width || '')
      this.$set(this.geometry, 'height', geometry.height || '')
      this.$set(this.geometry, 'x', geometry.x || '')
      this.$set(this.geometry, 'y', geometry.y || '')
    },
    // update geometry complete
    handleChangeGeometry (keyword) {
      format.updateGeometryHandler(this.geometry[keyword], (geo) => {
        geo[keyword] = this.geometry[keyword]
      })
    },
    // 翻转
    handleFlipCells (style) {
      format.FlipCells(style)
    },
    // 对齐
    handleAlign (align) {
      format.align(align)
    },
    // 等距分布
    handleDistributeCells (boolean) {
      format.distributeCells(boolean)
    },
    // 移至最前
    handleToFront () {
      format.toFront()
    },
    // 移至最前
    handleToBack () {
      format.toBack()
    }
  }
}
</script>

<style lang="scss" scoped>
.graph-format {
  flex: none;
  height: 100%;
  background: #fff;
  border-left: 1px solid #e1e1e1;
  border-bottom: 1px solid #ebeef5;
  width: 241px;
  .title {
    height: 40px;
    background: #f6f6f6;
    line-height: 40px;
    text-indent: 12px;
    font-size: 14px;
  }
  .format-wrapper {
    padding-top: 10px;
    .format-item {
      display: flex;
      height: 30px;
      align-items: center;
      padding-left: 10px;
      padding-right: 10px;
      .format-label {
        width: 55px;
        flex: none;
        color: #666666;
      }
      .format-content {
        flex: 1;
        padding-left: 12px;
        display: flex;
        align-items: center;
        .character {
          font-size: 14px;
          font-weight: bold;
          padding: 0 5px;
        }
      }
    }
  }
}
::v-deep.mini-input-number {
  width: 60px;
  .el-input-number__decrease,
  .el-input-number__increase {
    width: 20px;
  }
  .el-input__inner {
    padding-left: 0px !important;
    padding-right: 20px !important;
  }
}
::v-deep.mini-checkbox-group {
  .el-checkbox-button__inner {
    padding: 5px 6px;
  }
}

::v-deep.mini-radio-group {
  .el-radio-button__inner {
    padding: 5px 6px;
  }
}
::v-deep.mini-button-group {
  .el-button {
    padding: 7px 6px;
    .iconfont {
      font-size: 12px;
    }
  }
}
::v-deep .el-divider {
  margin: 16px 0;
  background-color: #666;
}
</style>
