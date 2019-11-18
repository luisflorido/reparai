export const Types = {
  LOGIN: "LOGIN/LOGIN",
  SUCCESS: "LOGIN/SUCCESS",
  FAIL: "LOGIN/FAIL",
  LOGOUT: "LOGIN/LOGOUT"
};

const INITIAL_STATE = {
  loading: false,
  error: null,
  data: localStorage.getItem("data")
};

export default function Login(state = INITIAL_STATE, action) {
  const { LOGIN, SUCCESS, FAIL, LOGOUT } = Types;
  switch (action.type) {
    case LOGIN:
      return { ...state, loading: true, error: null };
    case SUCCESS:
      localStorage.setItem("data", JSON.stringify(action.payload));
      return {
        ...state,
        loading: false,
        error: false,
        data: localStorage.getItem("data")
      };
    case FAIL:
      localStorage.removeItem("data");
      return {
        ...state,
        loading: false,
        error: true,
        data: localStorage.getItem("data")
      };
    case LOGOUT:
      localStorage.removeItem("data");
      return { ...state, data: localStorage.getItem("data") };
    default:
      return state;
  }
}

export const Creators = {
  callLogin: payload => ({
    type: Types.LOGIN,
    payload
  }),
  callLogout: () => ({
    type: Types.LOGOUT
  }),
  loginSuccess: payload => ({
    type: Types.SUCCESS,
    payload
  }),
  loginFail: () => ({
    type: Types.FAIL
  })
};
