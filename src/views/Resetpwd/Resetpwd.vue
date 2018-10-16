<template>
  <BaseModal title="修改密码" :width="width" @close="close">
      <template slot="body">
        <div class="flex flexCenter" style="height:355px;">
            <div class="fromBox">
                <div class="flex heightCenter">
                    <span style="font-size:16px;width:95px;">旧密码</span>
                    <input class="input" style="margin-left:10px;width:230px;height:35px;" type="password" placeholder="请输入旧密码" v-model="oldPwd">
                </div>
                <span style="color:#ff5c5c;font-size:12px;margin-left:105px;">{{errInfo}}</span>
                <div class="flex heightCenter" style="margin-top:15px;">
                    <span style="font-size:16px;width:95px;">设置新密码</span>
                    <input class="input" style="margin-left:10px;width:230px;height:35px;" type="password" placeholder="请输入新密码" v-model="newPwd1">
                </div>
                <div class="flex heightCenter" style="margin-top:35px;">
                    <span style="font-size:16px;width:95px;">确认新密码</span>
                    <input class="input" style="margin-left:10px;width:230px;height:35px;" type="password" placeholder="请再次输入密码" v-model="newPwd2">
                </div>
                <div class="flex flexCenter" style="margin-top:40px;">
                    <div class="bcbtn" @click="save">保 存</div>
                </div>
            </div>
        </div>
      </template>
    </BaseModal>
</template>

<script>
  import api from '@/api'
  import BaseModal from '@/components/BaseModal.vue'

  export default {
    props: ['width'],
    data () {
      return {
        oldPwd: '',
        newPwd1: '',
        newPwd2: '',
        errInfo:"",
      }
    },
    components: {
        BaseModal,
    },
    methods: {
      save () {
        if (this.valForm()) {
          api.resetPwd({
            oldPwd: this.oldPwd,
            newPwd1: this.newPwd1,
            newPwd2: this.newPwd2
          })
          .then(() => {
            this.$ui.alert('修改密码成功')
            this.$router.push('/')
          })
          .catch(err => this.errInfo = err)
        }
      },
      close () {
        this.$emit('close')
      },
      valForm () {
        if (!this.oldPwd) {
          this.errInfo = '当前密码不能为空';
          return false
        } else if (!this.newPwd1) {
          this.errInfo = '新密码不能为空';
          return false
        } else if (!this.newPwd2) {
          this.errInfo = '确认密码不能为空';
          return false
        }
        return true
      }
    }
  }
</script>
<style>
    .fromBox{
        margin-top: 40px;
    }
    .bcbtn{
        width: 270px;
        height: 40px;
        background: #149AFF;
        box-shadow: 0 1px 3px 0 rgba(68,165,249,0.92);
        border-radius: 100px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        font-size: 18px;
    }
</style>
