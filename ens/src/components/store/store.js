
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        pagess:1,
        blog_details:null,
        selectAllTypes:"",
        indexs:false,
        idcc:null,
        cosX:true,
        tipsb: false,
        pid: null,
        pattern: 0,
        piao: null,
        invoice: null,
        item: null,
        prices: 0,
        res: null,
        messagedetails: false,
        index: null,
        wordname: null,
        screen_items: null,
        svgs: false,
        svgg: false,
        picNum: 0,
        folder_delete: false,
        world: "",
        ForgetPwd: false,
        logins: true,
        Sign: false,
        loginState: false,
        option: "",
        folderId: -3,
        name: "",
        number: 0,
        titlems: 1,
        title: "",
        Center_button: false,//个人信息的修改按钮
        pwds: "",
        mask: "",
        keyword: "",
        searchs: "",
        blank: "",
        details: {
            img_productId: ""
        },
        // 筛选页面
        screen: {
            upload_display: 0,
        },

        //登录个人信息
        username: {
            icon_text: "",
            title: "",
            email: ""
        },
        // 登录页面的显示和隐藏
        login: false,
        // 是否登录
        login_bool: false,
        //  导航的背景颜色
        Navigation_in: "Navigation_in",
        // 点击sign up
        fontRate:1,
        up: 0,
        lw: 0, //左侧筛选栏宽度
        cw: 0, //图片宽度
        // href: "http://www.patternbuy.com",
        slectpageParm: {
            pageSize: 100,
            navigatepageNums: 100,
            pageNum: 1,
            strSearchKeyword: "",
            addDateRange: "",
            productFicationId: "",
            writerIds: "",
            sSorts: "",
            imgType: 1,
            memberIds: "451,370",
            priceRange: "0,166"
        }
        // 首页

    },
    getters: {

    },
    mutations: {



    }

})