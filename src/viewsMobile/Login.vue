<template>
  <div class="login-bg">
    <div class="row-fluid login-wrapper">
      <header class="logo-header">
        <img class="logo" src="../assets/logo_geex_mobile.png">
      </header>
      <div class="box">
        <div class="content-wrap">
          <form @submit.prevent="login">
            <p>
              <i class="ico ico-people"></i>
              <input v-model="username" class="username" type="text" placeholder="用户名">
              <span v-if="validMsg.username" class="valid-error">{{ validMsg.username }}</span>
            </p>
            <p>
              <i class="ico ico-lock"></i>
              <input v-model="password" class="password" :type="showPwd ? 'text' : 'password'" placeholder="密码">
              <i class="ico fr mgt5" :class="showPwd ? 'ico-eye': 'ico-eye-close'" @click="showPwd = !showPwd"></i>
              <span v-if="validMsg.password" class="valid-error">{{ validMsg.password }}</span>
            </p>
            <p style="position: relative">
              <i class="ico ico-key"></i>
              <input v-model='vercode' class="password" type="text"  placeholder="请输入验证码" maxlength="4">
              <img class="fr" :src="captchaSrc" @click="change_vercode" id="code_img">
              <span v-if="validMsg.vercode" class="valid-error">{{ validMsg.vercode }}</span>
            </p>
            <div class="txtright">
              <a class="forgot" style="padding-right: 5px; cursor: pointer" onclick="alert('请联系即科金融的业务员帮您重置密码！')">忘记密码?</a>
            </div>
            <button class="login">登录</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { apiUrl } from '@/api/config'
import util from '@/util'

export default {
  name: 'home',
  data () {
    return {
      username: '',
      password: '',
      vercode: '',
      captchaSrc: apiUrl.getCode + '?seed=' + Math.random(),
      validMsg: {
        username: '',
        password: '',
        vercode: '',
      },
      showPwd: false,
      remb: false
    }
  },
  methods: {
    change_vercode () {
      this.captchaSrc =  apiUrl.getCode + '?seed=' + Math.random()
    },
    login () {
      if (this.valForm()) {
        this.submit()
        .then(res => {
          util.setCookie('token', res.token)
          this.$router.push('/mobile/ddgOrder')
        })
        .catch(err => {
          alert(err)
        })
      }
    },
    valForm () {
      var flag = true
      if (!this.username) {
        this.validMsg.username = '对不起，账号不能为空！'
        flag = false
      }
      if (!this.password) {
        this.validMsg.password = '对不起，密码不能为空！'
        flag = false
      }
      if (!this.vercode) {
        this.validMsg.vercode = '对不起，请填写验证码！'
        flag = false
      }

      return flag
    },
    submit () {
      return this.$store.dispatch('Login', {
        username: this.username,
        password: this.password,
        vercode: this.vercode,
        remb: this.remb ? 1 : 0,
      })
    }
  }
}
</script>

<style>
  html, body, #app, .login-bg { height: 100% }
  #code_img { position: absolute; right: 0; width: 75px; }
  .logo-header { text-align: center; margin: 50px auto; }
  .logo { width: 300px }
  .login-bg { background-image: url(../assets/bgs/mobieLogin.png); background-size: cover }
  .ico { display: inline-block; width: 20px; height: 20px; vertical-align: middle; margin-right: 10px; background-repeat: no-repeat; background-size: 100% }
  .ico-people { background-image: url(../assets/ico/ico-people.png);  } 
  .ico-lock { background-image: url(../assets/ico/ico-lock.png); }
  .ico-eye { background-image: url(../assets/ico/ico-eye.png); }
  .ico-eye-close { background-image: url(../assets/ico/ico-eye-close.png); }
  .ico-key { background-image: url(../assets/ico/ico-key.png); }

  .content-wrap { padding: 20px }
  .content-wrap p { border-bottom: 1px solid rgba(255,255,255,.5); padding-bottom: 10px }
  .content-wrap input { background: none; color: #fff; padding: 4px 6px; font-size: 17px; border: none; margin-bottom: 0; letter-spacing: 1px }
  .content-wrap .valid-error { display: block; color: #FF2D2D; margin-left: 34px; margin-top: -5px; }
  .content-wrap input.placeholder, .content-wrap input::-webkit-input-placeholder { color: #fff;}
  .forgot, .forgot:hover { color: #fff; text-decoration: none }
  .login { display: block; background: #1AB3FF; font-size: 17px; width: 90%; margin: auto; color: #fff; line-height: 40px; border: none; border-radius: 50px; margin-top: 25px}
</style>
