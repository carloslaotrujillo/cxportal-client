import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Image, ScrollView, StyleSheet, Alert, Platform, Linking } from 'react-native';
import Header from '../components/header';
import * as ImagePicker from 'expo-image-picker';

export default function Component() {
  const [profileVisibility, setProfileVisibility] = useState('public');
  const [isPickerVisible, setPickerVisible] = useState(false);
  const visibilityOptions = ['Public', 'Private', 'Followers Only'];
  const [gender, setGender] = useState('Male');
  const [imageUri, setImageUri] = useState(null);

  const handlePickerChange = (value) => {
    setProfileVisibility(value);
    setPickerVisible(false);
  };

  const handleImagePick = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permission required',
        'Media library access is required to select a profile picture. Please enable it in the app settings.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Open Settings', onPress: () => Linking.openSettings() }
        ]
      );
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.uri);
    }
  };

  const handleCameraLaunch = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permission required',
        'Camera access is required to take a profile picture. Please enable it in the app settings.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Open Settings', onPress: () => Linking.openSettings() }
        ]
      );
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.uri);
    }
  };

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView style={styles.main}>
        <View style={styles.content}>
          <Text style={styles.heading}>Profile Settings</Text>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Profile</Text>
            <View style={styles.cardContent}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Profile Picture</Text>
                <View style={styles.profilePicContainer}>
                  {imageUri ? (
                    <Image
                      source={{ uri: imageUri }}
                      style={styles.avatar}
                    />
                  ) : (
                    <Image
                      source={gender === 'Male' ? require('../../assets/user-male.png') : require('../../assets/user-female.png')}
                      style={styles.avatar}
                    />
                  )}
                  <TouchableOpacity style={styles.changeButton} onPress={handleImagePick}><Text>Change</Text></TouchableOpacity>
                  {(Platform.OS === 'ios' || Platform.OS === 'android') && (
                    <TouchableOpacity style={styles.changeButton} onPress={handleCameraLaunch}><Text>Take Photo</Text></TouchableOpacity>
                  )}
                </View>
              </View>
              <TouchableOpacity style={styles.saveButton}><Text>Save</Text></TouchableOpacity>
            </View>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Account</Text>
            <View style={styles.cardContent}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Password</Text>
                <TextInput style={styles.input} placeholder="Enter your password" secureTextEntry />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>New Password</Text>
                <TextInput style={styles.input} placeholder="Enter a new password" secureTextEntry />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Confirm Password</Text>
                <TextInput style={styles.input} placeholder="Confirm your new password" secureTextEntry />
              </View>
              <TouchableOpacity style={styles.saveButton}><Text>Save</Text></TouchableOpacity>
            </View>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Delete Account</Text>
            <View style={styles.cardContent}>
              <View style={styles.settingItem}>
                <View>
                  <Text style={styles.settingDescription}>Permanently delete your{'\n'}account and all your data.</Text>
                </View>
                <TouchableOpacity style={styles.destructiveButton}><Text>Delete</Text></TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  srOnly: {
    position: 'absolute',
    width: 1,
    height: 1,
    margin: -1,
    padding: 0,
    overflow: 'hidden',
    clip: 'rect(0, 0, 0, 0)',
    border: 0,
  },
  nav: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 8,
    flex: 1,
  },
  navLink: {
    color: '#555',
  },
  bold: {
    fontWeight: 'bold',
  },
  avatarButton: {
    marginLeft: 'auto',
  },
  main: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  content: {
    maxWidth: 800,
    width: '100%',
    alignSelf: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  cardContent: {
    paddingBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 4,
    fontSize: 14,
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
  },
  profilePicContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  changeButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginLeft: 16,
  },
  saveButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: '#007bff',
    borderRadius: 4,
    alignSelf: 'flex-end',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  fontMedium: {
    fontSize: 16,
    fontWeight: '500',
  },
  settingDescription: {
    fontSize: 14,
    color: '#666',
  },
  pickerButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    margin: 20,
    alignItems: 'center',
  },
  modalItem: {
    padding: 10,
  },
  closeButton: {
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 4,
    marginTop: 20,
  },
  destructiveButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: '#dc3545',
    borderRadius: 4,
  },
  avatar: {
    width: 55,
    height: 55,
    borderRadius: 24,
  },
});
