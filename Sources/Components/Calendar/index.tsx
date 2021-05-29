import {verticalScale} from '@Common/Scale';
import Block from '@Components/Block';
import Text from '@Components/Text';
import React, {useState} from 'react';
import moment from 'moment';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {AppTheme} from '@Types';
import {useTheme} from '@react-navigation/native';
import Icon from '@Components/Icon';

const getDaysInMonth = (month: number, year: number) => {
  var date = new Date(year, month, 1);
  var days = [];
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
};

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

interface CalendarProps {
  renderDate?(date: moment.Moment): void;
  onChangeMonth?(month: moment.Moment): void;
}

const Calendar = ({renderDate, onChangeMonth}: CalendarProps) => {
  const theme: AppTheme = useTheme();

  const [activeDate, setActiveDate] = useState(new Date());
  const [month, setMonth] = useState(moment());

  const onPrevMonth = () => {
    const newMonth = moment(month).subtract(1, 'months');
    setMonth(newMonth);
    onChangeMonth && onChangeMonth(newMonth);
  };

  const onNextMonth = () => {
    const newMonth = moment(month).add(1, 'months');
    setMonth(newMonth);
    onChangeMonth && onChangeMonth(newMonth);
  };

  //Set Matrix calendar
  const daysInMonth = getDaysInMonth(moment(month).month(), moment(month).year());
  let daysWeek = daysInMonth.map(item => moment(item).format('ddd'));
  const firstDayIndex = WEEKDAYS.findIndex(item => daysWeek[0] === item);
  let matrix: any = Array.from(Array(Math.ceil((daysInMonth.length + firstDayIndex) / 7)), x => Array.from(Array(7)));

  let matrixDayOfMonth: any = [];

  matrix.forEach((row: any, indexRow: number) => {
    let newRow: any = [];
    row.forEach((col: any, indexCol: number) => {
      if (indexRow * 7 + indexCol < firstDayIndex) {
        newRow.push(null);
      } else {
        newRow.push(daysInMonth[indexRow * 7 + indexCol - firstDayIndex] || null);
      }
    });

    matrixDayOfMonth.push(newRow);
  });

  return (
    <Block paddingHorizontal={verticalScale(16)}>
      <Block block direction="row" justifyContent="space-between" alignItems="center">
        <Block>
          <TouchableOpacity onPress={onPrevMonth}>
            <Icon icon="chevron_left" />
          </TouchableOpacity>
        </Block>
        <Block block direction="row" justifyContent="center" alignItems="center">
          <Text tx={`month:${moment(month).format('MMMM')}`} />
          <Text text={moment(month).format('YYYY')} />
        </Block>
        <Block>
          <TouchableOpacity onPress={onNextMonth}>
            <Icon icon="chevron_left" style={{transform: [{rotate: '180deg'}]}} />
          </TouchableOpacity>
        </Block>
      </Block>
      <Block direction="row" justifyContent="space-between" alignItems="center" paddingVertical={verticalScale(16)}>
        {WEEKDAYS.map(weekday => {
          return (
            <Block direction="row" justifyContent="space-between" alignItems="center">
              <Text tx={`dayWeekShort:${weekday}`} color={theme.colors.border} />
            </Block>
          );
        })}
      </Block>
      <Block>
        {matrixDayOfMonth.map((row: any) => {
          return (
            <Block block direction="row" alignItems="center" justifyContent="center" padding={verticalScale(1)}>
              {row.map((col: any) => {
                return (
                  <Block block justifyContent="space-between" alignItems="center" padding={verticalScale(1)}>
                    {col &&
                      (!renderDate ? (
                        <TouchableOpacity>
                          <Text text={moment(col).format('D')} />
                        </TouchableOpacity>
                      ) : (
                        renderDate(col)
                      ))}
                  </Block>
                );
              })}
            </Block>
          );
        })}
      </Block>
    </Block>
  );
};

export default Calendar;
