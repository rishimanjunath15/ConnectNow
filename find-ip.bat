@echo off
echo Finding your local IP address...
echo.
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr "IPv4"') do (
    for /f "tokens=1" %%b in ("%%a") do (
        echo Your IP Address: %%b
    )
)
echo.
echo Share this IP address with the other person!
echo They should update their environment.js file with this IP.
echo.
pause