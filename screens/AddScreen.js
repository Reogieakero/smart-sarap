import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, Check, Calendar, Clock, GraduationCap, Briefcase, BookOpen, PhoneCall } from 'lucide-react-native'; 

// --- Constants (Copied for consistency) ---
const DarkColors = {
  background: '#121212', 
  card: '#1F1F1F',      
  textPrimary: '#FFFFFF', 
  textSecondary: '#A9A9A9', 
  accentOrange: '#FF9500', // Primary accent color
  progressRed: '#FF4500',  
  tabActive: '#333333',    
  purpleAccent: '#5F50A9', // A darker purple/indigo for the main button background
  greenAccent: '#4CAF50',
  blueAccent: '#00BFFF',
  yellowAccent: '#FFC72C',
};

// Mock data for categories and priorities
const categories = [
    { name: 'School', icon: GraduationCap, color: DarkColors.greenAccent },
    { name: 'Work', icon: Briefcase, color: DarkColors.blueAccent },
    { name: 'Class', icon: BookOpen, color: DarkColors.accentOrange },
    { name: 'Call', icon: PhoneCall, color: DarkColors.progressRed },
];

const priorities = [
    { name: 'Must Do', color: DarkColors.progressRed },
    { name: 'Routine', color: DarkColors.greenAccent },
    { name: 'ASAP', color: DarkColors.blueAccent },
    { name: 'Later', color: DarkColors.textSecondary },
];

const AddScreen = ({ navigation }) => {
    // State to toggle between Task and Schedule
    const [activeType, setActiveType] = useState('Task'); 
    // State for form fields
    const [taskTitle, setTaskTitle] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(categories[0].name);
    const [description, setDescription] = useState('');
    const [selectedPriority, setSelectedPriority] = useState(priorities[0].name);
    const [dueTime, setDueTime] = useState('10:00');
    const [dueDate, setDueDate] = useState('MM-DD-YY');
    const [location, setLocation] = useState('Anywhere, Home, School');


    // Helper component for category buttons
    const CategoryButton = ({ item }) => {
        const isActive = selectedCategory === item.name;
        return (
            <TouchableOpacity 
                style={[
                    styles.categoryButton, 
                    isActive && { backgroundColor: item.color }
                ]}
                onPress={() => setSelectedCategory(item.name)}
            >
                <item.icon size={24} color={isActive ? DarkColors.textPrimary : item.color} />
                <Text style={[styles.categoryText, { color: isActive ? DarkColors.textPrimary : DarkColors.textSecondary }]}>{item.name}</Text>
            </TouchableOpacity>
        );
    };

    // Helper component for priority chips
    const PriorityChip = ({ item }) => {
        const isActive = selectedPriority === item.name;
        return (
            <TouchableOpacity 
                style={[
                    styles.priorityChip,
                    { borderColor: isActive ? item.color : 'transparent' },
                    { backgroundColor: isActive ? item.color : DarkColors.card }
                ]}
                onPress={() => setSelectedPriority(item.name)}
            >
                <Text style={styles.priorityText}>{item.name}</Text>
            </TouchableOpacity>
        );
    };

    // Placeholder for adding task/schedule
    const handleAdd = () => {
        console.log(`Adding new ${activeType}: ${taskTitle}`);
        // In a real app, integrate with Firestore here.
        // navigation.goBack(); 
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Header Section */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation?.goBack()}>
                        <ChevronLeft size={28} color={DarkColors.textPrimary} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Add</Text>
                </View>

                {/* Subtitle/Instruction */}
                <Text style={styles.subtitle}>
                    Add your schedule or task to stay organized and on track.
                </Text>

                {/* Task/Schedule Segmented Control */}
                <View style={styles.segmentedControl}>
                    <TouchableOpacity 
                        style={[styles.segment, activeType === 'Task' && styles.segmentActive]}
                        onPress={() => setActiveType('Task')}
                    >
                        <Check size={20} color={activeType === 'Task' ? DarkColors.textPrimary : DarkColors.textSecondary} />
                        <Text style={[styles.segmentText, activeType === 'Task' && styles.segmentTextActive]}>Task</Text>
                        {activeType === 'Task' && <View style={styles.segmentUnderline} />}
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                        style={[styles.segment, activeType === 'Schedule' && styles.segmentActive]}
                        onPress={() => setActiveType('Schedule')}
                    >
                        <Calendar size={20} color={activeType === 'Schedule' ? DarkColors.textPrimary : DarkColors.textSecondary} />
                        <Text style={[styles.segmentText, activeType === 'Schedule' && styles.segmentTextActive]}>Schedule</Text>
                        {activeType === 'Schedule' && <View style={styles.segmentUnderline} />}
                    </TouchableOpacity>
                </View>

                {/* Form Fields */}

                {/* Task Title */}
                <Text style={styles.label}>Task title</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="Enter task title"
                    placeholderTextColor={DarkColors.textSecondary}
                    value={taskTitle}
                    onChangeText={setTaskTitle}
                />

                {/* Category Selection */}
                <Text style={styles.label}>Category</Text>
                <View style={styles.categoryContainer}>
                    {categories.map(item => (
                        <CategoryButton key={item.name} item={item} />
                    ))}
                </View>
                
                {/* Description */}
                <Text style={styles.label}>Description</Text>
                <TextInput
                    style={styles.textArea}
                    placeholder="Describe your schedule"
                    placeholderTextColor={DarkColors.textSecondary}
                    value={description}
                    onChangeText={setDescription}
                    multiline
                    textAlignVertical="top"
                />

                {/* Priority Selection */}
                <Text style={styles.label}>Priority</Text>
                <View style={styles.priorityContainer}>
                    {priorities.map(item => (
                        <PriorityChip key={item.name} item={item} />
                    ))}
                </View>
                
                {/* Due Time and Date */}
                <View style={styles.dateTimeContainer}>
                    <View style={styles.dateTimeInputGroup}>
                        <Text style={styles.label}>Due Time</Text>
                        <View style={styles.dateTimeWrapper}>
                            <Clock size={20} color={DarkColors.textSecondary} style={styles.iconInInput} />
                            <TextInput
                                style={[styles.textInput, styles.halfInput]}
                                placeholder="10:00"
                                placeholderTextColor={DarkColors.textSecondary}
                                value={dueTime}
                                onChangeText={setDueTime}
                            />
                            <Text style={styles.timeAMPM}>AM</Text>
                        </View>
                    </View>
                    
                    <View style={styles.dateTimeInputGroup}>
                        <Text style={styles.label}>Due Date</Text>
                        <View style={styles.dateTimeWrapper}>
                            <Calendar size={20} color={DarkColors.textSecondary} style={styles.iconInInput} />
                            <TextInput
                                style={[styles.textInput, styles.halfInput]}
                                placeholder="MM-DD-YY"
                                placeholderTextColor={DarkColors.textSecondary}
                                value={dueDate}
                                onChangeText={setDueDate}
                            />
                        </View>
                    </View>
                </View>

                {/* Location */}
                <Text style={styles.label}>Location</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="Anywhere, Home, School"
                    placeholderTextColor={DarkColors.textSecondary}
                    value={location}
                    onChangeText={setLocation}
                />
                
                {/* Submit Button */}
                <TouchableOpacity 
                    style={styles.addButton}
                    onPress={handleAdd}
                >
                    <Text style={styles.addButtonText}>Add {activeType}</Text>
                </TouchableOpacity>

            </ScrollView>
        </SafeAreaView>
    );
};

// --- Styles ---
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: DarkColors.background,
        paddingHorizontal: 20,
    },
    
    // --- Header ---
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 10,
        marginBottom: 10,
    },
    headerTitle: {
        color: DarkColors.textPrimary,
        fontSize: 30,
        fontWeight: 'bold',
        marginLeft: 20,
    },
    subtitle: {
        color: DarkColors.textSecondary,
        fontSize: 14,
        marginBottom: 20,
        lineHeight: 20,
    },

    // --- Segmented Control (Task/Schedule) ---
    segmentedControl: {
        flexDirection: 'row',
        backgroundColor: DarkColors.card,
        borderRadius: 10,
        marginBottom: 25,
        borderWidth: 1,
        borderColor: DarkColors.purpleAccent,
    },
    segment: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        paddingHorizontal: 10,
        position: 'relative',
    },
    segmentActive: {
        // No background change, only bottom underline
    },
    segmentText: {
        color: DarkColors.textSecondary,
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 8,
    },
    segmentTextActive: {
        color: DarkColors.textPrimary,
    },
    segmentUnderline: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 3,
        backgroundColor: DarkColors.accentOrange,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },

    // --- Form Elements ---
    label: {
        color: DarkColors.textPrimary,
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
    },
    textInput: {
        backgroundColor: DarkColors.card,
        color: DarkColors.textPrimary,
        borderRadius: 8,
        paddingHorizontal: 15,
        paddingVertical: 15,
        fontSize: 16,
        marginBottom: 20,
    },
    textArea: {
        backgroundColor: DarkColors.card,
        color: DarkColors.textPrimary,
        borderRadius: 8,
        paddingHorizontal: 15,
        paddingVertical: 15,
        fontSize: 16,
        height: 100, // Fixed height for description
        marginBottom: 20,
    },

    // --- Category Chips ---
    categoryContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 25,
    },
    categoryButton: {
        width: '23%', 
        backgroundColor: DarkColors.card,
        borderRadius: 10,
        paddingVertical: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    categoryText: {
        fontSize: 12,
        fontWeight: '600',
        marginTop: 5,
    },

    // --- Priority Chips ---
    priorityContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 25,
    },
    priorityChip: {
        backgroundColor: DarkColors.card,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 2,
    },
    priorityText: {
        color: DarkColors.textPrimary,
        fontSize: 14,
        fontWeight: '600',
    },

    // --- Date/Time Inputs ---
    dateTimeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    dateTimeInputGroup: {
        width: '48%', 
    },
    dateTimeWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
    },
    halfInput: {
        flex: 1,
        marginBottom: 0,
        paddingLeft: 45, // Make space for the icon
    },
    iconInInput: {
        position: 'absolute',
        left: 15,
        zIndex: 1,
    },
    timeAMPM: {
        position: 'absolute',
        right: 15,
        color: DarkColors.textSecondary,
        fontWeight: 'bold',
        fontSize: 16,
    },

    // --- Submit Button ---
    addButton: {
        backgroundColor: DarkColors.purpleAccent, // Use a distinct color for the final action button
        borderRadius: 10,
        padding: 18,
        alignItems: 'center',
        marginVertical: 30,
        shadowColor: DarkColors.purpleAccent,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 8,
        elevation: 10,
    },
    addButtonText: {
        color: DarkColors.textPrimary,
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default AddScreen;