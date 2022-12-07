<template>
    <div class="root">

        <div class="titles">
            <img :src="about_list[0]" alt="">
            <p>About us</p>
        </div>
        <div class="about_2">
            <img :src="about_list[1]" alt="" />
            <div class="about_2_p">
                Patternbuy is a global online marketplace for design resources include textile design, graphic design
                and illustration.
                Our company is registered in Hong Kong at 2022, and we have offices in many cities around the world.
            </div>
        </div>
        <div class="oblique">
            <img :src="about_list[3]" alt="">
        </div>
        <div class="about_list_3">
            <img :src="about_list[2]" alt="">
            <div>
                Our team has many years of offline design service experience in the field of fashion and hometextile. Our mission is to
                create a safe and reliable platform for designers and customers, so that customers can get the latest and best design
                works.
            </div>
        </div>
        <div class="swipers">
            <div class="titleX">Working Process</div>

            <div @mouseover="ru" @mouseout="chu" > 
                <swiper class="swiper" :options="swiperOption">
                    <swiper-slide v-for="(item,index) in seiper_list" :key="index">
                        <img :src="item" alt="">
                    </swiper-slide>

                    <!-- <div class="swiper-pagination" slot="pagination"></div> -->
                </swiper>
            </div>
        </div>
        <div class="group">
            <div class="titles">Featured Category</div>
            <div v-for="(item,index) in group_list" :key="index">
                <img :src="item" alt="">
            </div>
            <div class="Pantone">
                <div class="texts">patternbuy X Pantone</div>
                <div class="content">patternbuy global VP Francesco Tomasello VP of global sales at Pantone
                    Mr. Tomasello visited patternbuy and reached a strategic cooperation</div>
                <div class="img">
                    <img :src="groupx" alt="">
                </div>
            </div>
        </div>
        <div class="frame">
            <div class="title">
                USED & TRUSTED BY
            </div>
            <div class="frame_img" v-for="(item,index) in frame_list" :key="index">
                <img :src="item" alt="">
            </div>
        </div>
        <Bottoms></Bottoms>
    </div>
</template>
<script>
import Bottoms from "@/components/BottomNavigation/index.vue"
export default {
    name: 'APP',
    components: {
     
        Bottoms
    },
    data() {
        return {
            swiperOption: {
                slidesPerView: 3.2,
                spaceBetween: 30,
                slidesPerGroup: 2,
                loop: true,
                loopFillGroupWithBlank: true,
                autoplay: {
                    pauseOnMouseEnter: true,
                    delay: 2000,
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                }
            },
            seiper_list: [
                require("@/assets/img/cl_1.png"),
                require("@/assets/img/cl_2.png"),
                require("@/assets/img/cl_3.png"),
                require("@/assets/img/cl_4.png"),
            ],
            about_list: [
                require("@/assets/img/about_1.png"),
                require("@/assets/img/about_2.png"),
                require("@/assets/img/about_3.png"),
                require("@/assets/img/about_4.png"),

            ],
            group_list: [
                require("@/assets/img/group_1.png"),

                require("@/assets/img/group_3.png"),
                require("@/assets/img/gruop_2.png"),

            ],
            groupx: require("@/assets/img/group_x.png"),
            frame_list:[
                require("@/assets/img/frame_0.png"),
                require("@/assets/img/frame_1.png"),
            ]
        }
    },
    methods: {
        ru(){

          document.getElementsByClassName("swiper-container")[0].swiper.autoplay.stop();
            
        },
         chu() {
             document.getElementsByClassName("swiper-container")[0].swiper.autoplay.start();

        }
    },
    created() {
    },
    mounted() {
    //  let s=  document.getElementsByClassName("swiper-container")[0]
    // //  debugger
    //    s.hover(function () {
    //         swiper.autoplay.stop();
    //     }, function () {
    //         swiper.autoplay.start();
    //     });
    // $('.swiper-container').hover(function(){
	// 	swiper.autoplay.stop();
	// },function(){
	// 	swiper.autoplay.start();
	// });
    },
}
</script>
<style lang="less" scoped>
.root {
    line-height: 0;
    min-width: 1200px;
    overflow: hidden;

    .titles {
        width: 100%;
        position: relative;


        img {
            width: 100%;
        }

        p {
            width: 100%;
            top: 0;
            position: absolute;
            line-height: 6.42rem;
            text-align: center;
            font-family: 'Barlow';
            font-style: normal;
            font-weight: 700;
            font-size: 0.40rem;
            color: #FFFFFF;
        }
    }

    .about_2 {
        padding-left: 2.67rem;
        transform: translateY(-4.7rem);

        img {
            width: 100%;
        }

        .about_2_p {

            width: 4.77rem;
            font-family: 'PingFang SC';
            font-style: normal;
            font-weight: 400;
            font-size: 0.24rem;
            line-height: 0.34rem;
            text-align: center;
            top: 5.39rem;
            left: 4.72rem;
            position: absolute;
            color: #FFFFFF;
        }
    }

    .oblique {
        width: 100%;
        margin-top: -19.5rem;

        img {
            width: 100%;
            z-index: -1;

        }

    }

    .about_list_3 {

        margin-top: -16rem;
        padding-left: 1.6rem;
        padding-right: 1.6rem;
        padding-bottom: 1.2rem;
position: relative;
        img {
            width: 100%;
        }
        div{
            width: 3.5rem;
            font-family: 'PingFang SC';
                font-style: normal;
                font-weight: 400;
                font-size: 0.20rem;
                line-height: 0.28rem;
                text-align: center;
                color: #FFFFFF;
                position: absolute;
                top: 2.6rem;
                left: 7.9rem;
        }
    }

    .swipers {
        width: 100%;
        height: 5.02rem;
        background: #F1F1F1;

        .titleX {
            width: 100%;
            height: 1.6rem;
            text-align: center;
            line-height: 1.6rem;
            font-family: 'Barlow';
            font-style: normal;
            font-weight: 800;
            font-size: 0.4rem;
            color: #222222;
        }

        img {
            width: 5.68rem;
            height: 3.2rem;
        }
    }

    .group {
        padding-top: 1.02rem;
        padding-left: 3.31rem;
        padding-right: 3.31rem;

        .titles {
            font-family: 'Barlow';
            font-style: normal;
            font-weight: 800;
            font-size: 0.40rem;
            line-height: 0.48rem;
            color: #222222;
            text-align: center;
        }

        img {
            width: 100%;
            padding-top: 0.4rem;
        }
    }
    .Pantone{
      
        padding-top:1.1rem ;
        padding-bottom: 1.1rem;
        .texts{
            text-align: center;
            font-family: 'Barlow';
                font-style: normal;
                font-weight: 800;
                font-size: 0.40rem;
                line-height: 0.48rem;
        }
        .content{
            padding-top: 0.16rem;
            padding-bottom:0.4rem ;
            width: 4.88rem;
            font-family: 'PingFang SC';
                font-style: normal;
                font-weight: 400;
                font-size: 14px;
                line-height: 20px;
                text-align: center;
              margin-left: 50%;
              transform: translateX(-50%);
        }
        .img{
           
            width: 100%;
            img{
                padding-top: 0;
                width: 100%;
            }
        }
    }
    .frame{
        .title{
            text-align: center;
            font-family: 'Barlow';
                font-style: normal;
                font-weight: 800;
                font-size: 0.40rem;
                line-height: 0.48rem;
        }
        .frame_img{
            padding-top: 0.4rem;
            text-align: center;
            
        }
    }
}
/deep/ .bottomNavigation{
    margin-top: 0.94rem;
    line-height: 1.5;
}
</style>
