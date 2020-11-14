<template>
  <el-row type="flex" justify="space-between">
    <el-col>
      <strong class="author_name">
        {{artComment.visitorsName}}
        <span class="text">：{{artComment.content}}</span>
      </strong>
      <p class="reply_time">{{artComment.updatedAt}}</p>
    </el-col>
  </el-row>
</template>
<script>
import MyRedactframe from "./RedactFrame";
export default {
  name: "Reply",
  props: ["artComment"],
  components: {
    MyRedactframe,
  }
};
</script>
<style lang="scss">
.answer {
  background-color: #f8f9fa;
  border-radius: 5px;
  padding: 10px 20px;
}
.reply_time {
  margin: 0;
  font-size: 12px;
  color: #6c757d;
  margin-bottom: 10px;

  span {
    cursor: pointer;
    color: #5893c2;
    margin-right: 10px;
  }
}
</style>