<template>
    <div class="blogs">
        <div class="banner_blog">
            <div class="blog_contents" v-for="(item, index) in fashion_list" :key="index">
                <div class="blog" v-for="(items, indexs) in item" :key="indexs">
                    <div class="blogs" v-if="items.cover">

                        <img class="blog_img" :src="'http://www.patternbuy.com' + items.cover" alt="">
                        <div class="blog_text" :style="{ background: items.bgcolor }">
                            <div class="blog_title"> {{ items.title }}</div>
                            <div class="blog_content" v-html="items.synopsis"></div>


                        </div>
                    </div>
                    <div v-if="items.cover" @click="blog_details(items)" class="blog_button"> <i
                            class="el-icon-right"></i></div>

                </div>
            </div>


        </div>
        <div class="paginatio">
            <el-pagination :current-page="this.$store.state.pagess" :hide-on-single-page="true" background @current-change="handleCurrentChange"
                layout="prev, pager, next" :total="iTotalRecords">

            </el-pagination>
            <span class="sum">共{{ iTotalRecords/10 }}页</span>

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
       
            iTotalRecords: 0,
            fashion_list: [],
            jia_data: [

            ],
        }
    },
    methods: {
        blog_details(item) {

            this.$store.state.blog_details = item;
            this.$router.push("/blogdetails?etails=" + item.id)
        },
        handleCurrentChange(val) {
            this.$store.state.pagess=val
            this.blog_data(val)
        },
        blog_data(start) {
            let vm = this;
            this.fashion_list =[],
            this.rq({
                url: "/api/archives/blog",
                method: "post",
                param: {
                    iDisplayLength: 24,
                    iDisplayStart: (start-1)*24,
                    sSorts: "date_modify,desc"
                },
                onError: function () { },
                vm,
            }).then((res) => {
                vm.lock = true;
                if (res.code == 200) {
                    this.iTotalRecords = Math.ceil(res.data.iTotalRecords / 24) * 10
                    this.jia_data = res.data.aaData

                    if (!this.jia_data.length % 4 == 0) {
                        let s = 4 - (this.jia_data.length % 4)
                        for (let index = 0; index < s; index++) {

                            this.jia_data.push("")

                        }

                    }


                    let p = this.jia_data.length / 4
                    for (let index = 0; index < p; index++) {
                        this.fashion_list.push(this.jia_data.splice(0, 4))
                    }
                }
            });
        }
    },
    created() {
        this.blog_data(this.$store.state.pagess)
        // handleCurrentChange(2)

   



    },
    mounted() {
    },
}
</script>
<style lang="less" scoped>
.blogs {
    line-height: 0.14rem;

    border-radius: 0.16rem;

    .banner_blog {

        min-height: 6rem;
        padding-top: 0.6rem;
        padding-left: 0.6rem;
        padding-right: 0.6rem;
        text-align: center;
        justify-content: space-between;

        .blog_contents {
            display: flex;
            justify-content: center;
            padding-bottom: 0.32rem;

        }

        .blog {

            width: 2.86rem;

            position: relative;

            .blogs {
                width: 100%;
                border-radius: 0.16rem;
                overflow: hidden;
                border: 1px solid #CCCCCC;
                border-radius: 16px;

            }

            .blog_button {
                position: absolute;
                right: 0.15rem;
                width: 0.54rem;
                height: 0.36rem;
                background: #373ACB;
                border-radius: 21px;
                color: #fff;
                font-size: 0.24rem;
                line-height: 0.36rem;
                bottom: -0.12rem;
            }

            .blog_img {
                width: 100%;
                height: 2.14rem;
            }

            .blog_text {
                height: 2.54rem;
                width: 100%;
                box-sizing: border-box;
                padding-top: 0.15rem;
                padding-bottom: 0.24rem;
                padding-left: 0.16rem;
                padding-right: 0.16rem;

                .blog_title {
                    font-family: 'PingFang SC';
                    font-style: normal;
                    font-weight: 600;
                    font-size: 0.2rem;
                    line-height: 0.28rem;
                    color: #000000;
                    padding-bottom: 0.16rem;
                    text-align: left;
                }

                .blog_content {
                    font-family: 'PingFang SC';
                    font-style: normal;
                    font-weight: 400;
                    font-size: 0.14rem;
                    line-height: 0.2rem;
                    color: #000000;
                    text-align: left;
                    height: 1.4rem;
                    overflow: hidden;
                    font-family: 'PingFang SC';
                    font-style: normal;
                    font-weight: 400;
                    font-size: 0.14rem;
                    line-height: 0.2rem;
                    color: #000000;
                    text-align: left;
                    word-wrap: break-word;
                    word-break: normal;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 7;
                    -webkit-box-orient: vertical;
                }

            }
        }

        .blog+.blog {
            padding-left: 0.16rem;
        }
    }
}

.paginatio {

    display: flex;
    justify-content: right;
    padding-right: 2rem;
    box-sizing: border-box;
    padding-top: 0.64rem;

    .sum {
        line-height: 0.32rem;
    }

    /deep/ .el-pagination.is-background .el-pager li {
        background: #F7F9FD !important;
    }

    /deep/ .el-pagination.is-background .el-pager li:not(.disabled).active {
        background: #222222 !important;
    }

    /deep/ .el-pagination.is-background .el-pager li:not(.disabled):hover {
        background: #222222 !important;
        color: #fff;
    }

    /deep/ .el-pagination.is-background .btn-prev {
        background: #F7F9FD !important;
    }

    /deep/ .el-pagination.is-background .btn-prev:hover {
        background: #222222 !important;
        color: #fff;
    }

    /deep/ .el-pagination.is-background .btn-next {
        background: #F7F9FD !important;
    }

    /deep/ .el-pagination.is-background .btn-next:hover {
        background: #222222 !important;
        color: #fff;
    }
    .sum{
        font-family: 'PingFang SC';
            font-style: normal;
            font-weight: 400;
            font-size:0.14rem;
            color: #222222;
    }
}
</style>
