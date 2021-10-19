import React,{useState,useEffect} from 'react';
import {BrowserRouter,Switch,useLocation,Route} from 'react-router-dom';
import TopBarProgress from "react-topbar-progress-indicator";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Header} from './components';
import {Login,Register,Home,VerifyAccount,ForgotPassword,
Profile,SubFolders,Settings,NotFound,AdminDashboard} from './pages';
import {refreshToken} from './api/authAPI';
import {useDispatch} from 'react-redux';
import {authPending,authSuccess,authFail} from './pages/auth/authSlice';
import AuthRouter from './customroutes/AuthRouter';
import PrivateRoute from './customroutes/PrivateRoute';
import AdminRoute from './customroutes/AdminRoute';

const CustomSwitch = ({ children }) => {

   const dispatch = useDispatch();
   const [progress, setProgress] = useState(false)
   const [prevLoc, setPrevLoc] = useState("")
   const location = useLocation()

   useEffect(() => {
      setPrevLoc(location.pathname)
      setProgress(true)
   }, [location])

   useEffect(() => {
      setProgress(false)
   }, [prevLoc])

   useEffect(() =>{
       const getRefreshedToken = async() =>{
           let firstlogin = localStorage.getItem('firstLogin');
           if(firstlogin){
               try {
                   dispatch(authPending());
                   const res = await refreshToken();
                   if(res){
                     let authdata = {
                        token:res.access_token,
                        user:res.user,
                        plan:res.plans
                    }
                    dispatch(authSuccess(authdata));
                   }
               } catch(error) {
                   dispatch(authFail(error.response.data.msg));
               }
           }
       }
       getRefreshedToken();
   },[dispatch])

   return (
     <>
     {progress && <TopBarProgress />}
      <Switch>
         { children }
      </Switch>
     </> 
   )
}


const App = () =>{
  return (
     <BrowserRouter>
       <ToastContainer />
       <Header />
           <div className="main__block container-fluid">
               <CustomSwitch>
                 <AuthRouter component={Login} path='/' exact/>
                 <AuthRouter component={Register} path='/register' exact/>
                 <PrivateRoute component={Home} path='/home' exact/>
                 <AuthRouter component={VerifyAccount} exact path='/verification'/>
                 <AuthRouter component={ForgotPassword} path='/forgotpass' exact/>
                 <PrivateRoute component={Profile} path='/profile' exact/>
                 <PrivateRoute component={SubFolders} path='/folder/:id' exact/>
                 <PrivateRoute component={Settings} path='/settings' exact/>
                 <AdminRoute component={AdminDashboard} path='/admin/dashboard' exact/>
                 <Route component={NotFound} path='*'/>
               </CustomSwitch>
           </div>
     </BrowserRouter>
  );
}

export default App;
