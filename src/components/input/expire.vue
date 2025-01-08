<template>
        <input type="tel" class="block border-2 border-gray-600 rounded
        py-1 px-1 text-blue-nwp leading-tight font-semibold focus:outline-none focus:border-gray-800"
        id="expireDateInput"
        :placeholder="placeholder.creditLimit"
        :class="set_input_style" 
        v-model="inputVal"
        maxlength="5"
        @input="filterLimit()"
    >
</template>

<script>
export default {
    name: 'credit-limit',
    props: {
        input_style:{
            type:Object,
            default:() => {}
        },
         // defaultValue:{
        //     type:String,
        //     default: () => ''
        // },
    },
    data:() =>({
        placeholder:{
            creditLimit:'MM ／ YY'
        },
        inputVal:''
    }),
    methods: {
        update() {
            this.$emit('input', this.inputVal)
        },
        filterLimit(){
            let numberArr = [];
            this.inputVal = this.inputVal.replace(/[^0-9*]/g, '');
            let strArr =this.inputVal.split("");
            
            for(let i=0; i<strArr.length;i++){
                if(i>0 && i == 2){
                    numberArr.push('/');
                }
                numberArr.push(strArr[i]);
            }
            this.inputVal = numberArr.join('');
            this.update();
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
        }
    },
    created(){
        // this.inputVal = this.defaultValue;
    }
};

</script>