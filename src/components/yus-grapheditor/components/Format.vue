<template>
  <div class="graph-format">
    <header class="title">编辑器</header>
    <div class="format-wrapper">
      <div class="format-item">
        <div class="format-label">背景</div>
        <div class="format-content">
          <el-color-picker v-model="format.background"
                           @change="handleChangeStyle('background')"
                           show-alpha></el-color-picker>
        </div>
      </div>
      <!-- 字体 -->
      <div class="format-item">
        <div class="format-label">网格</div>
        <div class="format-content font">
          <el-input-number class="mini-input-number"
                           v-model="format.gridSize"
                           controls-position="right"
                           @change="handleChangeStyle('gridSize')"
                           :min="1"
                           :max="100"></el-input-number>
          <el-color-picker v-model="format.background"
                           @change="handleChangeStyle('background')"
                           show-alpha></el-color-picker>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { format } from './../core'
export default {
  name: 'Format',
  data () {
    return {
      cells: null,
      fontStyleCheckbox: [],
      format: {
        background: '',
        gridSize: ''
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
      this.$set(this.format, 'fontSize', ss.fontSize || 12)
      this.$set(this.format, 'value', cell.value || '')
    },
    // todo update style
    handleChangeStyle (keyword) {
      format.updateStyleHandler(keyword, this.format)
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
