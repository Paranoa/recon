<template>
    <div class="resetPassword-box">
        <div class="resetPassword-title">忘记密码</div>
        <div class="resetPassword-body">
            <div class="resetPassword-model" v-if="step===1">
                <div class="setp-box">
                    <img src="../assets/step1.png">
                </div>
                <p class="clearfix">
                    <span class="text flt">用户名</span>
                    <input type="text" v-model="username" class="input270 username flt" placeholder="请输入用户名">
                    <span class="error flt" v-if="usernameErr"><img src="../assets/pwdError.png">{{usernameErr}}</span>
                </p>
                <p class="clearfix">
                    <span class="text flt">检验码</span>
                    <input type="text" v-model="veriCode" class="input150 veriCode flt" placeholder="请输入校验码">
                    <span class="veriCodeButton flt" :class="veriCodeSecond>1 ? 'veriCodeButton60' : '' " @click="veriCodeSubmit">{{veriCodeText}}</span>
                    <span class="error flt" v-if="veriCodeErr"><img src="../assets/pwdError.png">{{veriCodeErr}}</span>
                </p>
                <div class="submitButton stepButton1" @click="save1">下一步</div>
            </div>
            <div class="resetPassword-model" v-if="step===2">
                <div class="setp-box">
                    <img src="../assets/step2.png">
                </div>
                <p class="clearfix">
                    <span class="text flt">设置新密码</span>
                    <input type="password" v-model="newPwd1" class="input270 newPwd1 flt" placeholder="请输入校验码">
                    <span class="error flt" v-if="newPwdErr1"><img src="../assets/pwdError.png">{{newPwdErr1}}</span>
                </p>
                <p class="clearfix">
                    <span class="text flt">确认新密码</span>
                    <input type="password" v-model="newPwd2" class="input270 newPwd2 flt" placeholder="请再次输入校验码">
                    <span class="error flt" v-if="newPwdErr2"><img src="../assets/pwdError.png">{{newPwdErr2}}</span>
                </p>
                <div class="submitButton stepButton2" @click="save2">下一步</div>
            </div>
            <div class="resetPassword-model" v-if="step===3">
                <div class="setp-box">
                    <img  src="../assets/step3.png">
                    <div class="pwdComplete">
                        <img src="../assets/pwdComplete.png">找回密码完成！3秒后自动跳转到登录页！
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import api from '@/api'

    export default {
        data () {
            return {
                step: 1,
                username: '',
                veriCode: '',
                veriCodeText: '获取手机验证码',
                veriCodeSecond: 0,
                newPwd1: '',
                newPwd2: '',
                usernameErr: "",
                veriCodeErr: "",
                newPwdErr1: "",
                newPwdErr2: ""
            }
        },
        mounted () {
        },
        methods: {
            veriCodeSubmit () {
                let _this = this;
                if (_this.username && _this.veriCodeText === "获取手机验证码") {
                    _this.veriCodeSecond = 60;
                    _this.veriCodeTimeOut();
                    api.sendSmsCode({
                        account: this.username
                    })
                        .then(() => {
                          alert('验证码发送成功');
                        })
                        .catch(err => alert(err))
                }
            },
            veriCodeTimeOut () {
                let _this = this;
                if (_this.veriCodeSecond > 1) {
                    _this.veriCodeText = "倒计时" + _this.veriCodeSecond + "S";
                } else {
                    _this.veriCodeText = "获取手机验证码";
                    return;
                }
              setTimeout(function () {
                  _this.veriCodeSecond--;
                  _this.veriCodeTimeOut();
              },1000)
            },
            save1 () {
                if (this.valForm()) {
                    api.checkSmsCodeByAccount({
                        account: this.username,
                        smsCode: this.veriCode
                    })
                        .then(() => {
                            this.step = 2;
                        })
                        .catch(err => alert(err))

                }
            },
            save2 () {
                if (this.valForm()) {
                    var _this = this;
                    api.resetPasswordBySmsCode({
                        account: _this.username,
                        smsCode: _this.veriCode,
                        newPwd: _this.newPwd1
                    })
                        .then(() => {
                            _this.step = 3;
                            setTimeout(function () {
                                _this.$router.push('/login')
                            },3000)
                        })
                        .catch(err => alert(err))

                }
            },
            valForm () {
                if (this.step === 1) {
                    this.usernameErr = "";
                    this.veriCodeErr = "";
                    if (!this.username) {
                        this.usernameErr = "用户名不能为空";
                        return false
                    }
                    if (!this.veriCode) {
                        this.veriCodeErr = "请输入验证码";
                        return false
                    }
                } else if (this.step === 2) {
                    this.newPwdErr1 = "";
                    this.newPwdErr2 = "";
                    if (!this.newPwd1) {
                        this.newPwdErr1 = "请输入新密码";
                        return false
                    }
                    if (!this.newPwd2) {
                        this.newPwdErr2 = "请确认新密码";
                        return false
                    }
                    if (this.newPwd1 !== this.newPwd2) {
                        this.newPwdErr2 = "密码不一致";
                        return false;
                    }
                }
                return true
            }
        }
    }
</script>

<style>
    /*由于这个style, 该模块不能声明scoped*/
    html, body, #app, .login-bg {
        height: 100%;
        background: #FFFFFF;
    }
    p{
        padding: 0;
        margin: 0;
    }
    .clearfix:after {
        content: '';
        display: table;
        clear: both;
    }
    .flt{
        float: left;
    }
    .frt {
        float: right;
    }
    .resetPassword-box{
        width: 700px;
        height: 400px;
        border: 1px solid #BDBDBD;
        position: absolute;
        top: 50%;left: 50%;
        margin: -200px 0 0 -350px;
    }
    .resetPassword-title{
        border-bottom: 1px solid #BDBDBD;
        height: 50px;
        background: #FAFAFA;
        font-size: 18px;
        color: #212121;
        line-height: 50px;
        padding-left: 30px;
        font-weight: 500;
    }
    .resetPassword-body {
        padding: 30px 80px 40px;
    }
    .resetPassword-model .setp-box{
       padding-bottom: 40px;
    }
    .resetPassword-model p {
        height: 35px;
        line-height: 35px;
        box-sizing: border-box;
        margin-bottom: 30px;
    }
    .resetPassword-model p:last-of-type {
        margin-bottom: 0;
    }
    .resetPassword-model p .text {
        padding-right: 30px;
        display: inline-block;
        font-size: 15px;
        color: #212121;
    }
    .resetPassword-model p input {
        margin: 0;
        box-sizing: border-box;
        height: 35px;
        background: #FAFAFA;
    }
    .resetPassword-model p .input270 {
       width: 270px;
    }
    .resetPassword-model p .input150 {
       width: 150px;
    }
    .resetPassword-model p .veriCodeButton {
        text-align: center;
        width: 112px;
        line-height: 35px;
        height: 35px;
        box-sizing: border-box;
        padding: 0 6px;
        margin-left: 8px;
        font-size: 14px;
        display: inline-block;
        color: #1A9BFE;
        border: 1px solid #1A9BFE;
        border-radius: 5px;
        cursor: pointer;
    }
    .resetPassword-model p .veriCodeButton60 {
        opacity: .6;
    }
    .resetPassword-model p .error {
        margin-left: 10px;
        font-size: 15px;
        color: #585858;
    }
    .resetPassword-model p .error img {
       margin: -3px 5px 0 0;
    }
    .resetPassword-model .submitButton{
        background: #1A9BFE;
        border-radius: 4px;
        width: 270px;
        font-size: 18px;
        color: #FFFFFF;
        line-height: 40px;
        text-align: center;
    }
    .resetPassword-model .stepButton1{
        margin:40px 0 0 75px;
    }
    .resetPassword-model .stepButton2{
        margin:40px 0 0 105px;
    }
    .resetPassword-model .pwdComplete{
        font-size: 18px;
        color: rgb(33, 33, 33);
        height: 230px;
        line-height: 230px;
        text-align: center;
    }
    .resetPassword-model .pwdComplete img{
        margin: -5px 15px 0 0;
    }
</style>