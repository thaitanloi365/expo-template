import React, {memo} from 'react';
import isEqual from 'react-fast-compare';
import {RootStackParamList, APP_SCREEN} from '@Navigation/ScreenTypes';
import Block from '@Components/Block';
import {StatusBar} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import styles from './Styles';

type HomeProps = StackScreenProps<RootStackParamList, APP_SCREEN.USER_HOME>;

const HomeComponent = ({navigation, route}: HomeProps) => {
  return (
    <Block block color="white">
      <StatusBar backgroundColor={'transparent'} translucent />
    </Block>
  );
};

export default memo(HomeComponent, isEqual);
