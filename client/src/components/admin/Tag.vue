<template>
  <el-popover placement="bottom" :width="tags.length > 5 ? 340 : ''" title="类型" trigger="hover">

    <el-tag
      v-for="tag in tags"
      :key="tag.name"
      style="margin-right:10px;margin-top:10px; cursor: pointer;"
      @click="tagClick(tag)"
    >{{tag.name}}</el-tag>

    <div slot="reference" class="tagsChunk">
      <span v-if="tagArr.length == 0">选择类型</span>
      <el-tag
        v-else
        v-for="(item, index) in tagArr"
        :key="item.id"
        :closable="true"
        :disable-transitions="true"
        style="margin-right:10px;cursor: pointer;"
        @close="tagClose(index)"
      >{{item.name}}</el-tag>

    </div>
  </el-popover>
</template>
<script>
export default {
  name: "Tag",
  props: ["tags", "tagArr"],
  methods: {
    tagClick(tag) {
      if (this.tagArr.length > 2) {
        this.$message({
          message: "最多添加3条",
          type: "warning",
        });
        return;
      }
      this.tagArr.push(tag);
      this.$emit("getTags", this.tagArr);
    },
    tagClose(index) {
      this.tagArr.splice(index, 1);
    },
  },
};
</script>
<style scoped>
.tagsChunk {
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  font-size: 14px;
  line-height: 40px;
  outline: 0;
  padding: 0 15px;
  width: 100%;
  cursor: pointer;
  color: #c0c4cc;
}
</style>