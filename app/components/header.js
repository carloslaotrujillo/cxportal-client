import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { router } from "expo-router";
import React from 'react'

export default function Header() {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => router.push('/home')}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    paddingHorizontal: 16,
    borderBottomWidth: 2,
    borderBottomColor: '#ccc',
    marginTop: 8,

  },
  backButtonText: {
    color: '#3182ce',
  },
})