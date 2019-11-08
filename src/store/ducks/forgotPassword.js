export const Types = {
  FORGOT_PASSWORD: "FORGOT_PASSWORD/FORGOT_PASSWORD",
  SUCCESS: "FORGOT_PASSWORD/SUCCESS",
  FAIL: "FORGOT_PASSWORD/FAIL"
};

const INITIAL_STATE = {
  loading: false,
  error: null,
  errorStatus: null
};

export default function ForgotPassword(state = INITIAL_STATE, action) {
  const { FORGOT_PASSWORD, SUCCESS, FAIL } = Types;
  switch (action.type) {
    case FORGOT_PASSWORD:
      return { ...state, loading: true, error: null };
    case SUCCESS:
      return { ...state, loading: false, error: false };
    case FAIL:
      return {
        ...state,
        loading: false,
        error: true,
        errorStatus: action.payload
      };
    default:
      return state;
  }
}

export const Creators = {
  callForgotPassword: payload => ({
    type: Types.FORGOT_PASSWORD,
    payload
  }),
  forgotPasswordSuccess: () => ({
    type: Types.SUCCESS
  }),
  forgotPasswordFail: payload => ({
    type: Types.FAIL,
    payload
  })
};
