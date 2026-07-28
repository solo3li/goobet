import re

with open('/root/goobet/expo-game/screens/HomeScreen.tsx', 'r') as f:
    content = f.read()

# Replace category cards with exact images
cat_html = """
<View style={{marginHorizontal: 5}}>
  <Image source={require('../assets/cat1_real.jpg')} style={{width: 100, height: 136, borderRadius: 12}} />
</View>
<View style={{marginHorizontal: 5}}>
  <Image source={require('../assets/cat2_real.jpg')} style={{width: 221, height: 136, borderRadius: 12}} />
</View>
<View style={{marginHorizontal: 5}}>
  <Image source={require('../assets/cat3_real.jpg')} style={{width: 197, height: 130, borderRadius: 12}} />
</View>
"""

# Find the categories section
content = re.sub(r'<View style=\{styles\.categoryCard\}>.*?<\/View>\s*<View style=\{styles\.categoryCard\}>.*?<\/View>\s*<View style=\{styles\.categoryCard\}>.*?<\/View>', cat_html, content, flags=re.DOTALL, count=2)

# Update featured cards 
feat_html = """
<View style={{marginHorizontal: 5}}>
  <Image source={require('../assets/feat1_real.jpg')} style={{width: 116, height: 177, borderRadius: 12}} />
</View>
<View style={{marginHorizontal: 5}}>
  <Image source={require('../assets/feat2_real.jpg')} style={{width: 116, height: 177, borderRadius: 12}} />
</View>
<View style={{marginHorizontal: 5}}>
  <Image source={require('../assets/feat3_real.jpg')} style={{width: 116, height: 177, borderRadius: 12}} />
</View>
"""
content = re.sub(r'<View style=\{styles\.featuredCard\}>.*?<\/View>\s*<View style=\{styles\.featuredCard\}>.*?<\/View>', feat_html, content, flags=re.DOTALL)

with open('/root/goobet/expo-game/screens/HomeScreen.tsx', 'w') as f:
    f.write(content)

print("Updated UI with exact crops")
