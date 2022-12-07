<template>
  <div class="roots">
<div class="conters">
    <div class="close" @click="closes()">
        <img :src="leftclose" alt="">
    </div>
    <div class="title">{{ title }}</div>
    <div class="content_etails"></div>
    <div class="bottoms">
© 2022 Patternbuy limited. All rights reserved 
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
        title:'',
      
    }
  },
  methods: {
      closes(){
          this.$router.push("./blog")
      }
  },
    created() {


    },
  mounted () {
      let vm = this;
      this.rq({
          url: "/api/archives/blogContentById",
          method: "post",
          param: {
              substanceId: window.location.href.split("etails")[2].split("=")[1]
          },
          onError: function () { },
          vm,
      }).then((res) => {
          vm.lock = true;
          if (res.code == 200) {
              vm.title = res.data.title;
              document.getElementsByClassName("content_etails")[0].innerHTML = res.data.substance
             
          }
      });
   
  },
}
</script> 
<style lang="less" scoped>
.roots{
    line-height: 0.14rem;
    display: flex;
    justify-content: center;
    text-align: left;
    .conters{
        width: 12rem;
        padding-top: 0.16rem;
        font-size: 14px;
            line-height: 28px;
        .close{
            width: 0.4rem;
            height: 0.4rem;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .title{
            margin-top: 0.16rem;
            font-family: 'PingFang SC';
                font-style: normal;
                font-weight: 600;
                font-size: 0.24rem;
                line-height: 0.34rem;
                color: #222222;
                padding-bottom: 0.32rem;

        }
        .content_etails{
            min-height: 7rem;
        }
        .bottoms{
           height: 0.73rem;
           width: 100%;
           border-top:1px solid #CCCCCC; 
           line-height: 0.73rem;
        font-family: 'Inter';
            font-style: normal;
            font-weight: 500;
            font-size: 0.14rem;
            color: #707070;
            text-align: center;
        }
    }
}
</style>
