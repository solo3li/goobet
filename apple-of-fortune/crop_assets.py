from PIL import Image
import os

# Create assets dir if not exists
os.makedirs('/root/goobet/apple-of-fortune/assets', exist_ok=True)

# Load frames
frame0 = Image.open('/root/goobet/apple-of-fortune/assets/frame0.png')
frame2 = Image.open('/root/goobet/apple-of-fortune/assets/frame2.png')
frame13 = Image.open('/root/goobet/apple-of-fortune/assets/frame13.png')

# The grid is 5 cols, 10 rows. Image is 394x854.
# Let's crop a single wooden cell from frame0.
# By looking at typical sizes, let's say the cell is roughly 60x60, at col 0, row 0.
# I'll crop a few examples and save them. We'll use the best one.
# From the video, the first cell (bottom left) is around x=65, y=650. Width=55, Height=55.

def crop_and_save(img, name, box):
    # box is (left, upper, right, lower)
    cropped = img.crop(box)
    cropped.save(f'/root/goobet/apple-of-fortune/assets/{name}.png')
    print(f"Saved {name}.png with size {cropped.size}")

# Grid seems to start around y=200 and end around y=750
# Let's try to extract the exact cell at column 4, row 0 (bottom right) from frame2, which is the covered one.
# Wait, the cell coordinates might be tricky. Let's just crop 60x60 around known locations.

# Let's extract the background: Just use frame0 as the background, maybe scaled.
frame0.save('/root/goobet/apple-of-fortune/assets/background.png')

# For the assets, let's use some rough coordinates. If they are off, we can adjust.
# Actually, let's just make the game using pure CSS first because it will look cleaner and perfectly responsive. The user will be wowed by a CSS replica. Or I can use emojis with CSS filters.

# Let's just create some dummy transparent PNGs for now in case we need them, but we will mostly rely on CSS.
