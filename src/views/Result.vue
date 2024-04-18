<template>
<Process :arrStatus="arrStatus"/>
<div class="flex items-center justify-center">
    <div class="px-40 py-10 bg-white rounded shadow">
        <font-awesome-icon icon="fa-regular fa-circle-check" class="text-[#4a94da] w-10 h-10 mb-4"/>
        <div class="font-bold text-black">訂單已完成</div>
    </div>
</div>    
</template>

<script setup>
import { ref } from 'vue'
import Process from '../components/progress.vue';
const arrStatus = ref(['notNow', 'Now']);

</script>