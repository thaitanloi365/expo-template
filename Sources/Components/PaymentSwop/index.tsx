import React from 'react';
import Block from '@Components/Block';
import Text from '@Components/Text';
import {StyleSheet} from 'react-native';
import styles from './Styles';
import {useTheme} from '@react-navigation/native';
import {AppTheme, IFindLaundryResponse, ISwop} from '@Types';
import {scale, verticalScale} from '@Common/Scale';
import {formatCurrency} from '@Utils/Helper';
import Row from '@Components/Row';
import Col from '@Components/Col';
import Button from '@Components/Button';
import {displayMessageComposer} from '@Common/Intercom';

interface PaymentSwopProps {
  data: ISwop | null;
}

//Laundry
const PaymentSwop = ({data}: PaymentSwopProps) => {
  const theme: AppTheme = useTheme();

  const totalFee = (data?.cleaning_fee_deduct || 0) + (data?.delivery_fee_deduct || 0);

  const onContactUs = () => displayMessageComposer();
  return (
    <Block style={styles(theme).wrap}>
      <Block direction="row" justifyContent="space-between" alignItems="center">
        <Text preset="mainText" fontWeight="bold" tx={`Payments till now`} />
        <Text preset="mainText" fontWeight="bold" text="VND" />
      </Block>

      <Block marginVertical={verticalScale(15)} block borderTopWidth={1} borderTopColor={theme.colors.border}></Block>

      {/* Cleaning Fee */}
      {data?.logistic_method !== 'chat' && (
        <>
          <Row
            borderTopColor={theme.colors.border}
            //   borderTopWidth={StyleSheet.hairlineWidth}
            alignHorizontal="space-between"
            alignVertical="center">
            <Text preset="mainText" fontWeight="bold" tx="Cleaning Charges" />
            <Text preset="mainText" fontWeight="bold" text={`${formatCurrency(data?.cleaning_fee_deduct || '0')}`} />
          </Row>
          <Col>
            <Text preset="footNote" tx="When other' clothes come to you" />
            <Text preset="footNote" tx="When your clothes come back to you" />
          </Col>
        </>
      )}

      {/* Delivery Fee */}
      {data?.logistic_method === 'laundry' && (
        <>
          <Row
            paddingTop={verticalScale(20)}
            borderTopColor={theme.colors.border}
            //   borderTopWidth={StyleSheet.hairlineWidth}
            alignHorizontal="space-between"
            alignVertical="center">
            <Text preset="mainText" fontWeight="bold" tx="Delivery Charges" />
            <Text preset="mainText" fontWeight="bold" text={`${formatCurrency(data?.delivery_fee_deduct || '0')}`} />
          </Row>
          <Col>
            <Text preset="footNote" text="Your clothes: You to Laundry" />
            <Text preset="footNote" text="Other's clothes: Laundry to You" />
            <Text preset="footNote" text="Other's clothes: You to Laundry" />
            <Text preset="footNote" text="Your clothes: Laundry to You" />
          </Col>
        </>
      )}

      <Block marginVertical={verticalScale(15)} block borderTopWidth={1} borderTopColor={theme.colors.border}></Block>

      {/* Total */}
      <Row alignHorizontal="space-between" alignVertical="center">
        <Text preset="mainText" fontWeight="bold" tx="matchingLogistic:total" />
        <Text preset="mainText" fontWeight="bold" text={`${formatCurrency(totalFee)}`} />
      </Row>

      <Button marginTop={verticalScale(20)} preset="secondary" tx="matchingLogistic:contactUs" onPress={onContactUs} />
    </Block>
  );
};

export default PaymentSwop;
