import {postDataAPI,putDataAPI,deleteDataAPI,getDataAPI} from '../utils/fetchData';


export const updateUserProfile = (formdata,token) =>{
	return new Promise(async(resolve,reject) =>{
		try {
			const {data} = await postDataAPI('updateprofile',formdata,token);
			resolve(data);
		} catch(error) {
			reject(error);
		}
	})
}

export const ChangePassword = (oldpass,newpass,confirmpass,token) =>{
	return new Promise(async(resolve,reject) =>{
		try {
			const {data} = await putDataAPI('updatepass',{oldpass,newpass,confirmpass},token);
			resolve(data);
		} catch(error) {
			reject(error);
		}
	})
}

export const deleteUserAccount = (token) =>{
	return new Promise(async(resolve,reject) =>{
		try {
			const {data} = await deleteDataAPI('deleteaccount',token);
			resolve(data);
		} catch(error) {
			reject(error);
		}
	})
}

export const myTransactions = (token) =>{
	return new Promise(async(resolve,reject) =>{
		try {
			const {data} = await getDataAPI('mypayments',token);
			resolve(data);
		} catch(error) {
			reject(error);
		}
	})
}