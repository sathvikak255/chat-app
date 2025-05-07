# 💬 Chat App

This chat application is a real-time messaging platform that enables users to communicate instantly through socket-based connections. Users can join a shared chat room, enter their name, and start sending and receiving messages with others in real time. The app provides a seamless experience with automatic message updates, user activity notifications (such as when someone joins or leaves), and a simple, responsive UI that works well on both desktop and mobile devices.

It is built using a React frontend for a dynamic user interface, and a Node.js + Express backend that handles WebSocket connections via Socket.io. This project serves as a foundational implementation of real-time communication and can be extended to include private messaging, authentication, message persistence, or additional UI features.
## 🚀 Features

- Real-time messaging using Socket.io  
- Create and join custom chat rooms  
- User join/leave notifications  
- Auto-scroll for new messages  
- Responsive design for mobile and desktop

## 🛠️ Tech Stack

- **Frontend:** React, CSS  
- **Backend:** Node.js, Express  
- **WebSockets:** Socket.io  
- **Deployment:** *(optional – add if applicable, e.g., Vercel, Heroku)*

## 📂 Folder Structure

```
chat-app/
├── client/         # React frontend
│   └── src/
├── server/         # Node + Express backend
│   └── index.js
├── package.json
└── README.md
```

## 📦 Installation & Running Locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/sathvikak255/chat-app.git
   cd chat-app
   ```

2. **Install dependencies for both client and server**
   ```bash
   cd server
   npm install

   cd ../client
   npm install
   ```

3. **Start the server**
   ```bash
   cd ../server
   node index.js
   ```

4. **Start the client**
   ```bash
   cd ../client
   npm start
   ```

5. Open your browser at `http://localhost:3000`

## 📸 Screenshots

*Add screenshots here to show the app in action.*

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you'd like to change.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
