<template>
  <div>
    <!--    <div class="Email tipss">{{ tipstext }}</div>-->
    <div class="Email tipssp">
      <div class="tip"> Please set a new password</div>
    </div>
    <div class="Email" v-if="!Confirms">
      <input autocomplete="new-password" type="text" v-model="formData.user.value" :placeholder="Email" name=""
             @input="onChange('user', $event)"/>
      <div class="errorinfo">{{ formData.user.msg }}</div>
    </div>

    <div class="Email" v-if="!Confirms">
      <input autocomplete="new-password" type="text" v-model="formData.pwd.value" :placeholder="codes" name=""
             @input="onChange('pwd', $event)"/>
      <button v-show="codebtn" :class="backcolor" @click="getMobileCode">{{ codetext }}</button>
      <div class="errorinfo">{{ formData.pwd.msg }}</div>
    </div>

    <div class="Email" v-if="Confirms">
      <input autocomplete="new-password" type="password" v-model="formData.pwds.value" placeholder="password" name=""
             @input="onChange('pwds', $event)"/>
      <div class="errorinfo">{{ formData.pwds.msg }}</div>
    </div>
    <div class="Email" v-if="Confirms">
      <input autocomplete="new-password" type="password" v-model="formData.pwdss.value"
             placeholder="password confirmation" name="" @input="onChange('pwdss', $event)"/>
      <div class="errorinfo">{{ formData.pwdss.msg }}</div>
    </div>

    <div class="yes">
      <button @click="yes">{{ Log }}</button>
      <div class="errorinfo">{{ formData.res.msg }}</div>
    </div>
    <div class="signUp">
      Already have an account?<span @click="loginx"> Sign in</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "ForgetPwd",
  data() {
    return {
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
        res: {
          msg: "",
        },
      },

      codes: "Get verification code",
      Email: "Email",
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
      Confirms: false,
    };
  },
  methods: {
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
    },
    loginx() {
      this.$store.state.logins = true
      this.$store.state.ForgetPwd = false
      this.$store.state.Sign = false
    },
    yes() {
      const vm = this;

      if (!vm.checkData())
        return;

      if (!this.Confirms) {
        if (!this.lock) {
          this.lock = true

          this.rq({
            url: "/api/member/getResetPwdToken",
            method: "get",
            param: {
              email: vm.formData['user'].value,
              code: vm.formData['pwd'].value,
            },
            onError: function () {
              this.lock = false
            },
            vm,
          }).then((res) => {
            if (res.code == 200) {

              vm.tokensb = res.data;
              vm.Log = "Confirm";
              vm.codebtn = false;
              vm.Email = "Password";
              vm.codes = "Password Confirmation"
              vm.Confirms = true;

            } else {
              vm.formData['res'].msg = res.desc;
              // this.$message("账号或验证码错误");
            }
            this.lock = false
          });
        }
      } else {

        let vm = this;
        this.rq({
          url: "/api/member/emailForgotPwd",
          method: "post",
          param: {
            email: vm.formData['user'].value,
            resetPwdToken: this.tokensb,
            password: vm.formData['pwds'].value,
          },
          onError: function () {
          },
          vm,
        }).then((res) => {
          if (res.code == 200) {
            vm.$store.state.logins = true
            vm.$store.state.ForgetPwd = false
            vm.$store.state.Sign = false
            // this.tips = false;
            // this.tipstext = "";
            //
          } else {
            vm.formData['res'].msg = res.desc;
          }
        });
      }


    },
    // 获取验证码
    getMobileCode() {
      const _this = this;

      const domData = _this.formData['user'];

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
    //   if (this.Confirms == true) {
    //     if (this.pwd !== this.user) {
    //       this.tipstext = "两次密码不一致";
    //     } else {
    //       this.tips = false;
    //       this.tipstext = "";
    //     }
    //     return
    //   }
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
          email: vm.formData['user'].value,
        },
        onError: function () {
        },
        vm,
      }).then((res) => {
        if (res.code == 200) {
          let p = 60
          vm.users = vm.formData['user'].value;
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
          vm.formData['res'].msg = res.desc;
          // this.$message(res.desc);
        }
      });


    }
  },
  created() {
    console.log(123);
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
}

.Email {
  position: relative;
  /*padding-top: 0.24rem;*/
  // height: 0.4rem;
  /*width: 100%;*/
  text-align: center;
  font-size: 0;
  width: 4rem;
  margin: 0.3rem auto 0;

  .one_1 {
    background-color: #373acb;
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

  .one_2 {
    background-color: #DDDEFF;
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
  font-size: 14/100rem;
  font-family: "PingFang SC";
  font-style: normal;

  height: 0.36rem;
  color: #ff4f44;
}

.tipssp {
  color: #222;
  margin-top: 0.1rem;

  .tip {
    font-size: 0.12rem;
    width: 4rem;
    text-align: left;
    padding-left: 0.14rem;
  }
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
</style>
