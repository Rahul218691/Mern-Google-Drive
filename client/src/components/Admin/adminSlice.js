import { createSlice } from "@reduxjs/toolkit";

const initialState ={
	isLoading:false,
	payments:[],
	hasNext:false,
	hasPrevious:false,
	graph:[]
}

const adminSlice = createSlice({
	name:'admin',
	initialState,
	reducers:{
		loadingdata:(state)=>{
			state.isLoading = true;
		},
		getpayments:(state,{payload})=>{
			state.isLoading = false;
			state.payments = payload.results;
			state.hasNext = payload.next ? true : false;
			state.hasPrevious = payload.previous ? true : false;
		},
		setGraphData:(state,{payload}) =>{
			state.isLoading = false;
			state.graph = payload;
		}
	}
});

const {reducer,actions} = adminSlice;

export const {loadingdata,getpayments,setGraphData} = actions;

export default reducer;