import Reactotron from "reactotron-react-js";
import { reactotronRedux } from "reactotron-redux";
import sagaPlugin from "reactotron-redux-saga";

const reactotronConfigure = () => {
  const tron = Reactotron.configure()
    .configure()
    .use(reactotronRedux())
    .use(sagaPlugin())
    .connect();

  const __DEV__ = process.env.NODE_ENV === "development";

  if (__DEV__) {
    console.tron = tron;
  } else {
    console.tron.log = (...rest) => console.log(...rest);
  }

  tron.clear();
};

export default reactotronConfigure;
