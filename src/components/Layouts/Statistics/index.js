import React, { useEffect } from "react";
import { Section, ScrollSection, BoldText } from "../styles";
import HorizontalScroll from "react-scroll-horizontal";
import Statistic from "./Statistic";
import { Typography } from "@material-ui/core";
import { observer } from "mobx-react";
import useStores from "../../../stores/useStores";

function Statistics() {
  const { appStore } = useStores();

  useEffect(() => {
    appStore.fetchStatistics();
  }, [appStore]);

  return (
    <Section>
      <Typography component="h2" variant="h4">
        Estatística
      </Typography>
      <ScrollSection>
        <HorizontalScroll>
          {appStore.statistics.map(({ id, title, content }) => (
            <Statistic key={id} title={title} action={() => {}}>
              <BoldText>{content}</BoldText>
            </Statistic>
          ))}
        </HorizontalScroll>
      </ScrollSection>
    </Section>
  );
}

export default observer(Statistics);
