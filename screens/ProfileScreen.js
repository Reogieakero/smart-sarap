import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// Importing Lucide icons for the profile card and dropdown
import { User, Edit, ChevronDown, LogOut } from 'lucide-react-native'; 

// --- Constants (Copied for consistency) ---
const DarkColors = {
  background: '#121212', 
  card: '#1F1F1F',      
  textPrimary: '#FFFFFF', 
  textSecondary: '#A9A9A9', 
  accentOrange: '#FF9500', 
  progressRed: '#FF4500',  // Used for the Logout button
  tabActive: '#333333',    
};

const ProfileScreen = ({ user = { name: 'Reogie Akero', role: 'Student' } }) => {
    // State for the alarm switch
    const [isAlarmEnabled, setIsAlarmEnabled] = React.useState(true);
    const toggleAlarmSwitch = () => setIsAlarmEnabled(previousState => !previousState);

    // Mock data for the dropdown (Time selection)
    const mockAlarmTime = '5 Minutes'; // Example value for the dropdown display

    // Function to handle logout (Placeholder)
    const handleLogout = () => {
        console.log('User logged out!');
        // In a real app, you would dispatch a logout action here.
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.titleText}>Profile</Text>
            </View>

            {/* Profile Card */}
            <View style={styles.profileCard}>
                <View style={styles.avatarContainer}>
                    <User size={50} color={DarkColors.textPrimary} />
                </View>
                
                <Text style={styles.userNameText}>{user.name}</Text>
                <Text style={styles.userRoleText}>{user.role}</Text>
                
                <TouchableOpacity style={styles.editButton}>
                    <Edit size={20} color={DarkColors.textPrimary} />
                </TouchableOpacity>
            </View>

            {/* --- Alarm Setting Section --- */}
            <View style={styles.settingsSection}>
                
                {/* Alarm Switch Row */}
                <View style={styles.settingRow}>
                    <Text style={styles.settingLabel}>Alarm</Text>
                    <Switch
                        trackColor={{ false: DarkColors.textSecondary, true: DarkColors.accentOrange }}
                        thumbColor={DarkColors.textPrimary}
                        ios_backgroundColor={DarkColors.textSecondary}
                        onValueChange={toggleAlarmSwitch}
                        value={isAlarmEnabled}
                    />
                </View>

                {/* Alarm Description Input (Placeholder) */}
                <View style={[styles.settingInputContainer, { opacity: isAlarmEnabled ? 1 : 0.5 }]}>
                    <Text style={styles.inputLabel}>Alarm before schedule/task</Text>
                </View>

                {/* Time Setting Input (Placeholder) */}
                <Text style={styles.settingLabel}>Time</Text>
                <TouchableOpacity 
                    style={[styles.settingInputContainer, styles.dropdownInput, { opacity: isAlarmEnabled ? 1 : 0.5 }]}
                    disabled={!isAlarmEnabled}
                >
                    <Text style={styles.dropdownText}>{mockAlarmTime}</Text>
                    <ChevronDown size={20} color={DarkColors.textPrimary} />
                </TouchableOpacity>
            </View>


            {/* Logout Button */}
            <View style={styles.logoutWrapper}>
                <TouchableOpacity 
                    style={styles.logoutButton}
                    onPress={handleLogout}
                >
                    {/* LogOut icon is optional, but adds context */}
                    <LogOut size={20} color={DarkColors.textPrimary} style={{ marginRight: 8 }} />
                    <Text style={styles.logoutButtonText}>Logout</Text>
                </TouchableOpacity>
            </View>

            {/* Note: The bottom navigation bar is typically outside this screen component */}

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
    
    // --- Header ---
    header: {
        justifyContent: 'flex-start',
        paddingTop: 10,
        marginBottom: 20,
    },
    titleText: {
        color: DarkColors.textPrimary,
        fontSize: 32,
        fontWeight: 'bold',
    },

    // --- Profile Card ---
    profileCard: {
        backgroundColor: DarkColors.card,
        borderRadius: 15,
        padding: 20,
        alignItems: 'center',
        marginBottom: 30,
        position: 'relative',
    },
    avatarContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: DarkColors.background, // Use background color for avatar circle
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    userNameText: {
        color: DarkColors.textPrimary,
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 5,
    },
    userRoleText: {
        color: DarkColors.textSecondary,
        fontSize: 14,
        marginBottom: 10,
    },
    editButton: {
        position: 'absolute',
        top: 15,
        right: 15,
        // The edit button in the image is small and subtle
        padding: 5, 
    },
    
    // --- Settings Section ---
    settingsSection: {
        flex: 1, // Allows the settings section to push the logout button to the bottom
    },
    settingRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    settingLabel: {
        color: DarkColors.textPrimary,
        fontSize: 16,
    },
    
    // Placeholder Input Styles
    settingInputContainer: {
        backgroundColor: DarkColors.card,
        borderRadius: 8,
        padding: 15,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: DarkColors.card, // Ensure dark card is visible
    },
    inputLabel: {
        color: DarkColors.textSecondary,
        fontSize: 14,
    },
    
    // Dropdown Specific Styles
    dropdownInput: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    dropdownText: {
        color: DarkColors.textPrimary,
        fontSize: 16,
    },

    // --- Logout Button ---
    logoutWrapper: {
        // Ensures button stays at the bottom above the nav (if nav is outside SafeAreaView)
        marginBottom: 20, 
    },
    logoutButton: {
        backgroundColor: DarkColors.progressRed, // Bright red for a warning/action button
        borderRadius: 10,
        padding: 15,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    logoutButtonText: {
        color: DarkColors.textPrimary,
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default ProfileScreen;