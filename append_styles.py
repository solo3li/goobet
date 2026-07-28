with open('/root/goobet/expo-game/screens/HomeScreen.tsx', 'r') as f:
    content = f.read()

new_styles = """
  tournamentsList: {
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  tournamentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tournLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#f2f4f7',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#333',
  },
  tournName: {
    fontSize: 14,
    color: '#1f2937',
    fontWeight: '600',
  },
  casinoCardCoded: {
    width: 130,
    height: 160,
    marginHorizontal: 5,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  casinoCardImg: {
    width: '100%',
    height: 100,
  },
  casinoCardInfo: {
    padding: 8,
    alignItems: 'center',
  },
  casinoTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  casinoProvider: {
    fontSize: 9,
    color: '#888',
    marginTop: 2,
  },
  categoryCard: {
    width: 90,
    height: 100,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  catIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  catText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
  },
  featuredCard: {
    width: 200,
    height: 120,
    borderRadius: 12,
    marginHorizontal: 5,
    overflow: 'hidden',
    position: 'relative',
  },
  featuredImg: {
    width: '100%',
    height: '100%',
  },
  featuredOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 40,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  featuredTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  }
});
"""

content = content.replace("});\n", new_styles)

with open('/root/goobet/expo-game/screens/HomeScreen.tsx', 'w') as f:
    f.write(content)

print("Styles appended.")
