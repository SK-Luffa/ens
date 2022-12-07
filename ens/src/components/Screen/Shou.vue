<template>
  <div class="alerts" v-show="alert" @click="close">
    <div class="alert" @click.stop="">
      <div class="close">
        <div class="text"> Select favorites</div>

        <i @click.stop="close" class="el-icon-close"></i>
      </div>
      <div class="input_so">
        <img :src="so" alt="" />

        <input autocomplete="new-password" v-model="valuex" type="text" id="" />
      </div>
      <!-- 收藏列表 -->
      <div class="con_list">
        <!-- 单项 -->
        <div class="term" v-for="(item, index) in CollectionList" :key="index">
          <div class="term_text">{{ item.title }}</div>

          <div class="Done" v-show="item.hasProduct == 0" @click="addDone(item.folderId)">
            SAVE
          </div>
          <div class="Included" @click="del(item.folderId)" v-show="item.hasProduct != 0">Saved</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
  },
  data() {
    return {
      pd: null,
      CollectionList: [],
      alert: false,
      valuex: "",
      so: require("@/assets/img/so.svg"),
      blankImage: require("@/assets/img/blank.svg"),
    };
  },
  methods: {
    shou(pd) {
      let vm = this;
      vm.pd = pd;

      vm.rq({
        url: "/api/personal/selectBookmarkSimple",
        method: "post",
        param: {
          pageSize: 20,
          pageNum: 1,
          productId: vm.pd.productId,
          title: "%" + (vm.valuex != null ? vm.valuex : '') + "%",
        },
        onError: function () {
        },
        vm,
      }).then((res) => {
        if (res.code == 200) {
          if (vm.$store.state.res) {
            vm.$store.state.res.hasCollection = 1
          }
          // 
          vm.CollectionList = res.data.aaData;
          // document.getElementsByTagName("body")[0].style.position = "fixed";
          vm.alert = true;
          //
        } else if (res.code == 680 || res.code == 601) {
          vm.$store.state.login = true;
          vm.$store.state.logins = true
          vm.$store.state.ForgetPwd = false
          vm.$store.state.Sign = false
        } else {
          //
          // this.$message(res.desc);
        }
      });
    },
    close() {
      this.alert = false;
      // document.getElementsByTagName("body")[0].style.position = "relative";
    },
    addDone(x) {
      let vm = this;
      this.rq({
        url: "/api/personal/addBookmarkDetail",
        method: "post",
        param: {
          folderId: x,
          productId: vm.pd.productId,
        },
        onError: function () {
        },
        vm,
      }).then((res) => {
        if (res.code == 200) {
          // debugger
          vm.shou(vm.pd);
          this.$store.state.cosX = false;
          vm.pd.collectionId = x;
          vm.pd.hasCollection = +vm.pd.hasCollection + 1;
          //
        } else {
          //
          // this.$message(res.desc);
        }
      });
    },
    del(id) {
      let vm = this;
      this.rq({
        url: "/api/personal/deleteBookmarkDetail",
        method: "post",
        param: {
          folderId: id,
          productId: vm.pd.productId,
        },
        onError: function () {
        },
        vm,
      }).then((res) => {
        if (res.code == 200) {

          vm.shou(vm.pd.productId);
          vm.pd.hasCollection = vm.pd.hasCollection - 1;
          // vm.selectAlikeById();
          // vm.closeb()
          //
        } else {
          //
          // this.$message(res.desc);
        }
      });
    },
  }
};
</script>
<style lang="less" scoped>
.alerts {
  z-index: 10;
  top: 0;
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(34, 34, 34, 0.5);

  .alert {
    position: absolute;
    box-sizing: border-box;
    padding-top: 0.17rem;
    padding-left: 0.2rem;
    padding-right: 0.2rem;
    width: 4rem;
    height: 5.15rem;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    background-color: #fff;
    z-index: 10;
    border-radius: 0.08rem;

    .close {
      font-size: 0.2rem;
      color: #222;
      height: 0.45rem;
      position: relative;

      box-sizing: border-box;
      width: 100%;
      cursor: pointer;

      .text {
        text-align: center;
        line-height: 0.3rem;
      }

      i {
        top: -0.08rem;
        right: -0.1rem;
        position: absolute;
      }
    }

    .input_so {
      width: 3.52rem;
      display: flex;
      border: 1px solid #cccccc;
      border-radius: 0.2rem;
      height: 0.4rem;
      box-sizing: border-box;

      padding-left: 0.128rem;

      img {
        height: 0.2rem;
        margin-top: 0.1rem;
        // margin-top: 0.04rem;
      }

      input {
        outline: 0;
        width: 86%;
        border: none;
      }
    }

    .con_list {
      height: 3.1rem;
      width: 100%;
      margin-top: 0.24rem;
      overflow: auto;

      //
      .term:hover {
        background: #f1f1f1;
      }

      .term {
        width: 100%;
        height: 0.44rem;
        font-size: 0.14rem;
        border-radius: 0.12rem;
        display: flex;
        position: relative;
        box-sizing: border-box;

        padding-left: 0.16rem;
        padding-right: 0.04rem;
        line-height: 0.44rem;

        .term_text {
          color: #222222;
          font-size: 0.14rem;
        }

        .Done {
          top: 0.05rem;
          text-align: center;
          line-height: 0.34rem;
          width: 0.66rem;
          height: 0.34rem;
          background-color: #373acb;
          color: #fff;
          border-radius: 0.08rem;
          position: absolute;
          right: 0.2rem;
          cursor: pointer;
        }

        .Included {
          position: absolute;
          right: 0.2rem;
          font-size: 0.14rem;
          color: #666666;
          width: 0.66rem;
          text-align: center;
        }
      }
    }
  }
}
</style>
