<template>
  <el-row type="flex" justify="center">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-button style="float: left; padding: 3px 0" type="text" @click="skip">
          <span class="el-icon-arrow-left"></span> 管理博客
        </el-button>
      </div>
      <el-row>
        <div class="sentence">
          <p>{{sentence}}</p>
          <p>—— {{author}}</p>
        </div>
      </el-row>
      <div class="result">
        <template v-if="status">
          <span class="el-icon-check iconCheck"></span> 发布成功并查看文章
        </template>
        <template v-else>
          <span class="el-icon-close iconClose"></span> 发布失败
        </template>
      </div>
    </el-card>
  </el-row>
</template>
<script>
import api from "@/api/api";
export default {
  name: "Checkout",
  data() {
    return {
      sentence: "",
      author: "",
      status: this.$route.params.status,
    };
  },
  methods: {
    skip() {
      this.$router.replace({ name: "article" });
    },
  },
  created() {
    api.witticismOne("/witticism/one").then((res) => {
      this.sentence = res.data.sentence;
      this.author = res.data.author;
    });
  },
};
</script>
<style>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 642px;
}
.iconCheck {
  background-color: #7ed321;
  color: #fff;
  border-radius: 50%;
}
.iconClose {
  background-color: #d32121;
  color: #fff;
  border-radius: 50%;
}
.result {
  font-size: 14px;
  color: #3399ea;
  text-align: center;
  padding-top: 10px;
}
.sentence {
  padding: 10px;
  height: 100px;
  background-color: #f5f6f7;
  font-size: 14px;
  color: #6b6b6b;
}
.sentence p {
  margin: 0;
  padding: 10px 0;
}
.sentence p:last-of-type {
  text-align: right;
}
</style>