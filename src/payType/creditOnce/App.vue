<template>
    <div class="my-2 border-2 rounded-md p-2 w-300 flex justify-between">
        <CreditNumber />
        <CreditCvc />
    </div>
</template>


<script setup>
    import { ref, reactive } from 'vue';

    import CreditNumber from '@/components/form/creditNumber.vue';
    import CreditCvc from '@/components/form/creditCvc.vue';
    
    const creditNmuber = ref('');
    const creditExp = ref('');

</script>

<style scoped>

@tailwind base;
@tailwind components;
@tailwind utilities;

.w-50{
    width:55px;
}

.w-300{
    width:300px;
}

</style>
