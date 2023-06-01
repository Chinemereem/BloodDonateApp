import React from 'react';
import {StyleSheet} from 'react-native';

import {RegularText} from '../../../components';

import {hp} from '../../../utils';
import {Card} from 'react-native-paper';

import MapView from 'react-native-maps';
import {Marker} from 'react-native-maps';
import {useSelector} from 'react-redux';
import {Colors, FontFamily} from '../../../assets/fonts/util/commonStyle';

const styles = StyleSheet.create({
  textStyle: {
    textAlign: 'center',
    fontSize: hp(25),
    marginTop: hp(50),
    justifyContent: 'center',
    color: Colors.hexGreen,
    fontFamily: FontFamily.poppinsSemiBold,
  },
  mapStyle: {
    height: '78%',
    width: '92%',
    alignSelf: 'center',
    marginTop: '8%',

    zIndex: 20,
  },
  cardStyle: {
    alignSelf: 'center',

    backgroundColor: Colors.white,
    marginTop: hp(70),
    height: '85%',
    width: '97%',
    shadowOffset: {
      width: 0,
      height: hp(9),
    },
    shadowRadius: 34,

    shadowOpacity: 3,
    elevation: 0.3,
  },
});
const Location = ({title, country, lat, lng}) => {
  const tokyoRegion = {
    latitude: 6.5244,
    longitude: 3.3792,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  };
  const {data} = useSelector(state => state.auth);

  return (
    <Card style={styles.cardStyle}>
      <RegularText title={data?.country} style={styles.textStyle} />
      <MapView
        style={styles.mapStyle}
        region={{
          latitude: 6.5244,
          longitude: 3.3792,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}

        //onRegionChangeComplete runs when the user stops dragging MapView
      >
        <Marker coordinate={tokyoRegion} pinColor="red" />
        {/*marker to a nearby location */}
        <Marker
          coordinate={{
            latitude: 35.67714827145542,
            longitude: 139.6551462687416,
          }}
        />
      </MapView>
    </Card>
  );
};

export default Location;
