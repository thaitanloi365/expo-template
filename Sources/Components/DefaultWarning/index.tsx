import {useSelector} from '@Common/Hook';
import {verticalScale} from '@Common/Scale';
import Block from '@Components/Block';
import Icon from '@Components/Icon';
import Text from '@Components/Text';
import {APP_SCREEN, RootStackParamList} from '@Navigation/ScreenTypes';
import {useTheme} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import SwopCard from '@Screens/Authorization/User/Swop/Components/SwopCard';
import {AppTheme, IDress, ISwop} from '@Types';
import {calcTimeLeftInSeconds} from '@Utils/Helper';
import React from 'react';

interface DefaultWarningProps {
  onSwopDetail?(value: ISwop): void;
  onDressDetail?(dress: IDress, has_active_swop?: boolean): void;
  hiddenSwop?: boolean;
}

const DefaultWarning = ({onSwopDetail, onDressDetail, hiddenSwop = false}: DefaultWarningProps) => {
  const theme: AppTheme = useTheme();

  const {defaultSwops, chatCounts, profile} = useSelector(x => x.app);

  const chatCount =
    defaultSwops && defaultSwops[0]?.matching_id
      ? defaultSwops[0].matching_id in chatCounts
        ? chatCounts[defaultSwops[0].matching_id]
        : 0
      : 0;

  return (
    <Block block justifyContent="center">
      <Block direction="row" justifyContent="center" alignItems="center" paddingHorizontal={verticalScale(45)}>
        <Icon icon="warning" height={verticalScale(60)} style={{tintColor: theme.colors.warning}} />
        <Block justifyContent="center" alignItems="flex-start">
          <Text color={theme.colors.warning} fontWeight="bold" fontSize="FONT_18" tx="You are currently in default" />
          <Text
            style={{flexWrap: 'wrap'}}
            color={theme.colors.warning}
            fontWeight="bold"
            tx="Please return the swapped clothes at the earliest to continue using Swop."
          />
        </Block>
      </Block>
      {!hiddenSwop && (
        <Block marginTop={verticalScale(30)}>
          {defaultSwops && defaultSwops.length > 0 && (
            <SwopCard
              chatCount={chatCount}
              swop={defaultSwops[0]}
              onSwopDetail={onSwopDetail}
              onMaskSwopExpired={() => {}}
              onDressDetail={onDressDetail}
            />
          )}
        </Block>
      )}
    </Block>
  );
};

export default DefaultWarning;
