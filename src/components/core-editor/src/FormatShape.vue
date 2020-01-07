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
                    size="mini"
                    placeholder="请输入名称"
                    @input="handleChangeValue"></el-input>
        </div>
      </div>

      <!-- 元件 -->
      <div class="vertex-list">
        <!-- 背景颜色 -->
        <div class="format-item"
             v-if="['singleVertex', 'multipleVertex',].includes(selectedType)">
          <div class="format-label">背景颜色</div>
          <div class="format-content">
            <el-color-picker v-model="format.fillColor"
                             title="背景颜色"
                             size="mini"
                             @change="handleChangeStyle('fillColor')"
                             show-alpha></el-color-picker>
          </div>
        </div>
        <!-- 边框颜色 -->
        <div class="format-item"
             v-if="['singleVertex', 'multipleVertex'].includes(selectedType)">
          <div class="format-label">边框颜色</div>
          <div class="format-content">
            <el-color-picker v-model="format.strokeColor"
                             title="边框颜色"
                             size="mini"
                             @change="handleChangeStyle('strokeColor')"
                             show-alpha></el-color-picker>
          </div>
        </div>
        <!-- 元件大小 -->
        <div class="format-item"
             v-if="['singleVertex', 'multipleVertex'].includes(selectedType)">
          <div class="format-label">大小</div>
          <div class="format-content">
            <el-input-number style="width: 65px"
                             title="宽"
                             class="mini-input-number"
                             v-model="geometry.width"
                             placeholder="宽"
                             size="mini"
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
                             size="mini"
                             controls-position="right"
                             @change="handleChangeGeometry('height')"
                             :min="1"></el-input-number>
          </div>
        </div>
        <!-- 位置 -->
        <div class="format-item"
             v-if="['singleVertex', 'multipleVertex'].includes(selectedType)">
          <div class="format-label">位置</div>
          <div class="format-content">
            <el-input-number title="X轴"
                             style="width: 65px"
                             class="mini-input-number"
                             v-model="geometry.x"
                             placeholder="X"
                             size="mini"
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
                             size="mini"
                             controls-position="right"
                             @change="handleChangeGeometry('y')"
                             :min="1"></el-input-number>
          </div>
        </div>
      </div>

      <!-- 字体 -->
      <div class="font">
        <el-divider content-position="left">字体</el-divider>
        <!-- 字体font-family -->
        <!-- <div class="format-item">
          <div class="format-label">字体</div>
          <div class="format-content">
            <el-select v-model="format.labelPosition"
                      size="mini"
                      @change="handleFontDefaults">
              <el-option v-for="item in FONT_DEFAULTS"
                        :key="item"
                        :label="item"
                        :value="item">
              </el-option>
            </el-select>
          </div>
        </div> -->
        <!-- 字体大小和样式 -->
        <div class="format-item">
          <div class="format-label">字体样式</div>
          <div class="format-content font">
            <!-- 字体大小 -->
            <el-input-number title="字体大小"
                             class="mini-input-number"
                             v-model="format.fontSize"
                             controls-position="right"
                             size="mini"
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
                                  size="mini"
                                  @change="handleToggleFontStyle('bold')">
                <span class="iconfont iconjiacu"></span></el-checkbox-button>
              <el-checkbox-button label="italic"
                                  title="斜体"
                                  key="italic"
                                  size="mini"
                                  @change="handleToggleFontStyle('italic')">
                <span class="iconfont iconxieti"></span></el-checkbox-button>
              <el-checkbox-button label="underline"
                                  title="下划线"
                                  key="underline"
                                  size="mini"
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
                             size="mini"
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
                             size="mini"
                             v-model="format.labelBackgroundColor"
                             @change="handleChangeStyle('labelBackgroundColor')"
                             show-alpha></el-color-picker>
          </div>
        </div>
        <!-- 字体位置 -->
        <div class="format-item">
          <div class="format-label">字体位置</div>
          <div class="format-content">
            <el-select v-model="format.labelPosition"
                       size="mini"
                       @change="handleChangeLabelPosition">
              <el-option v-for="item in LABEL_POSITIONS"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
      </div>

      <!-- 形态 -->
      <div class="shape">
        <!-- 翻转 -->
        <el-divider content-position="left"
                    v-if="['singleVertex', 'multipleVertex'].includes(selectedType)"></el-divider>
        <div class="format-item"
             v-if="['singleVertex', 'multipleVertex'].includes(selectedType)">
          <div class="format-label">翻转</div>
          <div class="format-content">
            <el-button-group class="mini-button-group">
              <el-button type="primary"
                         size="mini"
                         icon="iconfont iconshuipingduiqi"
                         title="水平"
                         @click="handleFlipCells('flipH')"></el-button>
              <el-button type="primary"
                         size="mini"
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
                         size="mini"
                         icon="iconfont iconjuzuo"
                         title="左"
                         @click="handleAlign('left')"></el-button>
              <el-button type="primary"
                         size="mini"
                         icon="iconfont iconjuzhong"
                         title="居中"
                         @click="handleAlign('center')"></el-button>
              <el-button type="primary"
                         icon="iconfont iconT-juyou"
                         title="右"
                         size="mini"
                         @click="handleAlign('right')"></el-button>
              <el-button type="primary"
                         icon="iconfont iconalign-top"
                         title="顶"
                         size="mini"
                         @click="handleAlign('top')"></el-button>
              <el-button type="primary"
                         icon="iconfont iconchuizhijuzhong"
                         title="垂直居中"
                         size="mini"
                         @click="handleAlign('middle')"></el-button>
              <el-button type="primary"
                         icon="iconfont iconalign-bottom"
                         title="底"
                         size="mini"
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
                         size="mini"
                         icon="iconfont iconshuipingduiqi"
                         title="水平"
                         @click="handleDistributeCells('horizontal')"></el-button>
              <el-button type="primary"
                         size="mini"
                         icon="iconfont iconchuizhiduiqi"
                         title="垂直"
                         @click="handleDistributeCells('vertical')"></el-button>
            </el-button-group>
          </div>
        </div>
      </div>

      <!-- 线条 -->
      <div class="edge-list">
        <el-divider content-position="left"
                    v-if="['singleEdge', 'multipleEdge'].includes(selectedType)">线条</el-divider>
        <!-- 线条类型 -->
        <div class="format-item"
             v-if="['singleEdge', 'multipleEdge'].includes(selectedType)">
          <div class="format-label">线条类型</div>
          <div class="format-content">
            <el-select v-model="format.edgeType"
                       placeholder=""
                       size="mini"
                       @change="handleEdgeTypeChange">
              <el-option v-for="item in EDGE_TYPE"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
            <el-color-picker style="margin-left: 12px"
                             size="mini"
                             v-model="format.strokeColor"
                             @change="handleChangeStyle('strokeColor')"
                             show-alpha></el-color-picker>
          </div>
        </div>
        <!-- 线条样式 -->
        <div class="format-item"
             v-if="['singleEdge', 'multipleEdge'].includes(selectedType)">
          <div class="format-label">线条样式</div>
          <div class="format-content">
            <el-select style="width: 75px;"
                       v-model="format.edgeStyle"
                       size="mini"
                       placeholder=""
                       @change="handleEdgeStyleChange">
              <el-option v-for="item in EDGE_STYLE"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
            <el-input-number style="width: 65px; margin-left: 10px;"
                             class="mini-input-number"
                             v-model="format.strokeWidth"
                             size="mini"
                             placeholder="宽"
                             controls-position="right"
                             @change="handleChangeStyle('strokeWidth')"
                             :min="1"></el-input-number>
          </div>
        </div>
        <!-- 线条航点 -->
        <div class="format-item"
             v-if="['singleEdge', 'multipleEdge'].includes(selectedType)">
          <div class="format-label">线条航点</div>
          <div class="format-content font">
            <el-radio-group v-model="format.waypoints"
                            class="mini-radio-group"
                            size="mini"
                            @change="handleChangeStyle('waypoints')">
              <el-radio-button label="none"
                               key="none"
                               title="直线"
                               @click.native="handleChangeEdgeStyle('none')">
                <span class="iconfont iconedgeStyle"></span></el-radio-button>
              <el-radio-button label="orthogonalEdgeStyle"
                               key="orthogonalEdgeStyle"
                               size="mini"
                               title="正交"
                               @click.native="handleChangeEdgeStyle('orthogonalEdgeStyle')">
                <span class="iconfont iconedgeStyle1"></span></el-radio-button>
              <el-radio-button label="elbowEdgeStyle"
                               key="elbowEdgeStyle"
                               size="mini"
                               title="简单"
                               @click.native="handleChangeEdgeStyle('elbowEdgeStyle')">
                <span class="iconfont iconedgeStyle2"></span></el-radio-button>
              <el-radio-button label="elbowEdgeStyleVertical"
                               key="elbowEdgeStyleVertical"
                               size="mini"
                               title="等尺寸"
                               @click.native="handleChangeEdgeStyle('elbowEdgeStyleVertical')">
                <span class="iconfont iconedgeStyle4"></span></el-radio-button>
              <el-radio-button label="entityRelationEdgeStyle"
                               key="entityRelationEdgeStyle"
                               size="mini"
                               title="实体关系"
                               @click.native="handleChangeEdgeStyle('entityRelationEdgeStyle')">
                <span class="iconfont iconedgeStyle7"></span></el-radio-button>
            </el-radio-group>
          </div>
        </div>
        <!-- 线条箭头 -->
        <div class="format-item"
             v-if="['singleEdge', 'multipleEdge'].includes(selectedType)">
          <div class="format-label">线条箭头</div>
          <div class="format-content">
            <el-select style="width: 65px;"
                       title="线始端箭头"
                       size="mini"
                       v-model="format.startFill"
                       placeholder=""
                       @change="handleEdgeStartFillchange">
              <el-option v-for="item in START_FILL_OPTIONS"
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
                       size="mini"
                       @change="handleEdgeEndFillchange">
              <el-option v-for="item in END_FILL_OPTIONS"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
      </div>

      <!-- 其他 -->
      <el-divider content-position="left">其他</el-divider>
      <!-- 层级 -->
      <div class="format-item">
        <div class="format-label">层级</div>
        <div class="format-content">
          <el-button style="padding: 7px 10px"
                     type="primary"
                     size="mini"
                     title="移至最前"
                     @click="handleToFront">移至最前</el-button>
          <el-button style="padding: 7px 10px"
                     type="primary"
                     size="mini"
                     title="移至最后"
                     @click="handleToBack">移至最后</el-button>
        </div>
      </div>

      <div class="format-item"
           v-if="shape === 'image'">
        <div class="format-label">图片</div>
        <div class="format-content">
          <InputUpload v-model="format.image"
                       :accept="['image']"
                       @onSuccess="onSuccess"
                       @clear="clear"></InputUpload>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Format } from './core'
import { typeofElement } from './core/utils'
import InputUpload from './components/upload'
import { LABEL_POSITIONS, END_FILL_OPTIONS, START_FILL_OPTIONS, EDGE_STYLE, EDGE_TYPE, FONT_DEFAULTS } from './utils/FORMAT_CONSTANT'
export default {
  name: 'Format',
  computed: {
    LABEL_POSITIONS () {
      return LABEL_POSITIONS
    },
    END_FILL_OPTIONS () {
      return END_FILL_OPTIONS
    },
    START_FILL_OPTIONS () {
      return START_FILL_OPTIONS
    },
    EDGE_STYLE () {
      return EDGE_STYLE
    },
    EDGE_TYPE () {
      return EDGE_TYPE
    },
    FONT_DEFAULTS () {
      return FONT_DEFAULTS
    }
  },
  components: {
    InputUpload
  },
  data () {
    return {
      cells: null,
      selectedType: '', // 选中的元件类型
      shape: '', // 动态图片
      format: {
        value: '', // value
        fontColor: '', // 背景颜色
        strokeColor: '', // 边框颜色
        fontSize: '', // 字体大小
        labelBackgroundColor: '',
        fillColor: '',

        fontStyle: [], // 粗细 斜体 下划线
        labelPosition: '', // 文字位置

        edgeType: '',
        edgeStyle: '',
        strokeWidth: '',
        waypoints: 'none', // 航点

        image: '',

        startFill: '', // 线始端 箭头
        endFill: '' // 线末端 箭头
      },
      geometry: {
        x: '', // 位置
        y: '', // 位置
        width: '',
        height: ''
      }
    }
  },
  mounted () {
    this.cells = []
  },
  methods: {
    // 选中
    selectionChanged (graph) {
      var cells = graph.getSelectionCells()
      this.selectedType = typeofElement(cells)
      this.cells = cells
      if (cells && cells.length === 1) {
        const geometry = cells[0].geometry
        const ss = Format.getSelectionState()
        console.log(ss)
        this.selectionChangedFormat(cells[0], geometry, ss)
        this.selectionChangedGeometry(cells[0], geometry, ss)
        switch (ss.shape) {
          case 'image':
            this.shape = 'image'
            break
          default:
            this.shape = ''
            break
        }
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
      // 线条类型
      this.format.edgeType = Format.getEdgeType(ss)
      // 线条航点
      this.format.waypoints = Format.getWaypoints(ss)
      // 开始结束 箭头
      this.format.startFill = Format.getEdgeFill('startFill', ss) ? 'default' : 'none'
      this.format.endFill = Format.getEdgeFill('endFill', ss) ? 'default' : 'none'
      // 线条样式 实线 虚线
      this.format.fontStyle = Format.getFontStyle(ss)
      // 文字位置
      this.format.labelPosition = Format.getLabelPosition(ss)
    },
    // 初始化几何
    selectionChangedGeometry (cell, geometry, ss) {
      this.$set(this.geometry, 'width', geometry.width || '')
      this.$set(this.geometry, 'height', geometry.height || '')
      this.$set(this.geometry, 'x', geometry.x || '')
      this.$set(this.geometry, 'y', geometry.y || '')
    },
    // 更新元件样式
    handleChangeStyle (keyword) {
      Format.updateStyleHandler(keyword, this.format[keyword])
    },
    // 修改线条样式
    handleChangeEdgeStyle (keys, values) {
      Format.edgeWaypointsChange(keys)
    },
    // 线始端
    handleEdgeStartFillchange (e) {
      Format.edgeFillChange('startFill', e)
    },
    // 线始端
    handleEdgeEndFillchange (e) {
      Format.edgeFillChange('endFill', e)
    },
    // 条线类型 尖角 圆角 曲线
    handleEdgeTypeChange (e) {
      Format.edgeTypeChange(e)
    },
    // 线条样式
    handleEdgeStyleChange (e) {
      Format.edgeBorderStyleChange(e)
    },
    //  更新字体样式 bold italic underline
    handleToggleFontStyle (style) {
      Format.toggleFontStyle(style)
    },
    // 更新值
    handleChangeValue (e) {
      Format.updateValueHandler(e)
    },
    // 更新 元件几何  宽高 X Y
    handleChangeGeometry (keyword) {
      Format.updateGeometryHandler(this.geometry[keyword], (geo) => {
        geo[keyword] = this.geometry[keyword]
      })
    },
    // actions 翻转
    handleFlipCells (style) {
      Format.actions('flipCells', style)
    },
    // actions 对齐
    handleAlign (align) {
      Format.actions('alignCells', align)
    },
    // actions 等距分布
    handleDistributeCells (e) {
      Format.actions(e)
    },
    // actions 移至最前
    handleToFront () {
      Format.actions('toFront')
    },
    // actions 移至最前
    handleToBack () {
      Format.actions('toBack')
    },
    // 字体位置
    handleChangeLabelPosition (value) {
      Format.changeLabelPosition(value)
    },
    // 字体 family
    handleFontDefaults (e) {
      console.log(e)
      Format.changeLabelPosition(e)
    },
    // 上传图片
    onSuccess ({ filename, file }) {
      const ss = Format.getSelectionState()
      Format.updateStyleHandler('oldImage', ss.image)
      Format.updateStyleHandler('image', file.split(';')[0] + '' + file.split(';')[1])
      Format.updateStyleHandler('imageName', filename)
    },
    // 清除图片
    clear () {
      const ss = Format.getSelectionState()
      Format.updateStyleHandler('image', ss.oldImage)
      Format.updateStyleHandler('oldImage', '')
      Format.updateStyleHandler('imageName', '')
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
</style>

<style lang="scss">
.graph-format {
  .title {
    color: #333333;
  }
  .mini-input-number {
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

  .mini-checkbox-group {
    .el-checkbox-button__inner {
      padding: 5px 6px;
    }
  }

  .mini-radio-group {
    .el-radio-button__inner {
      padding: 5px 6px;
    }
  }
  .mini-button-group {
    .el-button {
      padding: 7px 6px;
      .iconfont {
        font-size: 12px;
      }
    }
  }
  .el-divider {
    margin: 16px 0;
    background-color: #666;
  }
}
</style>
