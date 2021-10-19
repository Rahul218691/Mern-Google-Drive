import {getDataAPI} from '../utils/fetchData';


export const getInfo = (token) =>{
	return new Promise(async(resolve,reject) =>{
		try {
			const {data} = await getDataAPI('applicationinfo',token);
			resolve(data)
		} catch(error) {
			reject(error)
		}
	})
}


export const getTranscatDetails = (page,token) =>{
	return new Promise(async(resolve,reject) =>{
		try {
			const {data} = await getDataAPI(`userpayments?page=${page}`,token);
			resolve(data);
		} catch(error) {
			reject(error)
		}
	})
}

export const getGraphRevenue = (period,token) =>{
	return new Promise(async(resolve,reject) =>{
		try {
			const {data} = await getDataAPI(`revenue?period=${period}`,token);
			resolve(data);
		} catch(error) {
			reject(error);
		}
	})
}