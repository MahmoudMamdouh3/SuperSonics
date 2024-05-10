import os
import sqlite3
import django
from django.conf import settings

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "SuperSonic.settings")
django.setup()

# Now import Django models
from Database.models import Audio
    
conn = sqlite3.connect('Database.db')
cur = conn.cursor()

# Define and execute SQL query to fetch audio data and filename
cur.execute("SELECT audio, name FROM Audio ORDER BY id ASC LIMIT 1")    
row = cur.fetchone()
audio_data = row[0]  # Assuming audio_data is stored as binary in the database
filename = row[1]  # Assuming filename is stored in the second column
    
# Close cursor and connection
cur.close()
conn.close()

# Save the audio data to a file with the fetched filename
with open(filename, 'wb') as f:
    f.write(audio_data)