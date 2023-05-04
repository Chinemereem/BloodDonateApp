import {CountryPicker} from 'react-native-country-codes-picker';
import React, {useState} from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import {RegularText} from '../../../components';
const CountyApp = () => {
  const [show, setShow] = useState(false);
  const [countryCode, setCountryCode] = useState('');

  return (
    <View>
      <TouchableOpacity
        onPress={() => setShow(true)}
        style={{
          width: '80%',
          height: 60,
          backgroundColor: 'red',
          padding: 10,
        }}>
        {/* <Text
          style={{
            color: 'white',
            fontSize: 20,
          }}>
          {countryCode}
        </Text> */}
        <RegularText title={`${countryCode}`} />
      </TouchableOpacity>

      <CountryPicker
        show={show}
        // when picker button press you will get the country object with dial code
        pickerButtonOnPress={item => {
          setCountryCode(item.dial_code);
          setShow(false);
        }}
      />
    </View>
  );
};

export default CountyApp;
