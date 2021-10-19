import {postDataAPI} from '../utils/fetchData';



export const Userlogin = (userdata) => {
	return new Promise(async(resolve,reject) =>{
		try {
			const {data} = await postDataAPI('login',userdata);
			resolve(data);
		} catch(error) {
			reject(error);
		}
	})
}

export const UserRegister = (userdata) => {
	return new Promise(async(resolve,reject) =>{
		try {
			const {data} = await postDataAPI('register',userdata);
			resolve(data);
		} catch(error) {
			reject(error);
		}
	})
}

export const refreshToken = () =>{
	return new Promise(async(resolve,reject) =>{
		try {
			const {data} = await postDataAPI('refresh_token');
			resolve(data);
		} catch(error) {
			reject(error);
		}
	})
}

export const logout = () =>{
	return new Promise(async(resolve,reject) =>{
		try {
			localStorage.removeItem('firstLogin');
			await postDataAPI('logout');
			window.location.href = '/';
		} catch(error) {
			reject(error)
		}
	})
}

export const activateAccount = (verification) =>{
	return new Promise(async(resolve,reject) =>{
		try {
			const {data} = await postDataAPI('activate',{verification});
			resolve(data);
		} catch(error) {
			reject(error)
		}
	})
}

export const forgotPassword = (email) =>{
	return new Promise(async(resolve,reject) =>{
		try {
			const {data} = await postDataAPI('forgotpass',{email});
			resolve(data);
		} catch(error) {
			reject(error);
		}
	})
}

export const resetPassword = (userinfo) =>{
	return new Promise(async(resolve,reject) =>{
		try {
			const {data} = await postDataAPI('resetpassword',userinfo);
			resolve(data);
		} catch(error) {
			reject(error);
		}
	})
}