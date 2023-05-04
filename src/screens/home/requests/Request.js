import React, {useEffect, useCallback, useState} from 'react';
import {View, FlatList, StyleSheet, SafeAreaView} from 'react-native';
import {Card} from 'react-native-paper';
import {HStack, RegularText} from '../../../components';
import {hp} from '../../../utils';
import HeaderWithIcon from '../../../components/HeaderView';
import {useSelector} from 'react-redux';
import {BgIcon} from '../../../assets/Svg';
import {FontFamily, Colors} from '../../../assets/fonts/util/commonStyle';
import EmptyItem from '../../../components/EmptyCard';
import {useNavigation} from '@react-navigation/native';
import {getUserData} from '../../../api/requestApi';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  stackViewStyle: {
    marginLeft: hp(15),
  },
  title: {
    fontFamily: FontFamily.poppinsRegular,
    marginBottom: hp(20),
    fontSize: hp(19),
    color: '#272A2F',
  },
  emptyTitle: {
    fontFamily: FontFamily.poppinsRegular,
    marginBottom: hp(5),
    marginLeft: hp(10),
    fontSize: hp(18),
    color: Colors.primary,
  },
  iconTitle: {
    left: 32,
    top: 10,
    zIndex: 2,
    color: Colors.white,
    fontFamily: FontFamily.poppinsRegular,
    fontSize: hp(21),
  },
});

const Item = ({titleStyle, hospital, city, bloodType}) => {
  return (
    <View style={styles.stackViewStyle}>
      <View>
        <RegularText
          style={styles.title}
          title={`Name
Steph`}
        />
        <RegularText
          style={[styles.title, titleStyle]}
          title={`Location
${city}`}
        />

        <RegularText
          style={[styles.title, titleStyle]}
          title={`Hospital
${hospital}`}
        />
      </View>

      <HStack style={{position: 'absolute', left: 250}}>
        <RegularText style={[styles.iconTitle, titleStyle]} title={bloodType} />
        <BgIcon />
      </HStack>
    </View>
  );
};

const Request = () => {
  const [itemRetrieved, setItemRetrieved] = useState();
  const {data} = useSelector(state => state.auth);
  const requests = data?.createRequests;
  const navigation = useNavigation();

  const dataRetrieved = useCallback(retrieved => {
    setItemRetrieved(retrieved);
  }, []);
  // const dataRetrieved = retrieved => {
  // };
  useEffect(() => {
    getUserData(dataRetrieved);
  }, [dataRetrieved]);

  return (
    <SafeAreaView style={styles.container}>
      <HeaderWithIcon
        title={'Donation Request'}
        titleStyle={{fontSize: hp(21), left: 60}}
        iconStyle={{marginLeft: hp(20)}}
      />
      {requests?.length === 1 ? (
        <Card
          style={{
            backgroundColor: Colors.white,
            width: '90%',
            marginLeft: hp(20),
            paddingVertical: hp(10),
            marginTop: hp(20),
          }}>
          <FlatList
            data={requests}
            renderItem={({item}) => (
              <Item
                title={item.city}
                city={item.city}
                icon={item.bg}
                bloodType={item.bloodType}
                hospital={item.hospital}
                time={item.time}
                nameText={item.text}
              />
            )}
            keyExtractor={item => item.id}
          />
        </Card>
      ) : (
        <Card
          style={{
            backgroundColor: Colors.white,
            width: '90%',
            marginLeft: hp(20),
            paddingVertical: hp(30),
            paddingBottom: hp(90),
            marginTop: hp(20),
          }}>
          <EmptyItem
            title={
              'No donation Request. Create a request to  see your requests'
            }
            btnTitile={'Create a request'}
            titleStyle={{textAlign: 'center'}}
            onPress={() => navigation.navigate('CreateRequest')}
          />
        </Card>
      )}
    </SafeAreaView>
  );
};

export default Request;
