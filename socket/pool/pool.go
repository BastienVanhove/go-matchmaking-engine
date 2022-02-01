package websocket

import "fmt"

type Pool struct {
    Register   chan *Client
    Unregister chan *Client
    Clients    map[*Client]bool
    Broadcast  chan Message
}

func NewPool() *Pool {
    return &Pool{
        Register:   make(chan *Client),
        Unregister: make(chan *Client),
        Clients:    make(map[*Client]bool),
        Broadcast:  make(chan Message),
    }
}

func (pool *Pool) Start() {
    for {
        select {
        case client := <-pool.Register:
            pool.Clients[client] = true
            cName := client.Name
            fmt.Println("Size of Connection Pool: ", len(pool.Clients))
            for client, _ := range pool.Clients {
                fmt.Println("le client est :", client)
                client.Conn.WriteJSON(Message{Type: 1, Body: " Joined the chat", Client: cName })
            }
            break
        case client := <-pool.Unregister:
            delete(pool.Clients, client)
            cName := client.Name
            fmt.Println("Size of Connection Pool: ", len(pool.Clients))
            for client, _ := range pool.Clients {
                client.Conn.WriteJSON(Message{Type: 1, Body: " Left the chat", Client: cName })
            }
            break
        case message := <-pool.Broadcast:
            fmt.Println("Sending message to all clients in Pool")
            for client, _ := range pool.Clients {
                fmt.Println("Message was send to", client.Name)
                if err := client.Conn.WriteJSON(message); err != nil {
                    fmt.Println(err)
                    return
                }
            }
        }
    }
}