import sys
from bs4 import BeautifulSoup
import re

with open('template.html', 'rb') as f:
    raw = f.read()

text = raw.decode('utf-16' if raw.startswith(b'\xff\xfe') else 'utf-8', errors='ignore')
soup = BeautifulSoup(text, 'html.parser')

imgs = soup.find_all('img')
for img in imgs[:15]:
    src = img.get('src', '')
    alt = img.get('alt', '')
    sys.stdout.write(f"Img: alt='{alt}' src='{src[:90]}'\n")
