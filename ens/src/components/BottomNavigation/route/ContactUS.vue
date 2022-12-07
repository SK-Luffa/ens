<template>
    <div class="root">
        <div class="title">
            <img :src="contact[0]" alt="">
            <div class="text">Contact Us</div>
        </div>
        <div class="contents">
            <img :src="contact[1]" alt="">
            <div class="rgions_bux">
                <div class="rgions_div" :class="`rgions_${index}`" v-for="(item,index) in region" :key="index">
                    <img class="rgions" :src="item.img" alt="" />
                    <div class="rgions_text">{{item.text}} Office</div>
                </div>
            </div>


        </div>
        <div class="information">
            <div class="texts">
                <p class="p1">
                    Email: contact@patternbuy.com
                </p>
                <p>
                    Our office
                </p>
                <p>
                    Hong Kong Office:Room 06,13A/F,South Tower, World Finance Centre,harbour city,17 canton road,tsim
                    sha tsui,kowloon, Hong
                    Kong
                </p>
                <p>
                    Milan Office:Piazzale Biancamano 8,Milan,20121, Italy
                </p>
                <p>
                    Shanghai Office:2nd Floor, Building 7, Phase I, Zhongjun Plaza, Hongqiao Business District, No. 1588
                    Shenchang Road,
                    Minhang District, Shanghai, China
                </p>
                <p>
                    Shenzhen Office:Room 1311, Haosheng Business Center, No. 4096, Dongbin Road, Nanshan District,
                    Shenzhen, China


                </p>
                <p>
                    Hangzhou Office:Hangsi Industrial Park, Yuhang District, Hangzhou, China
                </p>
                <p>
                    Yantai Office: 807 Huaming Building, Taishan Road, Yantai Development Zone , China
                </p>

            </div>
            <div class="zi">
                <Contact class="tus"></Contact>
            </div>
        </div>
        <Bottoms />
    </div>
</template>
<script>
import Contact from "@/components/Contact/index.vue"
import Bottoms from "@/components/BottomNavigation/index.vue"
export default {
    components: {
        Contact,
        Bottoms
    },
    name: 'APP',
    data() {
        return {
            contact: [require("@/assets/img/contact_1.png"), require("@/assets/img/map.png")],
            region: [
                {
                    img: require("@/assets/img/milan.png"),
                    text: "Milan"
                },
                {
                    img: require("@/assets/img/shenzhen.png"),
                    text: "Shenzhen"
                },
                {
                    img: require("@/assets/img/hongkong.png"),
                    text: "Hong Kong"
                },
                {
                    img: require("@/assets/img/hangzhou.png"),
                    text: "Hangzhou"
                },
                {
                    img: require("@/assets/img/shanghai.png"),
                    text: "Shanghai"
                },
                {
                    img: require("@/assets/img/yantai.png"),
                    text: "Yantai"
                },







            ]
        }
    },
    methods: {
    },
    created() {
    },
    mounted() {
    },
}
</script>
<style lang="less" scoped>
.root {
    line-height: 0;
    min-width: 1200px;

    .title {
        width: 100%;
        height: 3rem;
        position: relative;


        img {
            width: 100%;
            height: 100%;
        }

        .text {
            position: absolute;
            top: 0%;
            width: 100%;
            text-align: center;
            line-height: 3rem;
            font-family: 'Barlow';
            font-style: normal;
            font-weight: 900;
            font-size: 0.4rem;
            color: #FFFFFF;
        }

    }

    .contents {
        padding-left: 3.04rem;
        padding-right: 2.44rem;
        padding-top: 0.8rem;

        img {
            width: 100%;
            // height: 7.11rem ;
        }

        .rgions_bux {
            position: relative;
            display: flex;

            .rgions_div {
position: absolute;

                width: 2.08rem;

                .rgions {
                   width:100%
                    // height: 1.6rem;
                }
             


                .rgions_text {
                    width: 100%;
                    height: 0.28rem;
                    font-family: 'PingFang SC';
                    font-style: normal;
                    font-weight: 400;
                    font-size: 0.14rem;
                    line-height: 0.28rem;
                    color: #FFFFFF;
                    padding-left: 0.1rem;
                    box-sizing: border-box;
                    background: linear-gradient(90deg, #373ACB 0%, #9496FF 100%);
                }
            }
            .rgions_div:hover{
                width: 2.28rem;
                transform: translateX(-0.1rem) translateY(-0.1rem);
            }




            // .rgions_0 :hover{
                
            //    left:-0.1rem;
            // }

            .rgions_1 {
                // transform: translateX(0.97rem);
                left: 2.97rem;
            
            }

            .rgions_2 {
               left: 6.4rem;
            }

            .rgions_3 {
               left: 9.31rem;
            }

            .rgions_4 {
                    left: 11.94rem;
                    top: -3.56rem;
                // transform: translateX(3.3rem) translateY(-3.5rem);

            }

            .rgions_5 {
               left:12.13rem;
                    top: -5.9rem;
                // transform: translateX(1.9rem) translateY(-5.9rem);
            }

          
        }



    }

    .information {
        padding-top: 0.4rem;
        display: flex;
        justify-content: space-between;
        padding-left: 3.31rem;
        padding-right: 3.31rem;
        padding-top: 2.5rem;
        // padding-bottom: 3.16rem;

        .texts {
            p {
                font-family: 'PingFang SC';
                font-style: normal;
                font-weight: 400;
                font-size: 0.14rem;
                line-height: 0.2rem;
                color: #222222;
                width: 5.56rem;
                padding-bottom: 0.16rem;
            }

            .p1 {

                font-weight: 600;


            }
        }

        .zi {
            padding-top: 0.15rem;
            width: 6rem;
        }
    }
}

/deep/ .contact_root .content .title {
    display: none;
}

/deep/ .bottomNavigation {
    margin-top: 1.6rem;
    line-height: 1.5;
}
</style>
