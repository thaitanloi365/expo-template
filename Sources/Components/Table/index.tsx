import {verticalScale} from '@Common/Scale';
import Block from '@Components/Block';
import {BlockProps} from '@Components/Block/Block.props';
import {useTheme} from '@react-navigation/native';
import {AppTheme} from '@Types';
import React from 'react';

export const Header = ({children, ...props}: BlockProps) => {
  const theme: AppTheme = useTheme();

  return (
    <Block
      block
      direction="row"
      alignItems="center"
      justifyContent="center"
      borderBottomWidth={1}
      borderBottomColor={theme.colors.border}
      paddingBottom={verticalScale(16)}
      {...props}>
      {children}
    </Block>
  );
};

export const Title = ({children, ...props}: BlockProps) => {
  return (
    <Block block alignItems="center" {...props}>
      {children}
    </Block>
  );
};

export const Row = ({children, ...props}: BlockProps) => {
  return (
    <Block direction="row" block {...props}>
      {children}
    </Block>
  );
};

export const Cell = ({children, ...props}: BlockProps) => {
  return (
    <Block block alignItems="center" paddingVertical={verticalScale(10)} {...props}>
      {children}
    </Block>
  );
};

export const Table = ({children, ...props}: BlockProps) => {
  return (
    <Block block {...props}>
      {children}
    </Block>
  );
};

Table.Header = Header;
Table.Title = Title;
Table.Row = Row;
Table.Cell = Cell;

export default {Table};
