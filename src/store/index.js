import { createStore, applyMiddleware, compose } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import rootReducers from "./ducks";
import rootSagas from "./sagas";
import api from "services";

import reactotronConfigure from "config";
import createSagaMiddleware from "redux-saga";

reactotronConfigure();

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["login", "register", "forgotPassword", "device", "toast"]
};

const persistedReducer = persistReducer(persistConfig, rootReducers);

const __DEV__ = process.env.NODE_ENV === "development";

const sagaMonitor = __DEV__ ? console.tron.createSagaMonitor() : null;

const sagaMiddleware = createSagaMiddleware({ sagaMonitor });

const middlewares = [];
middlewares.push(sagaMiddleware);

const composer = __DEV__
  ? compose(
      applyMiddleware(...middlewares),
      console.tron.createEnhancer()
    )
  : compose(applyMiddleware(...middlewares));

const store = createStore(persistedReducer, composer);

const persistor = persistStore(store);

sagaMiddleware.run(rootSagas);

api.setupInterceptor(store);

export { store, persistor };
