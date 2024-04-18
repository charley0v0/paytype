<template>
    <div class="inline-block credit_div">
        <div class="flex flex-wrap-reverse" v-if="cardType == ''">
            <div class="inline-block">
                <input type="tel" class='inline-block appearance-none border-2 border-gray-600 rounded 
                    py-1 px-1 text-blue-nwp leading-tight font-semibold focus:outline-none focus:border-gray-800'
                    style="width:60px;"
                    :class="set_input_style"  
                    :maxlength="4"
                    id='card1'
                    ref="card1"
                    v-model="card1"
                    @keyup="checkLength(1)"
                >-
                <input type='tel' class='inline-block appearance-none border-2 border-gray-600 rounded  
                    py-1 px-1 text-blue-nwp leading-tight font-semibold focus:outline-none focus:border-gray-800'
                    style="width:60px;"
                    :class="[set_input_style,{'hideInputTextCss':showCardNumStatus == false}]"  
                    :maxlength="4"
                    id='card2'
                    ref="card2"
                    v-model="card2"
                    @keyup="checkLength(2)"
                >-
                <input type='tel' class='inline-block appearance-none border-2 border-gray-600 rounded  
                    py-1 px-1 text-blue-nwp leading-tight font-semibold focus:outline-none focus:border-gray-800'
                    style="width:60px;"
                    :class="[set_input_style,{'hideInputTextCss':showCardNumStatus == false}]"  
                    :maxlength="4"
                    id='card3'
                    ref="card3"
                    v-model="card3"
                    @keyup="checkLength(3)"
                >-
                <input type="tel" class='inline-block appearance-none border-2 border-gray-600 rounded 
                    py-1 px-1 text-blue-nwp leading-tight font-semibold focus:outline-none focus:border-gray-800'
                    style="width:60px;"
                    :class="set_input_style"  
                    :maxlength="4"
                    id='card4'
                    ref="card4"
                    v-model="card4"
                    @keyup="checkLength(4)"
                >
            </div>
            <div class="inline-flex items-center">
                <img class='eyeicon inline-block' :src="'/src/assets/image/' + iconSrc + '.png'" @click="switchCardStatus"/>
                <img src="../../assets/image/credit_type.png" class="credit_type ml-2 inline-block">
            </div>
        </div>
        <div class="flex flex-wrap-reverse" v-if="cardType == 'union'">
            <div class="inline-block">
                <input type="tel" class='inline-block appearance-none border-2 border-gray-600 rounded 
                    py-1 px-1 text-blue-nwp leading-tight font-semibold focus:outline-none focus:border-gray-800'
                    style="width:60px;"
                    :class="set_input_style"  
                    :maxlength="4"
                    id='card1'
                    ref="card1"
                    v-model="card1"
                    @keyup="checkLength(1)"
                >-
                <input type='tel' class='inline-block appearance-none border-2 border-gray-600 rounded  
                    py-1 px-1 text-blue-nwp leading-tight font-semibold focus:outline-none focus:border-gray-800'
                    style="width:100px;"
                    :class="[set_input_style,{'hideInputTextCss':showCardNumStatus == false}]"  
                    :maxlength="8"
                    id='card2'
                    ref="card2"
                    v-model="card2"
                    @keyup="checkLength(2)"
                >-
                <input type='tel' class='inline-block appearance-none border-2 border-gray-600 rounded  
                    py-1 px-1 text-blue-nwp leading-tight font-semibold focus:outline-none focus:border-gray-800'
                    style="width:100px;"
                    :class="set_input_style"
                    :maxlength="7"
                    id='card3'
                    ref="card3"
                    v-model="card3"
                    @keyup="checkLength(3)"
                >
            </div>
            <div class="inline-flex items-center">
                <img class='eyeicon inline-block' :src="'/src/assets/image/' + iconSrc + '.png'" @click="switchCardStatus"/>
                <img src="../../assets/image/unionpay.png" class="credit_type ml-2 inline-block">
            </div>
        </div>
    </div>
</template>


<script>
import '../../assets/css/text-security';

export default {
    data:() =>({
        placeholder:{
            creditNumber:''
        },
        creditNumber:'',
        //new add
        memeryCardNum:'',
        cantWatchCardNum:false,
        haveDefaultNum:false,
        showCardNumStatus:false,
        inputType:'password',
        card1:'',
        card2:'',
        card3:'',
        card4:'',
        src1:''
    }),
    props:['input_style','cardType'],
    methods: {
        checkLength(inputid){
            let inputRef = this.$refs[`card${inputid}`];
            const maxLength = inputRef.maxLength;
            const length = inputRef.value.length;

                if(length >= maxLength){
                    const nextInputNum = inputid + 1;

                    if(this.cardType == 'union'){
                        if(nextInputNum <= 3){
                            this.$refs[`card${nextInputNum}`].focus()
                        }
                    }else{
                        if(nextInputNum <= 4){
                            this.$refs[`card${nextInputNum}`].focus();
                        }
                    }

                    switch(this.cardType){
                        case '':
                        this.creditNumber = this.card1 + this.card2 + this.card3 +  this.card4;
                        case 'union':
                        this.creditNumber = this.card1 + this.card2 + this.card3;
                    }

                    this.$emit('input', this.creditNumber);
                }
        },
        switchCardStatus(){
            this.showCardNumStatus = !this.showCardNumStatus;
        },
    },
    watch:{
        creditNumber(val){
            if(val.length >= 16){
                this.$emit('getInput', val);
            }
        }
    },
    computed:{
        set_input_style(){
            if(this.input_style){
                var str = '';
                Object.values(this.input_style).forEach((v)=>{
                    str += ` ${v}`
                });
                return str ;
            }
        },
        iconSrc(){
            return this.showCardNumStatus == false ? 'eye' : 'eye_slash';
        }
    }
}

</script>

<style scoped lang="scss">
    .eyeicon{
        cursor: pointer;
        width:25px;
        margin-left: 5px;
    }
    
    .hideInputTextCss{
        font-family:text-security-disc;
    }

    .payinfo_title{
        display:block;
    }

    .credit_type{
        width: auto;
        height: 20px;
    }

    @media screen and (min-width:1024px){
        .payinfo_title{
            display:inline-block;
            text-align: right;
            width:135px;
        }
    }

    @media screen and (max-width:640px){
        .credit_div{
            width:100%;
        }
    }

</style>
