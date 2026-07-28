import re

with open('/root/goobet/expo-game/screens/HomeScreen.tsx', 'r') as f:
    original = f.read()

# I will replace everything after "{activeTab === 'أعلى' && (" until "{/* Bottom Navigation */}"
start_idx = original.find("{activeTab === 'أعلى' && (")
end_idx = original.find("{/* Bottom Navigation */}")

new_content = """{activeTab === 'أعلى' && (
            <ScrollView style={styles.mainContent} contentContainerStyle={{ paddingBottom: 100 }}>
              
              {/* Sports Categories Top Horizontal */}
              <ScrollView horizontal showsHorizontalScrollIndicator={false} inverted style={styles.sportsScroll}>
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
              <ScrollView horizontal showsHorizontalScrollIndicator={false} inverted style={styles.bannersScroll}>
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
              <ScrollView horizontal showsHorizontalScrollIndicator={false} inverted style={styles.horizontalScroll}>
                <View style={styles.casinoCardCoded}>
                  <Image source={require('../assets/cuteapple.jpg')} style={styles.casinoCardImg} />
                  <View style={styles.casinoCardInfo}>
                    <Text style={styles.casinoTitle} numberOfLines={1}>Hit Coins 2 Hold...</Text>
                    <Text style={styles.casinoProvider}>Barbara Bang</Text>
                  </View>
                </View>
                <View style={styles.casinoCardCoded}>
                  <Image source={require('../assets/board.jpg')} style={styles.casinoCardImg} />
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
              <ScrollView horizontal showsHorizontalScrollIndicator={false} inverted style={styles.horizontalScroll}>
                <View style={styles.categoryCard}>
                  <View style={[styles.catIconContainer, {backgroundColor: '#ffc107'}]}><Ionicons name="trophy" size={32} color="#fff" /></View>
                  <Text style={styles.catText}>لك</Text>
                </View>
                <View style={styles.categoryCard}>
                  <View style={[styles.catIconContainer, {backgroundColor: '#dc3545'}]}><MaterialCommunityIcons name="cards-playing" size={32} color="#fff" /></View>
                  <Text style={styles.catText}>الأفضل</Text>
                </View>
                <View style={styles.categoryCard}>
                  <View style={[styles.catIconContainer, {backgroundColor: '#17a2b8'}]}><FontAwesome5 name="dice" size={32} color="#fff" /></View>
                  <Text style={styles.catText}>اليانصيب</Text>
                </View>
              </ScrollView>

              {/* Featured Games */}
              <View style={styles.sectionHeader}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View style={[styles.pillLabel, {borderColor: '#28a745'}]}><Text style={[styles.pillLabelText, {color: '#28a745'}]}>Games</Text></View>
                  <Text style={styles.sectionTitle}>المتميزة</Text>
                </View>
              </View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} inverted style={styles.horizontalScroll}>
                <View style={styles.featuredCard}>
                  <Image source={require('../assets/board.jpg')} style={styles.featuredImg} />
                  <View style={styles.featuredOverlay}><Text style={styles.featuredTitle}>Midgard Zombies</Text></View>
                </View>
                <View style={styles.featuredCard}>
                  <Image source={require('../assets/fullapple.jpg')} style={styles.featuredImg} />
                  <View style={styles.featuredOverlay}><Text style={styles.featuredTitle}>Scratch Card</Text></View>
                </View>
              </ScrollView>
              
            </ScrollView>
          )}
          """
new_file = original[:start_idx] + new_content + original[end_idx:]

with open('/root/goobet/expo-game/screens/HomeScreen.tsx', 'w') as f:
    f.write(new_file)
print("Updated structural elements.")
