from PIL import Image
import json

def get_boxes(img_path):
    img = Image.open(img_path)
    pixels = img.load()
    width, height = img.size

    def is_bg_row(y):
        non_bg = 0
        for x in range(width):
            r, g, b = pixels[x, y][:3]
            # Match standard background colors
            if r > 240 and g > 242 and b > 245: # light grey f2f4f7
                pass
            elif r > 250 and g > 250 and b > 250: # white
                pass
            elif r == 230 and g == 245 and b == 252: # e6f5fc
                pass
            else:
                non_bg += 1
        return non_bg < width * 0.05

    def is_bg_col(x, y_start, y_end):
        non_bg = 0
        for y in range(y_start, y_end):
            r, g, b = pixels[x, y][:3]
            if r > 240 and g > 242 and b > 245:
                pass
            elif r > 250 and g > 250 and b > 250:
                pass
            elif r == 230 and g == 245 and b == 252:
                pass
            else:
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
                if y - start_y > 40: # threshold height
                    rows.append((start_y, y))
    
    res = []
    for r_start, r_end in rows:
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
                    if x - start_x > 40:
                        cols.append((start_x, x))
        if in_col and width - start_x > 40:
            cols.append((start_x, width-1))
        res.append({"y": (r_start, r_end), "x": cols})
    return res

print("Image 1 (media__1785163225573.png):") # banners
print(json.dumps(get_boxes('/root/.gemini/antigravity-ide/brain/829668b4-2802-4c7b-ba4e-8b612605e31d/media__1785163225573.png'), indent=2))
print("Image 2 (media__1785163250237.png):")
print(json.dumps(get_boxes('/root/.gemini/antigravity-ide/brain/829668b4-2802-4c7b-ba4e-8b612605e31d/media__1785163250237.png'), indent=2))
