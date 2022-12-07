<template>
  <div class="rot">
    <Delete v-show="Solt_Message_Delete" @closeb="closeb" @Confirms="Confirms">
      <template v-slot:title>
        <span>Delete Moodboard</span>

      </template>
      <template v-slot:content>
        Are you sure you want to delete this moodboard?
      </template>
    </Delete>
    <div class="mask" v-show="show" @click="add"></div>
    <div class="masks" @click.stop="" v-show="show">
      <Icon @click.stop="add" class="close" type="md-close" />
      <div class="titleM">{{ title }}</div>
      <div class="condition">
        <div class="name">Nombre</div>
        <div class="centent">
          <input autocomplete="new-password" v-model="value" type="text"
            placeholder="Detailed description or introduction" />
        </div>
      </div>
      <div class="condition">
        <div class="name">describe</div>
        <div class="centent">
          <input autocomplete="new-password" v-model="describe" type="text"
            placeholder="Detailed description or introduction" />
        </div>
      </div>
      <div class="conditions">
        <div class="text deletes" v-if=" value!=''" @click="deletemessage">Delete</div>
        <div class="saves">
          <div class="text tx" @click="add">Cancel</div>

          <div @click="done" class="text done">SAVE</div>
        </div>

      </div>
    </div>
    <div class="title">
      <div class="text">Favorites：{{ numbers }} <span></span></div>
      <div class="text">all patterns：{{ patterns }} <span></span></div>
   

      <i  class="el-icon-circle-plus icons"  @click.stop="add('', '', '')" type="ios-add-circle" />
    </div>
    <div class="content">
      <!--      <div class="forinlist" v-for="(item, index) in datalist" :key="index">-->

      <div v-for="(item, index) in datalist" :key="index"
        @click="opens(item.title, item.productList.length, item.folderId, item.picNum)" class="datalistM"
        :style="{ width: cellWidth + 'px' }">
        <div class="main" :style="{ height: cellWidth + 'px' }">
          <img v-if="item.productList.length > 0" :src="item.productList[0].cover" alt="" />
        </div>
        <div class="imglist" :style="{ height: cellWidth / 3 + 'px' }">
          <template v-for="(p, pi) in item.productList">
            <img v-if="pi > 0" :src="p.cover" alt="" :key="pi" @error="errimage"/>

          </template>
          <!-- <img class="mo" v-if="!item.productList" src="" alt="" /> -->
          <!-- <img class="mo" v-if="!item.productList" src="" alt="" />
          <img class="mo" v-if="!item.productList" src="" alt="" /> -->
          <!--            <img :src="items.productList[2].cover" alt=""/>-->
          <!--            <img :src="items.productList[3].cover" alt=""/>-->
        </div>
        <div class="name">
          <div class="names">{{ item.title }}</div>
          <div class="operation" v-if="item.folderId != -1" @click.stop="add(item.title, item.desc, item.folderId)">
            <img :src="pen" alt="" />
          </div>
        </div>
        <div class="number">{{ item.picNum }} Patterns</div>
      </div>
      <!--      </div>-->
    </div>
  </div>
</template>
<script>
import Delete from "@/components/delete";
export default {
  components: {
    Delete

  },


  name: "Favorites",
  data() {
    return {
      Solt_Message_Delete: false,
      cellWidth: 0,
      value: "",
      folderId: "",
      describe: "",
      patterns: 0,
      numbers: 0,
      show: false,
   
      pen: require("@/assets/img/pen.png"),
      blankImage: require("@/assets/img/blank.svg"),
      datalist: [],
      title: "Create a new collection",
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
    errimage(e){
      e.target.src=this.blankImage;
    },
    // 点击删除按钮-触发删除弹窗
    deletemessage(){
      this.show = false
      this.Solt_Message_Delete=true
      
    },
    // 确认删除文件夹-确认
    Confirms() {
      this.deletes();
      this.Solt_Message_Delete = false
    },
    // 确认删除文件夹-取消
    closeb() {
     
      this.Solt_Message_Delete = false
    },
    deletes() {

      let vm = this;

      // 点击添加

      this.rq({
       
        url: "/api/personal/deleteFolder",
        method: "post",
        param: {
          folderId: this.folderId,
        },
        onError: function () {
          vm.closeb()
          vm.add();
        },
        vm,
      }).then((res) => {

        if (res.code == 200) {

          vm.reloadData()
          // vm.add();
        }

      });

    },
    // 点击进入详情页面
    opens(a, b, c, d) {
      this.$store.state.name = a;
      this.$store.state.number = b
      this.$store.state.folderId = c

      this.$store.state.picNum = d

      let p = {
        path: '/folder',
        query: {fid:c}
      };
      this.$router.push(p)
      // this.$store.state.blank = "folder"
      // this.$router.push("/blank")
    },
    // 点击修改名称和描述
    done() {
      let vm = this;
      // value describe
      if (this.folderId === "") {
        // 点击添加

        this.rq({
          url: "/api/personal/saveFolder",
          method: "post",
          param: {
            title: this.value,
            desc: this.describe
          },
          onError: function () {
          },
          vm,
        }).then((res) => {
          if (res.code == 200) {
            this.add();
            this.reloadData()
            this.show = false
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

            folderId: this.folderId,
            title: this.value,
            desc: this.describe
          },
          onError: function () {
          },
          vm,
        }).then((res) => {
          if (res.code == 200) {
            this.reloadData()
            this.show=false
          }
        });
      }
    },
    //点击 添加修改
    add(a, b, c) {

      this.folderId = c;
      this.show = !this.show;

      if (!this.show) {
        this.describe = "";

      } else {

        this.value = a;
        this.describe = b;
      }
    },
    changeSize() {

      let imgContainerWidth = document.documentElement.clientWidth - 0.2 * this.$store.state.fontRate;
      let colNum = 0;

      if (imgContainerWidth > 2560) {
        colNum = 10
      } else if (imgContainerWidth > 1920) {
        colNum = 8
      } else if (imgContainerWidth > 1440) {
        colNum = 7
      } else if (imgContainerWidth > 1200) {
        colNum = 6
      } else if (imgContainerWidth > 860) {
        colNum = 5
      } else if (imgContainerWidth > 560) {
        colNum = 3
      } else {
        colNum = 2
      }

      this.cellWidth = Math.round(imgContainerWidth / colNum * 100) / 100 - 0.2 * this.$store.state.fontRate;
    },
    reloadData() {
      let vm = this;
      this.rq({
        url: "/api/personal/selectBookmark",
        method: "post",
        param: {
          iDisplayStart: 0,
          iDisplayLength: 10,
          title: "%%",
        },
        onError: function () {
        },
        vm,
      }).then((res) => {
        if (res.code == 200) {
          vm.numbers = res.data.aaData.length;

          for (let index = 0; index < res.data.aaData.length; index++) {
            vm.patterns += res.data.aaData[index].picNum;
            for (
              let indexs = 0;
              indexs < res.data.aaData[index].productList.length;
              indexs++
            ) {
              res.data.aaData[index].productList[indexs].cover =
                vm.$imgServer +
                res.data.aaData[index].productList[indexs].cover;
            }
          }

          vm.datalist = res.data.aaData;
          // console.log(vm.datalist)
          // let m = Math.ceil(res.data.aaData.length / 6);
          // for (let index = 0; index < m; index++) {
          //   let s = res.data.aaData.splice(0, 6);
          //   vm.datalist.push(s);
          // }


          if(res.user){
            this.$store.state.login_bool = true;
            this.$store.state.username.title = res.user.userName;
            this.$store.state.username.email = res.user.email;
            this.$store.state.username.icon_text = res.user.companyName.split("")[0].toUpperCase();
          }else{
            this.$store.state.login_bool = false;
          }
        }
      });
    }
  },
  created() {
    this.reloadData();
    // 判断当前路由是否是收藏夹，如果是就让星星点亮，否则的话就让星星熄灭
    // if (this.$route.path === "/favorites") {
    //   this.$store.state.svgg = false;
    //   this.$store.state.svgs = true;
    // } else {
    //   this.$store.state.svgg = false;
    //   this.$store.state.svgs = false;
    // }


  },
  mounted() {
    this.$store.state.Navigation_in = "Navigation_up";
    this.changeSize();
  },
};
</script>
<style lang="less" scoped>
.rot {
  margin-top: 0rem;
  // padding-top: 0.67rem;
  position: relative;

  .mask {
    position: fixed !important;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    z-index: 1;
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
      cursor: pointer;
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
      }
    

      .done {
        width: 0.88rem;
        height: 0.36rem;
        text-align: center;

        background: #373acb;
        color: #fff;
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
        margin-left: 0.32rem;
        font-family: "PingFang SC";
        font-style: normal;
        font-weight: 700;
        font-size: 0.16rem;
        line-height: 0.22rem;
        color: #222222;
        cursor: pointer;
        width: 0.88rem;
        height: 0.36rem;
        border-radius: 0.18rem;
        text-align: center;
        line-height: 0.36rem;
        border: 1px solid #fff;
      }

      
      .text:active {
        border: 0.01rem solid #2C2EA2;
      }

      .deletes {
        margin-left: 0.42rem;
        border: 0.01rem solid #FF4F44;
        border-radius: 0.18rem;
        color: #ff4f44;
      }

      .deletes:hover {
        background: #F1F1F1;
      }

      .saves {
        padding-right: 0.4rem;
        display: flex;
        width: 100%;
        justify-content: flex-end;
      }

      .tx {
        border: 1px solid #CCCCCC;
      }

      .tx:hover {
        background: #F1F1F1;
      }

      .done {


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

  .title {
    position: absolute;
    margin-top: 0.24rem;
    left: 0.2rem;
    /*left: 50%;*/
    /*transform: translateX(-50%);*/
    border-radius: 0.32rem;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.08);
    width: calc(100% - 0.4rem);
    height: 0.64rem;
    background: #fff;

    .text {
      display: inline-block;
      color: #222222;
      font-family: "PingFang SC";
      font-style: normal;
      font-weight: 700;
      font-size: 0.16rem;
      line-height: 0.64rem;
      margin-left: 0.24rem;
    }

          
    .text+.text {
      margin-left: 0.6rem;
    }

    .icons:hover {
      color: #5F61D5;
      cursor: pointer;
    }

    .icons:active {
      color: #2C2EA2;
    }

    .icons {
      line-height: 0.64rem;
      position: absolute;
      right: 0.16rem;
      font-size: 0.42rem;
      color: #373acb;
      cursor: pointer;

      img {
        width: 0.32rem;
        height: 0.32rem;
      }
    }
  }

  .content {
    border-radius: 0.08rem;
    /*margin-left: 50%;*/
    /*transform: translateX(-50.45%);*/
    // margin-top: 1.04rem;/
    padding-top: 1.02rem;
    margin-left: 0.1rem;

    width: calc(100% - 0.2rem);

    .forinlist {
      /*display: flex;*/
    }

    .datalistM {
      border-radius: 0.08rem;
      display: inline-block;
      background: #fff;

      margin: 0.1rem;
      /*width: 3.02rem;*/
      /*height: 4.56rem;*/
      padding: 0.08rem;
      padding-bottom: 0.08rem;
      /*margin-bottom: 0.08rem;*/
      cursor: pointer;

      .main {
        border-radius: 0.04rem;
        //padding: 0.08rem;
        width: 100%;
        /*height: 2.86rem;*/
        cursor: pointer;
        background: #F1F1F1;

        img {

          border-radius: 0.04rem;
          width: 100%;
          height: 100%;
          object-fit: cover;
          overflow: hidden;
          cursor: pointer;
        }
      }

      .imglist {

        margin-top: 0.04rem;
        width: 100%;
        height: 0.92rem;
        overflow: hidden;
        display: flex;
        cursor: pointer;

        img {
          overflow: hidden;
          height: 100%;
          width: 33%;
          border-radius: 0.04rem;
          object-fit: cover;
          cursor: pointer;
        }

        img+img {
          margin-left: 0.05rem;
        }
      }

      .name {
        position: relative;
        cursor: pointer;

        div {
          display: inline-block;
          line-height: 0.24rem;
        }

        .names {
          font-family: "PingFang SC";
          font-style: normal;
          font-weight: 700;
          font-size: 0.16rem;
          color: #222222;
          margin-top: 0.09rem;
          cursor: pointer;
          padding-left: 0.05rem;
        }

        .operation {
          position: absolute;
          right: 0rem;
          top: 0.08rem;

          >img {
            cursor: pointer;
          }
        }
      }

      .number {
        font-family: "PingFang SC";
        font-style: normal;
        font-weight: 400;
        font-size: 0.12rem;
        color: #222222;
        margin-top: 0.09rem;
        padding-left: 0.05rem;
        cursor: pointer;
      }
    }
  }
}
</style>
