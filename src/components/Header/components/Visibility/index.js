// @flow
import * as React from 'react';
import styled from 'react-emotion';
import VisibilityOff from 'react-icons/lib/md/visibility-off';
import VisibilityOn from 'react-icons/lib/md/visibility';

import { Accessible } from '../../../Accessible';

const StyledIcon = Component =>
  styled(Component)(({ theme }) => ({
    fontSize: 24,
    color: theme[theme.primary].text
  }));

interface Props {
  hidden: boolean;
  onVisibilitySwitch(hidden: boolean): void;
}

export function Visibility({ hidden, onVisibilitySwitch }: Props) {
  const Icon = StyledIcon(hidden ? VisibilityOn : VisibilityOff);
  return (
    <Accessible
      ariaLabel={`${hidden ? 'Show' : 'Hide'} solved code snippet`}
      onClick={() => onVisibilitySwitch(!hidden)}
      render={() => <Icon />}
    />
  );
}
