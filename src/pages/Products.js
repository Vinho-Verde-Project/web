import React, { useState, useEffect } from "react";
import {
  Section,
  SectionHeader,
  HeaderTitle,
} from "../components/Layouts/styles";
import { IconButton, Tabs, Tab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import Table from "../components/Layouts/Products/Table";
import Dialog from "../components/Layouts/Products/Dialog";
import { observer } from "mobx-react";
import useStores from "../stores/useStores";
import _ from "lodash";

function Products() {
  const [dialog, setDialog] = useState(false);
  const [tab, setTab] = useState("RAW");
  const { appStore } = useStores();

  useEffect(() => {
    appStore.fetchProducts(tab);
    appStore.fetchCategories();
    console.log(appStore.categories);
  }, [appStore, tab]);

  // Clear Category Selection
  useEffect(() => {
    if (!dialog) {
      appStore.clearSelectedProduct();
    }
  }, [dialog, appStore]);

  const onSubmit = (type, product) => {
    if (type === "CREATE") {
      appStore.createProduct(product);
    } else {
      appStore.editProduct(product);
    }
    appStore.clearSelectedProduct();
  };

  const onEdit = (id) => {
    appStore.setSelectedProduct(id);
    setDialog(true);
  };

  const onDelete = (id) => {
    appStore.deleteProduct(id);
  };

  return (
    <>
      <Section>
        <SectionHeader justify="end">
          <HeaderTitle component="h2" variant="h4">
            Produtos
          </HeaderTitle>
          <div>
            <Tabs
              value={tab}
              onChange={(event, value) => setTab(value)}
              scrollButtons="auto"
              variant="scrollable"
            >
              <Tab value="RAW" label="Secos" />
              <Tab value="WET" label="Liquidos" />
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
          products={appStore.products}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </Section>
      <Dialog
        initialProduct={appStore.selectedProduct}
        onSubmit={onSubmit}
        categories={appStore.categories}
        dialog={dialog}
        setDialog={setDialog}
      />
    </>
  );
}

export default observer(Products);
