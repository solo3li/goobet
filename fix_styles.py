import re

with open('/root/goobet/expo-game/screens/HomeScreen.tsx', 'r') as f:
    content = f.read()

# Fix tabItem width
content = content.replace("width: 80,", "paddingHorizontal: 15,")

# Fix tabText wrapping
content = content.replace("tabText: {", "tabText: {\n    whiteSpace: 'nowrap',")
content = content.replace("activeTabText: {", "activeTabText: {\n    whiteSpace: 'nowrap',")

# Fix Section Header layout
content = content.replace("alignItems: 'center',\n    paddingHorizontal: 16,\n    marginTop: 20,\n    marginBottom: 10,", "alignItems: 'center',\n    paddingHorizontal: 16,\n    marginTop: 20,\n    marginBottom: 12,")
content = content.replace("sectionTitle: {\n    fontSize: 22,\n    fontWeight: '900',", "sectionTitle: {\n    fontSize: 20,\n    fontWeight: '900',")

# Fix Match Card layout
content = content.replace("padding: 16,", "padding: 12,")
content = content.replace("marginBottom: 16,", "marginBottom: 12,\n    shadowColor: '#000',\n    shadowOpacity: 0.05,\n    shadowRadius: 5,\n    elevation: 3,")

# Fix Match Teams Row
content = content.replace("matchTeamsRow: {\n    flexDirection: 'row',\n    justifyContent: 'space-between',\n    alignItems: 'center',\n    marginBottom: 8,", "matchTeamsRow: {\n    flexDirection: 'row',\n    justifyContent: 'center',\n    alignItems: 'center',\n    marginBottom: 12,")
content = content.replace("teamViewLeft: {\n    flex: 1,\n    flexDirection: 'row',\n    alignItems: 'center',\n    justifyContent: 'flex-start',", "teamViewLeft: {\n    flex: 1,\n    flexDirection: 'row',\n    alignItems: 'center',\n    justifyContent: 'flex-start',\n    paddingRight: 10,")
content = content.replace("teamViewRight: {\n    flex: 1,\n    flexDirection: 'row',\n    alignItems: 'center',\n    justifyContent: 'flex-end',", "teamViewRight: {\n    flex: 1,\n    flexDirection: 'row',\n    alignItems: 'center',\n    justifyContent: 'flex-end',\n    paddingLeft: 10,")

# Fix Score View
content = content.replace("scoreView: {\n    width: 60,\n    alignItems: 'center',", "scoreView: {\n    alignItems: 'center',\n    justifyContent: 'center',\n    minWidth: 50,")
content = content.replace("scoreText: {\n    fontWeight: '900',\n    fontSize: 18,", "scoreText: {\n    fontWeight: '900',\n    fontSize: 24,")

# Fix Match Time Text
content = content.replace("matchTimeText: {\n    textAlign: 'center',\n    color: '#6b7280',\n    fontSize: 11,\n    marginBottom: 8,", "matchTimeText: {\n    textAlign: 'center',\n    color: '#6b7280',\n    fontSize: 12,\n    marginBottom: 12,")

# Fix Odds Box
content = content.replace("oddBox: {\n    flex: 1,\n    backgroundColor: '#f2f4f7',\n    borderRadius: 8,\n    paddingHorizontal: 8,\n    paddingVertical: 10,\n    marginHorizontal: 4,\n    flexDirection: 'row',\n    justifyContent: 'space-between',\n    alignItems: 'center',", "oddBox: {\n    flex: 1,\n    backgroundColor: '#f6f7f9',\n    borderRadius: 8,\n    paddingHorizontal: 10,\n    paddingVertical: 12,\n    marginHorizontal: 4,\n    flexDirection: 'row',\n    justifyContent: 'space-between',\n    alignItems: 'center',")

with open('/root/goobet/expo-game/screens/HomeScreen.tsx', 'w') as f:
    f.write(content)

print("Styles fixed.")
