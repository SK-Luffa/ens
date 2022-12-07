<template>
  <div style="text-align: center;">
    <!--    <div class="Email tipss">{{ tipstext }}</div>-->
    <div class="Email">
      <input autocomplete="new-password" type="text" v-model="formData.user.value" placeholder="Email" name=""
             @input="onChange('user', $event)"/>
      <div class="errorinfo">{{ formData.user.msg }}</div>
    </div>
    <div class="Email">
      <input autocomplete="new-password" type="text" v-model="formData.pwd.value" placeholder="Get verification code"
             name="" @input="onChange('pwd', $event)"/>
      <!--      <div>-->
      <button :class="backcolor" @click="getMobileCode">{{ codetext }}</button>
      <!--      </div>-->
      <div class="errorinfo">{{ formData.pwd.msg }}</div>
    </div>
    <div class="Email">
      <input autocomplete="new-password" type="password" v-model="formData.pwds.value" placeholder="password" name=""
             @input="onChange('pwds', $event)"/>
      <div class="errorinfo">{{ formData.pwds.msg }}</div>
    </div>
    <div class="Email">
      <input autocomplete="new-password" type="password" v-model="formData.pwdss.value"
             placeholder="password confirmation" name="" @input="onChange('pwdss', $event)"/>
      <div class="errorinfo">{{ formData.pwdss.msg }}</div>
    </div>
    <div class="yes">
      <button @click="yes">{{ Log }}</button>
      <div class="errorinfo">{{ formData.res.msg }}</div>
      <div class="errorinfo">{{ tips }}</div>
    </div>
    <div class="content_text">
      <div class="box"><input v-model="boxs" type="checkbox" @input="onChange('tips', $event)"/></div>

      <div class="content_text_text">


        You Agree To Our
        <span @click="Agreement(1)"> Patternbuy License Agreement(s)</span>
        <span @click="Agreement(2)"> Terms and Conditions</span>
        <span @click="Agreement(3)"> Patternbuy Limited Privacy Policy .</span>
        I Am Aware That It Is Forbidden To Copy Or Reproduce Any Content On Patternbank Without Purchase Or Prior
        Authorisation.
      </div>
    </div>
    <div class="signUp">
      Already have an account?<span @click="loginx"> Sign in</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "regiser",
  data() {
    return {
      boxs: false,
      tips: '',
      formData: {
        user: {

          value: "",
          validate: "^(([a-zA-Z\\d][\\w-]{2,})@(\\w{2,})\\.([a-z]{2,})+)?$",
          validateMsg: "Email format error",
          msg: "",
        },
        pwd: {
          value: "",
          validate: "^([a-zA-Z0-9]{6,16})?$",
          validateMsg: "6 letters, digits",
          msg: "",
        },
        pwds: {
          value: "",
          validate: "^([a-zA-Z0-9_-]{6,16})?$",
          validateMsg: "6 to 16 letters, digits, and hyphens",
          msg: "",
        },
        pwdss: {
          value: "",
          validateMsg: "Inconsistent passwords",
          msg: "",
        },
        tips: {
          value: "",
          validateMsg: "Please read the agreement and tick",
          msg: "",
        },
        res: {
          msg: "",
        },
      },

      // pwds: "",
      // pwdss: "",

      // tips: false,
      // tipstext: "",
      // user: "",
      // users: "",
      // pwd: "",
      Log: "Next Step",
      codetext: "Get verification code",
      pus: true,
      tokensb: "",
      backcolor: "one_1",
      codebtn: true,
      lock: false,
      // Confirms: false,
    };
  },
  methods: {
    contacts() {
      debugger
      let vm = this
      this.v3({
        url: "https://api.omnisend.com/v3/contacts",
        method: "post",
        param: {
          identifiers: [
            {
              channels: {
                email: {
                  status: "subscribed",
                  statusDate: new Date().toISOString()
                }
              },
              id: vm.formData['user'].value,
              type: 'email'
            }
          ]
        },
        onError: function () { },
        vm,
      }).then((res) => {
        debugger

        vm.lock = true;
        if (res.email !== undefined) {

          this.$store.state.logins = true
          this.$store.state.ForgetPwd = false
          this.$store.state.Sign = false

          console.log(vm, this, this.$store.state.logins, this.$store.state.ForgetPwd, this.$store.state.Sign);



        }
      });
    },
    Agreement(item) {
      switch (item) {
        case 1:
          window.open("/html/Patternbuy License Agreement.html")
          return;
        case 2:
          window.open("/html/Terms and Conditions.html")
          return;
        case 3:
          window.open("/html/Privacy Policy.html")
          return;

      }


    },
    checkData() {
      let isOk = true;
      Object.keys(this.formData).some(key => {

        if (this.formData[key].msg) {
          isOk = false;
          return true;
        }
      })

      return isOk;
    },
    onChange(dataIndex, e) {

      const _this = this;
      const domData = _this.formData[dataIndex];

      if (dataIndex == 'tips') {


        if (this.boxs) {
          _this.tips = "Please check the agreement";
        } else {
          _this.tips = "";
        }

      }


      if (dataIndex == 'pwdss') {
        if (_this.formData['pwdss'].value != _this.formData['pwds'].value) {
          domData.msg = domData.validateMsg;
        } else {
          domData.msg = "";
        }
      } else {
        if (!new RegExp(domData.validate).test(domData.value)) {
          domData.msg = domData.validateMsg;
        } else {
          domData.msg = "";
        }
        _this.formData['res'].msg = "";
      }
      if (dataIndex == 'pwds') {

        if (!/^(?=.*[a-zA-Z])(?=.*[0-9])[A-Za-z0-9]{6,16}$/.test(_this.formData['pwds'].value)) {
          domData.msg = "The password can only contain 6-18 characters including letters, numbers and hyphens";
        } else {
          domData.msg = ""
        }


      }


    },

    loginx() {
      this.$store.state.logins = true
      this.$store.state.ForgetPwd = false
      this.$store.state.Sign = false
    },
    yes() {
      const vm = this;


      if (!this.boxs) {
        return this.tips = "Please check the agreement";
      } else {
        this.tips = "";
      }


      if (!vm.checkData())
        return;


      if (!vm.lock) {
        vm.lock = true
        const _this = this;


        const domData = _this.formData['tips'];

        console.log(domData)

        // if (!vm.boxs) {
        //   return domData.msg = 'Please read the agreement and tick'
        // }
        // // this.tips = true
        // if (this.formData['user'].value === "") {
        //   return this.tipstext = "电子邮箱不能为空";
        //
        //
        // } else if (!/^([a-zA-Z\d][\w-]{2,})@(\w{2,})\.([a-z]{2,})(\.[a-z]{2,})?$/.test(this.user)) {
        //
        //   return this.tipstext = "电子邮箱格式不正确";
        //
        // }
        // if (this.formData['pwd'].value === "") {
        //   return this.tipstext = "请输入验证码";
        // }
        // if (this.formData['pwds'].value === "") {
        //   return this.tipstext = "请输证密码";
        // }
        // if (this.formData['pwds'].value !== this.formData['pwdss'].value) {
        //   return this.tipstext = "两次密码结果不一致";
        // }
        // this.tipstext = "";
        // this.tips = false;

        this.rq({
          url: "/api/member/emailRegister",
          method: "post",
          param: {
            email: vm.formData['user'].value,
            code: vm.formData['pwd'].value,
            password: vm.formData['pwds'].value,
            inviteCode: "",
          },
          onError: function () {
            vm.lock = false
          },
          vm,
        }).then((res) => {
          if (res.code == 200) {
         
            vm.contacts()
            // this.$store.state.logins = true
            // this.$store.state.ForgetPwd = false
            // this.$store.state.Sign = false

            //       this.Log = "Continue";
            // this.test1 = "text";
            // this.value = "";
            // this.pwd = "";
            // this.test;
            // this.close();
          } else {
            vm.formData['res'].msg = res.desc;
            //
            // vm.$message("服务器错误，请联系管理员");
          }
          vm.lock = false
        });

      }


    },
    // 获取验证码
    getMobileCode() {
      const _this = this;


      const domData = _this.formData['user'];

      console.log(domData)
      if (!domData.value) {
        domData.msg = 'Email cannot be empty'
        return;
      }
      if (!new RegExp(domData.validate).test(domData.value)) {
        domData.msg = domData.validateMsg;
        return;
      } else {
        domData.msg = "";
      }


      // if (this.user === "") {
      //   return this.tipstext = "电子邮箱不能为空";
      //
      //
      // } else if (!/^([a-zA-Z\d][\w-]{2,})@(\w{2,})\.([a-z]{2,})(\.[a-z]{2,})?$/.test(this.user)) {
      //
      //   return this.tipstext = "电子邮箱格式不正确";
      //
      // }

      if (this.pus) {

        this.pus = false
        let p = 60

        let s = setInterval(() => {

          if (p <= 0) {

            this.codetext = "Get verification code";
            this.backcolor = "one_1"
            clearInterval(s)
          } else {

            this.backcolor = "one_2"

            this.codetext = "Waiting for verification（" + p-- + "s)"
          }
        }, 1000);
        this.login()
      }
      // 2284891522@qq.com
    },
    // blur(values) {
    //   this.tips = true;
    //
    //   // sk8sigua@alyun.com
    //   switch (values) {
    //
    //     case "email":
    //       if (this.user === "") {
    //         this.tipstext = "电子邮箱不能为空";
    //
    //       } else if (!/^([a-zA-Z\d][\w-]{2,})@(\w{2,})\.([a-z]{2,})(\.[a-z]{2,})?$/.test(this.user)) {
    //
    //         this.tipstext = "电子邮箱格式不正确";
    //
    //       } else {
    //         this.tipstext = "";
    //         this.tips = false;
    //       }
    //       return;
    //     case "pwd":
    //       if (this.pwd === "") {
    //         this.tipstext = "请输入验证码";
    //
    //       } else {
    //         this.tipstext = "";
    //         this.tips = false;
    //       }
    //       return;
    //     case "pwds":
    //       if (this.pwds === "") {
    //         this.tipstext = "请输入密码";
    //
    //       } else {
    //         this.tipstext = "";
    //         this.tips = false;
    //       }
    //       return;
    //     case "pwdss":
    //       if (this.pwds !== this.pwdss) {
    //         this.tipstext = "两次密码输入不一致";
    //
    //       } else {
    //         this.tipstext = "";
    //         this.tips = false;
    //       }
    //       return;
    //   }
    // },
    ForgotPwd() {
    },
    login() {

      let vm = this

      this.rq({
        url: "/api/member/getEmailCode",
        method: "get",
        param: {
          email: vm.formData['user'].value
        },
        onError: function () {
        },
        vm,
      }).then((res) => {
        if (res.code == 200) {
          let p = 60

          let s = setInterval(() => {
            p--
            if (p <= 0) {

              vm.pus = true;
              clearInterval(s)

            }
          }, 1000);

        } else {
          //
          vm.pus = true;
          this.$message(res.desc);
        }
      });


    }
  },
  created() {
    // console.log(123);
  },
  mounted() {
  },
};
</script>
<style lang="less" scoped>
.errorinfo {
  padding-top: 0.1rem;
  width: 4rem;
  height: auto;
  margin: 0 auto;
  padding-left: 0.15rem;
  font-size: 0.14rem;
  font-family: "PingFang SC";
  font-style: normal;
  color: #ff4f44;
  text-align: left;
  font-size: 0.14rem;
}

.tipsb {
  padding-top: 0.0rem;
}

.Email {
  position: relative;
  /*padding-top: 0.24rem;*/
  // height: 0.4rem;
  /*width: 100%;*/
  text-align: left;
  font-size: 0;
  width: 4rem;
  margin: 0.3rem auto 0;

  .one_1 {
    background-color: #373acb;
  }

  .one_2 {
    background-color: #DDDEFF;
  }

  .one_1:hover {
    background: #5F61D5;
  }

  .one_1:active {
    background: #2C2EA2;
  }

  .one_2:active {
    background: #ebebf9;
  }

  button {
    position: absolute;
    padding-left: 0.12rem;
    padding-right: 0.12rem;
    top: 0;
    right: 0;
    height: 0.4rem;
    border-radius: 0.2rem;
    border: none;
    cursor: pointer;

    /*width: 1.6rem;*/

    font-size: 0.14rem;
    color: #ffffff;
  }

  input {
    width: 4rem;
    height: 0.4rem;
    border-radius: 0.2rem;
    background-color: #f7f9fd;
    border: none;
    color: #222;
    padding-left: 0.15rem;
    font-size: 0.14rem;
  }

  > div {
    display: inline-block;
    width: 4rem;
    margin: 0 auto;
    position: relative;
    vertical-align: top;
  }
}

.yes {
  font-size: 0.14rem;
  padding-top: 0.24rem;
  width: 100%;
  text-align: center;

  button {
    width: 4rem;
    height: 0.4rem;
    border-radius: 0.2rem;
    background-color: #373acb;
    border: none;
    color: #ffffff;
    cursor: pointer;
  }

  button:hover {
    background: #5F61D5;
  }

  button:active {
    background: #2C2EA2;
  }
}

.tipss {
  font-size: 0.14rem;
  font-family: "PingFang SC";
  font-style: normal;
  color: #ff4f44;
  height: 0.36rem;
}

.signUp:hover {
  cursor: pointer;
}

.signUp {
  padding-top: 0.24rem;
  width: 100%;
  text-align: center;
  font-size: 0.14rem;
  padding-bottom: 0.24rem;

  span {
    color: #373acb;
  }

  span:hover {
    text-decoration: underline;
  }
}

.content_text {
  padding-top: 0.24rem;
  width: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  /*margin-left: 5.2865vw;*/

  .box {
    padding-right: 0.08rem;
    transform: translateY(0.02rem);
  }

  .content_text_text {
    display: inline-block;
    text-align: left;
    width: 3.6rem;
    font-family: "PingFang SC";
    font-style: normal;
    font-weight: 700;
    font-size: 0.14rem;

    span {
      color: #373acb;
      cursor: pointer;
    }

    span:hover {
      text-decoration: underline
    }
  }
}
</style>
