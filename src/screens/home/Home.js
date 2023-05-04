import React, {useRef, useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Pressable,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Alert,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {BlurView} from '@react-native-community/blur';
import {
  MenueIcon,
  SearchIcon,
  NotifyIcon,
  MojiIcon,
  SiglyphIcon,
  MakiDocIcon,
  VectIcon,
  CampaignIcon,
  BgIcon,
} from '../../assets/Svg';
import {FontFamily, Colors} from '../../assets/fonts/util/commonStyle';
import {auth} from '../../../firebase';

import {hp, wp} from '../../utils';
import {useNavigation} from '@react-navigation/native';
import {FlexedView} from '../../components/FlexedView';
import {HStack} from '../../components';
import {userdata} from './utils/UserData';
import {RegularText} from '../../components/Text';
import {RedText} from '../../components/Text';
import {Card} from 'react-native-paper';
import {getUser, retrieveUserData} from '../../store/auth/authSlice';
import {useReduxAction} from '../../utils/useReduxApi';
import EmptyItem from '../../components/EmptyCard';
import {
  setRequestedImage,
  getDonateUsers,
} from '../../store/auth/requestsSlice';
import {
  GetRequests,
  getImageRequests,
  getusers,
  getUserData,
  getRequest,
} from '../../api/requestApi';
import {Loader} from '../../components/Loader';

const Home = () => {
  const {handleAction} = useReduxAction();

  const dispatch = useDispatch();
  // const setRequested = UseGetRequests()
  const {data} = useSelector(state => state.auth);
  const requested = data?.createRequests;
  const navigation = useNavigation();
  const carouselRef = useRef(null);
  const viewConfig = {viewAreaCoveragePercentThreshold: 95};
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const onViewRef = useRef(({changed}) => {
    if (changed[0].isViewable) {
      setActiveIndex(changed[0].index);
    }
  });
  const onSet = retrieved => {
    dispatch(setRequestedImage(retrieved));
  };

  const usedata = retrieved => {
    dispatch(retrieveUserData(retrieved));
  };
  useEffect(() => {
    getImageRequests(onSet);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onRetrieved = retrieved => {
    dispatch(getDonateUsers(retrieved));
    setLoading(false);
  };

  useEffect(() => {
    handleAction(getUser);
    getUserData(usedata);
    GetRequests;
    getRequest();
    getusers(onRetrieved);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // returned data

  const Item = ({
    title,
    icon,
    nameText,
    time,
    titleStyle,
    style,
    hospital,
    city,
    bloodType,
  }) => {
    // const options = {
    //   hour: 'numeric',
    //   minute: 'numeric',
    //   second: 'numeric',
    //   hour12: true,
    // };
    // const currentTime = new Date().toLocaleTimeString('en-US', options);
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
          <RegularText
            style={[styles.iconTitle, titleStyle]}
            title={bloodType}
          />
          <BgIcon />
        </HStack>

        <RedText
          title={'Donates'}
          style={{
            textAlign: 'center',
            fontSize: 20,
          }}
        />
      </View>
    );
  };
  // Empty request

  return (
    <SafeAreaView style={{backgroundColor: '#FFFfff33'}}>
      <StatusBar
        animated={true}
        backgroundColor="white"
        barStyle="dark-content"
      />
      <View style={styles.viewStyle}>
        <MenueIcon style={styles.menuStyle} />

        <View style={styles.notify}>
          <NotifyIcon />
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <FlatList
            ref={ref => (carouselRef.current = ref)}
            data={userdata}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToAlignment="center"
            viewabilityConfig={viewConfig}
            onViewableItemsChanged={onViewRef.current}
            pagingEnabled={true}
            renderItem={({item, index}) => (
              <Pressable>
                <ImageBackground
                  source={item.image}
                  imageStyle={styles.ImageStyle}
                  style={[styles.imageDimention]}>
                  <View style={styles.ImageCountView}>
                    {/* <BlurView
                      blurType="light"
                      blurAmount={10}
                      style={[styles.imageBlurStyle]}
                    /> */}
                    <Text style={styles.textOnImgStyle}>
                      {activeIndex + 1}/{userdata.length}
                    </Text>
                  </View>
                </ImageBackground>
              </Pressable>
            )}
            keyExtractor={(item, index) => item + index}
          />
          <View style={styles.dotView}>
            {userdata.map(({}, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  activeIndex;
                }}
                style={[
                  styles.dotStyle,
                  {opacity: index === activeIndex ? 1 : 0.5},
                ]}
              />
            ))}
          </View>
          <HStack style={{marginTop: hp(20), alignSelf: 'center'}}>
            <FlexedView
              icon={<SearchIcon />}
              title="Find Donors"
              style={{width: wp(99), height: hp(90)}}
              onPress={() => navigation.navigate('FindDonnors')}
            />
            <FlexedView
              icon={<MojiIcon />}
              title="Donates"
              style={{
                width: wp(99),
                height: hp(95),
              }}
              onPress={() => {
                Alert.alert('Coming Soon');
              }}
            />
            <FlexedView
              icon={<SiglyphIcon />}
              title="Order Bloods"
              style={{
                width: wp(99),
                height: hp(90),
              }}
              onPress={() => {
                Alert.alert('Coming Soon');
              }}
            />
          </HStack>
          <HStack style={{marginTop: hp(20), alignSelf: 'center'}}>
            <FlexedView
              icon={<MakiDocIcon />}
              title="Assistant"
              style={{
                width: wp(99),
                height: hp(90),
              }}
              onPress={() => navigation.navigate('Assistant')}
            />
            <FlexedView
              icon={<VectIcon />}
              title="Report"
              style={{
                width: wp(99),
                height: hp(90),
              }}
              onPress={() => {
                navigation.navigate('Report');
              }}
            />
            <FlexedView
              icon={<CampaignIcon />}
              title="Campaign"
              style={{
                width: wp(95),
                height: hp(90),
              }}
              onPress={() => {
                Alert.alert('Coming Soon');
              }}
            />
          </HStack>
          <View>
            <Text
              style={{
                marginTop: hp(30),
                fontSize: hp(19),
                marginLeft: hp(20),
                fontFamily: 'OpenSans',
                color: 'black',
              }}>
              Donation Request
            </Text>

            {requested?.length === 1 ? (
              <Card style={styles.donationCard}>
                <FlatList
                  data={requested}
                  renderItem={({item}) => {
                    return (
                      <Item
                        title={item.city}
                        city={item.city}
                        icon={item.bg}
                        bloodType={item.bloodType}
                        hospital={item.hospital}
                        time={item.time}
                        nameText={item.text}
                      />
                    );
                  }}
                  keyExtractor={item => item.id}
                />
              </Card>
            ) : (
              <Card style={[styles.donationCard, {paddingBottom: hp(90)}]}>
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
          </View>
        </ScrollView>
      </View>

      {loading && <Loader />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  viewStyle: {
    marginTop: hp(10),
    paddingBottom: hp(90),
  },
  menuStyle: {
    position: 'relative',
    marginLeft: hp(20),
  },
  notify: {
    marginLeft: hp(25),
    position: 'absolute',
    left: '80%',
  },
  image: {
    width: '100%',
    height: hp(350),
    borderRadius: 10,
  },
  imageDimention: {
    width: Dimensions.get('window').width - 20,
    height: hp(180),
    marginTop: hp(50),

    alignSelf: 'center',
    justifyContent: 'center',
  },
  ImageStyle: {
    borderRadius: 10,
  },
  dotView: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 15,
    marginTop: hp(50),
  },
  dotStyle: {
    width: 9,
    height: 9,
    margin: 5,
    borderRadius: 30,
    backgroundColor: Colors.brightRed,
  },
  ImageCountView: {
    flex: 1,
    justifyContent: 'flex-end',
    bottom: 10,
  },
  textOnImgStyle: {
    alignSelf: 'flex-end',
    right: 59,
    bottom: 12,
    // marginTop: -30,
  },
  imageBlurStyle: {
    marginTop: 50,
    padding: 20,
    marginBottom: 10,
    borderRadius: 10,
    position: 'absolute',
    right: 50,
    overflow: 'hidden',
    alignSelf: 'flex-end',
  },
  title: {
    fontFamily: FontFamily.poppinsRegular,
    marginBottom: hp(20),
    fontSize: hp(21),
    color: '#272A2F',
  },

  iconTitle: {
    left: 33,
    top: 10,
    zIndex: 2,
    color: Colors.white,
    fontFamily: FontFamily.poppinsRegular,
    fontSize: hp(21),
  },
  stackViewStyle: {
    marginLeft: hp(15),
    marginTop: hp(25),
  },
  donationCard: {
    backgroundColor: Colors.white,
    width: '90%',
    marginLeft: hp(20),
    paddingVertical: hp(10),
    marginTop: hp(10),
    paddingBottom: hp(50),
  },
});
export default Home;
