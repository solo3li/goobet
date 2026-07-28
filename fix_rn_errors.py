with open('/root/goobet/expo-game/screens/HomeScreen.tsx', 'r') as f:
    content = f.read()

# Fix inverted ScrollView
content = content.replace("<ScrollView horizontal showsHorizontalScrollIndicator={false} inverted style={styles.sportsScroll}>", "<ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.sportsScroll}>")
content = content.replace("<ScrollView horizontal showsHorizontalScrollIndicator={false} inverted style={styles.bannersScroll}>", "<ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.bannersScroll}>")
content = content.replace("<ScrollView horizontal showsHorizontalScrollIndicator={false} inverted style={styles.horizontalScroll}>", "<ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>")

# Fix duplicate paddingHorizontal
# It was added by my previous fix_styles.py: content.replace("width: 80,", "paddingHorizontal: 15,")
# Let's remove the second paddingHorizontal or just replace the whole block
import re
content = re.sub(r'paddingHorizontal: 15,\s*paddingHorizontal: \d+,', 'paddingHorizontal: 15,', content)
content = re.sub(r'paddingHorizontal: \d+,\s*paddingHorizontal: 15,', 'paddingHorizontal: 15,', content)

# Fix whiteSpace: 'nowrap'
content = content.replace("whiteSpace: 'nowrap',", "")

with open('/root/goobet/expo-game/screens/HomeScreen.tsx', 'w') as f:
    f.write(content)

print("Fixed RN errors")
