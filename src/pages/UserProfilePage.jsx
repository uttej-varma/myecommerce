import Navbar from "../features/nav-bar/Navbar"
import UserProfile from "../features/user/components/UserProfile";

function UserProfilePage(){
    return(
       <div>
       <Navbar>
        <h1 className="mx-auto text-2xl ">My Profile</h1>
       <UserProfile></UserProfile>
       
      </Navbar>
       </div>
    )
}
export default UserProfilePage;