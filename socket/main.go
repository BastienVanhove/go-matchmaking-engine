package main

import (
    "crypto/rand"
    "fmt"
    "net/http"

    "root/websocket"
)

//from package Utility
func GenerateRandomBytes(n int) ([]byte, error) {
	b := make([]byte, n)
	_, err := rand.Read(b)
	// Note that err == nil only if we read len(b) bytes.
	if err != nil {
		return nil, err
	}

	return b, nil
}

func GenerateRandomString(n int) (string, error) {
	const letters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-"
	bytes, err := GenerateRandomBytes(n)
	if err != nil {
		return "", err
	}
	for i, b := range bytes {
		bytes[i] = letters[b%byte(len(letters))]
	}
	return string(bytes), nil
}

func serveWs(pool *websocket.Pool, w http.ResponseWriter, r *http.Request) {
    fmt.Println("WebSocket Endpoint Hit")
    conn, err := websocket.Upgrade(w, r)
    if err != nil {
        fmt.Fprintf(w, "%+v\n", err)
    }

    ran, err := GenerateRandomString(8)
    if err != nil {
        return
    }

    client := &websocket.Client{
        Name: ran,
        Conn: conn,
        Pool: pool,
    }

    pool.Register <- client
    client.Read()

	fmt.Println(client)
}

func setupRoutes() {
    pool := websocket.NewPool()

    go pool.Start()

    http.HandleFunc("/ws", func(w http.ResponseWriter, r *http.Request) {
        serveWs(pool, w, r)
    })
    
}

func main() {
    fmt.Println("Distributed Chat App v0.01")

	//faire un createur de pool 
	//je sais un mini projet d'echec qui creer des recherche
	//et quand le mec click ca rejoin la game
    setupRoutes()

    http.ListenAndServe(":9100", nil)
}