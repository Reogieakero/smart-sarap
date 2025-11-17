import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TaskCard from '../components/TaskCard'; 

// --- Constants (Copied from HomeScreen.js for consistency) ---
const DarkColors = {
  background: '#121212', 
  card: '#1F1F1F',      
  textPrimary: '#FFFFFF', 
  textSecondary: '#A9A9A9', 
  accentOrange: '#FF9500', 
  progressRed: '#FF4500',  // Used for the 'Missed' indicator
  tabActive: '#333333',    
};

// --- Mock Data (Based on the Missed Screen screenshot) ---
const missedTasks = [
    // Note: The screenshot uses the same details repeatedly, so we'll simulate that for the list structure.
    // In a real app, these would be separate tasks that have passed their due time.
    { 
        id: 1, 
        tag: 'Design', 
        title: 'About the Design', 
        details: 'Team sync-up to finalize UI/UX flows and review the latest mockups.', 
        time: '09:00 AM - 10:30 AM', 
        status: 'Missed', // Custom status field to handle the red indicator
        location: 'Anywhere' 
    },
    { 
        id: 2, 
        tag: 'Design', 
        title: 'About the Design', 
        details: 'Team sync-up to finalize UI/UX flows and review the latest mockups.', 
        time: '09:00 AM - 10:30 AM', 
        status: 'Missed', 
        location: 'Anywhere' 
    },
    { 
        id: 3, 
        tag: 'Design', 
        title: 'About the Design', 
        details: 'Team sync-up to finalize UI/UX flows and review the latest mockups.', 
        time: '09:00 AM - 10:30 AM', 
        status: 'Missed', 
        location: 'Anywhere' 
    },
    { 
        id: 4, 
        tag: 'Design', 
        title: 'About the Design', 
        details: 'Team sync-up to finalize UI/UX flows and review the latest mockups.', 
        time: '09:00 AM - 10:30 AM', 
        status: 'Missed', 
        location: 'Anywhere' 
    },
    { 
        id: 5, 
        tag: 'Design', 
        title: 'About the Design', 
        details: 'Team sync-up to finalize UI/UX flows and review the latest mockups.', 
        time: '09:00 AM - 10:30 AM', 
        status: 'Missed', 
        location: 'Anywhere' 
    },
];

const MissedScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView 
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Header Section */}
                <View style={styles.header}>
                    <Text style={styles.titleText}>Missed</Text>
                </View>

                {/* Task List */}
                <View>
                    {missedTasks.map(task => (
                        <TaskCard 
                            key={task.id} 
                            {...task} 
                            // Prop to indicate missed status for specific TaskCard styling if needed
                            isMissed={true} 
                            // The location tag is red in the image, but we'll stick to DarkColors.progressRed for consistency
                            tagColor={DarkColors.progressRed} 
                            tagTextColor={DarkColors.textPrimary}
                        />
                    ))}
                </View>
                
            </ScrollView>
        </SafeAreaView>
    );
};

// --- Styles ---
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: DarkColors.background,
    },
    scrollContent: {
        paddingHorizontal: 15,
        paddingBottom: 20, 
    },
    
    // --- Header Styles ---
    header: {
        justifyContent: 'flex-start',
        paddingTop: 10,
        marginBottom: 20, // Add space below the title
    },
    titleText: {
        color: DarkColors.textPrimary,
        fontSize: 32, // Large font size matching the screenshot
        fontWeight: 'bold',
    },
});

export default MissedScreen;