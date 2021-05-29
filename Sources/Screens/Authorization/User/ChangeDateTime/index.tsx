import React, {memo, useEffect, useState} from 'react';
import Block from '@Components/Block';
import Text from '@Components/Text';
import Icon from '@Components/Icon';
import IconButton from '@Components/IconButton';
import Row from '@Components/Row';
import {APP_SCREEN, RootStackParamList} from '@Navigation/ScreenTypes';
import {StackScreenProps} from '@react-navigation/stack';
import {getStatusBarHeight} from '@Utils/DeviceInfo';
import isEqual from 'react-fast-compare';
import Col from '@Components/Col';

import styles from './Styles';
import {AppTheme, IChangeDateTimeRequest} from '@Types';
import {useTheme} from '@react-navigation/native';
import {useDispatch, useSelector} from '@Common/Hook';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import TableSchedule from '@Components/TableSchedule';
import Button from '@Components/Button';
import {verticalScale} from '@Common/Scale';
import {unwrapResult} from '@reduxjs/toolkit';
import moment from 'moment';
import {userSwopDetailsActions} from '../SwopDetails/Redux';

type Props = StackScreenProps<RootStackParamList, APP_SCREEN.USER_CHANGE_DATE_TIME>;

const ChangeDateTime = ({navigation, route}: Props) => {
  const theme: AppTheme = useTheme();
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
  const [selectedTime, setSelectedTime] = useState<number | undefined>();

  const {loadingChangeDateTime} = useSelector(x => x.userSwopDetails);

  useEffect(() => {
    if (route.params?.swop) {
      const swop = route.params?.swop;
      const status = route.params?.status;
      let newSelectedTime = undefined;
      switch (status ? status : swop.status) {
        case 'pick_up_scheduled': {
          newSelectedTime = swop.pick_up_from_time;
          break;
        }
        case 'delivery_scheduled': {
          newSelectedTime = swop.delivery_from_time;
          break;
        }
        case 'return_pick_up_scheduled': {
          newSelectedTime = swop.return_pick_up_from_time;
          break;
        }
        case 'return_delivery_scheduled': {
          newSelectedTime = swop.return_delivery_from_time;
          break;
        }
      }
      setSelectedTime(newSelectedTime);
    }
  }, [route.params?.swop]);

  const onBack = () => navigation.goBack();

  const onSelectedTime = (time: number) => {
    setSelectedTime(time);
  };

  const onSubmit = () => {
    const id = route.params?.swop?.id;
    const status = route.params?.status ? route.params?.status : route.params?.swop?.status;
    let params: IChangeDateTimeRequest = {
      id,
    };

    console.log('*** route.params?.swop', route.params?.swop);

    if (status === 'pick_up_scheduled') {
      params = {
        ...params,
        pick_up_from_time: selectedTime,
        pick_up_to_time: moment.unix(selectedTime).add(3, 'hours').unix(),
      };
    } else if (status === 'delivery_scheduled') {
      params = {
        ...params,
        delivery_from_time: selectedTime,
        delivery_to_time: moment.unix(selectedTime).add(3, 'hours').unix(),
      };
    } else if (status === 'return_pick_up_scheduled') {
      params = {
        ...params,
        return_pick_up_from_time: selectedTime,
        return_pick_up_to_time: moment.unix(selectedTime).add(3, 'hours').unix(),
      };
    } else if (status === 'return_delivery_scheduled') {
      params = {
        ...params,
        delivery_from_time: selectedTime,
        delivery_to_time: moment.unix(selectedTime).add(3, 'hours').unix(),
      };
    }

    dispatch(userSwopDetailsActions.userChangeDateTime(params))
      .then(unwrapResult)
      .then(() => {
        navigation.goBack();
      });
  };

  return (
    <Block color="white" block paddingBottom={insets.bottom / 2}>
      <Row marginTop={getStatusBarHeight()} alignVertical="center" alignHorizontal="space-between">
        <Col flex={0.2}>
          <IconButton icon="chevron_left" onPress={onBack} />
        </Col>

        <Row alignVertical="center">
          <Text fontWeight="bold" tx="Do you want to change date & time" />
        </Row>

        <Col flex={0.2} />
      </Row>
      <Block block justifyContent="space-between" paddingBottom={verticalScale(20)}>
        <Block block justifyContent="center">
          <TableSchedule
            isActiveColor={theme.colors.primary}
            onSelectedTime={onSelectedTime}
            selectedTime={selectedTime}
          />
        </Block>
        <Block justifyContent="center" alignItems="center">
          <Button
            style={{width: 200}}
            loading={loadingChangeDateTime}
            onPress={onSubmit}
            disabled={selectedTime === 0}
            tx="Confirm"
          />
        </Block>
      </Block>
    </Block>
  );
};

export default memo(ChangeDateTime, isEqual);
