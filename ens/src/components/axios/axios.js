/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-alert */
/* eslint-disable no-console */
/**
        |--------------------------------------------------
        | 封装的异步请求函数
        |--------------------------------------------------
        */
// import axios from "axios";
import config from "./config";

// Message.config({
//   duration: 1500,
//   // maxCount: 1,
// });
// 实例对象
const message = {
    error: function (txt) {

    }
};

const AJAX_TIMEOUT = "ECONNABORTED";
// console.log(window.root_config)
let ROOT_URL = "";

if (process.env.NODE_ENV === "development") {
    ROOT_URL = config.development;
} else {
    ROOT_URL = config.product;
}

const newRequest = (url, params, method, onError, vm, loading) =>
    new Promise((resolve, reject) => {


        if(vm) {
            vm.$store.state.tipsb = true;
            if (loading == "off") {
                vm.$store.state.tipsb = false
            }
        }

        let postData = {};
        // console.log(localStorage.getItem("user"));

        // const user = JSON.parse(localStorage.getItem("user"));

        let turl = ROOT_URL + url;
        postData = {
            url: turl,
            method,
            timeout: 60000,
            withCredentials: false,
            headers: {
                "Access-Token": localStorage.token,
                "Access-Control-Allow-Origin": "*"
            },
            ...params
        };


        axios(postData)
            .then(({ data }) => {

                if(vm) {
                    vm.$store.state.tipsb = false;
                }
                //   debugger
                // if (data.code == 601) {
                //     localStorage.user = "";
                //     localStorage.token = ""
                //     window.location.href = "/"

                // }

                const {code, msg, user} = data;

                if (code == 200 && user == null) {
                    localStorage.user = "";
                    // this.$store.state.blank = "";

                    if(vm) {
                        vm.$store.state.login_bool = false;
                    }


                    localStorage.token = ""
                    // vm.$store.state.Navigation_in = "Navigation_in";
                    // this.$router.push("/");
                } else if (code == 680) {
                    localStorage.token = ""
                }

                resolve(data);
            })
            .catch(error => {

                if(vm) {
                    vm.$store.state.tipsb = false;
                    vm.$message.error(error)
                }
                onError && onError(error);

                // if (error.code === AJAX_TIMEOUT) {
                //   message.error(vm.$t('message.MESSAGE.code.timeOut'));
                // } else {
                //   message.error(vm.$t('message.MESSAGE.code.error'));
                //   throw error;
                // }
            });
    });
const request = ({url = "", param = {}, method = "get", onError, vm, loading}) => {


    const Method = method.toLowerCase();
    if (Method === "post") {
        // console.log("post", param);
        return newRequest(url, {data: param}, "post", onError, vm, loading);
    }
    if (Method === "put") {
        return newRequest(url, {data: param}, "put", onError, vm, loading);
    }
    if (Method === "delete") {
        return newRequest(url, {params: param}, "delete", onError, vm, loading);
    }
    return newRequest(url, {params: param}, "get", onError, vm, loading); // 默认 Get 请求
};

request.get = (url, param, onError, vm) =>
    request({ method: "get", url, param, onError, vm });
request.post = (url, param, onError, vm) =>
    request({ method: "post", url, param, onError, vm });
request.put = (url, param, onError, vm) =>
    request({ method: "put", url, param, onError, vm });
request.delete = (url, param, onError, vm) =>
    request({ method: "delete", url, param, onError, vm });

export default request;