import axios from 'axios'
export const translate = ()=>{

    const onLoading = ref(true)
    const translated = ref(null)

    const translationFetch = async (from, to, text)=>{

        try{
           
            const res = await axios.get(`https://api.mymemory.translated.net/get?q=${text}&langpair=${from}|${to}`)

        if(res){
            onLoading.value = false;
            translated.value = res.data.responseData.translatedText
            console.log(res.data);
        }else{
            translated.value = 'Translating...'
        }
    }catch(e){
            console.log('fucking err: ', e);
            translated.value = "Sorry, apparently we've ran into some technical problems, PLEASE TRY AGAIN LATER!"
        }
    }


    return{
        translated,
        translationFetch,
        onLoading
    }
}