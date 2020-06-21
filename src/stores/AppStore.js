import { observable, action, runInAction } from "mobx";
import Statistic from "../models/Statistic";
import { Post } from "../models/Post";
import { v4 as uuid } from "uuid";
import Category from "../models/Category";
import Product from "../models/Product";
import Stock from "../models/Stock";
import api from "../services/api";

const appStore = observable({
  statistics: [],
  feed: [],

  products: [],
  selectedProduct: null,

  categories: [],
  selectedCategory: null,

  stocks: [],
  selectedStock: null,
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
// Stock
//
appStore.fetchStocks = action((filter) => {
  appStore.stocks = [
    new Stock(
      uuid(),
      "Doce Campos",
      "WET", // New -> Product/Wine
      100,
      "Un.",
      "A2 Leste",
      new Date().toLocaleString(),
      "Nuno Silva" // New -> Emplooye
    ),
    new Stock(
      uuid(),
      "Gallard Premium",
      "WET", // New -> Product/Wine
      250,
      "Un.",
      "A5 Leste",
      new Date().toLocaleString(),
      "Marcos Conti" // New -> Emplooye
    ),
    new Stock(
      uuid(),
      "Uva Crimson",
      "RAW", // New -> Product/Wine
      88,
      "KG",
      "B4 Oeste",
      new Date().toLocaleString(),
      "Maria Joana" // New -> Emplooye
    ),
  ].filter((stock) => stock.type === filter);
});

appStore.setSelectedStock = action((id) => {
  appStore.selectedStock = appStore.stocks.find((stock) => stock.id === id);
});

appStore.clearSelectedStock = action(() => {
  appStore.selectedStock = null;
});

appStore.deleteStock = action((id) => {
  appStore.stocks = appStore.stocks.filter((stock) => stock.id !== id);
});

appStore.editStock = action(
  ({ id, title, type, quantity, unity, warehouse, entryDate, employee }) => {
    const index = appStore.stocks.findIndex((stock) => stock.id === id);

    if (index !== -1) {
      appStore.stocks[index] = new Stock(
        id,
        title,
        type,
        quantity,
        unity,
        warehouse,
        entryDate,
        employee
      );
    }
  }
);

appStore.createStock = action(
  ({ title, type, quantity, unity, warehouse, entryDate, employee }) => {
    appStore.stocks.push(
      new Stock(
        uuid(),
        title,
        type,
        quantity,
        unity,
        warehouse,
        entryDate,
        employee
      )
    );
  }
);

//
// Products
//
appStore.fetchProducts = action((filter) => {
  appStore.products = [
    new Product(
      uuid(),
      "Garrafa XYZ",
      new Category(
        "0101",
        "Garrafa",
        "RAW",
        "Garrafa de vidro para armazenamento do vinho",
        [
          { key: "Volume", value: "ml" },
          { key: "Diametro", value: "cm" },
        ]
      ),
      10,
      "Un.",
      [
        {
          attribute: { key: "Volume", value: "ml" },
          value: 500,
        },
        {
          attribute: { key: "Diametro", value: "cm" },
          value: 2,
        },
      ]
    ),
    new Product(
      uuid(),
      "Mosto para vinho X",
      new Category(
        uuid(),
        "Mosto",
        "WET",
        "Mosto utilizado na produção de vinho",
        []
      ),
      10,
      "Litro",
      []
    ),
  ].filter((product) => product.category.type === filter);
});

appStore.deleteProduct = action((id) => {
  appStore.products = appStore.products.filter((product) => product.id !== id);
});

appStore.createProduct = action(
  ({ title, category, quantity, unity, attributes }) => {
    console.log({ title, category, quantity, unity, attributes });
    appStore.products.push(
      new Product(uuid(), title, category, quantity, unity, attributes)
    );
  }
);

appStore.editProduct = action(
  ({ id, title, category, quantity, unity, attributes }) => {
    const index = appStore.products.findIndex((product) => product.id === id);

    if (index > -1) {
      appStore.products[index] = new Product(
        id,
        title,
        category,
        quantity,
        unity,
        attributes
      );
    }
  }
);

appStore.setSelectedProduct = action((id) => {
  appStore.selectedProduct = appStore.products.find(
    (product) => product.id === id
  );
});

appStore.clearSelectedProduct = action(() => {
  appStore.selectedProduct = null;
});

//
// Categories
//
appStore.fetchCategories = action(() => {
  const body = {
    query: `{
      categories {
        id
        desc
        characteristics
      }
    }`,
  };

  api
    .post("/", body)
    .then(({ data }) => {
      const { categories } = data;
      runInAction(() => {
        appStore.categories = categories.map(
          ({ id, desc, characteristics }) =>
            new Category(id, desc, "RAW", characteristics, [])
        );
      });
    })
    .catch((err) => console.log(err));
});

appStore.deleteCategory = action((id) => {
  const { title, description } = appStore.categories.find(
    (category) => category.id === id
  );

  const body = {
    query: `
      mutation ($category: InputCategoryType) {
        deleteCategory(category: $category) {
          id
          desc
        }
      }
    `,
    variables: `
      {
        "category": ${JSON.stringify({
          id,
          desc: title,
          characteristics: description,
        })}
      }
    `,
  };

  api
    .post("/", body)
    .then(({ status }) => {
      runInAction(() => {
        console.log(`deleteCategory response with status ${status}`);
        appStore.fetchCategories();
      });
    })
    .catch((err) => console.log(err));
});

appStore.createCategory = action(({ title, type, description, attributes }) => {
  const body = {
    query: `
        mutation ($category: InputCategoryType) {
          addCategory(category: $category) {
            id
            desc
            characteristics
          }
        }
      `,
    variables: `
        {
          "category": ${JSON.stringify({
            id: 0,
            desc: title,
            characteristics: description,
          })}
        }
      `,
  };

  api
    .post("/", body)
    .then(({ status }) => {
      runInAction(() => {
        console.log(`createCategory response with status ${status}`);
        appStore.fetchCategories();
      });
    })
    .catch((err) => console.log(err));
});

appStore.editCategory = action(
  ({ id, title, type, description, attributes }) => {
    const body = {
      query: `
        mutation ($category: InputCategoryType) {
          updateCategory(category: $category) {
            id
            desc
          }
        }

      `,
      variables: `
        {
          "category": ${JSON.stringify({
            id: id,
            desc: title,
            characteristics: description,
          })}
        }
      `,
    };

    api
      .post("/", body)
      .then(({ status }) => {
        runInAction(() => {
          console.log(`editCategory response with status ${status}`);
          appStore.fetchCategories();
        });
      })
      .catch((err) => console.log(err));
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
