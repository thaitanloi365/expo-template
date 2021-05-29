import React, {memo} from 'react';
import {Dimensions, StatusBar} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {APP_SCREEN, RootStackParamList} from '@Navigation/ScreenTypes';
import {useTheme} from '@react-navigation/native';
import {AppTheme} from '@Types';
import {SafeAreaView} from 'react-native-safe-area-context';
import isEqual from 'react-fast-compare';

type GetStartedProps = StackScreenProps<RootStackParamList, APP_SCREEN.GET_STARTED>;

const {width} = Dimensions.get('window');

const GetStarted = ({navigation, route}: GetStartedProps) => {
  const theme: AppTheme = useTheme();

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <StatusBar barStyle="dark-content" />
    </SafeAreaView>
  );
};

export default memo(GetStarted, isEqual);
