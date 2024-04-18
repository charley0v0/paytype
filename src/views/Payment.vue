<script setup>
import { onMounted, ref, watch } from 'vue'
import Process from '../components/progress.vue';
import validate from '../script/validation';
import { useRouter } from 'vue-router';
// import creditOnce from './creditOncePay.vue';

const arrStatus = ref(['Now', 'notNow']);
const condition = ref({
  userName: '',
  userEmail: '',
  userPhone: ''
})
// const field = ref(['姓名', '手機', 'Email']);
const router = useRouter();
const errorMessage = ref([]);

// 送出資料
const handleSubmit = () => {
  // validate
  if (validate(condition.value).length) {
      let validate_result = validate(condition.value);
      alert(validate_result.join('\n'));
      errorMessage.value = validate(condition.value).join('');
      return
  }
  // success
  router.push(`/result`);
}

// import sdk
const oHead = document.getElementsByTagName('HEAD').item(0); 
const sdk= document.createElement("script"); 
sdk.src="https://lwww.newebpay.com/js/sdk.js"; 
oHead.appendChild(sdk); 

onMounted(()=>{
      let setInputStyle = { // 修改整體樣式
          fontSize:'14px',
          fontWeight:'500',
          lineHeight:'1.5',
          fontFamily:'Comic Sans MS',
          // borderColor:'#cccccc',
          color:'#55555',
          // height:'40px',
          // width:'40px',
          cardNumber:{ //信用卡欄位樣式
              color:'black',
              opacity: '0.8',
              // fontFamily:'Comic Sans MS',
          },
          // creditExpire:{
          //     fontSize:'18px',
          // },
          // cvcNumber:{
          //     color:'red'
          // },
          methods:{
              focus:'2px solid black',
              blur:'transparent',
          },
          bindCredit: true // 顯示同意綁定信用卡
      }
      let setTitleStyle = {
          title:{
              creditNumber:'信用卡號：', // 修改title
              // expireDate:'',
              // cvcNumber:''
          },
          style:{
              fontWeight:'800',
          }
      }
        setTimeout(()=>{
          window.NewebPaySDK.setCreditOnce(setInputStyle,setTitleStyle);
        },1000)
    })

</script>

<template>
  <div class="text-black">
    <Process :arrStatus="arrStatus" />

    <div class="grid gap-y-4 grid-rows-1 px-2 mb-5 md:gap-x-3 md:grid-cols-3 md:px-10 lg:px-32">
      <!-- 商品列 -->
      <div class="mt-4 border border-transparent p-10 rounded max-h-[80rem] bg-stone-50 md:col-span-1">
        <div class="text-xl flex justify-start py-5 font-bold">
          <span>確認訂單內容</span>
        </div>
        <div class="grid gap-x-1 gap-y-4 grid-cols-3 border-b-black border-b py-4">
          <img class="object-contain h-20 w-32" src="../assets/image/istockphoto-485347270-1024x1024.jpg" />
          <div class="h-20 flex justify-center items-center">
            <div>贊助一年份</div>
          </div>
          <div class="h-20 flex justify-center items-center">
            <div>NT$ 1200</div>
          </div>
        </div>
        <div class="text-left mt-5">
          <div class="font-semibold">【方案內容】</div>
          <ul>
            <li>娃娃一隻</li>
            <li>每季寄送小禮物</li>
            <li>加入FB粉專秘密社團</li>
          </ul>
        </div>
        <div class="text-left mt-5">
          <div class="font-semibold">⚠注意事項</div>
          <ul>
            <li>台灣本島免運。</li>
            <li>外島運費 100 元。</li>
            <li>提供超取服務。</li>
          </ul>
        </div>
        <div>
        </div>
      </div>
      <!-- form -->
      <div class="flex flex-col md:col-span-2">
        <div class="">
          <div class="mt-4 bg-white rounded shadow">
            <div class="text-xl flex justify-start py-5 font-bold p-3">
              <span>收件人資訊</span>
            </div>
            <div class="mb-5 flex p-3 flex-wrap">
              <div class="font-medium userinfo_title flex justify-start items-center lg:justify-center">
                <span>姓名:</span>
              </div>
              <div class="inline-block">
                <input :class="errorMessage.indexOf('姓名') > -1 ? 'border-2 border-rose-500' : 'border border-slate-300'"
                  class="rounded p-2 bg-white focus:outline-sky-600 w-full" v-model="condition.userName" />
              </div>
            </div>

            <div class="mb-5 flex p-3 flex-wrap">
              <div class="font-medium userinfo_title flex justify-start items-center lg:justify-center">
                <span>手機:</span>
              </div>
              <div class="">
                <input class="rounded p-2 bg-white focus:outline-sky-600 w-full"
                  :class="errorMessage.indexOf('手機')  > -1 ? 'border-2 border-rose-500' : 'border border-slate-300'"
                  v-model="condition.userPhone" />
              </div>
            </div>

            <div class="mb-5 flex p-3 flex-wrap">
              <div class="font-medium userinfo_title flex justify-start items-center lg:justify-center">
                <span>Email:</span>
              </div>
              <div class="">
                <input class="rounded p-2 bg-white  focus:outline-sky-600 w-full"
                  :class="errorMessage.indexOf('Email')  > -1 ? 'border-2 border-rose-500' : 'border border-slate-300'"
                  v-model="condition.userEmail" />
              </div>
            </div>
          </div>
        </div>

        <!-- 信用卡資訊 -->
        <div class="">
          <div class="mt-4 bg-white rounded shadow">
            <div class="text-xl flex justify-start py-5 font-bold p-3">
              <span>信用卡一次付清</span>
            </div>
            <!-- <div class="grid gap-x-1 gap-y-4 grid-cols-3 mb-5">
              <div class="font-medium flex justify-center items-center col-span-1">
                <span>卡號:</span>
              </div>
              <div class="col-span-2 flex justify-start" id="cPay-credit-number"></div>
            </div>

            <div class="grid gap-x-1 gap-y-4 grid-cols-3 mb-5">
              <div class="font-medium flex justify-center items-center col-span-1">
                <span>有效月年:</span>
              </div>
              <div class="col-span-2 flex justify-start" id="cPay-credit-expire"></div>
            </div>

            <div class="grid gap-x-1 gap-y-4 grid-cols-3 mb-5">
              <div class="font-medium flex justify-center items-center col-span-1">
                <span>安全碼:</span>
              </div>
              <div class="col-span-2 flex justify-start" id="cPay-credit-cvc"></div>
            </div> -->

              <!-- <credit-once/> -->
              <div id="credit_once_pay"></div>
          </div>
        </div>
        <!-- send -->
        <div class="flex justify-center my-4">
          <div class="bg-sky-600 text-white p-3 rounded cursor-pointer hover:text-white hover:bg-sky-900"
            @click="handleSubmit">送出資料</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.read-the-docs {
    color: #888;
}

#cPay-credit-number,#cPay-credit-expire,#cPay-credit-cvc{
    border-radius: 4px;
    border: 1px solid rgb(203 213 225);
    height: 42px;
}

#cPay-credit-number{
    width: 100%;
    @media (min-width:1024px) {
        width: 60%;
    }
}

#cPay-credit-expire{
  width: 50%;
  @media (min-width:1024px) {
        width: 30%;
  }
}

#cPay-credit-cvc{
  width: 50%;
  @media (min-width:1024px) {
        width: 30%;
  }
}

.userinfo_title{
    width: 100%;
}

  

  @media screen and (min-width:1024px){
      .userinfo_title{
          width:135px;
      }
  }
</style>
