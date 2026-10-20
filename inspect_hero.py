import sys
from bs4 import BeautifulSoup
import re

with open('template.html', 'rb') as f:
    raw = f.read()

text = raw.decode('utf-16' if raw.startswith(b'\xff\xfe') else 'utf-8', errors='ignore')
soup = BeautifulSoup(text, 'html.parser')

hero_sec = soup.find('section')
if hero_sec:
    for p in hero_sec.find_all(['h1', 'h2', 'p', 'span']):
        txt = ' '.join(p.get_text().split()).encode('ascii', errors='replace').decode('ascii')
        sys.stdout.write(f"[{p.name}] {txt}\n")
