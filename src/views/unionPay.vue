<template>
    <div class="p-3">
        <div class="mb-5 field_div flex-wrap">
            <div id="creditNumber" class="text-gray-700 text-base font-medium mr-3 payinfo_title">銀聯卡號：</div>
            <creditNumber :input_style="input_style_" v-model="creditNumber" @getInput="getCreditNunber" :cardType="'union'"/>
        </div>
        <div class="mb-5 field_div flex-wrap">
            <div id="expireDate" class="text-gray-700 text-base font-medium mr-3 payinfo_title pt-1">有效月年：</div>
            <div class="inline-block align-top maxw-470">
                <expireInput class="w-24" :input_style="input_style_" v-model="creditLimit"/>
                <div class="inline-block font-semibold text-sm text-red-500" v-if="showExpiryError">卡片到期日錯誤</div>
            </div>
        </div>
        <div class="mb-2 field_div items-center flex-wrap">
            <div id="cvcNumber" class="text-gray-700 text-base font-medium mr-3 payinfo_title">背面末三碼：</div>
            <cvc-input class="w-24" v-model="cvcNumber" :textCenter="true" :maxLength="'3'" :input_style="input_style_"></cvc-input>
            <img :src="cvcImg" class="credit_icon ml-3 inline-block">
        </div>
        <div class="field_div">
            <span class="text-red-500 font-semibold text-sm ml-108">若您的銀聯卡不具有背面末三碼資訊，可無需填寫此欄位</span>
        </div>
        <div class="addToken flex my-5">
            <label class="flex items-start">
                <input type="checkbox" v-model="AddNewToken" class="mt-1 mr-1" id="agreeToken">
                <span class="notice_color font-semibold text-sm text-left">我同意綁定本信用卡，並設定為快速結帳(可節省下次結帳時間，並保有刪除權益)</span>
            </label>
        </div>
        <div class="text-wrap font-semibold flex text-sm text-red mb-5">本公司採用藍新科技SSL交易系統，通過PCI-DSS 3.2.1支付卡產業資料安全標準認證，周全保護您的信用卡資料安全</div>
        <div class="checkout_btn">
            <div class="text-center block w-250 h-45 mx-auto rounded-lg p-2 text-base font-semibold text-white bg-blue-nwp cursor-pointer">
                <div class="flex items-center justify-center h-full">確認送出</div>
            </div>
        </div> 
    </div>
</template>
    
    
<script>
    import cvc from '@/assets/image/credit.png';
    import creditNumber from '../components/input/creditNumber.vue';
    import expireInput from '../components/input/expire.vue';
    import cvcInput from '../components/input/cvc.vue';

    export default {
        data:() =>({
            cvcImg:cvc,
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
    .field_div{
        display:flex;
    }

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

    .text-red{
        color:#DC493F;
    }

    .bg-blue-nwp{
        background:#1D2A73;
    }

    .ml-108{
        margin-left:108px;
    }

    .w-250{
        width:250px;
    }

    .checkout_btn{
        width:100%;
        max-width:515px;
    }

    @media screen and (min-width:1024px){
        .payinfo_title{
            display:inline-block;
            text-align: right;
            width:96px;
        }

        .maxw-470{
            max-width:470px;
        }
    }

    @media screen and (max-width:500px){
        .field_div{
            display:block;
        }

        .payinfo_title{
            width:fit-content;
            text-align:left;
        }
    }

</style>
    