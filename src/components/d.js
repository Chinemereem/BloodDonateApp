import React from 'react';
import {HStack} from './listview';
import * as Svg from '../assets/Svg';
import {Card} from 'react-native-paper';
import {wp, hp} from '../utils/index';
import {SafeAreaView, Image, View} from 'react-native';
import {bloodDropPng} from '../assets';
import * as shape from 'd3-shape';
import {Dimensions, Animated} from 'react-native';
import {Path} from 'react-native-svg';
const BottomTab = ({icon}) => {
  const height = 64;
  const {width} = Dimensions.get('window');
  const tabWidth = width / 4;

  const AnimatedSvg = Animated.createAnimatedComponent(Svg);

  const left = shape
    .line()
    .x(d => d.x)
    .y(d => d.y)([
    {x: 0, y: 0},
    {x: width, y: 0},
  ]);

  const right = shape
    .line()
    .x(d => d.x)
    .y(d => d.y)([
    {x: width + tabWidth, y: 0},
    {x: width * 2, y: 0},
    {x: width * 2, y: height},
    {x: 0, y: height},
    {x: 0, y: 0},
  ]);

  const tab = shape
    .line()
    .x(d => d.x)
    .y(d => d.y)
    .curve(shape.curveBasis)([
    {x: width, y: 0},
    {x: width + 5, y: 0},
    {x: width + 10, y: 0},
    {x: width + 15, y: height},
    {x: width + tabWidth - 15, y: height},
    {x: width + tabWidth - 10, y: 10},
    {x: width + tabWidth - 5, y: 0},
  ]);

  const d = `${right} ${left} ${tab}`;

  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          flex: 1,
          backgroundColor: '#ea3345',
          justifyContent: 'flex-end',
        }}>
        <View style={{height}}>
          <AnimatedSvg
            style={{
              transform: [
                {
                  translateX: -100,
                },
              ],
            }}
            width={width * 2}
            {...{height}}>
            <Path {...{d}} fill="white" />
          </AnimatedSvg>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default BottomTab;
