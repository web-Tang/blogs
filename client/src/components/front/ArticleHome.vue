<template>
  <el-container>
    <el-main style="margin-bottom:40px;">
      <section class="article_bg">
        <el-row>
          <router-link :to="{ name: 'UserHome' }">
            <el-avatar :size="40" :src="circleUrl"></el-avatar>
            <strong class="author_name">{{ username }}</strong>
          </router-link>
        </el-row>
        <el-row>
          <h1 style="font-size:32px">{{ ArticleObj.title }}</h1>
        </el-row>
        <el-row>
          <el-tag v-for="item in ArticleObj.tags" :key="item.id">{{
            item.name
          }}</el-tag>
          <span class="article_time">发布于 {{ ArticleObj.updatedAt }}</span>
        </el-row>
        <el-row>
          <div
            class="markdown-body"
            v-html="ArticleObj.html"
            style="margin-top:20px;"
          />
        </el-row>
      </section>

      <section class="loadComment" v-if="commentState">
        <el-link type="primary" @click="toggle">
          <i class="el-icon-view el-icon--right"></i>
          查看评论
        </el-link>
      </section>

      <section class="comment" v-else>
        <!-- 用户评论区 -->
        <el-row type="flex" justify="space-between">
          <!-- 评论 -->
          <my-redactframe
            :ArticleId="ArticleId"
            @commentResult="commentResult"
          ></my-redactframe>
        </el-row>
        <!-- 用户交流区 -->
        <my-reply
          v-for="(item, index) in userCommentArr"
          :key="item.id"
          :artComment="item"
          :class="{
            borderBottom: index != userCommentArr.length - 1,
          }"
        ></my-reply>
        <!-- 分页 -->
        <el-pagination
          small
          layout="prev, pager, next"
          :page-size="5"
          :total="commentCount"
          @prev-click="prev"
          @next-click="next"
          @current-change="current"
          :hide-on-single-page="true"
        >
        </el-pagination>
      </section>
    </el-main>
    <el-aside class="author_box">Aside</el-aside>
  </el-container>
</template>
<script>
import "mavon-editor/dist/markdown/github-markdown.min.css";
import MyRedactframe from "./RedactFrame";
import MyReply from "./Reply";
import api from "@/api/api";
export default {
  name: "ArticleHome",
  created() {
    const params = this.$route.params;
    this.circleUrl = params.portraitUrl;
    this.username = params.name;
    this.ArticleId = params.id;
    api.articlesContent({ ArticleId: params.id }).then((res) => {
      this.ArticleObj = res.data;
    });
  },
  data() {
    return {
      ArticleId: null,
      commentCount: 0,
      commentState: true,
      username: "",
      circleUrl: "",
      textarea: "",
      ArticleObj: {},
      userCommentArr: [],
    };
  },
  methods: {
    commentResult(result) {
      // 评论成功则刷新评论区
      result && this.request();
    },
    current(page) {
      this.request({ page });
    },
    prev(page) {
      this.request({ page });
    },
    next(page) {
      this.request({ page });
    },
    toggle() {
      this.commentState = false;
      this.request();
    },
    request(options = {}) {
      // 评论请求
      api
        .articlesComment({
          ArticleId: this.ArticleId,
          ...options,
        })
        .then((res) => {
          this.commentCount = res.data.count;
          this.userCommentArr = res.data.rows;
        });
    },
  },
  components: {
    MyRedactframe,
    MyReply,
  },
};
</script>
<style lang="scss">
.article_bg,
.comment,
.loadComment,
.author_box {
  padding: 30px;
  background-color: #fff;
  border-radius: 5px;
}

.article_bg,
.comment {
  .author_name {
    font-size: 14px;
    display: inline-block;
    vertical-align: top;
    line-height: 40px;
    padding-left: 10px;
    color: #3490dc;
    cursor: pointer;
    &:hover {
      color: #000;
    }
  }
}

.loadComment {
  padding: 10px 30px;
  text-align: center;
  margin-top: 20px;
  a {
    font-size: 16px;
  }
}

.article_bg {
  h1 {
    margin: 0;
  }
  .article_time {
    margin-left: 10px;
    font-size: 12px;
    color: #6c757d;
  }
  .el-tag {
    height: 25px;
    line-height: 25px;
    margin-right: 10px;
  }
}
.comment {
  margin-top: 20px;
  .comment_btn {
    margin: 10px 0;
  }
  .author_name {
    line-height: 35px;
    padding-left: 0px;
    .text {
      font-size: 14px;
      font-weight: normal;
      color: #000;
    }
  }
  .borderBottom {
    border-bottom: solid 1px #e8e8ee;
  }
  .el-row {
    margin-bottom: 5px;
  }
}
.author_box {
  width: 200px;
  height: 500px;
  margin-top: 20px;
}
</style>
