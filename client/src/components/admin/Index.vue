<template>
  <div>
    <h1>数据统计</h1>
    <button @click="loding">click</button>
  </div>
</template>

<script>
export default {
  name: "indexNav",
  methods: {
    loding() {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      setTimeout((res) => {
        loading.close();
      }, 2000);
    },
  },
};
</script>
