import React, { useState, useEffect } from "react";
import { Section, HeaderTitle, SectionHeader, LimitedSection } from "../styles";
import { Tabs, Tab } from "@material-ui/core";
import Item from "./Item";
import { observer } from "mobx-react";
import useStores from "../../../stores/useStores";

function Feed() {
  const [tab, setTab] = useState("ALL");
  const { appStore } = useStores();

  useEffect(() => {
    appStore.fetchFeed(tab);
  }, [appStore, tab]);

  return (
    <Section>
      <SectionHeader>
        <HeaderTitle component="h2" variant="h4">
          Feed
        </HeaderTitle>
        <Tabs
          value={tab}
          onChange={(event, value) => setTab(value)}
          scrollButtons="auto"
          variant="scrollable"
        >
          <Tab value="ALL" label="Todos" />
          <Tab value="PRODUCTION" label="Produção" />
          <Tab value="STOCK" label="Estoque" />
          <Tab value="FAIL" label="Falhas" />
        </Tabs>
      </SectionHeader>
      <LimitedSection>
        {appStore.feed.map(({ id, content, ...post }) => (
          <Item key={id} markdown={content} {...post} />
        ))}
      </LimitedSection>
    </Section>
  );
}

export default observer(Feed);
