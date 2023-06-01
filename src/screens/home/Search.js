import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  FlatList,
  StatusBar,
  Alert,
} from 'react-native';
import {bloodGroupData} from './utils/UserData';
import HeaderWithIcon from '../../components/HeaderView';
import {hp, wp} from '../../utils';
import {Colors} from '../../assets/fonts/util/commonStyle';
import {SearchField} from '../../components/Textfield';
import {MenuIcon, FilterIcon} from '../../assets/Svg';
import {Divider} from 'react-native-paper';
import {RegularText} from '../../components';
import Button from '../../components/button';
import {Selector} from '../../components/Selector';
import {Details} from './common';
import {useNavigation} from '@react-navigation/native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.smokeWhite,
  },
  inputStyle: {
    width: '80%',
    marginLeft: hp(20),
    marginTop: hp(20),
    backgroundColor: Colors.white,
  },
  cardContainer: {
    backgroundColor: Colors.white,
    width: '95%',
    height: '73%',
    marginLeft: hp(10),
    paddingVertical: hp(10),
    borderRadius: 24,
    paddingHorizontal: wp(5),
    marginVertical: hp(10),

    shadowOffset: {
      width: 0,
      height: hp(9),
    },
    shadowRadius: 34,
    shadowColor: 'rgba(0, 0, 0, 0.04)',
    shadowOpacity: 3,
    elevation: 0.3,
  },

  viewStyle: {
    marginTop: hp(10),
    borderBottom: hp(10),
    borderWidth: 1,
    borderColor: '#E9E9E9',
    padding: hp(10),
  },
  backgroundViewStyle: {
    marginTop: hp(35),
    backgroundColor: Colors.smokeWhite,
    marginLeft: hp(25),
    width: wp(55),
    height: wp(35),
    borderRadius: hp(20),
    justifyContent: 'center',
  },
  textStyle: {fontSize: hp(21), left: 60},
  buttonStyle: {
    alignSelf: 'center',
    width: wp(130),
    marginTop: hp(20),
    top: 3,
  },
});

const Item = ({title, select, onPress}) => (
  <View style={styles.backgroundViewStyle}>
    <Selector
      title={title}
      selected={select}
      onPress={onPress}
      titleStyle={{fontSize: hp(20)}}
    />
  </View>
);

const SearchScreen = () => {
  const [selected, setSelected] = useState('');
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const navigation = useNavigation();
  useEffect(() => {
    setFilteredDataSource(bloodGroupData);
    setMasterDataSource(bloodGroupData);
  }, []);

  const searchFilterFunction = text => {
    if (text) {
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.title
          ? item.title.toUpperCase()
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
      <StatusBar
        animated={true}
        backgroundColor="#E5E5E5"
        barStyle="dark-content"
      />
      <HeaderWithIcon
        title={'Search'}
        titleStyle={styles.textStyle}
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

      <View style={styles.cardContainer}>
        <RegularText
          title={'Filter'}
          style={{
            textAlign: 'center',
            fontSize: hp(20),
          }}
        />
        <Divider />
        <View style={styles.viewStyle}>
          <RegularText
            title={'Blood Type'}
            style={{
              fontSize: hp(20),
              marginLeft: hp(10),
            }}
          />
        </View>
        <View style={{bottom: 10}}>
          <FlatList
            data={filteredDataSource}
            numColumns={4}
            renderItem={({item}) => (
              <Item
                title={item.title}
                select={selected === item}
                onPress={() => setSelected(item)}
              />
            )}
            keyExtractor={item => item.id}
          />
        </View>
        <Divider />
        <Details
          title={'Location'}
          onPress={() => navigation.navigate('Location')}
        />
        <Details title={'Blood Bank'} />
        <Details
          title={'Donnors'}
          onPress={() => navigation.navigate('FindDonnors')}
        />

        <Button
          title={'Apply'}
          titleStyle={{textAlign: 'center'}}
          style={styles.buttonStyle}
          disabled={!selected}
          onPress={() => {
            Alert.alert('Coming Soon');
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default SearchScreen;
