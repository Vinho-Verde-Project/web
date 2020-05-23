import { observable, action } from "mobx";
import Statistic from "../models/Statistic";
import { Post } from "../models/Post";
import { v4 as uuid } from "uuid";
import Category from "../models/Category";

const appStore = observable({
  statistics: [],
  feed: [],
  categories: [],
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

appStore.fetchCategories = action(() => {
  appStore.categories = [
    new Category(
      uuid(),
      "Garrafa",
      "Seco",
      "Garrafa de vidro para armazenamento do vinho",
      [
        { key: "Volume", value: "ml" },
        { key: "Diametro", value: "cm" },
        { key: "Quantidade", value: "un" },
      ]
    ),
    new Category(uuid(), "Rolha", "Seco", "", [
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

export default appStore;
