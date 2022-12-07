<template>
  <el-dialog :title="title"
             :visible.sync="visible"
             @close="close"
             :center="true"
             custom-class="invoice-edit">
  <div>
<!--    <div class="contents">-->
<!--      <i class="el-icon-close" @click="closeb"></i>-->
<!--      <div class="title">Enter invoice information</div>-->
      <div class="input">
        <div class="input_1">
          <input class="input_1_1" type="text" v-model="order.name" placeholder="Your name" :disabled="order.invoice!=''">
          <input class="input_1_2" type="text" v-model="order.email" placeholder="Your email" :disabled="order.invoice!=''">
        </div>
        <div class="input_1">
          <input class="input_1_3" type="text" v-model="order.address" placeholder="address" :disabled="order.invoice!=''">
        </div>
        <div class="input_1">
          <input class="input_1_1" type="text" v-model="order.city" placeholder="City" :disabled="order.invoice!=''">
          <input class="input_1_2" type="text" v-model="order.postCode" placeholder="Zip/postal code" :disabled="order.invoice!=''">
        </div>
        <div class="input_1">
          <input class="input_1_1" type="text" v-model="order.country" placeholder="Country/Region" :disabled="order.invoice!=''">
          <input class="input_1_2" type="text" v-model="order.province" placeholder="State/Province" :disabled="order.invoice!=''">
        </div>
<!--        <div class="input_1 input_2">-->
<!--          <button @click="close">Cancel</button>-->
<!--          <button @click="submit">Submit</button>-->

<!--        </div>-->

      </div>

<!--    </div>-->
  </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close = false">Cancel</el-button>
      <el-button type="primary" @click="submit">Download</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  name: "invoice-edit",
  props:{
    // order:{
    //   type:Object,
    //   default:{},
    // },
    // orderId: {
    //   type: Number,
    //   default: null,
    // },
    // invoice: {
    //   type: String,
    //   default: '',
    // },
  },
  data() {
    return {
      title:'Invoice Information',
      order:{},
      visible:false,
      locking:false,
      // names: "",
      // emaib: "",
      // ress: "",
      // city: "",
      // postalCode: "",
      // Region: "",
      // Province: '',
      // suo: true,

    };
  },
  methods: {
    show(order){
      this.visible=true;
      this.order=order;

    },
    submit() {
      const _this =this;
      if(_this.order.invoice){

        let ele = document.createElement('a');
        ele.setAttribute('href', _this.$imgServer+_this.order.invoice); //设置下载文件的url地址
        ele.setAttribute('download', _this.order.id + '.pdf');//用于设置下载文件的文件名

        ele.setAttribute("target", "_blank");

        _this.close();
        ele.click();

      }else{
        if(_this.locking)
          return;
        _this.locking=true;

        if (_this.order.name === "") {
          _this.locking=false;
          return this.$message("name format error")
        }
        // debugger
        if (_this.order.email === "") {
          _this.locking=false;
          return this.$message("emails format error")
        }

        if (!/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(_this.order.email)) {
          _this.locking=false;
          return this.$message("Email format error")
        }

        if (_this.order.address === "") {
          _this.locking=false;
          return this.$message("address format error")
        }

        if (_this.order.city === "") {
          _this.locking=false;
          return this.$message("city format error")
        }

        if (_this.order.postCode === "") {
          _this.locking=false;
          return this.$message("postal code format error")
        }

        if (_this.order.country === "") {
          _this.locking=false;
          return this.$message("Region format error")
        }
        if (_this.order.province === "") {
          _this.locking=false;
          return this.$message("Province format error")
        }

        // let c='';
        // if(this.city)
        //   c+=this.city;
        // if(this.Province){
        //   if(c!='')
        //     c+=',';
        //   c+=this.Province;
        // }
        // if(this.postalCode){
        //   if(c!='')
        //     c+=',';
        //   c+=this.postalCode;
        // }

        _this.rq({
          url: "/api/shop/getInvoice",
          method: "post",
          param: {
            id:_this.order.id,
            name:_this.order.name,
            email:_this.order.email,
            city:_this.order.city,
            country:_this.order.country,
            address:_this.order.address,
            province:_this.order.province,
            postCode:_this.order.postCode,
          },
          onError: function () {
            _this.locking=false;
          },
          _this,
        }).then((res) => {
          _this.locking=false;
          if (res.code == 200) {
            _this.order.invoice=res.data;
            let ele = document.createElement('a');
            ele.setAttribute('href', _this.$imgServer+res.data); //设置下载文件的url地址
            ele.setAttribute('download', _this.order.id + '.pdf');//用于设置下载文件的文件名

            ele.setAttribute("target", "_blank");

            _this.close();
            ele.click();

          }
        })
      }
    },
    close() {
      const _this=this;
      _this.visible=false;
      _this.order = {};
    },
  },
};
</script>
<style lang="less">
.invoice-edit.el-dialog {

  width: 7.34rem;
  border-radius: 0.14rem;

  .el-dialog__body{
    padding:0 20px 30px;
  }

  .dialog-footer{
    text-align: right;

    .el-button{

      height: 0.38rem;
      line-height: 0.38rem;
      background: #F1F1F1;
      color: #222;
      border-radius: 0.20rem;
      border: none;
      padding: 0 0.2rem;
    }
    .el-button--primary{
      background: #373ACB;
      color: #FFFFFF;
    }
    .el-button:hover{
      opacity: 0.8;
    }
  }


//  margin-left: 0.5rem;
//  width: 0.83rem;
//  height: 0.38rem;
//  text-align: center;
//  line-height: 0.38rem;
//  background: #F1F1F1;
//  color: #222;
//  border-radius: 0.20rem;
//  border: none;
//}
//button + button {
//  background: #373ACB;
//  color: #FFFFFF;
//}


  .input {
    padding-top: 0.08rem;

    .input_1 {
      display: flex;
      justify-content: space-between;
      margin-top: 0.16rem;

      input {
        width: 3rem;
        height: 0.48rem;
        padding-left: 0.14rem;
        padding-right: 0.16rem;
        gap: 10px;
        background: #F8F8F8;
        border: 1px solid #F1F1F1;
        border-radius: 0.14rem;
      }

      .input_1_3 {
        width: 6.20rem;
      }
    }

    .input_2 {
      justify-content: flex-end;

      button:hover {
        cursor: pointer;
      }

      button {
        margin-left: 0.5rem;
        width: 0.83rem;
        height: 0.38rem;
        text-align: center;
        line-height: 0.38rem;
        background: #F1F1F1;
        color: #222;
        border-radius: 0.20rem;
        border: none;
      }

      button + button {
        background: #373ACB;
        color: #FFFFFF;
      }
    }
  }

}

</style>
