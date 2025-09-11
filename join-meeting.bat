@echo off
echo.
echo ========================================
echo    ConnectNow - Guest Mode
echo ========================================
echo.
echo This script is for JOINING someone else's meeting
echo (When someone else is hosting the backend server)
echo.

:: Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

:: Install frontend dependencies if needed
echo Checking frontend dependencies...
cd /d "%~dp0frontend"
if not exist "node_modules" (
    echo Installing frontend dependencies...
    npm install
    if %errorlevel% neq 0 (
        echo ERROR: Failed to install frontend dependencies
        pause
        exit /b 1
    )
) else (
    echo Frontend dependencies ready
)

echo.
echo ========================================
echo    GUEST MODE INSTRUCTIONS
echo ========================================
echo.
echo 1. Get the HOST'S IP ADDRESS from the meeting organizer
echo 2. The frontend will open at http://localhost:3000
echo 3. Click the connection setup (gear icon)
echo 4. Choose "Manual Setup"
echo 5. Enter: http://[HOST_IP]:8001
echo 6. Test connection and continue
echo 7. Join the meeting with the provided code
echo.
echo EXAMPLE: If host IP is 192.168.1.100
echo Enter: http://192.168.1.100:8001
echo.
echo ========================================
echo.

:: Start only frontend
echo Starting frontend in guest mode...
start "ConnectNow Guest" powershell -Command "cd '%~dp0frontend'; npm start; pause"

echo.
echo ✅ Frontend starting in guest mode!
echo.
echo Open your browser and go to: http://localhost:3000
echo.
echo Remember to:
echo ❯ Get host's IP address
echo ❯ Use manual connection setup  
echo ❯ Enter: http://[HOST_IP]:8001
echo ❯ Get meeting code from host
echo.
echo Press any key to exit this window...
pause >nul