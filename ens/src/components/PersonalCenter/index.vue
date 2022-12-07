<template>
  <div>
    <div class="piao" @mousedown="closeb" v-show="this.$store.state.piao>0">
      <div @mousedown.stop="" class="contents">
        <i class="el-icon-close" @click="closeb"></i>
        <div class="title">Enter invoice information</div>
        <div class="input">
          <div class="input_1">
            <input class="input_1_1" type="text" v-model="names" placeholder="Your name">
            <input class="input_1_2" type="text" v-model="emaib" placeholder="Your email">
          </div>
          <div class="input_1">
            <input class="input_1_3" type="text" v-model="ress" placeholder="address">
          </div>
          <div class="input_1">
            <input class="input_1_1" type="text" v-model="city" placeholder="City">
            <input class="input_1_2" type="text" v-model="postalCode" placeholder="Zip/postal code">
          </div>
          <div class="input_1">
            <input class="input_1_1" type="text" v-model="Region" placeholder="Country/Region">
            <input class="input_1_2" type="text" v-model="Province" placeholder="State/Province">
          </div>
          <div class="input_1 input_2">
            <button @click="closeb">Cancel</button>
            <button @click="submit">Submit</button>

          </div>

        </div>

      </div>
    </div>
    <div class="root">
      <div class="mask" v-show="masks" @click="close('email')">
        <div @click.stop="" v-show="email_show" class="meails">
          <Icon @click.stop="close('email')" class="close" type="md-close"/>
          <div class="titles">Replace Mailbox</div>
          <div class="contens">
            <div>New mailbox</div>
            <div><input type="text" v-model="email_input_value" autocomplete="new-password"/></div>
          </div>
          <div class="contens">
            <div>Mailbox verification</div>
            <div class="btns">
              <input type="text" v-model="code" autocomplete="new-password"/>

              <div @click="emails">{{ Validation }}</div>
            </div>
          </div>

          <div class="btn_close">
            <button @click="close('email')">cancel</button>
            <button @click.stop="emailYes">confirm</button>
          </div>
        </div>
        <div @click.stop="" v-show="pwd_show" class="meails pwd">
          <Icon @click="close('pwd')" class="close" type="md-close" />
          <div class="titles">Replace Mailbox</div>
          <div class="contens">
            <div>Old password</div>
            <div><input autocomplete="new-password" v-model="oldpwd" type="password"/></div>
            <div v-show="olds" class="tips">Incorrect Password</div>
          </div>
          <div class="contens">
            <div>New Password</div>
            <div>
              <input autocomplete="new-password" v-model="newpwd" type="password"
                     placeholder="Password must be at least 6 characters." @input="change('pwd')"/>
            </div>
            <div class="tips">
              {{ tipsb }}
            </div>
          </div>
          <div class="contens">
            <div>Confirm Password</div>
            <div>
              <input autocomplete="new-password" v-model="newpwds" type="password"
                     placeholder="Password must be at least 6 characters." @input="change('pwds')"/>
            </div>
            <div class="tips">
              {{ tipss }}
            </div>
          </div>
          <div @click="close('pwd')" class="btn_close">
            <button>cancel</button>
            <button @click.stop="pwdyes">confirm</button>
          </div>
        </div>
        <div @click.stop="" v-show="crad" class="meails cradsp">
          <Icon @click="close('pwd')" class="close" type="md-close" />
          <div class="titles">Add Credit Card</div>
          <div class="contents">
            <div class="text">Card Number</div>
            <div><input autocomplete="new-password" type="text"/></div>
          </div>
          <div class="contents tips" v-show="tips">卡号格式不对</div>
          <div class="contents">
            <div class="text">Cardholder Name</div>
            <div><input autocomplete="new-password" type="text"/></div>
          </div>
          <div class="contents">
            <div class="text">Date</div>
            <div><input autocomplete="new-password" class="date" type="text"/></div>
            <div class="text cvc">Date</div>
            <div><input autocomplete="new-password" class="dates" type="text"/></div>
          </div>
          <div class="contents texts">
            Credit card type <img :src="card_list[0]" alt="" />
            <img :src="card_list[1]" alt="" />
            <img :src="card_list[2]" alt="" />
          </div>
          <div class="btn">
            <button class="btn_1">cancel</button>
            <button class="btn_2">Add A Credit Card</button>
          </div>
        </div>
      </div>
      <div class="left">
        <div class="title_img">
          <div class="text">{{ this.$store.state.username.icon_text }}</div>
        </div>
        <div class="names">{{ name }}</div>
        <div class="pattern">buy pattern：{{ this.$store.state.pattern }}</div>
        <div class="email">{{ email }}</div>
        <!-- <div class="icon">
       
          <Icon type="logo-chrome" class="chromes" />
          <Icon type="logo-twitter" class="chromes lefts" />
          <Icon type="logo-facebook" class="chromes lefts" />
        </div>
        <div @click="edit" class="button">Edit Data</div> -->
      </div>
      <div class="right">
        <div class="right_top">
          <div class="right_top_1" :class="right_topx1" @click="right_top(1)">
            Personal information
          </div>
          <div class="right_top_2" :class="right_topx2" @click="right_top(2)">
            My Order
          </div>
          <!-- <div class="right_top_3" :class="right_topx3" @click="right_top(3)">
            Payment Method
          </div> -->
        </div>
        <div class="content">
          <router-view />
        </div>
      </div>
    </div>
    <Bottom />
  </div>
</template>
<script>
import Bottom from "@/components/BottomNavigation/index";
export default {
  components: { Bottom },
  name: "Personal",
  data() {
    return {
      tipsb: "",
      tipss: "",
      names: "",
      emaib: "",
      ress: "",
      city: "",
      postalCode: "",
      Region: "",
      Province: '',
      suo: true,

      tips: false,
      card_list: [
        require("@/assets/img/visas.png"),
        require("@/assets/img/bluecrad.png"),
        require("@/assets/img/Mastercard.png"),
      ],
      email_show: false,
      Validation: "Get Validation",
      right_topx1: "right_topx",
      right_topx2: "",
      right_topx3: "",
      name: "",
      email: "",
      email_input_value: "",
      masks: false,
      code: "",

      // icon:[require("@/assets/img/googles.png"),require("@/assets/img/Twitter.png"),require("@/assets/img/Facebook.png")]
      // 旧密码
      pwd_show: false,
      oldpwd: "",
      newpwd: "", //新密码
      newpwds: "", //重复新密码
      olds: false,
      newds: false,

      // 新增信用卡
      crad: false,
    };
  },
  computed: {
    mask() {
      return this.$store.state.mask;
    },
  },
  watch: {
    mask() {
      if (this.$store.state.mask == "") {
        return;
      }
      this.masks = !this.masks;

      switch (this.$store.state.mask) {
        case "email":
          this.email_show = !this.email_show;
          return;
        case "pwd":
          this.pwd_show = !this.pwd_show;
          return;
        case "crad":
          this.crad = !this.crad;
          return;
      }
    },
  },
  methods: {
    change(item) {

      if (item == 'pwd') {
        if (!/^(?=.*[a-zA-Z])(?=.*[0-9])[A-Za-z0-9]{6,16}$/.test(this.newpwd)) {
          return this.tipsb = "The password can only contain 6-18 characters including letters, numbers and hyphens"
        } else {
         return this.tipsb = ""
        }

      }
      console.log(item)
      if (item == "pwds") {
        
        if (this.newpwd !== this.newpwds) {

          return this.tipss = "Inconsistent passwords"
        } else {
          return this.tipss = ""
        }
      }
    },
    submit() {
      const _this = this;
      if (!this.suo) {
        return
      }
      this.suo = false

      if (this.names === "") {
        this.suo = true
        return this.$message("name format error")
      }
      // debugger
      if (this.emaib === "") {
        this.suo = true
        return this.$message("emails format error")
      }

      if (!/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(this.emaib)) {
        this.suo = true
        return this.$message("Email format error")
      }
      if (this.ress === "") {
        this.suo = true
        return this.$message("ress format error")
      }

      if (this.city === "") {
        this.suo = true
        return this.$message("city format error")
      }
      if (this.postalCode === "") {
        this.suo = true
        return this.$message("postal code format error")
      }

      if (this.Region === "") {
        this.suo = true
        return this.$message("Region format error")
      }
      if (this.Province === "") {
        this.suo = true
        return this.$message("Province format error")
      }

      let c='';
      if(this.city)
        c+=this.city;
      if(this.Province){
        if(c!='')
          c+=',';
        c+=this.Province;
      }
      if(this.postalCode){
        if(c!='')
          c+=',';
        c+=this.postalCode;
      }

      this.rq({
        url: "/api/shop/getInvoice",
        method: "post",
        param: {
          id:this.$store.state.piao,
          name:this.names,
          email:this.emaib,
          city:c,
          street:this.Region,
          address:this.ress,
        },
        onError: function () {
        },
        _this,
      }).then((res) => {
        _this.suo = true
        if (res.code == 200) {

          // _this.$router.push("/thank")
          _this.name = _this.email = _this.value = _this.content = "";


          let ele = document.createElement('a');
          ele.setAttribute('href', _this.$imgServer+res.data); //设置下载文件的url地址
          ele.setAttribute('download', _this.$store.state.piao + '.pdf');//用于设置下载文件的文件名

          ele.setAttribute("target", "_blank");
          ele.click();

        }
      })
    },
    closeb() {
      this.$store.state.piao = false;
      document.body.style.overflow = "auto"
    },
    // 打开修改按钮
    edit() {
      this.$store.state.Center_button = true;
    },
    // 确定修改邮箱
    emailYes() {
      let vm = this;
      var s = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

      if (this.email_input_value === "") {
        return this.$message("Email not entered");
      }
      if (!s.test(this.email_input_value)) {
        return this.$message("The mail format is incorrect");
      }
      if (this.code === "") {
        return this.email_input_value;
      }
      this.rq({
        url: "/api/member/replaceEmail",
        method: "post",
        param: {
          email: this.email_input_value,
          code: this.code,
        },
        onError: function () {
        },
        vm,
      }).then((res) => {
        if (res.code == 200) {
          this.$message("Email modified successfully\n" +
              "\n");
        } else {
          //

          this.$message(res.desc);
        }
      });
    },
    // 向邮箱发送验证码
    emails() {
      if (this.Validation != "Get Validation") {
        return;
      }
      var s = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

      if (this.email_input_value === "") {
        return this.$message("Email not entered");
      }
      if (!s.test(this.email_input_value)) {
        return this.$message("The mail format is incorrect");
      }
      this.Validation = 60;
      var n = setInterval(() => {
        this.Validation--;
        if (this.Validation <= 0) {
          this.Validation = "Get Validation";
          clearInterval(n);
        }
      }, 1000);
      let vm = this;
      this.rq({
        url: "/api/member/getEmailCode",
        method: "get",
        param: {
          email: this.email_input_value,
        },
        onError: function () {
        },
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
    // 确认修改密码
    pwdyes() {
      if (this.oldpwd == "") {
        return (this.olds = true);
      } else {
        this.olds = false;
      }
      if (this.newpwd != this.newpwds || this.newpwd == "") {
        return (this.newds = true);
      } else {
        this.newds = false;
      }

      let vm = this;
      this.rq({
        url: "/api/member/updatePwd",
        method: "post",
        param: {
          email: JSON.parse(localStorage.user).email,
          password: this.newpwd,
          oldPassword: this.oldpwd,
        },
        onError: function () {
        },
        vm,
      }).then((res) => {
        if (res.code == 200) {
          this.$message("modify successfully");
        } else {
          //

          this.$message(res.desc);
        }
      });
      this.$store.state.pwds = this.newpwd;
      this.oldpwd = this.newpwd = this.newpwds = "";
      this.close("pwd");
    },
    // 关闭mask弹窗
    close(a) {
      this.meails = this.pwd_show = this.crad = false;
      this.masks = !this.masks;
      this.$store.state.mask = "";
      document.body.style.overflow = "auto";
      switch (a) {
        case "email":
          this.email_show = !this.email_show;
          break;
        case "pwd":
          this.pwd_show = !this.pwd_show;
          break;
      }
    },
    // 设置三个错误信息的显示和隐藏
    right_top(x) {
      this.email_show = this.pwd_show = this.crad = false;
      this.right_topx1 = this.right_topx2 = this.right_topx3 = "";
      switch (x) {
        case 1:
          this.right_topx1 = "right_topx";

          this.$router.push("/personalCenter");
          return;
        case 2:
          this.right_topx2 = "right_topx";
          this.$router.push("/orderForm");
          return;
        case 3:
          this.right_topx3 = "right_topx";

          this.$router.push("/method");
          return;
      }
    },
  },
  created() {
    this.name = JSON.parse(localStorage.user).email.split("@")[0];
    this.email = JSON.parse(localStorage.user).email;
  },
  mounted() {
    switch (this.$route.fullPath) {
      case "/orderForm":
        this.right_top(2)
        break;
      case "/personalCenter":
        this.right_top(1)
        break;
    }

    this.$store.state.Navigation_in = "Navigation_up";

    if (this.$route.path == "/orderForm") {
      this.right_topx2 = "right_topx";
      // this.right_top(2);
    }
    if (this.$route.path == "/personalCenter") {
      this.right_topx1 = "right_topx";
      // this.right_top(1);
    }
    if (this.$route.path == "/method") {
      this.right_topx3 = "right_topx";
      // this.right_top(3);
    }
  },
};
</script>
<style lang="less" scoped>
.piao {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  position: fixed;
  z-index: 10;

  .contents {
    position: absolute;
    width: 6.84rem;
    height: 4.14rem;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    background: #FFFFFF;
    border-radius: 0.14rem;
    padding-left: 0.32rem;
    padding-right: 0.32rem;
    order: 1;
    box-sizing: border-box;

    .el-icon-close {
      position: absolute;
      font-size: 0.24rem;
      right: 0.14rem;
      top: 0.14rem;
      cursor:pointer;
    }

    .title {
      width: 100%;
      text-align: center;
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 500;
      font-size: 0.16rem;
      line-height: 0.22rem;
      color: #000000;
      margin-top: 0.32rem;
    }

    .input {
      padding-top: 0.08rem;

      .input_1 {
        display: flex;
        justify-content: space-between;
        margin-top: 0.16rem;

        input {
          width: 3rem;
          height: 0.48rem;
          padding-left: 0.14rem;
          padding-right: 0.16rem;
          gap: 10px;
          background: #F8F8F8;
          border: 1px solid #F1F1F1;
          border-radius: 0.14rem;
        }

        .input_1_3 {
          width: 6.20rem;
        }
      }

      .input_2 {
        justify-content: flex-end;

        button:hover {
          cursor: pointer;
        }

        button {
          margin-left: 0.5rem;
          width: 0.83rem;
          height: 0.38rem;
          text-align: center;
          line-height: 0.38rem;
          background: #F1F1F1;
          color: #222;
          border-radius: 0.20rem;
          border: none;
        }

        button + button {
          background: #373ACB;
          color: #FFFFFF;
        }
      }
    }

  }
}

.root {
  width: 100%;

  background: #f7f9fd;

  display: flex;
  padding-left: 1.73rem;

  .mask {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0rem;
    left: 0rem;
    background: rgba(0, 0, 0, 0.4);
    z-index: 10;

    .meails {
      width: 4rem;

      position: absolute;
      left: 50%;
      top: 50%;
      background: #fff;
      border-radius: 0.14rem;
      transform: translateX(-50%) translateY(-50%);
      padding-left: 0.4rem;
      box-sizing: border-box;

      .titles {
        width: 3.1rem;
        text-align: center;
        margin-top: 0.24rem;
        font-family: "PingFang SC";
        font-style: normal;
        font-weight: 700;
        font-size: 0.18rem;
      }

      .close {
        position: absolute;
        top: 0.1659rem;
        right: 0.1659rem;
        font-size: 0.2rem;
      }

      .contens {
        margin-top: 0.24rem;

        .btns {
          display: flex;
          width: 3.1rem;
          position: relative;

          div:active {
            background: #2C2EA2;
          }

          div:hover {
            background: #5F61D5;
          }

          div {
            position: absolute;
            line-height: 0.36rem;
            height: 0.36rem;
            background: #373acb;
            color: #fff;
            margin-top: 0.08rem;
            width: 1.42rem;
            text-align: center;
            border-radius: 0.18rem;
            right: 0rem;
          }
        }

        .tips {
          padding-right: 0.4rem;
          text-align: right;
          font-family: "PingFang SC";
          font-style: normal;
          font-weight: 400;
          font-size: 0.14rem;
          color: #ff6e41;
        }
        input {
          box-sizing: border-box;
          padding-left: 0.18rem;
          border: none;
          width: 3.2rem;
          height: 0.36rem;
          background: #f1f1f1;
          border-radius: 0.18rem;
          margin-top: 0.08rem;
        }
      }

      .btn_close {
        margin-top: 0.24rem;
        width: 3.1rem;
        text-align: center;
        margin-bottom: 0.24rem;

        button:active {
          background: #ebebf9;
        }

        button + button:hover {
          background: #5F61D5;
        }

        button + button:active {
          background: #2C2EA2;
        }

        button {
          width: 0.93rem;
          height: 0.36rem;

          text-align: center;
          line-height: 0.36rem;
          font-family: "PingFang SC";
          font-style: normal;
          font-weight: 700;
          font-size: 0.16rem;
          border-radius: 0.18rem;
          color: #707070;
          border: none;
          background: #fff;
        }

        button + button {
          margin-left: 0.48rem;
          background: #373acb;
          color: #fff;
        }
      }
    }

    .cradsp {
      width: 7rem !important;
      padding-left: 0rem !important;

      .titles {
        width: 100%;
        text-align: center;
        font-family: "PingFang SC";
        font-style: normal;
        font-weight: 700;
        font-size: 0.16rem;
        color: #000;
        margin-bottom: 0.04rem;
      }

      .contents {
        display: flex;
        margin-top: 0.16rem;
        height: 0.45rem;

        .text {
          line-height: 0.45rem;
          width: 1.62rem;
          text-align: right;
          box-sizing: border-box;
          padding-right: 0.08rem;
        }

        .cvc {
          width: 1.2rem;
        }

        .date {
          width: 2.2rem !important;
        }

        .dates {
          width: 1.6rem;
        }

        input {
          width: 5rem;
          height: 0.45rem;
          background: #f8f8f8;
          border: 1px solid #f1f1f1;
          border-radius: 0.08rem;
        }
      }

      .tips {
        width: 100%;
        height: 0.09rem;
        display: block;
        box-sizing: border-box;
        padding-right: 0.41rem;
        line-height: 0;
        color: red;
        text-align: right;
      }

      .texts {
        text-align: right !important;
        width: 7rem;
        display: block;
        box-sizing: border-box;
        padding-right: 0.38rem;

        img {
          margin-left: 0.08rem;
        }
      }

      .btn {
        width: 100%;
        margin-top: 0.15rem;
        text-align: right;
        box-sizing: border-box;
        padding-right: 0.39rem;
        margin-bottom: 0.38rem;

        button {
          border-radius: 0.08rem;
          height: 0.36rem;
          width: 0.77rem;
          text-align: center;
          line-height: 0.36rem;
          font-family: "PingFang SC";
          font-style: normal;
          font-weight: 400;
          font-size: 0.14rem;
          color: #222222;
          border: none;
        }

        button + button {
          width: 1.54rem;
          color: #fff;
          background: #373acb;
          margin-left: 0.4rem;
        }
      }
    }
  }

  .left {
    width: 3.02rem;
    height: 6.3rem;
    background: #fff;
    margin-top: 0.8rem;
    border-radius: 0.14rem;
    box-sizing: border-box;
    padding-left: 0.2rem;
    padding-right: 0.2rem;

    .title_img {
      width: 100%;
      text-align: center;
      height: 0.8rem;
      //   transform: translateY(-50%);
      margin-top: -0.4rem;
      font-size: 0.48rem;

      .text {
        width: 0.8rem;
        height: 0.8rem;
        display: inline-block;
        background: #c4c4c4;
        border-radius: 50%;
        line-height: 0.8rem;
        font-family: "PingFang SC";
        font-style: normal;
        font-weight: 700;
        color: #fff;
        text-align: center;
      }
    }

    .names {
      overflow: hidden;
      height: 0.68rem;
      padding-bottom: 0.08rem;
      box-sizing: border-box;
      text-align: center;
      font-family: "PingFang SC";
      font-style: normal;
      font-weight: 700;
      font-size: 0.2rem;
      line-height: 0.6rem !important;
      margin-bottom: 0 !important;
    }

    .pattern {
      text-align: center;
      font-family: "PingFang SC";
      font-style: normal;
      font-weight: 400;
      font-size: 0.14rem;
      padding-bottom: 0.24rem;
      border-bottom: 2px dashed #f1f1f1;
    }

    .email {
      height: 0.7rem;
      line-height: 0.7rem;
      text-align: center;
      font-family: "PingFang SC";
      font-style: normal;
      font-weight: 400;
      font-size: 0.14rem;
    }

    .icon {
      width: 100%;
      height: 0.44rem;
      font-size: 0.14rem;
      text-align: center;

      .lefts {
        margin-left: 0.3rem;
      }
    }

    .button:active {
      background: #ebebf9;
    }

    .button {
      margin-left: 50%;
      transform: translateX(-50%);
      text-align: center;
      width: 1.19rem;
      height: 0.36rem;
      border-radius: 0.2rem;
      border: 1px solid #373acb;
      font-family: "PingFang SC";
      font-style: normal;
      font-weight: 400;
      font-size: 0.14rem;
      line-height: 0.36rem;
      color: #373acb;
    }
  }

  .right {
    width: 12.56rem;
    margin-bottom: 1rem;
    margin-top: 0.16rem;
    margin-left: 0.16rem;

    .right_top {
      height: 0.64rem;
      line-height: 0.32rem;
      width: 100%;
      padding-left: 0.24rem;
      text-align: center;
      display: flex;
      font-family: "PingFang SC";
      font-style: normal;
      font-weight: 700;
      font-size: 0.16rem;
      padding-top: 0.16rem;
      padding-bottom: 0.16rem;
      box-sizing: border-box;

      .right_topx {
        color: #373acb;
      }

      .right_top_1 {

        text-align: left;
        padding-right: 0.4rem;
        white-space: nowrap;
      }

      .right_top_1:hover {
        cursor: pointer;
      }

      .right_top_2:hover {
        cursor: pointer;
      }

      .right_top_3:hover {
        cursor: pointer;
      }

      .right_top_2 {
        width: 1.51rem;
        border-left: 2px solid #c4c4c4;
        // border-right: 2px solid #c4c4c4;
      }

      .right_top_3 {
        width: 1.69rem;
        text-align: right;
      }
    }

    .content {
      border-radius: 0.14rem;

      width: 100%;
    }
  }
}

/deep/ .chromes {
  font-size: 0.2rem;
  // color: red;
}
</style>
