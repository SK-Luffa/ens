<template>
  <div class="contents" :class="contents_x"
       :style="{ height: consHeight + 'px', margin: '0.7rem ' + mx + 'rem', marginTop: lux + 'rem' }">

    <div class="numberlist" :class="'numberlist' + index" v-for="(item, index) in linelist" :key="index" :style="{
      left: item.left + 'px',
      top: item.top+ 'px',
      width: item.width + 'px',
    }">
      <div class="numberlistb" :style="{ width: item.imgWidth + 'px' }">

        <div v-show="item.isBuyout == 1" class="Exclusive">Exclusive</div>

    <img class="ping" :src="ping" alt="" v-if="item.uploadStatus!=0&&item.uploadStatus!=undefined"/>
        <!-- 是否收藏的图片 -->
        <div class="xing" @click="shou(item)">
          <div class="fl">
            <div class="quick" @click.stop="quick(item)" v-if="from == 'store'">Quick view</div>
            <div class="meng" :class="isDel ? garbage : item.collectionId ? ' meng_2' : 'meng_1'">

              <img class="imgsk" :src="isDel ? garbage : item.collectionId ? xing[1] : xing[0]" alt=""
                   v-if="!deleteIcon"/>


            </div>

            <div class="meng" :class="isDel ? garbage : item.collectionId ? ' meng_3' : ''"><img :src="deleteimg"
                                                                                                 alt=""
                                                                                                 v-if="deleteIcon">
            </div>

          </div>

        </div>
        <div class="imgs" :style="{ height: item.height + 'px', width: item.imgWidth + 'px' }">
          <!--            @click="details(item.productId, item.imgSn)"-->
          <a :href="'/detail/' + item.productId" target="_blank">
          </a>
          <img :src="$imgServer + item.cover" @error="errimage"
               :alt="item.brandStr + ',' + item.productFicationStr + ',' + item.sceneStr + ',' + item.styleStr + ',' + item.label"/>
          <div class="img_bottom">
            <div> {{ item.imgSn }}</div>

            <!--          </div>-->
          </div>
        </div>

        <div class="price" :style="{ top: item.height + 6 + 'px' }">
          <div class="tags">{{ item.tags }}</div>
          <div class="tagtext">
            ${{ item.isBuyout == 1 ? item.priceOnce : item.price }}
            <!-- <span class="original">Original price </span><span class="original originals" > $180</span> -->
            <div v-show="item.isBuyout == 1" style="display: inline-block; transform: translateY(-12%)">
              <div class="Exclusivess">Exclusive</div>
            </div>
          </div>


        </div>
      </div>
    </div>

  </div>
</template>
<script>
export default {
  props: {
    // idx:Number,
    // item:Object,

    from: {
      type: String,
      default: '',
    },
    consHeight: [Number, String],
    lux: [Number, String],
    mx: {
      type: [Number, String],
      default: 0.2,
    },
    contents_x: {
      type: String,
      default: '',
    },
    linelist: Array,
    isDel: {
      type: Boolean,
      default: false,
    },
    deleteIcon: Boolean,
  },
  data() {
    return {
      ping: require("@/assets/img/ping.svg"),
      deleteimg: require("@/assets/img/delete.svg"),
      xing: [
        require("@/assets/img/xing_no.svg"),
        require("@/assets/img/xing_yes.svg"),
      ],
      garbage: require("@/assets/img/garbages.png"),
      blankImage: require("@/assets/img/blank.svg"),
    };
  },
  methods: {
    quick(item) {
      this.$store.state.messagedetails = true,
          document.body.style.height = "1920px"
      document.body.style.overflow = "hidden"

      this.$store.state.items = item

    },
    errimage(e) {
      e.target.src = this.blankImage;
    },
    shou(item) {
      this.$emit('shou', item)
    }
  }
};
</script>
<style lang="less" scoped>
.ping {
  width: 0.14rem;
  height: 0.24rem;
  position: absolute;
  top: 0.16rem;
  right: 0.16rem;
}

.contents {
  // overflow-y: auto;
  // overflow-x: hidden;
  //margin: 0.7rem 0.1rem;
  // width: 16.55rem;
  //  height: 80vh;
  position: relative;

  // .numberlist:hover {

  // }

  .numberlist {
    // overflow: hidden;
    position: absolute;
    text-align: center;
    /*width: 2.5rem;*/
    //padding: 0 0.1rem;


    .numberlistb:hover {
      cursor: pointer;

      .img_bottom {
        display: block;
      }

      .xing {
        display: block;
      }

      .imgs {
        > a {
          background: rgba(0, 0, 0, 0.2);

          > div {
            display: block;
          }
        }
      }
    }

    > div {
      position: relative;
      text-align: left;
      //display: inline-block;
      margin: auto;

      // overflow: hidden;
      .quick {
        white-space: nowrap;
        padding-left: 0.32rem;
        padding-right: 0.32rem;
        height: 0.4rem;
        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 500;
        font-size: 0.14rem;
        color: #fff;
        line-height: 0.4rem;
        border-radius: 0.2rem;
        background: #373acb;
        position: absolute;
        right: 0.64rem;


      }

      .meng {
    position: relative;
        border-radius: 0.12rem;
        overflow: hidden;
        img {
          height: 100%;
          width: 100%;
        }
      }

      .meng::before {
        content: '';
        display: none;
        position: absolute;
        height: 100%;
        width: 100%;

        z-index: 1;
      }

      .meng:hover:before {
        display: block;
      }

      .meng_1::before {
        background: rgba(0, 0, 0, .1);
      }

      .meng_3::before {
        background: rgba(255, 79, 68, 0.1);
      }

      .meng_2::before {
        background: rgba(255, 201, 61, 0.2)
      }

      .imgsk {
        width: 0.4rem;
        height: 0.4rem;

        position: relative;
      }


      .quick:hover {
        background-color: #5F61D5;
        cursor: pointer;
      }

      .quick:active {
        background: #2C2EA2;
      }

      .Exclusive {
        position: absolute;
        background: #ff6e41;
        padding-left: 0.09rem;
        padding-right: 0.09rem;
        border-radius: 0.15rem 0 0.15rem 0;
        color: #fff;

        height: 0.21rem;
        font-size: 0.12rem;
        line-height: 0.21rem;
      }

      .price {
        width: 100%;
        padding-left: 0.14rem;
        position: absolute;
        bottom: -0.26rem;
        right: 0.1rem;
        font-family: "PingFang SC";
        font-style: normal;
        font-weight: 700;
        font-size: 0.20rem;
        line-height: 0.28rem;
        /* identical to box height */

        text-align: left;

        color: #373acb;

        .tags {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          font-family: 'PingFang SC';
          font-style: normal;
          font-weight: 400;
          font-size: 0.14rem;
          width: 100%;
          color: #222222;
          line-height: 0.2rem;
        }

        .tagtext {
          width: 100%;
          text-align: left;

          .original {
            transform: translateY(-0.03rem);


            font-family: 'PingFang SC';
            font-style: normal;
            font-weight: 400;
            font-size: 0.12rem;
            display: inline-block;
            color: #9A9CAE;
          }

          .originals {
            padding-left: 0.08rem;
            padding-right: 0.08rem;
            text-decoration: line-through;
          }
        }
      }

      .imgs {
        > a {
          display: block;
          width: 100%;
          height: 100%;
          position: absolute;
          background: rgba(0, 0, 0, 0);
          border-radius: 0.15rem;

          div {
            display: none;
            position: absolute;
            left: 0.1rem;
            bottom: 0.1rem;
            padding-left: 0.16rem;
            padding-right: 0.16rem;
            height: 0.4rem;
            line-height: 0.4rem;
            background: rgba(34, 34, 43, 0.6);
            border-radius: 0.2rem;
            opacity: 0.8;
            color: #fff;
            font-family: "PingFang SC";
            font-style: normal;
            font-weight: 400;
            font-size: 0.14rem;
            cursor: pointer;
          }
        }

        img {
          width: 100%;
          border-radius: 0.15rem;
        }
      }

      .img_bottom {
        div {
          position: absolute;
          bottom: 0.1rem;
          padding-left: 0.16rem;
          padding-right: 0.16rem;
          height: 0.4rem;
          line-height: 0.4rem;
          background: rgba(34, 34, 43, 0.6);
          border-radius: 0.2rem;
        }

        //height: 100%;

        //width: 100%;
        //background: rgba(0, 0, 0, 0.2);
        /* background: linear-gradient(360deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 100%); */
        position: absolute;
        bottom: 0;
        border-radius: 0.15rem 0.15rem;
        display: none;
        color: #fff;
        font-family: "PingFang SC";
        font-style: normal;
        font-weight: 400;
        font-size: 0.14rem;
        /* line-height: 0.7rem; */
        padding-left: 0.1rem;
        box-sizing: border-box;
      }

      .Exclusivess {
        color: #fff;
        right: 0.08rem;
        background: #c4c4c4;
        font-size: .12rem;
        height: 0.22rem;
        line-height: .22rem;
        padding-left: 0.05rem;
        padding-right: 0.05rem;
        border-radius: 0.04rem;
      }

      .xing:hover {
        cursor: pointer;
      }

      .xing {
        z-index: 1;
        width: 0.4rem;
        right: 0.16rem;
        top: 0.18rem;
        position: absolute;
        display: none;
        cursor: pointer;

        .fl {
          display: flex;
          justify-content: space-around;
        }
      }
    }
  }

}
</style>
