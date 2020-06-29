import React from "react";
import styled from "styled-components";
import { Card, CardHeader, Chip } from "@material-ui/core";
import DoneIcon from "@material-ui/icons/DoneAll";

const StyledCard = styled(Card)`
  display: flex;
  flex-direction: row;
  height: auto;
  overflow: hidden;
`;
const StyledImage = styled.div`
  display: flex;
  width: 150px;
  height: 100%;
  overflow: hidden;
  align-items: center;
  justify-content: center;
`;

const StyledContent = styled.div`
  display: grid;
  min-width: 350px;
  grid-template-rows: auto 1fr;
  flex: 1;
  overflow: hidden;
  padding: 0.5rem 1rem;
  align-items: start;
`;

const StyledHeader = styled(CardHeader)`
  width: 100%;
`;

export default function FeedItem({ title, subheader, status, markdown }) {
  return (
    <StyledCard>
      <StyledImage>
        <img src="https://via.placeholder.com/200" alt="placeholder" />
      </StyledImage>
      <StyledContent>
        <StyledHeader
          title={title}
          subheader={subheader}
          action={<Chip icon={<DoneIcon />} label={status} />}
        />
        <div>
          <p>{markdown}</p>
        </div>
      </StyledContent>
    </StyledCard>
  );
}
