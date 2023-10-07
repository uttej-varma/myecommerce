import Navbar from "../features/nav-bar/Navbar";
import ProductList from "../features/product-list/ProductList";
export default function Home(){
  return(
    <>
       <Navbar>
        <ProductList></ProductList>
       </Navbar>
    </>
  )
}