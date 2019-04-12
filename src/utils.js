import {AsyncStorage} from 'react-native';

export function saveData(key,data){
    data=JSON.stringify(data);
   return AsyncStorage.setItem(key,data);
}

export function getData(key){
    return new Promise((response,reject)=>{
        AsyncStorage.getItem(key).then(data=>{
            response(JSON.parse(data));
        })
    })
}