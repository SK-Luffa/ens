
<template>
  <div class="root">
    <Message_DetailsVue v-if="this.$store.state.messagedetails" @shou="shou"></Message_DetailsVue>
    <Shou ref="shou" />
    <div class="contentx">
      <div class="titles">
        <div class="close_imgs" @click="Homereturn">
          <i class="el-icon-back"></i>
        </div>
        <div class="title_1">{{ title }}</div>
        <div class="title_2">{{ title_2 }}</div>
      </div>
      <Cell :linelist="linelist" @shou="shou" :consHeight="consHeight" :mx="'0.1'" :from="'store'"
        :deleteIcon="false" />
    </div>
<Bottom/>
  </div>
</template>
<script>
import Shou from "@/components/Screen/Shou";
import Bottom from "@/components/BottomNavigation"
import Message_DetailsVue from "@/components/Screen/Message_ Details.vue";
// import Delete from "@/components/delete"
import { sorting_list } from "@/utils/util";
import Cell from "@/components/Screen/Cell";

export default {
  components: {
    Bottom,
    Message_DetailsVue,
    // Delete,
    Shou,
    Cell,
    Bottom
  },
  name: 'APP',
  data() {
    return {
      linelist: [],
      consHeight: 0,
      leftclose: require("@/assets/img/leftclose.svg"),
      contents_x: 'contents_x',
      title: "",
      title_2: ""
    }
  },
  methods: {
    Homereturn(){
      this.$router.push("/")
    },
    shou(pd) {
      this.$refs.shou.shou(pd);
    },

  },
  destroyed(){
    console.log("destroyed");
    this.$store.state.messagedetails = false

    document.body.style.overflow = "auto"
  },
  created() {
    let vm = this;

    this.rq({
      url: "/api/product/selectCulling",
      method: "post",
      param: {
        productId: this.$route.query.pid
      },
      onError: function () { },
      vm,
    }).then((res) => {

      if (res.code == 200) {

        vm.linelist = res.data
        sorting_list(vm.linelist, vm);


      }
    });
    this.rq({
      url: "/api/product/selectById",
      method: "post",
      param: {
        productId: this.$route.query.pid
      },
      onError: function () { },
      vm,
    }).then((res) => {


      if (res.code == 200) {

        vm.title = res.data.title
        vm.title_2 = res.data.synopsis

        if (res.data.lenght == 0) {
          vm.consHeight = 0
        }
      }
    });


  },
  mounted() {
  },
}
</script>
<style lang="less" scoped>
.root {


  line-height: 0.14rem;

  .contentx {
    width: 100%;
    min-height: 10.8rem;
    padding-left: 0.14rem;
    padding-right: 0.14rem;
    box-sizing: border-box;
    padding-top: 0.25rem;

    .titles {
      width: 100%;
      // height: 1.67rem;
      padding-bottom: 0.16rem;
      background: #FFFFFF;
      border-radius: 0.36rem;
      overflow: hidden;
      padding-left: 0.27rem;
      padding-top: 0.16rem;
      box-sizing: border-box;

      .close_imgs {
        position: absolute;
        font-size: 0.24rem;
        color: #000;
      }

      .close_imgs:hover {
        cursor: pointer;
      }

      .title_1 {
        width: 100%;
        text-align: center;
        color: #000000;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 500;
        font-size: 0.16rem;
        line-height: 0.19rem;

      }

      .title_2 {
        padding-top: 0.16rem;
        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 400;
        font-size: 0.14rem;
        line-height: 0.20rem;
        color: #666666;
        width: 100%;
        text-align: center;

      }
    }


  }
}

.contents {
  margin-top: 0.16rem !important;
}

.contents_x {
  margin-top: 0.24rem !important;
}
</style>
