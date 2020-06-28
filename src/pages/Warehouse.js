import React, { useEffect, useState } from "react";
import {
  Section,
  SectionHeader,
  HeaderTitle,
} from "../components/Layouts/styles";

import { IconButton } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import useStores from "../stores/useStores";
import { observer } from "mobx-react";
import Table from "../components/Layouts/Warehouses/Table";
import Dialog from "../components/Layouts/Warehouses/Dialog";

function Warehouse() {
  const [dialog, setDialog] = useState(false);
  const { appStore } = useStores();

  useEffect(() => {
    appStore.fetchWarehouses();
  }, [appStore]);

  useEffect(() => {
    if (!dialog) {
      appStore.clearSelectedWarehouse();
    }
  }, [dialog, appStore]);

  const onSubmit = (type, warehouse) => {
    if (type === "CREATE") {
      appStore.createWarehouse(warehouse);
    } else {
      appStore.editWarehouse(warehouse);
    }
    appStore.clearSelectedWarehouse();
  };

  const onEdit = (id) => {
    appStore.setSelectedWarehouse(id);
    setDialog(true);
  };

  const onDelete = (id) => {
    appStore.deleteWarehouse(id);
  };

  return (
    <>
      <Section>
        <SectionHeader justify="end">
          <HeaderTitle component="h2" variant="h4">
            Armazéns
          </HeaderTitle>
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
          warehouses={appStore.warehouses}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      </Section>
      <Dialog
        initialWarehouse={appStore.selectedWarehouse}
        dialog={dialog}
        setDialog={setDialog}
        onSubmit={onSubmit}
      />
    </>
  );
}

export default observer(Warehouse);
