import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
// Importing specific Lucide icons
import { Globe, GraduationCap, Clock } from 'lucide-react-native'; 

// --- Constants ---
const DarkColors = {
  card: '#1F1F1F',
  textPrimary: '#FFFFFF',
  textSecondary: '#A9A9A9',
  accentOrange: '#FF9500',
  // Specific colors matching the tags in your design
  tagMeeting: '#FFC0CB', 
  tagDesign: '#ADD8E6',   
  tagClass: '#90EE90',    
  remainingTime: '#FF4500', 
};

// --- Helper function to get the tag style ---
const getTagStyle = (tag) => {
  switch (tag) {
    case 'Meeting':
      return { backgroundColor: DarkColors.tagMeeting, color: DarkColors.card };
    case 'Design':
      return { backgroundColor: DarkColors.tagDesign, color: DarkColors.card };
    case 'Class':
      return { backgroundColor: DarkColors.tagClass, color: DarkColors.card };
    default:
      return { backgroundColor: DarkColors.textSecondary, color: DarkColors.textPrimary };
  }
};

const TaskCard = ({ tag, title, details, time, remaining, location }) => {
  const tagStyle = getTagStyle(tag);

  const LocationIconComponent = tag === 'Meeting' || tag === 'Design' 
    ? Globe
    : GraduationCap;

  return (
    <View style={styles.card}>
      {/* Top Row: Tag and Location */}
      <View style={styles.topRow}>
        <View style={[styles.tagBadge, { backgroundColor: tagStyle.backgroundColor }]}>
          <Text style={[styles.tagText, { color: tagStyle.color }]}>
            {tag}
          </Text>
        </View>
        <View style={styles.locationContainer}>
          <LocationIconComponent size={16} color={DarkColors.accentOrange} style={styles.locationIcon} />
          <Text style={styles.locationText}>
            {tag === 'Meeting' || tag === 'Design' ? 'Anywhere' : location}
          </Text>
        </View>
      </View>

      {/* Main Details */}
      <Text style={styles.titleText}>{title}</Text>
      <Text style={styles.detailsText}>{details}</Text>

      {/* Bottom Row: Time and Remaining Timer */}
      <View style={styles.timeRow}>
        <View style={styles.timeDetail}>
            {/* Decreasing Clock icon size slightly to match new font size */}
            <Clock size={14} color={DarkColors.textSecondary} style={styles.timeIcon} /> 
            <Text style={styles.timeText}>{time}</Text>
        </View>
        <Text style={styles.remainingText}>Remaining Time: {remaining}</Text>
      </View>
    </View>
  );
};

// --- Styles ---
const styles = StyleSheet.create({
  card: {
    backgroundColor: DarkColors.card,
    borderRadius: 15,
    padding: 18,
    marginBottom: 15,
    elevation: 3, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  tagBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  tagText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIcon: {
    marginRight: 4,
  },
  locationText: {
    color: DarkColors.accentOrange,
    fontWeight: 'bold',
    fontSize: 14,
  },
  titleText: {
    color: DarkColors.textPrimary,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  detailsText: {
    color: DarkColors.textSecondary,
    fontSize: 14,
    marginBottom: 15,
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeDetail: {
      flexDirection: 'row',
      alignItems: 'center',
  },
  timeIcon: {
      marginRight: 4,
  },
  timeText: {
    color: DarkColors.textSecondary,
    // --- ADJUSTED FONT SIZE ---
    fontSize: 12, 
  },
  remainingText: {
    color: DarkColors.remainingTime,
    fontWeight: 'bold',
    // --- ADJUSTED FONT SIZE ---
    fontSize: 12, 
  },
});

export default TaskCard;