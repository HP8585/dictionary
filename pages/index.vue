<template>
   
   <div class="translate-x-[50%] z-20 absolute left-[50%]">
   <ConfettiExplosion :duration="5000" :particleSize="13" :particleCount="300" v-if="visible" />
</div>
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
import ConfettiExplosion from 'vue-confetti-explosion';

const { data, initiall } = storeToRefs(useStore())

const { fetchData } = apiFetch()

import axios from 'axios'
const testFetch = async ()=>{
try{
    const res = await axios.get('https://readcartapi-server.vercel.app/api/books?limit=500')

    console.log(res.data);
}catch(e){

}
}

const visible = ref(false);

  const explode = async () => {
    visible.value = false;
    await nextTick();
    visible.value = true;
  };

onMounted(()=>{
    visible.value = true

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
