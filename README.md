
# Minimalistic Live Messaging App


## Table of Contents
- Introduction
- Prerequisites
- Installation
- Features
- System Architecture
- User Authentication
- Signup
- Login
- Message Requests
- Chats
- Messages
- Incomplete Parts
- Conclusion
- Future Enhancements

## Introduction

- This documentation outlines the user authentication and messaging system that allows users to register, log in, send interest messages, and engage in real-time chats with one another.

- STACK - MERN

## Prerequisites
- NodeJs
- MongoDB
- Websocket

## Installation
- Clone this Repo - [https://github.com/DEEPAK67578/DEEPAK67578-Live-Messaging-App-React-ExpressJs.git](https://github.com/user/repo/blob/branch/other_file.md)

- Frontend 
   - cd Frontend
   - npm install to install the dependencies
   - npm run dev to start the server
- Backend
   - cd Backend
   - npm install to install the dependencies
   - npm start to start the server
- Socket
   - cd socket
   - npm install to install the dependencies
   - npm start to start the server

## Features
- User registration and login functionality
- Browsing and sending interest messages to other users
- Viewing and managing received interest messages
- Real-time chat interface for connected users

## System Architecture
The system is composed of the following key components:

- Frontend: User interface for registration, login, browsing users, and chat.
- Backend: API endpoints for user management, interest handling, and chat functionality.
- Database: Storage for user credentials, interest messages, and chat history.
- Socket - To Make Real Time chats

## User Authentication
### Signup
- Endpoint: POST /signup
- Request Body

    - name(String)
    - email(String)
    - password(String)
    - imgPath(String)
    - description(String)

### login
- Endpoint: POST /login
- Request Body

    - email(String)
    - password(String)

## Users
### Get All Users
 - Endpoint: GET /getAllUsers

### Get Inividual User
 - Endpoint: GET /getUser/:id


## Message Requests
### Send Request
 - Endpoint: POST /requests
    - To(String)
    - From(String)
 
### Get All Request For Individual User
 - Endpoint: GET /getAllReq
    
### Accept or Reject Request
 - Endpoint: POST /accrejreq
    - Changed the request State in IndividualRequestModal to accept or Reject and      creating  new Chat Modal with members of senderId and recieverId


## Chats
### Create Chat
- Endpoint: POST /chat/createChat
    - Changed the request State in IndividualRequestModal to accept or Reject and      creating  new Chat Modal with members of senderId and recieverId

### Chat List
- Endpoint: GET /chat/:userId
    - To get the user Chat List

### User to User Chat Data
- Endpoint: GET /chat/find/:firstId/:secondId
    - To get the user to user Chat Database

## Messages
### Add Messages
- Endpoint: POST /message/addMessage
    - It adds the message to the database with approprite sender and reciever

### get Chat Messages
- Endpoint: GET /message/:chatId
    - To get the user Chat List

# Incomplete Parts
It may contain several bugs and it lacks error handling pages,If time is Extended, I can Implement and Handle These things

# Conclusion
The User Authentication and Messaging System is a comprehensive solution that facilitates secure user registration, login, and interaction through interest messages and real-time chat. By implementing essential features such as user authentication and a messaging interface, this project enables users to connect and communicate effectively.

Through the use of modern technologies like Node.js, Express, and WebSocket, the system ensures a responsive and engaging user experience. With clear API endpoints and structured functionalities, the application is designed for scalability and ease of use.

Future enhancements can further expand its capabilities, including improved user profiles, notification systems, and advanced security measures. This project serves as a solid foundation for developing social or community-based applications, allowing for seamless user interaction in a safe environment.

# Future Enhancements
Sending of Files can be implemented in Future







