<template>
  <div>
    <!-- <div class="title">
      <div @click="title_text_click(1)" class="title_text" :class="one">
        Order
      </div>

    </div> -->
    <router-view />
  </div>
</template>
<script>
export default {
  name: "OrderForm",
  data() {
    return {
      one: "title_click",
      two: "",
    };
  },
  methods: {
    //   点击头部标题
    title_text_click(a) {
 this.$store.state.titlems=a

      switch (a) {
        case 1:
      
          this.$store.state.blank="/orderForm"
          this.$store.state.title=""
       
           this.$router.push("/blank");
          return;
        case 2:
         
          this.$store.state.blank="/orderForm"
           this.$store.state.title="w"
          this.$router.push("/blank");
          return;
      }
    },
  },
  created() {},
  mounted() {
    
      this.one = this.two = "";

      switch (this.$store.state.titlems) {
        case 1:
          this.one = "title_click";
        
          return;
        case 2:
          this.two = "title_click";
        
          return;
      }
    },

};
</script>
<style lang="less" scoped>
.title {
  width: 100%;
  height: 0.56rem;
  background: #fff;
  border-radius: 0.14rem;
  display: flex;
  .title_text {
    height: 0.44rem;
    line-height: 0.44rem;
    margin-left: 0.22rem;
    font-family: "PingFang SC";
    font-style: normal;
    font-weight: 400;
    font-size: 0.14rem;
  }
  .title_text:hover {
    cursor: pointer;
  }
  .title_click {
    border-bottom: #373acb solid 0.02rem;
    color: #373acb;
  }
}
</style>
