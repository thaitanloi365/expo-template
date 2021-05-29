import React, {useState, useEffect} from 'react';
import Block from '@Components/Block';
import Text from '@Components/Text';
import {useTheme} from '@react-navigation/native';
import {AppTheme, IDateTimeObject, IDateTimeOrder} from '@Types';
import {DataTable} from 'react-native-paper';
import {scale, verticalScale} from '@Common/Scale';
import moment from 'moment';
import styles from './Styles';
import Touchable from '@Components/Touchable';

interface TableSchedule {
  selectedTime?: number;
  onSelectedTime?(date: number): void;
  isActiveColor?: string;
}

const TableSchedule = (props: TableSchedule) => {
  const {onSelectedTime, selectedTime, isActiveColor} = props;
  const theme: AppTheme = useTheme();
  const [dateOrder, setDateOrder] = useState<Array<IDateTimeOrder>>([]);

  useEffect(() => {
    let dateOrderNew: Array<IDateTimeOrder> = [];

    [1, 2, 3, 4, 5, 6, 7].map((item, index) => {
      const date = moment().add(index + 1, 'd');
      const duration = 3;
      let times: Array<IDateTimeObject> = [];
      [0, 1, 2].map(itm => {
        const from = date.set({hour: 9 + itm * duration, minute: 0, second: 0});
        const newTime = {value: from.unix(), name: `${from.format('hh')} - ${from.add(3, 'hours').format('hh a')}`};
        times.push(newTime);
      });

      const newDate = {id: date.unix(), date: date.format('ddd, MMM DD'), dateUnix: date.unix(), times: times};

      dateOrderNew.push(newDate);
    });
    setDateOrder(dateOrderNew);
  }, []);

  return (
    <Block>
      <Block marginHorizontal={scale(16)} marginTop={verticalScale(20)} style={styles(theme).table}>
        <Block>
          {dateOrder.map((item, index) => (
            <Block
              direction="row"
              key={`row-${index}`}
              justifyContent="center"
              alignItems="center"
              borderBottomWidth={1}
              borderBottomColor={theme.colors.border}>
              <Block flex={1} paddingVertical={10}>
                <Text fontSize="FONT_12" fontWeight="bold" tx={`dayWeek:${item.date}`} />
              </Block>
              {item.times.map((time, index) => {
                const isAction = selectedTime === time.value;
                let isInvalid = moment().diff(moment.unix(time.value), 'hours') > 0;

                if (moment().diff(moment.unix(item.dateUnix), 'days') === -1) {
                  const diffHours = moment().add(1, 'days').diff(moment.unix(time.value), 'hours');
                  isInvalid = diffHours > 0;
                }
                const _onSelect = () => {
                  onSelectedTime && onSelectedTime(time.value);
                };
                return (
                  <Block
                    paddingVertical={10}
                    flex={0.75}
                    key={`cell-${index}`}
                    style={{
                      backgroundColor:
                        isAction && !isInvalid ? (isActiveColor ? isActiveColor : theme.colors.text) : 'white',
                    }}>
                    <Touchable onPress={_onSelect} disabled={isInvalid}>
                      {/* <Block block justifyContent="center" alignItems="center"> */}
                      <Text
                        fontSize="FONT_12"
                        textAlign="center"
                        marginTop={verticalScale(7)}
                        {...(isAction &&
                          !isInvalid && {
                            color: 'white',
                          })}
                        {...(isInvalid && {
                          color: theme.colors.border,
                        })}
                        tx={time.name}
                      />
                      {/* </Block> */}
                    </Touchable>
                  </Block>
                );
              })}
            </Block>
          ))}
        </Block>
      </Block>
    </Block>
  );
};

export default TableSchedule;
