<template>

<div class="relative bg-white flex justify-center items-center z-[0] h-[25em] rounded w-[23em] md:w-[40em]">
    <img src="../assets/abstract.png" class="w-full h-[27em h-full absolute object-contai z-[-1] rounded">
    <div class="text-purple-700">
        <div class="flex items-center justify-center pb1 gap-3 mb-3 border--2 w-full z-10">
        <div @click="useStore().initiall = true; useStore().translator = false" :class="useStore().initiall ? 'border-b-[3px] border-purple-700':''" class="cursor-pointer">Dictionary</div>
        <div @click="useStore().translator = true; useStore().initiall=false" :class="useStore().translator ? 'border-b-[3px] border-purple-700':''" class="cursor-pointer">Translator</div>
    </div>
    <div class="flex flex-col items-center justify-center w[22em] md:w-fit">
        <!--text areas-->
        <div class="flex overflow-hidden w-[22em] md:w-auto textContainer">
            <textarea v-model="fromText" placeholder="The text you want to translate" cols="30" rows="10" class="border-[2px] rounded" style="border-top-right-radius: 0;border-bottom-right-radius: 0;border-bottom-left-radius: 0;"></textarea>
            <textarea v-model="translated" cols="30" rows="10" class="border-l-[0]  border-[2px] rounded " style="border-top-left-radius: 0;border-bottom-left-radius: 0;border-bottom-right-radius: 0;" readonly>
            
            </textarea>
        </div>

        <!--copy and speak options and select inputs-->
        <div class="py-3 border-t-0 border-2 flex items-center justify-between px-3 bg-gray-100 w-[22em] md:w-[100%]" style="border-bottom-left-radius: 0.25rem;border-bottom-right-radius: 0.25rem;">
        <div >
            <div class="flex gap-3 items-center">
                <div class="flex items-center gap-3 text-gray-400 border-r pr-3 border-r-gray-800">
                    <i @click="readLoud1" class="fa fa-volume-high cursor-pointer hover:text-purple-700"></i>
                    <span v-if="copiedText">Copied</span>
                    <i v-else @click="copyText" class="fa fa-copy cursor-pointer hover:text-purple-700"></i>
                </div>
                <!-- <select name="" id="">
                    <option value="english">English</option>
                </select> -->
                <input-custom @translate="getISO1" :input-val="inputVal1" />
            </div>
        </div>
        <i @click="switchLangs" class="fa-solid fa-arrow-right-arrow-left text-gray-400 hover:text-purple-700 cursor-pointer mr-3"></i>
        <div >
            <div class="flex flex-row-reverse gap-3 items-center">
                <div class="flex items-center gap-3 text-gray-400 border-r pl-3 border-l-gray-800 border-l">
                    <i @click="readLoud2" class="fa fa-volume-high cursor-pointer hover:text-purple-700"></i>
                    <span v-if="copiedTranslation">Copied</span>
                    <i v-else @click="copyTranslated" class="fa fa-copy cursor-pointer hover:text-purple-700"></i>
                </div>
                <input-custom @translate="getISO2" :input-val="inputVal2" />
            </div>
        </div>
    </div>
    </div>
</div>
</div>
</template>

<script setup>

const fromText = ref(null)
const toText = ref(null)

const ISO1 = ref('eng')
const ISO2 = ref('fa')

const inputVal1 = ref('English')
const inputVal2 = ref('Farsi')

const { translated, translationFetch } = translate()

const getISO1 = (val)=>{
    ISO1.value = val
}
const getISO2 = (val)=>{
    ISO2.value = val
}

watchEffect(()=>{
    console.log(ISO1.value , ISO2.value);
    if(ISO1.value && ISO2.value && fromText.value){
        translationFetch(ISO1.value, ISO2.value, encodeURI(fromText.value))
    }

    if(toText.value === '' || toText.value === null){
        translated.value = null
    }
})


const switchLangs = ()=>{
const stored = ISO1.value;
ISO1.value = ISO2.value;
ISO2.value = stored;

const inputStored = inputVal1.value;
inputVal1.value = inputVal2.value;
inputVal2.value = inputStored

const storedText = translated.value;
translated.value = fromText.value;
fromText.value = storedText
console.log(translated.value, toText.value);
}


const readLoud1 = ()=>{
    const utterance = new SpeechSynthesisUtterance(fromText.value)
    speechSynthesis.speak(utterance)
}

const readLoud2 = ()=>{
    const utterance = new SpeechSynthesisUtterance(translated.value)
    speechSynthesis.speak(utterance)
}

const copiedText = ref(false)
const copiedTranslation = ref(false)

const copyText = ()=>{
    navigator.clipboard.writeText(fromText.value)
    copiedText.value = true;
    setTimeout(() => {
        copiedText.value = false
    }, 2000);
}
const copyTranslated = ()=>{
    navigator.clipboard.writeText(translated.value)
    copiedTranslation.value = true;
    setTimeout(() => {
        copiedTranslation.value = false;
    }, 2000);
}
</script>