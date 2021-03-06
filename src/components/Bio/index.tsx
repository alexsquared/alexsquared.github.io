import { FC } from 'react';
import { styled } from 'goober';

import { screen } from 'services/style';
import { useSiteStore } from 'services/store';

import About from './About';
import Work from './Work';

const Container = styled('div')`
  margin: 1.6em 0 1em 0;
  position: relative;
  display: grid;
  justify-content: center;
  align-items: start;

  ${screen.mobile} {
    margin: 1em 0 0 0;
  }
`;

const Subcontainer = styled('div')`
  grid-column: 1;
  grid-row: 1;

  transition: opacity 600ms;
  &[aria-hidden='true'] {
    visibility: hidden;
    opacity: 0;
  }
`;

const Bio: FC = () => {
  const displayedSection = useSiteStore((state) => state.displayedSection);

  return (
    <Container>
      <Subcontainer aria-hidden={displayedSection !== 'about'}>
        <About />
      </Subcontainer>
      <Subcontainer aria-hidden={displayedSection !== 'work'}>
        <Work />
      </Subcontainer>
    </Container>
  );
};

export default Bio;
