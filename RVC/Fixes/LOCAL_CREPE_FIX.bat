cd ..
runtime\python.exe Fixes\local_fixes.py

runtime\python.exe -m pip install --upgrade tensorboard markdown

runtime\python.exe -m pip install -r requirements.txt --upgrade

timeout /t 10 >nul