<template>
  <div id="app">
    <img v-if="feed_visable" @click="feedback_show=true" class="feedback" :src="feedback" alt="" />

    <el-dialog v-if="feed_visable" close="tips" :visible.sync="feedback_show" custom-class="dialog" :destroy-on-close="true">
      <Contact :faster="feedback_show"></Contact>
    </el-dialog>

    <div class="tipsx" v-if="tip_visable && this.$store.state.tipsb">
      <img :src="loding" alt="">
    </div>

    <Navigation v-if="nav_visable" @search="handlerSearch" @logout="logout"/>

    <login v-show="this.$store.state.login" @login="login"/>

    <router-view class="content" ref="currentView"/>
  </div>
</template>

<script>
import Navigation from "@/components/Navigation";
import login from "@/components/Login";
import store from "./components/store/store";
import Contact from "@/components/Contact/index"
export default {
  name: "App",
  components: {
    login,
    Navigation,
    Contact
  },
  data() {
    return {
      feed_visable:true,
      nav_visable:true,
      tip_visable:true,
      feedback: require("@/assets/img/feedback.svg"),
      feedback_show: false,
      loding: require("@/assets/img/loding.gif")
    }
  },
  methods: {
    login() {
      let vm = this

      let cart = JSON.parse(localStorage.getItem("sshopping_car"));
      if (cart != null && cart.length > 0) {
        let list = [];
        cart.forEach(item => {
          list.push({
            productId: item.productId,
            imgType:item.imgType,
            productNum:item.productNum,
          })
        });

        this.rq({
          url: "/api/cart/saveAllOrder",
          method: "post",
          param: {
            orderList:list
          },
          onError: function () {
          },
          vm,
        }).then((res) => {
          // if (res.code == 200) {
            localStorage.setItem('sshopping_car', JSON.stringify([]));

            location.reload();
            // if(vm.$route.path=='/shoppingcar'){
            //   this.$refs.currentView.selectAll();
            // }
          // } else if(res.code == 400){
          //   localStorage.setItem('sshopping_car', JSON.stringify([]));
          // } else {
            if(vm.formData && vm.formData['res'])
              vm.formData['res'].msg = res.desc;
          // }
        });
      }else{
        location.reload();
        // if(vm.$route.path=='/shoppingcar'){
        //   this.$refs.currentView.selectAll();
        // }
      }
    },
    logout() {
      location.reload();
    },
    handlerSearch(ids) {
      let p={
        path: '/store',
        query:{}
      };
      if(this.$store.state.world!='')
        p['query'].q=this.$store.state.world;
      if(ids){
        p['query'].ids=ids;
      }
      this.$router.push(p);

      if(this.$refs.currentView.popstate){
        this.$refs.currentView.popstate();
      }

    },
    fontSize() {
      let deviceWidth = 1920;
      let cw = document.documentElement.clientWidth;
      if (cw >= 2560) {
        deviceWidth = cw;
        // else if (cw <= 1920 && cw >= 1680) {
        //     deviceWidth = 1680;
        // } else if (cw <= 1680 && cw >= 1200) {
        //     deviceWidth = 1680;
      } else if (cw < 1200) {
        deviceWidth = 1200;

      } else {
        deviceWidth = cw;

      }

      // if ('login' == pathname) {
      //     deviceWidth = cw > 1920 ? 1920 : cw < 1200 ? 1200 : cw;
      // } else if (!pathname || 'index' == pathname) {
      //     deviceWidth = cw > 1680 ? 1680 : cw < 1200 ? 1200 : cw;
      // } else {
      //     deviceWidth = cw > 1440 ? 1440 : cw < 1200 ? 1200 : cw;
      // }
      this.$store.state.fontRate = Math.round(deviceWidth / 1920 * 100);
      document.documentElement.style.fontSize = (this.$store.state.fontRate) + "px";

      this.$store.state.lw = Math.round(3.2 * this.$store.state.fontRate);
      // this.$store.state.lw=document.documentElement.clientWidth;
    }
  },
  beforeCreate() {

  },
  created() {
    
    if(window.location.pathname.indexOf("/sketch/")==0){
      this.feed_visable=false;
      this.nav_visable=false;
      this.tip_visable=false;
      document.body.style.marginTop = "0";
    }else{
      document.body.style.marginTop = "0.67rem";
    }

    this.$router.beforeEach((to, from, next) => {

      if (to.path === "/favorites") {
        this.$store.state.svgg = false;
        this.$store.state.svgs = true;
      } else if (to.path === "/shoppingcar") {
        this.$store.state.svgg = true;
        this.$store.state.svgs = false;
      } else {
        this.$store.state.svgg = false;
        this.$store.state.svgs = false;
      }

      next()
    })
  },
  mounted() {

    const _this = this;
    _this.fontSize();

    Array.prototype.minindex = function (arr) {
      var min = arr[0];
      var index = 0;
      for (var i = 0; i < arr.length; i++) {
        if (min > arr[i]) {
          min = arr[i];
          index = i;
        }
      }
      return index;
    };
    Array.prototype.max = function () {
      var max = this[0]; //将第一个值设置为最大值
      var len = this.length;
      for (var i = 1; i < len; i++) {
        if (this[i] > max) {
          max = this[i];
        }
      }
      return max;
    };
    Array.prototype.indexOf = function (val) {
      for (var i = 0; i < this.length; i++) {
        if (this[i] == val) return i;
      }
      return -1;
    };
    Array.prototype.remove = function (val) {
      var index = this.indexOf(val);
      if (index > -1) {
        this.splice(index, 1);
      }
    };


    window.onresize = () => {
      _this.fontSize();
      // console.log(1);
      // _this.$store.state.lw=document.documentElement.clientWidth;
      // let leftw=20*$fontRate;
      // let slistnumber = (document.documentElement.clientWidth - 287) / 257;
      // vm.listnumber = Math.floor(slistnumber);
      // this.clientWidth = document.documentElement.clientWidth;
    };
  },
};
</script>

<style lang="less">
.feedback {
      position: fixed;
      bottom: 2.1rem;
      right: 0rem;
      z-index: 10;
      opacity: 0.7;
      border-radius: 14px 0px 0px 14px;
    }
        .feedback:hover{
            opacity: 0.8;
            box-shadow: -4px 4px 10px rgba(13, 88, 234, 0.4);
        }
#app {
  position: relative;

  overflow: hidden;
}

.tipsx {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
  position: fixed;
  z-index: 2147483647;
  top: 0;

  img {
    width: 0.71rem;
    height: 0.71rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
  }
}

.content {
  height: 100%;
  width: 100%;
  // position: absolute;
  // top: 0;
  // margin-top: -0.23rem;
}

* {
  margin: 0;
  padding: 0;

}

body {
  line-height: 1;
  min-height: 9.024rem;
  background-color: #F7F9FD !important;
}

div:hover {
  cursor: default;
}

.el-message {
  max-height: 70vh;
  overflow-y: auto;
}
 .dialog {
   width: 4.8rem !important;
   background: #fff;
   height: 5.7rem;
   right: 0.6rem !important;
   position: absolute !important;
  border-radius: 0.20rem !important;
 }

 .el-dialog__body {
   padding-top: 0rem !important;
 }

 .content {
   top: -0.1rem !important;
   padding-left: 0rem !important;
   padding-right: 0rem !important;
 }

 .contact_root .content .title {
   margin-bottom: 0.24rem !important;

 }

 .names {
   line-height: 0.16rem !important;
   font-size: 0.16rem !important;
   margin-bottom: 0.24rem !important;

 }



 .contact_root .content .names .textareas textarea {
   height: 2rem !important;
 }
.el-icon-close{
  font-size: 0.25rem;

}

.el-dialog__header{
  padding-top:0.24rem !important ;
}
 .el-dialog__headerbtn {
   z-index: 2;
 }
</style>
