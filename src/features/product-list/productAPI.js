// A mock function to mimic making an async request for data
export function fetchAllProducts(amount = 1) {
  return new Promise(async (resolve) =>{
    //ToDo:We will not hard code the URL
    const response=await fetch('http://localhost:3004/products');
    const data=await response.json();
    resolve({data});
    
  }
  );
}

export function fetchProductsByFilter({filter,sort,pagination}) {
  //filter ={'category':smartphone}
  //filtertobedone={'category}:['smartphone','laptop']
  //sort={_sort:"price",_order=desc}
  //pagination={_page:1,_limit:10}  //_page=1&_limit=10
  console.log(filter)
  let queryString='';
  for(let key in filter){
    const categoryValues=filter[key];
    if(categoryValues.length){
      const lastCategoryValue=categoryValues[categoryValues.length-1];
      queryString+=`${key}_like=${lastCategoryValue}&`
    }
  }
  for(let key in sort){
      queryString+=`${key}=${sort[key]}&`
  }
  for(let key in pagination){
    queryString+=`${key}=${pagination[key]}&`
}
  console.log(queryString)
  return new Promise(async (resolve) =>{
    //ToDo:We will not hard code the URL
    const response=await fetch(`http://localhost:3004/products?${queryString}`);
    const data=await response.json();
    const totalItems=await response.headers.get('X-Total-Count');
    resolve({data:{products:data,totalItems:totalItems}});
    
  }
  );
}

export function fetchCategories() {
  return new Promise(async (resolve) =>{
    //ToDo:We will not hard code the URL
    const response=await fetch('http://localhost:3004/categories');
    const data=await response.json();
    resolve({data});
    
  }
  );
}

export function fetchBrands() {
  return new Promise(async (resolve) =>{
    //ToDo:We will not hard code the URL
    const response=await fetch('http://localhost:3004/brands');
    const data=await response.json();
    resolve({data});
    
  }
  );
}

export function fetchProductById(id){
  return new Promise(async (resolve)=>{
    const response=await fetch('http://localhost:3004/products/'+id);
    const data=await response.json();
    resolve({data})
  })
}
