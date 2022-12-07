<template>
  <div class="roots" @click="closeb">
    <div class="content" @click.stop="">
      <div class="texts_one">
        <slot name="title"></slot>
        <i @click.stop="closeb" class="el-icon-close"></i>
      </div>
      <div class="texts_two">
        <slot name="content"></slot>
      </div>
      <div class="texts_three">
        <button @click.stop="closeb">Cancel</button>
        <button class="btn2" @click.stop="Confirms">Confirm</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'APP',
  data() {
    return {}
  },
  methods: {
    closeb() {

      document.body.style.overflow = "auto"
      this.$emit("closeb")

    },
    Confirms() {
      // debugger;
      this.$emit("Confirms")

    }
  },
  created() {
  },
  mounted() {
  },
}
</script>
<style lang="less" scoped>
.roots {
  position: fixed;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 998;
  top: 0rem;

  .content {
    position: absolute;
    width: 4.21rem;
    height: 2.25rem;
    // padding-bottom: 0.24rem;
    left: 50%;
    top: 50% !important;
    transform: translateX(-50%) translateY(-50%);
    background: #fff;
    border-radius: 0.14rem;

    .texts_one {
      width: 100%;
      display: flex;
      justify-content: center;
      padding-top: 0.24rem;
      font-family: 'PingFang SC';
      font-style: normal;
      font-size: 0.18rem;
      color: #222;

      i {
        position: absolute;
        right: 0.16rem;
        transform: translateY(-0.07rem);
        font-size: 0.22rem;
      }
    }

    .texts_two {
      padding-top: 0.48rem;
      padding-bottom: 0.48rem;
      padding-left: 0.4rem;
      padding-right: 0.4rem;
      text-align: center;
      width: 100%;
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 400;
      font-size: 0.14rem;
      line-height: 0.2rem;

      color: #222222;
    }

    .texts_three {
      width: 100%;
      display: flex;
      justify-content: space-evenly;
      position: absolute;
      bottom: 0.24rem;

      button {
        width: 0.93rem;
        height: 0.36rem;

        border-radius: 0.18rem;
        border: none;
        color: #707070;
        background: #fff;
        border: 0.01rem solid #CCCCCC;
        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 500;
        font-size: 0.16rem;
      }

      .btn2 {
        color: #fff;
        background: #373abc;
        border: none;
      }


      button:hover {

        cursor: pointer;
      }

      button:active {
        border: 0.01rem solid #2C2EA2;
      }


      .btn2:active {
        background: #2C2EA2;

      }

      .btn2:hover {
        background: #5F61D5;
      }
    }
  }
}
</style>
