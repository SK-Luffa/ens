<template>
  <div class="Navigation" :class="this.$store.state.Navigation_in">
    <div class="filesb"></div>
    <input class="files" type="file" autocomplete="new-password" />
    <ul class="Navigation_ul">
      <li class="Navigation_ul_li_one lis">
        <img class="img" @click="logo" :src="login" alt=""/>
      </li>
      <div class="mall" @mouseover="malls">
        <span @click="Malls">{{ Mall }}
          <svg @click="Malls" class="malls" width="20" height="20" viewBox="0 0 20 20" fill="none"
               xmlns="http://www.w3.org/2000/svg">
            <path d="M10 16L16 10L10 4" stroke="#C4C4C4" stroke-width="2" stroke-linecap="round"
                  stroke-linejoin="round"/>
          </svg></span>
      

        <div class="dropDown" v-show="mals">
          <div class="dropDowns">
            <div class="dropDown_title" v-for="(item, index) in selectAllType" :key="index" :class="deg[index]"
                 v-show="item.name != 'Price' && item.name != 'License type'"
                 @mouseover="dropDown_titles(item.data, index)">{{
                   item.name
                 }}
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 16L16 10L10 4" stroke="#C4C4C4" stroke-width="2" stroke-linecap="round"
                      stroke-linejoin="round"/>
              </svg>
            </div>
          </div>

          <div class="dropDownList" v-show="dropDownList_show">
            <div class="column_0">
              <div class="dropDown_title " v-for="(item, index) in selectAllType_1" :key="index" :class="degs[index]"
                   @click="screens(item, index)">

                <div class="text "> {{ item.word.slice(0, 1).toUpperCase() + item.word.slice(1) }}</div>

                <div class="number">{{ item.productCount }}</div>

              </div>
            </div>
            <div class="column_1">
              <div class="dropDown_title" v-for="(item, index) in selectAllType_2" :key="index"
                   :class="degs[index + 15]" @click="screens(item, index + 15)">
                <div>{{ item.word }}</div>

                <div>{{ item.productCount }}</div>
              </div>


            </div>
          </div>
        </div>


      </div>
<div  @click="Blogs('Fashion')" class="mall  Fashion" :class="Fashion" >Fashion Trend <img :src="free" alt=""></div>
<div  @click="Blogs('blog')" class="mall  blog" :class="blogs" > Blog</div>
      <li class="Navigation_ul_li_two lis">
        <div class="Navigation_ul_li_two_div">
          <input autocomplete="new-password" v-model="$store.state.world" class="Navigation_ul_li_two_div_input"
                 @keyup.enter="keywords" placeholder="search" type="text"/>

          <img class="Navigation_ul_li_two_div_img_one" @click="uploads" :src="Vector" alt="" />
          <svg @click="keywords" class="Navigation_ul_li_two_div_img_two" width="46" height="46" viewBox="0 0 46 46"
            fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="46" height="46" rx="23" fill="#373ACB" />
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M24.4304 16.618C26.5877 18.7753 26.5877 22.2731 24.4304 24.4304C22.273 26.5877 18.7753 26.5877 16.618 24.4304C14.4607 22.2731 14.4607 18.7753 16.618 16.618C18.7753 14.4607 22.273 14.4607 24.4304 16.618ZM26.5493 25.0327C28.7604 22.0854 28.5255 17.8847 25.8446 15.2038C22.9062 12.2654 18.1422 12.2654 15.2038 15.2038C12.2654 18.1422 12.2654 22.9062 15.2038 25.8446C17.8848 28.5256 22.0857 28.7605 25.033 26.5491C25.0495 26.5681 25.0668 26.5866 25.0848 26.6047L31.1653 32.6852C31.5851 33.105 32.2657 33.105 32.6854 32.6852C33.1052 32.2654 33.1052 31.5848 32.6854 31.1651L26.605 25.0846C26.5869 25.0665 26.5683 25.0492 26.5493 25.0327Z"
              fill="white" />
          </svg>
          <!-- <img @click="keywords"  :src="Group[0]" alt="" /> -->
        </div>
      </li>
      <li class="Navigation_ul_li_three lis" v-show="!this.$store.state.login_bool">
        <div class="Shopping icons" @click="shopping" style="margin-right:0.5rem;transform: translateY(-5%);">
          <div class="svgs">
            <img :class="svgc" :src="icon_list[1]" alt=""/>
          </div>

        </div>
        <div class="login" @click="loginBtn">{{ Log }} {{ ins }}</div>

        <div class="signup" @click="signupBtn">{{ Sign }} {{ up }}</div>
      </li>
      <li class="Navigation_ul_li_three lip" v-show="this.$store.state.login_bool">
        <div class="Collection icons" @click="Favorites">
          <div class="svgs"><img :class="svgb" :src="icon_list[0]" alt="" /></div>

          <!-- <img :src="icon_list[4]" alt="" /> -->
        </div>
        <div class="Shopping icons" @click="shopping">
          <div class="svgs">
            <img :class="svgc" :src="icon_list[1]" alt="" />
          </div>

        </div>

        <div class="down icons" @click="personalCenter">
          <div class="down_user_icon">

            {{ this.$store.state.username.icon_text }}
          </div>
          <img :src="icon_list[2]" alt="" class="downs" />

          <div class="hoverds">
            <div class="hoverd" @click.stop="">
              <div class="hover_email" @click="persona">
                <div class="hover_title">
                  <!-- {{ this.$store.state.username.title }} -->
                  Account
                </div>
                <!--                {{ this.$store.state.username.email }}-->
              </div>
              <div @click="Favorites">Favorites</div>
              <div @click="shopping">Shopping Cart</div>
              <div @click="orderForm">My Order</div>
              <div @click="out">Log out</div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      Fashion:'',
      blogs:'',
      deg: [],
      degs: [],
      mals: true,
      dropDownList_show: true,
      svgb: "",
      svgc: "",
      keywordbs: "",
      title: "",
      email: "",
      jus: "",
      free: require("@/assets/img/free.gif"),
      login: require("@/assets/img/login.svg"),
      Vector: require("@/assets/img/Vector.svg"),
      Group: [require("@/assets/img/Group.svg"), require("@/assets/img/group_2.svg"), require("@/assets/img/group_3.svg"),],
      gx: [require("@/assets/img/go.svg"), require("@/assets/img/xing.svg")],
      icon_list: [
        require("@/assets/img/xing.svg"),
        require("@/assets/img/go.svg"),
        require("@/assets/img/bottoms.svg"),
        require("@/assets/img/shopping.svg"),
        require("@/assets/img/starlight.svg")
      ],
      Mall: "All Designs",
      Log: "Sign",
      ins: "In",
      Sign: "Sign",
      up: "Up",
      selectAllType: [],
      selectAllType_1: [],
      selectAllType_2: [],

    };
  },
  created() {
    let vm = this;

    console.log(window.location.pathname);
    console.log(vm.$route);

    let ptype = localStorage.getItem("product_type");
    // let ptype = JSON.parse(localStorage.getItem("product_type"));

    if(!ptype || window.location.pathname=='/'){
  
      this.rq({
        url: "/api/product/selectAllType",
        method: "get",
        param: {},
        onError: function () {
        },
        vm,
      }).then((res) => {

        // vm.valuem[1] = vm.valuemx = res.data[1].data.maxPrice;
        if (res.code == 200) {

          res.data.forEach(function (item, idx) {
            if (item.name == 'Price') {
            } else if (item.name == 'License type') {
            } else {
              item.data.forEach(function (citem, cidx) {
                citem.check = false;
              })
            }
          });

          vm.$store.state.selectAllTypes=   vm.selectAllType = res.data;
          console.log(vm.selectAllType,111);
          localStorage.setItem('product_type', JSON.stringify(vm.selectAllType));
          console.log(vm.selectAllType, 222);
        } else {
          //
          this.$message(res.desc);
        }
      });

    }else{
      vm.selectAllType = JSON.parse(ptype);
      // vm.dropDown_titles(vm.selectAllType[0].data, 0);
    }


    if (localStorage.user) {
      this.$store.state.login_bool = true;
      // this.$store.state.Navigation_in = "Navigation_up";
      this.$store.state.username.title = JSON.parse(localStorage.user).userName;
      this.$store.state.username.email = JSON.parse(localStorage.user).email;
      this.$store.state.username.icon_text = JSON.parse(localStorage.user).companyName.split("")[0].toUpperCase();
    } else {
      this.$store.state.login_bool = false;
      // this.$store.state.Navigation_in = "Navigation_in";
    }
  },
  computed: {
    loginState() {
      return this.$store.state.loginState
    },
    svgs() {
      return this.$store.state.svgs
    },
    svgg() {

      return this.$store.state.svgg
    }
  },
  watch: {
    loginState(newVal, oldVal) {
      if (newVal) {
        this.logins()
        this.$store.state.loginState = false;
      }
    },
    svgs(newVal, oldVal) {

      if (this.$store.state.svgs) {
        this.svgb = "svgb"
      } else {
        this.svgb = ""
      }
    },
    svgg(newVal, oldVal) {

      if (this.$store.state.svgg) {
        this.svgc = "svgc"
      } else {
        this.svgc = ""
      }

    }
  },
  methods: {
    // 点击导航的Fashion 或 Blog
    Blogs(name){
      this.Fashion=this.blogs=""
      if (name ==="Fashion"){
        // this.Fashion ="Fashions"
        this.$router.push("/fashion")
      } else if (name === "blog"){
        // this.Fashion = "Fashions"
        this.$router.push("/blog")
      }
    },
    malls() {
      this.mals = true
    },
    // 
    screens(items, b) {

      this.degs = [];

      for (let index = 0; index < this.selectAllType_1.length + this.selectAllType_2.length; index++) {
        this.degs.push("")
      }


      this.degs[b] = "deg_1"
      // this.Mall = items.word

      this.dropDownList_show = true;
      this.mals = false

      // console.log(items);
      // this.$router.push({
      //   path: '/store',
      //   query: {ids:items.id}
      // });

      this.$emit('search',items.id)
      // this.$store.state.screen_items = items
      // this.$store.state.index = b
      // this.$store.state.blank = "screen";
      // this.$router.push("/blank");
    },
    // /鼠标移出
    Removelist() {

      this.dropDownList_show = false
      // console.log("离开");

    },
    // 点击筛选
    dropDown_titles(it, b) {

      this.deg = [];
      for (let index = 0; index < this.selectAllType.length; index++) {
        this.deg.push("")
      }
      this.deg[b] = "deg_1"

      this.$store.state.wordname = b;
      if (it == [] || !Array.isArray(it)) {
        return this.dropDownList_show = true
      }

      let s = [];
      it.map(item => {
        s.push(item)
      })
      this.dropDownList_show = true
      this.selectAllType_1 = s.splice(0, 15);
      this.selectAllType_2 = s


    },
    persona() {
      // this.$store.state.blank = "personalCenter";
      this.$router.push("/personalCenter");

      // this.$router.push("/blank");
    },
    out() {

      let vm = this;
      this.rq({
        url: "/api/member/logout",
        method: "get",
        param: {
          email: this.value,
        },
        onError: function () {
        },
        vm,
      }).then((res) => {
        if (res.code == 200) {
          // localStorage.token = res.data.token;
          localStorage.user = "";
          this.$store.state.blank = "";
          localStorage.token = "",
              this.$store.state.login_bool = false;

          this.$emit('logout')

          // this.$store.state.Navigation_in = "Navigation_in";
          // this.$router.push("/");
        } else {
          //

          this.$message(res.desc);
        }
      });
    },
    Favorites() {
      this.$store.state.blank = "favorites";
      this.$router.push("/favorites");
      // this.$router.push("/blank");
    },
    shopping() {
      window.kus = this;
      // this.$store.state.blank = "shoppingcar";
      if(this.$route.path!='/shoppingcar')
        this.$router.push("/shoppingcar");
      // this.$router.push("/blank");
    },
    orderForm() {
      this.$store.state.blank = "orderForm";
      this.$router.push("/orderForm");
      // this.$router.push("/blank");
    },
    personalCenter() {
      // this.$store.state.blank = "personalCenter";
      this.$router.push("/personalCenter");
    },
    keywords() {
      // let p={
      //   path: '/screen',
      //   query:{}
      // };
      // if(this.$store.state.world!='')
      //   p['query'].q=this.$store.state.world;
      // this.$router.push(p);

      this.$emit('search')


      // if (!window.localStorage.user) {
      //   this.logins()
      // } else {
      //
      //   // this.$store.state.world = this.keywordbs;
      //
      //   if (this.$route.path === "/screen") {
      //     return
      //   }
      //   this.$router.push("/screen");
      //
      //
      // }

    },
    logo() {
      this.$store.state.world = '';
      this.$store.state.option = '';
      this.$router.push("/");
      // if (window.localStorage.user) {
      //   this.$router.push("/");
      // } else {
      //   this.logins()
      // }
    },
    Malls() {
      // if (window.localStorage.user) {
      // console.log(this.$route)
      if (this.$route.path != '/store') {
        this.$store.state.blank = "store";
        this.$router.push("/blank");
      } else {
        this.$router.push("/store");
        location.reload()
      }
      // } else {
      //   this.logins()
      // }
    },
    loginBtn() {
      // this.$router.push("/");
      this.$store.state.login = true;
      this.$store.state.logins = true
      this.$store.state.ForgetPwd = false
      this.$store.state.Sign = false
    },
    signupBtn() {
      this.$store.state.login = true;
      this.$store.state.logins = false
      this.$store.state.ForgetPwd = false
      this.$store.state.Sign = true
    },
    logins(up) {
      this.$store.state.login = true;
      document.getElementsByTagName("body")[0].style.position = "fixed";
      console.log(1);
      if (up == "up") {
        this.$store.state.up++;
      }
    },
    uploads() {
      // if (!window.localStorage.user) {
      //   this.logins()
      // } else {
      let s = document.getElementsByClassName("el-upload")[0];

      if (s) {


        if (s.style.display == "" || s.style.display == "none") {
          s.style.display = "block";
        } else {
          s.style.display = "none";
        }
      } else {
        this.$router.push("/store");
      }
      // }

    },
  },
  mounted() {


  },
};
</script>

<style lang="less" scoped>
.Navigation_in {
  background: rgba(255, 255, 255, 0.6);
}

.Navigation_up {
  background: #ffffff;
}

.Navigation {
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.08);
  position: fixed;
  z-index:999;

  .files {
    display: none;
  }

  width: 100%;
  height: 0.67rem;
  /*max-width: 2560px;*/
  min-width: 960px;
  top: 0;
  // position: absolute;
  padding-left: 0.56rem;
  box-sizing: border-box;

  // padding-right: 0.56rem;
  .Navigation_ul {
    height: 0.67rem;
    display: flex;
    margin-bottom: 0px;
    position: relative;

    .malls {

      right: 0;

      transform: translateX(25%) rotateZ(90deg);
    }

    .mall {
      display: flex;
      height: 0.44rem;
      line-height: 0.44rem;
      top: 50%;
      transform: translateY(-50%);
      position: absolute;
      font-family: "PingFang SC";
      font-style: normal;
      font-weight: 700;
      font-size: 0.2rem;
      // line-height: 28px;
      left: 1.07rem;
      padding-left: 0.1rem;
      padding-right: 0.1rem;
      border-radius: 0.04rem;
      color: #AAAAAA;

      .dropDown {
        padding-right: 0.24rem;
        position: absolute;
        transform: translateX(-0.1rem) translateY(0.45rem);
        display: none;
        z-index: 1;
        //width: 10rem;

        .dropDowns {

          box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.10);
          margin-top: 0.10rem;
          padding-top: 0.16rem;
          padding-right: 0.24rem;
          padding-left: 0.24rem;
          // margin-top: 0.3rem;
          width: 2.08rem;
          background: rgba(255, 255, 255, 1);
          height: 6.84rem;
          overflow: auto;
          border-radius: 0.14rem;

          .dropDown_title {
            padding-left: 0.08rem;
            height: 0.38rem;
            line-height: 0.38rem;
            margin-bottom: 0.12rem;
            border-radius: 0.08rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding-right: 0.08rem;
            box-sizing: border-box;
            font-size: 0.16rem;

            div:hover {
              cursor: pointer;
            }

            .text {
              cursor: pointer;
            }

            .number {
              cursor: pointer;
            }
          }

          .dropDown_title:hover {
            cursor: pointer;
          }

          .dropDown_title:hover {
            background: #F1F1F1;
            cursor: pointer;

          }
        }
      }

      .dropDownList {
        position: absolute;
        width: 5.08rem;
        height: 6.84rem;
        background: rgba(255, 255, 255, 1);
        transform: translateX(1.98rem) translateY(0.1rem);
        box-shadow: 0px 0px 0.16rem rgba(0, 0, 0, 0.1);
        border-radius: 0.14rem;
        color: #222222;
        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 400;
        font-size: 0.14rem;
        padding-top: 0.15rem;
        display: flex;
        top: 0rem;
        z-index: -2;
        left: 0.1rem;

        .dropDown_title:hover {
          background: rgba(241, 241, 241, 1);
          cursor: pointer;
        }

        .dropDown_title {
          width: 1.9rem;
          height: 0.36rem;
          line-height: 0.36rem;
          border-radius: 8px;
          margin-bottom: 0.08rem;
          box-sizing: border-box;
          padding-left: 0.08rem;
          padding-right: 0.08rem;
          margin-left: 0.24rem;
          overflow: hidden;
          display: flex;
          justify-content: space-between;

          div:hover {
            cursor: pointer;
          }

          .number {
            color: #666666;
            font-size: 0.14rem;
          }

          .number:hover {
            cursor: pointer;
          }
        }

        .dropDown_title:hover {
          cursor: pointer;
        }
      }
    }
    
    .Fashion{
      left: 3.08rem;
      img{
        position: absolute;
        width: 0.33rem;
        height: 0.18rem;
        right: -0.2rem;
        top: -0.01rem;
      }
    }
    .Fashions{
      color: #222;
    }
    .blog{
      left: 5.4rem;
    }
    .blogs{
      color: #222;
    }

    .mall:hover {

      // .filesb{
      //   width: 100%;
      //   height: 100%;
      //   background: red;
      // }
      cursor: pointer;
      background: rgba(241, 241, 241, 0.4);
      color: #222;

      // body{
      //   overflow: hidden;
      //   height: 100%;
      //   width: 100%;
      // }
      .dropDown {
        display: block;
      }

    }

    .lis {
      padding-top: 0.105rem;
    }

    li {
      position: absolute;

      height: 100%;
      box-sizing: border-box;

      float: left;
      list-style: none;
    }

    .Navigation_ul_li_one {
      display: flex;


      .img {
        width: 0.48rem;
        height: 0.48rem;
        cursor: pointer;
      }

      div {
        display: inline-block;
      }

      .text {
        margin-top: 0.0921rem;
        height: 100%;
        line-height: 100%;
        margin-left: 0.69rem;
        font-family: "PingFang SC";
        font-style: normal;
        font-weight: 700;
        font-size: 0.2rem;
      }

      .text:hover {
        cursor: pointer;
      }
    }

    .Navigation_ul_li_two {
      display: flex;
      position: absolute;
      left: 55%;
      transform: translateX(-50%);

      .Navigation_ul_li_two_div {
        margin-top: -0.016rem;
        position: relative;
        width: 6rem;
        height: 0.5rem;
        background: #f1f1f1;
        border-radius: 0.25rem;
        overflow: hidden;

        svg:hover {
          rect {
            fill: #5F61D5;
          }
        }

        svg:active {
          rect {
            fill: #2C2EA2;
          }
        }

        .Navigation_ul_li_two_div_input {
          position: absolute;
          margin-left: 0.22rem;
          height: 100%;
          width: 5.78rem;
          border: none;
          outline: none;
          background: #f1f1f1;
          color: #222;
          font-size: 0.2rem;
        }

        .Navigation_ul_li_two_div_input::placeholder {
          color: #cccccc;
        }

        .Navigation_ul_li_two_div_img_one {
          width: 0.22rem;
          height: 0.22rem;
          position: absolute;
          right: 0.67rem;
          top: 50%;
          transform: translateY(-50%);
          cursor: pointer;
        }

        .Navigation_ul_li_two_div_img_two {
          height: 0.46rem;
          width: 0.46rem;
          position: absolute;
          right: 0.1vw;
          top: 50%;
          transform: translateY(-50%);
          cursor: pointer;
        }


        // .Navigation_ul_li_two_div_img_two:active {
        //   fill: red;


        // }

        // .Navigation_ul_li_two_div_img_two:hover {
        //   fill: green;
        // }
      }
    }

    .Navigation_ul_li_three {
      z-index: 3;
      position: absolute;
      right: 0.56rem;
      display: flex;
      font-size: 0.32rem;

      .icons {
        height: 0.67rem;
        line-height: 0.67rem;

        .svgs {
          width: 0.32rem;
          height: 0.32rem;
          line-height: 0.32rem;
          margin: 0 auto;
          overflow: hidden;
          display: inline-block;
          cursor:pointer;

          img {
            width: 100%;
            height: 100%;

          }

          .svgb {
            filter: drop-shadow(#FFB13D 0.32rem 0);
            transform: translateX(-0.32rem);
          }

          .svgc {
            filter: drop-shadow(#FFB13D 0.32rem 0);
            transform: translateX(-0.32rem);
          }
        }

        .svgs:hover img {
          filter: drop-shadow(#FFB13D 0.32rem 0);
          transform: translateX(-0.32rem);
        }


      }

      .Collection {
        cursor: pointer;
      }

      .Shopping {
        margin-left: 0.5rem;
        cursor: pointer;
      }

      .down:hover {
        cursor: pointer;
      }

      .down:hover {
        .hoverds {
          display: block;
        }
      }

      .down {
        cursor: pointer;
        .hoverds {
          display: none;
          width: 100%;
          margin-top: 0px;
          height: 1rem;

          .hoverd {
            box-sizing: border-box;
            padding-top: 0.16rem;
            padding-left: 0.16rem;
            padding-right: 0rem;
            position: absolute;
            left: 0.81rem;
            top: 0.64rem;
            width: 1.56rem;
            padding-bottom: 0.08rem;
            // height: 2.61rem;
            background: #fff;
            z-index: 214748;
            border-radius: 0.08rem;

            div {
              width: 1.4rem;
              height: 0.36rem;
              line-height: 0.36rem;
              box-sizing: border-box;
              padding-left: 0.08rem;
              font-family: "PingFang SC";
              font-style: normal;
              font-weight: 400;
              font-size: 0.12rem;
              overflow: hidden;
              color: #222222;
              border-radius: 0.04rem;
              margin-bottom: 0.08rem;
              cursor: pointer;
            }

            div:hover {
              background: #f1f1f1;
            }

            .hover_email {
              width: 1.4rem;
              height: 0.36rem;
              line-height: 0.01rem;

              .hover_title {
                width: 100%;
                padding-left: 0rem;
                font-family: "PingFang SC";
                font-style: normal;
                font-weight: 700;
                font-size: 0.14rem;

                color: #222222;
              }
            }
          }
        }

        margin-left: 0.5rem;

        .down_user_icon {
          cursor: pointer;
          transform: translateY(-28%);
          position: relative;
          height: 0.32rem;
          font-family: "PingFang SC";
          font-style: normal;
          width: 0.32rem;
          background: #222;
          display: inline-block;
          text-align: center;

          font-size: 0.2rem;
          line-height: 0.32rem;
          color: #ffffff;
          border-radius: 50%;
        }

      }

      .login:active {
        background: #ebebf9;
      }

      .login:hover {
        background: #f1f1f1;
      }

      .login {
        font-size: 0.14rem;
        background: #ffffff;
        height: 0.5rem;

        padding-left: 0.16rem;
        padding-right: 0.16rem;
        font-style: normal;

        color: #222222;
        border-radius: 0.3rem;
        text-align: center;
        line-height: 0.5rem;
        margin-right: 0.5rem;
        border: 1px solid #eee;
        box-sizing: border-box;

        cursor: pointer;
      }

      .signup:hover {
        background: #5F61D5;
      }

      .signup:active {
        background: #2C2EA2;
      }

      .signup {
        font-size: 0.14rem;
        background: #373acb;
        padding-left: 0.16rem;
        padding-right: 0.16rem;
        height: 0.5rem;

        font-style: normal;
        color: #ffffff;
        border-radius: 0.3rem;
        text-align: center;
        line-height: 0.5rem;

        cursor: pointer;
      }
    }

    .lip {
      margin-top: 0.05rem;
      right: 0.29rem !important;
    }
  }
}

.deg_1 {
  background: #F1F1F1;
}

.dropDown_title:hover {
  cursor: pointer;
}
</style>