import React, { useEffect, useState } from "react";
import {
  Section,
  SectionHeader,
  HeaderTitle,
} from "../components/Layouts/styles";

import _ from "lodash";
import { IconButton } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import useStores from "../stores/useStores";
import { observer } from "mobx-react";
import Table from "../components/Layouts/Categories/Table";
import Dialog from "../components/Layouts/Categories/Dialog";

function Categories() {
  const [dialog, setDialog] = useState(false);
  const { appStore } = useStores();

  // Fetch Categories
  useEffect(() => {
    appStore.fetchCategories();
  }, [appStore]);

  // Clear Category Selection
  useEffect(() => {
    if (!dialog) {
      appStore.clearSelectedCategory();
    }
  }, [dialog, appStore]);

  const onSubmit = (category) => {
    if (_.isEmpty(category.id)) {
      appStore.createCategory(category);
    } else {
      appStore.editCategory(category);
    }
  };

  const onEdit = (id) => {
    appStore.setSelectedCategory(id);
    setDialog(true);
  };

  const onDelete = (id) => {
    appStore.deleteCategory(id);
  };

  return (
    <>
      <Section>
        <SectionHeader justify="end">
          <HeaderTitle component="h2" variant="h4">
            Categorias
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
          categories={appStore.categories}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      </Section>
      <Dialog
        initialCategory={appStore.selectedCategory}
        dialog={dialog}
        setDialog={setDialog}
        onSubmit={onSubmit}
      />
    </>
  );
}

export default observer(Categories);
