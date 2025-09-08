
let IS_PROD = false; // Set to false for local development
const servers = IS_PROD 
    ? "https://video-conferencing-mern-webrtc-6.onrender.com"
    : "http://localhost:8001";
  
export default servers;