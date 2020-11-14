<template>
  <div id="background_image">
    <div class="navbar bg-white shadow-sm">
      <div class="container">
        <router-link class="navbar-brand" :to="{ name: 'home' }"
          >博客主页</router-link
        >
        <div style="float: right">
          <a
            :class="{
              linkStyle: true,
              'el-icon-s-custom': item.RouterName == 'login',
            }"
            v-for="item in MenuList"
            :key="item.id"
            @click="to(item.RouterName)"
            >{{ item.title }}</a
          >
        </div>
      </div>
    </div>

    <div class="container container_view">
      <el-row>
        <el-col :span="24">
          <router-view></router-view>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
const MenuList = [
  { id: 0, RouterName: "home", title: "首页" },
  { id: 1, RouterName: "forum", title: "论坛" },
  { id: 2, RouterName: "laboratory", title: "统计" },
  { id: 3, RouterName: "column", title: "专栏" },
  { id: 4, RouterName: "about", title: "关于" },
  { id: 5, RouterName: "login", title: "后台登录" },
];
export default {
  name: "front",
  data() {
    return {
      MenuList,
    };
  },
  methods: {
    to(to) {
      const from = this.$route.path;
      if ((from == "/" && to != "home") || from != "/") {
        if (from.indexOf(to) === -1) {
          this.$router.push({ name: to });
        }
      }
    },
  },
};
</script>

<style lang="scss">
.container_view {
  max-width: 1200px;
  overflow-x: hidden;
}
.linkStyle {
  font-size: 1rem;
  margin: 0 5px;
  cursor: pointer;
}

.navbar {
  position: relative;
  padding: 0.5rem 1rem;
  height: 40px;
  background-color: #fff !important;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075) !important;
}
.navbar-brand {
  font-size: 20px;
  white-space: nowrap;
  font-weight: bold;
}

.container {
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
  max-width: 1000px;
  margin-top: 5px;
}
</style>
