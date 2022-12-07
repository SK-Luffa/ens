
import config from "./config";


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
                "x-api-key": "62fe08a1d7fe543f19fc4164-YmOw9w4CVc129bvstyLFmjDbsdACPONRm0sl3oms9fnKagAvMq",
                "accept":"application/json",
                "content-type":"application/json"
            },
            ...params
        };


        axios(postData)
            .then(({ data }) => {
               

                if(vm) {
                    vm.$store.state.tipsb = false;
                }
        
            
                const {code, msg, user} = data;

                if (code == 200 && user == null) {
               
                } else if (code == 680) {
                    
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