import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, SafeAreaView, Platform, useWindowDimensions, StatusBar } from 'react-native';
import { MaterialCommunityIcons, FontAwesome5, Ionicons } from '@expo/vector-icons';

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
              <Ionicons name="search" size={24} color="#557597" />
            </TouchableOpacity>
            
            <View style={styles.logoContainer}>
              <Text style={styles.logoText}>GOOO<Text style={styles.logoTextLight}>bet</Text></Text>
            </View>
            
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
              <View style={styles.tabItem}>
                <Ionicons name="star" size={20} color="#b0b5bd" />
                <Text style={styles.tabText}>أعلى</Text>
              </View>
              <View style={styles.tabItem}>
                <Ionicons name="football" size={20} color="#b0b5bd" />
                <Text style={styles.tabText}>الرياضة</Text>
              </View>
              <View style={styles.tabItem}>
                <Ionicons name="game-controller" size={20} color="#b0b5bd" />
                <Text style={styles.tabText}>Esports</Text>
              </View>
              <View style={styles.tabItem}>
                <MaterialCommunityIcons name="cards-playing" size={20} color="#b0b5bd" />
                <Text style={styles.tabText}>الكازينو</Text>
              </View>
              <View style={[styles.tabItem, styles.activeTab]}>
                <FontAwesome5 name="dice" size={20} color="#17a2b8" />
                <Text style={styles.activeTabText}>Games</Text>
                <View style={styles.activeTabIndicator} />
              </View>
            </ScrollView>
          </View>

          {/* Main Content Area */}
          <ScrollView style={styles.mainContent} contentContainerStyle={{ paddingBottom: 100 }}>
            
            <View style={styles.sectionHeader}>
              <TouchableOpacity style={styles.allBtn}>
                <Text style={styles.allBtnText}>الكل</Text>
              </TouchableOpacity>
              <Text style={styles.sectionTitle}>سلوتات</Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} inverted style={styles.horizontalScroll}>
              <View style={styles.gameCard}><Image source={require('../assets/vampire_curse.png')} style={styles.gameImg} /><Text style={styles.gameTitle}>Vampire Curse</Text></View>
              <View style={styles.gameCard}><Image source={require('../assets/burning_hot.png')} style={styles.gameImg} /><Text style={styles.gameTitle}>Burning Hot</Text></View>
              <View style={styles.gameCard}><Image source={require('../assets/crystal.png')} style={styles.gameImg} /><Text style={styles.gameTitle}>Crystal</Text></View>
              <View style={styles.gameCard}><Image source={require('../assets/western_slot.png')} style={styles.gameImg} /><Text style={styles.gameTitle}>Western slot</Text></View>
            </ScrollView>

            <View style={styles.bannerContainer}>
              <Image source={require('../assets/lucky_wheel.png')} style={styles.bannerImg} resizeMode="cover" />
            </View>

            <View style={styles.sectionHeader}>
              <TouchableOpacity style={styles.allBtn}>
                <Text style={styles.allBtnText}>الكل</Text>
              </TouchableOpacity>
              <Text style={styles.sectionTitle}>ألعاب فئة السلم</Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} inverted style={styles.horizontalScroll}>
              <View style={styles.gameCard}><Image source={require('../assets/dragons_gold.png')} style={styles.gameImg} /><Text style={styles.gameTitle}>Dragon's Gold</Text></View>
              <View style={styles.gameCard}><Image source={require('../assets/kamikaze.png')} style={styles.gameImg} /><Text style={styles.gameTitle}>Kamikaze</Text></View>
              <View style={styles.gameCard}><Image source={require('../assets/wild_west_gold.png')} style={styles.gameImg} /><Text style={styles.gameTitle}>Wild West Gold</Text></View>
              <TouchableOpacity style={styles.gameCard} onPress={onPlayApple}>
                <Image source={require('../assets/card_apple.png')} style={styles.gameImg} />
                <Text style={styles.gameTitle}>Apple Of Fortune</Text>
              </TouchableOpacity>
            </ScrollView>

            <View style={styles.sectionHeader}>
              <TouchableOpacity style={styles.allBtn}>
                <Text style={styles.allBtnText}>الكل</Text>
              </TouchableOpacity>
              <Text style={styles.sectionTitle}>النرد</Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} inverted style={styles.horizontalScroll}>
              <View style={styles.gameCard}><Image source={require('../assets/games_mania.png')} style={styles.gameImg} /><Text style={styles.gameTitle}>Games Mania</Text></View>
              <View style={styles.gameCard}><Image source={require('../assets/yahtzee.png')} style={styles.gameImg} /><Text style={styles.gameTitle}>Yahtzee</Text></View>
              <View style={styles.gameCard}><Image source={require('../assets/dice.png')} style={styles.gameImg} /><Text style={styles.gameTitle}>Dice</Text></View>
              <View style={styles.gameCard}><Image source={require('../assets/under_over_7.png')} style={styles.gameImg} /><Text style={styles.gameTitle}>Under and Over 7</Text></View>
            </ScrollView>

          </ScrollView>

          {/* Bottom Navigation */}
          <View style={styles.bottomNav}>
            <TouchableOpacity style={styles.navItem}>
              <MaterialCommunityIcons name="menu" size={24} color="#b0b5bd" />
              <Text style={styles.navText}>القائمة</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navItem}>
              <MaterialCommunityIcons name="history" size={24} color="#b0b5bd" />
              <Text style={styles.navText}>التاريخ</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navItem}>
              <Image source={require('../assets/coupon_icon.png')} style={styles.couponImage} />
              <Text style={styles.navTextActive}>القسيمة</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navItem}>
              <Ionicons name="star" size={24} color="#b0b5bd" />
              <Text style={styles.navText}>المفضلة</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navItem}>
              <MaterialCommunityIcons name="fire" size={24} color="#17a2b8" />
              <Text style={styles.navTextActive}>رائج</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#e5e5e5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  appContainer: {
    height: '100%',
    backgroundColor: '#f2f4f7',
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
  logoContainer: {
    flex: 1,
    alignItems: 'center',
  },
  logoText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#17a2b8',
    letterSpacing: -1,
  },
  logoTextLight: {
    fontWeight: 'normal',
    color: '#333',
  },
  balanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e6f5fc',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },
  balanceText: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 14,
  },
  currency: {
    fontSize: 12,
    color: '#666',
  },
  addBtn: {
    backgroundColor: '#17a2b8',
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
    fontSize: 14,
  },
  topTabs: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tabsContent: {
    paddingHorizontal: 10,
    flexDirection: 'row',
  },
  tabItem: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    width: 80,
  },
  activeTab: {
  },
  tabText: {
    fontSize: 12,
    color: '#b0b5bd',
    marginTop: 4,
    fontWeight: '600',
  },
  activeTabText: {
    fontSize: 12,
    color: '#17a2b8',
    marginTop: 4,
    fontWeight: 'bold',
  },
  activeTabIndicator: {
    position: 'absolute',
    bottom: 0,
    left: 10,
    right: 10,
    height: 3,
    backgroundColor: '#17a2b8',
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
  },
  mainContent: {
    flex: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#1f2937',
  },
  allBtn: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#17a2b8',
    backgroundColor: '#fff',
  },
  allBtnText: {
    color: '#17a2b8',
    fontSize: 12,
    fontWeight: 'bold',
  },
  horizontalScroll: {
    paddingHorizontal: 10,
  },
  gameCard: {
    width: 100,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  gameImg: {
    width: 100,
    height: 100,
    borderRadius: 16,
  },
  gameTitle: {
    marginTop: 6,
    fontWeight: '700',
    textAlign: 'center',
    fontSize: 12,
    color: '#333',
  },
  bannerContainer: {
    paddingHorizontal: 16,
    marginTop: 20,
  },
  bannerImg: {
    width: '100%',
    height: 130,
    borderRadius: 16,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingBottom: Platform.OS === 'android' ? 24 : 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
    height: 50,
  },
  couponImage: {
    width: 60,
    height: 60,
    position: 'absolute',
    top: -25,
  },
  couponCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#17a2b8',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: -20,
    borderWidth: 4,
    borderColor: '#f2f4f7',
  },
  navText: {
    fontSize: 11,
    color: '#b0b5bd',
    marginTop: 4,
    fontWeight: '600',
  },
  navTextActive: {
    fontSize: 11,
    color: '#17a2b8',
    marginTop: 4,
    fontWeight: 'bold',
  }
});
