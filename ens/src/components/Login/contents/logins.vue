<template>
  <div>
    <!--        <div class="Email tipss">{{ tipstext }}</div>-->
    <form @submit.prevent="notsub">
    <div class="Email">
      <input autocomplete="new-password" type="text" v-model="formData.user.value" placeholder="Email" name="user"
             @input="onChange('user', $event)"/>
      <div class="errorinfo">{{ formData.user.msg }}</div>
    </div>
    <div class="Email">
      <input autocomplete="new-password" type="password" v-model="formData.pwd.value" placeholder="Password" name="pwd"
             @input="onChange('pwd', $event)"/>
      <div class="errorinfo">{{ formData.pwd.msg }}</div>
    </div>
    <div class="forgetPwd">
      <div class="spans" @click="ForgotPwd"> Forgot Password?</div>
    </div>
    <div class="yes" @click="login">
      <button>{{ Log }}</button>
      <div class="errorinfo">{{ formData.res.msg }}</div>
    </div>
    <div class="signUp">
      New to Patternbuy?<span @click="signup"> Sign Up</span>
    </div>
    </form>
  </div>
</template>
<script>
export default {
  name: "logins",
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
          validate: "^[a-zA-Z0-9_-]{6,16}$",
          validateMsg: "6 to 16 letters, digits, and hyphens",
          msg: "",
        },
        res: {
          msg: "",
        },
      },
      Log: "Sign In"
    };
  },
  methods: {
    notsub(){
      return false;
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
      // _this[dataIndex].value=e.target.value;

      if (!new RegExp(domData.validate).test(domData.value)) {
        domData.msg = domData.validateMsg;
      } else {
        domData.msg = "";
      }
      _this.formData['res'].msg = "";
    },
    ForgotPwd() {

      this.$store.state.logins = false
      this.$store.state.ForgetPwd = true
      this.$store.state.Sign = false
    },
    signup() {

      this.$store.state.logins = false
      this.$store.state.ForgetPwd = false
      this.$store.state.Sign = true
    },
    // uploadCart() {
    //   let vm = this
    //
    //   let cart=JSON.parse(localStorage.getItem("sshopping_car"));
    //   if(cart!=null && cart.length>0){
    //     let list=[];
    //     cart.forEach(item=>{
    //       list.push({
    //         productId:item.productId,
    //         imgType:item.imgType,
    //         productNum:item.productNum,
    //       })
    //     });
    //
    //     this.rq({
    //       url: "/api/cart/saveAllOrder",
    //       method: "post",
    //       param: {
    //         orderList:list
    //       },
    //       onError: function () {
    //       },
    //       vm,
    //     }).then((res) => {
    //       if (res.code == 200) {
    //         localStorage.setItem('sshopping_car', JSON.stringify([]));
    //       } else {
    //         vm.formData['res'].msg = res.desc;
    //       }
    //     });
    //   }else{
    //     if(vm.$route.path=='/shoppingcar'){
    //
    //     }
    //   }
    // },
  
    login() {

      let vm = this

      if (!vm.checkData())
        return;

      this.rq({
        url: "/api/member/login",
        method: "post",
        param: {
          account: this.formData.user.value,
          code: "1641869063940",
          password: this.formData.pwd.value,
          stamp: "",
        },
        onError: function () {
        },
        vm,
      }).then((res) => {
        if (res.code == 200) {
        
     
  
       
          vm.$store.state.Navigation_in = "Navigation_up";
          localStorage.token = res.data.token;
         
          window.localStorage.user = JSON.stringify(res.data);
          

          this.$emit('login')
          // vm.uploadCart();

          vm.$store.state.login_bool = true;
          // vm.$store.state.Navigation_in = "Navigation_up";
          vm.$store.state.username.icon_text =res.data.companyName.split("")[0];
          vm.$store.state.username.title = res.data.companyName;
          vm.$store.state.username.email = res.data.email;

          this.$store.state.login = false;
          document.getElementsByTagName("body")[0].style.position = "relative";

  

          
        } else {
          vm.formData['res'].msg = res.desc;
          //
          // this.$message(res.desc);
        }
      });

    }
  },
  created() {
  },
  mounted() {
    // console.log(document.documentElement.clientWidth);
    // console.log(this.$parent.$refs.login.offsetHeight);
    //
    // console.log(this.$parent.$refs.login);
  },
};
</script>
<style lang="less" scoped>
/*.login{*/
/*    top:100px;*/
/*}*/

.errorinfo {
  padding-top: 0.1rem;
  // box-sizing: border-box;
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
  padding-top: 0.24rem;
  // height: 0.4rem;
  width: 100%;
  text-align: center;
  font-size: 0.14rem;

  button {
    position: absolute;
    padding-left: 8px;
    padding-right: 8px;
    right: 0.96rem;
    height: 3.34vh;
    border-radius: 1.66vh;
    border: none;
    margin-top: 0.4vh;
    background-color: #373acb;
    font-size: 0.14rem;
    color: #ffffff;
    cursor: pointer;
  }

  input {
    width: 4rem;
    height: 0.4rem;
    border-radius: 0.2rem;
    background-color: #f7f9fd;
    border: none;
    color: #222;
    padding-left: 0.15rem;
  }
}

.forgetPwd {
  // padding-top: 2.23vh;
  margin-top: 0.24rem;
  font-family: "PingFang SC";
  font-style: normal;
  font-weight: 700;
  font-size: 0.12rem;
  /*line-height: 17px;*/
  width: 100%;
  text-align: right;
  color: #373acb;
  cursor: pointer;
  text-align: center;

  .spans {
    display: inline-block;
    width: 4rem;
    text-align: right;

  }

  .spans:hover {
    text-decoration: underline;
  }
}

.yes {
  font-size: 0.14rem;
  padding-top: 0.24rem;
  width: 100%;
  text-align: center;

  button:hover {
    background: #5F61D5;
  }

  button:active {
    background: #2C2EA2;
  }

  button {
    width: 4rem;
    height: 0.4rem;
    border-radius: 0.2rem;
    background-color: #373acb;
    border: none;
    color: #ffffff;
    cursor: pointer;
    /*padding-left: 0.729vw;*/
  }
}

.tipss {

  height: 0.36rem;
  font-size: 0.14rem;
  font-family: "PingFang SC";
  font-style: normal;
  color: #ff4f44;
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
