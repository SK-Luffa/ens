<template>
  <div class="root">
    <div class="content_1">
      <div class="con_1">
        <div class="title">BILL FROM:</div>
        <div>Patternbuy Limited
        </div>
        <div>Room 06,13A/F,South Tower, World Finance Centre harbour city,17 canton road,tsim sha tsui</div>
        <div>Hong Kong, HK, 999077</div>
        <div>Hong Kong SAR</div>
        <div>contact@patternbuy.com</div>
      </div>
      <div class="con_2">
        <img :src="logo" alt="">
      </div>
    </div>
    <div class="content_1 conb">
      <div class="con_1">
        <div class="title">BILL TO:</div>
        <div>customer's name
        </div>
        <div>customer's address(no need)</div>
        <div>city(no need), AL, zip(no need)</div>
        <div>United States</div>
        <div>patternbuy@gmail.com</div>
      </div>
      <div class="con_2 ">
        <div class="title"><span> INVOICE #</span><span class="span2"> 01</span></div>
        <div class="title"><span> INVOICE DATE</span><span class="span2">2022-08-16</span>
        </div>
        <div class="title lists"><span>AMOUNT DUE </span><span>$150.00</span></div>
      </div>
    </div>
    <div class="content_2">
      <div class="title">
        <div>
          <span>Item</span><span>Description </span>
        </div>
        <div>
          <span>Description </span><span>Unit Cost</span><span>Line Total</span>
        </div>
      </div>
      <div class="title titlex">
        <div>
          <span>Item</span><span>Description </span>
        </div>
        <div>
          <span>Description </span><span>Unit Cost</span><span>Line Total</span>
        </div>
      </div>
    </div>
    <div class="content_1 conb conc">
      <div class="con_1">
        <!-- <div class="title">BILL TO:</div>
        <div>customer's name
        </div>
        <div>customer's address(no need)</div>
        <div>city(no need), AL, zip(no need)</div>
        <div>United States</div>
        <div>patternbuy@gmail.com</div> -->
      </div>
      <div class="con_2 ">
        <div class="title"><span> INVOICE #</span><span class="span2"> 01</span></div>
        <div class="title"><span> INVOICE DATE</span><span class="span2">2022-08-16</span>
        </div>
        <div class="title lists"><span>AMOUNT DUE </span><span>$150.00</span></div>
      </div>
    </div>
    <div class="bottoms">
      <div><img :src="logo" alt=""></img></div>
      <div>Powered by Shop</div>
      <div>www.shopify.com</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'APP',
  data() {
    return {
      logo: require("@/assets/img/login.svg")
    }
  },
  methods: {},
  created() {
  },
  mounted() {
  },
}
</script>
<style lang="less" scoped>
.root {

  height: 100%;
  margin-top: 0.67rem;
  padding-left: 2rem;
  padding-right: 2rem;
  // background: red;

  .content_1 {
    width: 100%;
    display: flex;

    padding-top: 0.4rem;
    justify-content: space-between;
    border-bottom: 1px solid #000;
    padding-bottom: 1rem;

    .con_1 {
      width: 8rem;

      .title {
        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 500;
        font-size: 0.2rem;
        line-height: 0.28rem;
        padding-bottom: 0.2rem;

      }
    }

    .con_2 {
      width: 3rem;
      height: 3rem;


      .title {
        line-height: 0.3rem;
        display: flex;
        justify-content: space-between;
        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 500;
        font-size: 0.2rem;
        // line-height: 0.28rem;
        margin-bottom: 0.2rem;
        padding-left: 0.2rem;
        padding-right: 0.2rem;

        .span2 {
          font-family: 'PingFang SC';
          font-style: normal;
          font-weight: 400;
          font-size: 0.14rem;
          line-height: 0.3rem;
        }
      }

      .lists {
        background: #c9c8c8;
        line-height: 0.3rem;
      }

      img {
        width: 100%;
        height: 100%;
      }
    }
  }

  .bottoms {
    height: 2rem;
    padding-top: 0.2rem;

    div {
      text-align: center;
    }
  }

  .conb {
    border: none;
  }

  .conc {
    padding-bottom: 3rem;
    border-bottom: 1px solid #000;
  }

  .content_2 {
    width: 100%;


    padding-top: 0.4rem;


    padding-left: 0.1rem;
    padding-right: 0.1rem;

    .title {
      display: flex;
      justify-content: space-between;
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 500;
      font-size: 0.2rem;
      line-height: 0.28rem;
      padding-left: 0.2rem;
      background: #c9c8c8;

      span {
        display: inline-block;
        width: 1.55rem;
        padding-right: 0.6rem;
      }
    }

    .titlex {
      background: rgba(0, 0, 0, 0);
      padding-bottom: 0.4rem;
      border-bottom: 1px solid #000;

      span {
        display: inline-block;
        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 400;
        font-size: 0.14rem;
        line-height: 0.3rem;
        width: 1.55rem;
      }
    }
  }
}
</style>
