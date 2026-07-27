from PIL import Image
import os

img = Image.open('/root/.gemini/antigravity-ide/brain/829668b4-2802-4c7b-ba4e-8b612605e31d/media__1785145653864.png')
pixels = img.load()
width, height = img.size

# Function to check if a row is mostly background (light gray/white)
def is_bg_row(y):
    non_bg = 0
    for x in range(width):
        r, g, b = pixels[x, y][:3]
        if r < 230 or g < 230 or b < 230:
            non_bg += 1
    return non_bg < width * 0.05

def is_bg_col(x, y_start, y_end):
    non_bg = 0
    for y in range(y_start, y_end):
        r, g, b = pixels[x, y][:3]
        if r < 230 or g < 230 or b < 230:
            non_bg += 1
    return non_bg < (y_end - y_start) * 0.05

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
            if y - start_y > 80: # likely a row of cards
                rows.append((start_y, y))

# Print found rows
print("Found rows:", rows)

# For each row, find columns
for r_idx, (r_start, r_end) in enumerate(rows):
    cols = []
    in_col = False
    start_x = 0
    for x in range(width):
        if not is_bg_col(x, r_start, r_end):
            if not in_col:
                in_col = True
                start_x = x
        else:
            if in_col:
                in_col = False
                if x - start_x > 80:
                    cols.append((start_x, x))
    if in_col:
        cols.append((start_x, width-1))
    print(f"Row {r_idx} ({r_start}-{r_end}): columns {cols}")

