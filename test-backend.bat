@echo off
echo.
echo ========================================
echo      Testing Backend Endpoints
echo ========================================
echo.

:: Test the test endpoint
echo [1] Testing /api/v1/users/test endpoint...
powershell -Command "try { $response = Invoke-WebRequest -Uri 'http://localhost:8002/api/v1/users/test' -TimeoutSec 5; Write-Host '✅ Test endpoint: WORKING'; Write-Host 'Response:' $response.Content } catch { Write-Host '❌ Test endpoint: FAILED'; Write-Host 'Error:' $_.Exception.Message }"

echo.
echo [2] Testing user registration...
powershell -Command "try { $body = @{ name='Test User'; username='testuser123'; password='testpass123' } | ConvertTo-Json; $response = Invoke-WebRequest -Uri 'http://localhost:8002/api/v1/users/register' -Method POST -Body $body -ContentType 'application/json' -TimeoutSec 5; Write-Host '✅ Register endpoint: WORKING'; Write-Host 'Response:' $response.Content } catch { Write-Host '❌ Register endpoint: FAILED'; Write-Host 'Error:' $_.Exception.Message }"

echo.
echo [3] Testing user login...
powershell -Command "try { $body = @{ username='testuser123'; password='testpass123' } | ConvertTo-Json; $response = Invoke-WebRequest -Uri 'http://localhost:8002/api/v1/users/login' -Method POST -Body $body -ContentType 'application/json' -TimeoutSec 5; Write-Host '✅ Login endpoint: WORKING'; Write-Host 'Response:' $response.Content } catch { Write-Host '❌ Login endpoint: FAILED'; Write-Host 'Error:' $_.Exception.Message }"

echo.
echo ========================================
echo           Endpoint Summary
echo ========================================
echo.
echo If all endpoints show ✅ WORKING, your backend is ready!
echo If any show ❌ FAILED, check the backend console for errors.
echo.
echo The frontend should now be able to connect properly.
echo.
pause