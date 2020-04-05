<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像 -->
      <div class="avatar_box">
        <img src="../assets/logo.png" alt />
      </div>
      <!-- 登录表单 -->
      <el-form ref="loginFormRef" class="login_form" :model="form" :rules="rules">
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input v-model="form.username" prefix-icon="iconfont icon-user"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input type="password" v-model="form.password" prefix-icon="iconfont icon-3702mima"></el-input>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item class="btn_box">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="default" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      // 表单数据
      form: {
        username: '',
        password: ''
      },
      // 表单校验
      rules: {
        // 用户名校验
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        // 密码校验
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 10, message: '长度在 6 到 10 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 重置表单数据
    reset () {
      this.$refs.loginFormRef.resetFields()
    },
    // 登陆成功或失败的提示框
    openTip (flag) {
      if (flag) {
        this.$message({
          message: '登陆成功',
          type: 'success',
          center: true
        })
      } else {
        this.$message({
          message: '登陆失败，请检查用户名或密码',
          type: 'error',
          center: true
        })
      }
    },
    // 登录校验
    login () {
      this.$refs.loginFormRef.validate(async valid => {
        if (valid) {
          // 发起请求
          const { data: res } = await this.$http.post('login', this.form)
          // 判断账号密码是否正确
          if (res.data) {
            this.openTip(true)
            // 将登陆成功之后的token,保存到客户端的sessionStorage中
            window.sessionStorage.setItem('token', res.data.token)
            window.sessionStorage.setItem('username', this.form.username)
            this.$router.push('/home')
          } else {
            this.openTip(false)
          }
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login_container {
  background-color: rgb(237, 237, 237);
  height: 100%;
  position: relative;
}
.login_box {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: rgb(222, 222, 222) 1px 5px 5px;
  .avatar_box {
    width: 130px;
    height: 130px;
    border: 1px solid rgb(233, 233, 233);
    border-radius: 50%;
    background-color: #fff;
    box-shadow: rgb(233, 233, 233) 1px 1px 5px;
    padding: 5px;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    img {
      width: inherit;
      height: inherit;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}
.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  .btn_box {
    display: flex;
    justify-content: center;
  }
}
</style>
