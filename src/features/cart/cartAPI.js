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

export function fetchItemsByUserId() {
  return new Promise(async (resolve) =>{
    //ToDo:We will not hard code the URL
    const response=await fetch('http://localhost:3004/cart');
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
export async function resetCart() {
  //get all items of the user and delete one at a time
  return new Promise(async(resolve)=>{
    const response=await fetchItemsByUserId();
  const items=response.data;
  for(let index in items){
    await deleteItemFromCart(items[index].id);
  }
  resolve({status:'success'});
  })
}