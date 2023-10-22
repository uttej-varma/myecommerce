import Navbar from "../features/nav-bar/Navbar";
import AdminOrders from "../features/admin/components/AdminOrders";

export default function AdminOrdersPage(){
    return(
        <div>
             <Navbar>
                 <AdminOrders></AdminOrders>
            </Navbar>

        </div>
       
    )
}