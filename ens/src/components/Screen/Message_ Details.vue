<template>
  
  <div class="message" @click="close">

    <div class="content" @click.stop="">
      <i @click.stop="close" class="el-icon-close"></i>
      <div class="content_1">
        <div class="imgs">
          <img :src="res.cover" alt="">
        </div>
        <div class="inters">
          <div class="in_1">
            <div class="text"><span>Pattern ID</span><span>{{ res.imgSn }}</span></div>
            <div class="text"><span>Included Files</span><span>{{ res.format }}</span>
            </div>

            <div class="text">
              <span>Size</span>
              <span>{{ imgSize }}</span>
            </div>
            <div class="text">
              <span>Print Size</span>
              <span>{{ printSize1 }}</span>
            </div>
            <div class="text">
              <span>&nbsp;</span>
              <span>{{ printSize2 }}</span>
            </div>

            <!--            <div class="text"><span>Size</span><span>{{ res.imgSize=='矢量图'?'Vector image':res.imgSize }}</span></div>-->
            <!--            <div class="text"><span>Resolution</span><span>{{ res.power }}</span></div>-->
            <div class="text"><span>In Repeat + Seamless
                Tile</span><span>

                <img :src="res.isRepeat>0?state[1]:state[0]" alt=""/>
              </span></div>
            <div class="text"><span>Layered PSD/Al</span>
              <span>
                <img :src="res.isLayer>0?state[1]:state[0]" alt=""/>
              </span>
            </div>
            <div class="text"><span>Vector AI or EPS</span><span>
                <span>

                  <img :src="res.isVector>0?state[1]:state[0]" alt=""/>
                </span>
              </span>
            </div>
          </div>
          <div class="in_2">
            <span v-for="(item, index) in ku" :key="index">

              <img :src="item" v-if="index==0 || (index==2 && res.isRepeat>0)
              || (index == 3 && res.isLayer > 0) || (index == 1 && res.isLarge >0)" alt="">
            </span>
            <!--              <img :src="item" v-for="(item, index) in ku" :key="index" alt="">-->
          </div>
          <div class="in_3">
            <div class="title">
              <span>License Type</span><span class="Compare"><a href="/html/Comparison.html" target="_blank">Compare
                  Licenses</a></span>
              <img :src="wonder" alt=""/>
            </div>
            <div v-show="res.isBuyout <= 0">
              <!--              <div class="content_list" @click="content_list_bools(1)">-->
              <!--                <div class="content_list_bolls">-->
              <!--                  <img v-show="licenseType != 1" :src="ab[0]" alt="">-->
              <!--                  <img v-show="licenseType == 1" :src="ab[1]" alt="">-->
              <!--                </div>-->
              <!--                <div class="con_idv">-->
              <!--                  <div>Personal (JPEG Only)</div>-->

              <!--                </div>-->

              <!--              </div>-->
              <div class="content_list">
                <div class="content_list_bolls" @click="content_list_bools(4)">
                  <img v-show="licenseType != 4" :src="ab[0]" alt="">
                  <img v-show="licenseType == 4" :src="ab[1]" alt="">
                </div>
                <div class="con_idv">
                  <div>Commercial (layered file/JPEG)</div>

                </div>

              </div>
              <div class="content_list">
                <div class="content_list_bolls lusk" @click="content_list_bools(5)">
                  <img v-show="licenseType != 5" :src="ab[0]" alt="">
                  <img v-show="licenseType == 5" :src="ab[1]" alt="">
                </div>
                <div class="con_idv">
                  <div>Commercial Unlimited (Layered PSD +
                    JPEG)
                  </div>

                </div>

              </div>
            </div>
            <div class="content_list" @click="content_list_bools(3)" v-if="res.isBuyout > 0">
              <div class="content_list_bolls">
                <img v-show="licenseType != 3" :src="ab[0]" alt=""/>
                <img v-show="licenseType == 3" :src="ab[1]" alt=""/>
              </div>

              <div class="con_idv lusb">
                <div>Exclusive License（layered file/JPEG）</div>

              </div>
              <div class="wonder">
                <img :src="wonder" alt=""/>
                <div class="wonder_text">
                  <div class="demo2">
                    <em>&#9670;</em>
                    <span>&#9670;</span>
                    <div class="texts">
                      This product is a buyout picture, and will be automatically removed from the
                      shelf after
                      purchase
                      You can't return the goods after purchase. Please contact customer service
                      if there is any
                      quality
                      problem. Please confirm the follow-up operation
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
          <div class="in_4">
            <div class="price">
              <div>Price</div>
              <div>${{ licensePrice }}</div>
            </div>
            <div class="operlist">

              <div v-show="Collect" class="operlist_2 btn_1" @click="shou(res)">
                <img class="gx1" :src="gxs[1]" alt=""/>Collect</div>
              <div v-show="!Collect" class="operlist_2  btn_12" @click="shou(res)">Collect</div>

              <div v-show="res.isBuy == 2" class="operlist_2 bag  downs" @click="download(his.res)">Download File<svg
                  class="download" width="0.2rem" height="0.2rem" viewBox="0 0 20 20" fill=""
                     xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M6.7569 6.32977C7.0467 6.32977 7.2819 6.56618 7.2819 6.85747C7.2819 7.14876 7.0467 7.38516 6.7569 7.38516H6.0982C4.9684 7.38516 4.05 8.30758 4.05 9.44248V12.8795C4.05 14.0187 4.9712 14.9446 6.1045 14.9446H13.9025C15.0309 14.9446 15.95 14.0208 15.95 12.8866V9.45022C15.95 8.3111 15.0281 7.38516 13.8962 7.38516H13.2438C12.954 7.38516 12.7188 7.14876 12.7188 6.85747C12.7188 6.56618 12.954 6.32977 13.2438 6.32977H13.8962C15.6077 6.32977 17 7.72993 17 9.45022V12.8866C17 14.6034 15.6098 16 13.9025 16H6.1045C4.393 16 3 14.6005 3 12.8795V9.44248C3 7.72571 4.3895 6.32977 6.0982 6.32977H6.7569ZM10.0006 3C10.2904 3 10.5256 3.23641 10.5256 3.5277L10.525 10.7227L11.6701 9.56737C11.8745 9.36051 12.2063 9.36051 12.4121 9.56596C12.6172 9.77141 12.6179 10.1056 12.4135 10.3125L10.377 12.3674C10.3571 12.388 10.3356 12.4069 10.3126 12.424L10.3723 12.3719C10.3497 12.3949 10.3253 12.4155 10.2992 12.4337C10.2834 12.4447 10.2672 12.4547 10.2506 12.4638C10.2425 12.4682 10.2341 12.4725 10.2255 12.4766C10.2103 12.4839 10.1946 12.4904 10.1786 12.4963C10.1705 12.4991 10.1625 12.5018 10.1544 12.5043C10.1347 12.5104 10.1144 12.5154 10.0937 12.5191C10.0891 12.5199 10.0848 12.5206 10.0806 12.5213C10.0639 12.5239 10.0464 12.5257 10.0288 12.5266C10.0193 12.5271 10.0099 12.5274 10.0006 12.5274L9.9727 12.5253L9.92935 12.5226C9.92626 12.5222 9.92318 12.5217 9.92011 12.5212L10.0006 12.5274C9.96928 12.5274 9.93824 12.5246 9.90781 12.5191C9.88676 12.5154 9.86653 12.5104 9.8468 12.5044C9.83891 12.5019 9.83117 12.4993 9.82349 12.4965C9.8074 12.4908 9.79152 12.4842 9.77605 12.4768C9.76665 12.4723 9.7573 12.4675 9.7481 12.4624C9.73517 12.4553 9.72271 12.4477 9.71059 12.4396C9.7023 12.4341 9.694 12.4282 9.68587 12.422C9.66587 12.407 9.647 12.3905 9.62938 12.3728L9.62886 12.3719L7.58766 10.3125C7.38326 10.1056 7.38396 9.77141 7.58906 9.56596C7.79486 9.36051 8.12666 9.36051 8.33106 9.56737L9.475 10.7227L9.47556 3.5277C9.47556 3.23641 9.71076 3 10.0006 3Z"
                        fill="#222222"/>
                </svg>
              </div>
              <div v-show="res.isBuy == 1" class="operlist_2 bag btn_x" @click="addShopingCars"
                >View Cart
                <img class="gx1" :src="gxs[2]" alt=""/>
              </div>
         
              <div v-show="res.isBuy == 0" class="operlist_2 btn_x" @click="addShopingCar"
                >
            <img class="gx1" :src="gxs[0]" alt="" />
            Add To Bag
    </div>

              <!--          <div class="tipstext" v-if="ontent_datas.isBuy==1">Item Added To Your Cart!</div>-->
            </div>
          </div>
        </div>
      </div>
      <div class="content_2">

        <div class="table">
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
    </div>
  </div>
</template>
<script>
export default {
  name: 'APP',
  data() {
    return {
      gxs: [require("@/assets/img/gox.svg"), require("@/assets/img/xingx.svg"), require("@/assets/img/oks.svg")],
      imgSize: '',
      printSize1: '',
      printSize2: '',
      types: [],
      categories: [],
      tags: [],
      res: {},
      ontent_datas: "",
      // gx: [require("@/assets/img/gox.svg"), require("@/assets/img/xingx.svg"), require("@/assets/img/oks.svg")],
   
      Collect: true,
      licensePrice: "",
      licenseType: 0,
      ab: [require("@/assets/img/a.png"), require("@/assets/img/b.png")],
      wonder: require("@/assets/img/wonder.png"),
      state: [require("@/assets/img/x.png"), require("@/assets/img/d.png")],
      ku: [require("@/assets/img/ku_1.svg"), require("@/assets/img/ku_2.svg"), require("@/assets/img/ku_4.svg"), require("@/assets/img/ku_3.svg")]
    }
  },
  computed:{
    cosX(){
      return this.$store.state.cosX
    }
  },
  watch:{
    cosX() {
      this.Collect =this.$store.state.cosX
    }
  
  },
  methods: {
    gos(item) {
      // this.$store.state.option = item
      this.$store.state.blank = "bank";
      this.$store.state.item = item
      this.$router.push("/blank")


    },
    shou(item) {
      // this.$refs.shou.shou(item);
      this.$emit('shou', item)
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
          productId: this.res.productId,
          imgType: this.licenseType,
          productNum: 1
        };

        m.push(s)
        localStorage.setItem('sshopping_car', JSON.stringify(m));
        this.res.isBuy = 1;
      }
    },
    addShopingCar() {

      gtag('event', 'add_to_cart', {
        currency: 'USD',
        items: [{
          item_id: this.res.productId,
          item_name: this.res.imgSn,
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
        let vm = this;
        this.rq({
          url: "/api/cart/save",
          method: "post",
          param: {
            productId: this.res.productId,
            imgType: this.licenseType,
          },
          onError: function () {
          },
          vm,
        }).then((res) => {
          if (res.code == 200) {
            // this.$message("添加成功");
            if (!res.user) {
              vm.addOutlineCar();
            } else {
              vm.res.isBuy = 1;

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
        });
      }
    },
    addShopingCars() {
      this.close()
      this.$router.push("/shoppingcar")
    },
    calcPrice() {
      const _this = this;
      let licenseType = _this.licenseType;
      let price = _this.res.price;
      let priceOnce = _this.res.priceOnce;

      if (licenseType == 3) {
        _this.licensePrice = priceOnce;
      } else if (licenseType == 5) {
        _this.licensePrice = price;
      } else if (licenseType == 4) {
        _this.licensePrice = Math.round(price * 0.8 * 100) / 100;
      } else if (licenseType == 1) {
        _this.licensePrice = Math.round(price * 0.5 * 100) / 100;
      }
    },
    content_list_bools(a) {
      this.licenseType = a;
      this.calcPrice()

    },
    close() {
      this.$store.state.messagedetails = false

      document.body.style.overflow = "auto"
    }
  },
  created() {

    let vm = this;
    vm.rq({
      url: "/api/product/selectById",
      method: "post",
      param: {
        productId: this.$store.state.items.productId,
      },
      onError: function () {
      },
      vm,
    }).then((res) => {
      vm.repatFlag = 0;
      if (res.code == 200) {

        res.data.cover = vm.$imgServer + res.data.cover


        res.data.isRepeat = 0;
        res.data.isLayer = 0;


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

        res.data.styleStr.split(',').forEach(item => {
          if (item != '') {

            if (item == 'In Repeat' || item == 'Cyclic graph') {
              res.data.isRepeat = 1;
            }
            if (item.indexOf('Simple layered') >= 0 || item == 'Layered file' || item == 'Color separation') {
              res.data.isLayer = 1;
            }
          }
        });


        vm.res = vm.res = res.data
        vm.$store.state.prices = res.priceOnce
        if (vm.res.isUse > 0) {
          vm.licenseType = 5;
        } else {
          vm.licenseType = 3;
        }

        // 可以买断
        if (vm.res.isBuyout == 1) {
          vm.licenseType = 3;
        }
        if (vm.res.hasCollection > 0) {
          vm.Collect = false
        }

        vm.calcPrice();
        vm.types = [];

        res.data.styleStr.split(',').forEach(item => {
          if (item != '')
            vm.types.push(item)
        });
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
      }
    })


  },
  mounted() {
  },
}
</script>
<style lang="less" scoped>
.message {
  width: 100%;
  height: 100vh;
  position: fixed;

  z-index: 10;
  background: rgba(0, 0, 0, 0.5);

  .content {
    width: 11.71rem;
    height: 9.33rem;
    background: #f7f9fd;
    position: absolute;
    top: 0.6rem;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 0.1rem;

    .content_1 {
      display: flex;
      padding-left: 0.5rem;
      padding-right: 0.5rem;
      padding-top: 0.24rem;

      .imgs {
        width: 6rem;
        height: 6rem;

        img {
          object-fit: contain;
          width: 100%;
          height: 100%;
        }

      }

      .inters {
        width: 4rem;
        height: 7.1rem;
        background: #fff;
        margin-left: 0.72rem;
        border-radius: 00.14rem;
        padding-left: 0.24rem;
        box-sizing: border-box;
        padding-right: 0.24rem;
        padding-top: 0.24rem;
        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 400;
        font-size: 0.14rem;
        color: #666666;

        .in_1 + .in_1 {
          margin-top: 0.08rem;


        }

        .in_1 {
          line-height: 0.2rem;
          font-family: 'PingFang SC';
          font-style: normal;
          font-weight: 400;
          font-size: 0.14rem;

          .text {
            display: flex;
            justify-content: space-between;
            line-height: 0.22rem;

            img {
              margin-top: 25%;
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

          > span {
            margin-left: 0.04rem;
            display: inline-block;
            vertical-align: top;
            margin-top: 0.15rem;

            img {
              width: 0.84rem;
            }
          }
        }

        .in_3 {
          padding-top: 0.16rem;

          .title {
            .Compare {
              color: #373ACB;
              text-decoration: underline;
              margin-left: 0.08rem;
              margin-right: 0.08rem;
            }

            img {
              transform: translateY(25%);
            }
          }

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

            > div {
              > div {
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

              cursor: pointer;

              > img {
                cursor: pointer;
              }
            }

            .lusk {
              padding-top: 0.1rem;
            }

            .con_idv {
              width: 100%;
              padding-right: 0.59rem;
            }

            .lusb {
              padding-right: 0.2rem;
              //line-height: ;
            }

            .wonder {
              /*line-height: 100%;*/
              /*//   height: 100%;*/
              /*margin-top: 0.2rem;*/
              /*margin-left: 0.33rem;*/
              width: 0.3rem;
              // height: 0.56rem;
              // line-height: 00.56rem;

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

        .in_4 {
          .price {
            font-family: "PingFang SC";
            font-style: normal;
            font-weight: 400;
            font-size: 0.14rem;
            line-height: 0.41rem;
            /*width: 3.86rem;*/
            height: 0.41rem;
            border-bottom: 1px dashed #f1f1f1;
            border-top: 1px dashed #f1f1f1;
            margin-top: 0.16rem;

            > div {
              display: inline-block;
              width: 50%;
            }

            > div:last-child {
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


              button + button {
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
              border:0;
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
                // height: 0.25rem;
                padding-right: 0.04rem;
              }
            }

            .downs {
              background: #fff;
              border: 1px solid #373ACB;
              color: #373ACB;
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
                // transform: translateY(25%);
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
        }


      }
    }

    .content_2 {
      width: 100%;
      padding-left: 0.24rem;
      padding-right: 0.24rem;
      padding-top: 0.24rem;
      height: 1.5rem;
      box-sizing: border-box;
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 400;
      font-size: 0.14rem;
      line-height: 0.20rem;

      .table {
        display: table;
        background: #fff;
        width: 100%;
        height: 100%;
        border-radius: 0.14rem;
        box-sizing: border-box;
        padding-top: 0.25rem;
        padding-left: 0.61rem;
        padding-right: 0.61rem;

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

      //.contents {
      //  background: #fff;
      //  width: 100%;
      //  height: 100%;
      //  border-radius: 0.14rem;
      //  display: flex;
      //  box-sizing: border-box;
      //  padding-top: 0.25rem;
      //  padding-left: 0.61rem;
      //  padding-right: 0.61rem;
      //
      //  div {
      //    padding-bottom: 0.05rem;
      //  }
      //
      //  .title {
      //    white-space: nowrap;
      //    text-align: right;
      //    padding-right: 0.16rem;
      //
      //  }
      //
      //  .text_2 {
      //    .text_1 {
      //      a {
      //        color: #222;
      //      }
      //
      //    }
      //  }
      //
      //}
    }
  }
}

/deep/ .el-icon-close {
  font-size: 0.24rem;
  position: absolute;
  top: 0.12rem;
  right: 0.11rem;
  cursor: pointer;
}
</style>
