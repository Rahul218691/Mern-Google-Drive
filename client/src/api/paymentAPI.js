import {postDataAPI} from '../utils/fetchData';

export const makeOrder = (amount,plan,token) =>{
	return new Promise(async(resolve,reject) =>{
		try {
			const {data} = await postDataAPI('createorder',{amount,plan},token);
			resolve(data);
		} catch(error) {
			reject(error)
		}
	})
}