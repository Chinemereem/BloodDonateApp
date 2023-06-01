import React, {useState} from 'react';
import {SafeAreaView, Modal, View, Image, TouchableOpacity} from 'react-native';
import HeaderWithIcon from '../../../components/HeaderView';
import {hp} from '../../../utils';
import {RegularText} from '../../../components';
import {styles} from './styles';
import {
  PhoneCallIcon,
  NoteIcon,
  DropIcon,
  LocationIcon,
  HospitalIcon,
  ArrorRightIcon,
} from '../../../assets/Svg';
import {ButtonWithIcon} from '../../../components/button';
import {PanaPng} from '../../../assets';
import {useNavigation} from '@react-navigation/native';
import {SearchField} from '../../../components/Textfield';
import {createRequest, getUserData} from '../../../api/requestApi';
import KeyboardAvoidingView from 'react-native/Libraries/Components/Keyboard/KeyboardAvoidingView';
import {retrieveUserData} from '../../../store/auth/authSlice';
import {useDispatch, useSelector} from 'react-redux';

const CreateRequest = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [userCity, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [hospital, setHospital] = useState('');
  const [bGroup, setBGroup] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNote] = useState('');
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {data} = useSelector(state => state.auth);
  const hasPhone = data?.phone;
  // const getRequest = useGetRequests()
  console.log(data?.bloodGroup, 'ggg');
  const onAdded = request => {
    setLoading(false);

    setModalVisible(true);
  };
  const usedata = retrieved => {
    dispatch(retrieveUserData(retrieved));
    setLoading(false);
  };

  const handleBtn = () => {
    setLoading(true);
    setModalVisible(!modalVisible);
    getUserData(usedata);
    navigation.navigate('HomeView');
  };
  const handleCreateRequestBtn = () => {
    setLoading(true);
    createRequest(
      {
        city: userCity,
        hospital: hospital,
        bloodType: bGroup || data?.bloodGroup,
        mobile: phone || hasPhone,
        note: notes,
      },
      onAdded,
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <HeaderWithIcon
        title={'Create A Request'}
        titleStyle={{fontSize: hp(21), marginLeft: hp(30)}}
        iconStyle={{marginLeft: hp(20)}}
      />

      <View style={{justifyContent: 'center', marginTop: hp(60)}}>
        <KeyboardAvoidingView>
          <SearchField
            placeholder={'City'}
            style={styles.inputStyle}
            icon={<LocationIcon />}
            value={userCity}
            onChangeText={text => setCity(text)}
          />
          <SearchField
            placeholder={'Hospital'}
            style={styles.inputStyle}
            icon={<HospitalIcon />}
            value={hospital}
            onChangeText={text => setHospital(text)}
          />

          <SearchField
            placeholder={'Blood Type'}
            style={styles.inputStyle}
            icon={<DropIcon />}
            value={bGroup || data?.bloodGroup}
            editable={!data?.bloodGroup}
            onChangeText={text => setBGroup(text)}
          />
          <SearchField
            placeholder={'Mobile'}
            style={styles.inputStyle}
            icon={<PhoneCallIcon />}
            value={phone || hasPhone}
            onChangeText={text => setPhone(text)}
            editable={!hasPhone}
          />
          <SearchField
            placeholder={'Add a note'}
            style={[styles.inputStyle, styles.padding]}
            icon={<NoteIcon />}
            value={notes}
            onChangeText={text => setNote(text)}
          />

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              // Alert.alert('Modal has been closed.');
              setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Image
                  source={PanaPng}
                  resizeMode={'contain'}
                  style={styles.image}
                />
                <RegularText
                  style={styles.modalRegularText}
                  title={'Blood is successfully \n requested'}
                />
                <TouchableOpacity
                  onPress={handleBtn}
                  loading={loading}
                  style={styles.touchable}>
                  <ArrorRightIcon />
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </KeyboardAvoidingView>

        <ButtonWithIcon
          title={'Request'}
          style={{top: 50, marginTop: hp(40), alignSelf: 'center'}}
          onPress={handleCreateRequestBtn}
          loading={loading}
          // disabled={!hospital || !notes || !phone || !userCity || !bGroup}
        />
      </View>
    </SafeAreaView>
  );
};

export default CreateRequest;
