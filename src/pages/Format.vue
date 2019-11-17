<template>
  <div class="graph-format">
    <header class="title">设置</header>
    <div class="format-wrapper">
      <div class="format-item">
        <div class="format-label">名称</div>
        <div class="format-content">
          <el-input v-model="format.value"
                    placeholder="请输入名称"></el-input>
        </div>
      </div>

      <div class="format-item">
        <div class="format-label">背景颜色</div>
        <div class="format-content">
          <el-color-picker v-model="format.fillColor"
                           @change="change('fillColor')"
                           show-alpha></el-color-picker>
        </div>
      </div>
      <div class="format-item">
        <div class="format-label">边框颜色</div>
        <div class="format-content">
          <el-color-picker v-model="format.strokeColor"
                           @change="change('strokeColor')"
                           show-alpha></el-color-picker>
        </div>
      </div>
      <div class="format-item">
        <div class="format-label">大小</div>
        <div class="format-content">
          <el-input placeholder="宽"
                    @change="change('width')"
                    v-model="format.width">
          </el-input>
          <span class="character">
            *
          </span>
          <el-input placeholder="高"
                    @change="change('height')"
                    v-model="format.height">
          </el-input>
        </div>
      </div>
      <el-divider></el-divider>
      <!-- 字体 -->
      <div class="format-item">
        <div class="format-label">字体</div>
        <div class="format-content font">
          <el-input-number class="mini-input-number"
                           v-model="format.fontSize"
                           controls-position="right"
                           @change="change('fontSize')"
                           :min="1"
                           :max="100"></el-input-number>
          <el-checkbox-group style="margin-left: 5px;"
                             class="mini-checkbox-group"
                             v-model="fontStyleCheckbox"
                             @change="change('fontStyleCheckbox')">
            <el-checkbox-button label="bold"
                                key="bold">
              <span class="iconfont iconjiacu"></span></el-checkbox-button>
            <el-checkbox-button label="italic"
                                key="italic">
              <span class="iconfont iconxieti"></span></el-checkbox-button>
            <el-checkbox-button label="underline"
                                key="underline">
              <span class="iconfont iconUnderline"></span></el-checkbox-button>
          </el-checkbox-group>
        </div>
      </div>
      <div class="format-item">
        <div class="format-label">字体颜色</div>
        <div class="format-content">
          <el-color-picker v-model="format.fontColor"
                           @change="change('fontColor')"
                           show-alpha></el-color-picker>
        </div>
      </div>
      <div class="format-item">
        <div class="format-label">字体背景</div>
        <div class="format-content">
          <el-color-picker v-model="format.labelBackgroundColor"
                           @change="change('labelBackgroundColor')"
                           show-alpha></el-color-picker>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
// import editor from '@/utils/editor'
import format from '@/utils/format'
export default {
  name: 'Format',
  data () {
    return {
      fontStyleCheckbox: [],
      format: {
        value: '',
        fontColor: '',
        fontSize: '',
        labelBackgroundColor: '',
        fillColor: '',
        strokeColor: '',
        width: '',
        height: ''
      }
    }
  },
  mounted () {
  },
  methods: {
    selectionChanged (graph) {
      // var a = '12'
      var cell = graph.getSelectionCell()
      console.log(cell)
      if (cell) {
        var geometry = cell.geometry
        const ss = format.getSelectionState()
        this.$set(this.format, 'fontColor', ss.fontColor || '')
        this.$set(this.format, 'labelBackgroundColor', ss.labelBackgroundColor || '')
        this.$set(this.format, 'fillColor', ss.fillColor || '')
        this.$set(this.format, 'strokeColor', ss.strokeColor || '')
        this.$set(this.format, 'fontSize', ss.fontSize || 12)
        this.$set(this.format, 'value', cell.value || '')
        this.$set(this.format, 'width', geometry.width || '')
        this.$set(this.format, 'height', geometry.height || '')
      }
    },
    change (keyword) {
      if (keyword === 'fontStyleCheckbox') {
        format.update1(keyword, this.fontStyleCheckbox)
      } else {
        format.update(keyword, this.format)
      }
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
  width: 50px;
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
</style>
