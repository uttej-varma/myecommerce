import Footer from "../features/commonComponents/Footer";
import Navbar from "../features/nav-bar/Navbar";
import ProductDetails from "../features/product-list/ProductDetail";

export default function ProductDetailsPage(){
    return(
       <>
        <Navbar>
            <ProductDetails></ProductDetails>
        </Navbar>
        <Footer></Footer>
       </>
    )
}