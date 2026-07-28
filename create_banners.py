from PIL import Image, ImageDraw

out = '/root/goobet/expo-game/assets/'
colors = [(23, 162, 184), (0, 123, 255), (102, 16, 242)]

for i, color in enumerate(colors):
    img = Image.new('RGBA', (150, 152), color)
    draw = ImageDraw.Draw(img)
    draw.text((10, 70), f"Promo Banner {i+1}", fill="white")
    img.save(f"{out}banner{i+1}.png")

print("Created solid color banners.")
