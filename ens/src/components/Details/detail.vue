<template>
  <div class="bodys">
    <a class="as" @click="mis" href="#"><img :src="why[1]" alt="" /></a>
    <Shou ref="shou" />

    <div class="title">
      <div class="problems">
        <!-- <img :src="why[0]" alt="" @click="closeb"> -->
        <div class="cons" v-if="con">
          <div class="title">Why report problems</div>
          <div class="text">Please describe the problems you have encountered. You can also report trademark or
            copyright violations
          </div>
          <div>
            <el-input type="textarea" :autosize="{ minRows: 7, maxRows: 7 }" v-model="textarea1">
            </el-input>
          </div>
          <div class="button">
            <button @click="closebs">cancel</button>
            <button @click="sub">Report</button>
          </div>
        </div>
      </div>

      <div class="div_left">
        <div class="left">

          <div class="model">Model</div>
          <div class="imgsList">
            <div class="imglist" v-for="(item, index) in modelList" :key="index" @click="selectModel(index)">
              <img :src="item.imgSrc" :default-img="item.imgSrc" alt=" " />
            </div>
          </div>
        </div>
      </div>

      <div class="div_content">
        <div class="comtent" v-show="modelIdx <= 1"
          :style="{ width: boxSize + 'rem', height: (+boxSize + 0.9) + 'rem', marginTop: '0.1rem' }">
          <div class="content_img" :style="{ width: boxSize + 'rem', height: boxSize + 'rem' }">

            <div class="content_img1" v-show="modelIdx <= 1" style="width: 100%;height:100%">
              <canvas id="canvasBox3"></canvas>
            </div>
          </div>
          <div class="slider content-silder">
            <el-slider v-model="curScale" show-input :step="5" :min="minScale" :max="maxScale" @input="sliderInput"
              @change="sliderChange">
            </el-slider>
          </div>
        </div>
        <div class="comtent" v-show="modelIdx > 1"
          :style="{ width: boxSize + 'rem', height: (+boxSize + 0.9) + 'rem', marginTop: '0.1rem' }">
          <iframe style="width: 100%;height:100%;border:0" :src="iframeSrc"></iframe>
        </div>
      </div>

      <div class="div_switch">
        <div class="ordinary-picture" @click="switchPic" v-if="lastPic != null && modelIdx > 1">
          <img :src="lastPic.imgSrc" alt="" />
        </div>
        <div class="ordinary-picture" @click="switchModel" v-if="lastModel != null && modelIdx <= 1">
          <img :src="lastModel.imgSrc" alt="" />
        </div>
      </div>

      <div class="rigth">
        <div class="text">
          <div class="title_name">
            <div class="spans_1">Pattern Name</div>
            <div class="spans_2">{{ ontent_datas.tags }}</div>
          </div>
          <div class="title_name title_one">
            <div class="spans_1">Pattern ID</div>
            <div class="spans_2">{{ ontent_datas.imgSn }}</div>
          </div>
          <div class="title_name">
            <div class="spans_1">Included Files</div>
            <div class="spans_2">{{ ontent_datas.format }}</div>
          </div>
          <div class="title_name">
            <div class="spans_1">Size</div>
            <div class="spans_2">{{ imgSize }}</div>
          </div>
          <div class="title_name">
            <div class="spans_1">Print Size</div>
            <div class="spans_2">{{ printSize1 }}</div>
          </div>
          <div class="title_name" v-if="printSize2">
            <div class="spans_1">&nbsp;</div>
            <div class="spans_2">{{ printSize2 }}</div>
          </div>
          <!--          <div class="title_name">-->
          <!--            <div class="spans_1">Resolution</div>-->
          <!--            <div class="spans_2">{{ ontent_datas.power }}</div>-->
          <!--          </div>-->
          <!--          <div class="title_name">-->
          <!--            <div class="spans_1">In Repeat + Seamless Tile</div>-->
          <!--            <div class="spans_2">-->

          <!--              <img :src="ontent_datas.isRepeat>0?state[1]:state[0]" alt="" />-->
          <!--            </div>-->
          <!--          </div>-->
          <!--          <div class="title_name">-->
          <!--            <div class="spans_1">Layered Photoshop PSD</div>-->
          <!--            <div class="spans_2">-->
          <!--              <img :src="ontent_datas.isLayer>0?state[1]:state[0]" alt="" />-->
          <!--            </div>-->
          <!--          </div>-->
          <!--          <div class="title_name">-->
          <!--            <div class="spans_1">Vector AI Or EPS</div>-->
          <!--            <div class="spans_2">-->
          <!--              <img :src="ontent_datas.isVector>0?state[1]:state[0]" alt="" />-->
          <!--            </div>-->
          <!--          </div>-->
        </div>
        <div class="in_2 in_23" v-if="Discount">
          <p>{{ Discount_text }}</p>
        </div>
        <div class="in_2" v-if="!Discount">
          <span v-for="(item, index) in ku" :key="index">
            <img :src="item" v-if="index == 0 || (index == 2 && ontent_datas.isRepeat > 0)
            || (index == 3 && ontent_datas.isLayer > 0) || (index == 1 && ontent_datas.isLarge > 0)" alt="">
          </span>
          <!--              <img :src="item" v-for="(item, index) in ku" :key="index" alt="">-->
        </div>
        <div class="option">
          <div class="title">
            <div class="one">License Type</div>
            <div class="two"><a href="/html/Comparison.html" target="_blank">Compare Licenses</a></div>
            <i class="el-icon-warning-outline"></i>
          </div>
          <div class="content">
            <div v-show="ontent_datas.isBuyout <= 0">
              <div v-show="duan">
                <!--                <div class="content_list" @click="content_list_bools(1)" v-if="ontent_datas.isUse > 0">-->
                <!--                  <div class="content_list_bolls lusk">-->
                <!--                    <img v-show="licenseType != 1" :src="ab[0]" alt=""/>-->
                <!--                    <img v-show="licenseType == 1" :src="ab[1]" alt=""/>-->
                <!--                  </div>-->

                <!--                  <div class="con_idv lusk">-->
                <!--                    <div>Personal (JPEG Only)</div>-->

                <!--                  </div>-->
                <!--                </div>-->
                <!-- 2 -->
                <div class="content_list" @click="content_list_bools(4)" v-if="ontent_datas.isUse > 0">
                  <div class="content_list_bolls lusk">
                    <img v-show="licenseType != 4" :src="ab[0]" alt="" />
                    <img v-show="licenseType == 4" :src="ab[1]" alt="" />
                  </div>

                  <div class="con_idv ">
                    <div>Commercial (layered file/JPEG)</div>

                  </div>
                </div>
                <!-- 3 -->
                <div class="content_list" @click="content_list_bools(5)" v-if="ontent_datas.isUse > 0">
                  <div class="content_list_bolls lusk">
                    <img v-show="licenseType != 5" :src="ab[0]" alt="" />
                    <img v-show="licenseType == 5" :src="ab[1]" alt="" />
                  </div>

                  <div class="con_idv">
                    <div>Commercial Unlimited (layered file/JPEG)</div>
                    <!-- <div>Unlimited end products for sale</div> -->
                  </div>
                </div>
              </div>
              <div v-show="!duan">
                <div class="content_list" @click="content_list_bools(4)" v-if="ontent_datas.isUse > 0">
                  <div class="content_list_bolls">
                    <img v-show="licenseType != 4" :src="ab[0]" alt="" />
                    <img v-show="licenseType == 4" :src="ab[1]" alt="" />
                  </div>

                  <div class="con_idv">
                    <div>Commercial (Layered PSD + JPEG)</div>
                    <div>Up to 500 end products for sale</div>
                  </div>
                </div>
              </div>
            </div>
            <!-- 1 -->

            <div class="content_list" @click="content_list_bools(3)" v-if="ontent_datas.isBuyout > 0">
              <div class="content_list_bolls ">
                <img v-show="licenseType != 3" :src="ab[0]" alt="" />
                <img v-show="licenseType == 3" :src="ab[1]" alt="" />
              </div>

              <div class="con_idv">
                <div>Commercial (Layered PSD + JPEG)</div>
                <div>Up to 500 end products for sale</div>
              </div>
              <div class="wonder">
                <img :src="wonder" alt="" />
                <div class="wonder_text">
                  <div class="demo2">
                    <em>&#9670;</em>
                    <span>&#9670;</span>
                    <div class="texts">
                      This product is a buyout picture, and will be automatically removed from the shelf after
                      purchase
                      You can't return the goods after purchase. Please contact customer service if there is any
                      quality
                      problem. Please confirm the follow-up operation
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="price">
          <div>Price</div>
          <div>${{ licensePrice }}</div>
        </div>
        <div class="operlist">

          <div v-show="ontent_datas.hasCollection == 0" class="operlist_2 btn_1" @click="shou(ontent_datas)">
            <img class="gx1" :src="gx[1]" alt="" />
            Collect
          </div>
          <div v-show="ontent_datas.hasCollection > 0" class="operlist_2  btn_12" @click="shou(ontent_datas)">
            Collect
          </div>

          <button v-show="ontent_datas.isBuy == 2" class="operlist_2 bag  downs"
            @click.prevent="thisDownload(ontent_datas)">
            Download
            File
            <svg class="download" width="0.2rem" height="0.2rem" viewBox="0 0 20 20" fill=""
              xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd"
                d="M6.7569 6.32977C7.0467 6.32977 7.2819 6.56618 7.2819 6.85747C7.2819 7.14876 7.0467 7.38516 6.7569 7.38516H6.0982C4.9684 7.38516 4.05 8.30758 4.05 9.44248V12.8795C4.05 14.0187 4.9712 14.9446 6.1045 14.9446H13.9025C15.0309 14.9446 15.95 14.0208 15.95 12.8866V9.45022C15.95 8.3111 15.0281 7.38516 13.8962 7.38516H13.2438C12.954 7.38516 12.7188 7.14876 12.7188 6.85747C12.7188 6.56618 12.954 6.32977 13.2438 6.32977H13.8962C15.6077 6.32977 17 7.72993 17 9.45022V12.8866C17 14.6034 15.6098 16 13.9025 16H6.1045C4.393 16 3 14.6005 3 12.8795V9.44248C3 7.72571 4.3895 6.32977 6.0982 6.32977H6.7569ZM10.0006 3C10.2904 3 10.5256 3.23641 10.5256 3.5277L10.525 10.7227L11.6701 9.56737C11.8745 9.36051 12.2063 9.36051 12.4121 9.56596C12.6172 9.77141 12.6179 10.1056 12.4135 10.3125L10.377 12.3674C10.3571 12.388 10.3356 12.4069 10.3126 12.424L10.3723 12.3719C10.3497 12.3949 10.3253 12.4155 10.2992 12.4337C10.2834 12.4447 10.2672 12.4547 10.2506 12.4638C10.2425 12.4682 10.2341 12.4725 10.2255 12.4766C10.2103 12.4839 10.1946 12.4904 10.1786 12.4963C10.1705 12.4991 10.1625 12.5018 10.1544 12.5043C10.1347 12.5104 10.1144 12.5154 10.0937 12.5191C10.0891 12.5199 10.0848 12.5206 10.0806 12.5213C10.0639 12.5239 10.0464 12.5257 10.0288 12.5266C10.0193 12.5271 10.0099 12.5274 10.0006 12.5274L9.9727 12.5253L9.92935 12.5226C9.92626 12.5222 9.92318 12.5217 9.92011 12.5212L10.0006 12.5274C9.96928 12.5274 9.93824 12.5246 9.90781 12.5191C9.88676 12.5154 9.86653 12.5104 9.8468 12.5044C9.83891 12.5019 9.83117 12.4993 9.82349 12.4965C9.8074 12.4908 9.79152 12.4842 9.77605 12.4768C9.76665 12.4723 9.7573 12.4675 9.7481 12.4624C9.73517 12.4553 9.72271 12.4477 9.71059 12.4396C9.7023 12.4341 9.694 12.4282 9.68587 12.422C9.66587 12.407 9.647 12.3905 9.62938 12.3728L9.62886 12.3719L7.58766 10.3125C7.38326 10.1056 7.38396 9.77141 7.58906 9.56596C7.79486 9.36051 8.12666 9.36051 8.33106 9.56737L9.475 10.7227L9.47556 3.5277C9.47556 3.23641 9.71076 3 10.0006 3Z"
                fill="#222222" />
            </svg>
            <div style="background-color: green;position: absolute;top:0;left:0;height:0.46rem;opacity: 0.4;"
              :style="{ width: progress + '%' }"></div>
          </button>
          <div v-show="ontent_datas.isBuy == 1" class="operlist_2 bag btn_x" @click.prevent="gotoShopingCar">
            View Cart<img class="gx1" :src="gx[2]" alt="" />
          </div>
          <!--          -->
          <div v-show="ontent_datas.isBuy == 0" class="operlist_2 btn_x" @click.prevent="addShopingCar">
            <img class="gx1" :src="gx[0]" alt="" />Add To Bag
          </div>

          <!--          <div class="tipstext" v-if="ontent_datas.isBuy==1">Item Added To Your Cart!</div>-->
        </div>
      </div>

    </div>

    <div class="middle">
      <div style="display: table">
        <div style="display: table-row">
          <div class="titles">
            Product Types
          </div>
          <div class="contents">
            <template v-for="(item, index) in types">
              {{ index > 0 ? ',' : '' }}<a v-if="item != ''" :key="index" href="javascript:void(0)"
                @click="gos(item)">{{
                    item
                }}</a>
            </template>
          </div>
        </div>
        <div style="display: table-row">
          <div class="titles">
            Categories
          </div>
          <div class="contents">
            <template v-for="(item, index) in categories">
              {{ index > 0 ? ',' : '' }}<a v-if="item != ''" :key="index" href="javascript:void(0)"
                @click="gos(item)">{{
                    item
                }}</a>
            </template>
          </div>
        </div>
        <div style="display: table-row">
          <div class="titles">
            Tags
          </div>
          <div class="contents">
            <template v-for="(item, index) in tags">
              {{ index > 0 ? ',' : '' }}<a v-if="item != ''" :key="index" href="javascript:void(0)"
                @click="gos(item)">{{
                    item
                }}</a>
            </template>
          </div>
        </div>
      </div>

    </div>
    <div class="Related">Popular recommendations</div>
    <Cell :lux="0.16" :linelist="listbuss" @shou="shou" :consHeight="consHeightt" :deleteIcon="false" />
    <div class="Related">Related Designs</div>
    <Cell :lux="0.16" :linelist="listbus" @shou="shou" :consHeight="consHeights" :deleteIcon="false" />

    <Bottom />
  </div>
</template>

<script>
import axios from "axios";
import Bottom from "@/components/BottomNavigation/index";
import { sorting_list, download } from "@/utils/util";
import Cell from "../Screen/Cell";
import Shou from "../Screen/Shou";
import { fabric } from "fabric";

export default {
  components: {
    Bottom,
    Cell,
    Shou,
    fabric,
  },
  data() {
    return {
      Discount: false,
      Discount_text: "",
      styleids: "",
      locking: false,
      con: false,
      textarea1: "",
      productId: null,
      imgSrc: '',
      iframeSrc: '',
      downLoad: false,
      duan: true,
      // Collect: true,
      // su: false,
      // p: null,
      licenseType: 0,
      licensePrice: '',
      linelist: [],
      listbus: [],
      listbuss: [],
      consHeight: 0,
      consHeightt: 0,
      consHeights: 0,
      listnumber: 0,
      isRepeat: 0,
      imgSize: '',
      printSize1: '',
      printSize2: '',
      types: [],
      categories: [],
      tags: [],
      alikeList: [],

      img: null,
      lastModel: null,
      lastPic: null,

      minScale: 400,
      maxScale: 400,
      curScale: 100,
      progress: 0,

      picCanvas: null,
      boxSize: 6,
      clipWidth: 600, //clip 裁切出来的方块区域
      clipHeight: 600, //clip 裁切出来的方块区域
      imgPxWidth: null,
      imgPxHeight: null,

      modelIdx: '',
      model: {},
      modelList: [], // 从接口拿到的 图层的列表

      content_list_boll: [true, false, false], //控制每一个选项的选中和晴空
      conteent_img: "",
      conteent_img2: "",
      ontent_datas: "",

      why: [require("@/assets/img/why.svg"), require("@/assets/img/<.svg")],
      gx: [require("@/assets/img/gox.svg"), require("@/assets/img/xingx.svg"), require("@/assets/img/oks.svg")],
      wonder: require("@/assets/img/wonder.png"),
      state: [require("@/assets/img/x.png"), require("@/assets/img/d.png")],
      ab: [require("@/assets/img/a.png"), require("@/assets/img/b.png")],
      blankImage: require("@/assets/img/blank.svg"),
      ku: [require("@/assets/img/ku_1.svg"), require("@/assets/img/ku_2.svg"), require("@/assets/img/ku_4.svg"), require("@/assets/img/ku_3.svg")],

    };
  },
  watch: {
    '$store.state.fontRate': {
      handler() {
        this.changeSize();
      },
    },
  },
  methods: {
    mis() {
      document.getElementsByClassName("as")[0].style.position = "absolute"
    },
    sub() {
      if (this.textarea1 == "") {
        return this.$message("Cannot be empty！")
      }
    },
    closeb() {
      this.con = true
    },
    closebs() {
      this.con = false
    },
    //点击取消收藏按钮
    cancel(id) {
      console.log(id);
    },
    // 添加到离线购物车
    addOutlineCar() {
      let m = JSON.parse(localStorage.getItem('sshopping_car'));

      if (m && m.some(item => item.productId == this.productId)) {
        this.$message("Product exist");
      } else {

        if (!m) {
          m = [];
        }

        let s = {
          productId: this.productId,//直接把这张图的所有详细信息保存起来，到购物车我们再根据我们需要显示
          imgType: this.licenseType, //授权类型
          productNum: 1
        };

        m.push(s)
        localStorage.setItem('sshopping_car', JSON.stringify(m));
        this.ontent_datas.isBuy = 1;

        this.locking = false;
      }
    },
    // 添加到购物车
    addShopingCar() {
      let vm = this;

      if (vm.locking) return;
      vm.locking = true;

      gtag('event', 'add_to_cart', {
        currency: 'USD',
        items: [{
          item_id: this.ontent_datas.productId,
          item_name: this.ontent_datas.imgSn,
          price: this.licensePrice,
          currency: 'USD',
          quantity: 1
        }],
        value: this.licensePrice
      });

      // 首先判断一下用户有没有登陆
      if (!localStorage.user) {
        // 没有登陆的时候将购物车信息存到本地的 localStorage.shopping_car当中
        // 首选判断一下localStorage.shopping_car有没有声明
        this.addOutlineCar();
        // console.log(JSON.parse(localStorage.getItem('sshopping_car')));

        // this.Bag = false;
      } else {
        this.rq({
          url: "/api/cart/save",
          method: "post",
          param: {
            productId: this.ontent_datas.productId,
            imgType: this.licenseType,
          },
          onError: function () {
            vm.locking = false;
          },
          vm,
        }).then((res) => {
          if (res.code == 200) {
            // this.$message("添加成功");
            if (!res.user) {
              vm.addOutlineCar();
            } else {
              vm.ontent_datas.isBuy = 1;
            }

          } else if (res.code == 601 || res.code == 680) {
            vm.addOutlineCar();
            //   this.Bag = false;
            // this.$store.state.login = true;
            // this.$store.state.logins = true
            // this.$store.state.ForgetPwd = false
            // this.$store.state.Sign = false
          } else {
            this.$message(res.desc);
            //
          }
          vm.locking = false;
        });
      }
    },
    gotoShopingCar() {
      this.$router.push("/shoppingcar")
    },
    shou(pd) {
      this.$refs.shou.shou(pd);
    },
    details(a, b) {
      const routeUrl = this.$router.resolve({
        path: "/detail/" + a
      });
      window.open(routeUrl.href, "_self");
    },
    thisDownload(pd) {
      const _this = this;

      _this.rq({
        url: "/api/product/downUrl",
        method: "post",
        param: {
          id: _this.ontent_datas.productId,
        },
        onError: function () {
        },
        _this,
      }).then((res) => {
        if (res.code == 200) {
          // this.$message("添加成功");

          res.data = res.data.replace('http:', 'https:');

          let reg = /\.(\w*?)\?/
          let ext = reg.exec(res.data)[1];

          if ('zip' == ext.toLowerCase()) {

            let ele = document.createElement('a');
            ele.setAttribute('href', res.data); //设置下载文件的url地址
            ele.setAttribute('download', _this.ontent_datas.imgSn + '.' + ext);//用于设置下载文件的文件名

            ele.setAttribute("target", "_self");
            ele.click();

          } else {
            download(_this, res.data, _this.ontent_datas.imgSn + '.' + ext);
          }

          // let xhr = new XMLHttpRequest();
          // xhr.responseType = 'blob';
          // xhr.open('GET', res.data, true);
          // xhr.onload = function(){
          //     let res1 = xhr.response;
          //     if(res1){
          //         const link = document.createElement("a");
          //         link.href = URL.createObjectURL(res1);
          //         link.download = _this.ontent_datas.imgSn + '.' + ext;
          //         link.click();
          //         URL.revokeObjectURL(link.href);
          //     }
          // }
          // xhr.send();
        } else {
          this.$message(res.desc);
          //
        }
      });

    },
    changeSize() {
      if (this.listbuss != null && this.listbuss.length > 0)
        sorting_list(this.p, this);

      this.clipWidth = this.clipHeight = 6 * this.$store.state.fontRate;
    },
    selectAlikeById() {
      // this.linelist=null;
      let vm = this;
      this.rq({
        url: "/api/product/selectAlikeById",
        method: "post",
        param: {
          productId: vm.productId
        },
        onError: function () {
        },
        vm: null,
      }).then((res) => {
        if (res.code == 200) {
          vm.listbuss = res.data;

          if (vm.listbuss == undefined) {
            this.linelist = null;
            this.consHeightt = 0;
          } else {
            //   获取宽度
            vm.consHeightt = sorting_list(vm.listbuss, vm);

          }
        } else {
          //
          this.$message(res.desc);
        }
      });
    },
    ibus() {
      let vm = this;
      this.rq({
        url: "/api/product/selectBestSellerByTagId",
        method: "post",
        param: {
          tagIds: vm.styleids
        },
        onError: function () {
        },
        vm: null,
      }).then((res) => {
        if (res.code == 200) {
          vm.listbus = res.data;

          if (vm.listbus == undefined) {
            this.linelist = null;
            this.consHeights = 0;
          } else {
            //   获取宽度

            vm.consHeights = sorting_list(vm.listbus, vm);
          }
        } else {
          //
          this.$message(res.desc);
        }
      });
    },
    content_list_bools(a) {
      this.licenseType = a;
      this.calcPrice()
    },
    candidate_click(src) {
      if (this.conteent_img2 == "") {
        // 首先将content图片给 旁边的小图片
        this.conteent_img2 = this.conteent_img;
      }
      this.conteent_img = src;
    },
    // 小图片和大图片的呼唤👈
    content_img2_click() {
      // 声明一个变量，作为临时数据存放
      let ImgMaxSrc = this.conteent_img;
      this.conteent_img = this.conteent_img2;
      this.conteent_img2 = ImgMaxSrc;
    },
    calcPrice() {
      const _this = this;
      let licenseType = _this.licenseType;
      let price = _this.ontent_datas.price;
      let priceOnce = _this.ontent_datas.priceOnce;

      if (licenseType == 3) {
        _this.licensePrice = priceOnce;
      } else if (licenseType == 5) {
        _this.licensePrice = price;
      } else if (licenseType == 4) {
        _this.licensePrice = Math.round(price * 0.75 * 100) / 100;
      } else if (licenseType == 1) {
        _this.licensePrice = Math.round(price * 0.5 * 100) / 100;
      }
    },
    loadSimpleProduct() {
      let vm = this;
      this.rq({
        url: "/api/product/selectById",
        method: "post",
        param: {
          productId: vm.productId,
        },
        onError: function () {
        },
        vm,
      }).then((res) => {
        if (res.code == 200) {
          vm.modelList[0].sourceImgSrc = res.data.cover;
          vm.modelList[0].imgSrc = vm.modelList[0].sourceImgSrc.replace('/j/', '/b/');
          vm.imgSrc = vm.modelList[0].sourceImgSrc;
          vm.selectModel(0);

          vm.ontent_datas = res.data;
          vm.conteent_img = vm.$imgServer + res.data.cover;

          // 首先判断用户是否登陆
          if (res.user && res.user.id) {

          } else {

            let m = JSON.parse(localStorage.getItem('sshopping_car'));
            if (m && m.length > 0) {
              if (m.some(item => item.productId == vm.productId)) {
                vm.ontent_datas.isBuy = 1;
              }
            }
          }

          if (vm.ontent_datas.isUse > 0) {
            vm.licenseType = 5;
          } else {
            vm.licenseType = 3;
          }

          // 可以买断
          if (vm.ontent_datas.isBuyout == 1) {
            vm.licenseType = 3;
          }

          vm.calcPrice();

          if (res.data.imgSize) {

            if (res.data.imgSize == '矢量图') {
              vm.imgSize = 'Vector image';
            } else {
              let wp = 300, hp = 300;
              let w = '', h = '', imgSize, wh;

              if (res.data.imgSize.indexOf('cm') >= 0) {
                imgSize = res.data.imgSize.replace('cm', '');
                imgSize = imgSize.replace('cm', '');
                wh = imgSize.split("*");
                if (wh[0]) {
                  w = Math.round(wh[0] / 254 * 100 * wp);
                }
                if (wh[1]) {
                  h = Math.round(wh[1] / 254 * 100 * wp);
                }

              } else {
                imgSize = res.data.imgSize.replace('像素', '');
                imgSize = imgSize.replace('像素', '');
                wh = imgSize.split("*");
                w = wh[0];
                h = wh[1];
              }
              if (w && h) {
                vm.imgSize = w + '*' + h;

                let w3 = '', w6 = '', h3 = '', h6 = '';
                if (w) {
                  w3 = Math.round(w * 254 / 300) / 100;
                  w6 = Math.round(w * 254 / 600) / 100;
                }
                if (h) {
                  h3 = Math.round(h * 254 / 300) / 100;
                  h6 = Math.round(h * 254 / 600) / 100;
                }

                vm.printSize1 = w3 + '*' + h3 + 'cm(300dpi)';
                vm.printSize2 = w6 + '*' + h6 + 'cm(600dpi)';
              } else {
                vm.imgSize = res.data.imgSize;
                vm.printSize1 = '';
                vm.printSize2 = '';
              }

            }

          } else {
            vm.imgSize = '';
            vm.printSize1 = '';
            vm.printSize2 = '';
          }
          vm.loadProduct(res);
        } else {
          //
          this.$message(res.desc);
        }
      });
    },
    loadProduct(res) {
      let vm = this;



      vm.types = [];
      vm.ontent_datas.isRepeat = 0;
      vm.ontent_datas.isLayer = 0;
      vm.styleids = res.data.styleId
      vm.ibus();

      res.data.styleStr.split(',').forEach(item => {
        if (item != '') {
          vm.types.push(item)

          if (item == 'In Repeat' || item == 'Cyclic graph') {
            vm.ontent_datas.isRepeat = 1;
          }
          if (item.indexOf('Simple layered') >= 0 || item == 'Layered file' || item == 'Color separation') {
            vm.ontent_datas.isLayer = 1;
          }
        }
      });


      vm.ontent_datas.tags = res.data.tags;
      vm.isRepeat = res.data.isRepeat;

      vm.categories = [];
      res.data.productFicationStr.split(',').forEach(item => {
        if (item != '')
          vm.categories.push(item)
      });

      vm.tags = [];
      res.data.label.split(',').forEach(item => {
        if (item != '')
          vm.tags.push(item)
      });
      res.data.entityStr.split(',').forEach(item => {
        if (item != '')
          vm.tags.push(item)
      });
      res.data.sceneStr.split(',').forEach(item => {
        if (item != '')
          vm.tags.push(item)
      });
      res.data.seasonStr.split(',').forEach(item => {
        if (item != '')
          vm.tags.push(item)
      });
      res.data.fashionStr.split(',').forEach(item => {
        if (item != '')
          vm.tags.push(item)
      });
      // vm.conteent_img = vm.$imgServer + res.data.cover;

      vm.selectAlikeById();



    },
    switchPic() {
      const _this = this;
      _this.model = _this.lastPic;
      _this.modelList.forEach((item, idx) => {
        if (item.id == _this.model.id) {
          _this.modelIdx = idx;
        }
      });
    },
    switchModel() {
      const _this = this;
      _this.model = _this.lastModel;
      _this.modelList.forEach((item, idx) => {
        if (item.id == _this.model.id) {
          _this.modelIdx = idx;
        }
      });
    },
    selectModel(index) {
      const _this = this;

      _this.model = _this.modelList[index];
      _this.modelIdx = index;

      if (index === 0) {
        _this.maxScale = 400;
        _this.minScale = 20;
        _this.lastPic = _this.model;
      } else if (index === 1) {
        _this.maxScale = 200;
        _this.minScale = 20;
        _this.lastPic = _this.model;
      } else {
        // _this.iframeSrc='/sketch/'+_this.productId+'?img='+encodeURIComponent(_this.imgSrc)
        //     +'&modeli='+_this.modelIdx+'&fontRate='+_this.$store.state.fontRate;
        _this.iframeSrc = 'https://www.patternbuy.com/sketch/?img=' + encodeURIComponent(_this.imgSrc)
          + '&modeli=' + _this.modelIdx + '&fontRate=' + _this.$store.state.fontRate;
        console.log(_this.iframeSrc)
        _this.lastModel = _this.model;
        return;
      }

      _this.curScale = 100;

      if (_this.model.img == null) {

        if (_this.modelIdx == 0) {
          let img = new Image();
          img.setAttribute("crossOrigin", "anonymous");
          img.src = _this.model.sourceImgSrc;
          img.onload = () => {
            _this.model.img = img;
            _this.model.imgPxWidth = img.width;
            _this.model.imgPxHeight = img.height;

            // 判断 图片的宽度和高度哪个更值更大
            if (_this.model.imgPxWidth > _this.model.imgPxHeight) {
              _this.model.fabricScale = _this.clipWidth / _this.model.imgPxWidth;
            } else {
              _this.model.fabricScale = _this.clipHeight / _this.model.imgPxHeight;
            }
            _this.showImage(_this.model);
            _this.initImage9();
          };
        } else {
          _this.initImage9(function () {
            _this.showImage(_this.model);
          });
        }

      } else {
        _this.showImage(_this.model);
      }
    },
    // 图片在自适应和原尺寸之间转换的 函数封装
    showImage(model) {
      const _this = this;
      _this.curScale = 100;

      let opt = {
        hasControls: false,
        scaleX: model.fabricScale,
        scaleY: model.fabricScale,
        angle: 0,
        originX: "center",
        originY: "center",
        top: _this.clipWidth / 2,
        left: _this.clipHeight / 2
      };
      let oimg = new fabric.Image(model.img, opt);
      let obj = _this.picCanvas.getObjects();
      obj.forEach((res) => {
        _this.picCanvas.remove(res);
      });
      _this.picCanvas.add(oimg);
    },
    initImage9(callback) {
      const _this = this;

      let model = _this.modelList[1];
      let model0 = _this.modelList[0];

      let ww = _this.clipWidth,
        hh = (ww * model0.imgPxHeight) / model0.imgPxWidth;
      let x = 3;
      let y = 3;

      let cvs = document.createElement("canvas");
      cvs.width = ww * x;
      cvs.height = hh * y;
      let ctx = cvs.getContext("2d");

      for (let i = 0; i < x; i++) {
        for (let j = 0; j < y; j++) {
          ctx.drawImage(model0.img, i * ww, j * hh, ww, hh);
        }
      }

      let imgSrc = cvs.toDataURL("image/png");
      _this.modelList[1].imgSrc = imgSrc;
      _this.modelList[1].sourceImgSrc = imgSrc;

      let img = new Image();
      img.setAttribute("crossOrigin", "anonymous");
      img.src = imgSrc;
      img.onload = () => {
        model.img = img;
        model.imgPxWidth = img.width;
        model.imgPxHeight = img.height;

        // 判断 图片的宽度和高度哪个更值更大
        if (model.imgPxWidth > model.imgPxHeight) {
          model.fabricScale = _this.clipWidth / model.imgPxWidth;
        } else {
          model.fabricScale = _this.clipHeight / model.imgPxHeight;
        }

        if (callback)
          callback();
      };
    },
    // slider change事件
    sliderInput(v) {
      console.log('input')
      const _this = this;

      if (_this.modelIdx <= 1) {
        _this.sliderHandler(v);
      } else {
        return;
      }
    },
    sliderChange(v) {
      console.log('change')
      const _this = this;

      if (_this.modelIdx <= 1) {
        return;
      } else {
        _this.sliderHandler(v);
      }
    },
    sliderHandler(v) {
      const _this = this;

      if (_this.modelIdx <= 1) {

        let zpoint = new fabric.Point(
          _this.clipWidth / 2,
          _this.clipHeight / 2
        ); // 中心点
        if (!_this.picCanvas) return;
        _this.picCanvas.zoomToPoint(zpoint, v / 100);

      } else {
        // _this.imgScale = v / 100;
        // if (_this.modelIdx == 1) {
        //   _this.imgScale = _this.imgScale / _this.kMultiple;
        // }
        //
        // if(_this.timer!=null){
        //   clearTimeout(_this.timer);
        //   _this.timer=null;
        // }
        // _this.timer=setTimeout(function (){
        //   _this.zoomIn(Math.round(v * 1) / 100);
        // },200);
      }
    },
    gos(item) {
      // this.$store.state.option = item
      // this.$store.state.blank = "screen";

      this.$router.push({
        path: '/store',
        query: { q: item }
      });

    },
    loadCanvas() {
      const _this = this;

      _this.picCanvas = new fabric.Canvas("canvasBox3", {
        backgroundColor: "#fff",
        isDrawingMode: false,
      });

      _this.picCanvas.setWidth(_this.clipWidth);
      _this.picCanvas.setHeight(_this.clipHeight);

    },
    setAsPosition() {

      let scrolltop = document.documentElement.scrollTop || document.body.scrollTop;

      if (scrolltop > 1080) {
        // 到了底部之后想做的操作,如到了底部之后加载
        document.getElementsByClassName("as")[0].style.position = "fixed"
        document.getElementsByClassName("as")[0].style.top = "6rem"

      } else {
        document.getElementsByClassName("as")[0].style.position = "absolute"
      }
    },
    loadModel() {
      // console.log(111);
      let _this = this;

      // axios 基本使用
      axios({
        url: "/name.js", // 请求的链接
      }).then((res) => {
        // let data=JSON.parse(res.data);
        console.log(res.data);
        res.data.forEach(item => {
          if (item.img)
            item.imgSrc = item.img;
          item.sourceImgSrc = item.imgSrc;
          item.img = null;
          item.imgPxWidth = null;
          item.imgPxHeight = null;
          item.fabricScale = null;
        });
        _this.modelList = res.data;
        _this.loadSimpleProduct();
      });

    },
  },
  created() {
    let vm = this;


    this.rq({
      url: `/uploads/temp/home.json?time=${new Date}`,
      method: "get",
      param: {

      },
      onError: function () { },
      vm,
    }).then((res) => {

      res.couponCode == "" ? vm.Discount = false : vm.Discount = true
      vm.Discount_text = res.title + res.couponCode
    });
  },
  destroyed() { // 销毁vm组件
    const _this = this;
    window.removeEventListener('scroll', _this.setAsPosition, false);
  },
  mounted() {
    const _this = this;
    _this.changeSize();

    _this.locking = false;


    let ps = this.$route.path.split('/');
    _this.productId = ps[ps.length - 1];

    _this.loadCanvas();
    _this.loadModel();
    // _this.loadProduct();

    // _this.selectAlikeById();

    window.addEventListener('scroll', _this.setAsPosition, false);
  },

};
</script>

<style lang="less" scoped>
.bodys {
  background: #f7f9fd;

  //height: 1080px;

  .as {
    z-index: 9;
    position: absolute;
    right: 0rem;
    top: 13.9rem;
  }
}

.title {
  padding-top: 0.2rem;

  .problems {
    position: absolute;
    top: 7.3rem;
    right: 0.08rem;
    width: 0.48rem;
    height: 0.48rem;

    img {
      width: 100%;
      height: 100%;
    }

    .cons {
      padding-top: 0.24rem;
      padding-left: 0.24rem;
      padding-right: 0.24rem;
      width: 4.48rem;
      height: 3.38rem;
      background: #fff;
      position: absolute;
      right: 0.6rem;
      bottom: 0;
      z-index: 10;
      box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
      border-radius: 0.14rem;
      color: #000;

      .title {
        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 500;
        font-size: 0.20rem;
        line-height: 0.28rem;

      }

      .text {
        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 400;
        font-size: 0.14rem;
        line-height: 0.20rem;

      }

      .button {
        justify-content: space-between;
        display: flex;
        padding-top: 0.16rem;

        button {
          width: 0.99rem;
          height: 0.42rem;
          text-align: center;

          border: 1px solid #373ACB;
          border-radius: 0.21rem;
          background: #fff;
        }

        button+button {
          color: #fafafa;
          background: #373ACB;
        }
      }

    }
  }

  display: flex;
  /*margin-left: 1.73rem;*/
  /*margin-right: 1.73rem;*/
  /*border-radius: 0.14rem;*/
  text-align: center;


  //   overflow: hidden;
  >div {
    display: inline-block;
    vertical-align: top;
    text-align: left;
  }

  .div_left {
    padding-left: 1.97rem;

    .left {
      border-radius: 0.14rem;
      overflow: hidden;
      width: 3.18rem;
      height: 7.3rem;
      left: 0px;
      top: 0px;
      position: relative;
      background: #fff;
      box-sizing: border-box;
      // padding-left: 0.1rem;
      padding-top: 0.24rem;
      overflow: auto;

      .model {
        transform-origin: -50% -50%;

        width: 0.8rem;
        height: 0.22rem;
        font-family: "PingFang SC";
        font-style: normal;
        font-weight: 700;
        font-size: 16px;
        transform: rotateZ(90deg);
        position: absolute;
        top: 0rem;
        left: 0.22rem;
        text-align: center;
        background: #222222;
        color: #fff;
        line-height: 0.22rem;
        border-radius: 0 0.04rem;
        transform-origin: 0% 0%;
      }

      .imglist {
        width: 1.3rem;
        height: 1.3rem;
        float: left;
        margin-bottom: 0.08rem;

        // margin-top: 0.08rem;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      .imgsList {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        width: 2.68rem;
        margin: 0 auto;
      }

      .imglist:nth-child(2n) {
        // margin-right: 0.08rem;
      }
    }
  }

  .div_switch {
    display: inline-block;
    position: relative;
    width: 0.82rem;
    padding-left: 0.05rem;
  }

  .div_content {
    padding-left: 0.82rem;
    padding-right: 0.58rem;
    padding-right: 0;

    .comtent {
      width: 6.52rem;
      height: 6rem;


      .content_img {
        width: 6.52rem;
        height: 100%;
        display: flex;
        position: relative;
        margin-bottom: 0.16rem;

        .content_img1 {
          width: 6rem;
          height: 6rem;
          position: absolute;
          z-index: 2;
          left: 0;
          overflow: hidden;

          img {
            position: absolute;
            left: 50%;
            top: 50%;
            width: 100%;
            height: 100%;
            transform: translateX(-50%) translateY(-50%);
            object-fit: cover;
          }
        }

        .content_img2 {
          width: 0.5rem;
          height: 0.5rem;
          font-size: 0.14rem;

          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
      }

      .slider {
        font-size: 0.14rem;
      }

    }

  }


  .rigth {

    min-width: 4.19rem;
    width: 4.19rem;
    // height: 7.4rem;
    background: #fff;
    // margin-left: 0.58rem;
    border-radius: 0.14rem;
    // overflow: hidden;
    box-sizing: border-box;
    padding-left: 0.24rem;
    padding-right: 0.24rem;

    .text {
      padding-bottom: 0.1rem;
      border-bottom: 1px dashed #f1f1f1;

      .title_name {
        display: flex;
        margin-top: 0.16rem;
        font-size: 0.14rem;
        font-family: "PingFang SC";
        font-style: normal;
        font-weight: 400;
        font-size: 0.14rem;
        line-height: 0.2rem;
        color: #666666;
        justify-content: space-between
      }


      .spans_1 {
        white-space: nowrap;
        padding-right: 0.2rem;
      }

      .spans_2 {


        text-align: right;
      }
    }

    .option {
      margin-top: 0.2rem;
      width: 100%;
      padding-bottom: 0.2rem;
      border-bottom: 1px dashed #f1f1f1;

      .title {
        margin-left: 0px;
        display: flex;
        width: 100%;
        color: #666;
        font-family: "PingFang SC";
        font-style: normal;
        font-weight: 400;
        font-size: 0.12rem;
        line-height: 0.17rem;

        .one {
          color: #222;
        }

        .two:hover {
          cursor: pointer;
          text-decoration: underline
        }

        .el-icon-warning-outline {
          font-size: 0.16rem;
          transform: translateY(10%);
          margin-left: 0.08rem;
          color: #666;
        }

        .el-icon-warning-outline:hover {
          color: #000;
        }

        div+div {
          color: #373ACB;
          margin-left: 0.08rem;
        }

      }

      .content {
        width: 100%;

        .content_list {
          position: relative;
          margin-top: 0.16rem;
          /*width: 3.84rem;*/
          // height: 0.56rem;
          background: #f3f7ff;
          font-size: 0.14rem;
          padding-top: 0.08rem;
          display: flex;
          line-height: 0.22rem;
          cursor: pointer;
          justify-content: space-evenly;
          border-radius: 0.14rem;

          >div {
            >div {
              cursor: pointer;
            }
          }

          .content_list_bolls {
            width: 0.3rem;
            text-align: right;
            margin-right: 0.08rem;
            height: 100%;
            line-height: 0.28rem;
            box-sizing: border-box;
            padding-top: 0.1rem;
            cursor: pointer;

            >img {
              cursor: pointer;
            }
          }

          .lusk {
            padding-top: 0;
          }

          .con_idv {
            width: 100%;
          }

          //   padding-top: 0.08rem;
          .wonder {
            /*line-height: 100%;*/
            /*//   height: 100%;*/
            /*margin-top: 0.2rem;*/
            /*margin-left: 0.33rem;*/
            width: 0.3rem;
            height: 0.56rem;
            line-height: 00.56rem;

            top: 0.2rem;
          }

          .wonder:hover {
            .wonder_text {
              display: block;
              z-index: 10;
            }
          }

          .wonder_text {
            position: absolute;
            width: 3.44rem;
            // height: 1.5rem;
            // border: 1px solid #000;
            transform: translateX(-48%) translateY(0.0rem);
            display: none;

            .demo2 {
              width: 100%;
              border: 1px solid #e8ecf5;
              height: 100%;
              border-radius: 16px;
              position: relative;
              margin-left: auto;
              margin-right: auto;
              background: #fff;
              box-sizing: border-box;
              padding-top: 0.18rem;
              padding-left: 0.24rem;
              padding-right: 0.24rem;
              padding-bottom: 0.15rem;

              .texts {
                font-family: "PingFang SC";
                font-style: normal;
                font-weight: 400;
                font-size: 0.14rem;
                line-height: 0.2rem;
              }
            }

            .demo2 em,
            .demo2 span {
              font-style: normal;
              font-size: 30px;
              position: absolute;
              left: 50%;
              transform: translateX(-50%);
              top: -0.3rem;
              color: #e8ecf5;
            }

            .demo2 em {
              z-index: -1;
            }

            .demo2 span {
              left: 50%;
              transform: translateX(-50%) translateY(0.02rem);

              color: white;
            }

            .trianglem {
              position: absolute;
              left: 50%;
              transform: translateX(-15%) translateY(-50%);
              // transform: translateY(-50%);
              // height: 0.1728rem;
              // width: 0.2rem;
              // background: red;
              width: 0px;
              height: 0px;
              border: 0.15rem solid #000;
              border-top-color: transparent;
              border-left-color: transparent;
              border-right-color: transparent;
            }
          }
        }
      }
    }

    .price {
      font-family: "PingFang SC";
      font-style: normal;
      font-weight: 400;
      font-size: 0.14rem;
      line-height: 0.41rem;
      /*width: 3.86rem;*/
      height: 0.41rem;
      border-bottom: 1px dashed #f1f1f1;

      >div {
        display: inline-block;
        width: 50%;
      }

      >div:last-child {
        font-size: 0.18rem;
        font-weight: bold;
        text-align: right;
        padding-right: 0.2rem;
      }
    }

    .operlist {
      width: 100%;
      height: 1.32rem;

      box-sizing: border-box;

      .operlist_1 {
        width: 100%;
        height: 0.36rem;
        line-height: 0.36rem;
        margin-top: 0.1rem;
        display: flex;

        .gx1 {
          // margin-top: 2px;
          // margin-right: 7.6px;
        }

        .gx2 {
          // margin-top: 5px;
          // margin-right: 7.6px;
        }

        button+button {
          margin-left: 0.24rem;
        }

        button {
          width: 1.88rem;
          //   height: 35px;
          border: none;
          line-height: 100%;
          background: #ffc65a;
          border-radius: 0.34rem;
          margin-top: 0px;
          height: 0.36rem;
          display: flex;
          text-align: center;
          align-items: center;
          box-sizing: border-box;
          // padding-left: 0.24rem;
          // padding-right: 0.24rem;
          justify-content: center;

          img {
            color: #fff2c2;
            margin-right: .04rem;
          }

          div {
            line-height: 0.36rem;
            height: 0.36rem;
          }
        }

        .btn2 {
          padding-left: 0.44rem;
          padding-right: 0.42rem;

          img {
            margin-right: .08rem;
          }
        }
      }

      .tipstext {
        text-align: center;
        padding-top: 0.08rem;
      }

      .operlist_2 {
        margin-top: 0.14rem;
        width: 100%;
        height: 0.46rem;
        background: #373acb;
        border-radius: 0.24rem;
        color: #ffffff;
        font-weight: 400;
        font-size: 0.16rem;
        line-height: 0.46rem;
        text-align: center;
        position: relative;
        cursor: pointer;
        border: 0;
        display: flex;
        justify-content: center;

        .download {
          width: 0.25rem;
          height: 0.25rem;
          transform: translateY(25%);
          fill: currentColor;
          overflow: hidden;
        }

        img {
          width: 0.25rem;
          transform: translateX(-0.04rem);
        }
      }

      .downs {
        background: #fff;
        border: 1px solid #373ACB;
        color: #373ACB;
        position: relative;
        overflow: hidden;
      }

      .btn_x:hover {
        background: #5F61D5;
      }

      .btn_x:active {
        background: #2C2EA2;
      }

      .bag {


        img {
          color: #fff;
          transform: translateX(0.08rem);
        }
      }

      .btn_1 {
        color: #222;
        background: #FFC65A;
      }

      .btn_1:hover {
        background: #FFDA95;
      }

      .btn_1:active {
        background: #A37E3A;
      }

      .btn_12 {
        background: #F1F1F1;
        color: #222222
      }

      .btn_12:hover {
        background: #CCCCCC;
      }

      .btn_12:active {
        background: #CCCCCC;
      }

    }

    // .operlist {
    //   width: 100%;
    //   height: 1.32rem;

    //   box-sizing: border-box;

    //   .operlist_1 {
    //     width: 100%;
    //     height: 0.36rem;
    //     line-height: 0.36rem;
    //     padding-top: 0.1rem;
    //     display: flex;
    //     .gx1 {
    //       margin-top: 2px;
    //       margin-right: 7.6px;
    //     }
    //     .gx2 {
    //       margin-top: 5px;
    //       margin-right: 7.6px;
    //     }
    //     button + button {
    //       margin-left: 0.24rem;
    //     }
    //     button {
    //       width: 1.88rem;
    //       //   height: 35px;
    //       border: none;
    //       line-height: 100%;
    //       background: #ffc65a;
    //       border-radius: 0.34rem;
    //       margin-top: 0px;
    //       height: 30px;
    //       display: flex;
    //       text-align: center;
    //       box-sizing: border-box;
    //       padding-left: 0.35rem;
    //       img {
    //         color: #fff2c2;
    //       }
    //       div {
    //         line-height: 0.36rem;
    //         height: 0.36rem;
    //       }
    //     }
    //   }
    //   .operlist_2 {
    //     margin-top: 0.14rem;
    //     width: 4rem;
    //     height: 0.36rem;
    //     background: #373acb;
    //     border-radius: 0.24rem;
    //     color: #ffffff;
    //     font-weight: 400;
    //     font-size: 0.16rem;
    //     line-height: 0.36rem;
    //     text-align: center;
    //   }
    // }
  }
}

.middle {
  text-align: center;
  min-width: 1020px;

  >div {
    margin: 0.2rem auto 0;
    width: 16.18rem;
    height: 1.51rem;
    background: #fff;
    border-radius: 0.14rem;
    margin-left: 50%;
    transform: translateX(-50%);
    box-sizing: border-box;
    padding-left: 2.05rem;
    padding-top: 0.2rem;
    padding-right: 3.68rem;
    padding-bottom: 0.25rem;
    display: flex;
    text-align: left;

    ul {
      li {
        list-style-type: none;
        margin-top: 0.15rem;
      }
    }

    .titles {
      display: table-cell;
      width: 18%;
      font-size: 0.14rem;
      line-height: 0.2rem;
      text-align: right;
      padding-right: 0.15rem;
    }

    .contents {
      display: table-cell;
      font-size: 0.14rem;
      line-height: 0.2rem;
      margin-left: 0.16rem;

      .bulues {
        color: #6467fd;
      }
    }
  }
}

.in_2 {
  //display: flex;
  width: 3.56rem;
  height: 0.86rem;
  margin-top: 0.16rem;
  background: #F8F8F8;
  border-radius: 0.08rem;

  >span {
    margin-left: 0.04rem;
    display: inline-block;
    vertical-align: top;
    margin-top: 0.15rem;

    img {
      width: 0.84rem;
    }
  }
}

.in_23 {
  height: auto;
  padding: 0.12rem;
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 400;
  font-size: 0.12rem;
  line-height: 0.17rem;
  color: #FF4F44;
  background: #FFF0EE;
}

.Related {
  width: 100%;
  font-family: "PingFang SC";
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 28px;
  text-align: center;
  margin-top: 0.53rem;
  // padding-left: 0.14rem;
  margin-bottom: 0.14rem;
}

//.contents {
//  // overflow-y: auto;
//  // overflow-x: hidden;
//  /*width: 83.7vw;*/
//  //  height: 80vh;
//  position: relative;
//  margin: 0 0.2rem;
//
//  .numberlist {
//    position: absolute;
//    padding: 0 0.1rem;
//    cursor: pointer;
//  }
//}

/deep/ .el-slider__button-wrapper {
  z-index: 1 !important;
}

.canvas-clip {
  width: 3rem;
  height: 3rem;
  // background: #000;
  // position: relative;
  // top: 50%;
  // left: 50%;
  // transform: scale(1) translate(-50%, -50%);
  // margin-left: 26px;
  position: absolute;
  z-index: 99;
  margin-bottom: 30px;
  left: 0;
  top: 0;

  .markImg1 {
    display: none;
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 888;
    left: 0;
    top: 0;
    // box-shadow: 0 0 8px rgb(0 0 0 / 12%);
    pointer-events: none;
    // display: none;
  }

  .markImg2 {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: scale(1) translate(-50%, -50%);
    z-index: 2;
    pointer-events: none;
  }


}

.babylon-container {
  // margin-bottom: 24px;
  position: relative;
  // width: 650px;
  // height: 650px;
  width: 6rem;
  height: 6rem;
}

.markDiv {
  width: 300px;
  height: 300px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: scale(1) translate(-50%, -50%);
  z-index: 2;
  pointer-events: none;
  display: none;
}

#container {
  // width: 650px;
  // height: 650px;
  width: 6rem;
  height: 6rem;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    // width: 100%;
    height: 100%;
    width: auto;
    // object-fit: cover;
  }
}

.canvas-container canvas {
  opacity: 0;
}

#canvasBox3 {
  opacity: 100;
}

.ordinary-picture {
  width: 0.5rem;
  height: 0.5rem;
  margin-top: 0.2rem;
  //position: absolute;
  z-index: 9;
  //right: 0;

  img {
    width: 100%;
    height: 100%;
  }
}

/deep/ .el-textarea__inner {
  background: #f1f1f1;
}
</style>>

