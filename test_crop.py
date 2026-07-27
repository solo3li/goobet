from PIL import Image

img = Image.open('/root/.gemini/antigravity-ide/brain/829668b4-2802-4c7b-ba4e-8b612605e31d/media__1785145653864.png')
# Coupon circle is center bottom
x_center = 460 // 2
y_center = 945
r = 35

box = (x_center - r, y_center - r, x_center + r, y_center + r)
cropped = img.crop(box)

# Print a rough ASCII map to see if we got the icon
cropped = cropped.convert('L').resize((20, 20))
pixels = cropped.load()
chars = " .:-=+*#%@"
for y in range(20):
    row = ""
    for x in range(20):
        val = pixels[x, y]
        row += chars[val // 26]
    print(row)

cropped_orig = img.crop(box)
cropped_orig.save('/root/goobet/expo-game/assets/coupon_icon.png')
print("Saved coupon_icon.png")
