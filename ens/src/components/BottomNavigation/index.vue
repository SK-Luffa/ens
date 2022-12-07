<template>
  <!-- 底部导航 -->
  <div class="bottomNavigation">
    <div class="bottomNavigation_content">
      <div class="bottomNavigation_list_1">
        <div class="title_text textb">Sign up to receive news about collections. events and sales</div>
        <div class="title_text inputx">
          <input type="text" v-model="emails" @keydown.enter="subscribe(emails)">
          <img @click="subscribe(emails)" :src="mail" alt="">
        </div>
        <div class="bottomNavigation_list_1_icon">
          <a :href="item.src" v-for="(item, index) in bottom_icon" :key="index" target="_blank"> <img :src="item.img" alt=""/></a>

        </div>
        <div class="bottomNavigation_list_1_1">
          <img class="bottomNavigation_list_1_1_img" :src="bottom_logo" alt=""/>
        </div>
        <!-- <div class="title_text">Focus on high-end</div>
        <div class="title_text">pattern design</div> -->

      </div>
      <div class="bottomNavigation_list_2">
        <div class="Explore">Resources</div>
        <div @click="push('FAQ')">FAQ</div>
        <div @click="push('Comparison')">License Comparison</div>
        <div @click="push('Agreement')">License Agreement(s)</div>
        <div @click="push('Policy')">Returns Policy</div>
        <div @click="push('Conditions')">Terms and Conditions</div>
        <div @click="push('Privacy')">Privacy Policy</div>
      </div>
      <div class="bottomNavigation_list_2">
        <div class="Explore">About</div>
        <div @click="push('About')">About us</div>
        <div @click="push('Contact')">Contact us</div>
        <!-- <div @click="push('Licensing')">Contact Support</div> -->
      </div>
      <!-- <div class="bottomNavigation_list_2">
        <div class="Explore">About</div>
        <div>About us</div>
        <div>Sell your Designs</div>
        <div>Our Blog</div>
        <div @click="Contact('/contact')">Contact Us</div>
      </div> -->
    </div>
    <div class="borders"></div>
    <div class="copyright">
      <div class="copyright_1"> © 2022 Patternbuy limited. All rights reserved</div>
      <div class="copyright_2">
        <img class="iconsb" :src="item" v-for="(item, index) in  svg" :key="index" alt="">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      emails: "",
      mail: require("@/assets/img/mail.svg"),
      bottom_icon: [
        {
          img: require("@/assets/img/p.png"),
          src: "https://www.pinterest.com/Pattern_buy/"
        },
        {
          img: require("@/assets/img/camera.png"),
          src: "https://www.instagram.com/patternbuyins/"
        },
        {
          img: require("@/assets/img/Facebook.png"),
          src: "https://www.facebook.com/Patternbuy/",
        },
        {
          img: require("@/assets/img/Twitter.png"),
          src: "https://twitter.com/patternbuy/",
        },
        {
          img: require("@/assets/img/be.png"),
          src: "https://www.behance.net/patternbuycom",
        },


      ],
      svg: [
        require("@/assets/img/svg_1.svg"),
        require("@/assets/img/svg_5.svg"),
        require("@/assets/img/svg_2.svg"),
        require("@/assets/img/svg_4.svg"),
        require("@/assets/img/svg_3.svg"),

      ],
      bottom_logo: require("@/assets/img/Frame.png"),
      lock: true,
    };
  },
  methods: {
    push(item) {
      switch (item) {
        case "FAQ":
          window.open("html/FAQ.html")
          return;
        case "Comparison":

          window.open("/html/Comparison.html")
          return;
        case "Agreement":
          window.open("html/Patternbuy License Agreement.html")

          return;
        case "Policy":
          window.open("html/Returns Policy.html")
          return;
        case "Conditions":
          window.open("html/Terms and Conditions.html")

          return;
        case "Privacy":
          window.open("html/Privacy Policy.html")
          return;
        case "About":
          this.$router.push("/AboutUS");

          return;
        case "Contact":
          this.$router.push("/ContactUs");
          return;
        case "Licensing":

          this.$router.push("/contact")
          return;
      }
    },
    subscribe(emails) {

      if (!this.lock) {
        return
      }

      if (!emails) {

        return this.$message("Email format error")
      }

      if (!/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(emails)) {

        return this.$message("Email format error")
      }
      let vm = this;
      this.lock = false;
      this.rq({
        url: "/api/open/subscribe",
        method: "post",
        param: {
          email: this.emails
        },
        onError: function () {
        },
        vm,
      }).then((res) => {
        vm.lock = true
        if (res.code == 200) {
          this.$message("Subscription succeeded")
        }
      })
    },
    Contact(indes) {

    }
  }
};
</script>
<style lang="less" scoped>
.bottomNavigation {
  margin-top: 1.2rem;
  width: 100%;

  background-color: #000000;
  box-sizing: border-box;
  padding-left: 3.32rem;
  padding-right: 3.32rem;

  .bottomNavigation_content {

    color: #ffffff;
    display: flex;

    .bottomNavigation_list_1 {
      .inputx {
        width: 3.8rem;
        height: 0.28rem;
        position: relative;

        img:hover {
          cursor: pointer;
        }
      }

      .textb {
        padding-top: 0.32rem;
        padding-bottom: 0.16rem;
      }


      .title_text {
        font-family: "PingFang SC";
        font-style: normal;
        font-weight: 400;
        font-size: 0.14rem;
        line-height: 0.2rem;


        input {
          width: 100%;
          height: 100%;
          background: #000;
          color: #f1f1f1;
          border: none;
          border-bottom: 1px solid #666;
        }

        img {
          position: absolute;
          right: 0.02rem;
          bottom: 0.05rem;
        }
      }

      .bottomNavigation_list_1_1 {
        padding-top: 0.16rem;
        position: relative;
        width: 0.8rem;
        height: 0.8rem;

        .bottomNavigation_list_1_1_img {
          width: 100%;
          position: absolute;
        }
      }

      .bottomNavigation_list_1_icon {
        padding-top: 0.16rem;

        a {
          margin-right: 0.14rem;
        }

        img {
          width: 0.2rem;
          height: 0.2rem;
        }

        img + img {
          margin-left: 0.1rem;
        }
      }
    }

    .bottomNavigation_list_2 {
      margin-top: 0.16rem;
      margin-left: 1.78rem;

      font-size: 0.14rem;
      color: #c4c4c4;
      text-align: left;

      > div {
        line-height: 1.5;
        margin-bottom: 0.22rem;
        cursor: pointer;
      }

      .Explore {
        cursor: default;
        font-size: 0.16rem;
        margin-bottom: 0.16rem;
        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 500;

        line-height: 0.22rem;

        color: #fff;
      }
    }
  }

  .borders {
    width: 100%;


    border-bottom: 1px solid #666666;
  }

  .copyright {
    width: 100%;
    height: 0.78rem;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    padding-top: 0.3rem;

    .copyright_1 {
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 700;
      font-size: 0.14rem;
      line-height: 0.2rem;
      color: #666666;
    }

    .copyright_2 {
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 700;
      font-size: 0.14rem;
      line-height: 0.2rem;
      color: #f1f1f1;

      .iconsb {
        margin-left: 0.16rem;
      }

      .iconsb:hover {
        cursor: pointer;
      }
    }
  }
}
</style>