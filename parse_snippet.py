with open('hero_snippet.html', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

import re
print("Hero Snippet Summary:")
print("Divs:", len(re.findall(r'<div', text)))
print("Class attributes:", set(re.findall(r'framer-[a-zA-Z0-9]+', text)) if text else 'None')
imgs = re.findall(r'https://framerusercontent\.com/images/[^\s\"\'\)]+', text)
print("Hero Images:", set(imgs))
