<template>
    <div class="fashion">
        <div class="title">
            <div class="title_head1">Fashion Trend</div>
            <div class="title_head2">Get information on current printing trends for free</div>
        </div>
        <div class="content">
            <div class="contentss" v-for="(item, index) in fashion_list" :key="index">
         
                <div class="content_fa" v-for="(items, indexs) in item" :key="indexs">
                    <div class="content_img" v-if="items.coverSrc ">
                        <img :src="('http://www.patternbuy.com'+items.coverSrc)" alt="">
                    </div>
                    <div class="content_text">
                        <div class="content_text_title">{{ items.title }}</div>
                        <div class="content_text_content">{{ items.content }}</div>
                        <div class="content_text_download" v-if="items.title">Download <img :src="download" alt=""></div>
                    </div>
                </div>
            </div>
          
        </div>
        <Buttom />
    </div>
</template>
<script>
import Buttom from "@/components/BottomNavigation"
export default {
    components: {
        Buttom
    },
    name: 'APP',
    data() {
        return {
            fashion_list: [],
            download: require("@/assets/img/downloads.svg"),
            jia_data: [
                {
                    img: require("@/assets/img/jia_img.png"),
                    bgcolor: "#f40",
                    title: "Design Trend Report: Fall 2022",
                    content: 'Trends give us a hint of the underlying patternsinspiring creative professionals around the globe.As we ve mentioned here before, design trends are meant to serve as starting points to kickstart your own cre...',
                    identification: "1"
                }
            ],
        }
    },
    methods: {
    },
    created() {
        let vm=this;
        this.rq({
            url: "/api/product/selectTrendPage" ,
            method: "post",
            param: {
                iDisplayLength:100,
                iDisplayStart:1
            },  
            onError: function () {
            },
            vm: null,
        }).then((res) => {
            if (res.code == 200) {
                vm.jia_data = res.data.aaData
                if (vm.jia_data.length % 2 == 1) {
                    vm.jia_data.push({})
                }
                let p = vm.jia_data.length / 2
                for (let index = 0; index < p; index++) {
                    vm.fashion_list.push(vm.jia_data.splice(0, 2))
                }
            } else {
                //
                this.$message(res.desc);
            }
        });



    
     
    },
    mounted() {
    },
}
</script>
<style lang="less" scoped>
.fashion {
    min-height: 10.8rem;
  
    line-height: 0.14rem;

    .title {
        width: 100%;
        height: 1.2rem;
        background: linear-gradient(90.52deg, #FFDDCD 6.74%, #F5C0D3 50.45%);
        text-align: center;

        .title_head1 {
            font-family: 'Pridi';
            font-style: normal;
            font-weight: 600;
            font-size: 0.32rem;
            line-height: 0.50rem;
            color: #222222;
            padding-top: 0.25rem;
        }

        .title_head2 {
            font-family: 'PingFang SC';
            font-style: normal;
            font-weight: 400;
            font-size: 0.14rem;
            line-height: 0.20rem;
            color: #222222;
        }
    }

    .content {
        width: 100%;
     min-height: 5rem;

        .contentss {
    
            display: flex;
            justify-content:center;
            padding-top: 0.24rem;

            .content_fa {

                width: 6.12rem;
                display: flex;
                justify-content: center;

                .content_img {
                    width: 2.12rem;
                    height: 1.59rem;

                    img {
                        width: 100%;
                        height: 100%;
                    }
                }

                .content_text {
                    padding-top: 0.16rem;
                    padding-left: 0.16rem;
                    text-align: left;

                    .content_text_title {
                        font-family: 'PingFang SC';
                        font-style: normal;
                        font-weight: 600;
                        font-size: 0.16rem;
                        line-height: 0.22rem;
                        color: #222222;
                        padding-bottom: 0.08rem;
                    }

                    .content_text_content {
                        font-family: 'PingFang SC';
                        font-style: normal;
                        font-weight: 400;
                        font-size: 0.15rem;
                        line-height: 0.21rem;
                        color: #222;
                        padding-right: 0.24rem;
                        height: 0.63rem;
                        overflow: hidden;
                    }

                    .content_text_download {
                        margin-top: 0.08rem;
                        display: flex;
                        justify-content: center;
                        width: 1.3rem;
                        height: 0.4rem;
                        border: 0.01rem solid;

                        border-color: #FC49E2 #0057FF;
                        background: #FFFFFF;
                        border-radius: 0.2rem;
                        // text-align: center;
                        line-height: 0.4rem;
                        font-family: 'PingFang SC';
                        font-style: normal;
                        font-weight: 500;
                        font-size: 0.14rem;
                        color: #373ACB;

                        // display: table;
                        img {
                            width: 0.2rem;
                            color: #373ACB;
                            margin-left: 0.08rem;

                        }
                    }
                }
            }
        }

    }
}
</style>
