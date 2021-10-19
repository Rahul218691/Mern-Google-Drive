import {getDataAPI,postDataAPI,deleteDataAPI} from '../utils/fetchData';


export const getHomeFolders = (token) =>{
	return new Promise(async(resolve,reject) =>{
		try {
			const {data} = await getDataAPI('myfolders',token);
			resolve(data);
		} catch(error) {
			reject(error);
		}
	})
}


export const getFolderById = (id,token) =>{
	return new Promise(async(resolve,reject) =>{
		try {
			const {data} = await getDataAPI(`folders/${id}`,token);
			resolve(data);
		} catch(error) {
			reject(error);
		}
	})
}

export const createFolder = (foldername,id,token) =>{
	return new Promise(async(resolve,reject) =>{
		try{
			const {data} = await postDataAPI('createfolder',{foldername,id},token);
			resolve(data);
		}catch(error){
			reject(error);
		}
	})
}

export const deleteFolder = (id,token) =>{
	return new Promise(async(resolve,reject) =>{
		try {
			const {data} = await deleteDataAPI(`deletefolder/${id}`,token);
			resolve(data);
		} catch(error) {
			reject(error);
		}
	})
}