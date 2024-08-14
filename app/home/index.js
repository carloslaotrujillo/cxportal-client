import { router } from 'expo-router'
import React, { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, Modal, Platform } from 'react-native';

export default function Component() {
  const [name, setName] = useState('John Doe');
  const [age, setAge] = useState(45);
  const [weight, setWeight] = useState(210);
  const [height, setHeight] = useState('5\'10"');
  const [dob, setDob] = useState('08/11/1994');
  const [gender, setGender] = useState('Male');
  const [departure, setDeparture] = useState('Atrium Health Carolinas Medical Center');
  const [departureAddress, setDepartureAddress] = useState('1000 Blythe Blvd, Charlotte, NC 28203');
  const [arrival, setArrival] = useState('Wise Health System - Inpatient Rehabilitation');
  const [arrivalAddress, setArrivalAddress] = useState('2000 South FM 51 IPR #103, Decatur, TX, 76234');
  const [distance, setDistance] = useState(1089.5);
  const [passengers, setPassengers] = useState(["Jane Doe", "Rick Smith"]);

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          {(gender === 'Male') ? (
            <Image
              source={require('../../assets/user-male.png')}
              style={styles.avatar}
              alt="Patient Avatar"
            />
          ) : (
            <Image
              source={require('../../assets/user-female.png')}
              style={styles.avatar}
              alt="Patient Avatar"
            />
          )}
          <View>
            <Text style={styles.patientName}>{name}</Text>
            <Text style={styles.patientDetails}>DOB: {dob}</Text>
            <Text style={styles.patientDetails}>Age: {age} | Gender: {gender}</Text>
            <Text style={styles.patientDetails}>Weight: {weight} | Height: {height}</Text>
          </View>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconButton} onPress={() => setModalVisible(true)}>
            <Feather name="menu" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Modal for hamburger menu */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Feather name="x" size={24} color="white" />
            </TouchableOpacity>
            <View style={styles.modalMenu} >
              <TouchableOpacity style={styles.modalButton} onPress={() => { router.push('/checklist'); }}>
                <Feather name="check-square" size={24} color="white" />
                <Text style={styles.modalButtonText}>Trip Checklist</Text>
              </TouchableOpacity>

              {(Platform.OS === 'ios' || Platform.OS === 'android') && (
                <TouchableOpacity style={styles.modalButton} onPress={() => { router.push('/tracker'); }}>
                  <Feather name="map-pin" size={24} color="white" />
                  <Text style={styles.modalButtonText}>Trip Tracker</Text>
                </TouchableOpacity>
              )}

            </View>
            <View style={styles.modalFooter} >
              <TouchableOpacity style={styles.modalFooterButton} onPress={() => { router.push('/settings'); }}>
                <Feather name="settings" size={24} color="white" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalFooterButton} onPress={() => { router.push('/'); }}>
                <Feather name="log-out" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Transport Information</Text>
        <View style={styles.grid}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Departure</Text>
            <Text style={styles.cardValue}>{departure} {'\n'}</Text>
            <Text style={styles.cardValue}>{departureAddress}</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Arrival</Text>
            <Text style={styles.cardValue}>{arrival} {'\n'}</Text>
            <Text style={styles.cardValue}>{arrivalAddress}</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Distance</Text>
            <Text style={styles.cardValue}>{distance} miles</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Passengers</Text>
            <Text style={styles.cardValue}>{passengers.join(', ')}</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Patient Information</Text>
        <View style={styles.grid}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Hemoglobin</Text>
            <Text style={styles.cardValue}>14.2 g/dL</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Cholesterol</Text>
            <Text style={styles.cardValue}>180 mg/dL</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Glucose</Text>
            <Text style={styles.cardValue}>98 mg/dL</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>White Blood Cells</Text>
            <Text style={styles.cardValue}>7.2 x 10^9/L</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Platelet Count</Text>
            <Text style={styles.cardValue}>250 x 10^9/L</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Creatinine</Text>
            <Text style={styles.cardValue}>0.9 mg/dL</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f3f4f6',
    padding: 16,
    maxWidth: 800,
    marginHorizontal: 'auto',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 55,
    height: 55,
    borderRadius: 24,
    marginRight: 12,
  },
  patientName: {
    fontSize: 18,
    fontWeight: '500',
  },
  patientDetails: {
    fontSize: 12,
    color: '#6b7280',
  },
  headerRight: {
    flexDirection: 'row',
  },
  iconButton: {
    marginHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#f3f4f6',
    padding: 15,
    borderRadius: 8,
    width: '48%',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  cardValue: {
    fontSize: 10,
    fontWeight: '500',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: '80%',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    maxWidth: 300,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalMenu: {
    flexDirection: 'column',
    marginTop: 30,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalFooter: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginTop: 100,
    backgroundColor: 'white',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 15,
    paddingRight: 15,
    alignItems: 'center',
    borderRadius: 10,
    shadowColor: '#000',
    maxWidth: 300,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.75,
  },
  closeButton: {
    top: 10,
    right: 10,
    padding: 10,
    borderRadius: 50,
    position: 'absolute',
    backgroundColor: 'black',
  },
  modalButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 12,
    backgroundColor: 'black',
    padding: 12,
    borderRadius: 8,
    width: '80%',
  },
  modalFooterButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 12,
    marginHorizontal: 10,
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 8,
  },
  modalButtonText: {
    marginLeft: 10,
    fontSize: 18,
    color: 'white',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 20,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});