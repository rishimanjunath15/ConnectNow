
// Auto-detect connection configuration
class ConnectionManager {
    constructor() {
        this.servers = [
            "http://localhost:8001", // Primary local port
            "http://localhost:8002", // Alternative local port
            "http://localhost:8003", // Alternative local port
            "http://localhost:8004", // Alternative local port
            "https://video-conferencing-mern-webrtc-6.onrender.com", // Production server
        ];
        this.currentServer = null;
    }

    async findWorkingServer() {
        if (this.currentServer) return this.currentServer;

        // Check for custom server in localStorage
        const customServer = localStorage.getItem('custom_server');
        if (customServer) {
            if (await this.testConnection(customServer)) {
                this.currentServer = customServer;
                return customServer;
            }
        }

        // Test servers in order
        for (const server of this.servers) {
            console.log(`Testing connection to: ${server}`);
            if (await this.testConnection(server)) {
                this.currentServer = server;
                localStorage.setItem('last_working_server', server);
                console.log(`✅ Connected to: ${server}`);
                return server;
            }
        }

        // Fallback to production server
        console.log('Using production server as fallback');
        this.currentServer = this.servers[this.servers.length - 1];
        return this.currentServer;
    }

    async testConnection(server) {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 3000);
            
            const response = await fetch(`${server}/api/v1/users/test`, {
                method: 'GET',
                signal: controller.signal
            });
            
            clearTimeout(timeoutId);
            return response.ok;
        } catch (error) {
            console.log(`Connection failed to ${server}:`, error.message);
            return false;
        }
    }

    setCustomServer(server) {
        localStorage.setItem('custom_server', server);
        this.currentServer = server;
    }

    clearCustomServer() {
        localStorage.removeItem('custom_server');
        this.currentServer = null;
    }

    // Get all available local servers for display
    getLocalServers() {
        return this.servers.filter(server => server.includes('localhost'));
    }

    // Get production server
    getProductionServer() {
        return this.servers.find(server => server.includes('https'));
    }
}

const connectionManager = new ConnectionManager();
export default connectionManager;