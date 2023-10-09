// A mock function to mimic making an async request for data
export function fetchAllProducts(amount = 1) {
  return new Promise(async (resolve) =>{
    //ToDo:We will not hard code the URL
    const response=await fetch('http://localhost:5000/products');
    const data=await response.json();
    resolve({data});
    
  }
  );
}

export function fetchProductsByFilter(filter) {
  //filter ={'category':smartphone}
  console.log(filter)
  let queryString='';
  for(let key in filter){
   if(key!=='_sort' && key!=='_order')
   {
    queryString+=`${key}_like=${filter[key]}&`
   }
   else{
    queryString+=`${key}=${filter[key]}&`
   }
  }
  console.log(queryString)
  return new Promise(async (resolve) =>{
    //ToDo:We will not hard code the URL
    const response=await fetch(`http://localhost:5000/products?${queryString}`);
    const data=await response.json();
    resolve({data});
    
  }
  );
}

