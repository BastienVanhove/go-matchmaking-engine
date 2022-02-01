package websocket

import (
    "fmt"
    "log"

    "github.com/gorilla/websocket"
)

type Client struct {
    Name string
    Conn *websocket.Conn
    Pool *Pool
}

type Message struct {
    Type int    `json:"type"`
    Body string `json:"body"`
    Client string `json:"client"`
}

func (c *Client) Read() {
    defer func() {
        c.Pool.Unregister <- c
        c.Conn.Close()
    }()

    for {
        messageType, p, err := c.Conn.ReadMessage()

        if err != nil {
            log.Println(err)
            return
        }

        mess := string(p)

        message := Message{Type: messageType, Body: mess, Client: c.Name}
        fmt.Println(c.Name + " was send a message")
        c.Pool.Broadcast <- message
        fmt.Printf("Message Received: %+v\n", message)
    }
}