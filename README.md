# 🎥 ConnectNow - Real-Time Video Conferencing# 🎥 ConnectNow - Automated Video Conferencing



A modern, clean video conferencing application built with React, Node.js, WebRTC, and Socket.IO.## ✨ What's New - Fully Automated Setup!



## ✨ FeaturesConnectNow now features **intelligent auto-configuration** that handles all the complex networking automatically!



✅ **Real-time Video & Audio Calls** - Crystal clear communication with WebRTC  ### 🚀 Super Quick Start

✅ **Multi-user Support** - Connect with multiple people simultaneously  

✅ **Chat Messaging** - Send text messages during calls  #### For Meeting Hosts:

✅ **Screen Sharing** - Share your screen with participants  ```bash

✅ **User Authentication** - Secure login and registration with bcrypt  # Just double-click this file:

✅ **Meeting History** - Track your previous video calls  start-connectnow.bat

✅ **Instant Meeting Codes** - Join calls with simple 6-digit codes  ```

✅ **Smart Server Detection** - Automatically finds the best server  

✅ **Beautiful UI** - Modern Material Design interface  #### For Meeting Guests:

```bash

## 🚀 Quick Start# Just double-click this file:

join-meeting.bat

### Prerequisites```

- Node.js 16+

- npm or yarn**That's it!** The app handles everything else automatically.

- MongoDB (local or Atlas)

- Modern web browser## 🎯 Key Features



### Installation### 🤖 Automated Connection Management

- **Auto-detects** the best server to use

1. **Clone the repository**- **Smart fallback** to cloud servers if local fails

```bash- **One-click setup** for most scenarios

git clone <repository-url>- **Real-time connection testing** and status

cd ConnectNow

```### 🎨 Enhanced User Interface

- **Beautiful modern design** with gradients and animations

2. **Setup Backend**- **Mobile-responsive** layout for all devices

```bash- **Instant meeting creation** with auto-generated codes

cd Backend- **Visual connection status** indicators

npm install- **Interactive setup wizard** with step-by-step guidance

cp .env.example .env

# Edit .env with your MongoDB URI### 🔧 Smart Configuration

npm run dev- **Auto IP detection** for local network sharing

```- **Copy-to-clipboard** for easy sharing

- **Multiple connection modes** (auto, local, cloud)

3. **Setup Frontend** (new terminal)- **Real-time server testing** before connecting

```bash

cd frontend## 📱 How It Works

npm install

npm start### For the Host (Meeting Creator):

```1. **Run `start-connectnow.bat`** → Everything starts automatically

2. **Open http://localhost:3000** → Beautiful dashboard loads

4. **Open browser**3. **Click "Start Instant Meeting"** → Auto-generates meeting code

```4. **Share your IP and meeting code** → Others can join

http://localhost:3000

```### For Guests (Meeting Joiners):

1. **Run `join-meeting.bat`** → Frontend starts in guest mode

## 📖 Documentation2. **Open http://localhost:3000** → Dashboard loads

3. **Connection setup appears** → Enter host's IP automatically

- **[SETUP_GUIDE.md](./SETUP_GUIDE.md)** - Complete setup and configuration guide4. **Join with meeting code** → Seamless connection

- **[TROUBLESHOOTING.md](./TROUBLESHOOTING.md)** - Common issues and solutions

- **[PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)** - Project architecture and organization## 🌟 User Experience

- **[CLEANUP_SUMMARY.md](./CLEANUP_SUMMARY.md)** - Project cleanup changes

### Home Dashboard

## 🏗️ Project Structure- **🎯 Instant Meeting**: One-click meeting creation

- **🔗 Join Meeting**: Enter 6-digit codes easily  

```- **📊 Connection Status**: Real-time server connectivity

ConnectNow/- **⚙️ Smart Setup**: Guided configuration wizard

├── Backend/                 # Node.js server- **📱 Mobile Ready**: Works perfectly on phones/tablets

│   ├── src/

│   │   ├── controllers/     # Business logic### Video Meeting Interface

│   │   ├── models/          # Database schemas- **🎥 HD Video**: Crystal clear video quality

│   │   └── routes/          # API endpoints- **💬 Live Chat**: Real-time messaging during calls

│   └── .env                 # Environment variables- **🖥️ Screen Share**: Share your screen with participants

├── frontend/                # React application- **🎮 Easy Controls**: Intuitive video/audio/screen buttons

│   └── src/

│       ├── config/          # Configuration & connection management## 🔧 Technical Features

│       ├── pages/           # Page components

│       ├── components/      # Reusable components### Backend Enhancements

│       ├── controllers/     # State management- **Multi-interface binding** (`0.0.0.0:8001`) for network sharing

│       ├── services/        # API services- **Enhanced logging** with connection tracking

│       └── utils/           # Helper functions- **Test endpoint** for connection validation

└── Documentation files- **CORS optimization** for cross-origin requests

```

### Frontend Innovations

## 🎯 How to Use- **Connection Manager**: Auto-detects and tests servers

- **Setup Wizard**: Step-by-step configuration guide

### 1. Register or Login- **Status Monitoring**: Real-time connection health

- Navigate to `/auth`- **Error Recovery**: Graceful handling of connection issues

- Create a new account or sign in

- Credentials are securely hashed## 🚨 Troubleshooting Made Easy



### 2. Create or Join a Meeting### Connection Issues

- **Create**: Click "Start Instant Meeting" for a 6-digit code- **Red "Disconnected" chip**: Click it to open connection setup

- **Join**: Enter someone else's meeting code- **Floating setup button**: Appears when connection needed

- **Auto-retry logic**: Attempts multiple servers automatically

### 3. Share the Code

- Copy your meeting code### Network Setup

- Share with friends via any platform- **Windows Firewall**: Script alerts you if ports need opening

- They can join by entering the code- **IP Detection**: Shows your local IP automatically

- **Copy-paste ready**: All connection details are shareable

### 4. Enjoy the Call

- Toggle video/audio## 📞 Support Scenarios

- Send chat messages

- Share your screen### Same Network (Best Performance)

- Click "End Call" when done1. Host runs `start-connectnow.bat`

2. Guests run `join-meeting.bat`  

## 🛠️ Technology Stack3. Guests enter host's IP in setup wizard

4. Everyone joins with same meeting code

### Backend

- **Express.js** - Web framework### Different Networks (Internet)

- **Socket.IO** - Real-time communication1. Both users let app auto-connect to cloud server

- **MongoDB** - Database2. No manual configuration needed

- **Mongoose** - ODM3. Works globally with internet connection

- **bcrypt** - Password hashing

- **WebRTC** - Peer-to-peer communication### Mixed Setup

1. Some users connect locally to host

### Frontend2. Others connect via cloud server

- **React 19** - UI framework3. All join same meeting room

- **Material-UI** - Component library4. Seamless experience for everyone

- **Socket.IO Client** - WebSocket client

- **WebRTC API** - Video/audio## 🎉 Success Indicators

- **Axios** - HTTP client

✅ **Green "Connected" chip** → Ready for meetings  

## 🔐 Security✅ **Auto-generated meeting codes** → Instant meeting creation  

✅ **Smooth animations** → Modern, polished interface  

- ✅ Password hashing with bcrypt (10 rounds)✅ **Real-time status** → Always know your connection state  

- ✅ Token-based authentication✅ **One-click actions** → Start or join meetings instantly  

- ✅ CORS protection

- ✅ Environment variables for secrets---

- ✅ Input validation on all endpoints

## 🏆 The Result

## 📡 Real-Time Communication

**Zero-configuration video conferencing that "just works"**

### WebSocket Events

```- No manual IP editing

Client → Server:- No complex network setup

- join-call      # Join a meeting room- No technical knowledge required

- signal         # Send WebRTC signal- Professional-grade video quality

- chat-message   # Send message- Beautiful, intuitive interface

- disconnect     # Leave room

**Just run the script, share a code, and start your meeting!**
Server → Client:
- user-joined    # Someone joined
- signal         # Receive WebRTC signal
- chat-message   # Receive message
- user-left      # Someone left
```

## 🌐 API Endpoints

### Authentication
```
POST   /api/v1/users/register        # Register
POST   /api/v1/users/login           # Login
GET    /api/v1/users/test            # Test connection
```

### History
```
GET    /api/v1/users/getAllActivity  # Get meetings
POST   /api/v1/users/addActivity     # Add meeting
```

## 🖥️ Local Network Setup

To connect two laptops on the same WiFi:

1. Find your IP address:
   ```bash
   # Windows
   ipconfig
   
   # Mac/Linux
   ifconfig
   ```

2. Update frontend `.env`:
   ```
   REACT_APP_SERVER_LOCAL_1=http://<YOUR_IP>:8001
   ```

3. Both users navigate to `http://<HOST_IP>:3000`

4. Share the meeting code

## 🚀 Production Deployment

### Backend (Heroku/Railway/Render)
```bash
# Set environment variables
MONGODB_URI=<your-mongodb-uri>
NODE_ENV=production
CORS_ORIGIN_PROD=<your-domain>
```

### Frontend (Vercel/Netlify)
```bash
# Build
npm run build

# Deploy from 'build' folder
# Set environment variables in platform dashboard
```

## 🐛 Troubleshooting

For issues, check:
- **[TROUBLESHOOTING.md](./TROUBLESHOOTING.md)** - Comprehensive troubleshooting guide
- Browser console (F12)
- Terminal output
- Firewall settings

## 📝 Environment Variables

### Backend (.env)
```env
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/connectnow
PORT=8001
NODE_ENV=development
CORS_ORIGIN_1=http://localhost:3000
```

### Frontend (.env)
```env
REACT_APP_SERVER_LOCAL_1=http://localhost:8001
REACT_APP_ENV=development
```

## 🎓 Learning Resources

### WebRTC
- [MDN WebRTC](https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API)
- [WebRTC Standards](https://webrtc.org/)

### Socket.IO
- [Socket.IO Docs](https://socket.io/docs/)
- [Real-time Events](https://socket.io/docs/emit-cheatsheet/)

### React
- [React Docs](https://react.dev)
- [React Hooks](https://react.dev/reference/react)

## 📄 License

This project is open source and available under the MIT License.

## 👥 Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📞 Support

For issues and questions:
1. Check [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)
2. Review existing GitHub issues
3. Create a new issue with details

---

**Ready to start?** See [SETUP_GUIDE.md](./SETUP_GUIDE.md) for detailed instructions!

**Questions?** Check [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) for common issues!

**Happy Video Calling! 🎥**
