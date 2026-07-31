import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, SafeAreaView, Platform, useWindowDimensions, StatusBar } from 'react-native';
import { MaterialCommunityIcons, FontAwesome5, Ionicons } from '@expo/vector-icons';

interface Props {
  onPlayApple: () => void;
  onNavigateToMenu: () => void;
}

export function HomeScreen({ onPlayApple, onNavigateToMenu }: Props) {
  const [activeTab, setActiveTab] = useState('أعلى');
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
              <Image source={require('../assets/goobetheder.png')} style={styles.headerLogoImage} resizeMode="contain" />
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
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsContent}>
              <TouchableOpacity style={styles.tabItem} onPress={() => setActiveTab('أعلى')}>
                <Ionicons name="star" size={20} color={activeTab === 'أعلى' ? "#17a2b8" : "#b0b5bd"} />
                <Text style={activeTab === 'أعلى' ? styles.activeTabText : styles.tabText}>أعلى</Text>
                {activeTab === 'أعلى' && <View style={styles.activeTabIndicator} />}
              </TouchableOpacity>
              <TouchableOpacity style={styles.tabItem}>
                <Ionicons name="football" size={20} color="#b0b5bd" />
                <Text style={styles.tabText}>الرياضة</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.tabItem}>
                <Ionicons name="game-controller" size={20} color="#b0b5bd" />
                <Text style={styles.tabText}>Esports</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.tabItem}>
                <MaterialCommunityIcons name="cards-playing" size={20} color="#b0b5bd" />
                <Text style={styles.tabText}>الكازينو</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.tabItem} onPress={() => setActiveTab('Games')}>
                <FontAwesome5 name="dice" size={20} color={activeTab === 'Games' ? "#17a2b8" : "#b0b5bd"} />
                <Text style={activeTab === 'Games' ? styles.activeTabText : styles.tabText}>Games</Text>
                {activeTab === 'Games' && <View style={styles.activeTabIndicator} />}
              </TouchableOpacity>
            </ScrollView>
          </View>

          {/* Main Content Area */}
          {activeTab === 'Games' && (
            <ScrollView style={styles.mainContent} contentContainerStyle={{ paddingBottom: 100 }}>
              
              <View style={styles.sectionHeader}>
                <TouchableOpacity style={styles.allBtn}>
                  <Text style={styles.allBtnText}>الكل</Text>
                </TouchableOpacity>
                <Text style={styles.sectionTitle}>سلوتات</Text>
              </View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
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
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
                <View style={styles.gameCard}><Image source={require('../assets/dragons_gold.png')} style={styles.gameImg} /><Text style={styles.gameTitle}>Dragon's Gold</Text></View>
                <View style={styles.gameCard}><Image source={require('../assets/kamikaze.png')} style={styles.gameImg} /><Text style={styles.gameTitle}>Kamikaze</Text></View>
                <View style={styles.gameCard}><Image source={require('../assets/wild_west_gold.png')} style={styles.gameImg} /><Text style={styles.gameTitle}>Wild West Gold</Text></View>
                <TouchableOpacity style={styles.gameCard} onPress={onPlayApple}>
                  <Image source={require('../assets/card_apple_cropped.png')} style={styles.gameImg} />
                  <Text style={styles.gameTitle}>Apple Of Fortune</Text>
                </TouchableOpacity>
              </ScrollView>

              <View style={styles.sectionHeader}>
                <TouchableOpacity style={styles.allBtn}>
                  <Text style={styles.allBtnText}>الكل</Text>
                </TouchableOpacity>
                <Text style={styles.sectionTitle}>النرد</Text>
              </View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
                <View style={styles.gameCard}><Image source={require('../assets/games_mania.png')} style={styles.gameImg} /><Text style={styles.gameTitle}>Games Mania</Text></View>
                <View style={styles.gameCard}><Image source={require('../assets/yahtzee.png')} style={styles.gameImg} /><Text style={styles.gameTitle}>Yahtzee</Text></View>
                <View style={styles.gameCard}><Image source={require('../assets/dice.png')} style={styles.gameImg} /><Text style={styles.gameTitle}>Dice</Text></View>
                <View style={styles.gameCard}><Image source={require('../assets/under_over_7.png')} style={styles.gameImg} /><Text style={styles.gameTitle}>Under and Over 7</Text></View>
              </ScrollView>
            </ScrollView>
          )}

          {activeTab === 'أعلى' && (
            <ScrollView style={styles.mainContent} contentContainerStyle={{ paddingBottom: 100 }}>
              
              {/* Sports Categories Top Horizontal */}
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.sportsScroll}>
                <View style={styles.sportCat}>
                  <View style={styles.sportIconCircleActive}><Ionicons name="checkmark-done" size={24} color="#fff" /></View>
                  <Text style={styles.sportTextActive}>الكل</Text>
                </View>
                <View style={styles.sportCat}>
                  <View style={styles.sportIconCircle}><Ionicons name="football" size={24} color="#17a2b8" /></View>
                  <Text style={styles.sportText}>كرة القدم</Text>
                </View>
                <View style={styles.sportCat}>
                  <View style={styles.sportIconCircle}><MaterialCommunityIcons name="tennis-ball" size={24} color="#17a2b8" /></View>
                  <Text style={styles.sportText}>التنس</Text>
                </View>
                <View style={styles.sportCat}>
                  <View style={styles.sportIconCircle}><MaterialCommunityIcons name="basketball" size={24} color="#17a2b8" /></View>
                  <Text style={styles.sportText}>كرة السلة</Text>
                </View>
                <View style={styles.sportCat}>
                  <View style={styles.sportIconCircle}><MaterialCommunityIcons name="hockey-sticks" size={24} color="#17a2b8" /></View>
                  <Text style={styles.sportText}>هوكي الجليد</Text>
                </View>
              </ScrollView>

              {/* Promo Banners */}
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.bannersScroll}>
                <Image source={require('../assets/banner1.png')} style={styles.promoBanner} />
                <Image source={require('../assets/banner2.png')} style={styles.promoBanner} />
                <Image source={require('../assets/banner3.png')} style={styles.promoBanner} />
              </ScrollView>

              {/* Live Match */}
              <View style={styles.sectionHeader}>
                <TouchableOpacity style={styles.allBtn}><Text style={styles.allBtnText}>الكل</Text></TouchableOpacity>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View style={styles.pillLabel}><Text style={styles.pillLabelText}>الرياضة</Text></View>
                  <Text style={styles.sectionTitle}>أفضل ما هو مباشر</Text>
                </View>
              </View>
              <View style={styles.matchCard}>
                <View style={styles.matchCardHeaderTop}>
                  <View style={styles.headerTopLeft}><Ionicons name="star-outline" size={16} color="#b0b5bd" /></View>
                  <View style={styles.headerTopCenter}>
                    <Ionicons name="trophy-outline" size={14} color="#6b7280" />
                    <Text style={styles.matchLeagueText}>ASEAN Cup</Text>
                  </View>
                  <View style={styles.headerTopRight}><Ionicons name="notifications-outline" size={16} color="#17a2b8" /></View>
                </View>
                <View style={styles.divider} />
                <View style={styles.matchTeamsRow}>
                  <View style={styles.teamViewLeft}>
                    <Image source={require('../assets/flag_indonesia.png')} style={styles.teamLogo} />
                    <Text style={styles.teamNameLeft} numberOfLines={2}>إندونيسيا</Text>
                  </View>
                  <View style={styles.scoreView}><Text style={styles.scoreText}>4 : 1</Text></View>
                  <View style={styles.teamViewRight}>
                    <Text style={styles.teamNameRight} numberOfLines={2}>كمبوديا</Text>
                    <Image source={require('../assets/flag_cambodia.png')} style={styles.teamLogo} />
                  </View>
                </View>
                <Text style={styles.matchTimeText}>الشوط ال2, الوقت المنقضي: 68:02 (1-1, 3-0)</Text>
                <Text style={styles.oneXTwo}>مجموع</Text>
                <View style={styles.oddsContainer}>
                  <View style={styles.oddBox}><Text style={styles.oddValue}>1.7</Text><Text style={styles.oddLabel}>أكثر من (6)</Text></View>
                  <View style={styles.oddBox}><Text style={styles.oddValue}>2.152</Text><Text style={styles.oddLabel}>أقل من (6)</Text></View>
                </View>
              </View>

              {/* Pre-Match */}
              <View style={styles.sectionHeader}>
                <TouchableOpacity style={styles.allBtn}><Text style={styles.allBtnText}>الكل</Text></TouchableOpacity>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View style={styles.pillLabel}><Text style={styles.pillLabelText}>الرياضة</Text></View>
                  <Text style={styles.sectionTitle}>قبل المباراة الأكثر شعبية</Text>
                </View>
              </View>
              <View style={styles.matchCard}>
                <View style={styles.matchCardHeaderTop}>
                  <View style={styles.headerTopLeft}><Ionicons name="star-outline" size={16} color="#b0b5bd" /></View>
                  <View style={styles.headerTopCenter}>
                    <Ionicons name="trophy-outline" size={14} color="#6b7280" />
                    <Text style={styles.matchLeagueText}>بطولة التشيك</Text>
                  </View>
                  <View style={styles.headerTopRight}>
                    <View style={styles.soonBadge}><Text style={styles.soonText}>Soon</Text></View>
                    <Ionicons name="notifications-outline" size={16} color="#17a2b8" />
                  </View>
                </View>
                <View style={styles.divider} />
                <View style={styles.matchTeamsRow}>
                  <View style={styles.teamViewLeft}>
                    <Image source={require('../assets/logo_mlada.png')} style={styles.teamLogo} />
                    <Text style={styles.teamNameLeft} numberOfLines={2}>نادي ملادا</Text>
                  </View>
                  <View style={styles.scoreView}>
                    <Text style={styles.timerText}>01:01:5</Text>
                    <Text style={styles.vsText}>VS</Text>
                  </View>
                  <View style={styles.teamViewRight}>
                    <Text style={styles.teamNameRight} numberOfLines={2}>أرتيس برنو</Text>
                    <Image source={require('../assets/logo_brno.png')} style={styles.teamLogo} />
                  </View>
                </View>
                <Text style={styles.matchTimeText}>27.07.2026 (07:00 PM)</Text>
                <Text style={styles.oneXTwo}>1x2</Text>
                <View style={styles.oddsContainer}>
                  <View style={styles.oddBox}><Text style={styles.oddValue}>1.78</Text><Text style={styles.oddLabel}>فوز2</Text></View>
                  <View style={styles.oddBox}><Text style={styles.oddValue}>3.74</Text><Text style={styles.oddLabel}>التعادل</Text></View>
                  <View style={styles.oddBox}><Text style={styles.oddValue}>4.09</Text><Text style={styles.oddLabel}>فوز1</Text></View>
                </View>
              </View>

              {/* Live Tournaments */}
              <View style={styles.sectionHeader}>
                <TouchableOpacity style={styles.allBtn}><Text style={styles.allBtnText}>الكل</Text></TouchableOpacity>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View style={styles.pillLabel}><Text style={styles.pillLabelText}>الرياضة</Text></View>
                  <Text style={styles.sectionTitle}>البطولات المباشرة</Text>
                </View>
              </View>
              <View style={styles.tournamentsList}>
                <View style={styles.tournamentRow}>
                  <View style={styles.tournLeft}>
                    <Ionicons name="star-outline" size={16} color="#b0b5bd" />
                    <View style={styles.badge}><Text style={styles.badgeText}>1</Text></View>
                    <Text style={styles.tournName}>ASEAN Cup</Text>
                  </View>
                </View>
                <View style={styles.tournamentRow}>
                  <View style={styles.tournLeft}>
                    <Ionicons name="star-outline" size={16} color="#b0b5bd" />
                    <View style={styles.badge}><Text style={styles.badgeText}>1</Text></View>
                    <Text style={styles.tournName}>البطولة الروسية</Text>
                  </View>
                </View>
              </View>

              {/* Recommended Casino */}
              <View style={styles.sectionHeader}>
                <TouchableOpacity style={styles.allBtn}><Text style={styles.allBtnText}>الكل</Text></TouchableOpacity>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View style={[styles.pillLabel, {borderColor: '#e83e8c'}]}><Text style={[styles.pillLabelText, {color: '#e83e8c'}]}>كازينو</Text></View>
                  <Text style={styles.sectionTitle}>موصى به</Text>
                </View>
              </View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
                <View style={styles.casinoCardCoded}>
                  <Image source={require('../assets/banner1_real.jpg')} style={styles.casinoCardImg} />
                  <View style={styles.casinoCardInfo}>
                    <Text style={styles.casinoTitle} numberOfLines={1}>Hit Coins 2 Hold...</Text>
                    <Text style={styles.casinoProvider}>Barbara Bang</Text>
                  </View>
                </View>
                <View style={styles.casinoCardCoded}>
                  <Image source={require('../assets/casino1_real.jpg')} style={styles.casinoCardImg} />
                  <View style={styles.casinoCardInfo}>
                    <Text style={styles.casinoTitle} numberOfLines={1}>Royalty Olympus</Text>
                    <Text style={styles.casinoProvider}>Barbara Bang</Text>
                  </View>
                </View>
              </ScrollView>

              {/* Categories Games */}
              <View style={styles.sectionHeader}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View style={[styles.pillLabel, {borderColor: '#28a745'}]}><Text style={[styles.pillLabelText, {color: '#28a745'}]}>Games</Text></View>
                  <Text style={styles.sectionTitle}>الفئات</Text>
                </View>
              </View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
                <View style={{marginHorizontal: 5}}>
                  <Image source={require('../assets/feat4_real.jpg')} style={{width: 116, height: 177, borderRadius: 12}} />
                </View>
                <View style={{marginHorizontal: 5}}>
                  <Image source={require('../assets/feat3_real.jpg')} style={{width: 116, height: 177, borderRadius: 12}} />
                </View>
                <View style={{marginHorizontal: 5}}>
                  <Image source={require('../assets/feat2_real.jpg')} style={{width: 116, height: 177, borderRadius: 12}} />
                </View>
                <View style={{marginHorizontal: 5}}>
                  <Image source={require('../assets/feat1_real.jpg')} style={{width: 116, height: 177, borderRadius: 12}} />
                </View>


              </ScrollView>

              {/* Featured Games */}
              <View style={styles.sectionHeader}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View style={[styles.pillLabel, {borderColor: '#28a745'}]}><Text style={[styles.pillLabelText, {color: '#28a745'}]}>Games</Text></View>
                  <Text style={styles.sectionTitle}>موصى بيه</Text>
                </View>
              </View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
                <View style={{marginHorizontal: 5}}>
                  <Image source={require('../assets/cat1_real.jpg')} style={{width: 221, height: 136, borderRadius: 12}} />
                </View>
                <View style={{marginHorizontal: 5}}>
                  <Image source={require('../assets/cat2_real.jpg')} style={{width: 221, height: 136, borderRadius: 12}} />
                </View>
                <View style={{marginHorizontal: 5}}>
                  <Image source={require('../assets/cat3_real.jpg')} style={{width: 197, height: 130, borderRadius: 12}} />
                </View>


              </ScrollView>

              {/* Casino Categories */}
              <View style={styles.sectionHeader}>
                <TouchableOpacity style={styles.allBtn}><Text style={styles.allBtnText}>الكل</Text></TouchableOpacity>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View style={[styles.pillLabel, {borderColor: '#e83e8c'}]}><Text style={[styles.pillLabelText, {color: '#e83e8c'}]}>كازينو</Text></View>
                  <Text style={styles.sectionTitle}>الفئات</Text>
                </View>
              </View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
                <View style={{marginHorizontal: 5}}>
                  <Image source={require('../assets/cat1_real.jpg')} style={{width: 100, height: 136, borderRadius: 12}} />
                </View>
                <View style={{marginHorizontal: 5}}>
                  <Image source={require('../assets/cat2_real.jpg')} style={{width: 221, height: 136, borderRadius: 12}} />
                </View>
                <View style={{marginHorizontal: 5}}>
                  <Image source={require('../assets/cat3_real.jpg')} style={{width: 197, height: 130, borderRadius: 12}} />
                </View>

              </ScrollView>

              {/* Esports Specialties */}
              <View style={styles.sectionHeader}>
                <TouchableOpacity style={styles.allBtn}><Text style={styles.allBtnText}>الكل</Text></TouchableOpacity>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View style={[styles.pillLabel, {borderColor: '#6f42c1'}]}><Text style={[styles.pillLabelText, {color: '#6f42c1'}]}>الرياضات</Text></View>
                  <Text style={styles.sectionTitle}>تخصصات</Text>
                </View>
              </View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
                <View style={styles.featuredCard}>
                  <Image source={require('../assets/banner1_real.jpg')} style={styles.featuredImg} />
                  <View style={styles.featuredOverlay}><Text style={styles.featuredTitle}>CS 2</Text></View>
                </View>
                <View style={styles.featuredCard}>
                  <Image source={require('../assets/casino1_real.jpg')} style={styles.featuredImg} />
                  <View style={styles.featuredOverlay}><Text style={styles.featuredTitle}>Dota 2</Text></View>
                </View>
              </ScrollView>

              {/* Esports Live */}
              <View style={styles.sectionHeader}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View style={[styles.pillLabel, {borderColor: '#6f42c1'}]}><Text style={[styles.pillLabelText, {color: '#6f42c1'}]}>الرياضات</Text></View>
                  <Text style={styles.sectionTitle}>الرياضات الإلكترونية المباشرة</Text>
                </View>
              </View>
              <View style={styles.matchCard}>
                <View style={styles.matchCardHeaderTop}>
                  <View style={styles.headerTopLeft}><Ionicons name="star-outline" size={16} color="#b0b5bd" /></View>
                  <View style={styles.headerTopCenter}>
                    <Ionicons name="trophy-outline" size={14} color="#6b7280" />
                    <Text style={styles.matchLeagueText}>بطولة العالم CS2</Text>
                  </View>
                  <View style={styles.headerTopRight}><Ionicons name="notifications-outline" size={16} color="#17a2b8" /></View>
                </View>
                <View style={styles.divider} />
                <View style={styles.matchTeamsRow}>
                  <View style={styles.teamViewLeft}>
                    <Ionicons name="logo-steam" size={28} color="#b0b5bd" />
                    <Text style={styles.teamNameLeft} numberOfLines={2}>نيجما جالاكسي</Text>
                  </View>
                  <View style={styles.scoreView}><Text style={styles.scoreText}>0 : 0</Text></View>
                  <View style={styles.teamViewRight}>
                    <Text style={styles.teamNameRight} numberOfLines={2}>موس إيسبورتس</Text>
                    <Ionicons name="logo-steam" size={28} color="#b0b5bd" />
                  </View>
                </View>
                <Text style={styles.oneXTwo}>1x2</Text>
                <View style={styles.oddsContainer}>
                  <View style={styles.oddBox}><Text style={styles.oddValue}>4.74</Text><Text style={styles.oddLabel}>فوز2</Text></View>
                  <View style={styles.oddBox}><Text style={styles.oddValue}>1.165</Text><Text style={styles.oddLabel}>فوز1</Text></View>
                </View>
              </View>
              
            </ScrollView>
          )}
          {/* Bottom Navigation */}
          <View style={styles.bottomNav}>
            <TouchableOpacity style={styles.navItem} onPress={onNavigateToMenu}>
              <MaterialCommunityIcons name="menu" size={24} color="#b0b5bd" />
              <Text style={styles.navText}>القائمة</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navItem}>
              <MaterialCommunityIcons name="history" size={24} color="#b0b5bd" />
              <Text style={styles.navText}>التاريخ</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navItem}>
              <View style={styles.couponCircle}>
                <MaterialCommunityIcons name="ticket-percent" size={28} color="#fff" style={{ transform: [{ rotate: '-30deg' }] }} />
              </View>
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
  headerLogoImage: {
    width: 140,
    height: 35,
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
    paddingHorizontal: 15,
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
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
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
  },
  sportsScroll: {
    paddingHorizontal: 16,
    paddingVertical: 15,
  },
  sportCat: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  sportIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
    boxShadow: '0px 0px 3px rgba(0, 0, 0, 0.05)',
    elevation: 2,
  },
  sportIconCircleActive: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#17a2b8',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
    boxShadow: '0px 0px 4px rgba(23, 162, 184, 0.3)',
    elevation: 4,
  },
  sportText: {
    fontSize: 12,
    color: '#333',
  },
  sportTextActive: {
    fontSize: 12,
    color: '#333',
    fontWeight: 'bold',
  },
  bannersScroll: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  promoBanner: {
    width: 150,
    height: 152,
    borderRadius: 16,
    marginHorizontal: 5,
  },
  pillLabel: {
    borderWidth: 1,
    borderColor: '#17a2b8',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginRight: 8,
  },
  pillLabelText: {
    color: '#17a2b8',
    fontSize: 10,
    fontWeight: 'bold',
  },
  matchCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginHorizontal: 16,
    padding: 12,
    marginBottom: 12,
    boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.05)',
    elevation: 3,
  },
  matchCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  matchLeagueText: {
    color: '#6b7280',
    fontSize: 12,
    marginLeft: 6,
  },
  matchTeamsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  teamViewLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingRight: 10,
  },
  teamViewRight: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingLeft: 10,
  },
  teamNameLeft: {
    textAlign: 'left',
    fontWeight: 'bold',
    color: '#1f2937',
    fontSize: 13,
    marginLeft: 6,
    flex: 1,
  },
  teamNameRight: {
    textAlign: 'right',
    fontWeight: 'bold',
    color: '#1f2937',
    fontSize: 13,
    marginRight: 6,
    flex: 1,
  },
  teamLogo: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#eee',
  },
  scoreView: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 50,
  },
  scoreText: {
    fontWeight: '900',
    fontSize: 24,
    color: '#1f2937',
  },
  matchTimeText: {
    textAlign: 'center',
    color: '#6b7280',
    fontSize: 12,
    marginBottom: 12,
  },
  oneXTwo: {
    textAlign: 'right',
    fontSize: 10,
    color: '#b0b5bd',
    marginBottom: 4,
    marginRight: 4,
  },
  oddsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  oddBox: {
    flex: 1,
    backgroundColor: '#f6f7f9',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginHorizontal: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  oddLabel: {
    color: '#b0b5bd',
    fontSize: 12,
  },
  oddValue: {
    fontWeight: 'bold',
    color: '#1f2937',
    fontSize: 14,
  },
  matchCardHeaderTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  headerTopLeft: {
    width: 30,
    alignItems: 'flex-start',
  },
  headerTopRight: {
    width: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  headerTopCenter: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginBottom: 12,
  },
  soonBadge: {
    backgroundColor: '#ff4d4f',
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 8,
    marginRight: 4,
  },
  soonText: {
    color: '#fff',
    fontSize: 8,
    fontWeight: 'bold',
  },
  timerText: {
    color: '#17a2b8',
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  vsText: {
    color: '#1f2937',
    fontSize: 16,
    fontWeight: '900',
  },

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
