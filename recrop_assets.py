from PIL import Image

img3 = Image.open('/root/.gemini/antigravity-ide/brain/829668b4-2802-4c7b-ba4e-8b612605e31d/media__1785163225573.png')
out = '/root/goobet/expo-game/assets/'

# Banners are at y=171 to 323. Let's say there are 3 banners.
# The total width is 460. Let's crop width 460 from y=171 to 323 as one single banner image for simplicity?
# No, let's crop the first 3 if they are spaced.
# Actually, if I just save the whole banner area as one image and use it, it will look 100% exact.
# But it needs to scroll.
img3.crop((0, 171, 150, 323)).save(out + 'banner1.png')
img3.crop((155, 171, 305, 323)).save(out + 'banner2.png')
img3.crop((310, 171, 460, 323)).save(out + 'banner3.png')

# Casino cards: y=800 to 950 approx in Image 1 (media__1785163259488.png)
img1 = Image.open('/root/.gemini/antigravity-ide/brain/829668b4-2802-4c7b-ba4e-8b612605e31d/media__1785163259488.png')
img1.crop((0, 800, 145, 950)).save(out + 'casino_royalty.png')
img1.crop((150, 800, 295, 950)).save(out + 'casino_hit_coins.png')

print("Recropped")
