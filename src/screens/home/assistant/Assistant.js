import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  View,
  ScrollView,
} from 'react-native';
import HeaderWithIcon from '../../../components/HeaderView';
import {hp, wp} from '../../../utils';
import {QuestionIcon, WhiteBloodDropIcon, SendIcon} from '../../../assets/Svg';
import {Colors} from '../../../assets/fonts/util/commonStyle';
import {HStack, RegularText, TextWithOnpress} from '../../../components';
import {Divider} from 'react-native-paper';
import {SearchField} from '../../../components/Textfield';
import {useSelector} from 'react-redux';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5E5E5',
  },
  rightIcon: {
    backgroundColor: Colors.HexRed,
    width: wp(40),
    height: hp(40),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: hp(10),
    marginLeft: hp(50),
    left: 40,
  },
  stack: {
    marginLeft: hp(30),
    marginTop: hp(20),
  },
  viewIconStyle: {
    backgroundColor: Colors.HexRed,
    width: wp(30),
    height: hp(35),
    borderRadius: hp(20),
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 50,
  },
  align: {
    textAlign: 'center',
    color: Colors.HexRed,
    fontSize: hp(14),
  },
  chat: {
    alignSelf: 'flex-end',
    backgroundColor: Colors.HexRed,
    marginRight: hp(20),
    padding: hp(5),
    paddingHorizontal: hp(30),
    borderRadius: hp(10),
  },
  margined: {
    bottom: 0,
  },
  inputStyle: {
    alignSelf: 'center',
    backgroundColor: Colors.white,
  },
  displayBlock: {
    marginRight: hp(20),
    alignSelf: 'flex-end',
    padding: hp(5),
    borderRadius: hp(10),
    paddingHorizontal: hp(30),
    backgroundColor: Colors.HexRed,
    marginBottom: 10,
    marginTop: 10,
  },
  recievedStyle: {
    backgroundColor: Colors.grayed,
    padding: hp(10),
    paddingBottom: hp(30),

    width: '60%',
    borderRadius: hp(10),
    marginTop: hp(20),
    alignSelf: 'center',
  },
});

export const ShowPressed = ({pressed}) => {
  return (
    <>
      {pressed ? (
        <HStack style={[styles.chat]}>
          <RegularText
            title={pressed}
            style={{color: Colors.white, bottom: 10}}
          />
        </HStack>
      ) : null}
    </>
  );
};
const Assistant = () => {
  const currentDate = new Date();
  const currentHour = currentDate.getHours();
  const [selected, setSelected] = useState('');
  const [showView, setShowView] = useState(false);
  const [lastText, setLastText] = useState(false);
  const [displayTextLists, setDisplayTextList] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [inputText, setInputText] = useState('');
  const {user} = useSelector(state => state.auth);

  const displayName = user?.displayName;
  let greeting;

  if (currentHour >= 6 && currentHour < 12) {
    greeting = 'Good morning';
  } else if (currentHour >= 12 && currentHour < 18) {
    greeting = 'Good afternoon';
  } else {
    greeting = 'Good evening';
  }

  useEffect(() => {
    setTimeout(() => {
      setShowView(true);
    }, 5000); // delay the message display by 5 seconds
  }, []);

  const DATA = [
    {
      id: 'bd7a',
      title: 'Check donate instruction',
    },
    {
      id: '3ac',
      title: 'Check donate instruction',
    },
    {
      id: '586',
      title: 'Check donate instruction',
    },
  ];
  const Item = ({title, onPress}) => (
    <View style={styles.backgroundViewStyle}>
      <TextWithOnpress title={title} style={styles.align} onpress={onPress} />
      <Divider />
    </View>
  );

  const displayTextList = displayTextLists.map((text, index) => (
    <View style={styles.displayBlock} key={index}>
      <RegularText title={text} style={{color: Colors.white}} />
    </View>
  ));

  const displayText = () => {
    setDisplayTextList([...displayTextList, inputText]);
    setInputText('');
    setLastText(true);
    setDisabled(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderWithIcon
        title={'Assistant'}
        titleStyle={{fontSize: hp(21), marginLeft: hp(50), left: 60}}
        iconStyle={{marginLeft: hp(20)}}
        right={<QuestionIcon />}
        rightStyle={styles.rightIcon}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <HStack style={styles.stack}>
          <View style={styles.viewIconStyle}>
            <WhiteBloodDropIcon />
          </View>
          <View>
            <View
              style={{
                backgroundColor: Colors.grayed,
                padding: hp(10),
                paddingBottom: hp(30),
                marginLeft: hp(20),
                borderRadius: hp(10),
              }}>
              <RegularText
                title={`${greeting}, ${displayName}. Choose
one of the following options to
get started.`}
              />
            </View>

            <View
              style={{
                backgroundColor: Colors.white,
                marginTop: hp(10),
                marginLeft: hp(20),
                borderBottomEndRadius: hp(10),
                borderBottomLeftRadius: hp(10),
                padding: hp(10),
                bottom: hp(20),
              }}>
              <FlatList
                data={DATA}
                renderItem={({item}) => (
                  <Item
                    title={item.title}
                    select={selected === item}
                    onPress={() => setSelected(item.title)}
                  />
                )}
                keyExtractor={item => item.id}
              />
            </View>
          </View>
        </HStack>
        <HStack style={[selected ? styles.chat : null]}>
          <RegularText title={selected} style={{color: Colors.white}} />
        </HStack>

        {selected ? (
          <HStack style={styles.stack}>
            <View style={[styles.viewIconStyle, styles.margined]}>
              <WhiteBloodDropIcon />
            </View>
            <View>
              <View
                style={{
                  backgroundColor: Colors.grayed,
                  padding: hp(10),
                  paddingBottom: hp(30),
                  marginLeft: hp(20),
                  borderRadius: hp(10),
                }}>
                <RegularText title={`That’s great,  ${displayName}`} />
              </View>
              {showView && (
                <>
                  <View
                    style={{
                      backgroundColor: Colors.grayed,
                      padding: hp(10),
                      paddingBottom: hp(30),
                      marginLeft: hp(20),
                      borderRadius: hp(10),
                      marginTop: hp(20),
                    }}>
                    <RegularText title={'Can you tell me your blood group?'} />
                  </View>
                </>
              )}
            </View>
          </HStack>
        ) : null}
        {displayTextList}
        {lastText ? (
          <>
            <HStack style={styles.recievedStyle}>
              <RegularText title={'Recieved'} />
            </HStack>
          </>
        ) : null}
      </ScrollView>
      <SearchField
        placeholder={'Write a message'}
        style={styles.inputStyle}
        rightIcon={<SendIcon />}
        value={inputText}
        onChangeText={text => setInputText(text)}
        pressed={displayText}
        right
        editable={disabled}
        disabled={!disabled}
      />
    </SafeAreaView>
  );
};

export default Assistant;
