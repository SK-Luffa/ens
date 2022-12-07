<template>
  <div></div>
</template>
<script>
export default {
  name: "Blank",
  data() {
    return {};
  },
  methods: {},

  created() {
    let s = document.getElementsByTagName("body")[0];
    s.style.overflow = "auto";

    switch (this.$store.state.blank) {
      case null:

        this.$router.push("/");
        break;
      case "bank":
        this.$store.state.messagedetails = false;
        this.$router.push({
          path: '/store',
          query: {q: this.$store.state.item}
        });
        break;
      case "":
        this.$router.push("/");
        break;
      case "store":
        this.$router.push("/store");
        break;
      case "detail":
        this.$router.push("/detail");
        break;
      case "shoppingcar":
        this.$router.push("/shoppingcar");
        break;
      case "personalCenter":
        this.$router.push("/personalCenter");
        break;
      case "orderForm":
        this.$router.push("/orderForm");
        break;
      case "favorites":
        this.$router.push("/favorites");
        break;
      case "folder":
        this.$router.push("/folder");
        break;
      case "/orderForm":
        this.$router.push("/orderForm")
        break;
    }
  },
  mounted() {
  },
};
</script>
<style lang="less" scoped>
</style>
