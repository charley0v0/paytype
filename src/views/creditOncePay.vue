<template>
<div class="p-3">
        <div class="mb-5  field_div flex-wrap">
            <div id="creditNumber" class="text-gray-700 text-base font-medium mr-3 payinfo_title">信用卡號</div>
            <creditNumber :input_style="input_style_" v-model="submitData.PN" @getInput="getCreditNunber"  :cardType="''"/>
        </div>
        <div class="mb-5 field_div flex-wrap">
            <div id="expireDate" class="text-gray-700 text-base font-medium mr-3 payinfo_title pt-1">有效月年</div>
            <div class="inline-block align-top maxw-470">
                <expireInput class="w-24" :input_style="input_style_" v-model="creditLimit"/>
                <div class="inline-block warning_notice_color font-semibold text-sm text-red-500" v-if="showExpiryError">卡片到期日錯誤</div>
            </div>
        </div>
        <div class="mb-2 field_div items-center flex-wrap">
            <div id="cvcNumber" class="text-gray-700 text-base font-medium mr-3 payinfo_title">背面末三碼</div>
            <cvc-input class="w-24" v-model="submitData.CV" :textCenter="true" :maxLength="'3'" :input_style="input_style_"></cvc-input>
            <img :src="cvcImg" class="credit_icon ml-3 inline-block">
        </div>
        <div class="text-wrap font-semibold flex text-sm text-red mb-5">本公司採用藍新科技SSL交易系統，通過PCI-DSS 3.2.1支付卡產業資料安全標準認證，周全保護您的信用卡資料安全</div>
        <button @click="checkInfo()">取得prime</button>
    </div>
</template>


<script>
import axios from 'axios';
import creditNumber from '../components/input/creditNumber.vue';
import expireInput from '../components/input/expire.vue';
import cvcInput from '../components/input/cvc.vue';
import cvc from '@/assets/image/credit.png';

export default {
    data:() =>({
        cvcImg:cvc,
        creditLimit:'',
        hashKey:'',
        parentUrl:'',
        input_style_:{
            input_bgc:'input_bgc',
            input_color:'input_color',
            input_border:'input_border'
        },
        submitData:{
            PN:'',
            EDate:'',
            CV:'',
        },
        showExpiryError:false,
    }),
    components:{
        expireInput,
        cvcInput,
        creditNumber
    },
    methods: {
        //同步組件卡號
        getCreditNunber(v){
            this.submitData.PN = v;
        },
        //卡號換取Prime
        checkInfo(){
            const url = '/nwj';
            // const url = 'https://1468-123-51-237-115.ngrok-free.app/NWPJCore/GPA';
            const parentUrl = this.parentUrl ? this.parentUrl : 'https://lwww.newebpay.com/website/Fake_tappay/ClientView';
            const hashKey = this.hashKey ? this.hashKey : '0Y67zd5tiabchL1OspVkQIFym42qfyMf';
            axios.post(url, this.submitData, {
                headers: {
                    'Authorization': `Bearer ${hashKey}`,
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                //將回傳參數傳遞到父頁面
                if(window.parent.location.href == this.parentUrl){
                    if(response.data.responseCode == '0000'){
                        window.parent.postMessage(response.data,parentUrl);
                    }else{
                        //測試用
                        setTimeout(()=>{
                            window.parent.postMessage('charley',parentUrl);
                        },8000)
                    }
                }               
            })
            .catch(error => {
                console.error('Error:', error);
            });
        }
    },
    watch:{
        'submitData.EDate':function(){
            // 檢查月
            let cvsM = Number(this.submitData.EDate.substring(0,2));
            //檢查年
            let nowDay = new Date();
            let nowYear = String(nowDay.getFullYear()).substring(2,4);
            let cvsY = Number(this.submitData.EDate.substring(2,4));
            this.showExpiryError = Boolean(cvsM == 0 || cvsM > 12) || Boolean(cvsY < nowYear);
        },
    },
    created(){
        window.addEventListener('message',(event)=>{
            if(event){
                this.hashKey = event.data.hashKey;
                this.parentUrl = event.data.parentUrl;
                this.checkInfo();
            }
        });
    },
    updated(){
        this.submitData.EDate = this.creditLimit.split('/').join('');
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
