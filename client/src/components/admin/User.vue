<template>
  <div class="User">
    <el-row>
      <el-col :span="2">
        <div class="block user_chunk" @click="change">
          <el-avatar
            class="user_portrait"
            icon="el-icon-user-solid"
            fit="contain"
            :size="80"
            :src="userdata.pictureUrl"
          ></el-avatar>
        </div>
      </el-col>
      <el-col :span="6">
        <h4 style="margin: 10px 0 0;">{{ userdata.name }}</h4>
        <p class="sign">{{ userdata.sign }}</p>
      </el-col>
    </el-row>

    <el-divider content-position="left">基础信息</el-divider>

    <transition>
      <el-row class="message">
        <el-col :span="8">
          <ul>
            <li>
              昵称：<span>{{ userdata.name }}</span>
            </li>
            <li>
              性别：<span>{{
                userdata.sex == 1 ? "男" : "女" ? "你猜" : "女"
              }}</span>
            </li>
            <li>
              年龄：<span>{{ changePoke(userdata.age) }}岁</span>
            </li>
            <li>
              简介：<span>{{ userdata.sign }}</span>
            </li>
          </ul>
        </el-col>
        <el-col>
          <el-button
            style="margin-left:40px"
            type="info"
            icon="el-icon-edit"
            size="small"
            @click="(dialogVisible = true), open()"
            >修改信息</el-button
          >
        </el-col>

        <el-dialog
          title="编辑信息"
          :visible.sync="dialogVisible"
          :close-on-click-modal="false"
          width="30%"
        >
          <el-form ref="form" label-width="80px">
            <el-form-item label="昵称">
              <el-col>
                <el-input v-model="form.name" placeholder="输入昵称"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="简介">
              <el-col>
                <el-input
                  type="textarea"
                  placeholder="请输入内容"
                  v-model="form.sign"
                  maxlength="30"
                  show-word-limit
                  resize="none"
                  rows="3"
                ></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="性别">
              <el-col>
                <el-select v-model="form.sex" style="width:100%">
                  <el-option label="男" value="1"></el-option>
                  <el-option label="女" value="0"></el-option>
                  <el-option label="你猜" value="-1"></el-option>
                </el-select>
              </el-col>
            </el-form-item>
            <el-form-item label="出生日期">
              <el-col>
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="form.age"
                  style="width: 100%;"
                  :editable="false"
                  :picker-options="pickerOptions"
                ></el-date-picker>
              </el-col>
            </el-form-item>
          </el-form>

          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="onSubmit">修 改</el-button>
          </span>
        </el-dialog>
      </el-row>
    </transition>

    <input
      type="file"
      name="file"
      id="file"
      ref="files"
      style="display:none"
      accept=".jpg, .png, .jpeg"
      @change="fileChange"
    />
  </div>
</template>
<script>
import { mapState } from "vuex";
import api from "@/api/api";
export default {
  name: "User",
  data() {
    return {
      dialogVisible: false,
      form: {
        name: "",
        sex: "",
        age: "",
        sign: "",
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
    };
  },
  computed: {
    ...mapState(["userdata"]),
  },
  methods: {
    changePoke(datetime) {
      const nowPoke = new Date().getFullYear();
      datetime = new Date(datetime).getFullYear();
      return nowPoke - datetime;
    },
    open() {
      const state = this.userdata;
      this.form = {
        name: state.name,
        sex: state.sex + "",
        age: state.age,
        sign: state.sign,
      };
    },
    async onSubmit() {
      if (await this.verify()) {
        const res = await this.$store.dispatch("userUpdate", {
          id: this.userdata.id,
          obj: this.form,
        });
        if (res) {
          this.$message({
            message: "修改成功",
            type: "success",
          });
          this.dialogVisible = false;
        } else {
          this.$message.error("修改失败");
        }
      } else {
        this.$message({
          message: "未修改任何数据",
          type: "warning",
        });
      }
    },
    verify() {
      // 用户信息验证
      const state = this.userdata;
      const form = this.form;
      for (const key in this.form) {
        if (form[key] != state[key]) {
          return this.$confirm("是否修改用户信息, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
            .then(() => true)
            .catch(() => false);
        }
      }
      return false;
    },
    change() {
      this.$refs.files.click();
    },
    fileChange() {
      const file = this.$refs.files.files[0];
      const userId = this.$store.state.userId;
      const formdata = new FormData();
      formdata.append("portrait", file);
      formdata.append("fileId", userId);

      api.uploadTransfer(formdata).then((res) => {
        if (res.data) {
          alert("修改成功");
          this.$store.commit("changePortraitUrl", res.data);
        }
      });
    },
  },
};
</script>
<style lang="scss">
.user_chunk {
  margin-left: 30px;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  .user_portrait {
    img {
      margin: 0 auto;
    }
    cursor: pointer;
    position: relative;
    &:hover::after {
      content: "修改头像";
      font-size: 12px;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.3);
    }
  }
}

.message ul li {
  margin-bottom: 15px;
  font-size: 14px;
  color: #999;
  span {
    color: #333;
  }
}

.sign {
  border: solid 1px transparent;
  border-radius: 5px;
  line-height: 23px;
  padding-left: 5px;
  margin: 12px 0 0 -5px;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.5);
  transition: all 0.3s;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
    border: solid 1px rgba(0, 0, 0, 0.1);
  }
}

.el-divider div {
  background-color: #e9ecef !important;
}
</style>
