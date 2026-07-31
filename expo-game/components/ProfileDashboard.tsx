import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image, Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface ProfileDashboardProps {
  accountId: string;
  balance: number;
  onOpenGame: () => void;
  onNavigateToHome: () => void;
}

export default function ProfileDashboard({ accountId, balance, onOpenGame, onNavigateToHome }: ProfileDashboardProps) {
  return (
    <SafeAreaView style={styles.container}>
      {/* Top Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.depositBtn}>
            <Text style={styles.depositBtnText}>+ إيداع</Text>
          </TouchableOpacity>
          <View style={styles.balanceContainer}>
            <Text style={styles.balanceText}>ج.م {balance.toFixed(2)}</Text>
            <MaterialCommunityIcons name="wallet-outline" size={20} color="#1ab0e5" style={{ marginLeft: 5 }} />
          </View>
        </View>
        <View style={styles.headerRight}>
          <Text style={styles.idText}>id: {accountId}</Text>
          <TouchableOpacity style={styles.profileIcon}>
            <MaterialCommunityIcons name="account" size={24} color="#aaa" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity style={[styles.tab, styles.activeTab]} onPress={onNavigateToHome}>
          <MaterialCommunityIcons name="star-circle" size={24} color="#1ab0e5" />
          <Text style={styles.activeTabText}>أعلى</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <MaterialCommunityIcons name="soccer" size={24} color="#666" />
          <Text style={styles.tabText}>الرياضة</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <MaterialCommunityIcons name="cards-playing-outline" size={24} color="#666" />
          <Text style={styles.tabText}>الكازينو</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <MaterialCommunityIcons name="dice-5" size={24} color="#666" />
          <Text style={styles.tabText}>Games</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollContent}>
        
        <TouchableOpacity style={styles.listItem}>
          <View style={styles.listItemRight}>
            <Text style={styles.listItemTitle}>LIVE</Text>
            <Text style={styles.listItemSub}>راهن على الأحداث لايف</Text>
          </View>
          <MaterialCommunityIcons name="timer-outline" size={30} color="#1ab0e5" style={styles.listItemIcon} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.listItem}>
          <View style={styles.listItemRight}>
            <Text style={styles.listItemTitle}>قبل المباراة</Text>
            <Text style={styles.listItemSub}>راهن على الأحداث القادمة</Text>
          </View>
          <MaterialCommunityIcons name="calendar-month-outline" size={30} color="#1ab0e5" style={styles.listItemIcon} />
        </TouchableOpacity>

        {/* The Game Link */}
        <TouchableOpacity style={styles.listItemHighlighted} onPress={onOpenGame}>
          <View style={styles.listItemRight}>
            <Text style={styles.listItemTitle}>لعبة التفاحة 🍏</Text>
            <Text style={styles.listItemSub}>العب واربح في لعبة التفاحة</Text>
          </View>
          <MaterialCommunityIcons name="apple" size={35} color="#e63946" style={styles.listItemIcon} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.listItem}>
          <View style={styles.listItemRight}>
            <Text style={styles.listItemTitle}>الرياضات الإلكترونية</Text>
            <Text style={styles.listItemSub}>أفضل أحداث الرياضات الإلكترونية</Text>
          </View>
          <MaterialCommunityIcons name="gamepad-variant-outline" size={30} color="#1ab0e5" style={styles.listItemIcon} />
        </TouchableOpacity>

      </ScrollView>

      {/* Bottom Nav */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <MaterialCommunityIcons name="menu" size={24} color="#1ab0e5" />
          <Text style={[styles.navText, { color: '#1ab0e5' }]}>القائمة</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialCommunityIcons name="history" size={24} color="#999" />
          <Text style={styles.navText}>التاريخ</Text>
        </TouchableOpacity>
        
        <View style={styles.navCenterItem}>
          <View style={styles.navCenterIcon}>
            <MaterialCommunityIcons name="ticket-percent" size={28} color="#fff" />
          </View>
          <Text style={styles.navText}>القسيمة</Text>
        </View>

        <TouchableOpacity style={styles.navItem}>
          <MaterialCommunityIcons name="star-outline" size={24} color="#999" />
          <Text style={styles.navText}>المفضلة</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={onNavigateToHome}>
          <MaterialCommunityIcons name="fire" size={24} color="#999" />
          <Text style={styles.navText}>رائج</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7f9',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  depositBtn: {
    backgroundColor: '#1ab0e5',
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 5,
    marginRight: 10,
  },
  depositBtnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  balanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f5f9',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 5,
  },
  balanceText: {
    color: '#333',
    fontWeight: 'bold',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  idText: {
    marginRight: 10,
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabsContainer: {
    flexDirection: 'row-reverse',
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#1ab0e5',
    paddingBottom: 5,
  },
  activeTabText: {
    color: '#1ab0e5',
    fontWeight: 'bold',
    marginTop: 5,
  },
  tabText: {
    color: '#666',
    marginTop: 5,
  },
  scrollContent: {
    flex: 1,
    padding: 10,
  },
  listItem: {
    flexDirection: 'row-reverse',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
    elevation: 2,
  },
  listItemHighlighted: {
    flexDirection: 'row-reverse',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
    boxShadow: '0px 2px 4px rgba(26, 176, 229, 0.2)',
    elevation: 4,
    borderWidth: 1,
    borderColor: '#e0f4fc',
  },
  listItemRight: {
    flex: 1,
    alignItems: 'flex-end',
    marginRight: 15,
  },
  listItemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 3,
  },
  listItemSub: {
    fontSize: 12,
    color: '#888',
  },
  listItemIcon: {
    backgroundColor: '#f0f8ff',
    padding: 10,
    borderRadius: 25,
    overflow: 'hidden',
  },
  bottomNav: {
    flexDirection: 'row-reverse',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingBottom: Platform.OS === 'ios' ? 20 : 10,
    paddingTop: 10,
    justifyContent: 'space-around',
    alignItems: 'flex-end',
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 10,
    color: '#999',
    marginTop: 3,
  },
  navCenterItem: {
    alignItems: 'center',
    position: 'relative',
    top: -15,
  },
  navCenterIcon: {
    backgroundColor: '#1ab0e5',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0px 4px 5px rgba(26, 176, 229, 0.3)',
    elevation: 5,
    marginBottom: 5,
  }
});
