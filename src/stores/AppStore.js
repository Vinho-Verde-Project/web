import { observable, action } from "mobx";
import Statistic from "../models/Statistic";
import { Post } from "../models/Post";

const appStore = observable({
  statistics: [],
  feed: [],
});

appStore.fetchStatistics = action(() => {
  appStore.statistics.push(
    new Statistic(0, "Statistic 1", "TEXT", "100"),
    new Statistic(1, "Statistic 2", "TEXT", "200"),
    new Statistic(2, "Statistic 3", "TEXT", "300"),
    new Statistic(3, "Statistic 4", "TEXT", "400"),
    new Statistic(4, "Statistic 5", "TEXT", "500")
  );
});

appStore.fetchFeed = action((filter) => {
  appStore.feed = [
    new Post(
      0,
      "PRODUCTION",
      "100.12.3200",
      "vinho verde",
      "COMPLETE",
      "lorem ipsum",
      new Date()
    ),
    new Post(
      1,
      "STOCK",
      "Garrafa xyz 500ml",
      "garrafa",
      "PROGRESS",
      "volume: 500ml...",
      new Date()
    ),
    new Post(
      2,
      "FAIL",
      "Titulo da falha",
      "etapa",
      "FAIL",
      "lorem ipsum o erro aqui",
      new Date()
    ),
  ].filter((post) => post.type === filter || filter === "ALL");
});

export default appStore;
