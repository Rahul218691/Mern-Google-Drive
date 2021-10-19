import { createSlice } from "@reduxjs/toolkit";

const initialState ={
	path:[]
}

const breadcrumbSlice = createSlice({
	name:'folders',
	initialState,
	reducers:{
		addPath:(state,{payload}) =>{
			state.path = [...state.path,payload];
		},
		resetPath:(state) =>{
			state.path = [];
		}
	}
});

const {reducer,actions} = breadcrumbSlice;

export const {addPath,resetPath} = actions;

export default reducer;