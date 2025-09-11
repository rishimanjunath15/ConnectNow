@echo off
echo.
echo ========================================
echo    ConnectNow - Automated Startup
echo ========================================
echo.

:: Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo [1/5] Node.js detected...

:: Check if npm is available
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: npm is not available
    pause
    exit /b 1
)

echo [2/5] npm detected...

:: Install backend dependencies if needed
echo [3/5] Checking backend dependencies...
cd /d "%~dp0Backend"
if not exist "node_modules" (
    echo Installing backend dependencies...
    npm install
    if %errorlevel% neq 0 (
        echo ERROR: Failed to install backend dependencies
        pause
        exit /b 1
    )
) else (
    echo Backend dependencies already installed
)

:: Install frontend dependencies if needed
echo [4/5] Checking frontend dependencies...
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
    echo Frontend dependencies already installed
)

echo [5/5] Starting services...
echo.

:: Get local IP address
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr "IPv4"') do (
    for /f "tokens=1" %%b in ("%%a") do (
        set LOCAL_IP=%%b
        goto :ip_found
    )
)
:ip_found

echo ========================================
echo    ConnectNow is Starting!
echo ========================================
echo.
echo Your local IP: %LOCAL_IP%
echo Backend will start on: http://%LOCAL_IP%:8001
echo Frontend will start on: http://localhost:3000
echo.
echo SHARING WITH OTHERS:
echo 1. Share your IP (%LOCAL_IP%) with others
echo 2. They should update their connection settings
echo 3. Use the same meeting codes
echo.
echo Press Ctrl+C in any window to stop services
echo ========================================
echo.

:: Start backend in new terminal
echo Starting backend server...
start "ConnectNow Backend" powershell -Command "cd '%~dp0Backend'; npm start; pause"

:: Wait a moment for backend to start
timeout /t 3 /nobreak >nul

:: Start frontend in new terminal
echo Starting frontend server...
start "ConnectNow Frontend" powershell -Command "cd '%~dp0frontend'; npm start; pause"

echo.
echo ✅ Both services are starting!
echo.
echo Open your browser and go to: http://localhost:3000
echo.
echo To share with others:
echo 1. Give them your IP: %LOCAL_IP%
echo 2. They use manual setup to connect to: http://%LOCAL_IP%:8001
echo 3. Share meeting codes for them to join
echo.
echo Press any key to exit this window...
pause >nul