with open('hero_snippet.html', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

from bs4 import BeautifulSoup
soup = BeautifulSoup(text, 'html.parser')
print(soup.prettify()[2500:6000])
