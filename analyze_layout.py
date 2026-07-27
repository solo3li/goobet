from PIL import Image
img = Image.open('/root/.gemini/antigravity-ide/brain/829668b4-2802-4c7b-ba4e-8b612605e31d/media__1785163259488.png')

# Let's crop the pre-match card and save it to a small file so I can download or inspect it
# Actually, I will slice the team logos from the screenshot to use them!
out = '/root/goobet/expo-game/assets/'

# Pre-match Czech card is at y=250 to 450 approximately in image 1.
# Let's crop the team logos.
# Mlada Boleslav logo (right team). Right side is x around 350-400.
# Brno logo (left team). x around 100-150.
# I'll use a script to find the exact circular logos or just do it by trial and error.
