import axios from 'axios'
import { useStore } from '~/stores/user'
import { storeToRefs } from 'pinia'
export const apiFetch = ()=>{

    const { initiall, data } = storeToRefs(useStore())

    const fetchData = async (word)=>{
        const res = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURI(word)}`)
        if(res){
            console.log(res.data);
            initiall.value = false;
            data.value = res.data[0]
        }
        }


    return{
        fetchData
    }
}