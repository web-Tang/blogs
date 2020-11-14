<template>
  <el-col>
    <el-input
      type="textarea"
      :rows="2"
      placeholder="撰写评论..."
      v-model="content"
      resize="none"
    ></el-input>
    <el-row type="flex" justify="end">
      <el-button
        type="primary"
        class="comment_btn"
        :size="size"
        @click="openDialog"
        >游客评论</el-button
      >
    </el-row>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="20%"
      :close-on-click-modal="false"
    >
      <span style="display: block;padding-bottom: 10px;"
        >以下名称将作为当前文章的评论名称：</span
      >
      <el-input
        type="text"
        placeholder="请输入内容"
        v-model="visitorsName"
        maxlength="20"
        show-word-limit
      >
      </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" :size="size">取 消</el-button>
        <el-button type="primary" @click="submitComment()" :size="size"
          >发表评论</el-button
        >
      </span>
    </el-dialog>
  </el-col>
</template>
<script>
import api from "@/api/api";
export default {
  props: ["ArticleId"],
  name: "RedactFrame",
  data() {
    return {
      content: "",
      visitorsName: "user_" + new Date().getTime(),
      dialogVisible: false,
      size: "small",
      savaUserName: "",
    };
  },
  methods: {
    async openDialog() {
      if (this.content == "") {
        this.$message({
          message: "未评论任何内容",
          type: "warning",
        });
        return;
      }

      // 判断游客是否是第一次在当前文章评论
      if (this.savaUserName) {
        this.dialogState(false);
        const result = await this.request();
        this.commentResult(result);
      } else {
        this.dialogState(true);
      }
    },
    async submitComment() {
      // 验证名称是否为空
      if (this.visitorsName == "") {
        this.$message({
          message: "名称不能为空",
          type: "warning",
        });
        this.dialogState(true);
        return;
      }

      // 保存用户名称，避免重复生成名字
      if (this.savaUserName == "") {
        this.savaUserName = this.visitorsName;
      }

      const result = await this.request();
      this.commentResult(result);
    },
    async request() {
      const params = {
        ArticleId: this.ArticleId,
        content: this.content,
        visitorsName: this.savaUserName,
      };
      const res = await api.articlesAddComment(params);
      const result = res.data;
      if (result) {
        this.$notify({
          title: "成功",
          message: "评论成功",
          type: "success",
        });
        this.content = "";
      } else {
        this.$notify.error({
          title: "错误",
          message: "评论失败",
        });
      }
      this.dialogState(!result);
      return result;
    },
    commentResult(result) {
      this.$emit("commentResult", result);
    },
    dialogState(boolean = false) {
      this.dialogVisible = boolean;
    },
  },
};
</script>
