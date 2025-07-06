@echo off
echo MERN Blog Application - Git Push Script
echo =========================================
echo.

echo Checking git status...
"C:\Program Files\Git\bin\git.exe" status
echo.

echo Adding all files to staging...
"C:\Program Files\Git\bin\git.exe" add .
echo.

echo Committing changes...
"C:\Program Files\Git\bin\git.exe" commit -m "Complete MERN blog application with all features"
echo.

echo Adding mose868 remote repository...
"C:\Program Files\Git\bin\git.exe" remote add mose868 https://github.com/PLP-MERN-Stack-Development/week-4-mern-integration-assignment-mose868.git
echo.

echo Pushing to mose868 repository...
"C:\Program Files\Git\bin\git.exe" push mose868 main
echo.

echo Done! The code has been pushed to the mose868 repository.
echo.
echo Note: You may need to provide your GitHub credentials.
echo.
pause 