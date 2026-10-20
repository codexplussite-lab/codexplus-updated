with open('template.html', 'rb') as f:
    raw = f.read()

text = raw.decode('utf-16' if raw.startswith(b'\xff\xfe') else 'utf-8', errors='ignore')
from bs4 import BeautifulSoup
soup = BeautifulSoup(text, 'html.parser')

with open('template_sections.txt', 'w', encoding='utf-8') as out:
    for i, tag in enumerate(soup.find_all(['section', 'header', 'footer'])):
        out.write(f"\n=== Tag {i}: {tag.name} ===\n")
        h = tag.find_all(['h1', 'h2', 'h3', 'h4'])
        for heading in h:
            out.write(f"  {heading.name}: {' '.join(heading.get_text().split())}\n")
        p = tag.find_all('p')
        for para in p[:3]:
            out.write(f"  p: {' '.join(para.get_text().split())}\n")

print("Done writing template_sections.txt")
