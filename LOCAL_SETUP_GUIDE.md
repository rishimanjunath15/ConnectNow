# Local Development Setup Guide

## Problem
When two people run the app on their own localhost, they connect to separate backend servers and can't join the same meeting.

## Solutions

### Option 1: Host-Client Setup (Recommended)

#### Host Setup (Person who creates the meeting):
1. **Find your local IP address:**
   ```powershell
   ipconfig
   ```
   Look for "IPv4 Address" under your active network adapter (usually something like `192.168.1.100`)

2. **Update environment.js:**
   ```javascript
   let LOCAL_HOST_IP = "192.168.1.100"; // Replace with your actual IP
   ```

3. **Start the backend:**
   ```powershell
   cd Backend
   npm start
   ```

4. **Start the frontend:**
   ```powershell
   cd frontend
   npm start
   ```

5. **Share your meeting code and IP with the other person**

#### Client Setup (Person joining the meeting):
1. **Don't start your own backend server**

2. **Update your environment.js:**
   ```javascript
   let LOCAL_HOST_IP = "192.168.1.100"; // Use the host's IP address
   ```

3. **Start only the frontend:**
   ```powershell
   cd frontend
   npm start
   ```

4. **Join using the meeting code provided by the host**

### Option 2: Use Production Server
Both users set:
```javascript
let IS_PROD = true;
```

This connects both users to the same remote server.

### Option 3: Use ngrok (Advanced)
The host can expose their local server using ngrok:

1. **Install ngrok:** Download from https://ngrok.com/
2. **Expose backend:**
   ```powershell
   ngrok http 8001
   ```
3. **Update environment.js with ngrok URL:**
   ```javascript
   let USE_LOCAL_HOST = false;
   const servers = "https://your-ngrok-url.ngrok.io";
   ```

## Important Notes

1. **Same Network**: For Option 1, both users must be on the same local network (same WiFi/router)

2. **Firewall**: The host might need to allow connections on port 8001 through Windows Firewall

3. **CORS**: The backend is already configured to accept connections from different origins

4. **Meeting Codes**: Meeting codes are just URL paths - when both users connect to the same backend, they can join the same meeting room

## Troubleshooting

### Connection Issues:
- Verify both users can access the backend at `http://HOST_IP:8001`
- Check Windows Firewall settings
- Ensure both are on the same network

### WebRTC Issues:
- The app uses STUN servers for NAT traversal
- If still having issues, both users might need to be on the same local network

### Backend Not Accessible:
The host needs to update their backend to listen on all interfaces. Update `Backend/src/app.js`:

```javascript
server.listen(app.get("port"), "0.0.0.0", () => {
    console.log(`LISTENING ON PORT ${app.get("port")} on all interfaces`);
});
```