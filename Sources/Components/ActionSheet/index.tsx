import React, {useState, forwardRef, useImperativeHandle, useCallback, memo, useMemo} from 'react';
import Modal from 'react-native-modal';
import {ActionSheetProps, OptionData} from './ActionSheet.props';
import {styles} from './ActionSheet.presets';
import {useTranslation} from 'react-i18next';
import isEqual from 'react-fast-compare';
import Text from '@Components/Text';
import Button from '@Components/Button';
import Block from '@Components/Block';
import Divider from '@Components/Divider';
import {enhance} from '@Common/Helper';
import {useTheme} from '@react-navigation/native';

const ActionSheet = forwardRef((props: ActionSheetProps, ref) => {
  const [t] = useTranslation();
  const theme = useTheme();
  const {
    onPressCancel,
    textCancelStyle,
    rootStyle,
    wrapCancelStyle,
    textOptionStyle,
    wrapOptionStyle,
    title,
    onPressOption,
    onBackDropPress,
    textCancel = t('dialog:cancel'),
    backDropColor = 'rgba(0,0,0,.5)',
    closeOnBackDrop = true,
    options = [],
    defaultValue,
  } = props;
  const [actionVisible, setActionVisible] = useState(false);
  const defaultOption = options?.find(item => item.value === defaultValue);
  useImperativeHandle(
    ref,
    () => ({
      show: () => {
        setActionVisible(true);
      },
      hide: () => {
        setActionVisible(false);
      },
    }),
    [],
  );
  const _onPress = useCallback(
    (item: OptionData, index: number) => {
      return (e: any) => {
        setActionVisible(false);
        onPressOption && onPressOption(item, index);
        item.itemCallback && item.itemCallback();
      };
    },
    [onPressOption],
  );
  const _onCancel = useCallback(() => {
    onPressCancel && onPressCancel();
    setActionVisible(false);
  }, [onPressCancel]);

  const _onBackDropPress = useCallback(() => {
    typeof onBackDropPress === 'function' && onBackDropPress();
    closeOnBackDrop === true && setActionVisible(false);
  }, [onBackDropPress]);

  const textOption = useMemo(() => enhance([textOptionStyle]), [textOptionStyle]);
  const textCancelS = useMemo(() => enhance([styles(theme).textCancel, textCancelStyle]), [textCancelStyle]);
  const wrapOption = useMemo(() => enhance([styles(theme).wrapOption, wrapOptionStyle]), [wrapOptionStyle]);
  const wrapCancel = useMemo(() => enhance([styles(theme).wrapCancel, wrapCancelStyle]), [wrapCancelStyle]);
  const root = useMemo(() => enhance([styles(theme).wrap, rootStyle]), [rootStyle]);
  return (
    <Modal
      style={[styles(theme).modal]}
      useNativeDriver={true}
      backdropOpacity={1}
      onBackdropPress={_onBackDropPress}
      onBackButtonPress={_onCancel}
      isVisible={actionVisible}
      backdropTransitionOutTiming={0}
      hideModalContentWhileAnimating
      backdropColor={backDropColor}>
      <Block style={[root]}>
        <Block style={wrapOption}>
          {title &&
            (React.isValidElement(title) ? (
              title
            ) : (
              <>
                <Block style={[styles(theme).wrapTitle]}>
                  <Text style={[styles(theme).title]} text={title + ''} />
                </Block>
                <Divider />
              </>
            ))}
          {options.map((item: OptionData, index: number) => {
            const isDefault = defaultOption?.value === item.value;
            return (
              <Block key={`${index}-${item?.tx}`}>
                <Button style={[styles(theme).option]} onPress={_onPress(item, index)}>
                  <Text
                    fontWeight={item?.isActive || isDefault ? 'bold' : 'normal'}
                    color={item?.isActive || isDefault ? item?.activeColor || theme.colors.primary : theme.colors.text}
                    style={textOption}
                    tx={item?.tx}
                  />
                </Button>
                <Divider />
              </Block>
            );
          })}
        </Block>
        <Block style={wrapCancel}>
          <Button onPress={_onCancel} style={[styles(theme).buttonCancel]}>
            <Text style={textCancelS} text={textCancel} />
          </Button>
        </Block>
      </Block>
    </Modal>
  );
});

export default memo(ActionSheet, isEqual);

export interface ActionSheetRef {
  show(value?: string): void;
  hide(): void;
}
