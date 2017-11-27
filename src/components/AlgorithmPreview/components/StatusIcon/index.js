import React from 'react';
import styled from 'react-emotion';
import Play from 'react-icons/lib/md/play-arrow';
import Replay from 'react-icons/lib/md/replay';

import { SANS_SERIF, SCALE_IN, Z_INDEX_ABOVE_CONTENT } from '../../../../style';

const Container = styled.div(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  transition: '300ms cubic-bezier(0.39, 0.575, 0.565, 1)',
  transformOrigin: 'center center',
  ':hover': {
    color: theme[theme.primary === 'dark' ? 'light' : 'dark'].base,
    fontSize: 140
  }
}));

const Message = styled.p(
  {
    margin: 0,
    padding: '0.25rem 0.5rem',
    borderRadius: '0.25rem',
    fontSize: 18,
    fontFamily: SANS_SERIF,
    zIndex: Z_INDEX_ABOVE_CONTENT
  },
  ({ theme }) => ({
    backgroundColor: theme[theme.primary === 'dark' ? 'light' : 'dark'].base,
    color: theme[theme.primary].base
  })
);

const StyledIcon = component =>
  styled(component)(({ theme }) => {
    const opposite = theme[theme.primary === 'dark' ? 'light' : 'dark'];
    const current = theme[theme.primary];
    return {
      position: 'relative',
      zIndex: 2,
      fontSize: 72,
      borderRadius: 72,
      color: theme[theme.primary].base,
      animation: `${SCALE_IN} 300ms cubic-bezier(0.39, 0.575, 0.565, 1) both`,
      transition: '300ms cubic-bezier(0.39, 0.575, 0.565, 1)',
      backgroundColor: current.base,
      color: opposite.base,
      ':hover': {
        backgroundColor: opposite.base,
        color: current.base,
        fontSize: 90,
        borderRadius: 90
      }
    };
  });

export function StatusIcon({ isSorted, sortComplete }) {
  const ActionIcon = StyledIcon(sortComplete ? Replay : Play);
  return (
    <Container>
      <ActionIcon />
    </Container>
  );
}
