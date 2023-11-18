import React, {useState, useEffect, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  SafeAreaView,
  View,
  FlatList,
  Image,
  ScrollView,
  Platform,
} from 'react-native';
import {SearchField} from '../../../components/Textfield';
import {FilterIcon, MenuIcon} from '../../../assets/Svg';
import {Loader, LoaderOptions} from 'google-maps';
import HeaderWithIcon from '../../../components/HeaderView';
import {hp} from '../../../utils';
import {Colors} from '../../../assets/fonts/util/commonStyle';
import {Card} from 'react-native-paper';
// import {bloodGroupData} from './utils/UserData';
import {RegularText, HStack} from '../../../components';

import BottomSheet from '../../../components/BottomSheet';

import {styles} from '../styles';

import {getDonateUsers} from '../../../store/auth/requestsSlice';
import {getusers} from '../../../api/requestApi';
import DonnorsPopUp from './DonnorsPopup';

const Item = ({title, icon, country, locationIcon, image, city, onPress}) => {
  return (
    <Card style={styles.cardStyle} onPress={onPress}>
      {/* // Image/ name and icon grid */}
      <HStack
        style={{
          marginLeft: hp(10),
        }}>
        <Image
          source={{
            uri: image,
          }}
          style={styles.image}
        />
        <RegularText title={title} style={styles.title} />
      </HStack>
      {/* // country/ city and icon grid */}
      <HStack style={styles.hstack}>
        <Image
          source={{
            uri: locationIcon,
          }}
          style={styles.countryImageIcon}
        />
        <RegularText
          title={` ${country} ${city}`}
          style={{color: Colors.gray}}
        />
      </HStack>
      <View style={{alignSelf: 'flex-end', position: 'absolute', right: 10}}>
        <Image
          source={{
            uri: icon,
          }}
          style={styles.imageIcon}
        />
      </View>
      <View />
    </Card>
  );
};

const FindDonnors = ({sheetImg, refRBSheetTypeRef}) => {
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const {donateUsers} = useSelector(state => state.requests);

  const [masterDataSource, setMasterDataSource] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');

  const [search, setSearch] = useState('');
  const refRBSheet = useRef(null);
  // const navigation = useNavigation();

  const dispatch = useDispatch();
  const onSet = retrieved => {
    dispatch(getDonateUsers(retrieved));
  };
  useEffect(() => {
    getusers(onSet);
    setFilteredDataSource(donateUsers);
    setMasterDataSource(donateUsers);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const google = async () => await loader.load();
  // const map = new google.maps.Map(document.getElementById('map'), {
  //   center: {lat: -34.397, lng: 150.644},
  //   zoom: 8,
  // });

  // const handleBtn = item => {
  //   refRBSheet.current.open();
  //   // /* 1. Navigate to the Details route with params */

  const searchFilterFunction = text => {
    // Check if searched text is not blank
    if (text) {
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.data.name
          ? item.data.name.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });

      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderWithIcon
        title={'Find Donors'}
        titleStyle={{fontSize: hp(21), left: 60}}
        iconStyle={{marginLeft: hp(20)}}
      />

      <SearchField
        placeholder={'Search'}
        style={styles.inputStyle}
        icon={<MenuIcon />}
        leftIcon={<FilterIcon />}
        value={search}
        withLeftIcon
        onChangeText={text => searchFilterFunction(text)}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{marginTop: hp(5)}}>
          <FlatList
            data={filteredDataSource}
            renderItem={({item}) => {
              return (
                <Item
                  image={item.data.image}
                  icon={item.data.icon}
                  title={item.data.name}
                  nameText={item.text}
                  sheetImg={item.data.image}
                  locationIcon={item.data.locationIcon}
                  country={item.data.country}
                  city={item.data.city}
                  onPress={() => {
                    refRBSheet.current.open();
                    setSelectedUser(item);

                    navigation.navigate('DonnorsDetails', {
                      itemId: 86,
                      otherParam: item.data?.name,
                      title: item.data?.name,
                    });
                  }}
                />
              );
            }}
            keyExtractor={item => item.id}
          />
          {/* <BottomSheet
            height={610}
            openRef={refRBSheet}
            render={refRBSheetTypeRef}
            // closeOnDragDown={true}
            // closeOnPressMask={false}
            image={sheetImg}
            imgStyle={styles.imgStyle}
          /> */}
          <BottomSheet
            height={Platform.OS === 'ios' ? '660' : '600'}
            openRef={refRBSheet}
            render={
              <DonnorsPopUp
                title={selectedUser?.data?.name}
                country={selectedUser?.data?.country}
                city={selectedUser?.data?.city}
                refRBSheet={() => {
                  refRBSheet.current.close();
                }}
                type={selectedUser?.data?.type}
                bloodTitle={selectedUser?.title}
                times={selectedUser?.data?.times}
                time={selectedUser?.data?.timesTitle}
                locationIcon={selectedUser?.data?.locationIcon}
                lat={selectedUser?.data?.lat}
                lng={selectedUser?.data?.lng}
              />
            }
            // closeOnDragDown={true}
            // closeOnPressMask={false}
            image={selectedUser?.data?.image}
            imgStyle={styles.imgStyle}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FindDonnors;
