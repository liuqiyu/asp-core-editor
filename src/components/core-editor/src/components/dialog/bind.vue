<!--
 * @Description:
 * @Author: liuqiyu
 * @Date: 2019-12-19 16:11:18
 * @LastEditors  : liuqiyu
 * @LastEditTime : 2020-01-13 15:47:06
 -->
<template>
  <div>
    <div class="asp-dialog-body">
      <el-form :model="ruleForm"
               :rules="rules"
               ref="ruleForm"
               label-width="100px"
               class="demo-ruleForm">
        <el-form-item label="活动名称"
                      prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="活动区域"
                      prop="region">
          <el-select v-model="ruleForm.region"
                     placeholder="请选择活动区域">
            <el-option label="区域一"
                       value="shanghai"></el-option>
            <el-option label="区域二"
                       value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <div slot="footer"
         class="asp-dialog-footer">
      <el-button @click="save"
                 type="primary">保存</el-button>
      <el-button @click="$emit('close')">取消</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['coreEditor'],
  data () {
    return {
      ruleForm: {
        name: '',
        region: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ]
      }
    }
  },
  computed: {
    command () {
      return this.coreEditor.command
    }
  },
  mounted () {
    this.$set(this.ruleForm, 'name', this.command.getCustomValue('name'))
    this.$set(this.ruleForm, 'region', this.command.getCustomValue('region'))
  },
  methods: {
    save () {
      // this.$emit('importXml', this.xml)
      Object.keys(this.ruleForm).forEach(item => {
        console.log(item)
        if (this.ruleForm[item]) {
          this.command.setCustomValue(item, this.ruleForm[item])
        }
      })
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
