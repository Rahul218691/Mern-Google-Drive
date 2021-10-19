import { createSlice } from "@reduxjs/toolkit";

const initialState ={
	isLoading:false,
	files:[]
}

const fileSlice = createSlice({
	name:'files',
	initialState,
	reducers:{
		loadingfiles:(state)=>{
			state.isLoading = true;
		},
		getFiles:(state,{payload})=>{
			state.isLoading = false;
			state.files = payload.files;
		},
		addNewFile:(state,{payload}) =>{
			state.files = [payload.newFile,...state.files];
			state.isLoading = false;
		},
		endLoading:(state) =>{
			state.isLoading = false;
		},
		removeFile:(state,{payload}) =>{
			state.files = state.files.filter(x=>x._id !== payload);
		}
	}
});

const {reducer,actions} = fileSlice;

export const {loadingfiles,getFiles,addNewFile,endLoading,removeFile} = actions;

export default reducer;