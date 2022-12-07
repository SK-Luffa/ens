// import Vue from 'vue'

export function sorting_list(x,vm){
    // 声明一个数组，用来记录每一列的高度
    // console.log(x)
    let paddingwidth = 0.2 + 0.2;
    if (vm.widths && vm.widths == "cons_b") {
        paddingwidth += 3.2;
    }

    let paddingWidth=0.1 * vm.$store.state.fontRate;
    let imgContainerWidth = document.documentElement.clientWidth - paddingwidth * vm.$store.state.fontRate;

    console.log(imgContainerWidth)

    if (imgContainerWidth > 2800) {
        vm.listnumber = 9
    } else if (imgContainerWidth > 2450) {
        vm.listnumber = 8
    } else if (imgContainerWidth > 2100) {
        vm.listnumber = 7
    } else if (imgContainerWidth > 1750) {
        vm.listnumber = 6
    } else if (imgContainerWidth > 1400) {
        vm.listnumber = 5
    } else if (imgContainerWidth > 1050) {
        vm.listnumber = 4
    } else if (imgContainerWidth > 700) {
        vm.listnumber = 3
    } else {
        vm.listnumber = 2
    }

    let imgWidth = Math.round(imgContainerWidth) / vm.listnumber * 100 / 100;

    let Height_array = [];

    if (x != null) {
        for (let index = 0; index < x.length; index++) {
            // 拿到宽度
            x[index].width = imgWidth;
            x[index].imgWidth = imgWidth-paddingWidth*2;
            x[index].height = x[index].imgWidth * (x[index].imgHeight / x[index].imgWeight);

            if (index < vm.listnumber) {
                x[index].top = 0;
                x[index].left = (index % (vm.listnumber + 1)) * (x[index].width);
                // 每一列的高度是当前图片的高度   图片的高度是高宽比*256+bottom

                Height_array.push(
                    x[index].height + 80
                );
            } else {
                let min = Height_array.minindex(Height_array); //拿到最短列的下标

                // console.log(Height_array);
                // console.log(Height_array[min]);
                // 当前的图片的top 就是最低列的高度
                x[index].top = Height_array[min];
                // 当前图片的left 是最低列的下标*(256 + 16)
                x[index].left = min * (x[index].width);
                // 然后最低列的高度此时就是最低列的高度加上当前图片的高度

                Height_array[min] =
                    Height_array[min] +
                    x[index].height +
                    80;
            }
        }
    }
    // 这里获取列的最大值复制给付元素

  
    vm.linelist = x;
    
   return vm.consHeight = Height_array.max(Height_array);
}

export function getClientHeight()
{
    let clientHeight=0;
    if(document.body.clientHeight&&document.documentElement.clientHeight)
    {
        clientHeight = (document.body.clientHeight<document.documentElement.clientHeight)?document.body.clientHeight:document.documentElement.clientHeight;
    }
    else
    {
        clientHeight = (document.body.clientHeight>document.documentElement.clientHeight)?document.body.clientHeight:document.documentElement.clientHeight;
    }
    return clientHeight;
}


// 获取浏览器类型
export function getBrowser() {
    var userAgent = window.navigator.userAgent; //取得浏览器的userAgent字符串
    var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器
    var isIE = !!window.ActiveXObject || "ActiveXObject" in window; //判断是否IE浏览器
    var isEdge = userAgent.indexOf("Edge") > -1; //判断是否IE的Edge浏览器
    var isFF = userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器
    var isSafari = userAgent.indexOf("Safari") > -1
        && userAgent.indexOf("Chrome") == -1; //判断是否Safari浏览器
    var isChrome = userAgent.indexOf("Chrome") > -1
        && userAgent.indexOf("Safari") > -1; //判断Chrome浏览器
    if (isIE) {
        return "IE";
    }
    if (isOpera) {
        return "Opera";
    }
    if (isEdge) {
        return "Edge";
    }
    if (isFF) {
        return "Firefox";
    }
    if (isSafari) {
        return "Safari";
    }
    if (isChrome) {
        return "Chrome";
    }
}

// path 指文件下载的路径，fileName 指文件下载保存的名称
// xmlRequest 也是在data中定义的 xmlRequest：new XMLHttpRequest()
export function download(vm,path, fileName) {
    if(!vm.xmlRequest)
        vm.xmlRequest = new XMLHttpRequest();
    vm.xmlRequest.open('get', path, true);
    vm.xmlRequest.responseType = "blob";//这里是关键，它指明返回的数据的类型是二进制
    vm.xmlRequest.addEventListener('progress',function(evt){
        let percent = evt.loaded / evt.total;
        console.log(percent);
        vm.progress=parseInt(percent*100);//progress 在data中定义的全局变量，显示的进度
    });
    //下载成功触发的事件
    vm.xmlRequest.addEventListener('load',function (ev) {
        handleDown(vm,fileName);
    });
    //下载结束触发的事件（无论下载成功失败，还是中断都得执行loadend）
    vm.xmlRequest.addEventListener('loadend',function (ev) {
        loadend(vm);
    });
    //下载失败触发的事件
    vm.xmlRequest.addEventListener('error',function (ev) {
        error(vm);
    });
    //下载中断触发的事件
    vm.xmlRequest.addEventListener("abort", function(ev) {
        abort(vm);
    });
    try{
        vm.xmlRequest.send(null);
    }catch(e) {
        vm.$message.error('server error!');
        return;
    };
}

// An highlighted block
export function handleDown(vm,fileName){
    //下载完成事件：处理下载文件
    if (vm.xmlRequest.readyState === 4 && vm.xmlRequest.status === 200) {
        let b = getBrowser();
        //判断浏览器类型
        if (b == "Chrome"){
            let link = document.createElement('a');
            link.href = window.URL.createObjectURL(vm.xmlRequest.response);
            link.download = fileName;
            link.click();
        }else if (b == "Firefox"){
            let file = new File([vm.xmlRequest.response],fileName,{type:'application/octet-stream'});
            let url = URL.createObjectURL(file);
            parent.location.href = url;
        }else if (b == "IE"){
            let file = new Blob([vm.xmlRequest.response], { type:'application/force-download' });
            window.navigator.msSaveOrOpenBlob(file, fileName);
        }
        vm.progress = 0;
        if(vm.downId)
            vm.downId=null;
    }else{
        vm.$message.error('server error!');
        vm.xmlRequest = new XMLHttpRequest();
        return;
    }
    vm.$message.success('download successful!');
    return;
}

export function error(vm){
    vm.progress = 0;
    vm.xmlRequest = new XMLHttpRequest();
    vm.$message.error('download error');
}

// An highlighted block
export function abort(vm){
    vm.progress = 0;
    vm.xmlRequest = new XMLHttpRequest();
}

// An highlighted block
export function loadend(vm){
    vm.progress = 0;
    vm.xmlRequest = new XMLHttpRequest();
}
