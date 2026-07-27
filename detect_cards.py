import cv2
import numpy as np
import json

img = cv2.imread('/root/.gemini/antigravity-ide/brain/829668b4-2802-4c7b-ba4e-8b612605e31d/media__1785145653864.png')
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
blurred = cv2.GaussianBlur(gray, (5, 5), 0)
edges = cv2.Canny(blurred, 50, 150)

contours, _ = cv2.findContours(edges, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

boxes = []
for contour in contours:
    x, y, w, h = cv2.boundingRect(contour)
    # Filter for card-like shapes. The screenshot is 460x1024.
    # The cards are probably around 90-120px wide and high.
    if 70 < w < 130 and 70 < h < 130:
        boxes.append({"x": x, "y": y, "w": w, "h": h})

# Sort by Y (rows) and then X (columns)
boxes = sorted(boxes, key=lambda b: (b["y"] // 50, b["x"]))
print(json.dumps(boxes, indent=2))

# Also check for the Lucky Wheel banner which spans almost the whole width
banner_boxes = []
for contour in contours:
    x, y, w, h = cv2.boundingRect(contour)
    if w > 300 and h > 100:
        banner_boxes.append({"x": x, "y": y, "w": w, "h": h})

print("Banner:", json.dumps(banner_boxes, indent=2))
