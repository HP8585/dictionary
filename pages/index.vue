<template>
   
   


<div class="mx-auto w-fit flex items-center justify-center h-screen hiddenn">
    <div v-if="useStore().translator" class="w-fit mx-auto py-20">
    <translator/>
   </div>
   <div v-else>
    <div v-if="initiall" class="bg-white shadow-xl w-[24em] px6 py3">
        <initial  @search="fetchData" />
    </div>
    <div v-else class="bg-white shadow-xl w-fit px6 py3">
        <dataa  />
    </div>
</div>
</div>
</template>

<script setup>
import { useStore } from '~/stores/user'
import { storeToRefs } from 'pinia';

const { data, initiall } = storeToRefs(useStore())

const { fetchData } = apiFetch()

onMounted(()=>{
    console.log(decodeURIComponent('\u05d0\u05d4\u05dc\u05df'));
    const observer = new IntersectionObserver((entries)=>{
        entries.forEach(entry=>{
            if(entry.isIntersecting){
                entry.target.classList.add('show')
            }else{
                entry.target.classList.remove('show')
            }
        })
    })

    const hiddenEl = document.querySelectorAll('.hiddenn')
    hiddenEl.forEach(el=> observer.observe(el))
})

</script>
