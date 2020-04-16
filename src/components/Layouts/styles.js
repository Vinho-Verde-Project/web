import styled from "styled-components";
import { Typography } from "@material-ui/core";

const Section = styled.div`
  display: grid;
  grid-template-rows: 50px 1fr;
  margin: 2rem;
  gap: 1rem;
`;

const LimitedSection = styled.div`
  display: grid;
  gap: 1rem;
  max-width: 900px;
  justify-self: center;
`;

const ScrollSection = styled.div`
  display: flex;
  width: 100%;
  height: 250px;
  align-items: center;
`;

const SectionHeader = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1rem;
  align-items: center;
  justify-items: center;
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
  ScrollSection,
  SectionHeader,
  HeaderTitle,
  BoldText,
};