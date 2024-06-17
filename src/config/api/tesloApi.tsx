import { API_URL, API_URL_ANDROID, STAGE } from '@env'
import axios from 'axios'
import { StorageAdapter } from '../adapters/storage-adapter'

/*Constante que me va a indicar si estamos en producción o en desarrollo
para traerme la URL correcta de mi API */
export const API_URL_BASE = (STAGE === 'prod') ? API_URL : API_URL_ANDROID

//Definir la url base - comunicar api
const tesloApi = axios.create({
    baseURL: API_URL_BASE,
    //Vamos a indicar que vamos a obtener la información en formato json
    headers: {
        'Content-Type': 'application/json'
    }
})

//TODO: Interceptor

tesloApi.interceptors.request.use(
    async(config)=>{
        //Verificar si tenemos un token
        const token = await StorageAdapter.getItem('token');
        if (token) {
            config.headers['Authorization']=`Bearer ${token}`;
        }
        return config;
    }
)

/* Primero va a pasar por la configuración de mi interceptor
y si todo sale bien vamos a exportar la conexión a nuestra api*/
export {
    tesloApi
}