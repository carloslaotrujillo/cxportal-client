import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Header from '../components/header';

const Card = ({ children }) => <View style={styles.cardContainer}>{children}</View>;

const CardHeader = ({ children }) => <View style={styles.cardHeader}>{children}</View>;

const CardTitle = ({ children }) => <Text style={styles.cardTitle}>{children}</Text>;

const CardContent = ({ children }) => <View style={styles.cardContent}>{children}</View>;

const TransportationInfoCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Transportation Info</CardTitle>
      </CardHeader>
      <CardContent>
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.label}>Mode</Text>
            <Text style={styles.value}>Bus</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.label}>Route</Text>
            <Text style={styles.value}>42</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.label}>Departure</Text>
            <Text style={styles.value}>9:15 AM</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.label}>Arrival</Text>
            <Text style={styles.value}>10:00 AM</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.label}>From</Text>
            <Text style={styles.value}>Main St Station</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.label}>To</Text>
            <Text style={styles.value}>Central Park</Text>
          </View>
        </View>
      </CardContent>
    </Card>
  );
};

const MapCard = () => (
  <View style={styles.mapCard}>
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: 40.7831,
        longitude: -73.9712,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      provider={MapView.PROVIDER_GOOGLE}
    >
      <Marker
        coordinate={{ latitude: 40.7831, longitude: -73.9712 }}
        title={"Central Park"}
        description={"Central Park, NY"}
      />
    </MapView>
  </View>
);

export default function Tracker() {
  return (
    <ScrollView style={styles.container}>
      <Header />
      <View style={styles.main}>
        <View style={styles.card}>
          <Text style={styles.title}>Trip Tracker</Text>
        </View>
        <MapCard />
        <TransportationInfoCard />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7fafc',
  },
  main: {
    flex: 1,
    padding: 16,
    alignContent: 'center',
    backgroundColor: '#f0f0f0',
  },
  card: {
    alignSelf: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginTop: 8,
    padding: 20,
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 3,
    padding: 16,
    margin: 16,
  },
  cardHeader: {
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardContent: {
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  column: {
    flex: 1,
    marginRight: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280', // equivalent to text-gray-500
  },
  value: {
    fontSize: 16,
    fontWeight: '500',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  mapCard: {
    alignSelf: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginTop: 8,
    padding: 20,
    width: '100%',
    maxWidth: 400,
    height: 300,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  map: {
    flex: 1,
    borderRadius: 10,
  },
});
