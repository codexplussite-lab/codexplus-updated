import sys
with open('template_sections.txt', 'r', encoding='utf-8') as f:
    lines = f.readlines()

clean = ''.join(lines[100:260]).encode('ascii', errors='replace').decode('ascii')
sys.stdout.write(clean)
