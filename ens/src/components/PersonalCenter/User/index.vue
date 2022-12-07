<template>
  <div class="roots">
    <div class="title">
      <!-- <div>Avatar</div> -->
      <!-- <div>Name</div> -->
      <div>Email</div>
      <div>Password</div>
      <!-- <div class="binding">Binding Association</div> -->
      <!-- <div v-show="this.$store.state.Center_button" class="btns">
        <div @click="cancels">Cancel</div>
        <div @click="confirms">Confirm</div>
      </div> -->
    </div>

    <div class="content">
      <!-- <div class="title_img">
        <div v-show="!title_img">
          {{ this.$store.state.username.icon_text }}
        </div>
        <div v-show="title_img"><img src="" alt="" /></div>
      </div>
      <div>
        <div v-show="!modify_list[1]">{{ username }}</div>

        <input autocomplete="new-password" v-model="value" class="modify_input" v-show="modify_list[1]" type="text"/>
      </div> -->
      <div>{{ email }}</div>
      <div>{{ pwd }}</div>
      <!-- <div class="binding">
        <div class="binding_1">
          <Icon type="logo-chrome" class="chromes" />

          Connect
        </div>
        <div class="binding_2">
          <Icon type="logo-twitter" class="chromes lefts" />Connect
        </div>
        <div class="binding_3">
          <Icon type="logo-facebook" class="chromes lefts" />Connect
        </div>
      </div> -->
    </div>
    <!--  v-show="this.$store.state.Center_button" -->
    <div class="modify">
      <!-- <div>
        <img @click="modify_click('title')" v-show="!modify_list[0]" :src="modify" alt="" />
        <div class="btn" v-show="modify_list[0]"></div>
      </div> -->
      <!-- <div>
        <img @click="modify_click('name')" v-show="!modify_list[1]" :src="modify" alt="" />
        <div class="btn" v-show="modify_list[1]">
          <div @click.stop="modify_close('name', 1)" class="btn_1">confirm</div>
          <div @click.stop="modify_close('name')" class="btn_2">cancel</div>
        </div>
      </div> -->
      <div>
        <img @click="modify_click('email')" :src="modify" alt="" />
        <div class="btn" v-show="modify_list[2]"></div>
      </div>
      <div>
        <img @click="modify_click('pwd')" :src="modify" alt="" />
        <div class="btn" v-show="modify_list[3]"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "User",
  data() {
    return {
      value: "",
      title_img: false,
      username: "",
      email: "",
      pwd: "**********",
      modify: require("@/assets/img/modify.png"),
      modify_list: [false, false, false, false],
    };
  },
  methods: {
    // 点击确认修改按钮confirms
    confirms() {
      this.cancels();
    },
    // 关闭修改按钮
    cancels() {
      this.$store.state.Center_button = false;
    },
    modify_close(a, b) {
      console.log(1);
      switch (a) {
        case "title":
          this.$set(this.modify_list, 0, !this.modify_list[0]);
          return;
        case "name":
          this.$set(this.modify_list, 1, !this.modify_list[1]);

          if (b == 1 && this.value != "") {
            this.username = this.value;
            let vm = this;
            this.rq({
              url: "/api/member/replaceName",
              method: "post",
              param: {
                memberName: this.value,
              },
              onError: function () {
              },
              vm,
            }).then((res) => {
              if (res.code == 200) {
                // 
              } else {
                //

                this.$message(res.desc);
              }
            });
          }

          this.value = "";
          return;
        case "email":
          this.$set(this.modify_list, 2, !this.modify_list[2]);

          return;
        case "pwd":
          this.$set(this.modify_list, 3, !this.modify_list[3]);
          return;
      }
    },
    modify_click(a) {
      switch (a) {
        case "title":
          this.$set(this.modify_list, 0, !this.modify_list[0]);
          return;
        case "name":
          this.$set(this.modify_list, 1, !this.modify_list[1]);
          return;

        case "email":
          this.$set(this.modify_list, 2, !this.modify_list[2]);
          document.body.style.overflow = "hidden";
          document.body.style.backgroundColor = "#000";
          this.$store.state.mask = "email";
          return;
        case "pwd":
          this.$set(this.modify_list, 3, !this.modify_list[3]);
          document.body.style.overflow = "hidden";
          document.body.style.backgroundColor = "#000";
          this.$store.state.mask = "pwd";
          return;
      }
    },
  },
  created() {
    let vm = this;

    this.rq({
      url: "/api/member/getCurMember",
      method: "get",
      param: {
        _: Math.random() * 10,
      },
      onError: function () {
      },
      vm,
    }).then((res) => {
      if (res.code == 200) {
        //
        vm.username = res.user.email.split("@")[0];
        ;
        vm.email = res.user.email;
        this.$store.state.pattern = res.user.orderNum;
      } else {
        //
        this.$message(res.desc);
      }
    });
  },
  mounted() {
  },
};
</script>
<style lang="less" scoped>
.roots {
  width: 100%;
  height: 100%;
  display: flex;
  background: #fff;
  border-radius: 0.14rem;

  .title {
    padding-left: 0.4rem;
    width: 1.3rem;

    .binding {
      line-height: 0.2rem !important;
      box-sizing: border-box;
      padding-top: 0.2rem;
    }

    .btns {
      margin-top: 0.42rem;
      display: flex;
      position: relative;

      div:active {
        background: #ebebf9;
      }


      div + div:hover {
        background: #5F61D5;
      }

      div + div:active {
        background: #2C2EA2;
      }

      div {
        position: absolute;

        width: 1.03rem;
        height: 0.36rem;
        line-height: 0.36rem;
        text-align: center;
        border-radius: 0.2rem;
        color: #373acb;
        border: 1px solid #373acb;
      }

      div + div {
        left: 1.59rem;
        background: #373acb;
        color: #fff;
      }
    }

    div {
      color: #222;
      height: 0.74rem;
      line-height: 0.74rem;
      font-family: "PingFang SC";
      font-style: normal;
      font-weight: 700;
      font-size: 0.14rem;
    }
  }

  .modify_input {
    padding-left: 0.18rem;
    box-sizing: border-box;
    color: #222222;
    font-family: "PingFang SC";
    font-style: normal;
    font-weight: 400;
    font-size: 0.14rem;
    width: 3.48rem;
    height: 0.36rem;
    background: #f1f1f1;
    border: 1px solid #9496ff;
    border-radius: 0.18rem;
  }

  .content {
    margin-left: 0.5rem;
    width: 3.69rem;

    .title_img {
      width: 0.6rem;
      height: 0.74rem;
      position: relative;

      div {
        position: absolute;
        top: 0.1rem;
        width: 100%;
        height: 0.6rem;
        border-radius: 50%;
        background: #c4c4c4;
        text-align: center;
        font-family: "PingFang SC";
        font-style: normal;
        font-weight: 700;
        font-size: 0.36rem;
        line-height: 0.6rem;
        color: #fff;
      }
    }

    .binding {
      display: flex;

      div {
        top: 50%;
        //   transform: translateY(-50%);
        width: 0.87rem;
        height: 0.36rem;
        border-radius: 0.18rem;
        font-family: "PingFang SC";
        font-style: normal;
        font-weight: 400;
        font-size: 0.14rem;
        text-align: center;
        line-height: 0.36rem;
        color: #fff;
        position: relative;
      }

      .chromes {
        font-size: 0.2rem;
        position: absolute;
        left: 50%;
        transform: translateX(-50%) translateY(-100%);
        color: #c4c4c4;
      }

      div + div {
        margin-left: 0.25rem;
      }

      .binding_1 {
        background: #5e8bee;
      }

      .binding_2 {
        background: #4eb6f5;
      }

      .binding_3 {
        background: #404bac;
      }
    }

    div {
      color: #222;
      height: 0.74rem;
      line-height: 0.74rem;
      font-family: "PingFang SC";
      font-style: normal;
      font-weight: 700;
      font-size: 0.14rem;
    }
  }

  .modify {
    width: 1.3rem;

    .btn {
      .btn_1 {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 0.8rem;
        height: 0.36rem;
        text-align: center;
        line-height: 0.36rem;
        box-sizing: border-box;
        padding-left: 0.17rem;
        background: #373acb;
        border-radius: 0.18rem;
        color: #fff;
        font-family: "PingFang SC";
        font-style: normal;
        font-weight: 400;
        font-size: 0.14rem;
      }

      .btn_2:active {
        background: #ebebf9;
      }

      .btn_1:active {
        background: #2C2EA2;
      }

      .btn_1:hover {
        background: #5F61D5;
      }

      .btn_2 {
        font-family: "PingFang SC";
        font-style: normal;
        font-weight: 400;
        font-size: 0.14rem;
        color: #222;
        background: #dddeff;
        border-radius: 0.18rem;

        box-sizing: border-box;
        padding-left: 0.17rem;
        top: 50%;
        transform: translateY(-50%);
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 0.8rem;
        height: 0.36rem;
        margin-left: 1rem;
        text-align: center;
        line-height: 0.36rem;
      }
    }

    div {
      color: #222;
      height: 0.74rem;
      line-height: 0.74rem;
      font-family: "PingFang SC";
      font-style: normal;
      font-weight: 700;
      font-size: 0.14rem;
      display: flex;
      position: relative;

      img {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        height: 0.24rem;
        width: 0.24rem;
      }
    }
  }
}
</style>
