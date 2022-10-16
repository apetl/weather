import React from 'react';
import { View, StyleSheet, TextInput, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const SearchComponent = () => {
  return (
    <View style={[styles.container]}>
      <TextInput
        placeholder='Search'
        style={styles.formField}
        placeholderTextColor={'#888888'}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 20,
    width: width - 40,
    left: 20,
    zIndex: 99,
    backgroundColor: 'white'
  },
  formField: {
    borderWidth: 2,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 30,
    borderColor: 'rgba(128, 128, 128, 0.5)',
    color: 'rgba(128, 128, 128, 0.5)',
    fontSize: 18,
    height: 35
  }
})

export default SearchComponent;