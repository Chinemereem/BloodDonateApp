import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {RegularText} from '../../../components';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const ProfileBtSheet = ({
  title,
  icon,
  image,
  onPress,
  render,
  route,
  navigation,
}) => {
  const {otherParam} = route.params;
  return (
    <View style={styles.container}>
      <RegularText title={title} />
      <Text>otherParam: {JSON.stringify(otherParam)}</Text>
    </View>
  );
};

export default ProfileBtSheet;
