import React, { useState, useEffect } from "react";
import { Section, SectionHeader, HeaderTitle, LimitedSectionTwoCol } from "../styles";
import useStores from "../../../stores/useStores";
import { observer } from "mobx-react";

import Dialog from "./Dialog";
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
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";


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

    // Fetch Tasks
    useEffect(() => {
      appStore.fetchTasks();
    }, [appStore]);
  
    // Clear Task Selection
    useEffect(() => {
      if (!dialog) {
        appStore.clearSelectedTask();
      }
    }, [dialog, appStore]);

    const onSubmit = (type, task) => {
      if (type === "CREATE") {
        appStore.createTask(task);
      } else {
        //appStore.editTask(wine);
      }
      appStore.clearSelectedTask();
    };

    const onDelete = (id) => {
      appStore.deleteTask(id);
    };

  return (
    <Section>
      <SectionHeader justify="end">
        <HeaderTitle component="h2" variant="h4">
          Tarefas
        </HeaderTitle>
        <IconButton
            aria-label="account of current user"
            aria-haspopup="true"
            color="primary"
            onClick={() => setDialog(true)}
          >
            <AddIcon />
          </IconButton>
        
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
          <IconButton onClick={() => onDelete(id)}>
            <DeleteIcon />
          </IconButton>
        </StyledCardActions>
      </StyledCard>
      ))}
      </LimitedSectionTwoCol>

    <Dialog
      initialTask={appStore.selectedTask}
      dialog={dialog}
      setDialog={setDialog}
      onSubmit={onSubmit}
    />

    </Section>

  );
}

export default observer(Task);