
# Simple Chat App

A basic real-time chat app built with Node.js, Express, and Socket.IO. Users join rooms entering a room name and send messages to others in the same room. 

Messages are logged to `output/chat_log.txt`.

## Prerequisites
- Docker installed
- A web browser

## How to Build and Run

While on the current folder/directory, do the following 

        Step1: Create the docker image from the docker file using: docker build -t chatapp .

        Step2: Run image as a container         using:docker run -d -p 3000:3000 chatapp

Open your web browser and type localhost:3000 and press enter

## **Clone the Repository**
   ```bash
   git clone 
   cd chatapp