
<template>
  <div class="root">
<div class="contentx">
    <div class="close_imgs">
    <img :src="leftclose" alt="">
    </div>
</div>
  </div>
</template>
<script>
export default {
  name: 'APP',
  data () {
    return {
        leftclose: require("@/assets/img/leftclose.svg"),
    }
  },
  methods: {
  },
  created () {
      let vm = this;
    
      this.rq({
          url: "/api/product/selectCulling",
          method: "post",
          param: {
              id: this.$route.query.pid
          },
          onError: function () { },
          vm,
      }).then((res) => {
      
          if (res.code == 200) {

          


          }
      });

  },
  mounted () {
  },
}
</script>
<style lang="less" scoped>
.root{
  
    
        line-height: 0.14rem;
        .contentx{
            width: 100%;
            min-height: 10.8rem;
            padding-left:3.6rem ;
            padding-right: 3.6rem;
            box-sizing: border-box;
            padding-top:0.16rem ;
            .close_imgs{
                position: absolute;

            }
        }
}
</style>
