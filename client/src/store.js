import { configureStore } from '@reduxjs/toolkit'
import authReducer from './pages/auth/authSlice';
import folderReducer from './components/Folder/folderSlice';
import fileReducer from './components/File/fileSlice';
import pathReducer from './components/BreadCrumbNav/breadcrumbSlice';
import adminReducer from './components/Admin/adminSlice';

export default configureStore({
  reducer: {
    auth:authReducer,
    folders:folderReducer,
    files:fileReducer,
    path:pathReducer,
    admin:adminReducer
  }
})