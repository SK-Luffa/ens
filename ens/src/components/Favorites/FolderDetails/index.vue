<template>
  <div>
    <!-- 删除弹窗组件 这里我用了插槽，来控制他的内容以及状态 -->
    <Delete v-show="Solt_Message_Delete" @closeb="closeb" @Confirms="Confirms">
      <template v-slot:title>
        <span>Delete Moodboard</span>

      </template>
      <template v-slot:content>
        Are you sure you want to delete this moodboard?
      </template>

    </Delete>

    <div class="mask" v-show="show" @click="cancel"></div>
    <div class="maskx" v-show="showX">
      <div class="maskxx">
        <i class="el-icon-close" @click="cancel"></i>
        <div class="tetles">Save to board</div>
        <div class="searchs"><input type="text" @input="retrieval" v-model="so" class="so"/> <img class="searchx"
                                                                                                  :src="search" alt="">
        </div>
        <div class="all">All boards</div>
        <div class="datelists">
          <div class="datelistsi" v-for="(item,index) in datalistx" :key="index">
            <span>
              {{ item.name }}
            </span>

            <div class="save" @click="Save(item.id)">Save</div>
          </div>
        </div>
      </div>

    </div>
    <div class="masks" @click.stop="" v-show="shows">
      <Icon @click.stop="add" class="close" type="md-close" />

      <div class="titleM">{{ title }}</div>
      <div class="condition">
        <div class="name">Nombre</div>
        <div class="centent">
          <input autocomplete="new-password" v-model="newFolder.title" type="text"
            placeholder="Detailed description or introduction" />
        </div>
      </div>
      <div class="condition">
        <div class="name">describe</div>
        <div class="centent">
          <input autocomplete="new-password" v-model="newFolder.desc" type="text"
            placeholder="Detailed description or introduction" />
        </div>
      </div>
      <div class="conditions">
        <div class="text" @click="cancel">cancel</div>
        <div @click="done" class="text done">SAVE</div>
      </div>
    </div>
    <div class="main">
      <i @click="close" class="el-icon-back"></i>
      <div class="name">{{ folder.title }}</div>
      <div>All Patterns：</div>
      <div class="number">{{ folder.picNum }}</div>
      <div class="number numbersb">{{ folder.desc }}</div>
      <div v-if="pingsss" class=" text quick" @mouseover="rus" @mouseout="chus" @click.stop="Sharing"
           :style="{background:cols}">
        <div class="puss">{{ Quicks }}</div>
        <img :src="quick" v-show="icon_show" alt=""></div>
      <img @click="add()" :src="pen" alt="" v-if="folder.folderId>0" />
    </div>
    <Cell :linelist="linelist" @shou="shou" :consHeight="consHeight" :deleteIcon="true" :lux="0.16" />
    <!--    <div class="contents" :style="{ height: consHeight + 'px' }">-->
    <!-- 行 -->
    <!--      <Cell :item="item" @shou="shou" :idx="index" v-for="(item, index) in linelist" :key="index" />-->
    <!--      <div class="numberlist" :class="'numberlist' + index" v-for="(item, index) in linelist" :key="index" :style="{-->
    <!--        left: item.left + 'px',-->
    <!--        top: item.top + 'px',-->
    <!--        width: item.width + 'px',-->
    <!--      }">-->
    <!--        <Cell :item="item" @shou="shou" :isDel="true"/>-->
    <!--      </div>-->
    <!--    </div>-->
    <Bottom />
  </div>
</template>
<script>
import Bottom from "@/components/BottomNavigation"
import { sorting_list } from "@/utils/util";
import Delete from "@/components/delete"
import Cell from "../../Screen/Cell";

export default {
  components: { Bottom, Delete, Cell },
  name: "FolderDetails",
  data() {
    return {
      pingsss: false,
      cols: "#CB1F27",
      Quicks: "Quick Sharing",
      so: "",
      icon_show: true,
      datalistx: null,
      datalistL: null,
      folder: {},
      newFolder: {},
      picNum: '',
      Solt_Message_Delete: false,
      value: "",
      describe: "",
      title: "Create a new collection",
      show: false,
      shows: false,
      showX: false,
      pen: require("@/assets/img/pen.png"),
      garbage: require("@/assets/img/garbages.png"),
      blankImage: require("@/assets/img/blank.svg"),
      consHeight: 0,
      linelist: [],
      search: require("@/assets/img/search.svg"),
      xing: [
        require("@/assets/img/xing_no.png"),
        require("@/assets/img/xing_yes.png"),
      ],
      content_list_boll: [true, false, false], //控制每一个选项的选中和晴空
      candidate_imglist: [],
      conteent_img: "",
      conteent_img2: "",
      values: 100,
      ontent_datas: "",
      quick: require("@/assets/img/quick.svg"),
      gx: [require("@/assets/img/gox.png"), require("@/assets/img/xingx.png")],
      wonder: require("@/assets/img/wonder.png"),
      state: [require("@/assets/img/x.png"), require("@/assets/img/d.png")],
      ab: [require("@/assets/img/a.png"), require("@/assets/img/b.png")],
      idxs: [],
      idsx: null,
      Uploading: "",
      Uploadings: "",
      colors: "",
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
    // 鼠标移入一键分享
    rus() {

      this.Uploading = this.Quicks


      this.colors = this.cols
      if (this.Quicks != "Quick Sharing") {

        this.Quicks = "Stop sharing"
        this.cols = "#DB4249"
      }


    },
    // 鼠标移出一键分享
    chus() {

      this.Quicks = this.Uploading
      this.cols = this.colors
    },
    // 一键分享，检索
    retrieval() {


      let vm = this
      this.datalistx = this.datalistL.filter(item => item.name.toLowerCase().indexOf(vm.so) >= 0)


    },
    // 一键分享
    Save(id) {
      this.idsx = id

      let vm = this;
      vm.$store.state.tipsb = false;
      this.Quicks = "Are Uploading..."
      this.cols = "#F49195"
      this.icon_show = false
      this.cancel()
      this.rq({
        url: "/api/member/openUploadPins",
        method: "post",
        param: {
          // accessToken: "pina_AEA7BGAWAD2ZWAIAGCAN6DJKE4EMVAYBACGSP4XE5ISUXPCWHBRZNNEPRJ6J5XPP4RMINNVZK72SYDAAXTP6ACDB7PGDOLIA",
          boardId: id,
          folderId: this.$route.query.fid,
        },
        onError: function () {
        },
        loading: "off",
        vm,
      }).then((res) => {
        if (res.code == 200) {
          this.Uploading = this.Quicks = "Sharing With Pinterest"
          this.icon_show = false
          this.colors = this.cols = "#F49195"
          this.$message({
            message: 'Operation succeeded',
            type: 'success'
          });
          this.cancel()
        } else {
          this.$message.error(res.desc);
          //
          // this.$message(res.desc);
        }
      });
    },
// 点击按钮
    Sharing() {

      if (this.Quicks == "Quick Sharing") {
        this.showX = this.show = !this.show;
        document.body.style.height = "10.8rem"
        document.body.style.overflow = "hidden"
        return
      } else {
        this.close_off();
      }


    },

    // 关闭自动分享
    close_off() {
      let vm = this;
      this.rq({
        url: "/api/member/closeUploadPins",
        method: "post",
        param: {
          folderId: this.$route.query.fid,

        },
        onError: function () {
        },
        vm,
        // loading:"off"
      }).then((res) => {
        if (res.code == 200) {
          this.Uploading = this.Quicks = "Quick Sharing";
          this.icon_show = true;
          this.colors = this.cols = "#CB1F27"
          //
        } else {
          this.$message.error(res.desc)
          //
          // this.$message(res.desc);
        }
      });
    },
    // 点击确认
    Confirms() {


      let vm = this;
      this.rq({
        url: "/api/personal/deleteBookmarkDetail",
        method: "post",
        param: {
          folderId: this.$route.query.fid,
          productId: this.productId,
        },
        onError: function () {
        },
        vm,
      }).then((res) => {
        if (res.code == 200) {


          vm.selectAlikeById();
          vm.closeb()
         
      //     this.$store.state.blank = window.location.pathname + window.location.href.split("?")[1]
      // this.$router.push("/blank")
          //
        } else {
          //
          // this.$message(res.desc);
        }
      });
    },
    // 删除窗口关闭
    closeb() {
      this.Solt_Message_Delete = false
    },
    cancel() {
      this.showX = this.shows = this.show = false
      document.body.style.height = "100%"
      document.body.style.overflow = "auto"
    },
    done() {
      let vm = this;
      // value describe
      if (this.folderId === "") {
        // 点击添加

        this.rq({
          url: "/api//personal/addFolder",
          method: "post",
          param: {
            title: 10,
          },
          onError: function () {
          },
          vm,
        }).then((res) => {
          if (res.code == 200) {
            vm.selectAlikeById()
            vm.shows = vm.show = false;
            document.body.style.height = "100%"
            document.body.style.overflow = "auto"

            //
          }
        });
      } else {
        // 点击修改

        if (this.value === "") {
          return this.$message("The folder name cannot be empty");
        }
        if (this.describe === "") {
          return this.$message("The folder description cannot be empty");
        }

        this.rq({
          url: "/api/personal/renameFolder",
          method: "post",
          param: {
            folderId: this.$route.query.fid,
            title: this.newFolder.title,
            desc: this.newFolder.desc
          },
          onError: function () {
          },
          vm,
        }).then((res) => {
          if (res.code == 200) {
            vm.selectAlikeById()
            vm.shows = vm.show = false
            document.body.style.height = "100%"
            document.body.style.overflow = "auto"
            //
          }
        });
      }
    },
    add(a, b, c) {

      this.folderId = c;
      this.shows = this.show = !this.show;
      document.body.style.height = "10.8rem"
      document.body.style.overflow = "hidden"

      if (!this.show) {
        this.describe = "";

      } else {

        this.value = a;
        this.describe = b;
      }
    },
    close() {
      this.$store.state.blank = "favorites"
      this.$router.push("/favorites")
      console.log(this.$router);
    },

    details(a, b) {
      // localStorage.productId = a;
      // localStorage.imgSn = b;

      // this.$store.state.blank = "details";
      // this.$router.push("/blank");

      const routeUrl = this.$router.resolve({
        path: "/detail/" + a
        // query: { id: a },
      });

      window.open(routeUrl.href, "_blank");
    },
    // sorting_list(x) {
    //   // 声明一个数组，用来记录每一列的高度
    //
    //   let paddingwidth = 0.2;
    //
    //   let paddingWidth=0.1 * this.$store.state.fontRate;
    //   let imgContainerWidth = document.documentElement.clientWidth - paddingwidth * this.$store.state.fontRate;
    //
    //   if (imgContainerWidth > 2380) {
    //     this.listnumber = 10
    //   } else if (imgContainerWidth > 2140) {
    //     this.listnumber = 9
    //   } else if (imgContainerWidth > 1900) {
    //     this.listnumber = 8
    //   } else if (imgContainerWidth > 1660) {
    //     this.listnumber = 7
    //   } else if (imgContainerWidth > 1420) {
    //     this.listnumber = 6
    //   } else if (imgContainerWidth > 1180) {
    //     this.listnumber = 5
    //   } else if (imgContainerWidth > 940) {
    //     this.listnumber = 4
    //   } else if (imgContainerWidth > 700) {
    //     this.listnumber = 3
    //   } else {
    //     this.listnumber = 2
    //   }
    //
    //   let imgWidth = Math.round(imgContainerWidth / this.listnumber * 100) / 100;
    //
    //   let Height_array = [];
    //
    //
    //   for (let index = 0; index < x.length; index++) {
    //     // 拿到宽度
    //     x[index].width = imgWidth;
    //     x[index].imgWidth = imgWidth-paddingWidth*2;
    //
    //     if (index < this.listnumber) {
    //       x[index].top = 0;
    //       x[index].left = (index % (this.listnumber + 1)) * (x[index].width);
    //       // 每一列的高度是当前图片的高度   图片的高度是高宽比*256+bottom
    //
    //       Height_array.push(
    //           (x[index].imgHeight / x[index].imgWeight) * x[index].width + 56
    //       );
    //     } else {
    //       let min = Height_array.minindex(Height_array); //拿到最短列的下标
    //
    //       // console.log(Height_array);
    //       // console.log(Height_array[min]);
    //       // 当前的图片的top 就是最低列的高度
    //       x[index].top = Height_array[min];
    //       // 当前图片的left 是最低列的下标*(256 + 16)
    //       x[index].left = min * (x[index].width);
    //       // 然后最低列的高度此时就是最低列的高度加上当前图片的高度
    //       Height_array[min] =
    //           Height_array[min] +
    //           (x[index].imgHeight / x[index].imgWeight) * x[index].width +
    //           56;
    //     }
    //   }
    //   // 这里获取列的最大值复制给付元素
    //   this.consHeight = Height_array.max(Height_array);
    //
    //   this.linelist = "";
    //
    //   window.linelist = this.linelist = x;
    // },
    shou(x) {
      this.Solt_Message_Delete = true;
      this.productId = x.productId;
    },
    selectAlikeById() {
      // this.linelist=null;
      let vm = this;
      this.rq({
        url: "/api/personal/selectBookmarkDetail",
        method: "post",
        param: {
          folderId: this.$route.query.fid,
          pageNum: 0,
          pageSize: 100,
        },
        onError: function () {
        },
        vm,
      }).then((res) => {
        if (res.code == 200) {

  
          vm.p = res.data.aaData;
          console.log(vm.p);
          if (res.data.info.boardId != "") {
            this.Quicks = "Sharing With Pinterest"
            this.icon_show = false
            this.cols = "#F49195"
          }
// // vm.idxs.split(",")
//      Array.isArray(vm.idxs)?"":vm.idxs.split(",")

//           for (let index = 0; index < vm.p.length; index++) {

//             vm.idxs.push(vm.p[index].productId)

//           }

//           vm.idxs = vm.idxs.join()


          vm.folder = res.data.info;
          vm.newFolder = {
            folderId: vm.folder.folderId,
            title: vm.folder.title,
            desc: vm.folder.desc,
          }

          if (vm.p == undefined) {
            this.linelist = null;
            this.consHeight = 0;
          } else {
            //   获取宽度

            let slistnumber = document.documentElement.clientWidth / 257;

            vm.listnumber = Math.floor(slistnumber);

            sorting_list(vm.p, vm);
          }
        } else {
          //
          this.$message(res.desc);
        }
      });
    },
    changeSize() {
      if (this.p != null && this.p.length > 0)
        sorting_list(this.p, this);
    },
    pinghes() {
      let vm = this;
      this.rq({
        url: "/api/member/boards",
        method: "post",
        param: {
          accessToken: "pina_AEA7BGAWAD2ZWAIAGCAN6DJKE4EMVAYBACGSP4XE5ISUXPCWHBRZNNEPRJ6J5XPP4RMINNVZK72SYDAAXTP6ACDB7PGDOLIA",

        },
        onError: function () {
        },
        vm,
      }).then((res) => {
        if (res.code == 200) {

          vm.datalistL = vm.datalistx = res.data;

        } else {
          this.$message.error(res.desc);
          //
          // this.$message(res.desc);
        }
      });
    }
  },
  created() {
    console.log("created")
    let vm = this

    this.rq({
      url: "/api/member/getMemberInfo",
      method: "get",
      param: {},
      onError: function () {
      },
      vm,
    }).then((res) => {
      if (res.code == 200) {
        if (res.data.pinterestAdmin > 0) {
          vm.pingsss = true;
          vm.pinghes();

        } else {
          vm.pingsss = false
        }


      } else {
        this.$message.error(res.desc);
        //
        // this.$message(res.desc);
      }
    });

    // window.addEventListener('popstate', this.popstate, false);

    // 判断当前路由是否是收藏夹，如果是就让星星点亮，否则的话就让星星熄灭
    // if (this.$route.path === "/folder") {
    //   this.$store.state.svgg = false;
    //   this.$store.state.svgs = true;
    // } else {
    //   this.$store.state.svgg = false;
    //   this.$store.state.svgs = false;
    // }

  },
  // destroyed() { // 销毁vm组件
  //   window.removeEventListener('popstate', this.popstate, false);
  // },
  mounted() {
    console.log("mouted")
    this.selectAlikeById();
    // this.changeSize();
  },
};
</script>
<style lang="less" scoped>
.main {
  margin-top: 0.24rem;
  margin-left: 0.2rem;
  width: calc(100% - 0.4rem);
  /*display: flex;*/
  /*width: 18.92rem;*/
  height: 0.56rem;
  background: #fff;
  // margin-top: 0.24rem;
  /*margin-left: 50%;*/
  /*transform: translateX(-50%);*/
  border-radius: 0.29rem;
  box-sizing: border-box;
  padding-left: 0.19rem;
  line-height: 0.56rem;
  font-family: "PingFang SC";
  font-style: normal;
  font-weight: 700;
  font-size: 0.16rem;
  color: #000000;
  position: relative;

  i {
    transform: translateY(13%);
    font-size: 0.3rem;
    display: inline-block;
    margin-right: 0.16rem;
    cursor: pointer;
  }

  div {
    display: inline-block;
  }

  .name {
    margin-right: 0.63rem;
  }

  .number {
    font-weight: 400;
    font-size: 0.14rem;
    color: #222222;
    margin-right: 0.63rem;
  }

  .numbersb {
    color: #666666;
  }

  img {
    position: absolute;
    right: 0.22rem;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
  }
}

.contents {
  min-height: 3.4rem;
}

//  margin: 0.16rem 0.2rem;
//  // overflow-y: auto;
//  // overflow-x: hidden;
//
//  //  height: 80vh;
//  position: relative;
//  /*margin-left: 0.14rem;*/
//
//  .numberlist {
//    position: absolute;
//    /*width: 250px;/*/
//    padding: 0 0.1rem;
//    cursor: pointer;
//
//  }
//}

.mask {
  position: fixed !important;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1;
  overflow: hidden;
}

.masks {
  z-index: 2;
  position: fixed;
  border-radius: 0.08rem;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
  width: 6.88rem;
  height: 3.28rem;
  background: #fff;

  .close {
    position: absolute;
    right: 0.12rem;
    top: 0.1rem;
    font-size: 0.25rem;
  }

  .titleM {
    width: 100%;
    text-align: center;
    margin-top: 0.4rem;
    font-family: "PingFang SC";
    font-style: normal;
    font-weight: 700;
    font-size: 0.2rem;
    color: #000000;
    margin-bottom: 0.32rem;
  }

  .condition {
    width: 100%;
    box-sizing: border-box;
    padding-left: 0.42rem;
    padding-right: 0.42rem;
    margin-bottom: 0.32rem;
    display: flex;

    .name {
      line-height: 0.44rem;
      font-family: "PingFang SC";
      font-style: normal;
      font-weight: 400;
      font-size: 0.14rem;
      color: #000000;
    }

    .text {
      margin-left: 0.24rem;
      font-family: "PingFang SC";
      font-style: normal;
      font-weight: 700;
      font-size: 0.16rem;
      line-height: 0.22rem;
      color: #222222;
      cursor: pointer;
    }

    .done {
      width: 0.88rem;
      height: 0.36rem;
      text-align: center;

      background: #373acb;
      color: #fff;
      cursor: pointer;
    }

    .centent {
      margin-left: 0.16rem;

      input {
        box-sizing: border-box;
        padding-left: 0.16rem;
        width: 5.36rem;
        height: 0.44rem;
        line-height: 0.44rem;
        border-radius: 0.14rem;
        border: none;
        background: #f1f1f1;
        color: #000000;
      }
    }
  }

  .conditions {
    display: flex;
    position: relative;

    .text {
      margin-left: 0.64rem;
      font-family: "PingFang SC";
      font-style: normal;
      font-weight: 700;
      font-size: 0.16rem;
      line-height: 0.22rem;
      color: #222222;
      cursor: pointer;
      width: 0.88rem;
      height: 0.36rem;
      text-align: center;
      line-height: 0.36rem;
      border-radius: 0.18rem;
      border: 1px solid #fff;
    }

    .text:active {
      border: 0.01rem solid #2C2EA2;
    }

    .done {
      transform: translateY(-10%);
      position: absolute;
      right: 0.4rem;
      background: #373acb;
      color: #fff;
      cursor: pointer;
    }

    .done:hover {
      background: #5F61D5;
    }

    .done:active {
      background: #2C2EA2;
    }
  }
}

.maskx {
  position: absolute;
  left: 50%;
  top: 3.03rem;
  transform: translateX(-50%);
  width: 3.48rem;
  height: 4.78rem;
  background: #fff;
  z-index: 1;
  border-radius: 14px;


  .maskxs {
    position: relative;
    overflow: hidden;
  }

  i {
    position: absolute;
    right: 0.16rem;
    top: 0.16rem;
    font-size: 0.2rem;
    color: #c4c4c4;
  }

  .tetles {

    padding-top: 0.24rem;
    padding-bottom: 0.16rem;
    width: 100%;
    text-align: center;
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 500;
    font-size: 0.20rem;

  }

  .searchs {
    box-sizing: border-box;
    padding-left: 0.24rem;
    padding-right: 0.24rem;
    position: relative;

    .so {
      width: 100%;
      height: 0.5rem;
      border: 2px solid #F1F1F1;
      border-radius: 46px;
      box-sizing: border-box;
      padding-left: 0.4rem;
      padding-right: 0.2rem;
      line-height: 0.5rem;
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 500;
      font-size: 0.16rem;


      color: #222222;
    }

    .searchx {
      position: absolute;
      left: 0.4rem;
      line-height: 0.5rem;
      top: 50%;
      transform: translateY(-50%);
    }
  }

  .all {
    box-sizing: border-box;
    padding-left: 0.24rem;
    padding-right: 0.24rem;
    width: 100%;
    text-align: left;
    padding-top: 0.16rem;
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 400;
    font-size: 0.14rem;
    line-height: 0.2rem;
  }

  .datelists {
    box-sizing: border-box;
    padding-left: 0.24rem;
    padding-right: 0.24rem;
    width: 100%;
    overflow: auto;
    height: 3.1rem;

    .datelistsi {
      width: 100%;
      height: 0.54rem;
      line-height: 0.54rem;
      display: flex;
      justify-content: space-between;
      box-sizing: border-box;
      padding-left: 0.08rem;
      padding-right: 0.08rem;
      border-radius: 0.14rem;
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 500;
      font-size: 0.16rem;
      color: #222222;

      span {
        width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .save {
        display: none;
        margin: auto 0;

        width: 0.69rem;
        height: 0.38rem;
        background: #d32d2f;
        border-radius: 0.19rem;
        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 500;
        font-size: 0.16rem;
        line-height: 0.38rem;
        color: #fff;
        text-align: center;
      }
    }

    .datelistsi:hover {
      background: #F1F1F1;

      .save {
        display: block;
      }
    }
  }


}

.quick {
  .puss {
    width: 100%;
    text-align: center;
  }

  width: 1.6rem;
  height: 0.36rem;
  position: absolute;
  right: 1.04rem;
  background: #CB1F27;
  line-height: 0.36rem;
  top: 50%;
  border-radius: 42px;
  transform: translateY(-50%);
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 400;
  font-size: 0.12rem;
  color: #FFFFFF;
  padding-left: 0.16rem;
  padding-right: 0.16rem;
  box-sizing: border-box;
  display: flex !important;
  justify-content: space-between;

  img {
    width: 0.2rem;
    position: relative;
    right: 0;
    top: 0;
    transform: none;
    padding-left: 0.08rem;

  }
}
</style>
