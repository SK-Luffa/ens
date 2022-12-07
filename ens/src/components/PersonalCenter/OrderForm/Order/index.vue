<template>
  <div>

    <div class="titlebs">
      <div class="searchs">
        <div class="orders"> Search order</div>
        <input class="searchsb" type="text" v-model="orders" @keydown="downs">
      </div>
      <div class="searchsk">
        <div class="button" :class="btnsk[0]" @click="btnclicks(1)">Last 7 Days</div>
        <div class="button" :class="btnsk[1]" @click="btnclicks(2)">Last 30 Days</div>
        <div class="button" :class="btnsk[2]" @click="btnclicks(3)"> half a year</div>
        <el-date-picker v-model="value1" @change="dates" type="daterange" range-separator="—"
                        start-placeholder="Starting Time" end-placeholder="End Time "
                        value-format="yyyy-MM-dd HH:mm:ss">
        </el-date-picker>
      </div>
    </div>
    <div class="list_template busp">
      <div class="title">
        <div class="divx busx_1">Pattern List</div>
        <div class="divx busx_2">Information and authorization</div>

        <div class="divx busx_4">Seat</div>
        <div class="divx busx_5">price</div>
        <div class="divx busx_6">File download</div>
        <!-- <div class="divx busx_7">DownLoad</div> -->
      </div>
    </div>

    <div class="list_template" v-for="(item, index) in datalist" :key="index">
      <div class="title">
        <div class="titles x1">Order Time {{ item.dateCreate }}</div>
        <div class="titles x2">ORDER NUMBER {{ item.orderNo }}</div>
        <div class="titles  x3">
          <div class="export" @click="exports(item)">{{item.invoice?'Download Invoice':'Get Invoice'}}</div>

        </div>
        <div class="titles bus">Payment completed</div>
      </div>

      <div class="content" v-for="(items, indexs) in item.orderList" :key="indexs">
        <div class="content_data">
          <div class="img">
            <a @click="details(items.productId, items.imgSn)">
              <img :src="items.productCover" alt="" />
            </a>
          </div>
          <!-- <div class="name">{{ items.productName }}</div> -->
          <div class="price">
            <div class="prices">{{ items.imgSn }}</div>
            <div class="prices">{{ items.format }}</div>
            <div class="prices">{{ items.imgSize }}</div>
            <div class="prices">{{ items.mode }}</div>

          </div>
          <div class="type">{{ items.productNum }}</div>
          <div class="size">${{ items.orderAmount }}</div>
          <div class="timers">
            <div class="timer" @click="downloads(items.productId,items.imgSn)">

              <span> Download File <img :src="download" alt=""> </span>

              <div style="background-color: #DDDEFF;;position: absolute;top:0;left:0;height:0.46rem;opacity: 0.4;"
                   :style="{width:(downId==items.productId?progress:0)+'%'}"></div>
            </div>
          </div>

          <!-- <div class="btn">
            <div v-show="items.orderStatus === '0'">To pay</div>
            <span v-show="items.orderStatus === '1'">Payment completed</span>
            <span v-show="items.orderStatus === '2'">Cancelled</span>
          </div>
          <div class="del">
            <img @click="delets(item.orderNo)" :src="garbage" alt="" />
          </div> -->
        </div>
      </div>
    </div>
    <div class="pagination" v-if="datalist===[]">
      <el-pagination :current-page.sync="pages" :page-size="100" background layout="prev, pager, next" :total="counts"
                     @current-change="pagem">
      </el-pagination>
    </div>
    <invoice-edit ref="invoice" :orderId="orderId" :invoice="invoice"></invoice-edit>
  </div>
</template>
<script>
// import { log } from 'console';
import {sorting_list, download} from "@/utils/util";
import InvoiceEdit from "./InvoiceEdit";

export default {
  name: "Order",
  components: {InvoiceEdit},
  data() {
    return {
      orderId:null,
      invoice:null,
      downId:null,
      progress: 0,
      counts: 0,
      yarns: "",
      btnsk: ['', '', ''],
      orders: "",
      pages: 1,
      datalist: [], //数据源
      download: require("@/assets/img/downLoad.svg"),
      timer: require("@/assets/img/timer.png"),
      garbage: require("@/assets/img/garbage.png"),
      value1: ""
    };
  },

  methods: {
    exports(item) {
      const _this= this;

      // this.invoice = invoice
      // this.orderId = orderId


      if(item.invoice){

        let ele = document.createElement('a');
        ele.setAttribute('href', _this.$imgServer+ item.invoice); //设置下载文件的url地址
        ele.setAttribute('download', item.id + '.pdf');//用于设置下载文件的文件名

        ele.setAttribute("target", "_blank");

        ele.click();

      }else{
       _this.$refs.invoice.show(item);
      }


      // document.body.style.overflow = "hidden"
    },
    downloads(id, imgSn) {
      let vm = this;
      this.rq({
        url: "/api/product/downUrl",
        method: "post",
        param: {
          id: id,
        },
        onError: function () {
        },
        vm,
      }).then((res) => {
        if (res.code == 200) {
          res.data = res.data.replace('http:', 'https:');

          let reg = /\.(\w*?)\?/
          let ext = reg.exec(res.data)[1];

          if('zip'==ext.toLowerCase()){

            let ele = document.createElement('a');
            ele.setAttribute('href', res.data); //设置下载文件的url地址
            ele.setAttribute('download', imgSn + '.' + ext);//用于设置下载文件的文件名

            ele.setAttribute("target", "_self");
            ele.click();

          }else {
            vm.downId=id;
            download(vm, res.data, imgSn + '.' + ext);
          }
          //
        } else {
          //

          this.$message(res.desc);
        }
      });

    },
    downs(e) {
      switch (e.keyCode) {
        case 13:
          this.orderlist();
          return
      }
    },
    details(a, b) {
      // localStorage.productId = a;
      // localStorage.imgSn = b;
      // this.$router.push("/details");

      const routeUrl = this.$router.resolve({
        path: "/detail/"+a,
      });

      window.open(routeUrl.href, "_blank");
    },
    dates(e) {
      console.log(e)
      console.log(this.value1)
      this.orderlist();
    },
    btnclicks(a) {

      switch (a) {
        case 1:
          this.yarns = 7
          this.btnsk = ["cooles", "", ""]
          this
          break;
        case 2:
          this.yarns = 30
          this.btnsk = ["", "cooles", ""]
          break;
        case 3:
          this.yarns = 180
          this.btnsk = ["", "", "cooles"]
          break
      }
      this.orderlist();
    },
    pagem() {
      this.datalist = [];
      this.orderlist();
    },
    // 删除订单
    delets(a) {
      let vm = this;
      this.rq({
        url: "/api/shop/cancelOrder",
        method: "get",
        param: {
          orderNo: a,

        },
        onError: function () {
        },
        vm,
      }).then((res) => {
        if (res.code == 200) {
          this.$message("deleted")
          this.datalist = [];
          vm.orderlist();
          //
        } else {
          //

          this.$message(res.desc);
        }
      });
    },
    //   请求订单列表
    orderlist() {
      let vm = this;

      // let dr=this.value1[1].split(" ")[0]
      // this.value1[1] = this.value1[1].split(" ")[0] + " " + "23:59:59"
      // this.value1 = "[" + this.value1[0] + "," + this.value1[1] + "]"
      // console.log(this.value1);
      let dr=null;
      if(this.value1 && this.value1.length>1){
        dr="[" + this.value1[0] + "," + this.value1[1] + "]";
      }

      this.rq({
        url: "/api/shop/selectPage",
        method: "post",
        param: {
          dayAgo: this.yarns,
          orderNo: this.orders,
          datePayRange:dr,
          type: 1,
          status: "P,Y",
          refund: 0,
          iDisplayStart: this.pages - 1,
          iDisplayLength: 4,

          timer: "",
          codes: "",
        },
        onError: function () {
        },
        vm,
      }).then((res) => {
        if (res.code == 200) {
          vm.counts = res.data.aaData.length
          for (let index = 0; index < res.data.aaData.length; index++) {
            for (let i = 0; i < res.data.aaData[index].orderList.length; i++) {
              res.data.aaData[index].orderList[i].productCover =
                  vm.$imgServer +
                  res.data.aaData[index].orderList[i].productCover;
            }

            res.data.aaData[index].dateCreate = res.data.aaData[index].dateCreate.slice(0, 16)
          }
          vm.datalist = res.data.aaData;
          //
        } else {
          //

          this.$message(res.desc);
        }
      });
    },
  },
  created() {
  },
  mounted() {
    this.orderlist();
  },
};
</script>
<style lang="less" scoped>

.titlebs {
  width: 100%;
  display: flex;
  justify-content: space-between;

  .searchs {
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 400;
    font-size: 0.14rem;
    color: #222222;
    display: flex;
    justify-content: space-between;

    .orders {
      width: 1.2rem;
      height: 0.36rem;
      line-height: 0.36rem;
    }

    .searchsb {
      width: 2.07rem;
      height: 0.36rem;
      padding-left: 0.1rem;
      padding-right: 0.1rem;
      background: #FFFFFF;
      border: 1px solid #D5D5D5;
      border-radius: 18px;
    }
  }

  .searchsk {
    transform: translateY(-0.025rem);
    display: flex;

    .button:active {
      background: #ebebf9;
    }

    .button {
      width: 1.05rem;
      height: 0.32rem;
      text-align: center;
      background: #FFFFFF;
      border: 1px solid #F1F1F1;
      border-radius: 0.16rem;
      margin-right: 0.24rem;
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 400;
      font-size: 0.14rem;
      line-height: 0.32rem;
      color: #A0A3A9;
    }

    .button:hover {
      cursor: pointer;
    }

  }
}

.list_template {
  width: 100%;

  background: #fff;
  margin-top: 0.16rem;
  border-radius: 0.14rem;

  .title {
    display: flex;
    width: 100%;
    justify-content: space-between;

    .titles {
      //width: 25%;
      white-space: nowrap;
      padding-top: 0;
      height: 0.6rem;
      line-height: 0.6rem;
    }

    .x1 {
      padding-left: 0.16rem;
    }

    .x2 {
      //width: 40%;
    }

    .x3 {
      //width: 10%;
    }

    div {
      padding-top: 0.16rem;

    }


    .bus {
      margin-right: 0.24rem;
      margin-right: 0.24rem;

      text-align: right;
      color: #4AECA7;

    }

    .export:hover {
      cursor: pointer;
      opacity: 0.8;
      // background: rgba(5, 5, 5, 0.5);
    }

    .export {
      display: inline-block;
      //transform: translateY(-25%);
      //width: 1.41rem;
      height: 0.36rem;
      color: #373ACB;
      line-height: 0.36rem;
      padding-left: 0.16rem;
      padding-top: 0;
      padding-right: 0.13rem;
      background: #F0F3FA;
      border-radius: 18px;

    }

    .divx {
      width: 20%;
      margin-left: 0rem;
      text-align: left;
      box-sizing: border-box;
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 500;
      font-size: 0.16rem;
      line-height: 0.22rem;
    }

    .busx_1 {
      padding-left: 0.16rem;
      width: 15%;
    }

    .busx_2 {

      width: 30%;
    }

    .busx_4 {

    }

    .busx_5 {

    }

    .busx_6 {
      width: 15%;
      padding-left: 0.4rem;
    }

    .busx_7 {
      width: 2.9rem;
      padding-left: 0.73rem;
    }
  }
}

.busp {
  background: #f7f9fd;
}

.content {
  width: 100%;
  height: 1.72rem;

  border-top: 1px dashed #f1f1f1;
  padding-top: 0.16rem;
  padding-bottom: 0.16rem;
  box-sizing: border-box;

  .content_data {
    display: flex;
    justify-content: space-around;
    width: 100%;

    div {
      width: 20%;
      height: 1.4rem;
      line-height: 1.4rem;
      font-family: "PingFang SC";
      font-style: normal;
      font-weight: 400;
      font-size: 0.14rem;
      color: #222;
      text-align: left;
    }

    .img {
      width: 15%;

      img {

        width: 1.4rem;
        height: 1.4rem;
        margin-left: 0.16rem;
        margin-right: 0.16rem;
      }
    }


    // .name {
    //   width: 1.36rem;
    //   text-align: left;
    // }

    .price {
      width: 30%;
      font-weight: 700;
      font-size: 0.2rem;
      padding-top: 0.25rem;

      .prices {
        width: 100%;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: 0.14rem;
        line-height: 0.17rem;
        height: 0.14rem;
        margin-bottom: 0.12rem;
      }
    }

    .type {
      padding-top: 0.46rem;

      line-height: 0.2rem;


      box-sizing: border-box;
    }

    .size {
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 500;
      font-size: 0.20rem;
      // line-height: 0.28rem;
      text-align: left;
    }

    .timer:active {
      background: #ebebf9;
      opacity: 0.8;
    }

    .timers {
      width: 15%;
      padding-left: 0.2rem;

      .timer {
        cursor: pointer;
        overflow: hidden;
        width: 1.48rem;
        text-align: left;
        margin-top: 0.46rem;

        line-height: 0.2rem;
        box-sizing: border-box;
        position: relative;
        border: 1px solid #373ACB;
        height: 0.36rem;
        padding-top: 0.08rem;
        border-radius: 0.18rem;

        img {
          position: absolute;

          // transform: translateY(%);
          width: 0.2067rem;
          height: 0.2067rem;
        }

        padding-left: 0.14rem;
        padding-right: 0.12rem;
        color: #373abc;
      }
    }


    .btn {
      position: relative;

      div {
        line-height: 0.34rem;
        text-align: center;
        color: #fff;
        width: 0.78rem;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 100%;
        border-radius: 1.8rem;
        height: 0.34rem;
        background: #373abc;
      }

      width: 0.78rem;
    }

    .del {
      margin-left: 0.875rem;
      color: #ff4f44;
      font-size: 0.22rem;

      img {
        width: 0.18rem;
        height: 0.225rem;
      }
    }
  }
}

.pagination {
  box-sizing: border-box;
  padding-left: 8rem;
  padding-top: 0.5rem;
}

/deep/ .el-input__icon {
  display: none;
}

/deep/ .el-input__inner {
  border: none;
  background: none;
  height: 0.31rem;
}

/deep/ .el-range-input {
  // width: 0.113rem;
  height: 0.32rem !important;
  background: #FFFFFF;
  border: 1px solid #D5D5D5;
  border-radius: 0.16rem;
}

/deep/ .el-range-separator {
  transform: translateX(-0.03rem);
}

.cooles {
  background: #DDDEFF !important;
  color: #222 !important;
}

/deep/ .date-picker {
  width: auto;
}
</style>
