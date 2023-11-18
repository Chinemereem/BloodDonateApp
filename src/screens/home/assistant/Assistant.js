import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  ScrollView,
  Text,
  ActivityIndicator,
  Dimensions,
  Platform,
} from 'react-native';
import HeaderWithIcon from '../../../components/HeaderView';
import {hp, wp} from '../../../utils';
import {QuestionIcon, WhiteBloodDropIcon, SendIcon} from '../../../assets/Svg';
import {Colors} from '../../../assets/fonts/util/commonStyle';
import {HStack, RegularText, TextWithOnpress} from '../../../components';
import {Divider} from 'react-native-paper';
import {SearchField} from '../../../components/Textfield';
import {useSelector} from 'react-redux';
import {
  CreateConversation,
  getCreateConversationData,
} from '../../../api/requestApi';
import {KeyboardAvoidingContainer} from '../../../components/KeyboardAvoidingView';
const BloodGroupData = [
  'A',
  'A+',
  'A-',
  'B',
  'B+',
  'B',
  'B-',
  'O',
  'O+',
  'O-',
  'AB',
  'AB+',
  'AB-',
];
const ChatBubble = ({message, isUser}) => (
  <View
    style={[styles.bubble, isUser ? styles.userBubble : styles.otherBubble]}>
    <Text style={[isUser ? {color: 'white'} : styles.bubbleText]}>
      {message}
    </Text>
  </View>
);

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

const Item = ({item, onPress, disabled}) => {
  return (
    <View style={styles.backgroundViewStyle}>
      <TextWithOnpress
        title={item.text}
        style={styles.align}
        onpress={() => {
          if (!disabled) {
            onPress(item);
          }
        }}
      />
      <Divider />
    </View>
  );
};

const Assistant = () => {
  const currentDate = new Date();
  const currentHour = currentDate.getHours();
  const [disabled, setDisabled] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const {user} = useSelector(state => state.auth);
  const [selectedItem, setSelectedItem] = useState(null);
  const displayName = user?.displayName;
  let greeting;

  if (currentHour >= 6 && currentHour < 12) {
    greeting = 'Good morning';
  } else if (currentHour >= 12 && currentHour < 18) {
    greeting = 'Good afternoon';
  } else {
    greeting = 'Good evening';
  }
  const [loading, setLoading] = useState(false);
  const listData = [
    {id: '1', text: 'Check donate instruction'},
    {id: '2', text: 'Check donate instruction'},
    {id: '3', text: 'Check donate instruction'},
    // Add more items as needed
  ];
  const onAdded = request => {
    setLoading(false);
  };

  const containsBloodGroupMessage = messageList => {
    const lowerCaseBloodGroups = BloodGroupData.map(element =>
      element.toLowerCase(),
    );

    return messageList?.some(item => {
      const lowerCaseMessage = item.message?.toLowerCase();
      return lowerCaseBloodGroups.includes(lowerCaseMessage);
    });
  };
  const hasBloodGroupMessage = containsBloodGroupMessage(messages[0]?.messages);

  const handlePressed = () => {
    if (inputMessage === '') {
      return;
    }
    if (hasBloodGroupMessage && messages) {
      setTimeout(() => {
        const receivedMessage = {
          id: messages?.length + 4,
          message: 'Received!',
          isUser: false,
        };

        setMessages(prevMessages => [...prevMessages, receivedMessage]);
        CreateConversation(
          {
            messages: messages,
          },
          onAdded,
        );
      }, 1000);
      setDisabled(true);
    }
    handleSelectItem({text: inputMessage});
    setInputMessage('');
  };

  console.log(disabled, messages, 'hhhhh', messages !== undefined);
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await getCreateConversationData();
  
        setMessages(response);
      
      console.log(response, response[0]?.messages, 'response[0]?.messages')
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    handlePressed();

    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasBloodGroupMessage]);

  const handleSelectItem = item => {
    // Add the selected item's text to the messages list as a user message
    setSelectedItem(item.id);
    const userMessage = {
      id: messages?.length + 1,
      message: item.text,
      isUser: true,
    };

    setMessages(prevMessages => [...prevMessages, userMessage]);

    // Check if the selected item is from the predefined data list
    if (listData.some(dataItem => dataItem.text === item.text)) {
      // Add "Okay" to the messages list as a response in the other bubble
      const okayMessage = {
        id: messages?.length + 2,
        message: `That’s great, ${displayName}`,
        isUser: false,
      };

      setMessages(prevMessages => [...prevMessages, okayMessage]);

      // Wait for a few seconds before adding the next message
      setTimeout(() => {
        const nextMessage = {
          id: messages?.length + 3,
          message: 'Can you tell me your blood group?',
          isUser: false,
        };

        setMessages(prevMessages => [...prevMessages, nextMessage]);

        // Check if there's a blood group message
      }, 1000); // 1000 milliseconds (1 second)
    }
  };

  console.log(disabled, 'messages', 'kkkoiiii');

  return (
    <KeyboardAvoidingContainer style={styles.container}>
      <HeaderWithIcon
        title={'Assistant'}
        titleStyle={{fontSize: hp(21), marginLeft: hp(50), left: 60}}
        iconStyle={{marginLeft: hp(10)}}
        right={<QuestionIcon />}
        rightStyle={styles.rightIcon}
      />
      {loading ? (
        <View style={styles.loader}>
          <ActivityIndicator color={Colors.HexRed} size={'small'} />
        </View>
      ) : (
        <>
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
                    data={listData}
                    renderItem={({item}) => (
                      <Item
                        item={item}
                        select={item}
                        onPress={handleSelectItem}
                        disabled={!!selectedItem || messages?.length > 0}
                      />
                    )}
                    keyExtractor={item => item.id}
                  />
                </View>
              </View>
            </HStack>
            {messages && (
              <FlatList
                data={messages[0]?.messages}
                keyExtractor={item => item.id.toString()}
                renderItem={({item}) => (
                  <ChatBubble
                    message={item.message}
                    isUser={item.isUser}
                    displayName={displayName}
                  />
                )}
              />
            )}
          </ScrollView>
          <SearchField
            placeholder={'Write a message'}
            style={styles.inputStyle}
            rightIcon={<SendIcon />}
            value={inputMessage}
            onChangeText={text => setInputMessage(text)}
            pressed={handlePressed}
            right
            editable={!messages?.length > 0}
            disabled={messages?.length > 0}
          />
        </>
      )}
    </KeyboardAvoidingContainer>
  );
};
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
    left: Platform.OS === 'ios' ? 40 : 90,
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
  recievedStyle: {
    backgroundColor: Colors.grayed,
    padding: hp(10),
    paddingBottom: hp(30),

    width: '60%',
    borderRadius: hp(10),
    marginTop: hp(20),
    alignSelf: 'center',
  },
  bubble: {
    padding: 10,
    borderRadius: 8,
    maxWidth: '80%',
    marginVertical: 8,
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: Colors.HexRed,
    right: 15,
  },
  otherBubble: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.grayed,
    left: 85,
  },
  bubbleText: {
    color: 'black',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loader: {
    height: Dimensions.get('screen').height * 0.6,
    justifyContent: 'center',
  },
});

export default Assistant;
