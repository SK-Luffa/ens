<template>
  <div class="lus">


    <Delete v-show="Solt_Message_Delete" @closeb="closeb" @Confirms="Confirms">
      <template v-slot:title>
        <span>Remove Product from Cart</span>

      </template>
      <template v-slot:content>
        Are you sure you want to remove Backpack Mockup Set from your cart?
      </template>
    </Delete>

    <div class="root">
      <div class="content">
        <div class="title">
          <div class="title_text_1">Pattern List</div>
          <div class="title_text_2">Information And authorization</div>
          <div class="title_text_3">Seat</div>

          <!-- <div class="title_text_5"></div> -->
          <div class="title_text_6">Price</div>
          <div class="title_text_7"></div>
        </div>
        <div class="contents">
          <div class="list" v-for="(item, index) in SingList" :key="index">

            <div class="imgs">
              <a @click="details(item.productId, item.imgSn)">
                <img :src="$imgServer + item.productImg" alt="" />
              </a>
            </div>
            <div class="name">
              <div>{{ item.imgSn }}</div>
              <div>{{ item.format }}</div>
              <div>{{ item.imgSize }}</div>
              <el-select v-model="item.imgType" :placeholder="item.mode" popper-class="optionsb"
                style="width:3rem;padding-left:0;margin-top: 0.05rem;" @change="changes(item)"
                :popper-append-to-body="false">
                <template v-if="item.imgType == 3">
                  <el-option class="xid" v-for="items in options_2" :key="items.value" :label="items.label"
                    :value="items.value">
                  </el-option>
                </template>
                <template v-else>
                  <el-option class="xid" v-for="items in options_1" :key="items.value" :label="items.label"
                    :value="items.value">
                  </el-option>
                </template>
              </el-select>
            </div>
            <div class="format">
              <!-- {{ item.format }} -->

              <!--              <div class="btns" v-show="item.productNum > 1" @click="reduce(index)">-</div>-->
              <div class="btns" :class="item.productNum <= 1 ? 'reduces' : ''" @click="reduce(item)">-</div>
              <div class="inputs"><input type="text" v-model="item.productNum" @input="numbers(item)"></div>
              <div class=" btns" @click="increase(item)">+</div>


            </div>

            <!-- <div class="format size">

            </div> -->

            <div class="format prie">${{ item.orderAmount }}</div>

            <div class="clicks" @click="deleteShoppingCar(item)">
              <img :src="garbage" alt="" />
            </div>
          </div>

          <div class="shopping_no" v-show="SingList.length == 0">
            <div class="shopping_no_img">
              <img :src="shopping_no" alt="">

            </div>
            <div class="shopping_no_text">your cart is empty.please add afew items</div>
          </div>
        </div>
      </div>
      <div class="right">
        <!-- <div class="title">order information</div>
        <div class="pay">
          <div class="pay1">
            <img @click="clickPay(0)" :src="pay[0]" alt=""/>
            <img class="grop" :src="grop" alt=""/>
          </div>
          <div class="pay2" :class="borderss">
            <img @click="clickPay(1)" :src="pay[1]" alt="" />
            <img class="grop" :src="grop" alt="" />
          </div>
        </div> -->
        <div class="orders"> Order Information</div>
        <div class="tipss" :style="{ color: coloss }">{{ this.tips }}</div>
        <div class="promotion">


          <input v-model="couponCode" :disabled="coupon != null" autocomplete="new-password" type="text"
            placeholder="Promotion code" @focus="checkLogin" />
          <button @click="apply"
            :style="{ backgroundColor: coupon != null ? '#FF4744' : '#373ACB' }">{{ coupon != null ? 'delete' : 'apply' }}</button>
        </div>
        <div class="Selected">
          <div>selected</div>
          <div class="selectnumber">{{ selected }}</div>
          <div style="margin-left: 0.3rem;">Total</div>
          <div class="prices" :class="coupon != null ? 'cut' : ''">${{ priceShow }}</div>
        </div>
        <div class="Selected" v-if="coupon != null">
          <div>After Discount</div>
          <div class="prices">${{ price }}</div>
        </div>
        <div class="buttons">
          <!-- <div class="alls" @click="click_all">
            <img v-show="!all" :src="Singl[0]" alt="" /><img v-show="all" :src="Singl[1]" alt="" />
          </div>
          <div class="texts">select all</div> -->
          <!--          <div id="paypal-button-container" class="button"-->
          <!--               @click="settlement">settlement</div>-->

          <!-- <div id="paypal-button-container"></div> -->
          <div id="paypalCheckoutContainer"></div>

        </div>
      </div>

    </div>
    <Bottoms class="bottoms" />
  </div>
</template>
<script>
import Bottoms from "@/components/BottomNavigation/index";
import Delete from "@/components/delete"
import { loadScript } from "@paypal/paypal-js";



// import If from "./ifarms"
export default {
  name: "Shoppingcar",
  components: {
    Bottoms,
    Delete,
    // If
  },
  data() {
    return {
      tips: "",
      coloss: "red",
      // shoppingCar: require("@/assets/img/shoppingCar"),
      shopping_no: require("@/assets/img/shopping_no.png"),
      blankImage: require("@/assets/img/blank.svg"),

      //点击购物车减号触发的:classs
      reduces: "reduces",
      lus: 0,
      ifarm: true,
      options_1: [
        // {
        //   value: '1',
        //   label: 'Personal license'
        // },
        {
          value: '4',
          label: 'Commercial License'
        },
        {
          value: '5',
          label: 'Commercial Unlimited Licese'
        }
      ],
      options_2: [{
        value: '3',
        label: "Exclusive License"
      }
      ],
      curProduct: null,
      cover: "",
      value: '',
      Solt_Message_Delete: false,
      couponCode: '',
      coupon: null,
      ids: "",
      idss: "",
      idlist: [],
      borderss: "payx",
      borders: "",
      all: false,
      priceShow: "----",
      price: "----",
      selected: 0,
      Sing: [false],
      grop: require("@/assets/img/grop.png"),
      Singl: [require("@/assets/img/a.png"), require("@/assets/img/b.png")], //单选，未选择和已选择,
      SingList: [],
      garbage: require("@/assets/img/garbage.png"),
      pay: [require("@/assets/img/visa.png"), require("@/assets/img/non.png")],
      imgTypes: "",
      idsp: "",
    };
  },
  watch: {

  },
  methods: {
    checkLogin() {
      const vm = this;
      if (!localStorage.getItem("user")) {
        vm.$store.state.login = true;
        vm.$store.state.logins = true
        vm.$store.state.ForgetPwd = false
        vm.$store.state.Sign = false
        return false;
      }
      return true;
    },
    errimage(e) {
      e.target.src = this.blankImage;
    },
    changesb() {
    },
    // 点击购物车输入数量的input触发的onchange事件
    numbers(oo) {
      // if(!Number.isFinite(oo.productNum)){
      //   oo.productNum=1;
      // }
      this.update(oo);


      // this.SingList[indexs].orderAmount = this.SingList[indexs].price * this.SingList[indexs].productNum;
      // let s = 0;
      // for (let index = 0; index < this.SingList.length; index++) {
      //   s += this.SingList[index].orderAmount;
      // }
      // this.price = s
    },
    //点击购物车增加按钮
    increase(oo) {
      oo.productNum++
      this.update(oo);
      // this.reduces = ""
    },
    // 点击购物车数量减少按钮
    reduce(oo) {
      if (oo.productNum <= 1)
        return;
      oo.productNum--
      this.update(oo);

      // if (this.SingList[indexs].productNum > 1) {
      //   this.selected--
      //   this.SingList[indexs].productNum--
      //   this.SingList[indexs].orderAmount = this.SingList[indexs].price * this.SingList[indexs].productNum;
      //   let s = 0;
      //   for (let index = 0; index < this.SingList.length; index++) {
      //     s += this.SingList[index].orderAmount;
      //   }
      //   this.price = s
      // } else {
      //   this.reduces = "reduces"
      // }
    },
    changes(oo) {
      this.update(oo);
    },
    details(a, b) {
      // localStorage.productId = a;
      // localStorage.imgSn = b;
      // this.$router.push("/details");

      const routeUrl = this.$router.resolve({
        path: "/detail/" + a,
      });

      window.open(routeUrl.href, "_blank");
    },
    apply() {
      const vm = this;
      if (!vm.checkLogin()) {
        return;
      }
      if (vm.coupon != null) {
        vm.couponCode = '';
        vm.coupon = null;
        vm.price = vm.priceShow;
      } else {
        if (!vm.couponCode) {
          return vm.$message("Please enter the promo code");
        }
        vm.rq({
          url: "/api/cart/setCoupon",
          method: "post",
          param: {
            couponCode: this.couponCode,
          },
          onError: function () {
          },
          vm,
        }).then((res) => {
          vm.tips = res.desc
          if (res.code == 200) {
            vm.coupon = res.data;
            vm.price = Math.round(vm.priceShow * vm.coupon.rate * 100) / 100;


            vm.coloss = "#00FF94"

          } else {
            vm.coloss = "red"

          }
        });
      }
    },
    // Payer(order) {
    //   let vm = this;
    //
    //   this.rq({
    //     url: `/api/shop/paypalSend/${order}`,
    //     method: "get",
    //     param: {},
    //     onError: function () {
    //     },
    //     vm,
    //   }).then((res) => {
    //     if (res.code == 200) {
    //
    //       window.open(res.data)
    //     } else {
    //
    //       //
    //       this.$store.state.blank = "orderForm";
    //       // this.ifarm=true;
    //       this.$router.push("/blank");
    //     }
    //   });
    // },
    //   点击购买
    // settlement() {
    //   let vm = this;
    //   let s = "";
    //
    //   for (let index = 0; index < this.idlist.length; index++) {
    //     if (index == this.idlist.length - 1) {
    //       s
    //       s += this.SingList[this.idlist[index]].orderId;
    //     } else {
    //       s += this.SingList[this.idlist[index]].orderId + ";";
    //     }
    //   }
    //
    //   let prices = this.price;
    //
    //   this.rq({
    //     url: "/api/shop/createOrderFromCart",
    //     method: "post",
    //     param: {
    //       type: 1,
    //       goodsId: "0",
    //       goodsName: "",
    //       goodsCode: "",
    //       payWay: "ali",
    //       payMoney: prices,
    //       sumMoney: this.price,
    //       ids: s,
    //     },
    //     onError: function () {
    //     },
    //     vm,
    //   }).then((res) => {
    //     if (res.code == 200) {
    //       vm.Payer(res.data.orderNo);
    //       this.$message("购买成功")
    //       vm.selectAll();
    //     } else {
    //       //
    //       this.$message(res.desc);
    //     }
    //   });
    // },
    // 点击支付方式 a=0 visa  a=b non
    clickPay(a) {
      if (a) {
        // non
        this.borderss = "payx";
        this.borders = "";
      } else {
        this.borderss = "";
        this.borders = "payx";
        // document.
        // visa
      }
    },
    // 
    closeb() {
      this.Solt_Message_Delete = false;
    },
    Confirms() {
      const vm = this;

      if (vm.curProduct) {
        if (vm.curProduct.orderId) {
          this.rq({
            url: "/api/cart/delete",
            method: "post",
            param: {
              ids: vm.curProduct.orderId,
            },
            onError: function () {
            },
            vm,
          }).then((res) => {
            if (res.code == 200) {

              let newlist = vm.SingList.filter(item => item.orderId != vm.curProduct.orderId);

              // console.log(newlist)
              vm.SingList = newlist;

              // 删除行 vm.SingList.filter()

              //计算金额
              vm.click_all()

              // vm.selectAll();
              vm.closeb();
            } else {
              //
              this.$message(res.desc);
            }
          });
        } else {

          let newlist = vm.SingList.filter(item => item.productId != vm.curProduct.productId);

          // console.log(newlist)
          vm.SingList = newlist;

          localStorage.setItem('sshopping_car', JSON.stringify(vm.SingList));

          // 删除行 vm.SingList.filter()

          //计算金额
          vm.click_all()

          // vm.selectAll();
          vm.closeb();

        }
      }
    },
    update(oo) {
      let vm = this;

      console.log(oo)
      if (oo.orderId) {
        this.rq({
          url: "/api/cart/update",
          method: "post",
          param: {
            orderId: oo.orderId,
            imgType: oo.imgType,
            productNum: oo.productNum,
          },
          onError: function () {
          },
          vm,
        }).then((res) => {
          if (res.code == 200) {

            oo.orderAmount = res.data.orderAmount;

            //计算金额
            vm.click_all()

          } else {
            //
            this.$message(res.desc);
          }
        });

      } else {
        this.rq({
          url: "/api/cart/info",
          method: "post",
          param: {
            productId: oo.productId,
            imgType: oo.imgType,
            productNum: oo.productNum,
          },
          onError: function () {
          },
          vm,
        }).then((res) => {
          if (res.code == 200) {
            oo.orderAmount = res.data.orderAmount;

            // let newlist = vm.SingList.filter(item => item.productId != vm.curProduct.productId);
            //
            // // console.log(newlist)
            // vm.SingList = newlist;

            localStorage.setItem('sshopping_car', JSON.stringify(vm.SingList));

            // const i = vm.SingList.find(item => item.orderId == p);

            // i.orderAmount = res.data.orderAmount
            // console.log(vm.SingList);
            // vm.SingList[p].orderAmount = res.data.orderAmount
            // vm.SingList[p].discount = res.data.discount
            // console.log(vm.SingList);
            // vm.SingList = i;
            //计算金额


            vm.click_all()

          } else {
            //
            this.$message(res.desc);
          }
        });

      }

    },
    //   删除购物车
    deleteShoppingCar(oo) {
      this.curProduct = oo;
      // this.cover = id.deleteShoppingCar
      // this.ids = id.orderId
      this.Solt_Message_Delete = true;
    },
    click_all() {
      this.priceShow = 0;

      this.selected = 0;
      // this.idlist = [];
      // console.log(this.SingList,909);
      this.SingList.forEach((item, index) => {
        item.imgType = '' + item.imgType;
        // this.$set(this.SingList[index], "Sing", true);
        // console.log(this.SingList[index].price, this.SingList[index].discount, 900)
        this.priceShow += item.orderAmount;
        this.selected += 1;
        // this.idlist.push(index);
      });
      if (this.coupon != null) {
        this.price = Math.round(this.priceShow * this.coupon.rate * 100) / 100;
      } else {
        this.price = this.priceShow;
      }

    },
    selectAll2(list) {
      const vm = this;
      this.rq({
        url: "/api/cart/infoAll",
        method: "post",
        param: { orderList: list },
        onError: function () {
        },
        vm,
      }).then((res) => {
        if (res.code == 200) {
          vm.SingList = res.data;
          vm.click_all();
        } else if (res.code == 650) {
          localStorage.setItem('sshopping_car', JSON.stringify([]));
          location.reload();
        } else {
          //
          this.$message(res.desc);
        }
      });
    },
    selectAll() {
      let vm = this;
      this.rq({
        url: "/api/cart/selectAll",
        method: "post",
        param: {},
        onError: function () {
        },
        vm,
      }).then((res) => {
        if (res.code == 200) {
          if (res.user && res.user.id) {

            vm.$store.state.login_bool = true;
            vm.$store.state.username.title = res.user.userName;
            vm.$store.state.username.email = res.user.email;
            vm.$store.state.username.icon_text = res.user.companyName.split("")[0].toUpperCase();

            // for (let index = 0; index < res.data.length; index++) {
            //   res.data[index].Sing = false;
            //
            //   res.data[index].productImg =
            //       vm.$imgServer + res.data[index].productImg;
            // }
            vm.SingList = res.data;
          } else {
            vm.$store.state.login_bool = false;
            if (localStorage.getItem('sshopping_car')) {
              let list = JSON.parse(localStorage.getItem('sshopping_car'));
              if (list.length > 0) {
                vm.selectAll2(list);
                return;
              }
            }
          }
          // console.log("ddd")
          vm.click_all();

          // console.log(vm.SingList, 999);
          // console.log(this.SingList, 1111);
        } else {
          //
          this.$message(res.desc);
        }
      });
    },
    // sings(a, b) {
    //   if (this.price == "----") {
    //     this.price = 0;
    //   }
    //
    //   this.$set(this.SingList[a], "Sing", !this.SingList[a].Sing);
    //   //   计算价格
    //
    //   if (this.SingList[a].Sing) {
    //     this.price += b;
    //     this.selected += 1;
    //
    //     this.idlist.push(a);
    //     if (this.idlist.length == this.SingList.length) {
    //       this.all = true;
    //     }
    //   } else {
    //     this.all = false;
    //     this.price -= b;
    //     this.selected -= 1;
    //     this.idlist.remove(a);
    //   }
    //   if (this.price == 0) {
    //     this.price = "----";
    //   }
    // },
  },
  created() {

    // if (!localStorage.user) {
    //   this.price = 0;
    //   let s = JSON.parse(localStorage.sshopping_car)
    //   for (let index = 0; index < s.length; index++) {
    //     s[index].detailed.Sing = false;
    //     s[index].detailed.productImg =
    //         this.$imgServer + s[index].detailed.cover;
    //     s[index].detailed.imgType = ''+s[index].imgType;
    //     console.log(s[index].detailed);
    //     s[index] = s[index].detailed;
    //     s[index].orderAmount = s[index].price
    //     console.log(s, 909);
    //     this.selected += s[index].productNum
    //     this.price += s[index].productNum * s[index].orderAmount
    //   }
    //   console.log(s);
    //   this.SingList = s;
    //
    // } else {
    //   this.selectAll();
    // }

    // 判断当前路由是否是收藏夹，如果是就让星星点亮，否则的话就让星星熄灭

    // if (this.$route.path === "/shoppingcar") {
    //   this.$store.state.svgg = true;
    //   this.$store.state.svgs = false;
    // } else {
    //   this.$store.state.svgg = false;
    //   this.$store.state.svgs = false;
    // }

  },
  mounted() {
    this.$store.state.Navigation_in = "Navigation_up";
    let vm = this;

    vm.selectAll();

    // "intent": "authorize"

    loadScript({
      "client-id": 'AdS-RVOEHbbe6DS-HC1m3BnmkKhyeHEvsALHOKX3m8XJdshPh-jY1uhhoAHvXNGYX4-dKFyBJ5z-u-kQ',
      "currency": 'USD',
      "intent": "capture",
      // "locale":"en_US",
    }).then((paypal) => {
      paypal.Buttons({
        // env: "sandbox",
        style: {
          layout: 'vertical', // horizontal | vertical
          size: 'responsive', // medium | large | responsive
          shape: 'pill', // pill | rect
          color: 'gold', // gold | blue | silver | black,
          fundingicons: false, // true | false,
          tagline: false, // true | false,
          // paypal:false
          //checkout
          //buynow
          //pay

        },
        // Sets up the transaction when a payment button is clicked
        createOrder: (data, actions) => {
          console.log(data, actions)
          return new Promise((resolve, reject) => {

            if (!localStorage.user) {

              vm.$store.state.login = true;
              vm.$store.state.logins = true
              vm.$store.state.ForgetPwd = false
              vm.$store.state.Sign = false

              return reject()
            }

            vm.rq({
              url: "/api/shop/paypalSend",
              method: "post",
              param: {
                payMoney: vm.price,
                couponCode: vm.coupon != null ? vm.coupon.code : '',

              },
              onError: function (e) {
                // console.log(e)
                reject("Server exception!")

              },
              vm,
            }).then((res) => {
              // console.log(res);
              if (res.code == 200) {
                resolve(res.data.id);
                // reject("12673617826387")
                // return res.data.id;

                //
              } else {

                if (res.desc == 'need login') {

                  vm.$store.state.login = true;
                  vm.$store.state.logins = true
                  vm.$store.state.ForgetPwd = false
                  vm.$store.state.Sign = false

                } else {
                  vm.$message(res.desc)
                }

                reject(res.desc)
                //
                //
              }
            })
            // .catch(error => console.log(">>>>>>>>"+error));

            // $.ajax({
            //   type: 'POST',
            //   url: 'api/createOrder',
            //   data: serialize(document.getElementById("camera_form")),
            //   success: function (response) {
            //     return (response)
            //   },
            //   error: function (error) {
            //     reject(error)
            //   },
            // }).then(function (response) {

            //   console.log('Order ID: ' + response.id);

            //   resolve(response.id);
            // });
          });

        },
        // Finalize the transaction after payer approval
        onApprove: (data, actions) => {
          console.log(data, actions)


          // vm.selectAll();
          return new Promise((resolve, reject) => {
            vm.rq({
              url: "/api/shop/paypalComplete",
              method: "post",
              param: {
                thirdNo: data.orderID,
              },
              onError: function (e) {
                // console.log(e)
                reject("fffff")

              },
              vm,
            }).then((res) => {
              if (res.code == 200) {

                fbq('track', 'Purchase', { currency: "USD", value: vm.price });

                let items = [];
                vm.SingList.forEach(item => {
                  items.push({
                    item_id: item.productId,
                    item_name: item.imgSn,
                    price: item.orderAmount,
                    currency: 'USD',
                    quantity: 1
                  })
                });

                gtag('event', 'purchase', {
                  currency: 'USD',
                  items: items,
                  transaction_id: new Date().getTime(),
                  value: vm.price,
                })

                resolve(res)
              } else {
                reject(res.desc)
              }
            }).then((res) => {
              vm.selectAll();
            });

          })
          // .catch(error => console.log(error));
          // vm.selectAll();
          //  return actions.order.capture().then(function (orderData) {
          // // Successful capture! For dev/demo purposes:
          // console.log('Capture result', orderData, JSON.stringify(orderData, null, 2));
          // const transaction = orderData.purchase_units[0].payments.captures[0];
          // alert(`Transaction ${transaction.status}: ${transaction.id}n\nSee console for all available details`);
          // When ready to go live, remove the alert and show a success message within this page. For example:
          // const element = document.getElementById('paypal-button-container');
          // element.innerHTML = '<h3>Thank you for your payment!</h3>';
          // Or go to another URL:  actions.redirect('thank_you.html');
          // });
        },
        onClick: function (e) {
          // console.log(e)
        },
        onError: (e) => {
          // console.log(e)

          // if(e=='need login'){
          //
          //   vm.$store.state.login = true;
          //   vm.$store.state.logins = true
          //   vm.$store.state.ForgetPwd = false
          //   vm.$store.state.Sign = false
          //
          // }else{
          //   vm.$message(e)
          // }
        }
      }).render('#paypalCheckoutContainer');
    });
  },
};
</script>
<style lang="less" scoped>
.root {
  width: 100%;
  min-height: 9.02rem;
  background: #f7f9fd;
  margin-top: 0.3rem;
  display: flex;

  .content {
    margin-left: 1.73rem;
    // padding-top: 0.59rem;
    width: 10.96rem;
    padding-bottom: 3.8rem;

    .title {
      font-family: "PingFang SC";
      font-style: normal;
      font-weight: 700;
      font-size: 0.16rem;
      line-height: 22px;
      display: table;

      //justify-content: space-between;
      box-sizing: border-box;
      padding-left: 0.2rem;
      padding-right: 0.2rem;

      >div {
        display: table-cell;
        white-space: pre;
        width: 2.1rem;
        text-align: left;
      }

      .title_text_3 {
        width: 2rem;
        text-align: center;

      }

      .title_text_1 {
        width: 1.7rem;
      }

      .title_text_7 {
        position: absolute;
      }

      .title_text_6 {
        width: 2rem;
        text-align: center;
      }

      .title_text_4 {
        width: 1.5rem;
      }

      .title_text_5 {
        width: 2.6rem;
      }

      .title_text_2 {
        width: 4rem;
      }
    }

    .contents {
      width: 100%;

      .shopping_no {

        .shopping_no_img {
          img {
            width: 2.37rem;
            height: 2.2562rem;
            transform: translateX(-50%);
            margin-left: 50%;
            margin-top: 2.03rem;
          }

        }

        .shopping_no_text {
          width: 100%;
          text-align: center;
        }
      }

      .list {

        border-radius: 0.14rem;
        position: relative;
        background: #fff;
        width: 100%;
        margin-top: 0.16rem;
        height: 1.8rem;
        padding-top: 0.2rem;
        padding-bottom: 0.2rem;
        box-sizing: border-box;
        display: table;
        //justify-content: space-between;
        box-sizing: border-box;
        padding-left: 0.2rem;
        padding-right: 0.2rem;

        >div {
          display: table-cell;
          width: 2.1rem;
          text-align: left;
          vertical-align: top;
        }

        .imgs {
          width: 1.7rem;

          img {
            height: 1.4rem;
            object-fit: cover;
            width: 1.4rem;
          }
        }

        .name {
          width: 4rem;
          font-family: "PingFang SC";
          line-height: 0.32rem;
          // line-height: 1.4rem;
          font-style: normal;
          font-weight: 700;
          font-size: 0.14rem;

          >div {
            height: 0.3rem;
            line-height: 0.3rem;
            padding-left: 0.05rem;
          }
        }

        .format {
          font-family: "PingFang SC";
          width: 2rem;

          height: 1.4rem;
          line-height: 1.4rem;
          font-style: normal;
          font-weight: 700;
          font-size: 0.14rem;
          text-align: center;


          .inputs {
            width: 0.58rem;
            height: 0.36rem;
            display: inline-block;
            padding-left: 0.09rem;
            padding-right: 0.09rem;

            input {
              width: 100%;
              height: 100%;
              border-radius: 0.08rem;
              border: 1px solid #ccc;
              outline-color: #000;
              text-align: center;

            }
          }

          .btns {
            display: inline-block;
            box-sizing: content-box;
            width: 0.2rem;
            height: 0.2rem;
            border: 0.015rem solid #707070;
            line-height: 0.2rem;
            text-align: center;
            border-radius: 0.04rem;
          }

          .btns:hover {
            cursor: pointer;
            background: #d7d8f4;
            box-shadow: 0 0 0 0.02rem #d7d8f4;
          }

          .reduces:hover {
            cursor: not-allowed;
            background: #d7d8f4;
            box-shadow: 0 0 0 0.02rem #d7d8f4;
            border-color: #fff;
            color: #fff;
          }

        }

        .size {
          width: 2.6rem;
        }

        .Exclusive {
          width: 1.5rem;
        }

        .prie {
          width: 2rem;
          font-weight: 700;
          font-size: 0.22rem;
        }

        .clicks {
          text-align: center;
          position: absolute;
          // background: red;
          //line-height: 1.6rem;
          top: 0.72rem;
          right: 0.4rem;
          width: 0.2rem;
          cursor: pointer;

        }

        .clicks:hover {
          opacity: 0.8;
        }
      }
    }
  }

  .right {
    position: relative;
    width: 4.61rem;
    height: 5.54rem;
    background: #fff;
    margin-top: 0.39rem;
    border-radius: 0.14rem;
    margin-left: 0.17rem;
    padding-top: 0.24rem;
    padding-left: 0.24rem;
    padding-bottom: 0.4rem;
    padding-right: 0.2rem;
    box-sizing: border-box;

    .title {
      font-family: "PingFang SC";
      font-style: normal;
      font-weight: 700;
      font-size: 0.16rem;
    }

    .pay {
      width: 100%;
      text-align: center;
      display: flex;
      margin-top: 0.16rem;
      justify-content: space-around;

      .pay1 {
        position: relative;


        height: 0.7rem;

        .grop {
          position: absolute;
          right: 0rem;
          bottom: -0rem;
          display: none;
        }
      }

      .payx {
        img {
          background: #ebebff;
          border-radius: 0.08rem;
        }

        .grop {
          display: block !important;
        }
      }

      .pay2 {
        position: relative;


        height: 0.7rem;

        .grop {
          position: absolute;
          right: -0rem;
          bottom: -0rem;
          display: none;
        }
      }
    }

    .promotion {
      font-size: 0.14rem;
      // margin-top: 0.9rem;
      display: flex;
      padding-bottom: 0.2rem;
      border-bottom: 2px dashed #f1f1f1;

      ::-webkit-input-placeholder {
        /* WebKit browsers */
        color: #c4c4c4;
      }

      input {
        background: #f1f1f1;
        width: 3.22rem;
        height: 0.36rem;
        border-radius: 0.18rem;
        padding-left: 0.18rem;
        font-size: 0.14rem;
        border: 1px solid #f1f1f1;
      }

      button {
        margin-left: 0.05rem;
        width: 0.84rem;
        height: 0.34rem;
        background: #373abc;
        border-radius: 0.28rem;
        border: none;
        color: #fff;
        font-size: 0.14rem;
        cursor: pointer;
      }

      button:hover {
        opacity: 0.8;
      }
    }

    .Selected {
      width: 100%;
      text-align: right;
      font-family: "PingFang SC";
      font-style: normal;
      font-weight: 400;
      font-size: 0.14rem;
      margin-top: 0.29rem;

      .selectnumber {
        margin-left: 0.16rem;
        margin-right: 0.24rem;
        color: #000;
        font-size: 0.22rem;
      }

      .prices {
        color: #000;
        font-size: 0.22rem;
        margin-left: 0.16rem;
      }

      .prices.cut {
        color: #CCCCCC;
        text-decoration-line: line-through;
      }

      div {
        line-height: 0.22rem;
        height: 0.22rem;
        display: inline-block;
      }
    }

    .buttons {
      //margin-top: 1.465rem;
      width: 4.13rem;
      font-size: 0.14rem;
      // display: flex;
      height: 0.36rem;
      line-height: 0.36rem;
      position: absolute;
      bottom: 1.8rem;
      justify-content: flex-end;

      .alls {
        padding-top: 0.05rem;

        img {
          margin-top: 0px;
        }
      }

      .texts {
        margin-left: 0.13rem;
        font-family: "PingFang SC";
        font-style: normal;
        font-weight: 700;
        font-size: 0.22rem;
      }

      .button {
        width: 1.14rem;
        height: 0.36rem;
        background: #373acb;
        text-align: center;
        line-height: 0.36rem;
        color: #fff;
        font-family: "PingFang SC";
        font-style: normal;
        font-weight: 700;
        font-size: 0.16rem;
        border-radius: 0.18rem;
        position: absolute;
        right: 0rem;
      }
    }
  }
}

/deep/ .optionsb {
  //top: rem !important;
  //min-width: 2.32rem !important;
  border-radius: 0.08rem !important;

  .el-select-dropdown__item .el-select-dropdown__item {

    font-family: 'PingFang SC';
    font-style: normal;
    //font-weight: 400;
    color: #222222;
  }

  .el-select-dropdown__item:last-child {
    margin-bottom: 0rem !important;
  }
}

.bottoms {
  margin-top: 0rem !important;
}

/deep/ .is-focus {
  input {
    border-color: #000 !important;
  }

}


/deep/ .el-select-dropdown__item {
  margin-bottom: 0.08rem !important;
  font-size: 0.14rem;
  font-weight: 700;
}

/deep/ .el-select-dropdown__item.selected {
  color: #373acb;

}

// /deep/ .el-select-dropdown__item.selected:hover {

// background-color: #F5F7FA !important;
// }
// /deep/ .el-select-dropdown__item.hover,
// .el-select-dropdown__item:hover {
//   background-color: none !important;
// }

/deep/ .el-input__inner {
  font-size: 0.14rem;
  font-weight: 700;
  border-radius: 0.08rem;
  border-color: #ccc;
  height: 0.44rem;
  line-height: 0.44rem;
  padding: 0 0.12rem;
}

/deep/ .el-input__icon {
  line-height: 0.44rem;
}

/deep/ .el-input__inner:focus {
  border-color: #000 !important;
}

/deep/ .el-input__inner::-webkit-input-placeholder {
  color: #222222 !important;
}

.orders {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 0.16rem;
  color: #222222;
  padding-bottom: 0.16rem;
}

.tipss {
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 400;
  font-size: 0.14rem;
  height: 0.5rem;
  line-height: 0.5rem;
  text-align: center;
}
</style>
