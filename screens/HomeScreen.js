import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TaskCard from '../components/TaskCard'; 
import { Bell, Plus } from 'lucide-react-native'; 

const DarkColors = {
  background: '#121212', 
  card: '#1F1F1F',      
  textPrimary: '#FFFFFF', 
  textSecondary: '#A9A9A9', 
  accentOrange: '#FF9500', 
  progressRed: '#FF4500',  
  tabActive: '#333333',    
};

const getCurrentDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1; 
  const day = date.getDate();
  
  const pad = (num) => (num < 10 ? '0' + num : num);
  
  return `${pad(day)}-${pad(month)}-${year}`;
};

const tasks = [
    { id: 1, tag: 'Meeting', title: 'Onboarding Call', details: 'Meeting with client scheduled for 2:30 PM, review project updates and next steps.', time: '07:00 AM - 8:30 AM', remaining: '23m', location: 'Anywhere' },
    { id: 2, tag: 'Design', title: 'About the Design', details: 'Team sync-up to finalize UI/UX flows and review the latest mockups.', time: '09:00 AM - 10:30 AM', remaining: '1hr 3m', location: 'Anywhere' },
    { id: 3, tag: 'Class', title: 'Advanced Algorithms', details: 'Lecture on dynamic programming. Don\'t forget to submit Assignment 3.', time: '10:00 AM - 11:30 AM', remaining: '2hr 3m', location: 'Room 205' },
    { id: 4, tag: 'Meeting', title: 'Client Feedback', details: 'Review latest mockups with client.', time: '12:00 PM - 1:00 PM', remaining: '3hr 3m', location: 'Online' },
    { id: 5, tag: 'Design', title: 'Prototyping Session', details: 'Work on Figma prototypes for the new feature.', time: '1:00 PM - 3:00 PM', remaining: '5hr 3m', location: 'Studio' },
    { id: 6, tag: 'Class', title: 'Database Systems', details: 'Study for the mid-term exam on SQL.', time: '3:00 PM - 4:30 PM', remaining: '7hr 3m', location: 'Home' },
    { id: 7, tag: 'Meeting', title: 'Daily Standup', details: 'Brief check-in with the development team.', time: '4:30 PM - 4:45 PM', remaining: '8hr 3m', location: 'Anywhere' },
];

const HomeScreen = ({ user = { name: 'Reo Aki' }, navigation }) => {
  const userName = user.name;
  const initial = userName.split(' ').map(n => n[0]).join('');

  const [activeTab, setActiveTab] = React.useState('Upcoming');
  
  const currentDate = getCurrentDate();

  const handleAddPress = () => {
    navigation?.navigate('Add'); 
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.userInfo}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{initial}</Text>
            </View>
            <View>
              <Text style={styles.greetingText}>Hey,</Text>
              <Text style={styles.userNameText}>{userName}</Text>
            </View>
          </View>
          
          <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.addButtonPolished} onPress={handleAddPress}>
                  <Plus size={30} color={DarkColors.textPrimary} />
              </TouchableOpacity>
          </View>
        </View>

        <View style={styles.reportCard}>
          
          <View style={styles.reportHeader}>
            <Text style={styles.reportTitle}>Today's Report</Text>
          </View>

          <View style={styles.reportBody}>
            <Text style={styles.reportDateLarge}>{currentDate}</Text>
            
            <View style={styles.statsContainer}>
                <View style={styles.statRow}>
                    <Text style={styles.statLabel}>Schedule</Text>
                    <Text style={styles.statValue}>7</Text>
                </View>
                <View style={styles.statRow}>
                    <Text style={styles.statLabel}>Done</Text>
                    <Text style={[styles.statValue, { color: DarkColors.accentOrange }]}>23%</Text>
                </View>
            </View>
          </View>
          
          <View style={styles.reportFooter}>
              <Text style={styles.quote}>
                "Focus on being productive instead of busy." 
                <Text style={styles.quoteAuthor}>Tim Ferriss</Text>
              </Text>
          </View>
          
        </View>

        <View style={styles.tabsContainer}>
          {['All', 'Upcoming', 'Project', 'Complete'].map((tab) => (
            <TouchableOpacity 
              key={tab} 
              style={[styles.tabButton, activeTab === tab && styles.tabActive]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>{tab}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View>
          {tasks.map(task => (
            <TaskCard key={task.id} {...task} />
          ))}
        </View>
        
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DarkColors.background,
  },
  scrollContent: {
      paddingHorizontal: 15,
      paddingBottom: 20, 
  },
  
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: DarkColors.accentOrange, 
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  avatarText: {
    color: DarkColors.textPrimary,
    fontWeight: 'bold',
    fontSize: 16,
  },
  greetingText: {
    color: DarkColors.textSecondary,
    fontSize: 14,
    lineHeight: 16,
  },
  userNameText: {
    color: DarkColors.textPrimary,
    fontWeight: 'bold',
    fontSize: 18,
    lineHeight: 20,
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bellIcon: {
      marginRight: 15,
  },
  addButtonPolished: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: DarkColors.accentOrange, 
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: DarkColors.accentOrange,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5, 
  },
  
  reportCard: {
    backgroundColor: DarkColors.card,
    borderRadius: 15,
    padding: 18,
    marginTop: 20,
    marginBottom: 20,
  },
  reportHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-start', 
    marginBottom: 5,
  },
  reportTitle: {
    color: DarkColors.textPrimary,
    fontSize: 18,
    fontWeight: 'bold', 
  },
  reportBody: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  reportDateLarge: {
    color: DarkColors.textPrimary,
    fontSize: 32,
    fontWeight: 'bold',
  },
  statsContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 120, 
    marginBottom: 4,
  },
  statLabel: {
    color: DarkColors.textSecondary,
    fontSize: 16,
  },
  statValue: {
    color: DarkColors.textPrimary,
    fontSize: 18,
    fontWeight: 'bold',
  },
  reportFooter: {},
  quote: {
    color: DarkColors.textSecondary,
    fontSize: 14,
    marginTop: 15,
    lineHeight: 18,
  },
  quoteAuthor: {
      fontSize: 14,
  },

  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: DarkColors.background,
    marginBottom: 10,
    paddingVertical: 5,
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  tabActive: {
      borderBottomWidth: 2,
      borderBottomColor: DarkColors.accentOrange,
  },
  tabText: {
    color: DarkColors.textSecondary,
    fontSize: 16,
    fontWeight: '500',
  },
  tabTextActive: {
      color: DarkColors.textPrimary,
      fontWeight: 'bold',
  },
});

export default HomeScreen;