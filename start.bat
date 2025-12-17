@echo off
echo ========================================
echo   ANTIGRAVITY - Starting Application
echo ========================================
echo.

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Python is not installed or not in PATH
    echo Please install Python 3.8+ from https://www.python.org/
    pause
    exit /b 1
)

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo [1/4] Checking backend setup...
cd backend

REM Check if virtual environment exists
if not exist "venv\" (
    echo [INFO] Creating virtual environment...
    python -m venv venv
)

REM Activate virtual environment
call venv\Scripts\activate

REM Check if requirements are installed
pip show Flask >nul 2>&1
if errorlevel 1 (
    echo [INFO] Installing backend dependencies...
    pip install -r requirements.txt
)

REM Check if database exists
if not exist "antigravity.db" (
    echo [INFO] Creating database with sample data...
    python seed_data.py
)

echo.
echo [2/4] Starting Flask backend server...
start "Antigravity Backend" cmd /k "cd /d %CD% && venv\Scripts\activate && python app.py"

echo [INFO] Waiting for backend to initialize...
timeout /t 3 /nobreak >nul

cd ..\frontend

echo.
echo [3/4] Checking frontend setup...

REM Check if node_modules exists
if not exist "node_modules\" (
    echo [INFO] Installing frontend dependencies...
    echo [INFO] This may take a few minutes on first run...
    call npm install
)

echo.
echo [4/4] Starting React frontend server...
start "Antigravity Frontend" cmd /k "cd /d %CD% && npm start"

echo.
echo ========================================
echo   APPLICATION STARTED SUCCESSFULLY!
echo ========================================
echo.
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo Demo Login Credentials:
echo   Username: demo
echo   Password: demo123
echo.
echo Two terminal windows have been opened:
echo   1. Backend (Flask on port 5000)
echo   2. Frontend (React on port 3000)
echo.
echo The browser will open automatically.
echo Close those terminal windows to stop the servers.
echo.
echo ========================================
pause
