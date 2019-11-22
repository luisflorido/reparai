export const Types = {
  GET: "SERVICE/GET",
  ADD: "SERVICE/ADD",
  DELETE: "SERVICE/DELETE",
  SUCCESS: "SERVICE/SUCCESS",
  FAIL: "SERVICE/FAIL"
};

const INITIAL_STATE = {
  error: null,
  loading: false,
  data: []
};

export default function Service(state = INITIAL_STATE, action) {
  const { GET, ADD, DELETE, SUCCESS, FAIL } = Types;
  switch (action.type) {
    case GET:
      return { ...state, loading: true, error: null };
    case ADD:
      return { ...state, loading: true, error: null };
    case DELETE:
      return { ...state, loading: true, error: null };
    case SUCCESS:
      return { ...state, ...action.payload, loading: false, error: false };
    case FAIL:
      return { ...state, loading: false, error: true };
    default:
      return state;
  }
}

export const Creators = {
  getService: () => ({
    type: Types.GET
  }),
  addService: payload => ({
    type: Types.ADD,
    payload
  }),
  deleteService: payload => ({
    type: Types.DELETE,
    payload
  }),
  serviceSuccess: payload => ({
    type: Types.SUCCESS,
    payload
  }),
  serviceFail: () => ({
    type: Types.FAIL
  })
};
