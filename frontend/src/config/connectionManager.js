/**
 * Connection Manager - Server Detection and Management
 * Handles automatic server detection with caching and background verification
 */

class ConnectionManager {
    constructor() {
        // Use environment variables if available, otherwise fallback to defaults
        this.servers = [
            process.env.REACT_APP_SERVER_LOCAL_1 || "http://localhost:8001",
            process.env.REACT_APP_SERVER_LOCAL_2 || "http://localhost:8002",
            process.env.REACT_APP_SERVER_LOCAL_3 || "http://localhost:8003",
            process.env.REACT_APP_SERVER_PROD || "https://yourdomain.com",
        ];
        this.currentServer = null;
        this.testPromise = null;
        this.lastTestedTime = 0;
    }

    async findWorkingServer() {
        if (this.currentServer) return this.currentServer;

        // Use cached last working server from previous session
        const lastWorking = localStorage.getItem('last_working_server');
        if (lastWorking && this.servers.includes(lastWorking)) {
            this.currentServer = lastWorking;
            // Verify in background (don't wait)
            this.verifyServerInBackground(lastWorking);
            return lastWorking;
        }

        // Check for custom server in localStorage
        const customServer = localStorage.getItem('custom_server');
        if (customServer) {
            if (await this.testConnection(customServer)) {
                this.currentServer = customServer;
                return customServer;
            }
        }

        // Start background testing
        this.testAllServersInBackground();

        // Return primary server optimistically
        this.currentServer = this.servers[0];
        return this.currentServer;
    }

    async testAllServersInBackground() {
        if (this.testPromise) return;

        this.testPromise = (async () => {
            const now = Date.now();
            // Only test if last test was more than 5 minutes ago
            if (now - this.lastTestedTime < 5 * 60 * 1000) return;

            this.lastTestedTime = now;

            // Test servers in order with optimized timeouts
            for (const server of this.servers) {
                try {
                    if (await this.testConnection(server)) {
                        this.currentServer = server;
                        localStorage.setItem('last_working_server', server);
                        return server;
                    }
                } catch (error) {
                    // Silent fail, continue to next server
                }
            }
        })();

        return this.testPromise;
    }

    async verifyServerInBackground(server) {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 2000);
            
            const response = await fetch(`${server}/api/v1/users/test`, {
                method: 'GET',
                signal: controller.signal
            });
            
            clearTimeout(timeoutId);
            if (!response.ok) {
                localStorage.removeItem('last_working_server');
                this.currentServer = null;
            }
        } catch (error) {
            localStorage.removeItem('last_working_server');
            this.currentServer = null;
        }
    }

    async testConnection(server) {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 2000);
            
            const response = await fetch(`${server}/api/v1/users/test`, {
                method: 'GET',
                signal: controller.signal
            });
            
            clearTimeout(timeoutId);
            return response.ok;
        } catch (error) {
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

    getLocalServers() {
        return this.servers.filter(server => server.includes('localhost'));
    }

    getProductionServer() {
        return this.servers.find(server => server.includes('https'));
    }
}

const connectionManager = new ConnectionManager();
export default connectionManager;
