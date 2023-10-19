export const createUser=(userData)=>{
  return new Promise(async(resolve)=>{
    const response=await fetch('http://localhost:3004/users',{
      method:'POST',
      body:JSON.stringify(userData),
      headers:{'content-type':'application/json'}
    })
    const data=await response.json();
    resolve({data});
  })
}

export const checkUser=(loginInfo)=>{
  return new Promise(async(resolve,reject)=>{
    const response=await fetch(`http://localhost:3004/users?email=${loginInfo.email}`)
    const data=await response.json();
    if(data.length){
      if(loginInfo.password===data[0].password){
        resolve({data:data[0]});
      }
      else{
        reject({message:'invalid userName or password'})
      }
      
    } 
    else{
      reject({message:'user not found'})
    }
  })
}

export function signOut(){
 return new Promise(async(resolve)=>{
    //To do : remove the session in the backend once server is done.
    resolve({data:'success'})
  })

}

