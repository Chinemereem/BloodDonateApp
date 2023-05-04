import React from 'react';
import {View, SafeAreaView, Text, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const DonnorsDetails = ({route}) => {
  const {itemId} = route.params;
  const {otherParam} = route.params;
  const {title} = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>{title}</Text>
        <Text>itemId: {JSON.stringify(itemId)}</Text>
        <Text>otherParam: {JSON.stringify(otherParam)}</Text>
        <Text>oocgucu;ny902p8eu</Text>
      </View>
    </SafeAreaView>
  );
};

export default DonnorsDetails;
