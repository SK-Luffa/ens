<template>
  <div class="contact_root">
    <div class="content" :style="[tsp]">
      <div class="title">Contact Us</div>
      <div class="err" v-show="erroe_show">{{ error_text }}</div>
      <!-- <div class="names">
        <div>Name</div>
        <div class="input_name"><input maxlength="13" type="text" v-model="name" placeholder="Name"></div>
      </div> -->
      <div class="names">
        <div class="texts">Email <span class="spans">*</span></div>
        <div class="input_name"><input type="text" v-model="email" placeholder="Email"></div>
      </div>
      <div class="names">
        <div class="texts">Category </div>

        <div class="input_name">
          <el-select v-model="value" class="select"  popper-class="abc">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="names">
        <div class="texts">Content <span class="spans">*</span></div>
        
        <div class="input_name textareas"><textarea type="text" v-model="content"
                                                    placeholder="Write your messege here"/></div>
      </div>
      <div class="names">
  
        <div class="button" @click="send"><img :src="Sends" alt=""> Send</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'APP',
 props:{
   faster:Boolean
 },
 
  data() {
    return {
      Sends:require("@/assets/img/send.svg"),
      tsp:{
        top:top+"rem"
      },
      erroe_show: false,
      lock: true,
      error_text: "",
      // name: "",
      email: "",
      category: "",
      content: "",
      options: [{

        value: '1',
        label: 'Problem feedback'
      }, {

        value: '2',
        label: 'Order problem'
      }, {

        value: '3',
        label: 'Cooperation'
      },
      {

        value: '4',
        label: 'others'
      },
      ],
      value: "4"
    }
  },
  watch: {
    email() {

      if (!/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(this.email)) {
        this.erroe_show = true;
        return this.error_text = "Email format error"
      } else {
        this.erroe_show = false
        return this.error_text = ""

      }

    }
  },
  methods: {

    send() {
      // if (localStorage.user === '') {
      //   this.$store.state.login = true;
      //   this.$store.state.logins = true
      //   this.$store.state.ForgetPwd = false
      //   this.$store.state.Sign = false
      // }
      // if (!this.name) {
      //   this.erroe_show = true;
      //   this.error_text = "Name format error"
      //   return
      // }
      if (!/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(this.email)) {
        this.erroe_show = true;
        this.error_text = "Email format error"
        return
      }
      if (!this.value) {
        this.erroe_show = true;
        this.error_text = "Category format error"
        return
      }
      if (!this.content) {
        this.erroe_show = true;
        this.error_text = "Category format error"
        return
      }
      let vm = this;
      this.lock = false;
      switch (this.value) {
        case 1: {
          this.category = "Problem feedback"
          break
        }
        case 2: {
          this.category = "Order problem"
          break
        }
        case 3: {
          this.category = "Cooperation"
          break
        }
        case 4: {
          this.category = "others"
          break
        }
      }
      this.rq({
        url: "/api/open/feedback",
        method: "post",
        param: {
          // name: this.name,
          email: this.email,
          category: this.value,
          type: this.value,
          content: this.content,
        },
        onError: function () {
        },
        vm,
      }).then((res) => {
        vm.lock = true
       
        if (res.code == 200) {
   
          if (vm.faster){
            // vm.$emit("vm.faster",false)
        document.getElementsByClassName("el-dialog__headerbtn")[0].click()

            this.$message({
              message: 'Thank you for your feedback.',
              type: 'success',
              center: true
            });
            // vm.name = vm.email = vm.value = vm.content = ""; 
            
            this.erroe_show = false;
            this.error_text = ""
          }else{
            vm.$router.push("/thank")
            // vm.name = vm.email = vm.value = vm.content = "";
            this.erroe_show = false;
            this.error_text = ""
          }
        

        }else{
          this.$message.error(res.desc);
        }
      })


    }
  },
  created() {

   
  },
  mounted() {
    // document.getElementsByClassName("abc")[0].style.background ="#F8F8F8";
    // document.getElementsByClassName("popper__arrow")[0].style.background = "#F8F8F8";
    this.email = JSON.parse(localStorage.user).email
    let s = this.email
    // this.name = s.split('@')[0]
 
    

  },
}
</script>
<style lang="less" scoped>
.contact_root {

  // width: 19.20rem;

  position: relative;

  .content {
    padding-left: 0.16rem;
    padding-right: 0.16rem;
    width: 100%;
    position: absolute;
    top: 0.24rem;
    left: 50%;
    transform: translateX(-50%);

    .title {
      width: 100%;
      text-align: center;
      height: 0.29rem;
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 500;
      font-size: 0.24rem;
      line-height: 0.24rem;
      margin-bottom: 0.20rem;
      color: #222;
    }

    .err {
      width: 100%;
      height: 0.52rem;
      background: #FFE7E6;
      text-align: center;
      line-height: 0.52rem;
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 400;
      font-size: 0.14rem;
      color: #FF4F44;
      margin-top: 0.24rem;
      transform: translateY(-0.14rem);
    }

    .names {
      color: #222222;

      text-align: left;

      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 400;
      font-size: 0.16rem;
      line-height: 0.22rem;
      margin-bottom: 0.24rem;
      .texts{
        display: flex;
        justify-content: space-between;
      }
      .spans{

        color: red;
        text-align: right;
     
      }

      .button {
        width: 100%;
        height: 0.36rem;
        line-height: 0.36rem;
        text-align: center;
        border-radius: 0.08rem;
        background: #373ABC;
        color: #fff;
        border: none;
        box-shadow: none;
        img{
          transform: translateY(0.03rem);
        }
      }

      .button:hover {
        background: #5F61D5;
      }

      .button:active {
        background: #2C2EA2;
      }

      .input_name {
        width: 100%;
        height: 0.4rem;
        margin-top: 0.08rem;

        .select {
          height: 0.4rem;
          width: 100%;
          background: #F1F1F1;
          border-radius: 8px;

        }

        input {
          width: 100%;
          height: 100%;
          background: #F1F1F1;
          border-radius: 8px;
          border: none;
          padding-left: 0.16rem;
          padding-right: 0.16rem;
        }


      }

      .textareas {
        height: auto;

        textarea {
          width: 100%;
          height: 2.0rem;
          background: #f1f1f1;
          padding-left: 0.16rem;
          padding-right: 0.16rem;
          padding-top: 0.1rem;
          font-family: 'PingFang SC';
          font-style: normal;
          font-weight: 400;
          font-size: 0.14rem;
          line-height: 0.2rem;
          border: none;
          border-radius: 0.08rem;
        }
      }
    }

  }
}

/deep/ .el-input__inner {
  background: #F1F1F1 !important;
  color: #222222;


}

.abc {
  .el-select-dropdown__item {
    margin-left: 0.08rem !important;
    margin-right: 0.08rem !important;
    box-sizing: border-box !important;
    color: #222222;
    border-radius: 0.04rem;

  }


  .el-select-dropdown__item:hover {
    background: #373ACB !important;
    color: #FFFFFF;
  }


}

/deep/ .el-input__inner {
  height: 0.4rem;
  font-size: 0.16rem;


}

/deep/ .el-input__inner::-webkit-input-placeholder {
  color: #787878;
}
 .title {
   font-size: 0.24rem !important;
   // line-height: 0.16rem !important;
 }
     .content {
          top: -0.1rem !important;
          padding-left: 0rem !important;
          padding-right: 0rem !important;
        }
</style>
