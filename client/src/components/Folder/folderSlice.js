import { createSlice } from "@reduxjs/toolkit";

const initialState ={
	isLoading:false,
	folder:[],
	subfiles:[]
}

const folderSlice = createSlice({
	name:'folders',
	initialState,
	reducers:{
		loadingfolders:(state)=>{
			state.isLoading = true;
		},
		getFolders:(state,{payload})=>{
			state.isLoading = false;
			state.folder = payload.folders;
		},
		getFiles:(state,{payload}) =>{
			state.isLoading = false;
			state.subfiles = payload.files;
		},
		addNewFolder:(state,{payload}) =>{
			state.folder = [...state.folder,payload.newfolder];
			state.isLoading = false;
		},
		addSubFile:(state,{payload}) =>{
			state.subfiles = [payload.newFile,...state.subfiles];
			state.isLoading = false;
		},
		removesubFile:(state,{payload})=>{
			state.subfiles = state.subfiles.filter(x=>x._id !== payload);
		},
		removeFolder:(state,{payload}) =>{
			state.folder = state.folder.filter(x => x._id !== payload);
			state.subfiles = state.subfiles.filter(x=>x.folderid !== payload);
		}
	}
});

const {reducer,actions} = folderSlice;

export const {loadingfolders,getFolders,getFiles,addNewFolder,addSubFile,removesubFile,removeFolder} = actions;

export default reducer;