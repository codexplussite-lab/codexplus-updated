with open('template.html', 'rb') as f:
    raw = f.read()

text = raw.decode('utf-16' if raw.startswith(b'\xff\xfe') else 'utf-8', errors='ignore')
import re

ctas = re.findall(r'Connect With Us|About Web Angles|Book an Appointment|View About Reboot|Get In Touch', text)
print("CTAs found:", set(ctas))

buttons = re.findall(r'background:[^;]+', text)
for b in set(buttons):
    if 'rgb' in b or 'gradient' in b:
        print(b[:120])
