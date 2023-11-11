// A mock function to mimic making an async request for data
export function fetchLoggedInUserOrders() {
  return new Promise(async (resolve) =>{
    const response=await fetch('http://localhost:3004/orders/own/');
    const data=await response.json();
    resolve({data});
    
  }
  );
}

export function fetchLoggedInUser() {
  return new Promise(async (resolve) =>{
    const response=await fetch('http://localhost:3004/users/own');
    const data=await response.json();
    resolve({data});
    
  }
  );
}
export const updateUser=(update)=>{
  return new Promise(async(resolve)=>{
    const response=await fetch('http://localhost:3004/users/',{
      method:'PATCH',
      body:JSON.stringify(update),
      headers:{'content-type':'application/json'}
    })
    const data=await response.json();
    resolve({data});
  })
}