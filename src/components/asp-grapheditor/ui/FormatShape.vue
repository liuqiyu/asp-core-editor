<template>
  <div class="graph-format">
    <header class="title">文本</header>
    <div class="format-wrapper">
      <div class="format-item">
        <div class="format-label">名称</div>
        <div class="format-content">
          <el-input v-model="format.value"
                    placeholder="请输入名称"
                    @change="handleChangeValue"></el-input>
        </div>
      </div>
      <div class="format-item">
        <div class="format-label">背景颜色</div>
        <div class="format-content">
          <el-color-picker v-model="format.fillColor"
                           @change="handleChangeStyle('fillColor')"
                           show-alpha></el-color-picker>
        </div>
      </div>
      <div class="format-item">
        <div class="format-label">边框颜色</div>
        <div class="format-content">
          <el-color-picker v-model="format.strokeColor"
                           @change="handleChangeStyle('strokeColor')"
                           show-alpha></el-color-picker>
        </div>
      </div>
      <div class="format-item">
        <div class="format-label">大小</div>
        <div class="format-content">
          <el-input-number style="width: 65px"
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
                           class="mini-input-number"
                           v-model="geometry.height"
                           placeholder="高"
                           controls-position="right"
                           @change="handleChangeGeometry('height')"
                           :min="1"></el-input-number>
        </div>
      </div>
      <div class="format-item">
        <div class="format-label">位置</div>
        <div class="format-content">
          <el-input-number style="width: 65px"
                           class="mini-input-number"
                           v-model="geometry.x"
                           placeholder="X"
                           controls-position="right"
                           @change="handleChangeGeometry('x')"
                           :min="1"></el-input-number>
          <span class="character">
            *
          </span>
          <el-input-number style="width: 65px"
                           class="mini-input-number"
                           v-model="geometry.y"
                           placeholder="Y"
                           controls-position="right"
                           @change="handleChangeGeometry('y')"
                           :min="1"></el-input-number>
        </div>
      </div>
      <el-divider content-position="left"></el-divider>
      <!-- 字体 -->
      <div class="format-item">
        <div class="format-label">字体</div>
        <div class="format-content font">
          <el-input-number class="mini-input-number"
                           v-model="format.fontSize"
                           controls-position="right"
                           @change="handleChangeStyle('fontSize')"
                           :min="1"
                           :max="100"></el-input-number>
          <el-checkbox-group style="margin-left: 5px;"
                             class="mini-checkbox-group"
                             v-model="fontStyleCheckbox"
                             @change="handleChangeStyle('fontStyleCheckbox')">
            <el-checkbox-button label="bold"
                                key="bold"
                                @click.native.prevent="handleToggleFontStyle('bold')">
              <span class="iconfont iconjiacu"></span></el-checkbox-button>
            <el-checkbox-button label="italic"
                                key="italic"
                                @click.native.prevent="handleToggleFontStyle('italic')">
              <span class="iconfont iconxieti"></span></el-checkbox-button>
            <el-checkbox-button label="underline"
                                key="underline"
                                @click.native.prevent="handleToggleFontStyle('underline')">
              <span class="iconfont iconUnderline"></span></el-checkbox-button>
          </el-checkbox-group>
        </div>
      </div>
      <div class="format-item">
        <div class="format-label">字体颜色</div>
        <div class="format-content">
          <el-color-picker v-model="format.fontColor"
                           @change="handleChangeStyle('fontColor')"
                           show-alpha></el-color-picker>
        </div>
      </div>
      <div class="format-item">
        <div class="format-label">字体背景</div>
        <div class="format-content">
          <el-color-picker v-model="format.labelBackgroundColor"
                           @change="handleChangeStyle('labelBackgroundColor')"
                           show-alpha></el-color-picker>
        </div>
      </div>
      <!-- 翻转 -->
      <el-divider content-position="left"></el-divider>
      <div class="format-item">
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
      <el-divider content-position="left"></el-divider>
      <div class="format-item">
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
      <div class="format-item">
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
      <!-- 线条 -->
      <el-divider content-position="left">线条</el-divider>
      <div class="format-item">
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
      <div class="format-item">
        <div class="format-label">线条样式</div>
        <div class="format-content">
          <el-select style="width: 85px;"
                     v-model="format.edgeStyle"
                     placeholder=""
                     @change="handleEdgeStyleChange">
            <el-option v-for="item in edgeStyle"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
          <el-input-number style="width: 65px; margin-left: 12px;"
                           class="mini-input-number"
                           v-model="format.strokeWidth"
                           placeholder="宽"
                           controls-position="right"
                           @change="handleChangeStyle('strokeWidth')"
                           :min="1"></el-input-number>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import editor from '@/utils/editor'
import format from './../js/format'
export default {
  name: 'Format',
  data () {
    return {
      cells: null,
      fontStyleCheckbox: [],
      format: {
        value: '',
        fontColor: '',
        fontSize: '',
        labelBackgroundColor: '',
        fillColor: '',
        strokeColor: '',

        edgeType: '',
        edgeStyle: '',
        strokeWidth: ''
      },
      edge: {
        strokeColor: ''
      },
      geometry: {
        x: '',
        y: '',
        width: '',
        height: ''
      },
      edgeType: [
        {
          label: '尖线',
          value: 'sharp'
        },
        {
          label: '圆线',
          value: 'rounded'
        },
        {
          label: '曲线',
          value: 'curved'
        }
      ],
      edgeStyle: [
        {
          label: '实线',
          value: 'solid'
        },
        {
          label: '虚线',
          value: 'dashed'
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
      format.updateEdgeTypeHandler(e)
    },
    // 线条样式
    handleEdgeStyleChange (e) {
      console.log(e)
      format.updateEdgeStyleHandler(e)
    },
    // 选中
    selectionChanged (graph) {
      var cells = graph.getSelectionCells()
      console.log(cells)
      this.cells = cells
      if (cells) {
        const geometry = cells[0].geometry
        const ss = format.getSelectionState()
        this.selectionChangedFormat(cells[0], geometry, ss)
        this.selectionChangedGeometry(cells[0], geometry, ss)
      }
    },
    // style,value
    selectionChangedFormat (cell, geometry, ss) {
      this.$set(this.format, 'fontColor', ss.fontColor || '')
      this.$set(this.format, 'labelBackgroundColor', ss.labelBackgroundColor || '')
      this.$set(this.format, 'fillColor', ss.fillColor || '')
      this.$set(this.format, 'strokeColor', ss.strokeColor || '')
      this.$set(this.format, 'strokeWidth', ss.strokeWidth || '')
      this.$set(this.format, 'fontSize', ss.fontSize || 12)
      this.$set(this.format, 'value', cell.value || '')
    },
    // todo update style
    handleChangeStyle (keyword) {
      format.updateStyleHandler(keyword, this.format[keyword])
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

::v-deep.mini-button-group {
  .el-button {
    padding: 7px 6px;
    .iconfont {
      font-size: 12px;
    }
  }
}
::v-deep .el-divider {
  margin: 12px 0;
}
</style>
