export const Types = {
  SET_PASSWORD: 'SET_PASSWORD/SET_PASSWORD',
  SUCCESS: 'SET_PASSWORD/SUCCESS',
  FAIL: 'SET_PASSWORD/FAIL',
};

const INITIAL_STATE = {
  loading: false,
  error: null,
  errorStatus: null,
};

export default function SetPassword(state = INITIAL_STATE, action) {
  const { SET_PASSWORD, SUCCESS, FAIL } = Types;
  switch (action.type) {
    case SET_PASSWORD:
      return { ...state, loading: true, error: null };
    case SUCCESS:
      return { ...state, loading: false, error: false };
    case FAIL:
      return {
        ...state,
        loading: false,
        error: true,
        errorStatus: action.payload,
      };
    default:
      return state;
  }
}

export const Creators = {
  callSetPassword: payload => ({
    type: Types.SET_PASSWORD,
    payload,
  }),
  setPasswordSuccess: () => ({
    type: Types.SUCCESS,
  }),
  setPasswordFail: payload => ({
    type: Types.FAIL,
    payload,
  }),
};
