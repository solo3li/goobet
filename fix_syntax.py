with open('/root/goobet/expo-game/screens/HomeScreen.tsx', 'r') as f:
    content = f.read()

# Replace "  }\n});\n\n  tournamentsList: {" with "  },\n  tournamentsList: {"
content = content.replace("  }\n});\n  tournamentsList: {", "  },\n  tournamentsList: {")

with open('/root/goobet/expo-game/screens/HomeScreen.tsx', 'w') as f:
    f.write(content)

print("Syntax fixed")
