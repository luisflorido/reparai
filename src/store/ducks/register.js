export const Types = {
  REGISTER: "REGISTER/REGISTER",
  SUCCESS: "REGISTER/SUCCESS",
  FAIL: "REGISTER/FAIL"
};

const INITIAL_STATE = {
  loading: false,
  error: null,
  errorStatus: null,
  data: null
};

export default function Register(state = INITIAL_STATE, action) {
  const { REGISTER, SUCCESS, FAIL } = Types;
  switch (action.type) {
    case REGISTER:
      return { ...state, loading: true, error: null };
    case SUCCESS:
      return { ...state, loading: false, error: false, data: action.payload };
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
  callRegister: payload => ({
    type: Types.REGISTER,
    payload
  }),
  registerSuccess: payload => ({
    type: Types.SUCCESS,
    payload
  }),
  registerFail: payload => ({
    type: Types.FAIL,
    payload
  })
};
