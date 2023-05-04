import React from 'react';
import {SafeAreaView, StyleSheet, View, ScrollView, Image} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {hp} from '../utils';
import {heightPercentageToDP as hdp} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  // viewStyle: {flex: 1, paddingBottom: hp(25), zIndex: 20},
  sheetContainer: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: '#DCDCDC',
  },
  imageStyle: {
    zIndex: 2,
    alignSelf: 'center',
  },
  imgViewStyle: {
    borderRadius: 10,
    borderColor: '#FFFFFF',
    borderWidth: 6,
    width: 150,
    height: 147,
    position: 'absolute',

    zIndex: 2,
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
  },
});

const BottomSheet = ({
  openRef,
  height,
  render,
  dragFromTop,
  closeOnPressMask,
  image,
  imgStyle,
}) => {
  const heightCheck = () => (hdp('100%') < 677 ? height + hp(10) : height);
  return (
    <SafeAreaView style={styles.container}>
      <RBSheet
        ref={openRef}
        height={heightCheck()}
        closeOnDragDown={true}
        dragFromTopOnly={dragFromTop}
        closeOnPressMask={closeOnPressMask}
        // draggableIcon={draggableIcon}
        customStyles={{
          container: styles.sheetContainer,
          wrapper: {
            backgroundColor: 'transparent',
          },
          draggableIcon: {
            backgroundColor: '#000',
            zIndex: 0,
          },
        }}>
        <View style={styles.imgViewStyle}>
          <Image
            source={{
              uri: image,
            }}
            style={[styles.imageStyle, imgStyle]}
          />
        </View>
        <ScrollView
          // showsVerticalScrollIndicator={false}
          style={{backgroundColor: '#DCDCDC', zIndex: 0}}>
          {render}
        </ScrollView>
      </RBSheet>
    </SafeAreaView>
  );
};

export default BottomSheet;
