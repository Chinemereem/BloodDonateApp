import React, {useEffect, useCallback, useState} from 'react';
import {
  SafeAreaView,
  Image,
  StyleSheet,
  Switch,
  ScrollView,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {auth} from '../../../../firebase';
import {useSelector} from 'react-redux';
import {userPng} from '../../../assets';
import {RegularText} from '../../../components';
import HeaderWithIcon from '../../../components/HeaderView';
import {hp, wp} from '../../../utils';
import {HStack} from '../../../components';
import {
  MapPinIcon,
  CallUserIcon,
  EventIcon,
  MailIcon,
  InfoLineIcon,
  SignOutIcon,
} from '../../../assets/Svg';
import {Colors} from '../../../assets/fonts/util/commonStyle';
import {ButtonWithIcon} from '../../../components/button';
import {Card} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import {logOut} from '../../../store/auth/authSlice';
import displayToast from '../../../components/DisplayToast';
import {useNavigation} from '@react-navigation/native';
import {FlexedView} from '../../../components/FlexedView';
import {launchImageLibrary} from 'react-native-image-picker';
import {uploadRequests, getUserData} from '../../../api/requestApi';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  image: {
    width: wp(90),
    height: hp(90),
    borderRadius: hp(20),
  },
  cardViewStyle: {
    backgroundColor: Colors.white,
    borderRadius: 0,
    width: '95%',
    marginTop: hp(10),
    marginLeft: hp(10),
    paddingVertical: hp(15),
  },
  margined: {
    marginTop: hp(60),
  },
  titleStyle: {textAlign: 'center', fontSize: hp(19), fontWeight: '600'},
  touchableStyle: {
    width: wp(90),
    height: hp(90),
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#EEEEEE',
    borderRadius: 20,
  },
});

const Profile = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [isEnabled, setIsEnabled] = useState(false);
  const {user, data} = useSelector(state => state.auth);
  const requests = data?.createRequests;
  const retrievedImage = data?.updateImageRequests;
  const displayName = user?.displayName;
  const uploadedImage = retrievedImage?.[0]?.image;

  const createdAt = user?.metadata?.creationTime;
  const [selectedImg, setSelectedImg] = useState();
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const [itemRetrieved, setItemRetrieved] = useState();
  const dataRetrieved = useCallback(retrieved => {
    setLoading(false);

    setItemRetrieved(retrieved);
  }, []);
  useEffect(() => {
    getUserData(dataRetrieved);
  }, [dataRetrieved]);
  let imageSource;
  if (selectedImg) {
    imageSource = selectedImg;
  } else if (uploadedImage) {
    imageSource = {uri: uploadedImage};
  } else {
    // Default image source
    imageSource = userPng;
  }

  const logoutUser = async () => {
    await dispatch(logOut());
    displayToast('Logged out successfully', 'success');
    // navigation.reset('Login');
    navigation.reset({
      index: 0,
      routes: [{name: 'Login'}],
    });
  };

  const options = {
    title: 'Select Image',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  const addComplete = request => {
    console.log(request);
  };

  // const uploadImage = async () => {
  //   setUploadImage(true);

  //   const response = await fetch(selectedImg.uri);
  //   const blob = await response.blob();
  //   const fileExtension = selectedImg.uri.split('.').pop();
  //   const uuid = uuidv4();
  //   const fileName = `${uuid}.${fileExtension}`;
  //   var ref = firebase
  //     .storage()
  //     .ref()
  //     .child(`requests/images/${fileName}`)
  //     .put(blob);
  //   try {
  //     await ref;

  //   } catch (e) {

  //   }
  //   setUploadImage(false);
  //   Alert.alert('Photo Uploaded Succesfully');
  // }; requested.length > 1

  useEffect(() => {
    auth.currentUser.updateProfile({photoURL: retrievedImage?.image});
  });
  const handelEdit = () => {
    if (selectedImg) {
      Alert.alert('Picture Exists', 'You have an Image uploaded already');
      setDisabled(true);
    } else if (!uploadedImage) {
      return showAlert();
    } else {
      Alert.alert('Picture Exists', 'You have an Image uploaded already');
      setDisabled(true);
    }
  };
  const showAlert = () => {
    Alert.alert('upload Picture', 'You can only upload your Image once', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Continue',
        onPress: () => {
          launchImage();
        },
      },
    ]);
  };

  const launchImage = () => {
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        // You can retrieve the selected image as a file path or base64-encoded string
        const imageUri = {uri: response.assets?.[0].uri};
        setSelectedImg(imageUri);
        uploadRequests({imageUri: response.assets?.[0].uri}, addComplete);
      }
    });
  };
  const handleButton = () => {
    if (requests?.length === 1) {
      Alert.alert(
        'Pending request',
        'You have a pending request, Please try again later',
      );
    } else {
      navigation.navigate('CreateRequest');
      setLoading(true);
      getUserData(dataRetrieved);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderWithIcon
        title={'Profile'}
        titleStyle={{fontSize: hp(21), left: 80, marginLeft: hp(30)}}
        iconStyle={{marginLeft: hp(20)}}
        rightIcon
        Edit={handelEdit}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{paddingBottom: hp(120)}}>
          <TouchableOpacity
            onPress={handelEdit}
            style={styles.touchableStyle}
            loading={loading}>
            <Image
              source={imageSource}
              resizeMode={'contain'}
              style={styles.image}
            />
          </TouchableOpacity>
          <RegularText
            title={displayName}
            style={{
              fontFamily: 'Roboto',
              marginTop: hp(10),
              textAlign: 'center',
            }}
          />

          <HStack style={{marginTop: hp(10), alignSelf: 'center'}}>
            <MapPinIcon />
            <RegularText
              title={data?.country}
              style={{
                fontSize: hp(18),
                marginLeft: hp(10),
                color: Colors.smook40,
              }}
            />
          </HStack>
          <HStack style={{marginTop: hp(40), alignSelf: 'center'}}>
            <ButtonWithIcon
              title={'Call Now'}
              icon={<CallUserIcon />}
              style={{backgroundColor: Colors.hexGreen}}
              onPress={() => {
                Alert.alert('Comming Soon!');
              }}
              loading={loading}
            />
            <ButtonWithIcon
              title={'Request'}
              icon={<CallUserIcon />}
              style={{marginLeft: hp(50)}}
              onPress={handleButton}
            />
          </HStack>
          <HStack style={{marginTop: hp(40), justifyContent: 'center'}}>
            <FlexedView
              text={data?.bloodType || data?.bloodGroup}
              title={'Blood Type'}
              style={{width: wp(95), height: hp(90)}}
              textStyle={styles.titleStyle}
            />
            <FlexedView
              text={'0'}
              title={'Donated'}
              style={{width: wp(95), height: hp(90)}}
              textStyle={styles.titleStyle}
            />
            <FlexedView
              text={'0'}
              title={'Requested'}
              textStyle={styles.titleStyle}
              style={{width: wp(95), height: hp(90)}}
            />
          </HStack>

          <Card style={[styles.cardViewStyle, , styles.margined]}>
            <HStack style={{justifyContent: 'space-around'}}>
              <EventIcon />
              <RegularText
                title={'Available for donate'}
                style={{fontFamily: 'Poppins', color: '#7C7C7C', right: 40}}
              />
              <Switch
                trackColor={{false: '#767577', true: '#FF2156'}}
                thumbColor={isEnabled ? '#FFFFFF' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
            </HStack>
          </Card>
          <Card style={styles.cardViewStyle}>
            <HStack
              style={{justifyContent: 'flex-start', marginLeft: hp(30)}}
              onPress={() => {
                navigation.navigate('InvitContacts');
              }}>
              <MailIcon />
              <RegularText
                title={'Invite a friend'}
                style={{fontFamily: 'Poppins', color: '#7C7C7C', left: 20}}
              />
            </HStack>
          </Card>
          <Card style={[styles.cardViewStyle]}>
            <HStack style={{justifyContent: 'flex-start', marginLeft: hp(30)}}>
              <InfoLineIcon />
              <RegularText
                title={'Get help'}
                style={{fontFamily: 'Poppins', color: '#7C7C7C', left: 20}}
              />
            </HStack>
          </Card>
          <Card
            style={[styles.cardViewStyle, styles.padding]}
            onPress={logoutUser}>
            <HStack style={{justifyContent: 'flex-start', marginLeft: hp(30)}}>
              <SignOutIcon />
              <RegularText
                title={'Sign out'}
                style={{fontFamily: 'Poppins', color: '#7C7C7C', left: 20}}
              />
            </HStack>
          </Card>

          <RegularText
            title={`Account created on: ${createdAt}`}
            style={{
              fontSize: hp(13),
              top: 20,
              fontWeight: 'bold',
              textAlign: 'center',
              color: Colors.HexRed,
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
