<template>
    <div class="my-2 border-2 rounded-md p-2 w-350 flex justify-between">
        <div class="flex">
            <img src="@/assets/credit_type.png" class="h-20 mr-2">
            <CreditNumber />
        </div>
        <div class="w-60">
            <CreditExp />
        </div>
    </div>
</template>


<script setup>
    import { ref, reactive } from 'vue';

    import CreditNumber from '@/components/form/creditNumber.vue';
    import CreditExp from '@/components/form/creditExp.vue';
    
    const creditNmuber = ref('');
    const creditExp = ref('');

</script>

<style scoped>

@tailwind base;
@tailwind components;
@tailwind utilities;

.w-60{
    width:60px;
}

.w-350{
    width:350px;
}

.h-20{
    height:20px;
}
</style>
