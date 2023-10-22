import Navbar from "../features/nav-bar/Navbar";
import AdminProductDetails from "../features/admin/components/AdminProductDetail";

export default function ProductDetailsPage(){
    return(
        <div>
             <Navbar>
                 <AdminProductDetails></AdminProductDetails>
            </Navbar>

        </div>
       
    )
}