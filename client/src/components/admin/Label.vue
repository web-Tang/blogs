<template>
  <el-main>
    <h1>分类</h1>
    <el-row>
      <el-col>
        <el-button
          type="primary"
          @click="(dialogVisible = true), clickFlag('insert')"
          style="margin-bottom: 10px"
        >添加分类</el-button>

        <el-dialog
          title="分类"
          :visible.sync="dialogVisible"
          width="30%"
          :before-close="handleClose"
          :showClose="false"
        >
          <el-input v-model="category" placeholder="请输入分类名称"></el-input>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button
              type="primary"
              v-if="flag === 'modify'"
              @click="(dialogVisible = false), handleModify(modifyId, category)"
            >修改</el-button>
            <el-button
              type="primary"
              v-else
              @click="(dialogVisible = false), insertCategory(category)"
            >添加</el-button>
          </span>
        </el-dialog>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="12">
        <el-table :data="tableData" border fit stripe size="medium " highlight-current-row>
          <el-table-column type="index" label="序号" width="100"></el-table-column>
          <el-table-column prop="name" label="名称"></el-table-column>
          <el-table-column prop="createdAt" label="创建时间">
            <template slot-scope="scope">
              <span>{{ scope.row.createdAt }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="updatedAt" label="更新时间">
            <template slot-scope="scope">
              <span>{{ scope.row.updatedAt }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button @click="handleDelete(scope.row.id)" size="mini">删除</el-button>
              <el-button
                @click="
                  (dialogVisible = true),
                    clickFlag('modify', scope.row.id, scope.row.category_name)
                "
                size="mini"
              >编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>

    <el-row>
      <el-pagination
        background
        layout="prev, pager, next"
        @prev-click="toggle"
        @next-click="toggle"
        :total="count"
        :current-page.sync="current_page"
      ></el-pagination>
    </el-row>
  </el-main>
</template>

<script>
import api from "@/api/api";
export default {
  name: "labelNav",
  data() {
    return {
      tableData: [],
      count: 0,
      dialogVisible: false,
      category: "",
      flag: "",
      modifyId: "",
      current_page: 1,
    };
  },
  methods: {
    toggle(page) {
      this.allData(page);
    },
    allData(page = 1, limit = 10) {
      api
        .typeAll({
          page,
          limit,
        })
        .then((res) => {
          this.count = res.data.count;
          this.tableData = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
      this.current_page = 1;
    },
    // 删除分类
    handleDelete(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          api.typeDelete({ id }).then((res) => {
            let result;
            if (res.data) {
              result = "删除成功";
            } else {
              result = "删除失败";
            }
            this.$message({
              type: "success",
              message: result,
            });
            this.allData();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    // 添加分类函数
    insertCategory(name) {
      api.typeAdd({ name }).then((res) => {
        let result;
        if (res.data) {
          result = "添加成功";
        } else {
          result = "添加失败";
        }
        this.$message({
          type: "success",
          message: result,
        });
        this.allData();
      });
    },
    // 修改分类
    handleModify(id, name) {
      api
        .typeUpdate({ id, name })
        .then((res) => {
          let result;
          if (res.data) {
            result = "修改成功";
          } else {
            result = "修改失败";
          }
          this.$message({
            type: "success",
            message: result,
          });
          this.allData();
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    clickFlag(res, categoryId, category_name) {
      this.flag = res;
      this.modifyId = categoryId;
      this.category = category_name;
    },
  },
  created: function () {
    this.allData();
  },
};
</script>
