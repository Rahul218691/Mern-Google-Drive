import { createSlice } from "@reduxjs/toolkit";

const initialState ={
	isLoading:false,
	isAuth:false,
	error:'',
	auth:{},
	message:''
}

const authSlice = createSlice({
	name:'auth',
	initialState,
	reducers:{
		authPending:(state)=>{
			state.isLoading = true;
		},
		authSuccess:(state,{payload})=>{
			state.isLoading = false;
			state.isAuth = true;
			state.error = "";
			state.auth = payload;
		},
		authFail:(state,{payload}) =>{
			state.isLoading = false;
			state.error = payload;
		},
		resetMessages:(state) =>{
			state.isLoading = false;
			state.error = "";
			state.message = "";
		},
		activationData:(state,{payload}) =>{
			state.isLoading = false;
			state.message = payload;
		}
	}
});

const {reducer,actions} = authSlice;

export const {authPending,authSuccess,authFail,resetMessages,activationData} = actions;

export default reducer;