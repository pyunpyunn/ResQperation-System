from pathlib import Path
root = Path('C:/backend/CAPSTONE/ResQperation-Admin')
for p in root.rglob('*.php'):
    try:
        b = p.read_bytes()
    except Exception:
        continue
    if b.startswith(b'\xef\xbb\xbf'):
        print(p)
