<template>
    <input class="inline-block border-2 border-gray-600 rounded
        py-1 px-2 text-blue-nwp leading-tight font-semibold hideInputTextCss focus:outline-none focus:border-gray-800" 
        id="cvcNumberInput"
        v-model="inputVal"
        :class="set_input_style" 
        :maxlength="maxLength"
        @input="update()"
    >
</template>
<script>
import '../../assets/css/text-security';

export default {
    name: 'input-tool',
    props: {
        maxLength:{
            type:String,
            default: () => ''
        },
        input_style:{
            type:Object,
            default:() => {}
        }
    },
    data:() =>({
        inputVal:''
    }),
    methods: {
        update() {
            this.$emit('input', this.inputVal)
        },
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
        this.inputVal = this.defaultValue;
    }
};
</script>
<style>
    .hideInputTextCss{
        font-family:text-security-disc;
    }
</style>