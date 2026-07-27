from PIL import Image
import os

img = Image.open('/root/.gemini/antigravity-ide/brain/829668b4-2802-4c7b-ba4e-8b612605e31d/media__1785163225573.png')
pixels = img.load()
width, height = img.size

# Function to check if a row is mostly background (light gray/white)
def is_bg_row(y):
    non_bg = 0
    for x in range(width):
        r, g, b = pixels[x, y][:3]
        if r > 245 and g > 245 and b > 245: # white background
            pass
        elif r > 235 and g > 235 and b > 235: # light grey
            pass
        else:
            non_bg += 1
    return non_bg < width * 0.05

rows = []
in_obj = False
start_y = 0
for y in range(height):
    if not is_bg_row(y):
        if not in_obj:
            in_obj = True
            start_y = y
    else:
        if in_obj:
            in_obj = False
            if y - start_y > 80: # likely a row of cards/banners
                rows.append((start_y, y))
if in_obj:
    rows.append((start_y, height-1))

print("Found rows:", rows)
