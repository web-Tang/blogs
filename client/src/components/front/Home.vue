<template>
  <el-main style="padding-top: 30px">
    <el-row v-for="article in article_list" :key="article.id">
      <article class="excerpt" style="background-color: #ffffff">
        <router-link
          :to="{ 
            name: 'ArticleHome', 
            params: { 
              id:article.id, 
              name:article.username,
              portraitUrl:article.pictureUrl 
            }
          }"
        >
          <el-row type="flex" justify="space-between">
            <el-col
              :style="{
                marginRight: article.coverUrl != '' ? '30px' : 0
              }"
            >
              <h2 target="_blank" :title="article.title">{{ article.title }}</h2>
              <p class="content">{{ article.html }}</p>
            </el-col>
            <el-col v-if="article.coverUrl" :span="3">
              <el-image class="cover" :src="article.coverUrl" fit="cover"></el-image>
            </el-col>
          </el-row>
        </router-link>

        <el-row>
          <p class="userMsg">
            <span class="el-icon-s-custom">
              <router-link :to="{name:'UserHome'}">{{article.username}}</router-link>
            </span>
            <span class="el-icon-time">
              <a>{{article.updatedAt}}</a>
            </span>
            <span class="el-icon-view">
              <a>{{article.readNum}}</a>
            </span>
          </p>
        </el-row>
      </article>
    </el-row>
  </el-main>
</template>

<script>
import api from "@/api/api";
export default {
  name: "home",
  created() {
    api.articlesList().then((res) => {
      this.article_list = res.data;
    });
  },
  data() {
    return {
      article_list: [],
    };
  },
};
</script>

<style lang="scss">
.excerpt {
  border-bottom: 1px solid #eee;
  padding: 20px;

  h2 {
    font-size: 20px;
    margin: 5px 0;
    font-weight: 500;
    line-height: 25px;
    a {
      color: #444;
    }
  }
  .focus {
    margin: 10px 0 0;
    overflow: hidden;
    width: 25.3%;
  }
  .content {
    color: #888;
    font-size: 14px;
    line-height: 22px;
    margin: 0;

    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
  .cover {
    display: block;
    width: 100px;
    height: 100px;
    border-radius: 5px;
    background-size: cover;
    background-repeat: no-repeat;
  }
  .userMsg {
    font-size: 12px;
    margin: 10px 0 0;
    color: #3490dc;
    span {
      margin-right: 20px;
    }
    a {
      padding-left: 5px;
    }
  }
}
</style>
