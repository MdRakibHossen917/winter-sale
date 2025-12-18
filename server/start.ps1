# PureTasteBD Backend Server Startup Script

Write-Host "===========================================" -ForegroundColor Cyan
Write-Host "PureTasteBD Backend Server Startup" -ForegroundColor Cyan
Write-Host "===========================================" -ForegroundColor Cyan
Write-Host ""

# Check if .env exists
if (-not (Test-Path .env)) {
    Write-Host "Creating .env file..." -ForegroundColor Yellow
    @"
PORT=5000
MONGODB_URI=mongodb+srv://wintersaleDB:iVkts7UoZ8q7lsMD@cluster0.d3rwcxr.mongodb.net/?appName=Cluster0
MONGODB_DB_NAME=puretastebd
JWT_SECRET=puretastebd_super_secret_jwt_key_2024
FRONTEND_URL=http://localhost:5173
"@ | Out-File -FilePath .env -Encoding utf8
    Write-Host ".env file created!" -ForegroundColor Green
    Write-Host ""
} else {
    Write-Host ".env file already exists" -ForegroundColor Green
    Write-Host ""
}

# Check if node_modules exists
if (-not (Test-Path node_modules)) {
    Write-Host "Installing dependencies..." -ForegroundColor Yellow
    npm install
    Write-Host ""
}

Write-Host "Starting server..." -ForegroundColor Yellow
Write-Host "Server will run on: http://localhost:5000" -ForegroundColor Cyan
Write-Host "API endpoint: http://localhost:5000/api" -ForegroundColor Cyan
Write-Host "Health check: http://localhost:5000/health" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
Write-Host ""

npm run dev

