import React, {memo} from 'react';
import {useTheme} from '@react-navigation/native';
import isEqual from 'react-fast-compare';
import RNStepIndicator from 'react-native-step-indicator';
import {BlockProps} from '@Components/Block/Block.props';
import Block from '@Components/Block';

interface Props extends BlockProps {
  currentStep: number;
  stepCount?: number;
}
const StepIndicator = (props: Props) => {
  const theme = useTheme();
  const {currentStep = 0, stepCount = 3, ...rest} = props;
  return (
    <Block {...rest}>
      <RNStepIndicator
        customStyles={{
          stepIndicatorSize: 15,
          currentStepIndicatorSize: 15,
          separatorStrokeWidth: 2,
          currentStepStrokeWidth: 2,
          stepStrokeCurrentColor: theme.colors.primary,
          stepStrokeWidth: 3,
          stepStrokeFinishedColor: theme.colors.primary,
          stepStrokeUnFinishedColor: '#aaaaaa',
          separatorFinishedColor: theme.colors.primary,
          separatorUnFinishedColor: '#aaaaaa',
          stepIndicatorFinishedColor: theme.colors.primary,
          stepIndicatorUnFinishedColor: '#aaaaaa',
          stepIndicatorCurrentColor: theme.colors.primary,
          stepIndicatorLabelFontSize: 0,
          currentStepIndicatorLabelFontSize: 0,
          stepIndicatorLabelCurrentColor: 'transparent',
          stepIndicatorLabelFinishedColor: 'transparent',
          stepIndicatorLabelUnFinishedColor: 'transparent',
          labelColor: '#ffffff',
          labelSize: 0,
          currentStepLabelColor: theme.colors.primary,
        }}
        currentPosition={currentStep}
        stepCount={stepCount}
        labels={undefined}
      />
    </Block>
  );
};

export default memo(StepIndicator, isEqual);
