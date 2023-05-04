import React, {useEffect, useState} from 'react';
import {
  View,
  Alert,
  Platform,
  PermissionsAndroid,
  FlatList,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Modal,
} from 'react-native';
import ListItem from '../../../components/ListItem';
import {
  PhoneCallIcon,
  MenuIcon,
  FilterIcon,
  ArrorRightIcon,
} from '../../../assets/Svg';
import Contacts, {Contact} from 'react-native-contacts';
import {hp} from '../../../utils';
import Colors from '../../../components/Colors';
import {SearchField} from '../../../components/Textfield';
import {RegularText} from '../../../components';
import HeaderWithIcon from '../../../components/HeaderView';
import Button from '../../../components/button';
import {PanaPng} from '../../../assets';
import {useNavigation} from '@react-navigation/native';
import {styles} from '../requests/styles';
import displayToast from '../../../components/DisplayToast';

const InvitContacts = () => {
  const [userContacts, setContacts] = useState([]);
  const [clicked, setClicked] = useState();

  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    if (Platform.OS) {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
        title: 'Contacts',
        message: 'This app would like to view your contacts.',
        buttonPositive: 'Please accept bare mortal',
      })
        .then(res => {
          if (res === 'never_ask_again') {
            return Alert.alert('Permision canceled');
          }
          Contacts.getAll()
            .then(contacts => {
              setContacts(contacts);
              return;
            })

            .catch(e => {
              console.log(e);
              return;
            });
        })
        .catch(error => {
          displayToast('Permission error: ', error);
        });
    }
  }, []);
  const handleBtn = () => {
    setModalVisible(!modalVisible);
    navigation.navigate('HomeView');
  };

  //   const searchFilterFunction = text => {
  //     if (text) {
  //       const newData = masterDataSource.filter(function (item) {
  //         const itemData = item.title
  //           ? item.title.toUpperCase()
  //           : ''.toUpperCase();
  //         const textData = text.toUpperCase();
  //         return itemData.indexOf(textData) > -1;
  //       });
  //       setFilteredDataSource(newData);
  //       setSearch(text);
  //     } else {
  //       setFilteredDataSource(masterDataSource);
  //       setSearch(text);
  //     }
  //   };
  const searchFilterFunction = text => {
    const phoneNumberRegex =
      /\b[\+]?[(]?[0-9]{2,6}[)]?[-\s\.]?[-\s\/\.0-9]{3,15}\b/m;
    if (text === '' || text === null) {
    } else if (phoneNumberRegex.test(text)) {
      Contacts.getContactsByPhoneNumber(text).then(contacts => {
        contacts.sort((a, b) => {
          return a.givenName.toLowerCase() > b.givenName.toLowerCase();
        });
        setContacts(contacts);
      });
    } else {
      Contacts.getContactsMatchingString(text).then(contacts => {
        contacts.sort((a, b) => {
          return a.givenName.toLowerCase() > b.givenName.toLowerCase();
        });
        setContacts(contacts);
      });
    }
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <HeaderWithIcon
        title={'Invite Contact'}
        titleStyle={{fontSize: hp(21), left: 60}}
        iconStyle={{marginLeft: hp(20)}}
      />

      <SearchField
        placeholder={'Search Contact'}
        style={styles.invitInputStyle}
        icon={<MenuIcon />}
        leftIcon={<FilterIcon />}
        // value={userContacts}
        withLeftIcon
        onChangeText={text => searchFilterFunction(text)}
      />
      <FlatList
        data={userContacts}
        renderItem={contact => {
          return (
            <View style={{position: 'relative', top: 20, left: 20}}>
              <ListItem
                key={contact.index}
                icon={<PhoneCallIcon />}
                phoneNumbers={contact.item.phoneNumbers[0]?.number}
                regularTextStyle={{marginBottom: hp(10)}}
                title={contact.item.givenName}
                clicked={clicked === contact.item}
                onPress={() => {
                  setClicked(contact.item);
                }}
              />

              {/* <RefreshControl refreshing={loading} onRefresh={loadScreen} /> */}
            </View>
          );
        }}
        keyExtractor={item => item.recordID}
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
              title={`Your contact ${clicked?.givenName} has been \n invited to the saver's club`}
            />
            <TouchableOpacity onPress={handleBtn} style={styles.touchable}>
              <ArrorRightIcon />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Button
        title={'Invite Friends'}
        style={{alignSelf: 'center', position: 'relative', bottom: 20}}
        onPress={() => setModalVisible(true)}
        disabled={!clicked}
      />
    </SafeAreaView>
  );
};

export default InvitContacts;
