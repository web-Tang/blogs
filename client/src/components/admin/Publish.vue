<template>
  <el-container>
    <el-row>
      <el-main>
        <h1>发布文章</h1>

        <!-- 文章标题 -->
        <el-row>
          <el-col :span="12">
            <el-input
              v-model="title"
              placeholder="请输入文章标题"
              clearable
            ></el-input>
          </el-col>
        </el-row>

        <!-- 标签 -->
        <el-row>
          <el-col :span="12">
            <my-tag
              :tagArr="tagArr"
              :tags="options"
              @getTags="getTags"
            ></my-tag>
          </el-col>
        </el-row>

        <!-- 发布形式 -->
        <el-row>
          <el-radio v-model="form" label="1" border>公开</el-radio>
          <el-radio v-model="form" label="0" border>私密</el-radio>
        </el-row>

        <!-- 封面图上传 -->
        <el-row>
          <el-upload
            class="upload-demo"
            action="string"
            accept="image/jpeg, image/png, image/jpg"
            :http-request="uploadSectionFile"
            :on-remove="handleRemove"
            :file-list="fileList"
            :limit="1"
            list-type="picture"
            style="width: 50%"
          >
            <el-button size="small" type="primary">上传文章封面图</el-button>
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
        </el-row>

        <!-- 文章编辑 -->
        <el-row>
          <el-col>
            <div id="editor">
              <mavon-editor
                style="height: 100%;width: 100%"
                v-model="md"
                ref="md"
                @imgAdd="$imgAdd"
                @change="htmlChange"
                @imgDel="$imgDel"
              ></mavon-editor>
            </div>
          </el-col>
        </el-row>

        <!-- 操作 -->
        <el-row>
          <el-col>
            <el-button type="success" @click="PublishButton"
              >文章发布</el-button
            >
            <el-button type="primary" @click="PublishSave">保存草稿</el-button>
          </el-col>
        </el-row>
      </el-main>
    </el-row>
  </el-container>
</template>

<script>
import { mavonEditor } from "mavon-editor";
import myTag from "./Tag";
import api from "@/api/api";
export default {
  name: "pulishNav",
  data() {
    return {
      form: "1",
      md: "", // 文章内容
      title: "", // 文章标题
      options: [],
      coverUrl: "", // 图片上传aliyun返回的url
      html: "", // markdown解析成html
      fileList: [],
      tempId: undefined,
      tags: [],
      tagArr: [],
    };
  },
  methods: {
    getTags(val) {
      this.tags = val;
    },
    async PublishButton() {
      // 发布文章
      if (this.md) {
        const res = await this.request("publish");
        const result = res.data;
        // 文章发布状态
        this.$router.replace({
          name: "checkout",
          params: {
            status: result,
          },
        });
      } else {
        alert("文章内容不能不空！");
      }
    },
    async PublishSave() {
      // 保存文章
      if (this.md) {
        const res = await this.request("save");
        const result = res.data;
        if (result) {
          // 保存文章ID，方便再次保存
          if (result.id) {
            this.tempId = result.id;
          }
          this.$message({
            message: "文章保存成功",
            type: "success",
          });
        } else {
          this.$message.error("文章保存失败");
        }
      } else {
        alert("文章内容不能不空！");
      }
    },
    request(status) {
      const UserId = this.$store.state.userId;
      return api.articlesCreate({
        id: this.tempId,
        title: this.title,
        html: this.html,
        md: this.md,
        form: this.form,
        coverUrl: this.coverUrl,
        articleState: status,
        tags: this.tags,
        UserId,
      });
    },
    getTypeData() {
      api
        .typeAll()
        .then((res) => {
          this.options = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleRemove() {
      // 删除封面图触发的函数
      this.imgRemove(this.coverUrl);
    },
    imgRemove(urlname) {
      api.uploadDelete({
        urlname,
      });
    },
    $imgDel(file) {
      this.imgRemove(file[0]);
    },
    $imgAdd(pos, $file) {
      const formdata = new FormData();
      formdata.append("upload", $file);
      api.uploadTransfer(formdata).then((res) => {
        this.$refs.md.$img2Url(pos, `${res.data}`);
      });
    },
    htmlChange(value, render) {
      this.html = render;
    },
    uploadSectionFile(param) {
      // 封面上传触发函数
      var fileObj = param.file;
      var formData = new FormData();
      formData.append("upload", fileObj);

      api
        .uploadTransfer(formData)
        .then((res) => {
          this.coverUrl = res.data;
          alert("上传成功");
        })
        .catch((err) => {
          console.log(err);
          alert("上传失败");
        });
    },
  },
  created: function() {
    // return;
    this.getTypeData();
  },
  components: {
    myTag,
  },
};
</script>

<style scoped>
#editor {
  margin: auto;
  width: 100%;
  height: 700px;
}

.el-row {
  margin-bottom: 20px;
}
</style>
