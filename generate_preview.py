import json

md = """# Image Previews

## Banners
![Banner 1](/root/goobet/expo-game/assets/banner1.png)
![Banner 2](/root/goobet/expo-game/assets/banner2.png)
![Banner 3](/root/goobet/expo-game/assets/banner3.png)

## Casino
![Hit Coins](/root/goobet/expo-game/assets/casino_hit_coins.png)
![Royalty](/root/goobet/expo-game/assets/casino_royalty.png)

## Logos
![Brno](/root/goobet/expo-game/assets/logo_brno.png)
![Mlada](/root/goobet/expo-game/assets/logo_mlada.png)
![Australia](/root/goobet/expo-game/assets/flag_australia.png)
"""

with open('/root/.gemini/antigravity-ide/brain/829668b4-2802-4c7b-ba4e-8b612605e31d/preview.md', 'w') as f:
    f.write(md)
