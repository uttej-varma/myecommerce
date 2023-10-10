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

export function fetchProductsByFilter({filter,sort}) {
  //filter ={'category':smartphone}
  //filtertobedone={'category}:['smartphone','laptop']
  //sort={_sort:"price",_order=desc}
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
      queryString+=`${key}=${filter[key]}&`
  }
  console.log(queryString)
  return new Promise(async (resolve) =>{
    //ToDo:We will not hard code the URL
    const response=await fetch(`http://localhost:3004/products?${queryString}`);
    const data=await response.json();
    resolve({data});
    
  }
  );
}

