<template>
  <div class="Mask" @mousedown.stop="close()">
    <div class="login" ref="login" @mousedown.stop="">
      <div class="content">
        <div class="close" @click.stop="close()">
          <i class="el-icon-close"></i>
        </div>
        <div class="logo"><img :src="pattern" alt=""/></div>
        <div class="text">Welcome to patternbuy</div>
        <div class="loginType">
          <!-- <img class="imgsb" v-for="(item, index) in icon" :key="index" :src="item" alt=""/> -->
          <!-- <div>
           <Icon type="logo-chrome" />
         </div>
         <div>
           <Icon type="logo-twitter" />

         </div>
         <div>
           <Icon type="logo-facebook" />
         </div> -->
        </div>
        <div class="or">
          <div class="or_1"></div>
          <!-- <div class="or_2">OR</div> -->
        </div>
        <!-- tips 错误提示 -->
        <!-- <div v-show="tips" class="Email tipss">{{ tipstext }}</div> -->
        <!-- <div v-show="texts" class="Email texts">Please Set A New Password</div> -->
        <Logins v-if="this.$store.state.logins" @login="loginCallback"/>
        <ForgetPwd v-if="this.$store.state.ForgetPwd"/>
        <registerVue v-if="this.$store.state.Sign"/>
        <div class="content_text" v-show="register">
          <div class="content_text_text">
            By Creating An Account, You Agree To Our
            <span> Buyer License</span> ,
          </div>
          <div class="content_text_text">
            <span>Seller License, </span> <span>Terms</span> And
            <span>Privacy Policy</span>. I Am Aware That
          </div>
          <div class="content_text_text">
            it is forbidden to copy or reproduce any content on
          </div>
          <div class="content_text_text">
            Patternbank without purchase or prior authorisation.
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
import Logins from "./contents/logins.vue";
import ForgetPwd from "./contents/ForgetPwd.vue";
import registerVue from "./contents/register.vue";

export default {
  components: {
    Logins,
    ForgetPwd,
    registerVue,
  },
  name: "Login",
  data() {
    return {

      Sign: "Sign up",
      tips: false,
      emialtext: "",
      text1: "text",
      colors: "#373ACB",
      Email: "Email",
      texts: false,
      tokensb: "",
      test1: "password",
      lock: true,
      //  邮箱
      value: "",
      // 密码也是验证码
      pwd: "",
      // 验证码处的密码
      pwds: "",
      pwdss: "",
      // 验证码文字
      code_text: "Get Verification Code",
      Log: "Log In",
      pattern: require("@/assets/img/login.svg/"),
      register: false,
      registers: false,
      //   pwd input内显示的内容
      // 点击忘记密码的次数
      counst: 0,
      Password: "Password",

      icon: [
        require("@/assets/img/google.svg"),
        require("@/assets/img/tiewer.svg"),
        require("@/assets/img/facebooks.svg"),
      ],
    };
  },
  watch: {
    '$store.state.login': {
      handler(p1,p2) {
        this.$nextTick(() => {
          console.log(this.$refs.login.offsetHeight);
          if (this.$refs.login.offsetHeight > 0) {
            this.$refs.login.style.top = (document.documentElement.clientHeight - this.$refs.login.offsetHeight) / 2 + 'px';
          }
        });
        // console.log(document.documentElement.clientWidth);
        // console.log(this.$refs.login.offsetHeight);
        // console.log(p1,p2)
      },
    },
    '$store.state.login': {
      handler(p1,p2) {
        this.$nextTick(() => {
          console.log(this.$refs.login.offsetHeight);
          if (this.$refs.login.offsetHeight > 0) {
            this.$refs.login.style.top = (document.documentElement.clientHeight - this.$refs.login.offsetHeight) / 2 + 'px';
          }
        });
        // console.log(document.documentElement.clientWidth);
        // console.log(this.$refs.login.offsetHeight);
        // console.log(p1,p2)
      },
    },
    '$store.state.Sign': {
      handler(p1,p2) {
        this.$nextTick(() => {
          if (this.$refs.login.offsetHeight > 0) {
            this.$refs.login.style.top = (document.documentElement.clientHeight - this.$refs.login.offsetHeight) / 2 + 'px';
          }
        });
      },
    },
    '$store.state.ForgetPwd': {
      handler(p1,p2) {
        this.$nextTick(() => {
          if (this.$refs.login.offsetHeight > 0) {
            this.$refs.login.style.top = (document.documentElement.clientHeight - this.$refs.login.offsetHeight) / 2 + 'px';
          }
        });
      },
    },
    SignUps() {
      this.signup();
    },
  },
  computed: {
    SignUps() {
      return this.$store.state.up;
    },
  },
  methods: {
    loginCallback(){
      console.log('222');
      this.$emit('login')
    },
    // input 失去焦点验证错误信息
    blur(values) {
      switch (values) {
        case "email":
          if (
              this.Log == "Log In" &&
              !/^([a-zA-Z\d][\w-]{2,})@(\w{2,})\.([a-z]{2,})(\.[a-z]{2,})?$/.test(
                  this.value
              )
          ) {
            this.tipstext = "电子邮箱格式有误";
            this.tips = true;
          } else if (
            this.Log == "Next Step" &&
            !/^([a-zA-Z\d][\w-]{2,})@(\w{2,})\.([a-z]{2,})(\.[a-z]{2,})?$/.test(
              this.value
            )
          ) {
            this.tipstext = "电子邮箱格式有误";
            this.tips = true;
          } else if (this.Log == "Confirm" && this.value == "") {
            this.tipstext = "密码或者邮箱不正确";
            this.tips = true;
          } else if (
            this.Log == "Continue" &&
            !/^([a-zA-Z\d][\w-]{2,})@(\w{2,})\.([a-z]{2,})(\.[a-z]{2,})?$/.test(
              this.value
            )
          ) {
            this.tipstext = "电子邮箱格式有误";
            this.tips = true;
          } else {
            this.tips = false;
          }

          return;
        case "pwd":
          if (this.Log == "Log In" && this.pwd == "") {
            this.tipstext = "密码或者邮箱不正确";
            this.tips = true;
          } else if (this.Log == "Next Step" && this.pwd == "") {
            this.tipstext = "验证码错误";
            this.tips = true;
          } else if (this.Log == "Continue" && this.pwd == "") {
            this.tipstext = "验证码错误";
            this.tips = true;
          } else if (this.Log == "Confirm" && this.value != this.pwd) {
            this.tipstext = "两次密码不一致";
            this.tips = true;
          } else {
            this.tips = false;
          }
          return;
        case "pwds":
          if (this.pwds == "") {
            this.tipstext = "密码或者邮箱不正确";
            this.tips = true;
          } else {
            this.tips = false;
          }

          return;

        case "pwdss":
          if (this.pwdss == "") {
            this.tipstext = "两次密码不一致";
            this.tips = true;
          } else if (this.pwds != this.pwdss) {
            this.tipstext = "两次密码不一致";
            this.tips = true;
          } else {
            this.tips = false;
          }
      }
    },
    codes() {
      let vm = this;
      if (!this.lock) {
        return;
      }
      this.lock = false;

      // var emailRegExp = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
      // if (vm.value == "" || !emailRegExp.test(vm.value)) {
      //   this.$message("邮箱为空，或邮箱输入格式不正确");
      //   return (this.lock = true);
      // }
      // if(!this.pwd){
      //     this.$message("验证码不能为空");
      //   return (this.lock = true);
      // }
      let s = 60;

      vm.colors = "#DDDEFF";
      let k = setInterval(() => {
        vm.code_text = "Waiting for verification（" + s-- + ")";

        if (s == 0) {
          this.lock = true;
          clearInterval(k);
          vm.code_text = "Get Verification Code";
          vm.colors = "#373ACB";
        }
      }, 1000);
      this.rq({
        url: "/api/member/getEmailCode",
        method: "get",
        param: {
          email: this.value,
        },
        onError: function () {},
        vm,
      }).then((res) => {
        if (res.code == 200) {
          localStorage.token = res.data.token;
        } else {
          //

          this.$message(res.desc);
        }
      });
    },
    close() {
      // this.$router.push("/blank")
      this.$store.state.login = false;
      this.register = false;

      this.$store.state.logins = false
      this.$store.state.ForgetPwd = true
      this.$store.state.Sign = true

      document.getElementsByTagName("body")[0].style.position = "relative";
    },
    login() {
      let vm = this;

      if (this.Log == "Continue") {
        if (
            this.value == "" &&
            !/^([a-zA-Z\d][\w-]{2,})@(\w{2,})\.([a-z]{2,})(\.[a-z]{2,})?$/.test(
                this.value
            )
        ) {
          this.tipstext = "电子邮箱格式有误";
          this.tips = true;
          return;
        }
        if (!this.pwd) {
          this.tipstext = "验证码错误";
          this.tips = true;
          return;
        }
        if (!this.pwds) {
          this.tipstext = "密码信息不能为空";
          this.tips = true;
          return;
        }
        if (!this.pwdss || this.pwds != this.pwdss) {
          this.tipstext = "两次密码不一致";
          this.tips = true;
          return;
        }
        this.rq({
          url: "/api/member/emailRegister",
          method: "post",
          param: {
            email: this.value,
            code: this.pwd,
            password: this.pwds,
            inviteCode: "",
          },
          onError: function () {},
          vm,
        }).then((res) => {
          if (res.code == 200) {
            vm.value = "";
            vm.Email = "Email";
            vm.pwd = "";
            vm.Password = "Password";
            vm.register = true;
            vm.signup();

            //       this.Log = "Continue";
            // this.test1 = "text";
            // this.value = "";
            // this.pwd = "";
            // this.test;
            // this.close();
          } else {
            //
            vm.$message(res.desc);
          }
        });
      } else if (this.Log == "Next Step") {
        if (
          this.value == "" &&
          !/^([a-zA-Z\d][\w-]{2,})@(\w{2,})\.([a-z]{2,})(\.[a-z]{2,})?$/.test(
            this.value
          )
        ) {
          this.tipstext = "电子邮箱格式有误";
          this.tips = true;
          return;
        }
        if (!this.pwd) {
          this.tipstext = "验证码错误";
          this.tips = true;
          return;
        }
        this.emialtext = this.value;
        this.rq({
          url: "/api/member/getResetPwdToken",
          method: "get",
          param: {
            email: this.value.toString(),
            code: this.pwd,
          },
          onError: function () {},
          vm,
        }).then((res) => {
          if (res.code == 200) {
            vm.tokensb = res.data;
            vm.Log = "Confirm";
            vm.value = "";
            vm.pwd = "";
            vm.registers = true;
            vm.texts = true;
            vm.Email = "Password";
            vm.text1 = "password";
            vm.test1 = "password";
            vm.Password = "Password Confirmation";
            // this
          } else {
            //
            this.$message(res.desc);
          }
        });
      } else if (this.Log == "Confirm") {
        if (!this.value) {
          this.tipstext = "密码信息不能为空";
          this.tips = true;
          return;
        }
        if (!this.value || this.value != this.pwd) {
          this.tipstext = "两次密码不一致";
          this.tips = true;
          return;
        }

        this.rq({
          url: "/api/member/emailForgotPwd",
          method: "post",
          param: {
            email: this.emialtext,
            resetPwdToken: this.tokensb,
            password: this.pwd,
            // password: this.pwd,

            // stamp: "",
          },
          onError: function () {},
          vm,
        }).then((res) => {
          if (res.code == 200) {
            vm.Sign = "Sig up";
            vm.value = "";
            vm.Email = "Email";
            vm.pwd = "";
            vm.Password = "Password";
            vm.register = true;
            vm.signup();

            //
          } else {
            //
            vm.$message(res.desc);
          }
        });
      }
    },

    signup() {
      this.Password = "Password";
      this.register = !this.register;
      this.registers = !this.registers;

      if (this.register) {
        this.Log = "Continue";
        this.Forgots = true;
        this.test1 = "text";
        this.value = "";
        this.pwd = "";
        this.test;
        this.Sign = "Log In ";
      } else {
        this.test1 = "password";
        this.value = "";
        this.pwd = "";
        this.Forgots = false;
        this.Log = "Log In";
        this.Sign = "Sign Up";
      }

      if (this.Password == "Password") {
        this.Password = "Get Verification Code";
      } else {
        this.Password = "Password";
      }
    },
    ForgotPwd() {
      this.Log = "Next Step";
      //  this.register=true;
      // this.Sign = "Log In";
      this.tips = false;
      this.Forgots = false;
      this.value = ""; //清空账号
      this.pwds = ""; //清空密码
      this.pwdss = "";
      this.pwd = ""; ///此处的验证码放在pwd当中
      this.Sign = "Log In";
      // pwd放在
      // if()

      if (this.Password == "Password") {
        this.Log = "Next Step";
        this.Password = "Get Verification Code";
        this.test1 = "text";
        this.value = "";
        this.pwd = "";
        // this.Log="Log In"
      }
    },
  },
  created() {},
  mounted() {

    // console.log(document.documentElement.clientWidth);
    // console.log(this.$refs.login.offsetHeight);
    //
    // console.log(this.$refs.login);
  },
};
</script>
<style lang="less" scoped>
.Mask {
  background-color: rgba(0, 0, 0, 0.3);

  position: fixed;
  height: 100vh;
  width: 100vw;top: 0;

  /*max-width: 2560px;*/
  z-index: 999;
}

.login {
  position: absolute;
  width: 6rem;
  background-color: #ffffff;
  left: 50%;
  /*top: 50%;*/
  /*transform: translateX(-50%) translateY(-50%);*/
  transform: translateX(-50%);
  border-radius: 0.14rem;

  .content {
    width: 100%;
    height: 100%;
    padding-top: 0.12rem;
    padding-bottom: 0.12rem;
    position: relative;

    .close {
      position: absolute;
      text-align: right;
      right: 0.16rem;
      top: 0.17rem;
      font-size: 0.24rem;
      color: #c4c4c4;
      z-index: 1;
      cursor: pointer;
    }

    .logo {
        width: 100%;
          height: 1rem;
          text-align: center;
          padding-top: 0.24rem;
          position: relative;
          padding-bottom: 0.32rem;
      img {
        height: 0.48rem;
        width: 0.48rem;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
      }
    }

    .text {
      height: 0.32rem;
      text-align: center;
      font-size: 0.22rem;
      color: #000;
      font-family: "PingFang SC";
      font-style: normal;
    }

    .loginType {
      text-align: center;
      font-size: 0.14rem;
      // margin-top: 0.24rem;

      img {
        box-shadow: 0px 3px 13px 0px #00000029;
        border-radius: 0.08rem;
      }

      img:first-child {
        width: 2rem;
      }

      img + img {
        margin-left: 0.16rem;
        width: 0.5rem;
      }
    }

    .or {
      position: relative;
      /*padding-left: 0.43rem;*/

      text-align: center;

      /*div {*/
      /*  display: flex;*/
      /*}*/

      .or_1 {
        display: inline-block;
        width: 5rem;
        height: 0;
        // padding-top: 0.24rem;
        border-bottom: 1px solid #f1f1f1;
      }

      .or_2 {
        /*padding-left: 8px;*/
        box-sizing: border-box;
        width: 100%;
        text-align: center;
        position: absolute;
        font-size: 0.14rem;
        top: 0.14rem;
        left:0;
        /*transform: translateX(-50%);*/
        background-color: transparent;
        font-family: "PingFang SC";
        font-style: normal;
      }
    }

    .Email {
      position: relative;
      padding-top: 0.24rem;
      // height: 0.4rem;
      width: 100%;
      text-align: center;
      font-size: 0.14rem;

      //button {
      //  position: absolute;
      //  padding-left: 8px;
      //  padding-right: 8px;
      //  right: 0.96rem;
      //  height: 3.34vh;
      //  border-radius: 1.66vh;
      //  border: none;
      //  margin-top: 0.4vh;
      //  background-color: #373acb;
      //  font-size: 0.14rem;
      //  color: #ffffff;
      //}

      input {
        width: 4rem;
        height: 0.40rem;
        border-radius: 0.2rem;
        background-color: #f7f9fd;
        border: none;
        color: #222;
        padding-left: 0.729vw;
      }
    }

    .texts {
      font-size: 0.12rem;

      text-align: left;
      box-sizing: border-box;
      padding-left: 100px;
      color: #222;
    }

    .spans:hover {
      cursor: pointer;
    }

    .content_text {
      padding-top: 0.24rem;
      width: 100%;
      margin-left: 5.2865vw;

      .content_text_text {
        text-align: left;
        width: 20.78vw;
        font-family: "PingFang SC";
        font-style: normal;
        font-weight: 700;
        font-size: 0.14rem;

        span {
          color: #373acb;
        }
      }
    }


  }
}

input {
  color: #222 !important;
}

input::placeholder {
  color: #ccc !important;
}
</style>
