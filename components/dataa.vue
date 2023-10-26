<template>
<div class="flex flex-col text-purple-900 w-[22em] md:w-auto">
    <!-- <h1 class="font-bold text-lg">What we've found correspondig your word</h1> -->
    <div @click="useStore().initiall = true" class="w-10 cursor-pointer hover:bg-gray-100 rounded-full ml-1 mt-1">
    <img src="../assets/exit.png" class="w-[3em]">
    </div>
    <div class="flex flex-col ">
        <div class="flex flex-col px-3">
<span class="text-[1.7rem] font-semibold capitalize">{{ data?.word }}</span>
<small class="text-[1rem]">{{ data.meanings[0].partOfSpeech }}</small>
</div>
<div class="border-b-[5px] py-1 border-purple-700">
<ul class="flex gap-10 text-[1rem]">
    <li v-for="item in data.phonetics" :key="item" class="px-3 flex flex-row-reverse items-center gap-2 text-gray500" v-show="item.audio">
        <span>{{ item?.text }}</span>
        <i @click="playAudio(item?.audio)" class="fa fa-volume-high cursor-pointer" />
        <audio :ref="getEl" hidden />
    </li>
</ul>
</div>

<ul class="px-3 py-2 flex flex-col gap-4">
    <li v-for="(item,index) in data.meanings" :key="index" v-show="item?.definitions[index]?.definition">
        <span>{{ item?.partOfSpeech }}</span>
        <p class="font-bold">{{ item?.definitions[index]?.definition }}</p>

        <div class="flex gap-2" v-show="item?.synonyms[index]">
            <span class="font-semibold">Synonyms :</span>
            <ul class="flex gap-2 font-bold capitalize">
                <li v-for="(item, index) in item?.synonyms" :key="index">
                    <span @click="fetchData(item)" class="underline cursor-pointer">{{ item }},</span>
                </li>
            </ul>
        </div>
    </li>
</ul>
</div>
</div>
</template>

<script setup> 
import { useStore } from '~/stores/user'
import { storeToRefs } from 'pinia'

const { fetchData } = apiFetch()

const audio = ref(null)
const getEl = (el)=>{
if(el){
    audio.value = el
}
}


const playAudio = (src) => {
  audio.value.src = src
  audio.value.play()
// const audioElement = audio.value.$refs.audio
//   audioElement.src = src
//   audioElement.play()
}
const { data, initiall } = storeToRefs(useStore())
</script>