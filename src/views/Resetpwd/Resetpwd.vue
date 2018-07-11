<template>
  <div class="content">
    <div class="container-fluid">
      <div id="pad-wrapper" >
        <h4>修改密码</h4>
        <div style="margin-top: 20px; margin-left: 30px">
          <div class="form-group">
              <label for="inputPassword1" class="col-sm-2 control-label">当前密码</label>
              <div class="col-sm-10">
                <input type="password" class="form-control" placeholder="请输入当前密码" v-model="pwd_cur">
              </div>
          </div>
          <div class="form-group" >
              <label for="inputPassword2" class="col-sm-2 control-label">设置密码</label>
              <div class="col-sm-10">
                <input type="password" class="form-control" placeholder="请输入新密码（至少8个字符）" v-model="pwd_new">
              </div>
          </div>
          <div class="form-group">
              <label for="inputPassword3" class="col-sm-2 control-label">确认密码</label>
              <div class="col-sm-10">
                <input type="password" class="form-control" placeholder="请再次输入密码" v-model="pwd_re">
              </div>
          </div>
          <div class="form-group">
            <div class="col-sm-offset-2 col-sm-10">
              <button type="button" class="btn btn-default" @click="save">保 存</button>
              <button style="margin-left: 14px" class="btn btn-default" @click="reset">取 消</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import api from '@/api/api'

  export default {
    data () {
      return {
        pwd_cur: '',
        pwd_new: '',
        pwd_re: '',
      }
    },
    methods: {
      save () {
        console.log(this.pwd_cur + ' ' + this.pwd_new + ' ' + this.pwd_re)
        api.test()
          .then(() => {
            alert('修改密码成功')
            this.$router.push('/')
          })
      },
      reset () {
        this.pwd_cur = this.pwd_new = this.pwd_re = '';
      }
    }
  }
</script>