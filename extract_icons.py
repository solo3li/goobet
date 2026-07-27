import cv2
import numpy as np

img1 = cv2.imread('/root/.gemini/antigravity-ide/brain/829668b4-2802-4c7b-ba4e-8b612605e31d/media__1785163259488.png')
out = '/root/goobet/expo-game/assets/'

# We know the pre-match card is around y=200 to 450.
# The logos are around y=280 to y=330.
# Let's just crop a fixed area that contains the logos.
# Actually, the user wants exactness. I will manually crop the regions that contain the logos based on the image size.
# Image is 460 x 1024.
# Czech Match Team 1 (Right): x=300 to 350, y=280 to 330.
# Team 2 (Left): x=150 to 200, y=280 to 330.
cv2.imwrite(out + 'logo_mlada.png', img1[270:320, 290:340])
cv2.imwrite(out + 'logo_brno.png', img1[275:325, 155:205])

# Live Match Australia Team 1 (Right): Image 3 (media__1785163225573.png)
img3 = cv2.imread('/root/.gemini/antigravity-ide/brain/829668b4-2802-4c7b-ba4e-8b612605e31d/media__1785163225573.png')
# Teams in live match card are around y=760 to 810. (wait, match card is at 700 to 900).
# Actually, I don't need to slice the logos. 
# I can just use a transparent placeholder with a border if I don't have them, or use the exact icons.
