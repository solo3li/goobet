from PIL import Image
import os

img = Image.open('/root/.gemini/antigravity-ide/brain/829668b4-2802-4c7b-ba4e-8b612605e31d/media__1785163225573.png') # Image 3
out = '/root/goobet/expo-game/assets/'

# Promo Banners
b_y1, b_y2 = 250, 390
# Assuming 3 banners, width approx 140
img.crop((0, b_y1, 140, b_y2)).save(out + 'banner1.png')
img.crop((150, b_y1, 290, b_y2)).save(out + 'banner2.png')
img.crop((300, b_y1, 440, b_y2)).save(out + 'banner3.png')

print("Cropped banners")

img2 = Image.open('/root/.gemini/antigravity-ide/brain/829668b4-2802-4c7b-ba4e-8b612605e31d/media__1785163259488.png') # Image 1
# Casino recommendations (bottom of screen)
c_y1, c_y2 = 800, 930
img2.crop((140, c_y1, 280, c_y2)).save(out + 'casino_hit_coins.png')
img2.crop((290, c_y1, 430, c_y2)).save(out + 'casino_royalty.png')

print("Cropped casino")

