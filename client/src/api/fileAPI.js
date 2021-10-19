import {getDataAPI,postDataAPI,deleteDataAPI} from '../utils/fetchData';


export const getHomeFiles = (token) =>{
	return new Promise(async(resolve,reject) =>{
		try {
			const {data} = await getDataAPI('myfiles',token);
			resolve(data);
		} catch(error) {
			reject(error);
		}
	})
}

export const addFiles = (formdata,token) =>{
	return new Promise(async(resolve,reject) =>{
		try{
			const {data} = await postDataAPI('uploadfile',formdata,token);
			resolve(data);
		}catch(error){
			reject(error);
		}
	})
}

export const deleteFile = (id,token) =>{
	return new Promise(async(resolve,reject) =>{
		try {
			const {data} = await deleteDataAPI(`deletefile/${id}`,token);
			resolve(data);
		} catch(error) {
			reject(error);
		}
	})
}

export const sharefileAsEmail = (email,url,token) =>{
	return new Promise(async(resolve,reject) =>{
		try {
			const {data} = await postDataAPI('sendfile',{email,url},token);
			resolve(data);
		} catch(error) {
			console.log(error);
		}
	})
}