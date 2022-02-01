const generateRandomString = (length : number) => {
    let result           = '';
    const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
      characters.length));
   }
   return result;
}

interface User {
    id: number,
    name: string,  
    password: string,
}

const getUserFromDb = ():User => {
    return {
        id: 0,
        name: generateRandomString(8),
        password: "root",
    }
}
interface MatchMaking{
    socket : WebSocket;
    createVisualMatchmaking: Function;
    launchMatchMaking : Function;
    stopMatchMaking : Function;
    container: HTMLElement;
    user: User;
    output: HTMLDivElement | null;
    startButton: HTMLButtonElement | null;
    stopButton: HTMLButtonElement | null;
}
class MatchMaking implements MatchMaking{
    constructor(socket: string, container : HTMLElement, user : User) {
        this.socket = new WebSocket(socket)
        this.container = container
        this.user = user
        this.startButton = null
        this.stopButton = null
        this.output = null


        this.createVisualMatchmaking = () =>{

            this.startButton = document.createElement('button')
            this.stopButton = document.createElement('button')

            this.startButton.innerHTML = "launch matchmaking"
            this.stopButton.innerHTML = "stop matchmaking"

            /*
            if (this.startButton){
                this.startButton.addEventListener("click", ()=>{
                    this.launchMatchMaking()
                })
            }
            */

            const buttonContainer = document.createElement('div')
            buttonContainer.appendChild(this.startButton)
            buttonContainer.appendChild(this.stopButton)

            buttonContainer.style.display = "flex"
            buttonContainer.style.border = "1px solid black"
            buttonContainer.style.width = "100%"

            this.output = document.createElement('div')

            this.output.style.border = "1px solid orange"
            this.output.innerHTML = "this is output"
            this.output.style.width = "100%"

            this.container.appendChild(buttonContainer)
            this.container.appendChild(this.output)

        }

        this.createVisualMatchmaking()

        this.launchMatchMaking = () =>{
            console.log("Attempting connection...")
            this.socket.onopen = () => {
                console.log("Successfully Connected");
            };
            this.socket.onclose = () => {
                console.log("match making annuler")
            }
            this.socket.onmessage = (msg) => {
                const data = JSON.parse(msg.data);
                console.log(data)
            }
        }

        this.launchMatchMaking()

        this.stopMatchMaking = () =>{
            this.socket.close()
        }

    }
}
const containerMatchMaking = document.querySelector(".matchmaking") as HTMLElement;

const matchMakingExample = new MatchMaking
    (
        "ws://localhost:9100/matchmaking", 
        containerMatchMaking,
        getUserFromDb()
    )







