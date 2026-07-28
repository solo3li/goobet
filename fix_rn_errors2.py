with open('/root/goobet/expo-game/screens/HomeScreen.tsx', 'r') as f:
    content = f.read()

# Fix inverted ScrollView
content = content.replace("<ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsContent} inverted>", "<ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsContent}>")

# Fix duplicate paddingHorizontal
lines = content.split('\n')
new_lines = []
for i, line in enumerate(lines):
    if line.strip() == "paddingHorizontal: 15,":
        if i > 0 and "paddingHorizontal: 15," in lines[i-1]:
            continue
        if i < len(lines)-1 and "paddingHorizontal: 15," in lines[i+1]:
            continue
    new_lines.append(line)
content = '\n'.join(new_lines)

with open('/root/goobet/expo-game/screens/HomeScreen.tsx', 'w') as f:
    f.write(content)

# Fix Multipliers
try:
    with open('/root/goobet/expo-game/components/Multipliers.tsx', 'r') as f:
        mult_content = f.read()
    mult_content = mult_content.replace("textShadow: '0px 0px 6px #00ff55'", "textShadowColor: '#00ff55', textShadowRadius: 6, textShadowOffset: {width: 0, height: 0}")
    with open('/root/goobet/expo-game/components/Multipliers.tsx', 'w') as f:
        f.write(mult_content)
except:
    pass

# Fix BottomBar
try:
    with open('/root/goobet/expo-game/components/BottomBar.tsx', 'r') as f:
        bb_content = f.read()
    bb_content = bb_content.replace("outlineStyle: 'none',", "")
    with open('/root/goobet/expo-game/components/BottomBar.tsx', 'w') as f:
        f.write(bb_content)
except:
    pass

print("Fixed errors")
