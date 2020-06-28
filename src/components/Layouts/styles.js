import styled from "styled-components";
import { Typography } from "@material-ui/core";

const Section = styled.div`
  display: grid;
  grid-template-rows: 50px 1fr;
  margin: 2rem;
  gap: 2rem;
`;

const LimitedSection = styled.div`
  display: grid;
  gap: 1rem;
  max-width: 900px;
  justify-self: center;
`;

const LimitedSectionTwoCol = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 900px;
  justify-self: center;
`;

const GridSection = styled(LimitedSection)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-auto-rows: auto;
`;

const ScrollSection = styled.div`
  display: flex;
  width: 100%;
  height: 250px;
  align-items: center;
`;

const SectionHeader = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 1rem;
  align-items: center;
  justify-items: ${({ justify }) => justify || "center"};
`;

const HeaderTitle = styled(Typography)`
  margin-right: 3rem;
`;

const BoldText = styled(Typography)`
  display: flex;
  flex: 1;
  align-content: center;
  justify-content: center;
  font-weight: bold;
  font-size: 32px;
`;
export {
  Section,
  LimitedSection,
  LimitedSectionTwoCol,
  GridSection,
  ScrollSection,
  SectionHeader,
  HeaderTitle,
  BoldText,
};
