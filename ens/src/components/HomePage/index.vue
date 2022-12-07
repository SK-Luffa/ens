<template>
  <div class="content">
    <!-- 背景图片 -->
    <!-- <login v-show="this.$store.state.login" /> -->
    <div class="banner" :class="bgcolor">
      <div class="bannner_title" v-if="Discount">{{ Discount_text }}</div>
      <!--      <no-ssr>-->
      <div v-if="imglist_1.length == 1" class="imglist_1ss">
        <div class="imglist_1s">
          <div class="swiper_div" v-for="(item, index) in imglist_1" :key="index">
            <div class="text">
              <div class="Newest">{{ item.title }}</div>

              <div class="Newest_content_text">
                <div class="texts">{{ item.subtitle }}</div>
              </div>

              <div class="Newest_content_button">
                <button @click="gotosee">Explore</button>

              </div>
            </div>
            <img class="imglist_1" :src="item.productImg" alt="" />
          </div>
        </div>
      </div>


      <swiper class="swiper" :options="swiperOption" v-if="imglist_1.length != 1">
        <swiper-slide class="swiper_list_1" v-for="(item, index) in imglist_1" :key="index">
          <div class="swiper_div">
            <div class="text">
              <div class="Newest">{{ item.title }}</div>

              <div class="Newest_content_text">
                <div class="texts">{{ item.subtitle }}</div>
              </div>

              <div class="Newest_content_button" @click="gotosee">
                <button @click="gotosee">Explore</button>

              </div>
            </div>
            <img class="imglist_1" :src="item.productImg" alt="" />
          </div>
        </swiper-slide>
        <div class="swiper-button-prev swiper_icons" slot="button-prev">
          <i class="el-icon-arrow-left"></i>
        </div>
        <div class="swiper-button-next swiper_icons " slot="button-next">
          <i class="el-icon-arrow-right"></i>
        </div>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
      <!--      </no-ssr>-->
      <div class="bottoms">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M35.7965 11.7035C35.2468 11.1538 34.3866 11.1038 33.7804 11.5536L33.6067 11.7035L20.25 25.0595L6.89326 11.7035C6.34355 11.1538 5.48334 11.1038 4.87718 11.5536L4.70351 11.7035C4.1538 12.2532 4.10383 13.1134 4.55359 13.7196L4.70351 13.8933L19.1551 28.3449C19.7048 28.8946 20.565 28.9446 21.1712 28.4948L21.3449 28.3449L35.7965 13.8933C36.4012 13.2886 36.4012 12.3082 35.7965 11.7035Z"
            fill="#666666" />
        </svg>
      </div>
      <!-- <div class="patt">
        <img class="patt_img" :src="pattern" alt="" />
      </div> -->
      <!-- 右边两个图片列表 -->
      <!-- <div class="imglist">
        <div class="imglits">
          <div class="imglist_1">
            <img :class="'imglist_1_' + index" v-for="(item, index) in imglist_1" :key="index" :src="item.productImg"
              alt="" />
          </div>
          <div class="imglist_2">
            <img :class="'imglist_2_' + index" v-for="(item, index) in imglist_2" :key="index" :src="item.productImg"
              alt="" />
          </div>
        </div>
      </div> -->
      <!-- <div class="bottom_arrow">
        <div class="textx">
          <img class="bottom_img" :src="btoom" alt="" />
          <span style="display: inline-block">See More</span>
        </div>
        <div></div>
      </div> -->
    </div>
    <!-- 中间隔断 -->
    <div class="usage">
      <div class="scenario">Shop By Collection</div>
      <div class="usage_link" @click="gotosee">Explore More ></div>
      <div class="img_2">
        <div class="imglist_banner2" v-for="(item, index) in imglist_banner2_2_1" :key="index" @click="gos(item)">
          <img :src="item.productImg" alt="" />
          <div class="banner_mansk">
            <div class="text">
              <div class="title">{{ item.title }}</div>
              <div class="btns">
                <div class="right">
                  <i class="el-icon-right"></i>
                  <div class="btnx">Explore</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="img_2 img_23">
        <div class="imglist_banner2" v-for="(item, index) in imglist_banner2_2_2" :key="index" @click="gos(item)">
          <img :src="item.productImg" alt="" />
          <div class="banner_mansk">
            <div class="text">
              <div class="title">{{ item.title }}</div>
              <div class="btns">
                <div class="right">
                  <i class="el-icon-right"></i>
                  <div class="btnx">Explore</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 第二个banner -->
    <!-- <div class="banner_1">
      <div class="banner_1_0">
        <img :class="bannner_1_imglistM + `${index}`" :src="item.productImg"
          v-for="(item, index) in bannner_1_imglist_1" :key="index" alt="" @click="malls(item)" />
      </div>
      <div class="banner_1_1">
        <img :class="bannner_1_imglistK + `${index}`" :src="item.productImg"
          v-for="(item, index) in bannner_1_imglist_2" :key="index" alt="" @click="malls(item)" />
      </div>
      <div class="banner_1_2">
        <img :class="bannner_1_imglistL + `${index}`" :src="item.productImg"
          v-for="(item, index) in bannner_1_imglist_3" :key="index" alt="" @click="malls(item)" />
      </div>
    </div> -->
    <!-- Best Sellers -->
    <div class="usage">
      <div class="scenario scenarios">New Arrivals</div>
      <div class="usage_link" @click="pus()">Explore More ></div>
      <!-- <div class="itis">
            It Is Suitable For Different Scenes And Different Attributes
          </div> -->
    </div>
    <div>
      <swiper class="swipers" :options="swiperOptions">
        <swiper-slide v-for="(item, index) in imglist_banner3_3_2" :key="index">
          <a :href="'/detail/' + item.productId" target="_blank">
            <div class="meng"></div>
            <div class="tisss">New</div>
            <img class="imgs" :src="item.imgUrl" alt="" />
            <div class="tagss">{{ item.tags }}</div>
            <div class="price">
              <div class="price_1" v-if="item.isBuyout == 0">$ {{ item.price }}</div>
              <div class="price_1" v-if="item.isBuyout == 1">$ {{ item.priceOnce }}</div>
              <!-- <div class="price_2">Original Price <span>${{item.price}}</span></div> -->
            </div>
          </a>
        </swiper-slide>
        <!--        <swiper-slide v-for="(item, index) in imglist_banner3_3" :key="index*2+1">-->
        <!--          <a :href="'/detail/' + item.productId" target="_blank"><img class="imgs" :src="item.imgUrl" alt=""></a>-->
        <!--        </swiper-slide>-->

        <!-- <div class="swiper-pagination" slot="pagination"></div> -->
        <div class="swiper-button-prev lefts" slot="button-prev">
          <i class="el-icon-back"></i>
        </div>
        <div class="swiper-button-next rights" slot="button-next">
          <i class="el-icon-right"></i>
        </div>
      </swiper>
    </div>
    <div class="usage">
      <div class="scenario scenarios">Best Sellers</div>
      <!-- <div class="usage_link">Explore More ></div> -->
      <!-- <div class="itis">
        It Is Suitable For Different Scenes And Different Attributes
      </div> -->
    </div>
    <!-- 第三个bannner -->
    <div>
      <swiper class="swipers" :options="swiperOptions">
        <swiper-slide v-for="(item, index) in imglist_banner3_3" :key="index">
          <a :href="'/detail/' + item.productId" target="_blank">
            <div class="meng"></div>

            <img class="imgs" :src="item.imgUrl" alt="" />
            <div class="tagss">{{ item.tags }}</div>
            <div class="price">
              <div class="price_1">$ {{ item.price }}</div>
              <!-- <div class="price_2">Original Price <span>${{item.price}}</span></div> -->
            </div>
          </a>
        </swiper-slide>
        <!--        <swiper-slide v-for="(item, index) in imglist_banner3_3" :key="index*2+1">-->
        <!--          <a :href="'/detail/' + item.productId" target="_blank"><img class="imgs" :src="item.imgUrl" alt=""></a>-->
        <!--        </swiper-slide>-->

        <!-- <div class="swiper-pagination" slot="pagination"></div> -->
        <div class="swiper-button-prev lefts" slot="button-prev">
          <i class="el-icon-back"></i>
        </div>
        <div class="swiper-button-next rights" slot="button-next">
          <i class="el-icon-right"></i>
        </div>
      </swiper>
    </div>

    <!-- USED & TRUSTED BY -->


    <div class="usage">
      <div class="scenario scenarios">Featured Category</div>
      <div class="usage_link">Explore More ></div>
      <!-- <div class="itis">
        It Is Suitable For Different Scenes And Different Attributes
      </div> -->
    </div>
    <!-- 第三个bannner -->
    <div class="banner_2">
      <div class="banner_2imglist" v-for="(item, index) in bannner_2_imglist_2" :key="index"
        :style="{ background: item.color1 }">
        <!-- {{ item.colorBg }} -->
        <div class="banner_2imglist_text">{{ item.tagWord }}</div>
        <div :class="'banner_2imglist_div'">
          <img class="banner_2imglist_img" :src="item.productImg" alt="" />
        </div>
        <div class="mengs"></div>
        <div class="banner_2imglist_btn">
          <button @click="gos(item)">Explore</button>
        </div>
      </div>
    </div>
    <div class="banner_2 banner_2imglist">
      <div class="banner_2imglist" v-for="(item, index) in bannner_2_imglist_1" :key="index"
        :style="{ background: item.color1 }">
        <!-- {{ item.colorBg }} -->
        <div class="banner_2imglist_text">{{ item.tagWord }}</div>
        <div :class="'banner_2imglist_div'">
          <img class="banner_2imglist_img" :src="item.productImg" alt="" />
        </div>
        <div class="mengs"></div>
        <div class="banner_2imglist_btn">
          <button @click="gos(item)">Explore</button>
        </div>
      </div>
    </div>

    <!-- 第三个隔断 -->
    <div class="usage">
      <div class="scenario scenarios">Editor’s Picks</div>
      <!-- <div class="usage_link">Explore More ></div> -->
     
    </div>
    <div class="banner_x">
      <div class="banner_x_list" @click="selectCulling(item.productId)" v-for="(item, index) in banner_x_lists" :key="index">

        <div class="list_img_div">
          <div class="mengsx"></div>
          <div class="list_img_div_column" v-for="(items, indexs) in item.collectionProductList" :key="indexs">


            <img :class="'img_' + indexs" :src="'http://www.patternbuy.com'+itemx" v-for="(itemx, indexx) in items" :key="indexx" alt="" />
          </div>
        </div>
        <div class="list_text_div">
          <!-- {{item}} -->
          {{ item.title }}
        </div>
      </div>
    </div>
    <div class="usage">
      <div class="scenario scenarios">USED & TRUSTED BY</div>
      <!-- <div class="usage_link">Explore ></div> -->
      <!-- <div class="itis">
          It Is Suitable For Different Scenes And Different Attributes
        </div> -->
    </div>
    <div class="icons">
      <div class="icons_1">
        <img :src="item.productImg" v-for="(item, index) in imglist_banner5_5" :key="index" alt="" />
      </div>
      <div class="icons_1">
        <img :src="item.productImg" v-for="(item, index) in imglist_banner5_52" :key="index" alt="" />
      </div>
    </div>
    <!-- 第三个隔断 -->
    <div class="usage SHOP">
      <div class="scenario">Pattern Trends</div>
      <div class="itis">
        <div>Follow us on Social media @patternbuy</div>
      </div>
    </div>


    <!-- 第四个banner  -->
    <div class="banner_4">
      <div class="img_banner" v-for="(item, index) in icon_list" @click="opens(item.op)" :key="index">
        <img :src="item.backImage" @click="opens(item.op)" alt="" />
        <div class="icon" @click="opens(item.op)">
          <img class="icon_img" :src="item.src" alt="" />
          <div class="text">{{ item.name }}</div>
        </div>
      </div>
    </div>
    <div class="usage SHOP">
      <div class="scenario">Our Blog</div>
      <div class="itis">
        <div>Tips, Tricks, and Trends <span>Explore Our Blog ></span> </div>
      </div>
    </div>

    <div class="banner_blog">
      <div class="blog" v-for="(item, index) in jia_data" :key="index">
        <div class="blogs">
          <img class="blog_img" :src="'http://www.patternbuy.com' + item.cover" alt="">
          <div class="blog_text" :style="{ background: item.bgcolor }">
            <div class="blog_title"> {{ item.title }}</div>
            <div class="blog_content" v-html="item.synopsis"></div>


          </div>
        </div>
        <div class="blog_button" @click="blog_details(item)" > <i class="el-icon-right"></i></div>

      </div>
    </div>

    <div class="usage">
      <div class="scenario scenarios">Why Choose Us</div>
      <!-- <div class="usage_link ">Explore More ></div> -->

    </div>
    <div class="banner_5">
      <div class="img_banner" v-for="(item, index) in option_list" :key="index">
        <div class="icon">
          <img class="icon_img" :src="item.icon" alt="" />
          <div class="text" :class="'iconx_' + index" v-for="(item, index) in item.text" :key="index">
            {{ item }}
          </div>
        </div>
      </div>
    </div>

    <div class="banner_6">
      <div class="text">Be the first to find out about Patternbuy's</div>
      <div class="text">news, launches and special offers</div>
      <div class="input">
        <div>
          <input type="text" v-model="emails" placeholder="Enter Your Email Address " />
          <div class="txt">
            Unsubscribe when you want, we’ll only send you good news!
          </div>
        </div>

        <button @click="subscribe(emails)">
          <div class="j">+</div>
          SUBSCRIBE
        </button>
      </div>
    </div>

    <!-- 底部导航 -->
    <Bottom />
  </div>
</template>

<script>
// import codes from "http://www.patternbuy.com/uploads/temp/home.json"
// import login from "@/components/Login";
// import { Swiper, SwiperSlide} from 'vue-awesome-swiper'
import Bottom from "@/components/BottomNavigation/index";

import jsons from "./response.json"
import filess from "./filess.json"
import { stringify } from "querystring";


export default {
  name: "home",
  title: "Multiple slides per view",
  components: {
    Bottom,
    // Swiper,
    // SwiperSlide,
  },
  // setup() {
  //   console.log(Pagination)
  //   return {
  //     modules: [Pagination],
  //   };
  // },

  data() {
    return {
      jia_data: [

      ],
      Discount_text: '',
      Discount: false,
      lock: true,
      emails: "",
      lus: true,
      swiperOption: {
        // slidesPerView: 1,
        spaceBetween: 30,
        // loop: true,
        centeredSlides: true,
        loop: true,
        autoplay: {
          delay: 2500,
          disableOnInteraction: false,
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
          //  type: 'progressbar'
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      },
      swiperOptions: {
        height: "2rem",
        slidesPerView: 6,
        initialSlide: 0,
        // grabCursor:true,s
        spaceBetween: 0,
        // freeMode: true,
        // pagination: {
        //   el: '.swiper-pagination',
        //   clickable: true
        // },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        loop: true,
        // autoplay: {
        //   delay: 2500,
        //   disableOnInteraction: false
        // },
      },
      login: false,

      bannner_1_imglistM: "bannner_1_imglistM",
      bannner_1_imglistK: "bannner_1_imglistK",
      bannner_1_imglistL: "bannner_1_imglistL",

      bgcolor: "young",
      pattern: require("@/assets/img/pattern.png"),
      btoom: require("@/assets/img/bottom.png"),
      imglist_1: [],
      imglist_2: [],
      bannner_1_imglist_1: [],
      bannner_1_imglist_2: [],
      bannner_1_imglist_3: [],
      bannner_2_imglist_1: [],
      bannner_2_imglist_2: [],
      bannner_3_imglist_1: [],
      bannner_3_imglist_2: [],
      heart: require("@/assets/img/heart.svg"),
      //官方 收藏夹
      banner_x_lists: [],
      // sx
      imglist_banner2_2: [],
      imglist_banner2_2_1: [],
      imglist_banner2_2_2: [],
      imglist_banner3_3: [],
      imglist_banner3_3_2: [],
      imglist_banner5_5: [],
      imglist_banner5_52: [],
      imglist_banner6_6: [],
      option_list: [
        {
          icon: require("@/assets/img/iconx_1.svg"),
          text: [
            "Extra dimension  ",
            " We provide rare and exclusive extra",
            "dimension design files. Usually, the size of",
            " these documents exceeds 100 * 100cm",
            "(300dpi)",
          ],
        },
        {
          icon: require("@/assets/img/iconx_3.svg"),
          text: [
            "Layered original file  ",
            "Over 95% downloaded files we provide are",
            "editable and layered PSD / TIFF / AI / EPS are",
            " original files.",
          ],
        },
        {
          icon: require("@/assets/img/iconx_2.svg"),
          text: [
            "Competitive price",
            " We provide cost-effective picture",
            "licensing prices, you can Save 20-50% for",
            " the equal quality designs you may find on",
            "other platforms.",
          ],
        },
      ],
      icon_list: [
        {
          name: "pinterest",
          src: require("@/assets/img/icon_4.svg"),
          op: "https://www.pinterest.com/Pattern_buy/",
          backImage: "",
        },
        {
          name: "instagram",
          src: require("@/assets/img/icon_3.svg"),
          op: "https://www.instagram.com/patternbuyins/",
          backImage: "",
        },

        {
          name: "Facebook",
          src: require("@/assets/img/icon_2.svg"),
          op: "https://www.facebook.com/Patternbuy/",
          backImage: "",
        },
        {
          name: "twitter",
          src: require("@/assets/img/icon_1.svg"),
          op: "https://twitter.com/patternbuy/",
          backImage: "",
        },

        {
          name: "Behance",
          src: require("@/assets/img/icon_5.svg"),
          op: "https://www.behance.net/patternbuycom",
          backImage: "",
        },
      ],
    };
  },

  methods: {
    pus(){
      this.$router.push("/store?option=1")
    },
    // 点击图片集，跳转到图片集详情
    selectCulling(pid){
      this.$router.push(`/PhotoGallery?pid=${pid}`)
    },

    blog_details(item) {

      this.$store.state.blog_details = item;
      this.$router.push("/blogdetails?etails=" + item.id)
    },

    blog_data() {
      let vm = this;
      this.rq({
        url: "/api/archives/blog",
        method: "post",
        param: {
          iDisplayLength: 6,
          iDisplayStart: 1,
          sSorts:"date_modify,desc"
        },
        onError: function () { },
        vm,
      }).then((res) => {
        vm.lock = true;
        if (res.code == 200) {
          
          this.jia_data = res.data.aaData
          this.jia_data[0].bgcolor ="#F0FADD"
          this.jia_data[1].bgcolor = "#F6E8FB"
          this.jia_data[2].bgcolor = "#DEFFE1"
          this.jia_data[3].bgcolor = "#E0FBFF"
          this.jia_data[4].bgcolor = "#E8EAFF"
          this.jia_data[5].bgcolor = "#FFF2CF"
          

          //  .map(item=>{
          //    item.bgcolor=""
          //  })
        }
      });
    },
    opens(src) {
      window.open(src);
    },
    contacts() {

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
              id: this.emails,
              type: 'email'
            }
          ]
        },
        onError: function () { },
        vm,
      }).then((res) => {
        vm.lock = true;
        if (res.code == 200) {







        }
      });
    },
    subscribe(emails) {

      if (!this.lock) {
        return;
      }

      if (!emails) {
        return this.$message("Email format error");
      }

      if (
        !/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(
          emails
        )
      ) {
        return this.$message("Email format error");
      }
      let vm = this;
      this.lock = false;
      this.rq({
        url: "/api/open/subscribe",
        method: "post",
        param: {
          email: this.emails,
        },
        onError: function () { },
        vm,
      }).then((res) => {
        vm.lock = true;
        if (res.code == 200) {
          this.$message({
            message: '"Subscription succeeded"',
            type: 'success'
          });
          // this.$message("Subscription succeeded");

          vm.contacts()




        }
      });
    },
    lusk() {
      this.lus = !this.lus;
    },
    imgClick(item) {
      this.$router.push("/store");
      // if (!window.localStorage.user) {
      //   this.$store.state.loginState = true;
      //   this.$store.state.logins = true
      //   this.$store.state.ForgetPwd = false
      //   this.$store.state.Sign = false
      // }
    },
    gotosee() {
      // if (window.localStorage.user) {
      console.log(123);
      this.$router.push("/store");
      // } else {
      //
      //   this.$store.state.loginState = true;
      //   this.$store.state.logins = true
      //   this.$store.state.ForgetPwd = false
      //   this.$store.state.Sign = false
      //
      // }
    },
    malls(items) {
      // if (window.localStorage.user) {
      // console.log(items);

      this.$store.state.screen_items = items;
      console.log(items);
      this.$router.push("/store");
      // } else {
      //
      //   this.$store.state.loginState = true;
      //   this.$store.state.logins = true
      //   this.$store.state.ForgetPwd = false
      //   this.$store.state.Sign = false
      //
      // }
    },
    gos(item) {
      // if (!this.$store.state.login_bool) {
      //   this.$store.state.login = true;
      //   this.$store.state.logins = true
      //   this.$store.state.ForgetPwd = false
      //   this.$store.state.Sign = false
      //   document.getElementsByTagName("body")[0].style.position = "fixed";
      // } else {
      // this.$store.state.option = item.tagWord;
      // // console.log(this.$store.state.option);
      // this.$store.state.blank = "store";
      // this.$router.push("/blank");

      this.$router.push({
        path: "/store",
        query: { ids: item.tagId },
      });

      // }
    },
    // 排序
    ufs(items) {
      for (let index = 0; index < items.length; index++) {
        for (let j = index + 1; j < items.length; j++) {
          if (items[index].sort > items[j].sort) {
            var s = items[index];
            items[index] = items[j];
            items[j] = s;
          }
        }
      }
    },
    selectpage() {
      let vm = this;
      this.rq({
        url: "/api/product/home",
        method: "get",
        param: {},
        onError: function () { },
        vm,
      }).then((res) => {
        this.rq({
          url: "/api/product/bestNewest",
          method: "get",
          param: {},
          onError: function () { },
          vm,
        }).then((res) => {
          this.rq({
            url: "/api/product/bestSeller",
            method: "get",
            param: {},
            onError: function () { },
            vm,
          }).then((res) => {
            if (res.code == 200 && res.data && res.data.length > 0) {
              res.data.forEach((item) => {
                item.imgUrl = vm.$imgServer + item.imgUrl;
                vm.imglist_banner3_3.push(item);
              });
            }
          });
          if (res.code == 200 && res.data && res.data.length > 0) {
            res.data.forEach((item) => {
              item.imgUrl = vm.$imgServer + item.cover;
              vm.imglist_banner3_3_2.push(item);
            });
          }
        });

        if (res.code == 200) {
          for (let index = 0; index < res.data.length; index++) {
            res.data[index].productImg = vm.$imgServer + res.data[index].imgUrl;
            res.data[index].groupId == 2
              ? vm.imglist_banner2_2.push(res.data[index])
              : "";

            // res.data[index].groupId == 4 ? vm.imglist_banner3_3.push(res.data[index]) : "";
            res.data[index].groupId == 6
              ? vm.imglist_banner5_52.push(res.data[index])
              : "";
            res.data[index].groupId == 7
              ? vm.imglist_banner6_6.push(res.data[index])
              : "";
          }


          vm.imglist_banner2_2_1 = vm.imglist_banner2_2.splice(0, Math.ceil(vm.imglist_banner2_2.length / 2));
          vm.imglist_banner2_2_2 = vm.imglist_banner2_2.splice(0, 6);
          console.log(vm.imglist_banner2_2_1, vm.imglist_banner2_2_2, "vm.imglist_banner2_2_1");
          vm.ufs(vm.imglist_banner6_6);
          console.log(vm.imglist_banner6_6, 999);

          for (let index = 0; index < vm.icon_list.length; index++) {
            vm.icon_list[index].backImage =
              vm.imglist_banner6_6[index].productImg;
          }
          function sortByKey(array, key) {
            return array.sort(function (a, b) {
              var x = a[key]; //如果要从大到小,把<,>互换就好
              var y = b[key];
              return x < y ? -1 : x > y ? 1 : 0;
            });
          }

          sortByKey(vm.imglist_banner5_52, "sort");
          vm.imglist_banner5_5 = vm.imglist_banner5_52.splice(0, 7);

          for (let index = 0; index < res.data.length; index++) {
            switch (res.data[index].groupName) {
              case "Newest":
                res.data[index].productImg =
                  vm.$imgServer + res.data[index].imgUrl;
                vm.imglist_1.push(res.data[index]);

                break;
              case "Usage Scenario":
                res.data[index].productImg =
                  vm.$imgServer + res.data[index].imgUrl;
                vm.bannner_1_imglist_1.push(res.data[index]);

                break;
              case "Style":
                res.data[index].productImg =
                  vm.$imgServer + res.data[index].imgUrl;
                vm.bannner_3_imglist_1.push(res.data[index]);

                break;
              case "scene":
                res.data[index].productImg =
                  vm.$imgServer + res.data[index].imgUrl;

                let c = res.data[index].colorBg.split(",");
                if (c && c.length > 1) {
                  // console.log(res.data[index].colorBg)
                  res.data[index].color1 =
                    `linear-gradient(` + "#" + c[0] + `,` + "#" + c[1] + `)`;
                } else {
                  res.data[index].color1 = "transparent";
                }
                res.data[index].tagWord = res.data[index].tagWord.toUpperCase();
                vm.bannner_2_imglist_1.push(res.data[index]);

                break;
            }
          }

          let s = document.getElementsByClassName("banner_2imglist").length;
          for (let m = 0; m < s.length; m++) {
            document.getElementsByClassName("banner_2imglist")[
              m
            ].style.backgroundColor = vm.bannner_2_imglist_1[m].colorBg;
          }
          // console.log(vm.bannner_1_imglist_1, 123);
          // vm.bannner_1_imglist_2 = vm.bannner_1_imglist_1.splice(0, 2);
          vm.bannner_1_imglist_3 = vm.bannner_1_imglist_1.splice(0, 2);
          // vm.imglist_2 = vm.imglist_1.splice(vm.imglist_1.length / 2);
          vm.bannner_3_imglist_2 = vm.bannner_3_imglist_1.splice(
            vm.bannner_3_imglist_1.length / 2
          );

          vm.imglist_1 = vm.imglist_1.sort(function (a, b) {
            let value1 = a.sort;
            let value2 = b.sort;
            return value1 - value2;
          });
          // vm.imglist_1.length > 1 ? this.swiperOption.autoplay = { delay: 2500, disableOnInteraction: false, } : "",
          vm.imglist_2 = vm.imglist_2.sort(function (a, b) {
            let value1 = a.sort;
            let value2 = b.sort;
            return value1 - value2;
          });

          vm.bannner_1_imglist_1 = vm.bannner_1_imglist_1.sort(function (a, b) {
            let value1 = a.sort;
            let value2 = b.sort;
            return value1 - value2;
          });
          vm.bannner_1_imglist_2 = vm.bannner_1_imglist_2.sort(function (a, b) {
            let value1 = a.sort;
            let value2 = b.sort;
            return value1 - value2;
          });
          vm.bannner_1_imglist_3 = vm.bannner_1_imglist_3.sort(function (a, b) {
            let value1 = a.sort;
            let value2 = b.sort;
            return value1 - value2;
          });

          vm.bannner_2_imglist_1 = vm.bannner_2_imglist_1.sort(function (a, b) {
            let value1 = a.sort;
            let value2 = b.sort;
            return value1 - value2;
          });
          vm.bannner_2_imglist_2 = vm.bannner_2_imglist_1.splice(0, vm.bannner_2_imglist_1.length / 2)
          vm.bannner_3_imglist_1 = vm.bannner_3_imglist_1.sort(function (a, b) {
            let value1 = a.sort;
            let value2 = b.sort;
            return value1 - value2;
          });
          vm.bannner_3_imglist_2 = vm.bannner_3_imglist_2.sort(function (a, b) {
            let value1 = a.sort;
            let value2 = b.sort;
            return value1 - value2;
          });




        }
      })



      // let res = {}

      // res = jsons

    },
  },

  mounted() {
    this.$store.state.Navigation_in = "Navigation_in";
   

    // console.log(Pagination)
  },
  created() {
console.log("VUE",this);
    let vm = this;
    vm.blog_data()
    // console.log(codes,"codes");
    vm.selectpage();

    // this.banner_x_lists = filess.data
    this.rq({
      url: `/uploads/temp/home.json?time=${new Date}`,
      method: "get",
      param: {

      },
      onError: function () { },
      vm,
    }).then((res) => {

      res.couponCode == "" ? vm.Discount = false : vm.Discount = true
      this.Discount_text = res.title + res.couponCode
    });
    this.rq({
      url: "/api/product/selectCullingPage",
      method: "post",
      param: {
      },
      onError: function () { },
      vm,
    }).then((res) => {
      vm.lock = true;
      if (res.code == 200) {

     
        // console.log(res.data.splice(0, 6),111);
   

        res.data.aaData[0].cullings.push(res.data.aaData[0].cullings[0])
        
    
    
     
        for (let index = 0; index <res.data.aaData.length; index++) {
          let s = []
          
          s.push(res.data.aaData[index].cullings.splice(0, 2))
          s.push(res.data.aaData[index].cullings.splice(0, 3))
          s.push(res.data.aaData[index].cullings.splice(0, 2))

          vm.banner_x_lists.push({})
    
          vm.banner_x_lists[index].collectionProductList = s
          vm.banner_x_lists[index].title = res.data.aaData[index].title
          vm.banner_x_lists[index].productId = res.data.aaData[index].productId;
          console.log(vm.banner_x_lists[index].collectionProductList);
        }
      }
    });






  },
};
</script>

<style lang="less" scoped>
.content {
  height: 100%;
  width: 100%;
  // margin-top: 0.674rem;
  background: #fff;

  .banner {
    position: relative;
    overflow: hidden;
    // height: 9.1rem;
    width: 100%;
    // z-index: -2;

    .bannner_title {
      width: 100%;
      height: 0.66rem;
      line-height: 0.66rem;
      background: linear-gradient(90deg, #f364a9 0%, #9b93ff 100%);
      text-align: center;
      font-family: "PingFang SC";
      font-style: normal;
      font-weight: 500;
      font-size: 0.16rem;
      color: #ffffff;
    }

    .imglist_1ss {
      padding-top: 0.24rem;
      padding-left: 0.6rem;
      padding-right: 0.6rem;

      .imglist_1s {
        position: relative;
        overflow: hidden;
        border-radius: 0.32rem;
        height: 4.8rem;

        .swiper_div {
          height: 100%;

          img {
            height: 100%;
          }
        }
      }
    }


    .home_banner {
      position: absolute;
      z-index: -1;
    }

    .bottoms {
      width: 100%;
      height: 0.7rem;
      // position: absolute;
      bottom: 0rem;
      background-color: #ffffff;
      text-align: center;
      padding-top: 0.1rem;
    }

    .text {
      position: absolute;

      height: 100%;
      width: 7.2rem;
      background: rgba(238, 239, 245, 0.9);
      top: 0;

      text-align: center;
      padding-top: 1.26rem;
      box-sizing: border-box;

      .Newest {
        font-family: "Radio Canada";
        font-style: normal;
        font-weight: 700;
        font-size: 0.42rem;
        color: #222;
        font-size: 0.42rem;
        text-align: left;
        padding-left: 0.8rem;
        padding-right: 0.4rem;
        line-height: 0.5rem;
        word-break: break-word;
      }

      .Newest_content_text {
        margin-top: 0.24rem;
        font-size: 0.14rem;
        font-family: "PingFang SC";
        font-style: normal;
        color: #222;
        text-align: left;
        padding-left: 0.8rem;
        padding-right: 1.17rem;

        .texts {
          display: inline-block;
          width: 5rem;
          line-height: 0.24rem;
        }
      }

      .Newest_content_button {
        button {
          cursor: pointer;
        }

        margin-top: 0.24rem;
        font-family: PingFang SC;
        font-size: 0.14rem;
        font-weight: 400;
        line-height: 0.36rem;
        letter-spacing: 0em;
        text-align: left;
        padding-left: 0.8rem;

        button {
          border: none;
          width: 0.96rem;
          height: 0.36rem;
          background: linear-gradient(90deg, #ff77b8 0%, #7492ff 100%);
          border-radius: 0.2rem;
          color: #222222;
          font-family: "PingFang SC";
          font-style: normal;
          font-weight: 400;
          font-size: 0.14rem;
          line-height: 0.2rem;
        }

        button:hover {
          background: #5f61d5;
          color: #fff;
        }

        button:active {
          background: #2c2ea2;
        }
      }
    }

    .patt {
      position: absolute;
      top: 3.23rem;

      img {
        width: 8rem;
      }
    }

    .imglist {
      position: absolute;
      right: 1rem;
      height: 100%;

      top: 0px;

      .imglits {
        display: flex;
        height: 100%;
        width: 100%;

        .imglist_1:hover {}

        .imglist_1 {
          margin-top: -0.86rem;
          //cursor: pointer;

          .imglist_1_0 {
            height: 3.7595rem;
          }

          .imglist_1_1 {
            height: 5.17rem;
          }

          .imglist_1_2 {
            height: 5.67rem;
          }

          img {
            object-fit: cover;
            display: block;
            margin-bottom: 0.16rem;
            width: 4.61rem;

            border-radius: 0.1rem;
          }
        }

        .imglist_2 {
          cursor: pointer;

          .imglist_2_0 {
            height: 5.67rem;
          }

          .imglist_2_1 {
            height: 5.88rem;
          }

          .imglist_2_2 {
            height: 5.67rem;
          }

          margin-left: 0.89vw;
          margin-top: -4.04rem;

          img {
            object-fit: cover;
            width: 4.61rem;
            border-radius: 10px;
            display: block;
            margin-bottom: 0.16rem;
          }
        }
      }
    }

    .bottom_arrow {
      display: none;
      position: absolute;
      right: 0px;
      font-size: 0.235rem;
      /*transform: rotateZ(-90deg);*/
      bottom: 0;

      .textx {

        // transform:rotateZ(-90deg);
        // .bottom_img {
        //   /*transform: rotateZ(90deg);*/
        //   margin-right: 0.2rem;
        // }
        >span {
          margin-top: -0.8rem;
          width: 0.5rem;
          display: inline-block;
          vertical-align: top;
          white-space: nowrap;
          transform: rotateZ(-90deg) translateY(-0.34rem) translateX(-0.2rem);
        }
      }
    }
  }

  .usage {
    background: #fff;
    width: 100%;
    // height: 3.36rem;
    text-align: center;

    .scenario {
      font-family: "Radio Canada";
      font-style: normal;
      font-weight: 700;
      font-size: 0.42rem;
      line-height: 0.5rem;
      padding-top: 0.4rem;
      color: #222222;
      box-sizing: border-box;
    }

    .scenarios {
      padding-top: 1.2rem;
    }

    .usage_link {
      font-family: "Radio Canada";
      font-style: normal;
      font-weight: 400;
      font-size: 0.16rem;
      line-height: 0.19rem;
      margin-top: 0.16rem;
      color: #373acb;
    }

    .img_2 {
      display: flex;
      padding-left: 0.62rem;
      padding-right: 0.62rem;
      box-sizing: border-box;
      justify-content: space-between;
      padding-top: 0.4rem;

      .imglist_banner2 {
        width: 2.86rem;
        height: 2.86rem;
        position: relative;
        border-radius: 0.14rem;
        overflow: hidden;
        margin-right: 0.16rem;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .banner_mansk {
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          position: absolute;
          background: rgba(0, 0, 0, 0.2);

          .text {
            text-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
            width: 100%;
            text-align: center;
            margin-top: 1.1rem;

            .title {
              font-family: "Radio Canada";
              font-style: normal;
              font-weight: 700;
              font-size: 0.2rem;
              line-height: 0.24rem;
              color: #fff;
            }

            .btns {
              color: #fff;
              text-align: center;
              width: 100%;

              .right {
                i {
                  font-size: 0.24rem;
                  font-family: "Radio Canada";
                  font-style: normal;
                  // margin-top: 0.18rem;
                }

                .btnx {
                  width: 1.12rem;
                  height: 0.4rem;
                  background: linear-gradient(90deg, #ff77b8 0%, #7492ff 100%);
                  border-radius: 0.32rem;
                  margin-left: calc(50% - 0.56rem);
                  color: rgba(0, 0, 0, 1);
                  line-height: 0.4rem;
                  text-align: center;
                  display: none;
                  margin-top: 0.16rem;
                }

              }
            }
          }
        }

        .banner_mansk:hover {
          background: rgba(0, 0, 0, 0.4);

          .text {
            .btns {
              .right {
                i {
                  display: none;
                }

                .btnx {
                  display: block;
                  cursor: pointer;

                }

                .btnx:hover {
                  background: #5f61d5;
                  color: #fff;
                }


              }
            }
          }
        }
      }
    }

    .img_23 {
      padding-top: 0.24rem;
    }

    .usage_link:hover {
      cursor: pointer;
    }

    .itis {
      img {}
    }
  }

  .icons {
    padding-top: 0.72rem;
    background: #fff;
    padding-left: 1.61rem;
    padding-right: 1.61rem;

    img {
      height: 1rem;
    }

    .icons_1 {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }

  .SHOP {
    .scenario {
      padding-top: 1.2rem;
    }

    .itis {
      display: block;
      font-family: "PingFang SC";
      font-style: normal;
      font-weight: 400;
      font-size: 0.24rem;
      line-height: 0.34rem;
      color: #222222;
    }

    .mins {
      font-family: "Radio Canada";
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 19px;
      margin-top: 0.24rem;
    }
  }

  .banner_4 {
    display: flex;
    padding-left: 1.86rem;
    padding-right: 1.86rem;
    box-sizing: border-box;
    padding-top: 0.8rem;
    background: #fff;
    justify-content: space-between;

    .img_banner:hover {
      box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.2);
    }

    .img_banner {
      border-radius: 1.65rem;
      overflow: hidden;
      width: 2.9rem;
      height: 3.62rem;
      position: relative;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        justify-content: space-between;
        border-radius: 1.65rem;
      }

      .icon {
        background: rgba(255, 255, 255, 0.85);
        border-radius: 0.32rem;
        width: 0.9rem;
        height: 1.12rem;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translateX(-50%) translateY(-50%);
        text-align: center;
        padding-top: 0.19rem;
        box-sizing: border-box;

        .icon_img {
          width: 0.36rem;
          height: 0.36rem;
        }

        .text {
          // margin-top: 0.16rem;
          font-family: "PingFang SC";
          font-style: normal;
          font-weight: 400;
          font-size: 0.16rem;
          padding-top: 0.25rem;
        }
      }
    }
  }

  .banner_x {
    display: flex;
    justify-content: space-between;
    padding-top: 0.6rem;
    padding-left: 0.6rem;
    padding-right: 0.6rem;

    .banner_x_list {
      width: 2.87rem;
      height: 2.91rem;
      background-color: #fff;
      border-radius: 0.16rem;

      overflow: hidden;

      .list_img_div {
        width: 100%;
        height: 2.39rem;
        // background: red;
        border-radius: 0.16rem;
        overflow: hidden;
        display: flex;
        position: relative;

        .mengsx {
          width: 100%;
          height: 100%;
          background: #222222;
          opacity: 0.4;
          position: absolute;
          display: none;
        }

        .list_img_div_column {
          width: 100%;
          height: 100%;

          img {

            line-height: 0rem;
            object-fit: cover;
            width: 100%;
            height: 1.2rem;
          }

          .img_1 {
            height: 33.33%;
          }
        }
      }

      .list_img_div:hover {
        .mengsx {
          display: block;
        }
      }

      .list_text_div {
      height: 0.52rem;
        width: 100%;
        padding-left: 0.16rem;
        box-sizing: border-box;
        padding-top: 0.08rem;
        font-family: "PingFang SC";
        font-style: normal;
        font-weight: 500;
        font-size: 0.16rem;
        line-height: 0.28rem;
        color: #222222;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
    }

    .banner_x_list:hover {
      box-shadow: 0rem 0.04rem 0.24rem rgba(0, 0, 0, 0.1);
    }
  }

  .banner_blog {
    display: flex;
    padding-top: 0.6rem;
    padding-left: 0.6rem;
    padding-right: 0.6rem;
    text-align: center;
    justify-content: space-between;

    .blog {
      width: 2.86rem;

      position: relative;
    border: 0.01rem solid #CCCCCC;
    border-radius: 0.16rem;
      .blogs {
        width: 100%;
        border-radius: 0.16rem;
        overflow: hidden;

      }

      .blog_button {
        position: absolute;
        right: 0.15rem;
        width: 0.54rem;
        height: 0.36rem;
        background: #373ACB;
        border-radius: 21px;
        color: #fff;
        font-size: 0.24rem;
        line-height: 0.36rem;
        bottom: -0.12rem;
      }

      .blog_img {
        width: 100%;
        height: 2.14rem;
      }

      .blog_text {
        height: 2.54rem;
        width: 100%;
        box-sizing: border-box;
        padding-top: 0.15rem;
        padding-bottom: 0.24rem;
        padding-left: 0.16rem;
        padding-right: 0.16rem;

        .blog_title {
          font-family: 'PingFang SC';
          font-style: normal;
          font-weight: 600;
          font-size: 0.2rem;
          line-height: 0.28rem;
          color: #000000;
          padding-bottom: 0.16rem;
          text-align: left;
        }

        .blog_content {
          height: 1.6rem;
            overflow: hidden;
          font-family: 'PingFang SC';
          font-style: normal;
          font-weight: 400;
          font-size: 0.14rem;
          line-height: 0.2rem;
          color: #000000;
          text-align: left;
          word-wrap: break-word;
            word-break: normal;
            text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 8;
              -webkit-box-orient: vertical;
        }

      }
    }
  }

  .banner_5 {
    display: flex;
    padding-top: 0.6rem;
    padding-left: 2.4rem;
    padding-right: 2.4rem;
    text-align: center;
    justify-content: space-between;


    .text {
      font-family: "PingFang SC";
      font-style: normal;
      font-weight: 400;
      font-size: 0.14rem;
      line-height: 0.2rem;
      color: #666;
    }

    .iconx_0 {
      font-family: "PingFang SC";
      font-style: normal;
      font-weight: 500;
      font-size: 0.16rem;
      line-height: 0.22rem;
      margin-bottom: 0.24rem;
    }

    .img_banner:hover {
      box-shadow: 0 0.04rem 0.35rem rgba(0, 0, 0, 0.1);
      cursor: pointer;
    }

    .img_banner {
      width: 4.48rem;
      height: 2.6rem;
      background: #f9fafe;
      border-radius: 0.2rem;

      .icon {
        margin-top: 0.54rem;
      }
    }
  }

  .banner_6 {
    width: 100%;
    text-align: center;
    font-family: "Radio Canada";
    font-style: normal;
    font-weight: 700;
    font-size: 0.24rem;
    line-height: 0.29rem;
    padding-top: 1.6rem;
    color: rgba(34, 34, 34, 1);

    .input {
      padding-top: 0.32rem;
      display: flex;
      justify-content: center;

      input {
        padding-left: 0.24rem;
        box-sizing: border-box;
        width: 7.34rem;
        height: 0.63rem;
        border-radius: 0.14rem;
        margin-right: 0.08rem;
        border: 1px solid #a6a6a6;
      }

      .txt {
        font-family: "Radio Canada";
        font-style: normal;
        font-weight: 400;
        font-size: 0.14rem;
        line-height: 0.17rem;
        color: #666666;
        text-align: left;
        padding-top: 0.08rem;
      }

      button:hover {
        cursor: pointer;
      }

      button {
        display: flex;
        justify-content: center;
        height: 0.63rem;
        line-height: 0.63rem;
        color: #fff;
        width: 1.92rem;
        background: rgba(34, 34, 34, 1);
        border-radius: 0.14rem;
        border: none;

        .j {
          line-height: 0.56rem;
          padding-right: 0.03rem;
        }
      }
    }
  }

  // .banner_1:hover{
  //   cursor: pointer;
  // }
  .banner_1 {
    // width: 100vw;
    background-color: #ffffff;
    line-height: 0;
    height: 10rem;
    display: flex;
    box-sizing: border-box;
    padding-left: 0.14rem;

    div {
      display: inline-block;
    }

    .banner_1_0 {
      width: 9.46rem;

      .bannner_1_imglistM0 {
        width: 100%;
        height: 5.4rem;
        object-fit: cover;
      }

      .bannner_1_imglistM1 {
        width: 50%;
        height: 4.6rem;
        object-fit: cover;
      }

      .bannner_1_imglistM2 {
        width: 50%;
        height: 4.6rem;
        object-fit: cover;
      }
    }

    .banner_1_0:hover {
      cursor: pointer;
    }

    .banner_1_1 {
      width: 4.72rem;

      .bannner_1_imglistK0 {
        width: 100%;
        height: 4.72rem;
        object-fit: cover;
      }

      .bannner_1_imglistK1 {
        width: 100%;
        height: 5.28rem;
        object-fit: cover;
      }
    }

    .banner_1_1 :hover {
      cursor: pointer;
    }

    .banner_1_2 {
      width: 4.74rem;

      .bannner_1_imglistL0 {
        width: 100%;
        height: 5.26rem;
        object-fit: cover;
      }

      .bannner_1_imglistL1 {
        width: 100%;
        height: 4.74rem;
        object-fit: cover;
      }
    }

    .banner_1_2:hover {
      cursor: pointer;
    }
  }

  .banner_2 {
    width: 100%;

    // background-color: #ffffff;
    display: flex;
    box-sizing: border-box;
    padding-left: 0.6rem;
    padding-right: 0.6rem;
    padding-top: 0.4rem;
    background: #fff;
    justify-content: space-between;

    button:h {
      cursor: pointer;
    }

    .banner_2imglist_text {
      width: 2.43rem;
      top: 41%;
      right: 0rem;
      text-align: center;
      font-family: "Radio Canada";
      font-style: normal;
      transform: translateY(-50%);
      font-weight: 700;
      line-height: 0.29rem;
      font-size: 0.24rem;
      position: absolute;
      position: absolute;
    }

    .mengs {
      width: 100%;
      height: 100%;
      background: #222222;
      opacity: 0.3;
      position: absolute;
      left: 0;
      top: 0;
      display: none;
    }

    .banner_2imglist_btn {
      font-size: 0.14rem;
      text-align: center;
      position: absolute;
      top: 1.66rem;
      width: 2.43rem;
      right: 0;
      text-align: center;

      button {
        background: rgba(34, 34, 34, 1);
        height: 0.36rem;
        border-radius: 0.18rem;
        width: 1.12rem;
        color: #ffffff;
        border: none;
      }

      button:hover {
        background: #5f61d5;
        cursor: pointer;
      }

      button:active {
        background: #2c2ea2;
      }
    }

    .banner_2imglist {
      position: relative;
      width: 4.38rem;
      height: 3.04rem;
      background: #dfe8ff;

      // padding-left: 1.09rem;
      // padding-right: 1.09rem;
      box-sizing: border-box;
      border-radius: 0.16rem;
      overflow: hidden;

      .banner_2imglist_div {
        position: absolute;
        // left: 50%;
        bottom: 1.25rem;
        top: 0.32rem;
        left: 0.31rem;
        // transform: translateX(-50%);
      }

      .banner_2imglist_img {

        // width: 0.84rem;
        height: 2.4rem;
        object-fit: cover;
      }
    }

    .banner_2imglist:hover {
      .mengs {
        display: block;
      }
    }

    .banner_2imglist+.banner_2imglist {
      margin-left: 0.16rem;
    }
  }

  .banner_2imglist {
    // transform: translateY(-0.58rem);
    padding-top: 0.24rem;
  }

  .banner_2_2 {
    padding-top: 0.24rem;
  }

  .banner_3 {
    // height: 942rem;
    width: 100%;
    background-color: #ffffff;

    .banner3_img_list_1 {
      display: flex;
      height: 4.61rem;
      margin-bottom: 0.2rem;
      // width: 4.61rem;
      box-sizing: border-box;
      padding-left: 0.15rem;

      .banner3_img_list_1_div {
        position: relative;
        width: 4.61rem;
        width: 4.61rem;
        border-radius: 0.14rem;
        overflow: hidden;

        .Mask_style {
          width: 100%;
          height: 100%;
          position: absolute;
          background: rgba(0, 0, 0, 0.4);
        }

        .banner3_text:hover {
          cursor: pointer;
        }

        .banner3_text {
          position: absolute;
          line-height: 4.61rem;
          width: 100%;
          text-align: center;
          height: 100%;
          font-family: "PingFang SC";
          font-style: normal;
          font-size: 0.24rem;
          color: #ffffff;
        }

        img {
          border-radius: 5px;
          height: 100%;
          width: 4.61rem;
          object-fit: cover;
        }
      }

      .banner3_img_list_1_div+.banner3_img_list_1_div {
        margin-left: 0.15rem;
      }
    }

    .banner3_img_list_2 {
      display: flex;
      position: relative;
      height: 4.61rem;
      box-sizing: border-box;
      padding-left: 0.15rem;

      .banner3_img_list_1_div {
        position: relative;
        height: 100%;
        border-radius: 0.14rem;
        overflow: hidden;

        .banner3_text:hover {
          cursor: pointer;
        }

        .Mask_style {
          width: 100%;
          height: 100%;
          position: absolute;
          background: rgba(0, 0, 0, 0.4);
        }

        .banner3_text {
          color: #ffffff;
          position: absolute;
          line-height: 4.61rem;
          width: 100%;
          text-align: center;
          height: 100%;
          font-family: "PingFang SC";
          font-style: normal;
          font-size: 0.24rem;
        }

        img {
          border-radius: 5px;
          height: 100%;
          width: 4.61rem;
          object-fit: cover;
        }
      }

      .banner3_img_list_1_div:hover {
        cursor: pointer;
      }

      .banner3_img_list_1_div+.banner3_img_list_1_div {
        margin-left: 0.15rem;
      }
    }
  }

  .young {
    // background: #f1f1f1;
  }

  .swiper {
    height: 4.8rem;

    .swiper_list_1 {
      padding-top: 0.24rem;
      padding-left: 0.6rem;
      padding-right: 0.6rem;
      box-sizing: border-box;

      .swiper_div {

        width: 100%;
        height: 100%;
        position: relative;
        display: flex;
        border-radius: 0.32rem;
        overflow: hidden;
      }
    }

    .swiper_icons {
      font-size: 0.4rem;
      color: rgba(102, 102, 102, 1);
    }

    .imglist_1 {
      z-index: -1;
      // position: absolute;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .swipers {
    padding-top: 0.4rem;
    background: #fff;
    padding-left: 0.4rem;
    padding-right: 0.4rem;

    a {
      position: relative;
    }

    //width: 10rem;
    .meng {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      border-radius: 0.14rem;
      background: rgba(0, 0, 0, 0);
      cursor: pointer;
    }

    .tisps {
      position: absolute;
      top: 0;
      left: 0;
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 400;
      font-size: 0.12rem;
      line-height: 0.2rem;

      color: #FFFFFF;
      padding: 0.04rem 0.08rem;
      background: #222222;
      border-radius: 14px 0px;

      img {
        vertical-align: middle;
        position: relative;
        top: 50%;
        display: inline-block;
        line-height: 0.25rem;
      }
    }

    .tisss {
      position: absolute;
      top: 0;
      left: 0;

      padding: 0.04rem 0.08rem;
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 400;
      font-size: 0.12rem;
      line-height: 0.17rem;
      color: #FFFFFF;
      background: #FF4F44;
      border-radius: 0.14rem 0rem;
    }

    .meng:hover {
      background: rgba(0, 0, 0, 0.2);
    }

    a {
      display: inline-block;
      cursor: pointer;
    }

    .imgs {
      width: 2.8rem;
      height: 2.8rem;
      object-fit: cover;
      border-radius: 0.14rem;
    }

    .tagss {
      width: 2.8rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      padding-left: 0.1rem;
      padding-right: 0.1rem;
      font-family: "PingFang SC";
      font-style: normal;
      font-weight: 400;
      font-size: 0.14rem;
      line-height: 0.2rem;
      padding-top: 0.08rem;
      color: #222222;
    }

    .price {
      display: flex;
      padding-left: 0.1rem;
      padding-right: 0.1rem;

      .price_1 {
        font-family: "PingFang SC";
        font-style: normal;
        font-weight: 600;
        font-size: 0.16rem;
        color: #222222;
        line-height: 0.22rem;
      }

      .price_2 {
        padding-left: 0.08rem;
        line-height: 0.2rem;
        font-family: "PingFang SC";
        font-style: normal;
        font-weight: 400;
        font-size: 0.12rem;
        color: #9a9cae;

        span {
          text-decoration: line-through;
        }
      }
    }

    .lefts {
      left: 0.4rem;
      width: 0.6rem;
      height: 0.6rem;
      background: #fff;
      box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
      border-radius: 50%;

      i {
        font-size: 0.33rem;
        color: rgba(34, 34, 34, 1);
      }
    }

    .rights {
      right: 0.6rem;
      width: 0.6rem;
      height: 0.6rem;
      background: #fff;
      box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
      border-radius: 50%;

      i {
        font-size: 0.33rem;
        color: rgba(34, 34, 34, 1);
      }
    }
  }

  /deep/ .swiper-button-prev.lefts {
    cursor: pointer;
  }

  /deep/ .swiper-button-next.rights {
    cursor: pointer;
  }

  /deep/ .swiper-button-next,
  /deep/ .swiper-button-prev {
    margin-top: 0;
  }

  /deep/ .swiper-pagination-bullet {
    width: 0.12rem;
    height: 0.12rem;

    background: #ffffff;
    opacity: 0.5;
    border-radius: 0.08rem;
  }

  /deep/ .swiper-pagination-bullet-active {
    width: 0.24rem;
    opacity: 1;
  }

  /deep/ .swiper-button-next:after,
  .swiper-container-rtl .swiper-button-prev:after {
    content: none;
  }

  /deep/ .swiper-button-prev:after,
  .swiper-container-rtl .swiper-button-next:after {
    content: none;
  }
}
</style>
