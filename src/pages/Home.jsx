import Footer from "../features/commonComponents/Footer";
import Navbar from "../features/nav-bar/Navbar";
import ProductDetails from "../features/product-list/ProductDetail";
import ProductList from "../features/product-list/ProductList";
export default function Home(){
  return(
    <>
       <Navbar>
        <ProductList></ProductList>
       </Navbar>
       <Footer></Footer>
    </>
  )
}