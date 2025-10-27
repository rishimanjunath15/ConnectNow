import React, { useContext, useState, useEffect } from 'react'
import withAuth from '../utils/withAuth'
import { useNavigate } from 'react-router-dom'
import "../App.css";
import { 
    Button, 
    IconButton, 
    TextField, 
    Card, 
    CardContent, 
    Typography, 
    Box, 
    Alert, 
    Chip, 
    Tooltip,
    Grid,
    Paper,
    Fab
} from '@mui/material';
import { 
    Restore as RestoreIcon, 
    VideoCall, 
    Login, 
    Wifi, 
    WifiOff, 
    Settings,
    People,
    Schedule,
    Security
} from '@mui/icons-material';
import { Authcontext } from '../controllers/Authcontrollers';
import ConnectionSetup from '../components/ConnectionSetup';
import connectionManager from '../config/connectionManager';

function HomeComponent() {
    let navigate = useNavigate();
    const [meetingCode, setMeetingCode] = useState("");
    const [showConnectionSetup, setShowConnectionSetup] = useState(false);
    const [connectionStatus, setConnectionStatus] = useState('checking');
    const [serverUrl, setServerUrl] = useState('');
    const [quickMeetingCode, setQuickMeetingCode] = useState('');
    const [connectionError, setConnectionError] = useState('');

    const {addToUserHistory} = useContext(Authcontext);

    useEffect(() => {
        checkConnection();
        generateQuickMeetingCode();
    }, []);

    const checkConnection = async () => {
        try {
            setConnectionError('');
            const workingServer = await connectionManager.findWorkingServer();
            setServerUrl(workingServer);
            setConnectionStatus('connected');
            console.log('Connected to server:', workingServer);
        } catch (error) {
            setConnectionStatus('disconnected');
            setConnectionError('Unable to connect to any server. Please check your internet connection or try manual setup.');
            console.error('Connection check failed:', error);
        }
    };

    const generateQuickMeetingCode = () => {
        const code = Math.random().toString(36).substring(2, 8).toUpperCase();
        setQuickMeetingCode(code);
    };

    const handleJoinVideoCall = async () => {
        if (!meetingCode.trim()) {
            alert('Please enter a meeting code');
            return;
        }
        
        if (connectionStatus !== 'connected') {
            setShowConnectionSetup(true);
            return;
        }

        try {
            await addToUserHistory(meetingCode);
            navigate(`/${meetingCode}`);
        } catch (error) {
            console.error('Error adding to history:', error);
            // Still navigate even if history fails
            navigate(`/${meetingCode}`);
        }
    };

    const handleQuickStart = async () => {
        if (connectionStatus !== 'connected') {
            setShowConnectionSetup(true);
            return;
        }

        try {
            await addToUserHistory(quickMeetingCode);
            navigate(`/${quickMeetingCode}`);
        } catch (error) {
            console.error('Error adding to history:', error);
            // Still navigate even if history fails
            navigate(`/${quickMeetingCode}`);
        }
    };

    const handleConnectionSetup = (url) => {
        setServerUrl(url);
        setConnectionStatus('connected');
        setConnectionError('');
        setShowConnectionSetup(false);
    };

    const getConnectionChip = () => {
        switch (connectionStatus) {
            case 'connected':
                return (
                    <Chip 
                        icon={<Wifi />} 
                        label="Connected" 
                        color="success" 
                        variant="outlined"
                        size="small"
                    />
                );
            case 'disconnected':
                return (
                    <Chip 
                        icon={<WifiOff />} 
                        label="Disconnected" 
                        color="error" 
                        variant="outlined"
                        size="small"
                        onClick={() => setShowConnectionSetup(true)}
                        clickable
                    />
                );
            default:
                return (
                    <Chip 
                        label="Checking..." 
                        variant="outlined"
                        size="small"
                    />
                );
        }
    };

    return (
        <>
            <div className="navBar">
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <VideoCall color="primary" />
                    <h2>ConnectNow</h2>
                    {getConnectionChip()}
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <Tooltip title="Connection Settings">
                        <IconButton onClick={() => setShowConnectionSetup(true)}>
                            <Settings />
                        </IconButton>
                    </Tooltip>
                    
                    <Tooltip title="Meeting History">
                        <IconButton onClick={() => navigate("/history")}>
                            <RestoreIcon />
                        </IconButton>
                    </Tooltip>

                    <Button 
                        onClick={() => {
                            localStorage.removeItem("token");
                            navigate("/auth");
                        }}
                        startIcon={<Login />}
                    >
                        Logout
                    </Button>
                </div>
            </div>

            <Box className="meetContainer" sx={{ p: 3 }}>
                <Grid container spacing={4} alignItems="center">
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Box>
                            <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
                                Connect Instantly
                            </Typography>
                            <Typography variant="h6" color="text.secondary" gutterBottom>
                                High-quality video calls made simple
                            </Typography>

                            {connectionStatus !== 'connected' && (
                                <Alert severity="warning" sx={{ mb: 3 }}>
                                    <Typography variant="body2">
                                        {connectionError || 'No server connection. Click "Setup Connection" to configure.'}
                                    </Typography>
                                    <Button 
                                        size="small" 
                                        onClick={() => setShowConnectionSetup(true)}
                                        sx={{ mt: 1 }}
                                    >
                                        Setup Connection
                                    </Button>
                                </Alert>
                            )}

                            {/* Quick Start Section */}
                            <Card sx={{ mb: 3, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                                <CardContent>
                                    <Box display="flex" alignItems="center" justifyContent="space-between">
                                        <Box>
                                            <Typography variant="h6" color="white" gutterBottom>
                                                Start Instant Meeting
                                            </Typography>
                                            <Typography variant="body2" color="rgba(255,255,255,0.8)">
                                                Meeting Code: {quickMeetingCode}
                                            </Typography>
                                        </Box>
                                        <Button 
                                            variant="contained" 
                                            color="secondary"
                                            onClick={handleQuickStart}
                                            startIcon={<VideoCall />}
                                            disabled={connectionStatus !== 'connected'}
                                        >
                                            Start Now
                                        </Button>
                                    </Box>
                                </CardContent>
                            </Card>

                            {/* Join Meeting Section */}
                            <Card>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                        Join a Meeting
                                    </Typography>
                                    <Box display="flex" gap={2} alignItems="center">
                                        <TextField 
                                            onChange={e => setMeetingCode(e.target.value)} 
                                            label="Meeting Code" 
                                            variant="outlined"
                                            placeholder="Enter 6-digit code"
                                            value={meetingCode}
                                            sx={{ flexGrow: 1 }}
                                        />
                                        <Button 
                                            onClick={handleJoinVideoCall} 
                                            variant="contained"
                                            startIcon={<Login />}
                                            disabled={connectionStatus !== 'connected'}
                                        >
                                            Join
                                        </Button>
                                    </Box>
                                </CardContent>
                            </Card>

                            {/* Features Section */}
                            <Box mt={4}>
                                <Grid container spacing={2}>
                                    <Grid size={{ xs: 6, sm: 3 }}>
                                        <Paper sx={{ p: 2, textAlign: 'center' }}>
                                            <People color="primary" sx={{ fontSize: 40, mb: 1 }} />
                                            <Typography variant="caption" display="block">
                                                Multi-user
                                            </Typography>
                                        </Paper>
                                    </Grid>
                                    <Grid size={{ xs: 6, sm: 3 }}>
                                        <Paper sx={{ p: 2, textAlign: 'center' }}>
                                            <Security color="primary" sx={{ fontSize: 40, mb: 1 }} />
                                            <Typography variant="caption" display="block">
                                                Secure
                                            </Typography>
                                        </Paper>
                                    </Grid>
                                    <Grid size={{ xs: 6, sm: 3 }}>
                                        <Paper sx={{ p: 2, textAlign: 'center' }}>
                                            <Schedule color="primary" sx={{ fontSize: 40, mb: 1 }} />
                                            <Typography variant="caption" display="block">
                                                Instant
                                            </Typography>
                                        </Paper>
                                    </Grid>
                                    <Grid size={{ xs: 6, sm: 3 }}>
                                        <Paper sx={{ p: 2, textAlign: 'center' }}>
                                            <VideoCall color="primary" sx={{ fontSize: 40, mb: 1 }} />
                                            <Typography variant="caption" display="block">
                                                HD Quality
                                            </Typography>
                                        </Paper>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Box textAlign="center">
                            <img 
                                src="/undraw.png" 
                                alt="Video Conference Illustration" 
                                style={{ 
                                    maxWidth: '100%', 
                                    height: 'auto',
                                    maxHeight: '400px'
                                }}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </Box>

            {/* Connection Setup Floating Button */}
            {connectionStatus !== 'connected' && (
                <Fab
                    color="primary"
                    aria-label="setup connection"
                    onClick={() => setShowConnectionSetup(true)}
                    sx={{
                        position: 'fixed',
                        bottom: 16,
                        right: 16,
                        animation: 'pulse 2s infinite'
                    }}
                >
                    <Settings />
                </Fab>
            )}

            <ConnectionSetup
                open={showConnectionSetup}
                onClose={() => setShowConnectionSetup(false)}
                onConnected={handleConnectionSetup}
            />
        </>
    )
}

export default withAuth(HomeComponent)