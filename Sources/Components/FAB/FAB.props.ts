import {FABDefaultProps} from './Components/FABDefault/FABDefault.props';
import {FABGroupProps} from './Components/FABGroup/FABGroup.props';
export type FABProps = FABGroupProps &
  FABDefaultProps & {
    type?: 'default' | 'group';
  };
