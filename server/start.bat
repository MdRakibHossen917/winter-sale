@echo off
echo Starting PureTasteBD Backend Server...
echo.

REM Check if .env exists
if not exist .env (
    echo Creating .env file...
    (
        echo PORT=5000
        echo MONGODB_URI=mongodb+srv://wintersaleDB:iVkts7UoZ8q7lsMD@cluster0.d3rwcxr.mongodb.net/?appName=Cluster0
        echo MONGODB_DB_NAME=puretastebd
        echo JWT_SECRET=puretastebd_super_secret_jwt_key_2024
        echo FRONTEND_URL=http://localhost:5173
    ) > .env
    echo .env file created!
    echo.
)

echo Starting server...
npm run dev

