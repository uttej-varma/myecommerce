export const createUser=(userData)=>{
  return new Promise(async(resolve,reject)=>{
    const response=await fetch('http://localhost:3004/auth/signup',{
      method:'POST',
      body:JSON.stringify(userData),
      headers:{'content-type':'application/json'}
    })
    if(response.ok){
      const data=await response.json();
    resolve({data});

    }
    else{
      const err=await response.json();
       reject(err)
    }
    
  })
}

export const checkUser=(loginInfo)=>{
  return new Promise(async(resolve,reject)=>{
   try{
    const response=await fetch(`http://localhost:3004/auth/login`,{
      method:'POST',
      body:JSON.stringify(loginInfo),
      headers:{'content-type':'application/json'}
    })
    if(response.ok){
      const data=await response.json();
    
      resolve({data})

    }
    else{
      const err=await response.json();
       reject(err)
    }
   
   }
   catch(e){
    reject(e)
   }
   
  })
}

export function signOut(){
 return new Promise(async(resolve)=>{
    //To do : remove the session in the backend once server is done.
    resolve({data:'success'})
  })

}

