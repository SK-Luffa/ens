<template>
  <div class="root">
    <div class="title">
      <div class="name">Add Payment Method</div>
      <div class="add" @click="add">+Add</div>
    </div>
    <div class="contentList">
      <div class="content_list">
        <div class="bodys">
          <div class="crad">Credit Card</div>
          <div class="number">***************7966</div>
        </div>
        <div class="bottom">
          <div class="date">Date</div>
          <div class="datetime">
            <div class="left">12/26</div>
            <div class="right">
              <img v-if="card == 'visa'" :src="card_list[0]" alt="" />
              <img v-if="card == 'buluecrad'" :src="card_list[1]" alt="" />
              <img v-if="card == 'Mastercard'" :src="card_list[2]" alt="" />
            </div>
          </div>
        </div>
      </div>

      <div class="content_list adds">
        <div class="imgs">
          <img :src="card_list[0]" alt="" />
          <img :src="card_list[1]" alt="" />
          <img :src="card_list[2]" alt="" />
        </div>
        <div class="contents">Credit Card</div>
        <div class="btn" @click="add">Add a credit card</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Method",
  data() {
    return {
      card: "visa",
      card_list: [
        require("@/assets/img/visas.png"),
        require("@/assets/img/bluecrad.png"),
        require("@/assets/img/Mastercard.png"),
      ],
    };
  },
  methods: {
      add(){
          this.$store.state.mask="crad"
      }
  },
  created() {},
  mounted() {},
};
</script>
<style lang="less" scoped>
.root {
  width: 100%;
  height: 6.3rem;
  background: #fff;
  border-radius: 0.15rem;
  margin-top: 0px;
  display: block;
  padding-left: 0.4rem;
  box-sizing: border-box;

  .title {
    margin-top: 0.08rem;

    display: flex;
    height: 0.68rem;
    width: 100%;
    position: relative;
    .name {
      height: 0.68rem;
      line-height: 0.68rem;

      font-family: "PingFang SC";
      font-style: normal;
      font-weight: 700;
      font-size: 0.14rem;
      color: #222222;
    }
    .add {
      position: absolute;
      right: 0.24rem;
      top: 0.24rem;
      width: 0.51rem;
      height: 0.36rem;
      border-radius: 0.08rem;
      border: 1px solid #373acb;
      line-height: 0.36rem;
      text-align: center;
      font-family: "PingFang SC";
      font-style: normal;
      font-weight: 700;
      font-size: 0.14rem;
      color: #373acb;
    }
  }
  .contentList {
    width: 100%;
    box-sizing: border-box;
    padding-right: 1.48rem;

    .content_list {
      border-radius: 0.08rem;
      border: 1px dashed #c4c4c4;
      display: inline-block;
      width: 3.4rem;
      height: 2rem;
      background: red;
      margin-right: 0.16rem;
      overflow: hidden;
      font-family: "PingFang SC";
      font-style: normal;
      font-weight: 400;
      font-size: 0.12rem;

      .bodys {
        box-sizing: border-box;
        padding-left: 0.3rem;
        padding-right: 0.23rem;
        width: 100%;
        height: 1.4rem;
        background: beige !important;
        padding-top: 0.3rem;
        color: #222222;
        .number {
          margin-top: 0.33rem;
          font-weight: 700;
          font-size: 0.22rem;
        }
      }
      .bottom {
        box-sizing: border-box;
        padding-left: 0.3rem;
        padding-right: 0.23rem;
        width: 100%;
        height: 0.6rem;
        background: rgba(255, 255, 255, 0.4);
        padding-top: 0.11rem;
        .date {
          font-family: "PingFang SC";
          font-style: normal;
          font-weight: 400;
          font-size: 0.12rem;
        }
        .datetime {
          font-family: "PingFang SC";
          font-style: normal;
          font-weight: 700;
          font-size: 0.14rem;
          color: #222222;
          position: relative;
          .right {
            position: absolute;
            right: 0.3rem;
            height: 100%;
            width: 0.3rem;

            top: 0px;
          }
        }
      }
    }
  }
  .adds {
    background: #fff !important;
    .imgs {
      text-align: center;
      box-sizing: border-box;
      padding-top: 0.6rem;
      img + img {
        margin-left: 0.09rem;
      }
    }
    .contents {
      text-align: center;
      font-family: "PingFang SC";
      font-style: normal;
      font-weight: 400;
      font-size: 0.12rem;

      color: #000000;
      text-align: center;
    }
    .btn {
        margin-top: 0.32rem;
      margin-left: 50%;
      transform: translateX(-50%);
      width: 1.3rem;
      height: 0.36rem;
      border-radius: 0.08rem;
      border: 1px solid #c4c4c4;
      text-align: center;
      line-height: 0.36rem;
      font-family: "PingFang SC";
      font-style: normal;
      font-weight: 400;
      font-size: 0.14rem;
      color: #222222;
    }
  }
}
</style>
