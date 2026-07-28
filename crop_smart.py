import cv2
import numpy as np
import os

out_dir = '/root/goobet/expo-game/assets/'

def crop_banners():
    img = cv2.imread('/root/goobet/frames/frame_00.jpg')
    # Banners are roughly Y=200 to Y=700
    roi = img[200:700, 0:1080]
    gray = cv2.cvtColor(roi, cv2.COLOR_BGR2GRAY)
    blurred = cv2.GaussianBlur(gray, (5, 5), 0)
    edges = cv2.Canny(blurred, 50, 150)
    
    # Find contours
    contours, _ = cv2.findContours(edges, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    banners = []
    for cnt in contours:
        x, y, w, h = cv2.boundingRect(cnt)
        if w > 200 and h > 200: # Banner size is large
            banners.append((x, y, w, h))
            
    # Sort by X
    banners.sort(key=lambda b: b[0])
    
    for i, (x, y, w, h) in enumerate(banners):
        # Add offset back for Y
        crop = img[y+200:y+200+h, x:x+w]
        cv2.imwrite(f'{out_dir}banner_real_{i+1}.jpg', crop)
    print(f"Cropped {len(banners)} banners")

crop_banners()
