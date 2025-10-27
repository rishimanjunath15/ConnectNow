// Connection Setup Component
import React, { useState, useEffect } from 'react';
import { 
    Dialog, 
    DialogTitle, 
    DialogContent, 
    DialogActions, 
    Button, 
    TextField, 
    Typography, 
    Box, 
    Alert, 
    Chip,
    CircularProgress,
    Stepper,
    Step,
    StepLabel,
    Card,
    CardContent,
    IconButton,
    Tooltip
} from '@mui/material';
import { 
    Wifi, 
    WifiOff, 
    Settings, 
    Info, 
    CheckCircle, 
    Error,
    Refresh,
    ContentCopy
} from '@mui/icons-material';
import connectionManager from '../config/connectionManager';

const ConnectionSetup = ({ open, onClose, onConnected }) => {
    const [step, setStep] = useState(0);
    const [testing, setTesting] = useState(false);
    const [connectionStatus, setConnectionStatus] = useState('disconnected');
    const [serverUrl, setServerUrl] = useState('');
    const [customServer, setCustomServer] = useState('');
    const [showAdvanced, setShowAdvanced] = useState(false);
    const [localIP, setLocalIP] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const steps = [
        'Choose Connection Type',
        'Test Connection',
        'Ready to Connect'
    ];

    useEffect(() => {
        if (open) {
            detectLocalIP();
            autoDetectConnection();
        }
    }, [open]);

    const detectLocalIP = async () => {
        try {
            // Use WebRTC to detect local IP
            const pc = new RTCPeerConnection({
                iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
            });
            
            pc.createDataChannel('');
            const offer = await pc.createOffer();
            await pc.setLocalDescription(offer);
            
            pc.onicecandidate = (event) => {
                if (event.candidate) {
                    const candidate = event.candidate.candidate;
                    const ipMatch = candidate.match(/([0-9]{1,3}\.){3}[0-9]{1,3}/);
                    if (ipMatch && !ipMatch[0].startsWith('127.')) {
                        setLocalIP(ipMatch[0]);
                        pc.close();
                    }
                }
            };
        } catch (error) {
            console.log('Could not detect local IP:', error);
        }
    };

    const autoDetectConnection = async () => {
        setTesting(true);
        setStep(1);
        
        try {
            const workingServer = await connectionManager.findWorkingServer();
            setServerUrl(workingServer);
            setConnectionStatus('connected');
            setStep(2);
            setErrorMessage('');
        } catch (error) {
            setConnectionStatus('error');
            setErrorMessage('No server connection available. Please configure manually.');
            setShowAdvanced(true);
        } finally {
            setTesting(false);
        }
    };

    const testCustomConnection = async () => {
        if (!customServer) return;
        
        setTesting(true);
        const isWorking = await connectionManager.testConnection(customServer);
        
        if (isWorking) {
            connectionManager.setCustomServer(customServer);
            setServerUrl(customServer);
            setConnectionStatus('connected');
            setStep(2);
            setErrorMessage('');
        } else {
            setConnectionStatus('error');
            setErrorMessage('Could not connect to the specified server.');
        }
        
        setTesting(false);
    };

    const handleConnect = () => {
        onConnected(serverUrl);
        onClose();
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
    };

    const renderStepContent = () => {
        switch (step) {
            case 0:
                return (
                    <Box>
                        <Typography variant="h6" gutterBottom>
                            How do you want to connect?
                        </Typography>
                        
                        <Card sx={{ mb: 2, cursor: 'pointer' }} onClick={() => autoDetectConnection()}>
                            <CardContent>
                                <Box display="flex" alignItems="center">
                                    <Wifi color="primary" sx={{ mr: 2 }} />
                                    <Box>
                                        <Typography variant="h6">Automatic (Recommended)</Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Let us find the best server for you
                                        </Typography>
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>

                        <Card sx={{ mb: 2, cursor: 'pointer' }} onClick={() => setShowAdvanced(true)}>
                            <CardContent>
                                <Box display="flex" alignItems="center">
                                    <Settings color="primary" sx={{ mr: 2 }} />
                                    <Box>
                                        <Typography variant="h6">Manual Setup</Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Connect to a specific server or local network
                                        </Typography>
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>

                        {showAdvanced && (
                            <Box mt={3}>
                                <Typography variant="h6" gutterBottom>
                                    Connection Options
                                </Typography>
                                
                                <Alert severity="info" sx={{ mb: 2 }}>
                                    <Typography variant="body2">
                                        <strong>For local meetings:</strong> One person hosts, others connect to their IP address
                                    </Typography>
                                </Alert>

                                {localIP && (
                                    <Box mb={2}>
                                        <Typography variant="body2" gutterBottom>
                                            Your local IP address:
                                        </Typography>
                                        <Box display="flex" alignItems="center" gap={1}>
                                            <Chip 
                                                label={localIP} 
                                                color="primary" 
                                                variant="outlined"
                                            />
                                            <Tooltip title="Copy to clipboard">
                                                <IconButton size="small" onClick={() => copyToClipboard(localIP)}>
                                                    <ContentCopy fontSize="small" />
                                                </IconButton>
                                            </Tooltip>
                                        </Box>
                                        <Typography variant="caption" color="text.secondary">
                                            Share this with others to connect to your local server
                                        </Typography>
                                    </Box>
                                )}

                                <TextField
                                    fullWidth
                                    label="Server URL"
                                    placeholder="http://192.168.1.100:8001 or https://your-server.com"
                                    value={customServer}
                                    onChange={(e) => setCustomServer(e.target.value)}
                                    sx={{ mb: 2 }}
                                    helperText="Enter the server URL to connect to"
                                />

                                <Box display="flex" gap={1}>
                                    <Button 
                                        variant="contained" 
                                        onClick={testCustomConnection}
                                        disabled={!customServer || testing}
                                        startIcon={testing ? <CircularProgress size={16} /> : null}
                                    >
                                        {testing ? 'Testing...' : 'Test Connection'}
                                    </Button>
                                    
                                    <Button 
                                        variant="outlined" 
                                        onClick={() => setCustomServer(`http://${localIP}:8001`)}
                                        disabled={!localIP}
                                    >
                                        Use My IP
                                    </Button>
                                </Box>
                            </Box>
                        )}
                    </Box>
                );

            case 1:
                return (
                    <Box textAlign="center">
                        <CircularProgress size={60} sx={{ mb: 2 }} />
                        <Typography variant="h6" gutterBottom>
                            Testing Connection...
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Finding the best server for your meeting
                        </Typography>
                    </Box>
                );

            case 2:
                return (
                    <Box textAlign="center">
                        <CheckCircle color="success" sx={{ fontSize: 60, mb: 2 }} />
                        <Typography variant="h6" gutterBottom>
                            Connection Ready!
                        </Typography>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                            Connected to: {serverUrl}
                        </Typography>
                        
                        <Alert severity="success" sx={{ mt: 2 }}>
                            You're ready to create or join meetings!
                        </Alert>
                    </Box>
                );

            default:
                return null;
        }
    };

    return (
        <Dialog open={open} maxWidth="sm" fullWidth>
            <DialogTitle>
                <Box display="flex" alignItems="center" gap={1}>
                    <Wifi />
                    Connection Setup
                </Box>
            </DialogTitle>
            
            <DialogContent>
                <Stepper activeStep={step} alternativeLabel sx={{ mb: 3 }}>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>

                {errorMessage && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {errorMessage}
                    </Alert>
                )}

                {renderStepContent()}
            </DialogContent>

            <DialogActions>
                {step === 0 && (
                    <Button onClick={onClose}>
                        Cancel
                    </Button>
                )}
                
                {step === 2 && (
                    <>
                        <Button onClick={() => setStep(0)}>
                            Change Connection
                        </Button>
                        <Button variant="contained" onClick={handleConnect}>
                            Continue
                        </Button>
                    </>
                )}
            </DialogActions>
        </Dialog>
    );
};

export default ConnectionSetup;