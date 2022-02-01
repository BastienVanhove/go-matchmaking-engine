
/*
const socket = new WebSocket("ws://localhost:9100/ws")

const btn = document.getElementById("btn") as HTMLButtonElement
const containText = document.querySelector('.containText') as HTMLDivElement

const sendInput = document.getElementById("chat") as HTMLInputElement

const sendMessage = () =>{
    let msg = {
        message: String(sendInput.value),
    }
    socket.send(JSON.stringify(msg))
    sendInput.value = ""
}

const isJson = (str : string) : boolean => {
  try {
      JSON.parse(str);
  } catch (e) {
      return false;
  }
  return true;
}

sendInput.addEventListener("keydown",(e)=>{
  if(e.key == "Enter" && sendInput.value != "") sendMessage()
})

const socketConnnexionStart = () => {
  console.log("Attempting Connection...");

  socket.onopen = () => {
    console.log("Successfully Connected");
  };

  socket.onmessage = (msg) => {
    const data = JSON.parse(msg.data);
    const text = document.createElement("p")

    if(isJson(data.body)) {
      (()=>{
        const dataObject = JSON.parse(data.body)
        const name = document.createElement("span")
        const core = document.createElement("span")

        name.className = "name"
        name.innerHTML = `${data.client}`

        core.innerHTML = ` send a message : ${dataObject.message}`

        text.appendChild(name)
        text.appendChild(core)

        console.log(dataObject)
      })()
    } else {
      (()=>{
        const name = document.createElement("span")
        const core = document.createElement("span")

        name.className = "name"
        name.innerHTML = `${data.client}`

        core.innerHTML = `${data.body}`

        text.appendChild(name)
        text.appendChild(core)
      })()
    }
    
    containText.appendChild(text)
  }

  socket.onclose = event => {
    console.log("Socket Closed Connection: ", event);
  }

  socket.onerror = error => {
    console.log("Socket Error: ", error);
  }
}

socketConnnexionStart()
*/