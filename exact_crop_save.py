from PIL import Image
import os

img = Image.open('/root/.gemini/antigravity-ide/brain/829668b4-2802-4c7b-ba4e-8b612605e31d/media__1785145653864.png')
out_dir = '/root/goobet/expo-game/assets/'

crops = {
    'vampire_curse.png': (0, 226, 89, 344),
    'burning_hot.png': (92, 226, 208, 344),
    'crystal.png': (215, 226, 331, 344),
    'western_slot.png': (338, 226, 452, 344),
    
    'lucky_wheel.png': (8, 396, 453, 528),
    
    'dragons_gold.png': (0, 581, 87, 697),
    'kamikaze.png': (93, 581, 209, 697),
    'wild_west_gold.png': (215, 581, 333, 697),
    # Let's not overwrite card_apple.png, wait, actually I should overwrite it if the user wants it exact.
    # The user said the apple image was already given, but let's re-crop just to be perfect if they want.
    # Actually the Apple Of Fortune card in the screenshot is (338, 581, 453, 697)
    # I'll save it as card_apple_cropped.png and use it instead.
    'card_apple_cropped.png': (338, 581, 453, 697),
    
    'games_mania.png': (0, 788, 87, 903),
    'yahtzee.png': (94, 788, 208, 903),
    'dice.png': (216, 788, 333, 903),
    'under_over_7.png': (337, 788, 453, 903),
}

for name, box in crops.items():
    cropped = img.crop(box)
    cropped.save(os.path.join(out_dir, name))

print("Assets re-sliced exactly!")
