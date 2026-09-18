@echo off
setlocal

rem Se placer dans le dossier ou se trouve ce script (le dossier "portfolio")
cd /d "%~dp0"

echo ============================================
echo   Portfolio - Amele Alaglo
echo ============================================
echo.

where node >nul 2>nul
if errorlevel 1 (
    echo [ERREUR] Node.js n'est pas installe ou pas dans le PATH.
    echo Installez Node.js LTS ^(v20 ou plus^) depuis https://nodejs.org
    pause
    exit /b 1
)

if not exist "node_modules" (
    echo [INFO] node_modules introuvable, installation des dependances...
    call npm install
    if errorlevel 1 (
        echo [ERREUR] npm install a echoue.
        pause
        exit /b 1
    )
)

echo.
echo [INFO] Demarrage du serveur de developpement Angular...
echo [INFO] Le site sera accessible sur http://localhost:4200
echo [INFO] Fermez cette fenetre ou faites Ctrl+C pour arreter le serveur.
echo.

call npm start

pause
