const generateRandomString = (length : number) => {
    let result           = '';
    const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
      characters.length));
   }
   return result;
}

const getUserFromDb = () => {
    return {
        id: 0,
        name: generateRandomString(8),
        password: "root",
    }
}

const user = getUserFromDb()
const profile = document.querySelector("#profile") as HTMLDivElement

const initClientUser = () =>{
    const name = user.name
    profile.innerHTML = "you are " + name
}

initClientUser()

interface User {
    id: number,
    name: string,  
    password: string,
}

// matchmaking engine

const startMatchMaking = (user : User) => {
    console.log(user, "want a match")
}

const start = document.querySelector("#start") as HTMLButtonElement

start.addEventListener("click", ()=>{
    startMatchMaking(user)
})




