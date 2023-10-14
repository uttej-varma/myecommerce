export const addTocart=(item)=>{
  return new Promise(async(resolve)=>{
    const response=await fetch('http://localhost:3004/cart',{
      method:'POST',
      body:JSON.stringify(item),
      headers:{'content-type':'application/json'}
    });
    const data=await response.json();
    resolve({data});
  });
}

export function fetchItemsByUserId(userId) {
  return new Promise(async (resolve) =>{
    //ToDo:We will not hard code the URL
    const response=await fetch('http://localhost:3004/cart?user='+userId);
    const data=await response.json();
    resolve({data});
    
  }
  );
}

export function updateCart(update) {
  return new Promise(async(resolve)=>{
    const response=await fetch('http://localhost:3004/cart/'+update.id,{
      method:'PATCH',
      body:JSON.stringify(update),
      headers:{'content-type':'application/json'}
    });
    const data=await response.json();
    resolve({data});
  });
}

export function deleteItemFromCart(itemId) {
  return new Promise(async(resolve)=>{
    const response=await fetch('http://localhost:3004/cart/'+itemId,{
      method:'DELETE',
      headers:{'content-type':'application/json'}
    });
    const data=await response.json();
    resolve({data:{id:itemId,message:'successfully deleted'}});
  });
}