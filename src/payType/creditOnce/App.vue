<template>
    <div>
        <div class="my-2 border-2 rounded-md p-2 w-170 flex">
            <CreditNumber />
        </div>
        <div class="my-2 border-2 rounded-md p-2 w-170 flex">
            <CreditExp />
        </div>
        <div class="my-2 border-2 rounded-md p-2 w-170 flex">
            <CreditCvc  />
        </div>
    </div>
   
</template>


<script setup>
    import { ref, reactive } from 'vue';
    import CreditNumber from '@/components/form/creditNumber.vue';
    import CreditExp from '@/components/form/creditExp.vue';
    import CreditCvc from '@/components/form/creditCvc.vue';

    const creditNmuber = ref('');
    const creditExp = ref('');
</script>

<style scoped>

@tailwind base;
@tailwind components;
@tailwind utilities;

.w-170{
    width:170px;
}
</style>
