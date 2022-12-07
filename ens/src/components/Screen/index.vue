<template>
  <div class="screen">
    <Message_DetailsVue v-if="this.$store.state.messagedetails" @shou="shou" ></Message_DetailsVue>

    <el-upload @click="jus" class="upload-demo" :action="$imgServer + '/api/product/selectAlike'"
               :show-file-list="false" :on-change="changes" :on-success="yesdata" :on-progress="uploadm" :drag="true"
               :headers="{
                 'Access-Token': token,
               }" multiple>
      <div @click.stop="" class="noos">
        <i @click.stop="lp" class="el-icon-close lpus"></i>
        <div @click.stop="upload" class="el-upload__text">Select Image</div>
        <div @click="jus" class="el_test">{{ drag }}</div>
      </div>
    </el-upload>
    <!-- <input class="file" type="file" /> -->
    <Shou ref="shou"/>

    <div class="titles lus">
      <div class="ttile">
        <div class="Pattern" :style="{ transform: 'translateX(' + -transform_width + 'px)' }">
          <!-- Pattern -->
          <div class="model_div" v-for="(item, index) in list" :key="index">
            <div class="model">{{ item.e }}</div>
            <div class="model_icon" @click="clearlist(index, item)">
              <i class="el-icon-close"></i>
            </div>
          </div>
        </div>
        <div class="from" @click="open_list">

          {{ from }} <img :src="lin" alt=""/>
          <div class="als" v-show="als">

            <div @click.stop="froms('recommend')">recommend</div>
            <div @click.stop="froms('From new to old')">From new to old</div>
            <div @click.stop="froms('old to new')">old to new</div>
          </div>
        </div>
      </div>
    </div>
    <div class="Filter_img" v-show="Filter_img">
      <img :src="url" alt=""/>
    </div>

    <div class="cons">
      <div class="cons_title" :style="{ transform: 'translateX(' + -transform_width + 'px)' }">
        Filter Option
      </div>
      <!-- 筛选 -->
      <div class="Screening" :style="{ width: $store.state.lw + 'px' }">
        <div class="Screening_div" :style="{
          top: tops + 'rem',
          transform: 'translateX(' + -transform_width + 'px)',
        }">
          <div class="SearchFilter" :style="{}">
            <input autocomplete="new-password" @click="close_down_img" @keyup.enter="SelectPage()"
                   v-model="$store.state.world" class="SearchFilter_input" type="text" style="width: 100%"/>
            <img class="Vector" @click="uploads" :src="Vector" alt=""/>

            <svg @click="SelectPage()" class="Group" width="46rem" height="46rem" viewBox="0 0 46 46" fill="none"
                 xmlns="http://www.w3.org/2000/svg">
              <rect class="rect" width="46" height="46" rx="23" fill="#373ACB"/>
              <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M24.4304 16.618C26.5877 18.7753 26.5877 22.2731 24.4304 24.4304C22.273 26.5877 18.7753 26.5877 16.618 24.4304C14.4607 22.2731 14.4607 18.7753 16.618 16.618C18.7753 14.4607 22.273 14.4607 24.4304 16.618ZM26.5493 25.0327C28.7604 22.0854 28.5255 17.8847 25.8446 15.2038C22.9062 12.2654 18.1422 12.2654 15.2038 15.2038C12.2654 18.1422 12.2654 22.9062 15.2038 25.8446C17.8848 28.5256 22.0857 28.7605 25.033 26.5491C25.0495 26.5681 25.0668 26.5866 25.0848 26.6047L31.1653 32.6852C31.5851 33.105 32.2657 33.105 32.6854 32.6852C33.1052 32.2654 33.1052 31.5848 32.6854 31.1651L26.605 25.0846C26.5869 25.0665 26.5683 25.0492 26.5493 25.0327Z"
                    fill="white"/>
            </svg>
          </div>

          <div class="Screeninglist" :style="{ width: $store.state.lw - 0.13 * $store.state.fontRate + 'px' }">

            <div class="Screeninglists" v-for="(item, index) in selectAllType" :key="index">
            
              <div class="Screeninglist_title">
                <!-- 控制台报错事因为一开始这里没有拿到数据，不存在name这个属性 故，这里把报错 -->
                <div class="style">{{ item.name }}</div>

                <div class="plus" @click="opens(index)" v-if="index !== 1">
                  <!-- <i class="el-icon-plus" v-show="plus_0"></i> -->
                  <img :src="on" alt="" v-show="!item.plus"/>
                  <img :src="offs" alt="" v-show="item.plus"/>
                  <!-- <i class="el-icon-minus" v-show="!plus_0"></i> -->
                </div>
              </div>

              <template v-if="index !== 1">
        <!-- {{item.data}} -->
                <div class="Screeninglist_content" v-show="!item.plus" v-for="(citem, cindex) in item.data"
                     :key="cindex">
                   
                  <div class="lowerWord">
                    <div class="lowerWord_div" @click="checks(index, cindex, citem.word)">
                      <img :src="a" alt="" v-show="!citem.check"/>
                      <img :src="b" alt="" v-show="citem.check"/>
                      <!-- <i v-show="item.check" class="el-icon-check"></i> -->
                    </div>
                    {{ citem.word.slice(0, 1).toUpperCase() + citem.word.slice(1) }}
                    <!-- {{ item.productCount }} -->
                  </div>
                  <div class="rootId">{{ citem.productCount }}</div>
                </div>
              </template>
              <template v-else-if="index === 1">
                <el-slider v-model="valuem" @change="Pricechange" range show-stops :max="valuemx">
                </el-slider>
                <div class="number">
                  <div class="min">$ {{ valuem[0] }}</div>
                  <div class="max">$ {{ valuem[1] }}</div>
                </div>
              </template>
              <!--              <template v-else-if="index===3">-->
              <!--                <div class="Screeninglist_content" v-show="!plus_2" v-for="(citem, cindex) in License" :key="cindex">-->
              <!--                  <div class="lowerWord">-->
              <!--                    <div @click="Licensechecks(cindex)">-->
              <!--                      <img :src="a" alt="" v-show="!citem.select"/>-->
              <!--                      <img :src="b" alt="" v-show="citem.select"/>-->
              <!--                      &lt;!&ndash; <i v-show="item.select" class="el-icon-check"></i> &ndash;&gt;-->
              <!--                    </div>-->

              <!--                    {{ citem.name }}-->
              <!--                  </div>-->
              <!--                  &lt;!&ndash; <div class="rootId">{{ item.rootId }}</div> &ndash;&gt;-->
              <!--                </div>-->
              <!--              </template>-->
            </div>


            <!--            <div class="Screeninglists">-->
            <!--              <div class="Screeninglist_title pus">-->
            <!--                &lt;!&ndash; 控制台报错事因为一开始这里没有拿到数据，不存在name这个属性 故，这里把报错 &ndash;&gt;-->
            <!--                <div class="style">{{ selectAllType[0].name }}</div>-->

            <!--                <div class="plus" @click="opens(0)">-->
            <!--                  &lt;!&ndash; <i class="el-icon-plus" v-show="plus_0"></i> &ndash;&gt;-->
            <!--                  <img :src="on" alt="" v-show="!plus_0" />-->
            <!--                  <img :src="offs" alt="" v-show="plus_0" />-->
            <!--                  &lt;!&ndash; <i class="el-icon-minus" v-show="!plus_0"></i> &ndash;&gt;-->
            <!--                </div>-->
            <!--              </div>-->

            <!--              <div class="Screeninglist_content" v-show="!plus_0" v-for="(item, index) in selectAllType[0].data"-->
            <!--                   :key="index">-->
            <!--                <div class="lowerWord">-->
            <!--                  <div class="lowerWord_div" @click="checks(index, 0, item.word)">-->
            <!--                    <img :src="a" alt="" v-show="!item.check"/>-->
            <!--                    <img :src="b" alt="" v-show="item.check"/>-->
            <!--                    &lt;!&ndash; <i v-show="item.check" class="el-icon-check"></i> &ndash;&gt;-->
            <!--                  </div>-->
            <!--                  {{ item.word }}-->
            <!--                </div>-->
            <!--                <div class="rootId">{{ item.productCount }}</div>-->
            <!--              </div>-->
            <!--            </div>-->

            <!--            <div class="Screeninglists">-->
            <!--              <div class="Screeninglist_title">-->
            <!--                <div class="style">{{ selectAllType[1].name }}</div>-->
            <!--              </div>-->

            <!--            </div>-->

            <!--            <div class="Screeninglists">-->
            <!--              <div class="Screeninglist_title">-->
            <!--                <div class="style">{{ selectAllType[2].name }}</div>-->

            <!--                <div class="plus" @click="opens(1)">-->
            <!--                  <img :src="on" alt="" v-show="!plus_1"/>-->
            <!--                  <img :src="offs" alt="" v-show="plus_1"/>-->
            <!--                  &lt;!&ndash; <i class="el-icon-plus" v-show="plus_1"></i>-->
            <!--                  <i class="el-icon-minus" v-show="!plus_1"></i> &ndash;&gt;-->
            <!--                </div>-->
            <!--              </div>-->
            <!--              <div class="Screeninglist_content" v-show="!plus_1" v-for="(item, index) in selectAllType[2].data"-->
            <!--                   :key="index">-->
            <!--                <div class="lowerWord">-->
            <!--                  <div @click="checks(index, 1, item.word)">-->
            <!--                    <img :src="a" alt="" v-show="!item.check"/>-->
            <!--                    <img :src="b" alt="" v-show="item.check"/>-->
            <!--                    &lt;!&ndash; <i v-show="item.check" class="el-icon-check"></i> &ndash;&gt;-->
            <!--                  </div>-->
            <!--                  {{ item.word }}-->
            <!--                </div>-->
            <!--                &lt;!&ndash; <div class="rootId">{{ item.rootId }}</div> &ndash;&gt;-->
            <!--              </div>-->
            <!--            </div>-->

            <!--            <div class="Screeninglists">-->
            <!--              <div class="Screeninglist_title">-->
            <!--                <div class="style">{{ selectAllType[3].name }}</div>-->

            <!--                <div class="plus" @click="opens(2)">-->
            <!--                  <img :src="on" alt="" v-show="!plus_2" />-->
            <!--                  <img :src="offs" alt="" v-show="plus_2" />-->
            <!--                  &lt;!&ndash; <i class="el-icon-plus" v-show="on"></i>-->
            <!--                  <i class="el-icon-minus" v-show="!off"></i> &ndash;&gt;-->
            <!--                </div>-->
            <!--              </div>-->
            <!--              <div class="Screeninglist_content" v-show="!plus_2" v-for="(item, index) in License" :key="index">-->
            <!--                <div class="lowerWord">-->
            <!--                  <div @click="Licensechecks(index)">-->
            <!--                    <img :src="a" alt="" v-show="!item.select"/>-->
            <!--                    <img :src="b" alt="" v-show="item.select"/>-->
            <!--                    &lt;!&ndash; <i v-show="item.select" class="el-icon-check"></i> &ndash;&gt;-->
            <!--                  </div>-->

            <!--                  {{ item.name }}-->
            <!--                </div>-->
            <!--                &lt;!&ndash; <div class="rootId">{{ item.rootId }}</div> &ndash;&gt;-->
            <!--              </div>-->
            <!--            </div>-->

            <!--            <div class="Screeninglists">-->
            <!--              <div class="Screeninglist_title">-->
            <!--                <div class="style">{{ selectAllType[4].name }}</div>-->

            <!--                <div class="plus" @click="opens(3)">-->
            <!--                  <img :src="on" alt="" v-show="!plus_3"/>-->
            <!--                  <img :src="offs" alt="" v-show="plus_3"/>-->
            <!--                  &lt;!&ndash; <i class="el-icon-plus" v-show="plus_3"></i>-->
            <!--                  <i class="el-icon-minus" v-show="!plus_3"></i> &ndash;&gt;-->
            <!--                </div>-->
            <!--              </div>-->
            <!--              <div class="Screeninglist_content" v-show="!plus_3" v-for="(item, index) in selectAllType[4].data"-->
            <!--                   :key="index">-->
            <!--                <div class="lowerWord">-->
            <!--                  <div @click="checks(index, 3, item.word)">-->
            <!--                    <img :src="a" alt="" v-show="!item.check"/>-->
            <!--                    <img :src="b" alt="" v-show="item.check"/>-->
            <!--                    &lt;!&ndash; <i v-show="item.check" class="el-icon-check"></i> &ndash;&gt;-->
            <!--                  </div>-->
            <!--                  {{ item.word }}-->
            <!--                </div>-->
            <!--                <div class="rootId">{{ item.rootId }}</div>-->
            <!--              </div>-->
            <!--            </div>-->

            <!--            <div class="Screeninglists">-->
            <!--              <div class="Screeninglist_title">-->
            <!--                <div class="style">{{ selectAllType[5].name }}</div>-->

            <!--                <div class="plus" @click="opens(4)">-->
            <!--                  <img :src="on" alt="" v-show="!plus_4"/>-->
            <!--                  <img :src="offs" alt="" v-show="plus_4"/>-->
            <!--                  &lt;!&ndash; <i class="el-icon-plus" v-show="plus_4"></i>-->
            <!--                  <i class="el-icon-minus" v-show="!plus_4"></i> &ndash;&gt;-->
            <!--                </div>-->
            <!--              </div>-->
            <!--              <div class="Screeninglist_content" v-show="!plus_4" v-for="(item, index) in selectAllType[5].data"-->
            <!--                   :key="index">-->
            <!--                <div class="lowerWord">-->
            <!--                  <div @click="checks(index, 4, item.word)">-->
            <!--                    <img :src="a" alt="" v-show="!item.check"/>-->
            <!--                    <img :src="b" alt="" v-show="item.check"/>-->
            <!--                    &lt;!&ndash; <i v-show="item.check" class="el-icon-check"></i> &ndash;&gt;-->
            <!--                  </div>-->
            <!--                  {{ item.word }}-->
            <!--                </div>-->
            <!--                &lt;!&ndash; <div class="rootId">{{ item.rootId }}</div> &ndash;&gt;-->
            <!--              </div>-->
            <!--            </div>-->
          </div>
        </div>
      </div>
      <div class="put" @click="put_click" :style="{
        transform: 'translateX(' + $store.state.lw + '})',
        left: $store.state.lw + 'px',
        top: tops + 'rem',
      }">
        <img :style="{ top: tops + 4 + 'rem' }" :src="put" alt=""/>
      </div>
     
      {{linelist.length}}
      <!-- 内容 -->
      <div class="replace" v-if="linelist.length<=0">
        <img :src="notContent" alt="">
        <div class="text1">No results found</div>
        <div class="text2">It seems we can’t find any results based on your search.</div>
      </div>
      <Cell v-if="linelist.length>0" :linelist="linelist" @shou="shou" :contents_x="contents_x" :consHeight="consHeight" :mx="'0.1'"
            :from="'store'" :deleteIcon="false"/>
      <!--      <div class="contents" :class="contents_x" :style="{ height: consHeight + 'px' }">-->
      <!-- 行 -->
      <!--        <div class="numberlist" :class="'numberlist' + index" v-for="(item, index) in linelist" :key="index" :style="{-->
      <!--          left: item.left + 'px',-->
      <!--          top: item.top + 'px',-->
      <!--          width: item.width + 'px',-->
      <!--        }">-->
      <!--        </div>-->
      <!--      </div>-->
    </div>
    <div class="pagination" v-if="this.linelist">
      <el-pagination :current-page.sync="page" @current-change="pagem" layout="prev, pager, next" :page-size="100"
                     :page-count=count>
      </el-pagination>
    </div>
    <Bottom />
  </div>
</template>
<script>
import Message_DetailsVue from "./Message_ Details.vue";
import Bottom from "@/components/BottomNavigation/index";
import {sorting_list} from "@/utils/util";
import Cell from "./Cell";
import Shou from "./Shou";
export default {
  name: "STORE",
  components: {
    Bottom,
    Cell,
    Shou,
    Message_DetailsVue
  },
  // computed: {
  //   world() {
  //     return this.$store.state.world;
  //   }
  // },
  data() {
    return {
      count: 0,
      values: "",
      transform_width: "",
      contents_x: "",
      url: "",
      Filter_img: false,
      sSorts: '',
      from: "recommend",
      // keyword:'',
      name: "",
      drag: "Drag And Drop Image Here",
      topm: 593,
      lefts: 268,
      widths: "cons_b",
      screen_width: 0,
      // widthss: 2.87,
      token: "",
      tops: 1.4,
      valuemx: 0,
      x: 0,
      Licenseup: null,
      Licensechecksvalue: "",
      License: [
        {name: "All license", select: true},
        {name: "Non-Exclusive license", select: false},
        {name: "Exclusive license", select: false},
      ],
      page: 1,
      pageNumber: 0,
      consHeight: 0,
      p: null,
      put: require("@/assets/img/put.png"),
      offs: require("@/assets/img/+.svg"),
      on: require("@/assets/img/-.svg"),
      a: require("@/assets/img/a.svg"),
      b: require("@/assets/img/b.svg"),
      notContent: require("@/assets/img/notContent.png"),
      list: [],
      linelist: [],
      datalists: [],
      listnumber: null, // 列数
      off: true,
      productId: null,
      // 收藏数据
      CollectionList: null,
      CollectionpageSize: 20, //收藏列表的返回的条数
      CollectionpageNum: 1, //收藏数据的第几页

      lin: require("@/assets/img/lin.png"),
      Vector: require("@/assets/img/Vector.svg"), //相机
      Group: require("@/assets/img/Group.svg"), //搜索
      blankImage: require("@/assets/img/blank.svg"),
      selectAllType: [
        {name: ""},
        {name: ""},
        {name: ""},
        {name: ""},
        {name: ""},
        {name: ""},
      ],
      plus_0: false, //筛选点击图标之间的切换
      plus_1: false,
      plus_2: false,
      plus_3: true,
      plus_4: true,
      // typeId: [],//style 筛选结果
      typeId: [],
      sceneId: [],
      seasonId: [], //season  结果
      als: false,
      valuem: [0, 99999],
      priceRange: '',
      loadervm: [],
    };
  },
  computed: {
    screen_item() {
      return this.$store.state.screen_items;
    }
  },

  watch: {
    screen_item: {
      immediate: true,
      deep: true,
      handler: function (newval) {


      },
    },
    '$store.state.fontRate': {
      handler() {
        this.changeSize();
      },
      // deep: true
    },
    // '$store.state.world': {
    //   handler() {
    //     this.SelectPage();
    //   },
    // },
    consHeight() {
    },

    // world(newval) {
    //   this.SelectPage(newval)
    // },
  },
  methods: {
    close_down_img() {
      this.Filter_img = false;
      this.contents_x = "";
    },
    upload() {
      document.getElementsByClassName("el-upload el-upload--text")[0].click();
    },
    jus() {
      console.log(123);
    },
    open_list() {
      this.als = !this.als;
    },
    froms(a) {
      this.als = false;
      switch (a) {
        case "recommend":
          this.from = "recommend";
          this.sSorts = '';
          break;
        case "From new to old":
          this.from = "From new to old";
          this.sSorts = 'sort,desc';
          break;
        case "old to new":
          this.from = "old to new";
          this.sSorts = 'sort,asc';
          break;
      }

      this.SelectPage();
    },
    lp() {
      let s = document.getElementsByClassName("el-upload")[0];

      s.style.display = "none";
    },
    details(a, b) {
      // localStorage.productId = a;
      // localStorage.imgSn = b;
      // this.$router.push("/details?id="+a);

      const routeUrl = this.$router.resolve({
        path: "/detail/" + a
      });

      window.open(routeUrl.href, "_blank");

    },
    put_click() {
      if (this.widths == "cons_a") {
        this.widths = "cons_b";
      } else {
        this.widths = "cons_a";
      }
      this.changeSize();
    },
    changeSize() {
      if (this.widths == "cons_b") {
        this.transform_width = 0;
        document.getElementsByClassName("Screening")[0].style.marginLeft = "0";

      } else {
        this.transform_width = this.$store.state.lw;
        document.getElementsByClassName("Screening")[0].style.marginLeft = -this.$store.state.lw + "px";
      }

      sorting_list(this.p, this);
    },
    yesdata(res) {
      this.p = res.data;

      if (this.p == undefined) {
        this.linelist = "";
        this.consHeight = 0;
      } else {
        sorting_list(this.p, this);
      }
    },
    // 点击上传图片或者拖拽上传图片完成后的图片展示
    // changes(file) {

    //   this.url = URL.createObjectURL(file.raw);
    // },
    uploadm(a, b) {
      this.url = URL.createObjectURL(b.raw);
      this.drag = b.name;
      document.getElementsByClassName(
          "el-upload el-upload--text"
      )[0].style.display = "none";

      this.Filter_img = true;
      this.contents_x = "contents_x";
    },
    uploads() {
      let s = document.getElementsByClassName("el-upload")[0];
      if (this.$store.state.screen.upload_display % 2 == 0) {
        s.style.display = "block";
      } else {
        s.style.display = "none";
      }
      this.$store.state.screen.upload_display++;
    },
    Pricechange() {
      // console.log(this.valuem);

      if (this.valuem[1] >= this.valuemx && this.valuem[0] == 0) {
        this.priceRange = '';
      } else {
        this.priceRange = this.valuem.join(',');
      }

      this.SelectPage();
    },
    pagem() {
      // console.log(this.page);
      // _gaq.push(['_trackPageview', '/my-page-2']);
      // gtag('_trackPageview', '/screen/'+(this.page-1));


      this.SelectPage(this.page)

      // this.p = this.loadervm[this.page - 1]
      //
      // if (!this.p) {
      //   this.linelist = "";
      //
      //   this.consHeight = 0;
      // } else {
      //   this.sorting_list(this.p);
      // }
    },
    SelectPage(page, first) {
      let vm = this;

      page == undefined ? page = 1 : "";
      vm.page = page;
      let w = '';

      // if (it!=null){
      //   this.typeId = [it.id]
      // }
      if (this.$store.state.world)
        w = this.$store.state.world;

      let p = {
        priceRange: vm.priceRange,
        // productFicationId: "",
        // styleId: this.typeId.join(),
        // styleId: "",
        // sceneId: this.sceneId.join(),
        // seasonId: this.seasonId.join(),
        // brandId: "",
        // writerIds: "",
        sSorts: this.sSorts,
        // imgType: this.Licensechecksvalue,
        strSearchKeyword: w,
        iDisplayStart: (page - 1) * 100,
        iDisplayLength: 100,
      }

      let ids = [];
      vm.list.forEach((item, index) => {
        if (typeof p[item.t] !== "undefined" && p[item.t] != null && p[item.t] != '') {
          p[item.t] += ',' + item.d;
        } else {
          p[item.t] = item.d;
        }
        ids.push(item.d);
      });

      this.rq({
        url: "/api/product/selectPage",
        method: "post",
        param: p,
        onError: function () {
        },
        vm,
      }).then((res) => {
        if (res.code == 200) {

          if (vm.p) {
            vm.p.forEach(function (item, i) {
              item.cover = vm.blankImage;
            });
          }

          if (!res.data.aaData) {
            vm.linelist = "";
            vm.consHeight = 0;
            return
          }

          vm.p = res.data.aaData;

          vm.count = Math.ceil(res.data.iTotalRecords / 100)
          if (!vm.count) {
            vm.linelist = "";
            vm.consHeight = 0;
            return
          }

          // for (let index = 0; index < vm.count; index++) {
          //   vm.loadervm.push(res.data.aaData.splice(0, 100))
          // }

          // vm.p = vm.loadervm[vm.page - 1]
          // if (vm.p == undefined) {
          //   vm.linelist = "";
          //
          //   vm.consHeight = 0;
          //   return
          // } else {
          //   vm.sorting_list(vm.p);
          // }

          sorting_list(vm.p, vm);
          // vm.sorting_list(vm.p);
          document.documentElement.scrollTop = document.body.scrollTop = 0;
        } else {
          //
          this.$message({
            message: res.desc,
            type: 'error',
            showClose: true,
            customClass: 'dd'
          });
        }
      });

      if (!first) {
        let p = {
          path: '/store',
          query: {}
        };

        console.log(page)
        if (page > 1) {
          p.query['page'] = page - 1;
        } else {
          delete p.query['page'];
        }
        if (w != '')
          p.query['q'] = w;
        if (vm.sSorts)
          p.query['sSorts'] = vm.sSorts;
        if (vm.priceRange)
          p.query['priceRange'] = vm.priceRange;
        if (vm.Licensechecksvalue !== undefined && vm.Licensechecksvalue !== null && vm.Licensechecksvalue !== '') {
          p.query['imgType'] = vm.Licensechecksvalue;
        }

        if (ids.length > 0) {
          ids = ids.sort();
          p.query['ids'] = ids.join();
        }

        let href = this.$router.resolve(p).href;

        if (href != vm.$route.fullPath) {
          vm.$router.push(p)
          gtag('config', 'G-44ZHJKBJ89', {
            'page_title': 'User registration',
            'page_path': href
          });
        }
      }
    },
    checks(i, j, c) {
      const _this = this;
      _this.close_down_img();

      const menu = [..._this.selectAllType];
      let lab = menu[i].data[j];
      if (lab) {
        if (lab.check) {
          lab.check = false;

          const tlist = [..._this.list];
          _this.list = tlist.filter(item => item.i !== i || item.j !== j);

        } else {
          if (menu[i].name == 'License type') {
            const tlist = [..._this.list];
            _this.list = tlist.filter(item => item.i !== i);

            menu[i].data.forEach(function (item, index) {
              if (index != j) {
                item.check = false;
              } else {
                item.check = true;

                if (item.id !== '') {
                  _this.list.push({
                    i: i,
                    j: j,
                    e: lab.word,
                    d: lab.id,
                    t: lab.rootName,
                  });
                }
              }
            });

          } else {
            lab.check = true;
            const t = _this.list.find(item => item.i !== i && item.j == j);
            if (!t) {
              _this.list.push({
                i: i,
                j: j,
                e: lab.word,
                d: lab.id,
                t: lab.rootName,
              });
            }
          }
        }
        _this.selectAllType = menu;
    
        this.SelectPage();
      }

    },
    opens(index) {
      this.selectAllType[index].plus = !this.selectAllType[index].plus;
   
     
    },
    shou(pd) {
      this.$refs.shou.shou(pd);
    },
    clearlist(a, e) {
      const _this = this;
      // this.typeId.remove(this.list[index]);

      _this.selectAllType[e.i].data[e.j].check = false;
  
      const tlist = [..._this.list];
      _this.list = tlist.filter((item, index) => index !== a);
      _this.SelectPage();

     
      
      // this.list.splice(a, 1);
    },
    // 首页点击筛选跳转过来的
    ops() {
      if (this.$store.state.option !== "") {
        let has = false;
        for (
            let index = 0;
            index < this.selectAllType[4].data.length;
            index++
        ) {
          switch (this.$store.state.option) {
            case this.selectAllType[4].data[index].word:
       
              has = true;
              this.opens(3);
              this.checks(index, 3, this.selectAllType[4].data[index].word);
              break;
          }
        }

        if (!has) {
          this.$store.state.world = this.$store.state.option
        }
      }
    },
    popstate() {
      const _this = this;

      let labels = [];
      // if (_this.$store.state.option !== "") {
      //   labels.push(_this.$store.state.option)
      // }

      if (_this.$route.query.ids && _this.$route.query.ids != null) {
        labels = _this.$route.query.ids.split(",");
      }

      if (typeof _this.$route.query.sSorts !== undefined) {
        _this.sSorts = _this.$route.query.sSorts;
      }
      if (typeof _this.$route.query.priceRange !== undefined && _this.$route.query.priceRange != null) {
        _this.valuem = _this.$route.query.priceRange.split(",");
      }
      if (typeof _this.$route.query.q !== undefined) {
        _this.$store.state.world = _this.$route.query.q;
      } else {
        _this.$store.state.world = '';
      }

      _this.list = [];

      _this.selectAllType.forEach(function (item, idx) {
        if (item.name != 'Price') {
          item.data.forEach(function (citem, cidx) {
            if (labels.indexOf(citem.id) >= 0) {
              citem.check = true;

              _this.list.push({
                i: idx,
                j: cidx,
                e: citem.word,
                d: citem.id,
                t: citem.rootName
              });
            } else {
              citem.check = false;
            }
          });
        }
      });

    

      _this.SelectPage(+_this.$route.query.page + 1, true);
  
    }
  },
  destroyed() { // 销毁vm组件
    console.log("destroyed")

    window.removeEventListener('popstate', this.popstate, false);
  },
  created() {
    if (this.$route.query.option==='1'){
      this.froms('From new to old')
    }

    // if (!localStorage.token) {
    //   this.$router.push("/");
    // }

    let vm = this;
    window.addEventListener('popstate', this.popstate, false);

    Array.prototype.minindex = function (arr) {
      var min = arr[0];
      var index = 0;
      for (var i = 0; i < arr.length; i++) {
        if (min > arr[i]) {
          min = arr[i];
          index = i;
        }
      }
      return index;
    };
    Array.prototype.max = function () {
      var max = this[0]; //将第一个值设置为最大值
      var len = this.length;
      for (var i = 1; i < len; i++) {
        if (this[i] > max) {
          max = this[i];
        }
      }
      return max;
    };


  },
  mounted() {

    console.log("mounted")

    let vm = this;
    this.$store.state.Navigation_in = "Navigation_up";
    this.token = window.localStorage.token;
    this.sSorts = '';
  
    if (this.$store.state.screen_items != null) {
      this.typeId = [this.$store.state.screen_items.tagId]
    }
   

    let ptype = localStorage.getItem("product_type");
    if (!ptype) {

      res.data.forEach(function (item, idx) {
        if (item.name == 'Price') {
          vm.valuem[1] = vm.valuemx = item.data.maxPrice;
          item.plus = true;
        } else if (item.name == 'License type') {
          item.data = [
            { id: '', word: "All license", rootName: 'imgType', check: true },
            { id: 0, word: "Non-Exclusive license", rootName: 'imgType', check: false },
            { id: 3, word: "Exclusive license", rootName: 'imgType', check: false },
          ]
          item.plus = false;
        } else {
          if (idx > 3)
            item.plus = true;
          else
            item.plus = false;
          item.data.forEach(function (citem, cidx) {
            citem.check = false;
          })
        }
      });
   
      vm.selectAllType = res.data;
      localStorage.setItem('product_type', JSON.stringify(vm.selectAllType));

      vm.popstate();

    } else{
      this.rq({
        url: "/api/product/selectAllType",
        method: "get",
        param: {},
        onError: function () {
        },
        vm,
      }).then((res) => {

        if (res.code == 200) {

          res.data.forEach(function (item, idx) {
            if (item.name == 'Price') {
              vm.valuem[1] = vm.valuemx = item.data.maxPrice;
              item.plus = true;
            } else if (item.name == 'License type') {
              item.data = [
                {id: '', word: "All license", rootName: 'imgType', check: true},
                {id: 0, word: "Non-Exclusive license", rootName: 'imgType', check: false},
                {id: 3, word: "Exclusive license", rootName: 'imgType', check: false},
              ]
              item.plus = false;
            } else {
              if (idx > 3)
                item.plus = true;
              else
                item.plus = false;
              item.data.forEach(function (citem, cidx) {
                citem.check = false;
              })
            }
          });
  
          vm.selectAllType = res.data;

          localStorage.setItem('product_type', JSON.stringify(vm.selectAllType));

          vm.popstate();

        } else {
          //
          this.$message(res.desc);
        }
      });
    }


    window.onscroll = () => {
      let scrolltop =
          document.documentElement.scrollTop || document.body.scrollTop;
      let windowHeight =
          document.documentElement.clientHeight || document.body.clientHeight;
      let scrollHeight =
          document.documentElement.scrollHeight || document.body.scrollHeight;

      let footerHeight = 3.5 * vm.$store.state.fontRate;

      if (windowHeight + footerHeight > scrollHeight - scrolltop) {
        // 到了底部之后想做的操作,如到了底部之后加载
        this.tops = (scrollHeight - scrolltop - windowHeight - footerHeight) / 100;
        this.topm = scrollHeight - scrolltop - windowHeight + 228;
      } else {
        this.topm = 593;
        this.tops = 1.4;
      }
    };

    // this.changeSize();

    // window.onresize = () => {
    //   // console.log(1);
    //   let slistnumber = (document.documentElement.clientWidth - 287) / 257;
    //   vm.listnumber = Math.floor(slistnumber);
    //   this.clientWidth = document.documentElement.clientWidth;
    // };
    //看一下首页是否点击跳转筛选
  },
};
</script>
<style lang="less" scoped>
.transform_width {
  transform: translate(-100%);
}

//@keyframes stow {
//  0% {
//    margin-left: 0%;
//  }
//
//  100% {
//    margin-left: -screen_width;
//  }
//}
//
//@keyframes resove_stow {
//  0% {
//    margin-left: -15%;
//  }
//
//  100% {
//    margin-left: 0%;
//  }
//}

.number {
  display: flex;
  font-family: "PingFang SC";
  font-style: normal;
  font-weight: 700;
  font-size: 0.14rem;
  line-height: 0.2rem;

  .min {
    width: 100%;
  }

  .max {
    text-align: right;
    width: 100%;
  }
}

.lowerWord_div_text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 1.6rem;
}

.screen {

  background: #f7f9fd;

  .Filter_img {
    width: 100%;
    height: 3.4rem;
    // margin-top: 0.7rem;
    position: relative;
    z-index: 2;

    img {
      object-fit: cover;
      border-radius: 0.14rem;
      width: 3.2rem;
      height: 3.2rem;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translateX(-50%) translateY(-50%);
    }
  }

  .titles {
    margin-top: -0.2rem;
    padding-top: 0.2rem;
    height: 0.66rem;
    width: 100%;
    min-width: 960px;
    z-index: 2;
    background: #f7f9fd;
    position: fixed;
  }

  .ttile {
    transition: transform 0.3s cubic-bezier(0.23, 1, 0.32, 1),
    box-shadow 0.3s cubic-bezier(0.23, 1, 0.32, 1);
    background: #f7f9fd;
    /*position: fixed;*/
    /*display: flex;*/
    min-height: 0.66rem;
    /*width: 100%;*/
    line-height: 0.46rem;
    font-family: "PingFang SC";
    font-style: normal;
    font-weight: 400;
    font-size: 0.24rem;
    margin-top: -0.03rem;
    box-sizing: border-box;
    padding-left: 3.6rem;
    padding-right: 0.14rem;
    color: #707070;
    z-index: 1;

    .Pattern {
      max-width: 13.44rem;
      overflow: hidden;
      transition: transform 0.3s cubic-bezier(0.23, 1, 0.32, 1),
      box-shadow 0.3s cubic-bezier(0.23, 1, 0.32, 1);
      padding-top: 0.13rem;

      .model_div {
        margin-left: 0.28rem;
        display: inline-block;
        position: relative;

        .model_icon {
          display: inline-block;
          transform: translateY(-0.108rem);
          font-size: 0.14rem;
        }

        .model {
          display: inline-block;
          background-color: #dddeff;
          font-family: "PingFang SC";
          font-style: normal;
          font-weight: 400;
          font-size: 0.14rem;

          color: #222222;
          border-radius: 0.18rem;
          padding-left: 0.16rem;
          padding-right: 0.16rem;
          height: 0.36rem;
          line-height: 0.36rem;
        }
      }
    }

    .from:hover {
      border: 1px solid #222;
    }

    .from:active {
      border: 1px solid #222;
    }

    .from {
      position: absolute;
      top: 0;
      padding-right: 0.4rem;
      cursor: pointer;

      img {
        position: absolute;
        right: 0.1rem;
        top: 50%;
        transform: translateY(-50%);
      }

      right: 0.14rem;
      margin-top: 0.38rem;
      font-family: "PingFang SC";
      font-style: normal;
      font-weight: 700;
      font-size: 0.14rem;
      color: #222222;
      min-width: 1.6rem;
      height: 0.36rem;
      border: 1px solid #d5d5d5;
      text-align: left;
      box-sizing: border-box;
      padding-left: 0.13rem;
      line-height: 0.36rem;
      border-radius: 0.18rem;

      .als {
        position: absolute;
        width: 1.6rem;
        // height: 1.64rem;
        left: 0rem;
        top: 0.42rem;
        background: #f7f9fd;
        border: 1px solid #c4c4c4;
        border-radius: 0.08rem;
        box-sizing: border-box;
        padding-left: 0.08rem;
        padding-right: 0.08rem;

        div {
          width: 1.44rem;
          height: 0.36rem;
          line-height: 0.36rem;
          border-radius: 0.04rem;
          margin-top: 0.08rem;
          margin-bottom: 0.12rem;
          box-sizing: border-box;
          padding-left: 0.16rem;
          //text-align: 0.36rem;
          font-family: "PingFang SC";
          font-style: normal;
          font-weight: 400;
          font-size: 0.14rem;
          color: #222;
        }

        div:hover {
          cursor: pointer;
          background: #373acb;
          color: #fff;
        }
      }
    }
  }

  .cons_a {
    // animation: tran 1s;
  }

  .cons_b {
  }

  .cons {
    min-height: calc(100vh - 0.7rem);
    //min-height: 9rem;
    // width: 287px;
    display: flex;

    .cons_title {
      transition: transform 0.3s cubic-bezier(0.23, 1, 0.32, 1),
      box-shadow 0.3s cubic-bezier(0.23, 1, 0.32, 1);
      position: fixed;
      // top: 0.79rem;rem
      // padding-top: 0.79rem;
      box-sizing: border-box;
      padding-top: 0.35rem;
      left: 0.11rem;
      top: 0.7rem;
      z-index: 2;
      height: 0.66rem;
      width: 2.5rem;
      background: #f8f9fd;
      font-family: "PingFang SC";
      font-style: normal;
      font-weight: 400;
      font-size: 0.24rem;
      margin-top: -0.03rem;
      color: #707070;
    }

    .Screening_a {
      animation: puts 2s;
      animation-fill-mode: forwards;
    }

    .Screening_b {
      animation: puts_re 2s;
      animation-fill-mode: forwards;
    }

    .Screening_c {
      animation: puta 2s;
      animation-fill-mode: forwards;
    }

    .Screening_d {
      animation: putb 2s;
      animation-fill-mode: forwards;
      pointer-events: none;
    }

    .put {
      transition: transform 0.3s cubic-bezier(0.23, 1, 0.32, 1),
      box-shadow 0.3s cubic-bezier(0.23, 1, 0.32, 1);
      // width: 0.2rem;

      // position: absolute;
      img {
        position: fixed;
        top: 50%;
        width: 0.3rem;
        margin-left: -0.1rem;
        cursor: pointer;
        /*transform: translateY(42%) translateX(-50%);*/
      }
    }

    .Screening {
      transition: margin-left 0.3s cubic-bezier(0.23, 1, 0.32, 1),
      box-shadow 0.3s cubic-bezier(0.23, 1, 0.32, 1);
      height: 100%;
      padding-left: 0.14rem;
      position: relative;

      .Screening_div {
        transition: transform 0.3s cubic-bezier(0.23, 1, 0.32, 1),
        box-shadow 0.3s cubic-bezier(0.23, 1, 0.32, 1);
        overflow: hidden;
        /*height: 80%;*/
        // width: 287px;
        font-size: 0.14rem;
        position: fixed;
        z-index: 2;

        height: calc(100vh - 1.6rem);
      }

      .Screeninglist::-webkit-scrollbar {
        display: none;
      }

      .Screeninglist {
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
        margin-top: 0.08rem;
        overflow-x: hidden;
        overflow-y: auto;
        /*max-height: 7.5rem;*/
        height: calc(100% - 0.5rem);

        border-radius: 0.14rem;
        border: 1px solid #f1f1f1;
        background: #fff;
        box-sizing: border-box;
        padding: 0.16rem;
        padding-top: 0;

        .Screeninglists {
          position: relative;
          border-bottom: 1px dashed #d5d5d5;
          padding-bottom: 0.1rem;
        }

        .Screeninglist_title {
          margin-top: 0.2rem;

          display: flex;
          margin-bottom: 0.1rem;

          .style {
            width: 100%;
            font-family: "PingFang SC";
            font-style: normal;
            font-weight: 700;
            font-size: 0.16rem;
            line-height: 0.22rem;
          }

          .plus {
            width: 0.2rem;
            height: 0.2rem;

            line-height: 0.2rem;

            border-radius: 0.04rem;
            text-align: right;

            > img {
              height: 100%;
              cursor: pointer;
            }
          }
        }

        .pus {
          margin-top: 0rem !important;
        }

        .Screeninglist_content {
          // visibility: hidden;
          display: flex;
          font-family: "PingFang SC";
          font-style: normal;
          font-weight: 400;
          font-size: 0.14rem;
          line-height: 0.2rem;
          /* identical to box height */
          margin-bottom: 0.08rem;
          // text-transform: capitalize;
          justify-content: space-between;

          .lowerWord {
            .lowerWord_div:hover {
              cursor: pointer;
            }

            overflow: hidden;
            padding-right: 0.2rem;
            display: flex;
            white-space: nowrap;

            div {
              // border: 1px solid #d5d5d5;
              border-radius: 0.04rem;
              width: 0.14rem;
              height: 0.21rem;
              position: relative;
              line-height: 0.27rem;
              margin-right: 0.08rem;
              font-size: 0.14rem;

              img {
                // margin-top: 0.05rem;
                width: 0.16rem;
                height: 0.16rem;
              }

              i {
                width: 100%;
                height: 100%;
                position: absolute;
                left: -0.02rem;
                top: -0.02rem;
                color: #373acb;
              }
            }
          }

          .rootId {
            width: 0.6rem;

            right: 0rem;
            text-align: right;
            // width: 100%;
          }
        }
      }

      .SearchFilter {
        height: 0.5rem;
        border-radius: 0.25rem;

        box-sizing: border-box;
        padding-right: 0.75rem;
        padding-left: 0.2rem;
        background: #ffffff;
        border: 1px solid #f1f1f1;
        position: relative;

        .Vector {
          transform: translateY(25%);
          position: absolute;
          right: 0.61rem;
          top: 0.1rem;
          height: 0.2rem;
        }

        .Group {
          right: 0.02rem;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          margin-left: 0.07rem;
          width: 0.44rem;
          height: 100%;
        }


        .Group:hover {
          cursor: pointer;

          rect {
            fill: #5F61D5;
          }
        }

        .Group:active {
          rect {
            fill: #2C2EA2;
          }
        }

        .SearchFilter_input {
          height: 100%;
          border: none;
          outline: none;
        }

        > img {
          cursor: pointer;
        }
      }
    }

    .contents_x {
      margin-top: 0.24rem !important;
    }

  }

  .pagination {
    //margin-left: 12.87;
    right: 0rem;
    width: 1rem;
  }
}

/deep/ .el-pagination {
  position: absolute;
  right: 1.72rem;
}

/deep/ .btn-prev {
  background: rgba(0, 0, 0, 0) !important;
}

/deep/ .btn-next {
  background: rgba(0, 0, 0, 0) !important;
}

/deep/ .el-pager li :hover {
  color: #222222 !important;
}

/deep/ .active {
  background: #222222 !important;
  color: #ffffff !important;
  border-radius: 0.05rem;
}

/deep/ .el-slider__bar {
  background: #373acb !important;
}

/deep/ .el-upload--text {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
}

/deep/ .el-button--small {
  display: none !important;
}

/deep/ .el-upload__tip {
  display: none !important;
}

/deep/ .el-slider__button-wrapper {
  font-size: 0.14rem;
}

/deep/ .el-upload {
  display: none;
  width: 10.5rem !important;
  height: 3.43rem !important;
  background: #fff;
}

/deep/ .el-upload-dragger {
  width: 100% !important;
  height: 100% !important;
  border: none;
  position: absolute;
  left: 50%;
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.25);
  border-radius: 0.14rem;
  transform: translate(-50%);
  overflow: inherit !important;

  .noos {
    width: 9.86rem;
    height: 2.06rem;
    border-radius: 0.08rem;
    border: 1px dashed #ccc;
    position: absolute;
    left: 50%;
    top: 0.48rem;
    transform: translateX(-50%);
  }
}

/deep/ .el-upload__text {
  width: 1.75rem;
  height: 0.41rem;

  background: #373acb;
  border-radius: 0.2rem;
  line-height: 0.41rem;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: -0.57rem;
  color: #fff !important;
  cursor: pointer;
}

/deep/ .el-upload__text:hover {
  background: #5F61D5;;
}

/deep/ .el-upload__text:active {
  background: #2C2EA2;;
}

/deep/ .el_test {
  font-family: "PingFang SC";
  font-style: normal;
  font-weight: 400;
  font-size: 0.14rem;
  line-height: 2.22rem;
  position: relative;
  text-transform: capitalize;

  color: #c4c4c4;
}

/deep/ .el-slider__button {
  background: #373acb !important;

  border: 1px solid #ffffff;
}

.lpus {
  position: absolute;
  font-size: 0.2rem;
  right: -0.2rem;
  top: -0.36rem;
  cursor: pointer;
  color: #515a6e !important;
}

.lpus:hover {
  color: #373acb !important;
  cursor: pointer;
}
.replace{
  padding-top: 2.71rem;
  padding-right: 2.1rem;
  width: 98%;
  transform: translateX(2%);
  text-align: center;

  .text1{
    font-family: 'Inter';
      font-style: normal;
      font-weight: 500;
      font-size: 0.24rem;
      line-height: 0.29rem;
      color: #222222;
  }
  .text2{
    font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 400;
      font-size: 0.14rem;
      line-height: 0.2rem;
      padding-top: 0.1rem;
      color: #222222;
  }


}
</style>
