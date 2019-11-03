export const Types = {
  LOGIN: "LOGIN/LOGIN",
  SUCCESS: "LOGIN/SUCCESS",
  FAIL: "LOGIN/FAIL"
};

const INITIAL_STATE = {
  loading: false,
  error: null,
  data: null
};

export default function Login(state = INITIAL_STATE, action) {
  const { LOGIN, SUCCESS, FAIL } = Types;
  switch (action.type) {
    case LOGIN:
      return { ...state, loading: true, error: null };
    case SUCCESS:
      return { ...state, loading: false, error: false, data: action.payload };
    case FAIL:
      return { ...state, loading: false, error: true };
    default:
      return state;
  }
}

export const Creators = {
  callLogin: payload => ({
    type: Types.LOGIN,
    payload
  }),
  loginSuccess: payload => ({
    type: Types.SUCCESS,
    payload
  }),
  loginFail: () => ({
    type: Types.FAIL
  })
};
