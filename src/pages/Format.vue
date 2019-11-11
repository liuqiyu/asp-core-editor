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
      <div class="format-item">
        <div class="format-label">背景颜色</div>
        <div class="format-content">
          <el-color-picker v-model="format.imageBackground"
                           @change="change('imageBackground')"
                           show-alpha></el-color-picker>
        </div>
      </div>
      <div class="format-item">
        <div class="format-label">边框颜色</div>
        <div class="format-content">
          <el-color-picker v-model="format.borderColor"
                           @change="change('borderColor')"
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
      format: {
        value: '',
        fontColor: '',
        labelBackgroundColor: '',
        imageBackground: '',
        borderColor: '',
        width: '',
        height: ''
      }
    }
  },
  mounted () {
  },
  methods: {
    selectionChanged (graph) {
      var cell = graph.getSelectionCell()
      if (cell) {
        console.log(cell)
        // Format.initFormatField(cell)
        this.format.value = cell.value
      }
    },
    change (keyword) {
      format.update(keyword, this.format)
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
  width: 231px;
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
