import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TaskCard from '../components/TaskCard'; 
// Importing Lucide icons for the header/tabs
import { Plus, CalendarCheck, CheckCircle } from 'lucide-react-native'; 

// --- Constants (Copied from HomeScreen.js for consistency) ---
const DarkColors = {
  background: '#121212', 
  card: '#1F1F1F',      
  textPrimary: '#FFFFFF', 
  textSecondary: '#A9A9A9', 
  accentOrange: '#FF9500', // Used for highlighting elements
  progressRed: '#FF4500',  
  tabActive: '#333333',    
};

// --- Utility Function to get Current Day Name (e.g., MON, TUE) ---
const getCurrentDayName = () => {
    const date = new Date();
    const options = { weekday: 'short' }; 
    const dayName = date.toLocaleDateString('en-US', options);
    return dayName.toUpperCase();
};

// --- Mock Data (Unchanged) ---
const plannerTasks = [
    { 
        id: 1, 
        tag: 'Meeting', 
        title: 'Client Onboarding Call', 
        details: 'Review project scope and set up initial communication channels.', 
        time: '09:00 AM - 10:00 AM', 
        remaining: '02m', 
        location: 'Anywhere' 
    },
    { 
        id: 2, 
        tag: 'Class', 
        title: 'Advanced Algorithms', 
        details: 'Lecture on graph theory. Don\'t forget pre-reading.', 
        time: '10:00 AM - 11:30 AM', 
        remaining: '56m', 
        location: 'Room 205' 
    },
    { 
        id: 3, 
        tag: 'Class', 
        title: 'Integration System', 
        details: 'Lecture on graph theory. Don\'t forget pre-reading.', 
        time: '11:30 AM - 12:30 AM', 
        remaining: '1hr 34m', 
        location: 'Room 104' 
    },
    { 
        id: 4, 
        tag: 'Design', 
        title: 'Prototyping Review', 
        details: 'Review session for the new feature prototypes with the design team.', 
        time: '01:30 PM - 03:00 PM', 
        remaining: '3hr 34m', 
        location: 'Studio' 
    },
];

// NOTE: Added 'navigation' prop
const PlannerScreen = ({ navigation }) => {
    const [activeView, setActiveView] = React.useState('Schedule'); 
    const currentDayName = getCurrentDayName(); 

    // Handler for Add button press
    const handleAddPress = () => {
        // Navigate to the new AddScreen
        navigation?.navigate('Add'); 
    }

    // Helper component for the view selection tabs
    const ViewTab = ({ icon: Icon, text, viewName }) => (
        <TouchableOpacity 
            style={styles.viewTab} 
            onPress={() => setActiveView(viewName)}
        >
            {Icon && <Icon size={20} color={activeView === viewName ? DarkColors.textPrimary : DarkColors.textSecondary} />}
            <Text 
                style={[
                    styles.viewTabText, 
                    activeView === viewName && styles.viewTabTextActive
                ]}
            >
                {text}
            </Text>
            {/* The orange underline effect */}
            {activeView === viewName && <View style={styles.tabUnderline} />}
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            {/* Header Section (Optimized for button visibility) */}
            <View style={styles.header}>
                {/* Text container now has flexGrow: 1 and a small right margin */}
                <View style={styles.headerTextContainer}> 
                    <Text style={styles.titleText}>Daily Planner</Text>
                </View>
                
                {/* Add Button (Polished) */}
                <TouchableOpacity style={styles.addButtonPolished} onPress={handleAddPress}>
                    <Plus size={30} color={DarkColors.textPrimary} />
                </TouchableOpacity>
            </View>

            {/* Schedule/Tasks Tabs */}
            <View style={styles.viewTabsContainer}>
                <ViewTab icon={CalendarCheck} text="Schedule" viewName="Schedule" />
                <ViewTab icon={CheckCircle} text="Tasks" viewName="Tasks" />
            </View>
            
            {/* Quick Stats/Indicators Card */}
            <View style={styles.statsCard}>
                <View style={styles.statItem}>
                    <Text style={[styles.statValue, { color: DarkColors.progressRed }]}>2</Text>
                    <Text style={styles.statLabel}>Urgent Tasks</Text>
                </View>
                <View style={styles.statItem}>
                    <Text style={[styles.statValue, { color: DarkColors.accentOrange }]}>3</Text>
                    <Text style={styles.statLabel}>Classes Today</Text>
                </View>
                {/* Dynamic Day Indicator */}
                <View style={styles.dayIndicator}>
                    <Text style={styles.dayText}>{currentDayName}</Text>
                </View>
            </View>


            {/* Task List - Uses ScrollView for content scrolling */}
            <ScrollView 
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Conditionally render content based on activeView */}
                {activeView === 'Schedule' ? (
                    plannerTasks.map(task => (
                        <TaskCard key={task.id} {...task} />
                    ))
                ) : (
                    <View style={styles.emptyTasks}>
                        <Text style={styles.emptyText}>No immediate tasks to display in this view.</Text>
                        <Text style={styles.emptyTextSecondary}>Check back after you've categorized your tasks!</Text>
                    </View>
                )}

            </ScrollView>
        </SafeAreaView>
    );
};

// --- Styles ---
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: DarkColors.background,
        paddingHorizontal: 15,
    },
    scrollContent: {
        paddingBottom: 20, 
    },
    
    // --- Header Styles ---
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 15,
        marginBottom: 10,
    },
    // NEW: Container for the text to allow the button to take priority space
    headerTextContainer: {
        flexGrow: 1, // Allows text to take up available space
        marginRight: 15, // Adds guaranteed space between text and button
    },
    titleText: {
        color: DarkColors.textPrimary,
        fontSize: 28,
        fontWeight: 'bold',
    },
    subtitleText: {
        color: DarkColors.textSecondary,
        fontSize: 14,
        marginTop: 2,
    },
    // Polished Add Button Style
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

    // --- View Tabs Styles (Unchanged) ---
    viewTabsContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: 20,
    },
    viewTab: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginRight: 20,
        position: 'relative', 
    },
    viewTabText: {
        color: DarkColors.textSecondary,
        fontSize: 16,
        fontWeight: '500',
        marginLeft: 5,
    },
    viewTabTextActive: {
        color: DarkColors.textPrimary,
        fontWeight: 'bold',
    },
    tabUnderline: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 3,
        backgroundColor: DarkColors.accentOrange,
        borderRadius: 2,
    },

    // --- Quick Stats Card Styles (Unchanged) ---
    statsCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: DarkColors.card,
        borderRadius: 15,
        padding: 20,
        marginBottom: 20,
    },
    statItem: {
        alignItems: 'flex-start',
        flex: 1,
    },
    statValue: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 2,
    },
    statLabel: {
        color: DarkColors.textSecondary,
        fontSize: 14,
    },
    dayIndicator: {
        width: 65,
        height: 65,
        borderRadius: 12,
        backgroundColor: '#4CAF50', 
        justifyContent: 'center',
        alignItems: 'center',
    },
    dayText: {
        color: DarkColors.textPrimary,
        fontSize: 22,
        fontWeight: 'bold',
    },
    
    // --- Empty State Styles (Unchanged) ---
    emptyTasks: {
        paddingVertical: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyText: {
        color: DarkColors.textPrimary,
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 5,
    },
    emptyTextSecondary: {
        color: DarkColors.textSecondary,
        fontSize: 14,
    }
});

export default PlannerScreen;