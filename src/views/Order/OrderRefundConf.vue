<template>
  <BaseModal title="退款确认" :width="width" @close="close">
    <template slot="body">
      <div id="OrderRefundConf">
        <div class="flex">
          <div style="width:100px;">
            <span style="color: rgb(33, 33, 33); font-size: 15px;">上传打印凭证</span>
          </div>
          <div style="margin-left:30px;width:320px;">
            <div class="flex">
              <FileUpload
              action="order/img/upload"
                @success="(res, name) => { uploadSuccess(0, res, name) }"
                @error="uploadErr">
                <span class="uploadBtn">选择文件</span>
              </FileUpload>
              <span style="margin-left: 10px; color:#A0A0A0;width:210px;overflow-wrap: break-word;">{{ imgFileNames[0] || '未选择任何文件' }}</span>
            </div>
            <div class="flex" style="margin-top:25px;">
              <FileUpload
              action="order/img/upload"
                @success="(res, name) => { uploadSuccess(1, res, name) }"
                @error="uploadErr">
                <span class="uploadBtn">选择文件</span>
              </FileUpload>
              <span style="margin-left: 10px; color:#A0A0A0;width:210px;overflow-wrap: break-word;">{{ imgFileNames[1] || '未选择任何文件' }}</span>
            </div>
            <div class="flex" style="margin-top:25px;">
              <FileUpload
              action="order/img/upload"
                @success="(res, name) => { uploadSuccess(2, res, name) }"
                @error="uploadErr">
                <span class="uploadBtn">选择文件</span>
              </FileUpload>
              <span style="margin-left: 10px; color:#A0A0A0;width:210px;overflow-wrap: break-word;">{{ imgFileNames[2] || '未选择任何文件' }}</span>
            </div>
          </div>
          <div class="flex rightAlignment" style="width:155px;">
            <span style="color:#FF4545;font-size:20px;vertical-align: middle;">*</span>
            <span style="font-size: 12px;color: #585858;margin-left:5px;">仅限jpg/png/bmp/gif</span>
          </div>
        </div>
        <div class="flex" style="margin-top:25px;">
          <div style="margin-left:70px;">
            <span style="color: rgb(33, 33, 33); font-size: 15px;">备注</span>
          </div>
          <div class="col-lg-10" style="margin-left:30px;">
            <textarea type="text" style="width:364px; height:120px;resize:none;background: #FAFAFA;" v-model="mark" maxlength="100"></textarea>
          </div>
        </div>
        <div style="height:50px;" v-if="modalParam.mark">
          <span style="color:red;font-size: 14px;margin-left:98px;">【打回原因：{{ modalParam.mark }}】</span>
        </div>
        <div class="flex flexCenter" style="margin-top:30px;">
          <div class="gb" @click="close">关闭</div>
          <div class="tj" @click="submit">提交</div>
        </div>
        
      </div>
    </template>
  </BaseModal>
</template>

<script>
  import BaseModal from '@/components/BaseModal.vue'
  import FileUpload from '@/components/FileUpload.vue'
  import api from '@/api'

  export default {
    props: ['width', 'modalParam'],
    data () {
      return {
        imgFiles: [],
        imgFileNames: ['', '', ''],
        mark: ''
      }
    },
    components: {
      BaseModal,
      FileUpload,
    },
    methods: {
      close () {
        this.$emit('close')
      },
      uploadSuccess (index, res, name) {
        this.imgFiles[index] = res.result
        this.imgFileNames.splice(index, 1, name) // 数组以splice方法操作确保数据响应式
      },
      uploadErr (err) {
        this.$ui.alert(err)
      },
      submit () {
        if (this.imgFiles.length) {
          var imgFileStr = JSON.stringify(this.imgFiles.filter(img => img))
          api.sendFile({
            app_id: this.modalParam.C_APP_ID,
            imgFileStr,
            mark: this.mark,
          })
          .then(() => {
            this.$ui.alert('上传凭证成功')
            this.$emit('success')
          })
          .catch(err => this.$ui.alert(err))
        } else {
          this.$ui.alert('请上传打款凭证')
        }
      }
    }
  }
</script>

<style scoped>
  #OrderRefundConf{
    padding: 30px 30px;
    height: auto;
    font-size: 14px;
  }
  label.file-uploads { line-height: 30px }
  #OrderRefundConf .uploadBtn{
    border: 1px solid #1FCFCC;
    border-radius: 2px;
    color: #1FCFCC;
    padding: 5px 25px;
    font-size: 12px;
  }
  #OrderRefundConf .file-uploads{
    overflow: inherit;
  }
  #OrderRefundConf .yuyue{
    width: 110px;
    height: 35px;
    background: #F6A623;
    box-shadow: 0 1px 3px 0 #EFB657;
    border-radius: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    cursor: pointer;
    margin-left: auto;
    margin-right: auto;
    font-size: 17px;
  }
  #OrderRefundConf .gb{
    background: #FAFAFA;
    border: 1px solid #A0A0A0;
    box-shadow: 0 1px 3px 0 rgba(210,210,210,0.92);
    border-radius: 100px;
    color: #777;
    font-size: 17px;
    cursor: pointer;
    width: 110px;
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  #OrderRefundConf .tj{
    background: #1A9BFE;
    box-shadow: 0 1px 3px 0 rgba(68,165,249,0.92);
    border-radius: 100px;
    color: #fff;
    font-size: 17px;
    cursor: pointer;
    width: 110px;
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 20px;
  }
</style>