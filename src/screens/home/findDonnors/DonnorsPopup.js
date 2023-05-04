import React, {useEffect, useCallback, useState} from 'react';
import {View, Image, Platform, Alert} from 'react-native';
import MapView, {Polyline} from 'react-native-maps';
import {Marker} from 'react-native-maps';
import {
  HandIcon,
  DropIcon,
  CallUserIcon,
  RequestIcon,
} from '../../../assets/Svg';
import {hp} from '../../../utils';
import {Colors} from '../../../assets/fonts/util/commonStyle';
import {ButtonWithIcon} from '../../../components/button';
import {RegularText, RedText, HStack} from '../../../components';
import {getDirections} from '../utils/GetDirections';
import {styles} from '../styles';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {getUserData} from '../../../api/requestApi';

const DonnorsPopUp = ({
  time,
  title,
  type,
  bloodTitle,
  times,
  refRBSheet,
  country,
  city,
  locationIcon,
  lat,
  lng,
}) => {
  const {data} = useSelector(state => state.auth);
  const requests = data?.createRequests;
  const [itemRetrieved, setItemRetrieved] = useState();

  const dataRetrieved = useCallback(retrieved => {
    setItemRetrieved(retrieved);
  }, []);

  useEffect(() => {
    getUserData(dataRetrieved);
  }, [dataRetrieved]);

  const handleButton = () => {
    if (requests?.length === 1) {
      Alert.alert(
        'Pending request',
        'You have a pending request, Please try again later',
      );
    } else {
      refRBSheet();
      navigation.navigate('CreateRequest');
    }
  };
  const navigation = useNavigation();
  const tokyoRegion = {
    latitude: 35.6762,
    longitude: 139.6503,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  return (
    <View style={styles.dotView}>
      <View style={{top: 100}}>
        <RegularText title={title} style={styles.sheetText} />
        <HStack style={styles.locationStyle}>
          <Image
            source={{
              uri: locationIcon,
            }}
            style={[styles.countryImageIcon]}
          />
          <RegularText
            title={` ${country} ${city}`}
            style={[styles.sheetText, {color: Colors.smook40}]}
          />
        </HStack>
        <HStack style={{justifyContent: 'space-around'}}>
          <View>
            <HandIcon style={{left: 20}} />

            <RedText title={times} style={{marginTop: hp(20)}}>
              <RegularText title={` ${time}`} />
            </RedText>
          </View>
          <View>
            <DropIcon style={{left: 20}} />

            <RegularText
              title={`${type} - `}
              style={{marginTop: hp(20), textAlign: 'left'}}>
              <RedText title={bloodTitle} />
            </RegularText>
            {/* <RegularText style={styles.text}>
              Current latitude: {region.latitude}
            </RegularText> */}
          </View>
        </HStack>
        <HStack style={{marginTop: hp(5), alignSelf: 'center'}}>
          <ButtonWithIcon
            title={'Call Now'}
            icon={<CallUserIcon />}
            style={{backgroundColor: Colors.hexGreen}}
          />
          <ButtonWithIcon
            title={'Request'}
            icon={<RequestIcon />}
            style={{marginLeft: hp(70)}}
            onPress={handleButton}
          />
        </HStack>
      </View>
      <MapView
        style={{
          height: '38%',
          width: Platform.OS === 'ios' ? '92%' : '92%',
          alignSelf: 'center',
          marginTop: '28%',
          zIndex: 20,
        }}
        region={{
          latitude: lat,
          longitude: lng,
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
    </View>
  );
};
export default DonnorsPopUp;
