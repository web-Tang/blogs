<template>
  <el-container>
    <div id="menu">
      <i
        class="el-icon-menu"
        style="
          position: absolute;
          font-size: 20px;
          margin-left: 22px;
          margin-top: 25px;
          cursor: pointer;
          color: #fff;
        "
        @click="IsCollapse"
      ></i>
    </div>
    <el-header>
      <el-row class="header_row">
        <h4 class="h4">博客后台管理</h4>
        <div class="userMsg">
          <!-- 头像 -->
          <el-avatar
            class="portrait"
            :size="40"
            :src="userdata.pictureUrl"
            fit="contain"
            icon="el-icon-user-solid"
          ></el-avatar>
          <!-- 用户下拉 -->
          <el-dropdown trigger="click" @command="quit">
            <span class="el-dropdown-link username">
              {{ userdata.name }}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-switch-button"
                >退出</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="IsCollapse ? 80px : 300px">
        <el-menu
          :default-active="itemindex"
          background-color="rgba(238,238,238,.2)"
          text-color="#666"
          active-text-color="#79171c"
          class="el-menu-vertical-demo"
          :collapse="isCollapse"
          :collapse-transition="true"
        >
          <el-menu-item
            v-for="item in MenuList"
            :key="item.index"
            :index="item.index + ''"
            @click="MenuFunc(item)"
          >
            <i :class="item.icon"></i>
            <span slot="title">{{ item.title }}</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main style="padding-left:15px">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { mapState } from "vuex";
const MenuList = [
  { index: 0, title: "数据统计", icon: "el-icon-s-data", RouterName: "index" },
  {
    index: 1,
    title: "发布文章",
    icon: "el-icon-edit-outline",
    RouterName: "publish",
  },
  {
    index: 2,
    title: "文章管理",
    icon: "el-icon-tickets",
    RouterName: "article",
  },
  { index: 3, title: "页面管理", icon: "el-icon-reading", RouterName: "page" },
  {
    index: 4,
    title: "分类/标签",
    icon: "el-icon-price-tag",
    RouterName: "label",
  },
  { index: 5, title: "文件管理", icon: "el-icon-s-help", RouterName: "file" },
  { index: 6, title: "专栏管理", icon: "el-icon-link", RouterName: "columnz" },
  {
    index: 7,
    title: "系统设置",
    icon: "el-icon-setting",
    RouterName: "settings",
  },
  { index: 8, title: "用户中心", icon: "el-icon-user", RouterName: "user" },
];
export default {
  name: "admin",
  data() {
    return {
      MenuList,
      isCollapse: false,
      itemindex: null,
    };
  },
  computed: {
    ...mapState(["userdata"]),
  },
  methods: {
    indexFn() {
      // 导航栏选中当前位置
      const checked = MenuList.filter(
        (item) => this.$route.path.indexOf(item.RouterName) != -1
      );
      if (checked.length != 0) {
        this.itemindex = checked[0].index + "";
      }
    },
    MenuFunc(item) {
      const path = this.$route.path;
      const val = item.RouterName;
      if (path.indexOf(val) === -1) {
        this.$router.replace({ name: val });
      }
    },
    IsCollapse() {
      this.isCollapse = !this.isCollapse;
    },
    quit() {
      this.$store.dispatch("loginOut");
      this.$router.replace({ name: "login" });
    },
  },
  async created() {
    this.indexFn();
    await this.$store.dispatch("userObj");
  },
};
</script>

<style lang="scss">
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 150px;
}
.el-header {
  font-size: 20px;
  font-weight: bold;
  background-color: rgb(84, 92, 100);
  color: #fff;
  text-align: center;
  line-height: 60px;
  .header_row {
    height: 100%;
    position: relative;
    margin: 0 auto;
    width: 95%;
    .h4 {
      margin: 0 auto;
      display: inline-block;
      vertical-align: middle;
    }
    .userMsg {
      height: 100%;
      position: absolute;
      right: 0px;
      top: 0px;
      .portrait {
        vertical-align: middle;
        margin-right: 10px;
        img {
          margin: 0 auto;
        }
      }
      .username {
        color: #fff;
        cursor: pointer;
      }
    }
  }
}
</style>
