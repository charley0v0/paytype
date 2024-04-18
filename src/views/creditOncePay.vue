<template>
<div class="p-3">
        <div class="mb-5 flex flex-wrap">
            <div id="creditNumber" class="text-gray-700 text-base font-medium mr-3 payinfo_title">信用卡號：</div>
            <creditNumber :input_style="input_style_" v-model="creditNumber" @getInput="getCreditNunber"  :cardType="''"/>
        </div>
        <div class="mb-5 flex flex-wrap">
            <div id="expireDate" class="text-gray-700 text-base font-medium mr-3 payinfo_title pt-1">有效月年：</div>
            <div class="inline-block align-top maxw-470">
                <expireInput class="w-24" :input_style="input_style_" v-model="creditLimit"/>
                <div class="inline-block warning_notice_color font-semibold text-sm text-red-500" v-if="showExpiryError">卡片到期日錯誤</div>
            </div>
        </div>
        <div class="mb-2 flex items-center flex-wrap">
            <div id="cvcNumber" class="text-gray-700 text-base font-medium mr-3 payinfo_title">背面末三碼：</div>
            <cvc-input class="w-24" v-model="cvcNumber" :textCenter="true" :maxLength="'3'" :input_style="input_style_"></cvc-input>
            <img src="../assets/image/credit.png" class="credit_icon ml-3 inline-block">
        </div>
        <div class="addToken flex lg:ml-10 mb-5">
            <label class="flex items-start">
                <input type="checkbox" v-model="AddNewToken" class="mt-1 mr-1" id="agreeToken">
                <span class="notice_color font-semibold text-sm">我同意綁定本信用卡，並設定為快速結帳(可節省下次結帳時間，並保有刪除之權益)</span>
            </label>
        </div>
        <div class="text-wrap font-semibold flex lg:ml-10">本公司採用藍新科技SSL交易系統，通過PCI-DSS 3.2.1支付卡產業資料安全標準認證，周全保護您的信用卡資料安全</div>
    </div>
</template>


<script>
import creditNumber from '../components/input/creditNumber.vue';
import expireInput from '../components/input/expire.vue';
import cvcInput from '../components/input/cvc.vue';

export default {
    data:() =>({
        placeholder:{
            creditNumber:''
        },
        creditNumber:'',
        creditLimit:'',
        cvcNumber:'',
        //new add
        memeryCardNum:'',
        input_style_:{
            input_bgc:'input_bgc',
            input_color:'input_color',
            input_border:'input_border'
        },
        submitData:{
            number:'',//信用卡號
            LimitMY:'',//信用卡有效月年
            cvc:'',//背面末三碼
        },
        showExpiryError:false
    }),
    components:{
        expireInput,
        cvcInput,
        creditNumber
    },
    methods: {
        getCreditNunber(v){
            this.creditNumber = v;
        }
    },
    watch:{
        'submitData.LimitMY':function(){
            // 檢查月
            let cvsM = Number(this.submitData.LimitMY.substring(0,2));
            //檢查年
            let nowDay = new Date();
            let nowYear = String(nowDay.getFullYear()).substring(2,4);
            let cvsY = Number(this.submitData.LimitMY.substring(2,4));
            this.showExpiryError = Boolean(cvsM == 0 || cvsM > 12) || Boolean(cvsY < nowYear);
        },
    },
    updated(){
        this.submitData.number = this.creditNumber;
        this.submitData.LimitMY = this.creditLimit.split('/').join('');
    },
}

</script>

<style lang="scss">
    .cantWatchCardNum{
        cursor: not-allowed;
    }

    .credit_icon{
        height:25px;
    }

    .input_bgc{
        background-color:#F0F0F0;
    }
    .input_color{
        color: #444444;
    }
    .input_border{
        border:2px solid #F0F0F0;
    }

    .payinfo_title{
        display:flex;
        width: 100%;
        align-items: flex-start;
    }

    .notice_color{
        color:#666666;
    }

    @media screen and (min-width:1024px){
        .payinfo_title{
            display:inline-block;
            text-align: right;
            width:135px;
        }

        .maxw-470{
            max-width:470px;
        }
    }

    @media screen and (max-width:640px){
        .credit_div{
            width:100%;
        }
    }

</style>
