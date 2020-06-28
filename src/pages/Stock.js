import React, { useState, useEffect } from "react";
import {
  Section,
  SectionHeader,
  HeaderTitle,
} from "../components/Layouts/styles";
import { IconButton, Tabs, Tab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import Table from "../components/Layouts/Stock/Table";
import Dialog from "../components/Layouts/Stock/Dialog";
import { observer } from "mobx-react";
import useStores from "../stores/useStores";
import _ from "lodash";

function Stock() {
  const [dialog, setDialog] = useState(false);
  const [tab, setTab] = useState("PRODUCT");
  const { appStore } = useStores();

  useEffect(() => {
    appStore.fetchStocks();
    appStore.fetchWarehouses();
    appStore.fetchProducts();
    appStore.fetchWines();
  }, [appStore, tab]);

  // Clear Category Selection
  useEffect(() => {
    if (!dialog) {
      appStore.clearSelectedStock();
    }
  }, [dialog, appStore]);

  const onSubmit = (type, stock) => {
    if (type === "CREATE") {
      appStore.createStock(stock);
    } else {
      appStore.editStock(stock);
    }
    appStore.clearSelectedStock();
  };

  const onEdit = (id) => {
    appStore.setSelectedStock(id);
    setDialog(true);
  };

  const onDelete = (id) => {
    appStore.deleteStock(id);
  };

  return (
    <>
      <Section>
        <SectionHeader justify="end">
          <HeaderTitle component="h2" variant="h4">
            Itens em Estoque
          </HeaderTitle>
          <div>
            <Tabs
              value={tab}
              onChange={(event, value) => setTab(value)}
              scrollButtons="auto"
              variant="scrollable"
            >
              <Tab value="PRODUCT" label="Produtos" />
              <Tab value="WINE" label="Vinhos" />
            </Tabs>
          </div>
          <div>
            <IconButton
              aria-label="account of current user"
              aria-haspopup="true"
              color="primary"
              onClick={() => setDialog(true)}
            >
              <AddIcon />
            </IconButton>
          </div>
        </SectionHeader>
        <Table
          stocks={appStore.stocks.filter((stock) => stock.type === tab)}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </Section>
      <Dialog
        warehouses={appStore.warehouses}
        products={appStore.products}
        wines={appStore.wines}
        initialStock={appStore.selectedStock}
        onSubmit={onSubmit}
        dialog={dialog}
        setDialog={setDialog}
      />
    </>
  );
}

export default observer(Stock);
