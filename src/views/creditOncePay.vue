<template>
    <div class="p-3">
        <div class="mb-5  field_div flex-wrap">
            <div id="creditNumber" class="text-gray-700 text-base font-medium mr-3 payinfo_title">{{title.creditNumber}}</div>
            <creditNumber :input_style="input_style_" v-model="submitData.PN" @getInput="getCreditNunber" @showNumber="setShowStatus" :cardType="''"/>
        </div>
        <div class="mb-5 field_div flex-wrap">
            <div id="expireDate" class="text-gray-700 text-base font-medium mr-3 payinfo_title pt-1">{{title.expireDate}}</div>
            <div class="inline-block align-top maxw-470">
                <expireInput class="w-24" :input_style="input_style_" v-model="creditLimit"/>
                <div class="inline-block warning_notice_color font-semibold text-sm text-red-500" v-if="showExpiryError">請輸入完整有效月年</div>
            </div>
        </div>
        <div class="mb-2 field_div items-center flex-wrap">
            <div id="cvcNumber" class="text-gray-700 text-base font-medium mr-3 payinfo_title">{{title.cvcNumber}}</div>
            <cvc-input class="w-24" v-model="submitData.CV" :textCenter="true" :maxLength="'3'" :input_style="input_style_"></cvc-input>
            <img :src="cvcImg" class="credit_icon ml-3 inline-block">
        </div>
        <div class="text-wrap font-semibold flex text-sm text-red mb-5">本公司採用藍新科技SSL交易系統，通過PCI-DSS 3.2.1支付卡產業資料安全標準認證，周全保護您的信用卡資料安全</div>
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
        showStatus:false,
        title:{
            creditNumber:'信用卡號',
            expireDate:'有效月年',
            cvcNumber:'背面末三碼'
        },
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
        inputStyleObj:{}
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
        //目前卡號顯示狀態
        setShowStatus(s){
            this.showStatus = s;
        },
        //卡號換取Prime
        checkInfo(){
            const url = 'https://c-inframe.newebpay.com/NWPJCore/GPA';
            const parentUrl = this.parentUrl ? this.parentUrl : '';
            const hashKey = this.hashKey ? this.hashKey : '';
            axios.post(url, this.submitData, {
                headers: {
                    'Authorization': `Bearer ${hashKey}`,
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                //將回傳參數傳遞到父頁面
                if(window.parent.location.href == this.parentUrl){
                    window.parent.postMessage(response.data,parentUrl);
                }               
            })
            .catch(error => {
                console.error('Error:', error);
            });
        },
        //設定輸入框
        setInputStyle(inputStyle){
            let input1 = document.getElementById('card1');
            let input2 = document.getElementById('card2');
            let input3 = document.getElementById('card3');
            let input4 = document.getElementById('card4');
            let expireDate = document.getElementById('expireDateInput');
            let cvcNumber = document.getElementById('cvcNumberInput');
   
            for(const [key,value] of Object.entries(inputStyle)){
                switch(key){
                    case "creditNumber":
                        for(const [keyC,valueC] of Object.entries(value)){
                            input1.style[keyC] = valueC;
                            input2.style[keyC] = valueC;
                            input3.style[keyC] = valueC;
                            input4.style[keyC] = valueC;
                        }
                        break;
                    case "expireDate":
                        for(const [keyE,valueE] of Object.entries(value)){
                            expireDate.style[keyE] = valueE;
                        }
                        break;
                    case "cvcNumber":
                        for(const [keyV,valueV] of Object.entries(value)){
                            cvcNumber.style[keyV] = valueV;
                        }
                        break;
                    default:
                        input1.style[key] = value;
                        input2.style[key] = value;
                        input3.style[key] = value;
                        input4.style[key] = value;
                        expireDate.style[key] = value;
                        cvcNumber.style[key] = value;
                        this.setInputClass();
                        break;
                }
    
                //欄位事件
                // let AllInputData = [input1,input2,input3,input4,expireDate,cvcNumber];
                // if(key == 'methods'){
                //     for(const [keyC,valueC] of Object.entries(value)){
                //         if(keyC === 'focus'){
                //             AllInputData.forEach((e)=>{
                //                 e?.addEventListener('focus',()=>{
                //                     e.style.border = valueC;
                //                 });
                //             });
                //         }

                //         if(keyC == 'blur'){
                //             AllInputData.forEach((e)=>{
                //                 e?.addEventListener('blur',()=>{
                //                     e.style.border = valueC;
                //                 });
                //             });
                //         }
                //     }
                // }
            }
        },
        //設定標題
        setTitleStyle(titleStyle){
            //修改標題文字
            if(titleStyle.hasOwnProperty('title')){
                for(const [key,value] of Object.entries(titleStyle.title)){
                    this.title[key] = value;
                }
            }
            //修改標題樣式
            if(titleStyle.hasOwnProperty('style')){
                let array = ['creditNumber','expireDate','cvcNumber'];
                array.forEach((element)=>{
                    for(const [key,value] of Object.entries(titleStyle.style)){
                        document.getElementById(element).style[key] = value;
                    }
                });
            }             
        },
        //有傳入字體樣式時，判斷為隱碼時切換字體
        setInputClass(){ 
            let input2 = document.getElementById('card2');
            let input3 = document.getElementById('card3');

            if(!this.showStatus){
                input2.style.fontFamily = 'text-security-disc';
                input3.style.fontFamily = 'text-security-disc'
            }else{
                // if(setInputStyle){
                //     input2.style.fontFamily = setInputStyle.fontFamily;
                //     input3.style.fontFamily = setInputStyle.fontFamily;
                // }else{
                //     input2.style.fontFamily = 'inherit';
                //     input3.style.fontFamily = 'inherit';
                // }

                // if(setInputStyle && setInputStyle.hasOwnProperty('cardNumber')){
                //     input2.style.fontFamily = 'inherit';
                //     input3.style.fontFamily = 'inherit';
                // }
            }
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
        showStatus(){
            this.setInputClass();
        }
    },
    mounted(){
        // let customStyle = {
        //     inputStyle:{
        //         // 修改樣式(整體)
        //         fontSize:'14px',
        //         fontWeight:'500',
        //         lineHeight:'1.5',
        //         color:'#55555',
        //         creditNumber:{
        //             color:'red',
        //         }
        //     },
        //     titleStyle:{
        //         title:{
        //             creditNumber:'信用卡號',
        //         },
        //         style:{
        //             color:'red'
        //         }
        //     }
        // }
        // this.setInputStyle(customStyle.inputStyle);
        // this.setTitleStyle(customStyle.titleStyle);

        window.addEventListener('message',(event)=>{
            const msgData = event.data;
            if(msgData.type == 'getPrime'){
                if(msgData.data){
                    this.hashKey = msgData.data.hashKey;
                    this.parentUrl = msgData.data.parentUrl;
                    this.checkInfo();
                }
            }
            if(msgData.type == 'setStyle'){
                //設定輸入框
                if(msgData.setInputStyle){
                    this.inputStyleObj = msgData.inputStyle;
                    this.setInputStyle(msgData.inputStyle);
                }

                //設定標題
                if(msgData.setTitleStyle){
                    this.setTitleStyle(msgData.titleStyle);
                }

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
