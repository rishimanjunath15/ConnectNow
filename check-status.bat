@echo off
echo.
echo ========================================
echo      ConnectNow - System Status
echo ========================================
echo.

:: Check if Node.js is running backend services
echo [Checking Backend Services...]
netstat -ano | findstr ":800" > temp_ports.txt 2>nul
if exist temp_ports.txt (
    for /f "tokens=2,5" %%a in (temp_ports.txt) do (
        if "%%a"=="0.0.0.0:8001" echo ✅ Backend running on port 8001 (PID: %%b)
        if "%%a"=="0.0.0.0:8002" echo ✅ Backend running on port 8002 (PID: %%b)
        if "%%a"=="0.0.0.0:8003" echo ✅ Backend running on port 8003 (PID: %%b)
    )
    del temp_ports.txt
) else (
    echo ❌ No backend services detected on ports 8001-8003
)

echo.
echo [Checking Frontend Services...]
netstat -ano | findstr ":3000" > temp_frontend.txt 2>nul
if exist temp_frontend.txt (
    for /f "tokens=2,5" %%a in (temp_frontend.txt) do (
        if "%%a"=="0.0.0.0:3000" echo ✅ Frontend running on port 3000 (PID: %%b)
    )
    del temp_frontend.txt
) else (
    echo ❌ Frontend not running on port 3000
)

echo.
echo [Network Information...]
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr "IPv4"') do (
    for /f "tokens=1" %%b in ("%%a") do (
        echo 🌐 Your IP Address: %%b
        set LOCAL_IP=%%b
        goto :ip_found
    )
)
:ip_found

echo.
echo ========================================
echo         Access Information
echo ========================================
echo.
echo 🖥️  LOCAL ACCESS:
echo    Frontend: http://localhost:3000
echo    Backend:  http://localhost:8001 or http://localhost:8002
echo.
echo 🌐 NETWORK ACCESS (for sharing):
echo    Frontend: http://%LOCAL_IP%:3000
echo    Backend:  http://%LOCAL_IP%:8001 or http://%LOCAL_IP%:8002
echo.
echo 📱 SHARING WITH OTHERS:
echo    1. Give them your IP: %LOCAL_IP%
echo    2. They open: http://%LOCAL_IP%:3000
echo    3. They use manual setup to connect to: http://%LOCAL_IP%:8001 or 8002
echo    4. Share meeting codes for them to join
echo.
echo ========================================
echo.

:: Test backend connectivity
echo [Testing Backend Connectivity...]
powershell -Command "try { $response = Invoke-WebRequest -Uri 'http://localhost:8001/api/v1/users/test' -TimeoutSec 3 -ErrorAction Stop; Write-Host '✅ Backend on 8001: WORKING' } catch { Write-Host '❌ Backend on 8001: NOT RESPONDING' }"
powershell -Command "try { $response = Invoke-WebRequest -Uri 'http://localhost:8002/api/v1/users/test' -TimeoutSec 3 -ErrorAction Stop; Write-Host '✅ Backend on 8002: WORKING' } catch { Write-Host '❌ Backend on 8002: NOT RESPONDING' }"

echo.
echo ========================================
echo           Quick Actions
echo ========================================
echo.
echo 🚀 To start services:
echo    - Run: start-connectnow.bat (for hosting)
echo    - Run: join-meeting.bat (for joining)
echo.
echo 🔧 To restart everything:
echo    - Press Ctrl+C in service windows
echo    - Run start-connectnow.bat again
echo.
echo 🌐 To open application:
echo    - Go to: http://localhost:3000
echo.
echo Press any key to exit...
pause >nul