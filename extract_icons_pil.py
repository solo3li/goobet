from PIL import Image

img1 = Image.open('/root/.gemini/antigravity-ide/brain/829668b4-2802-4c7b-ba4e-8b612605e31d/media__1785163259488.png')
out = '/root/goobet/expo-game/assets/'

# Mlada Boleslav logo: x=340 to 390, y=275 to 325
# Brno logo: x=90 to 140, y=275 to 325
img1.crop((345, 275, 385, 315)).save(out + 'logo_mlada.png')
img1.crop((95, 275, 135, 315)).save(out + 'logo_brno.png')

# Australian flag: Image 1, near "استراليا"
# x=400 to 430, y=520 to 550?
img1.crop((400, 520, 430, 550)).save(out + 'flag_australia.png')
