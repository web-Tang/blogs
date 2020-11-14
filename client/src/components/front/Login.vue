<template>
  <div
    id="background_image"
    :style="{
      backgroundImage: `url(${require('@/assets/login_xk_bg.jpg')})`,
    }"
  >
    <div class="frame">
      <h3>博客后台管理系统</h3>
      <el-row :gutter="10">
        <el-col>
          <el-input
            placeholder="请输入用户名"
            v-model="loginId"
            :maxlength="20"
            clearable
            prefix-icon="el-icon-s-custom"
          ></el-input>
        </el-col>
      </el-row>
      <el-row :gutter="10" style="margin-top:30px">
        <el-col>
          <el-input
            placeholder="请输入密码"
            v-model="loginPwd"
            show-password
            prefix-icon="el-icon-lock"
          ></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-checkbox v-model="checked" class="checkbox"
          >点击记住账号和密码</el-checkbox
        >
      </el-row>
      <el-row>
        <el-button
          type="primary"
          @click="LoginFunc(loginId, loginPwd)"
          style="width: 100%;"
          >登 录</el-button
        >
      </el-row>
      <el-alert
        :title="errMsg"
        type="error"
        show-icon
        :style="{
          display: errMsg ? 'flex' : 'none',
        }"
        @close="clone"
      ></el-alert>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      img_bg_url: "",
      loginId: "qwe",
      loginPwd: "123",
      checked: false,
      errMsg: "",
    };
  },
  methods: {
    clone() {
      this.errMsg = "";
    },
    async LoginFunc(loginId, loginPwd) {
      if (loginId && loginPwd) {
        const users = await this.$store.dispatch("login", {
          loginId,
          loginPwd,
        });
        if (users) {
          this.$router.replace({ name: "admin" });
        } else {
          this.errMsg = "登录失败";
        }
      } else {
        this.errMsg = "用户名或密码不能为空！";
      }
    },
  },
};
</script>

<style lang="scss">
#background_image {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  overflow-y: auto;
  background-size: 100%;
  background-repeat: no-repeat;
}
.frame {
  margin: 0 auto;
  margin-top: 15%;
  padding: 20px 30px;
  width: 400px;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  .el-row {
    margin-bottom: 15px;
  }
  h3 {
    color: #fff;
    text-align: center;
    padding: 15px 0 30px;
    margin: 0;
  }
  .checkbox {
    color: #fff;
  }
  .el-input__inner {
    background-color: rgba(255, 255, 255, 0);
    color: #fff;
  }
}
</style>
