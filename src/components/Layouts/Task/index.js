import React, { useState, useEffect } from "react";
import { Section, SectionHeader, HeaderTitle, LimitedSectionTwoCol } from "../styles";
import useStores from "../../../stores/useStores";
import { observer } from "mobx-react";

//import Dialog from "../components/Layouts/Wine/Dialog";
import AddIcon from "@material-ui/icons/Add";
import {
  IconButton,
  Card,
  CardHeader,
  CardContent,
  CardActions,
} from "@material-ui/core";
import DoneIcon from "@material-ui/icons/Done";
import ReportIcon from "@material-ui/icons/Report";
import styled from "styled-components";

const StyledCard = styled(Card)`
  display: flex;
  flex: 1;
  flex-direction: row;
  width: 100%;
  overflow: hidden;
`;

const StyledCardContent = styled(CardContent)`
  .item {
    display: grid;
    grid-template-columns: auto 1fr;
    
    gap: 0.5rem;
    .key {
      text-align: right;
      font-weight: 600;
    }

    .value {
      text-align: left;
      font-weight: 400;
    }
  }
`;

const StyledCardActions = styled(CardActions)`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  flex-direction: column;
`;

function Task() {
  const { appStore } = useStores();
    const [dialog, setDialog] = useState(false);

    // Fetch Categories
    useEffect(() => {
      appStore.fetchTasks();
    }, [appStore]);
  
    // Clear Category Selection
    useEffect(() => {
      if (!dialog) {
        appStore.clearSelectedTask();
      }
    }, [dialog, appStore]);

  return (
    <Section>
      <SectionHeader>
        <HeaderTitle component="h2" variant="h4">
          Tarefas
        </HeaderTitle>
      </SectionHeader>
      <LimitedSectionTwoCol>
      {appStore.tasks.map(({id, startedAt, endedAt, status}) => (
          <StyledCard key={id}>
          <div>
          <CardHeader title={`Tarefa ${id}`} subheader={status} />
          <StyledCardContent>
            <div className="item">
              <span className="key">ID:</span>
              <span className="value">{id}</span>
            </div>
            <div className="item">
              <span className="key">Início:</span>
              <span className="value">{startedAt}</span>
            </div>
            <div className="item">
              <span className="key">Término:</span>
              <span className="value">{endedAt}</span>
            </div>
            <div className="item">
              <span className="key">Status:</span>
              <span className="value">{status}</span>
            </div>
          </StyledCardContent>
        </div>
        <StyledCardActions>
          <IconButton>
            <ReportIcon />
          </IconButton>
          <IconButton>
            <DoneIcon />
          </IconButton>
        </StyledCardActions>
      </StyledCard>
      ))}
      </LimitedSectionTwoCol>
    </Section>
  );
}

export default observer(Task);