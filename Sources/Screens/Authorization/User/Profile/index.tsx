import React, {memo} from 'react';
import isEqual from 'react-fast-compare';
import Block from '@Components/Block';
import {RootStackParamList, APP_SCREEN} from '@Navigation/ScreenTypes';
import {StackScreenProps} from '@react-navigation/stack';

type ProfileProps = StackScreenProps<RootStackParamList, APP_SCREEN.USER_PROFILE>;

const ProfileComponent = ({navigation, route}: ProfileProps) => {
  return <Block />;
};

export default memo(ProfileComponent, isEqual);
