from PIL import Image
out = '/root/goobet/expo-game/assets/'
Image.new('RGBA', (28, 28), (200, 200, 200, 255)).save(out + 'flag_indonesia.png')
Image.new('RGBA', (28, 28), (200, 200, 200, 255)).save(out + 'flag_cambodia.png')
print("Created dummy flags")
