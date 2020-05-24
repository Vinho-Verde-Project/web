import { observable, action } from "mobx";
import Statistic from "../models/Statistic";
import { Post } from "../models/Post";
import { v4 as uuid } from "uuid";
import Category from "../models/Category";

const appStore = observable({
  statistics: [],
  feed: [],
  categories: [],
  selectedCategory: null,
});

appStore.fetchStatistics = action(() => {
  appStore.statistics.push(
    new Statistic(uuid(), "Statistic 1", "TEXT", "100"),
    new Statistic(uuid(), "Statistic 2", "TEXT", "200"),
    new Statistic(uuid(), "Statistic 3", "TEXT", "300"),
    new Statistic(uuid(), "Statistic 4", "TEXT", "400"),
    new Statistic(uuid(), "Statistic 5", "TEXT", "500")
  );
});

appStore.fetchFeed = action((filter) => {
  appStore.feed = [
    new Post(
      uuid(),
      "PRODUCTION",
      "100.12.3200",
      "vinho verde",
      "COMPLETE",
      "lorem ipsum",
      new Date()
    ),
    new Post(
      uuid(),
      "STOCK",
      "Garrafa xyz 500ml",
      "garrafa",
      "PROGRESS",
      "volume: 500ml...",
      new Date()
    ),
    new Post(
      uuid(),
      "FAIL",
      "Titulo da falha",
      "etapa",
      "FAIL",
      "lorem ipsum o erro aqui",
      new Date()
    ),
  ].filter((post) => post.type === filter || filter === "ALL");
});

//
// Category
//
appStore.fetchCategories = action(() => {
  appStore.categories = [
    new Category(
      uuid(),
      "Garrafa",
      "RAW",
      "Garrafa de vidro para armazenamento do vinho",
      [
        { key: "Volume", value: "ml" },
        { key: "Diametro", value: "cm" },
        { key: "Quantidade", value: "un" },
      ]
    ),
    new Category(uuid(), "Rolha", "RAW", "", [
      { key: "Diametro", value: "cm" },
      { key: "Quantidade", value: "un" },
    ]),
  ];
});

appStore.deleteCategory = action((id) => {
  appStore.categories = appStore.categories.filter(
    (category) => category.id !== id
  );
});

appStore.createCategory = action(({ title, type, description, attributes }) => {
  appStore.categories.push(
    new Category(uuid(), title, type, description, attributes)
  );
});

appStore.editCategory = action(
  ({ id, title, type, description, attributes }) => {
    console.log({ title, type, description, attributes });

    const index = appStore.categories.findIndex(
      (category) => category.id === id
    );

    if (index > -1) {
      appStore.categories[index] = new Category(
        id,
        title,
        type,
        description,
        attributes
      );
    }
  }
);

appStore.setSelectedCategory = action((id) => {
  appStore.selectedCategory = appStore.categories.find(
    (category) => category.id === id
  );
});

appStore.clearSelectedCategory = action(() => {
  appStore.selectedCategory = null;
});

export default appStore;
