<template>
<div class="flex flex-col justify-center items-center gap-3 relative text-purple-700 h-[14em] overflow-hidden rounded  px-6">
    <div class="flex items-center justify-center pb1 gap-3 mb-3 border--2 w-full z-10">
        <div @click="useStore().initiall = true; useStore().translator = false" :class="useStore().initiall ? 'border-b-[3px] border-purple-700':''" class="cursor-pointer">Dictionary</div>
        <div @click="useStore().translator = true; useStore().initiall=false" :class="useStore().translator ? 'border-b-[3px] border-purple-700':''" class="cursor-pointer">Translator</div>
    </div>
    <img src="../assets/abstract.png" class="w-full h-[20em] absolute object-contai">
    <div class="z-10 flex flex-col items-center justify-center gap-3">
    <h1 class="font-bold text-xl">Search for your word here</h1>
    <div class="relative overflow-hidden rounded" >
        <button ref="searchButton" @click="$emit('search', inputWord)" v-show="onSearch" class="absolute right-0 top-0 bottom-0 bg-purple-700 text-white px-1 rounde">Search</button>
    <input @keyup.enter="searchButton.click()" type="text" class="shadow outline-none px-2 text-purple-900 font-semibold border-2 rounded w-[20em] border-purple-600" v-model="inputWord">
</div>
    <small class="z-10">We expect as we have provided you with our none-profit enterprise and services
        to set out on journey to the endless world of English dictionary you introduce your friends to us. 
    </small>
</div>
</div>
</template>

<script setup>
import { useStore } from '~/stores/user'

const searchButton = ref(null)

const onSearch = ref(false)

const inputWord = ref(null)

watch(inputWord,()=>{
onSearch.value = true 

})
</script>