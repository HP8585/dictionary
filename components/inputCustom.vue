<template>

<div class="">
<input class="bg-transparent w-[5em] text-purple-700 outline-none cursor-pointer" type="text" v-model="inputValue"  @click.stop="listShown = true" readonly>

<div class="rounded-xl overflow-hidden relativ w-ful z20">
    <ul v-show="listShown" class="bg-purple-600 w-[45em] text-white grid grid-cols-5 rounded-lg absolute left-[-2.5em] z-10 mt-2 overflow-hidden">
        <li @click.stop="inputValue = lang.lang; listShown=false;$emit('translate', lang.ISO)" v-for="lang in langs" :key="lang" class="py-3 px-3 flex items-center gap-3 border font-semibold cursor-pointer hover:bg-purple-500 ">
            <img :src="lang.flag" width="30" class="rounded">
        <span>{{ lang.lang }}</span>
        </li>
    </ul>
</div>
</div>

</template>

<script setup>
import langs from '~/countries.json'
const props = defineProps(['inputVal'])
var inputValue = props.inputVal

const listShown = ref(false)

watch(()=>props.inputVal, ()=>{
    
    inputValue = props.inputVal
})
onMounted(()=>{
    document.addEventListener('click', ()=>{
        listShown.value = false
    })
})
</script>