<template>
  <el-container>
    <el-main>
      <h1>文章管理</h1>
      <!--搜索功能-->
      <el-row>
        <el-col :span="8" :xs="8">
          <el-input
            placeholder="根据文章标题搜索"
            v-model="search"
            clearable
          ></el-input>
        </el-col>
        <el-button
          style="margin-left:15px;"
          type="primary"
          icon="el-icon-search"
          @click="SearchArtcle"
        ></el-button>
      </el-row>

      <!--表格-->
      <el-row>
        <el-col :span="18">
          <el-table
            :data.sync="tableData"
            style="width: 100%"
            fit
            border
            highlight-current-row
          >
            <el-table-column
              fixed
              label="序号"
              type="index"
              width="80"
            ></el-table-column>

            <el-table-column
              prop="title"
              label="标题"
              width="170"
              show-overflow-tooltip
            ></el-table-column>

            <el-table-column
              prop="tags"
              label="分类"
              width="100"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <span>{{ changeTag(scope.row.tags) }}</span>
              </template>
            </el-table-column>

            <el-table-column prop="createdAt" label="发布时间" width="200">
              <template slot-scope="scope">
                <span>{{ scope.row.createdAt }}</span>
              </template>
            </el-table-column>

            <el-table-column prop="updatedAt" label="更新时间" width="200">
              <template slot-scope="scope">
                <span>{{ scope.row.updatedAt }}</span>
              </template>
            </el-table-column>

            <el-table-column prop="readNum" label="浏览量" width="100">
              <template slot-scope="scope">
                <span>{{ scope.row.readNum }}</span>
              </template>
            </el-table-column>

            <el-table-column label="发布形式" show-overflow-tooltip width="80">
              <template slot-scope="scope">
                <span>{{ scope.row.form == 1 ? "公开" : "私密" }}</span>
              </template>
            </el-table-column>

            <el-table-column label="发布状态" show-overflow-tooltip width="80">
              <template slot-scope="scope">
                <span>{{
                  scope.row.articleState == "publish" ? "发布中" : "保存草稿"
                }}</span>
              </template>
            </el-table-column>

            <el-table-column label="操作" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-button @click="handleDelete(scope.row.id)" size="mini"
                  >删除</el-button
                >
                <el-button
                  @click="(dialogFormVisible = true), handleEdit(scope.row)"
                  size="mini"
                  >编辑</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>

      <!--分页-->
      <el-row>
        <el-pagination
          background
          layout="prev, pager, next"
          @prev-click="toggle"
          @next-click="toggle"
          :total="count"
        ></el-pagination>
      </el-row>

      <!-- 编辑 -->
      <el-dialog
        id="mydialog"
        title="修改"
        width="360px"
        center
        :visible.sync="dialogFormVisible"
      >
        <el-row type="flex" justify="center">
          <el-input
            placeholder="请输入标题"
            v-model="articleMsg.title"
            clearable
          ></el-input>
        </el-row>

        <el-row type="flex" justify="center">
          <my-tag
            style="width:100%"
            :tagArr="articleMsg.tags"
            :tags="options"
            @getTags="getTags"
          ></my-tag>
        </el-row>

        <el-row type="flex" justify="center">
          <el-select
            style="width:100%"
            v-model="articleMsg.articleState"
            placeholder="请选择发布形式"
          >
            <el-option
              v-for="item in [
                { value: 'save', label: '保存草稿' },
                { value: 'publish', label: '发布中' },
              ]"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-row>

        <el-row type="flex">
          <el-radio v-model="articleMsg.form" label="1" border>公开</el-radio>
          <el-radio v-model="articleMsg.form" label="0" border>私密</el-radio>
        </el-row>

        <div slot="footer">
          <el-button style="width:100%" type="primary" @click="updateArtcle"
            >修改</el-button
          >
        </div>
      </el-dialog>
    </el-main>
  </el-container>
</template>

<script>
import myTag from "./Tag";
import api from "@/api/api";
export default {
  name: "articleNav",
  data() {
    return {
      articleMsg: {},
      count: 0,
      tableData: [],
      search: "",
      dialogFormVisible: false,
      options: [],
    };
  },
  methods: {
    getTags(val) {
      // 用于接收tag返回来的值
      this.articleMsg.tags = val;
    },
    changeTag(tagArr) {
      if (!tagArr) {
        return '';
      }
      return tagArr.map((item) => item.name).join(",");
    },
    toggle(pageIndex) {
      this.getArtcleData(pageIndex);
    },
    handleEdit(row) {
      // 克隆数组
      const cloneTagArr = JSON.parse(JSON.stringify(row.tags));
      this.articleMsg = {
        id: row.id,
        title: row.title,
        tags: cloneTagArr,
        articleState: row.articleState,
        form: row.form,
      };
    },
    handleDelete(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const res = await api.articlesDelete({ id });
          let msg;
          if (res.data) {
            this.getArtcleData();
            msg = "删除成功";
          } else {
            msg = "删除失败";
          }
          this.$message({
            type: "success",
            message: msg,
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    SearchArtcle() {
      this.getArtcleData();
    },
    async updateArtcle() {
      const res = await api.articlesUpdate(this.articleMsg);
      let msg;
      if (res.data) {
        msg = "修改成功";
        this.getArtcleData();
      } else {
        msg = "修改失败";
      }
      this.$message({
        type: "success",
        message: msg,
      });
      this.dialogFormVisible = false;
    },
    async getArtcleData(page = 1) {
      const self = this;
      const json = {
        title: self.search == "" ? undefined : self.search,
        page,
      };
      const res = await api.articlesAll(json);
      this.count = res.data.count;
      this.tableData = res.data.data;
    },
    async getTagData() {
      const res = await api.typeAll();
      this.options = res.data.data;
    },
  },
  created: function() {
    this.getArtcleData();
    this.getTagData();
  },
  components: {
    myTag,
  },
};
</script>

<style lang="scss">
.el-row {
  margin-bottom: 20px;
}
#mydialog {
  .el-row {
    margin-bottom: 0;
    &:nth-of-type(n + 1) {
      margin-top: 20px;
    }
  }
}
.el-col {
  border-radius: 4px;
}
</style>
