import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, SafeAreaView, Platform, useWindowDimensions, StatusBar } from 'react-native';

interface Props {
  onPlayApple: () => void;
}

export function HomeScreen({ onPlayApple }: Props) {
  const { height } = useWindowDimensions();
  const idealWidth = Math.min(450, height * (394 / 854));

  return (
    <View style={styles.root}>
      <View style={[styles.appContainer, { width: Platform.OS === 'web' ? idealWidth : '100%' }]}>
        <SafeAreaView style={styles.safeArea}>
          
          {/* Main App Header */}
          <View style={styles.header}>
            <TouchableOpacity style={styles.iconBtn}>
              <Text style={styles.iconText}>🔍</Text>
            </TouchableOpacity>
            
            <Text style={styles.logoText}>GOOO<Text style={{fontWeight: 'normal'}}>bet</Text></Text>
            
            <View style={styles.balanceContainer}>
              <Text style={styles.balanceText}>0 <Text style={styles.currency}>ج.م</Text></Text>
              <View style={styles.addBtn}>
                <Text style={styles.addBtnText}>+</Text>
              </View>
            </View>
          </View>

          {/* Top Tabs */}
          <View style={styles.topTabs}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsContent} inverted>
              {/* RTL layout requires items in reverse order or inverted scroll */}
              {['أعلى', 'الرياضة', 'Esports', 'الكازينو', 'Games'].map((tab, idx) => (
                <TouchableOpacity key={idx} style={[styles.tabItem, tab === 'Games' && styles.activeTab]}>
                  <Text style={[styles.tabText, tab === 'Games' && styles.activeTabText]}>{tab}</Text>
                  {tab === 'Games' && <View style={styles.activeTabIndicator} />}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Main Content Area */}
          <ScrollView style={styles.mainContent} contentContainerStyle={{ paddingBottom: 80 }}>
            
            <Text style={styles.sectionTitle}>الفئات (Games)</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} inverted style={styles.horizontalScroll}>
              {['لك', 'الأفضل', 'اليانصيب', 'سلوتات'].map((cat, idx) => (
                <View key={idx} style={styles.categoryCard}>
                  <View style={styles.placeholderImg} />
                  <Text style={styles.categoryText}>{cat}</Text>
                </View>
              ))}
            </ScrollView>

            <Text style={styles.sectionTitle}>المتميزة</Text>
            <View style={styles.featuredCard}>
              <View style={styles.featuredImg} />
              <Text style={styles.featuredTitle}>Indian Poker</Text>
            </View>

            <Text style={styles.sectionTitle}>فئة السلم</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} inverted style={styles.horizontalScroll}>
              <TouchableOpacity style={styles.gameCard} onPress={onPlayApple}>
                <Image source={require('../assets/cuteapple_opt.jpg')} style={styles.gameImg} />
                <Text style={styles.gameTitle}>Apple of Fortune</Text>
              </TouchableOpacity>
              
              <View style={styles.gameCard}>
                <View style={styles.placeholderImgSmall} />
                <Text style={styles.gameTitle}>Stairs Game</Text>
              </View>
            </ScrollView>

            <Text style={styles.sectionTitle}>لك</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} inverted style={styles.horizontalScroll}>
              <View style={styles.gameCard}>
                <View style={styles.placeholderImgSmall} />
                <Text style={styles.gameTitle}>Crash Point</Text>
              </View>
              <View style={styles.gameCard}>
                <View style={styles.placeholderImgSmall} />
                <Text style={styles.gameTitle}>Western slot</Text>
              </View>
            </ScrollView>

          </ScrollView>

          {/* Bottom Navigation */}
          <View style={styles.bottomNav}>
            {[
              { label: 'رائج', active: true },
              { label: 'المفضلة', active: false },
              { label: 'القسيمة', active: false },
              { label: 'التاريخ', active: false },
              { label: 'القائمة', active: false },
            ].map((nav, idx) => (
              <TouchableOpacity key={idx} style={styles.navItem}>
                <View style={[styles.navIconPlaceholder, nav.active && styles.navIconActive]} />
                <Text style={[styles.navText, nav.active && styles.navTextActive]}>{nav.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </SafeAreaView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#e5e5e5', // light grey background for web wrapper
    alignItems: 'center',
    justifyContent: 'center',
  },
  appContainer: {
    height: '100%',
    backgroundColor: '#f8f9fa',
    overflow: 'hidden',
  },
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  iconBtn: {
    padding: 8,
  },
  iconText: {
    fontSize: 20,
  },
  logoText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#00a3ff',
    letterSpacing: -1,
  },
  balanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eaf5ff',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  balanceText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 14,
  },
  currency: {
    fontSize: 12,
    color: '#666',
  },
  addBtn: {
    backgroundColor: '#00a3ff',
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 6,
  },
  addBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    lineHeight: 18,
  },
  topTabs: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tabsContent: {
    paddingHorizontal: 10,
  },
  tabItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    position: 'relative',
  },
  tabText: {
    fontSize: 15,
    color: '#666',
  },
  activeTabText: {
    color: '#00a3ff',
    fontWeight: 'bold',
  },
  activeTabIndicator: {
    position: 'absolute',
    bottom: 0,
    left: 10,
    right: 10,
    height: 3,
    backgroundColor: '#00a3ff',
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
  },
  mainContent: {
    flex: 1,
    paddingTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
    paddingHorizontal: 16,
    marginVertical: 10,
    color: '#333',
  },
  horizontalScroll: {
    paddingHorizontal: 10,
  },
  categoryCard: {
    width: 90,
    height: 120,
    marginHorizontal: 6,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  placeholderImg: {
    width: '100%',
    height: 80,
    backgroundColor: '#ffd700',
  },
  categoryText: {
    marginTop: 8,
    fontWeight: 'bold',
    color: '#333',
    fontSize: 13,
  },
  featuredCard: {
    marginHorizontal: 16,
    height: 180,
    borderRadius: 16,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  featuredImg: {
    width: '100%',
    height: 140,
    backgroundColor: '#4caf50',
  },
  featuredTitle: {
    padding: 10,
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'right',
  },
  gameCard: {
    width: 140,
    marginHorizontal: 6,
    borderRadius: 12,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  gameImg: {
    width: '100%',
    height: 100,
  },
  placeholderImgSmall: {
    width: '100%',
    height: 100,
    backgroundColor: '#673ab7',
  },
  gameTitle: {
    padding: 8,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 13,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingBottom: Platform.OS === 'android' ? 24 : 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  navItem: {
    alignItems: 'center',
  },
  navIconPlaceholder: {
    width: 24,
    height: 24,
    backgroundColor: '#ccc',
    borderRadius: 12,
    marginBottom: 4,
  },
  navIconActive: {
    backgroundColor: '#00a3ff',
  },
  navText: {
    fontSize: 11,
    color: '#999',
  },
  navTextActive: {
    color: '#00a3ff',
    fontWeight: 'bold',
  }
});
