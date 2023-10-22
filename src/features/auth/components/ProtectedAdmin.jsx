import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux"; 
import { selectLoggedInUser } from "../authSlice";
export default function ProtectedAdmin({children}){
    const user=useSelector(selectLoggedInUser);
    if(!user)
    {
       return <Navigate to='/login' replace={true}></Navigate>
    }
    if(user && user.role!=='admin')
    {
       return <Navigate to='/' replace={true}></Navigate>
    }
    return children

}