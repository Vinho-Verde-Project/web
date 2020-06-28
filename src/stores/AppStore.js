import { observable, action, runInAction } from "mobx";
import Statistic from "../models/Statistic";
import { Post } from "../models/Post";
import { v4 as uuid } from "uuid";
import Category from "../models/Category";
import Product from "../models/Product";
import Stock from "../models/Stock";
import Wine from "../models/Wine";
import Task from "../models/Task";
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

  wines: [],
  selectedWine: null,

  tasks: [],
  selectedTask: null,
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
appStore.fetchProducts = action(() => {
  const body = {
    query: `{
      products {
        id
        desc
        type
        category {
          id
          desc
          characteristics
        }
      }
    }
  `,
  };
  api
    .post("/", body)
    .then(({ data }) =>
      runInAction(() => {
        appStore.products = data.products.map(
          ({ id, desc, type, category }) =>
            new Product(
              id,
              desc,
              new Category(
                category.id,
                category.desc,
                category.characteristics
              ),
              type
            )
        );
      })
    )
    .catch((err) => console.log(err));
});

appStore.deleteProduct = action((id) => {
  console.log(id);

  const { title, category, type } = appStore.products.find(
    (product) => product.id === id
  );

  const body = {
    query: `
      mutation ($product: InputProductType) {
        deleteProduct(product: $product) {
          id
        }
      }
    `,
    variables: `
      {
        "product": ${JSON.stringify({
          id,
          desc: title,
          categoryId: category.id,
          type: type,
        })}
      }
    `,
  };

  api
    .post("/", body)
    .then(({ status }) => {
      runInAction(() => {
        console.log(`deleteProduct response with status ${status}`);
        appStore.fetchProducts();
      });
    })
    .catch((err) => console.log(err));
});

appStore.createProduct = action(({ title, category, type }) => {
  const body = {
    query: `
        mutation ($product: InputProductType) {
          addProduct(product: $product) {
            id
          }
        }
      `,
    variables: `
        {
          "product": ${JSON.stringify({
            id: 0,
            desc: title,
            categoryId: category.id,
            type: type,
          })}
        }
      `,
  };

  api
    .post("/", body)
    .then(({ status, ...response }) =>
      runInAction(() => {
        console.log(`createProduct response with status ${status}`);
        console.log(response);
        appStore.fetchProducts();
      })
    )
    .catch((err) => console.log(err));
});

appStore.editProduct = action(({ id, title, category, type }) => {
  const body = {
    query: `
        mutation ($product: InputProductType) {
          updateProduct(product: $product) {
            id
          }
        }
      `,
    variables: `
        {
          "product": ${JSON.stringify({
            id,
            desc: title,
            categoryId: category.id,
            type: type,
          })}
        }
      `,
  };

  api
    .post("/", body)
    .then(({ status, ...response }) =>
      runInAction(() => {
        console.log(`editProduct response with status ${status}`);
        console.log(response);
        appStore.fetchProducts();
      })
    )
    .catch((err) => console.log(err));
});

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
            new Category(id, desc, characteristics, [])
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

appStore.createCategory = action(({ title, description }) => {
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

appStore.editCategory = action(({ id, title, description }) => {
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
});

appStore.setSelectedCategory = action((id) => {
  appStore.selectedCategory = appStore.categories.find(
    (category) => category.id === id
  );
});

appStore.clearSelectedCategory = action(() => {
  appStore.selectedCategory = null;
});

//
// Wines
//
appStore.fetchWines = action(() => {
  const body = {
    query: `{
      wines {
        id
        batch
        productionDate
        shelfLife
        categoryId
        taskId
      }
    }`,
  };

  api
    .post("/", body)
    .then(({ data }) => {
      const { wines } = data;
      runInAction(() => {
        appStore.wines = wines.map(
          ({ id, batch, productionDate, shelfLife, categoryId, taskId }) =>
            new Wine(id, batch, productionDate, shelfLife, categoryId, taskId)
        );
      });
    })
    .catch((err) => console.log(err));
});

appStore.setSelectedWine = action((id) => {
  appStore.selectedWine = appStore.wines.find((wine) => wine.id === id);
});

appStore.clearSelectedWine = action(() => {
  appStore.selectedWine = null;
});

appStore.createWine = action(
  ({ id = 0, batch, productionDate, shelfLife, categoryId, taskId }) => {
    const body = {
      query: `
      mutation($wine: InputWineType) {
          addWine(wine:$wine) {
            id
            batch
          }
        }
      `,
      variables: `
        {
          "wine": ${JSON.stringify({
            id: 0,
            batch: batch,
            productionDate: productionDate,
            shelfLife: shelfLife,
            categoryId: categoryId,
            taskId: taskId,
          })}
        }
      `,
    };

    api
      .post("/", body)
      .then(({ status }) => {
        runInAction(() => {
          console.log(`createWine response with status ${status}`);
          appStore.fetchWines();
        });
      })
      .catch((err) => console.log(err));
  }
);

appStore.deleteWine = action((id) => {

  const { batch, productionDate, shelfLife, categoryId, taskId  } = appStore.wines.find(
    (wine) => wine.id === id
  );

  const body = {
    query: `
    mutation($wine: InputWineType) {
        deleteWine(wine:$wine) {
          id
        }
      }
    `,
    variables: `
      {
        "wine": ${JSON.stringify({
          id: id,
          batch: batch,
          productionDate: productionDate,
          shelfLife: shelfLife,
          categoryId: categoryId,
          taskId: taskId,
        })}
      }
    `,
  };

  api
    .post("/", body)
    .then(({ status }) => {
      runInAction(() => {
        console.log(`deleteWine response with status ${status}`);
        appStore.fetchWines();
      });
    })
    .catch((err) => console.log(err));
});

//
// Tasks
//
appStore.fetchTasks = action(() => {
  const body = {
    query: `{
      tasks { 
        id
        startedAt
        endedAt
        status
      }
    }`,
  };

  api
    .post("/", body)
    .then(({ data }) => {
      const { tasks } = data;
      runInAction(() => {
        appStore.tasks = tasks.map(
          ({ id, startedAt, endedAt, status }) =>
            new Task(id, startedAt, endedAt, status)
        );
      });
    })
    .catch((err) => console.log(err));
});

appStore.setSelectedTask = action((id) => {
  appStore.selectedTask = appStore.tasks.find((task) => task.id === id);
});

appStore.clearSelectedTask = action(() => {
  appStore.selectedTask = null;
});

appStore.createTask = action(({ id=0, startedAt, endedAt, status }) => {
  const body = {
    query: `
      mutation($task: InputTaskType) {
        addTask(task:$task){
            id
          }
        }
      `,
    variables: `
        {
          "task": ${JSON.stringify({
            id: 0,
            startedAt: startedAt,
            endedAt: endedAt,
            status: status,
          })}
        }
      `,
  };

  api
    .post("/", body)
    .then(({ status }) => {
      runInAction(() => {
        console.log(`createTask response with status ${status}`);
        appStore.fetchTasks();
      });
    })
    .catch((err) => console.log(err));
});

appStore.deleteTask = action((id) => {

  const { startedAt, endedAt, status } = appStore.tasks.find(
    (task) => task.id === id
  );

  const body = {
    query: `
    mutation($task: InputTaskType) {
        deleteTask(task:$task) {
          id
        }
      }
    `,
    variables: `
      {
        "task": ${JSON.stringify({
          id: id,
          startedAt: startedAt,
          endedAt: endedAt,
          status: status,
        })}
      }
    `,
  };

  api
    .post("/", body)
    .then(({ status }) => {
      runInAction(() => {
        console.log(`deleteTask response with status ${status}`);
        appStore.fetchTasks();
      });
    })
    .catch((err) => console.log(err));
});

export default appStore;
