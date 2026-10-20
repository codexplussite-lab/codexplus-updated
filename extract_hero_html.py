import sys
from bs4 import BeautifulSoup

with open('template.html', 'rb') as f:
    raw = f.read()

text = raw.decode('utf-16' if raw.startswith(b'\xff\xfe') else 'utf-8', errors='ignore')
soup = BeautifulSoup(text, 'html.parser')

hero_div = soup.find('section')
if hero_div:
    with open('hero_snippet.html', 'w', encoding='utf-8') as f_out:
        f_out.write(str(hero_div)[:6000])

print("Saved hero snippet")
