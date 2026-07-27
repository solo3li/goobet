from PIL import Image
import os

img = Image.open('/root/.gemini/antigravity-ide/brain/829668b4-2802-4c7b-ba4e-8b612605e31d/media__1785145653864.png')
out_dir = '/root/goobet/expo-game/assets/'

# Crop boxes are (left, upper, right, lower)
# Row 1 (Slots) ~ y: 220 to 330
crops = {
    'vampire_curse.png': (10, 220, 110, 320),
    'burning_hot.png': (120, 220, 220, 320),
    'crystal.png': (230, 220, 330, 320),
    'western_slot.png': (340, 220, 440, 320),
    # Banner ~ y: 390 to 520
    'lucky_wheel.png': (20, 390, 440, 520),
    # Row 2 (Stairs) ~ y: 570 to 670
    'dragons_gold.png': (10, 570, 110, 670),
    'kamikaze.png': (120, 570, 220, 670),
    'wild_west_gold.png': (230, 570, 330, 670),
    # Row 3 (Dice) ~ y: 770 to 870
    'games_mania.png': (10, 770, 110, 870),
    'yahtzee.png': (120, 770, 220, 870),
    'dice.png': (230, 770, 330, 870),
    'under_over_7.png': (340, 770, 440, 870),
}

for name, box in crops.items():
    cropped = img.crop(box)
    cropped.save(os.path.join(out_dir, name))

print("Assets sliced!")
