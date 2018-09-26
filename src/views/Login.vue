<template>
  <div class="login-bg">
    <div class="row-fluid login-wrapper">
      <a href="/recon">
        <img class="logo" src="../assets/logo_geex.png">
      </a>

      <div class="span4 box">
        <div class="content-wrap">
          <h6>即科商户后台系统</h6>
          <form @submit.prevent="login">
            <input v-model="username" class="span12 username" type="text" placeholder="用户名">
            <input v-model="password" class="span12 password" type="password" placeholder="密码">
            <input v-model='vercode' class="span7 password fl" type="text"  placeholder="请输入验证码" maxlength="4">
            <img :src="captchaSrc" @click="change_vercode" id="code_img">
            <div class="remember">
              <input id="remember-me" type="checkbox" v-model="remb">
              <label for="remember-me">记住我</label>
              <!--<a class="forgot"><span style="padding-right: 5px; cursor: pointer" onclick="alert('请联系即科金融的业务员帮您重置密码！')">忘记密码?</span></a>-->
              <a class="forgot" @click="resetpwd"><span style="padding-right: 5px; cursor: pointer">忘记密码?</span></a>
            </div>
            <button class="btn-glow primary login">登录</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { apiUrl, baseURL } from '@/api/config'
import util from '@/util'

export default {
  name: 'home',
  data () {
    return {
      captchaSrc: baseURL + apiUrl.getCode + '?seed=' + Math.random(),
      username: '',
      password: '',
      vercode: '',
      remb: false
    }
  },
  methods: {
    change_vercode () {
      this.captchaSrc =  baseURL + apiUrl.getCode + '?seed=' + Math.random()
    },
    login () {
      if (this.valForm()) {
        this.submit()
        .then(res => {
          util.setCookie('token', res.token)
          if (+res.role === 92) {
            // 财务默认首页是退款处理
            this.$router.push('/home/tkorder')
          } else {
            this.$router.push('/home')
          }
        })
        .catch(err => {
          alert(err)
        })
      }
    },
    valForm () {
      if (!this.username) {
        alert('对不起，账号不能为空！')
        return false
      }
      if (!this.password) {
        alert('对不起，密码不能为空！')
        return false
      }
      if (!this.vercode) {
        alert('对不起，请填写验证码！')
        return false
      }

      return true
    },
    resetpwd () {
        this.$router.push('/resetpwd');
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
/*由于这个style, 该模块不能声明scoped*/
html, body, #app, .login-bg {
  height: 100%
}
.login-bg {
  background: url("../assets/bgs/landscape.jpg") no-repeat center fixed;
  -webkit-animation: approach 30s both;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover; 
}
.login-wrapper {
  position: absolute;
  top: 90px;
  text-align: center; }
  .login-wrapper .logo {
    margin-bottom: 45px;
    position: relative;
    left: -2px; }
  .login-wrapper .box {
    margin: 0 auto;
    padding: 35px 0 30px;
    float: none;
    width: 400px;
    box-shadow: 0 0 6px 2px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.65); }
    .login-wrapper .box .content-wrap {
      width: 82%;
      margin: 0 auto; }
    .login-wrapper .box h6 {
      text-transform: uppercase;
      margin: 0 0 30px 0;
      font-size: 18px;
      font-weight: 600; }
    .login-wrapper .box input[type="text"],
    .login-wrapper .box input[type="password"] {
      font-size: 15px;
      height: 40px;
      margin-bottom: 18px;
      border-color: #b2bfc7;
      padding-left: 12px; }
    .login-wrapper .box input[type="password"] {
      margin-bottom: 10px; }
    .login-wrapper .box input:-moz-placeholder {
      color: #9ba8b6;
      font-size: 15px;
      letter-spacing: 0px;
      font-style: italic; }
    .login-wrapper .box input:-ms-input-placeholder {
      color: #9ba8b6;
      font-style: italic;
      letter-spacing: 0px;
      font-size: 15px; }
    .login-wrapper .box input::-webkit-input-placeholder {
      color: #9ba8b6;
      font-style: italic;
      letter-spacing: 0px;
      font-size: 15px; }
    .login-wrapper .box a.forgot {
      display: block;
      text-align: right;
      font-style: italic;
      text-decoration: underline;
      color: #3d88ba;
      font-size: 13px;
      margin-bottom: 6px; }
    .login-wrapper .box .remember {
      display: block;
      clear: both;
      overflow: hidden;
      margin-bottom: 20px; }
      .login-wrapper .box .remember input[type="checkbox"] {
        float: left;
        margin-right: 8px; }
      .login-wrapper .box .remember label {
        float: left;
        color: #4a576a;
        font-size: 13px; }
    .login-wrapper .box .login {
      text-transform: uppercase;
      font-size: 13px;
      padding: 8px 30px; }
  .login-wrapper .no-account {
    margin: 0 auto;
    float: none;
    text-align: center;
    font-size: 14px;
    margin-top: 25px; }
    .login-wrapper .no-account p {
      display: inline-block;
      color: #aaaaaa; }
    .login-wrapper .no-account a {
      color: #aaaaaa;
      margin-left: 7px;
      border-bottom: 1px solid;
      transition: all .1s linear;
      -moz-transition: all .1s linear;
      /* Firefox 4 */
      -webkit-transition: all .1s linear;
      /* Safari and Chrome */
      -o-transition: all .1s linear;
      /* Opera */ }
      .login-wrapper .no-account a:hover {
        text-decoration: none;
        color: #fff;
        border-bottom-color: #fff; }

/* background switcher */
.bg-switch {
  position: absolute;
  background: rgba(255, 255, 255, 0.8);
  top: 60px;
  border-radius: 0px 10px 10px 0px;
  padding: 10px 10px 0px 10px;
  z-index: 999; }
  .bg-switch .bgs .bg {
    text-align: center;
    margin-bottom: 13px;
    text-decoration: none;
    display: block; }
    .bg-switch .bgs .bg.active img {
      border-color: #000; }
    .bg-switch .bgs .bg img {
      width: 80px;
      height: 60px;
      border: 2px solid #9fcef1;
      cursor: pointer; }

  #code_img { 
    cursor:pointer;
    margin:1px 0 0 10px;
    width: 94px;
  }

/* responsive */
@media (max-width: 767px) {
  .login-wrapper .box {
    width: 350px; } }
@media (max-width: 480px) {
  .login-wrapper .box {
    width: 90%; } }

@-webkit-keyframes approach{
  from { background: url("../assets/bgs/landscape.jpg") no-repeat center center fixed; background-size: 100%;}
  to { background: url("../assets/bgs/landscape.jpg") no-repeat center center fixed;  background-size: 110%}
}
</style>
