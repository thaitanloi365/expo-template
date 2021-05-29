import {TextProps} from '@Components/Text/Text.props';
import {ICoordinate} from '@Types';

export interface LocationLinkingProps extends TextProps {
  coordinate?: ICoordinate;
}
