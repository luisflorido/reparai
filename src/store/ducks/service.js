export const Types = {
  GET: "SERVICE/GET",
  GET_BY_ID: "SERVICE/GET_BY_ID",
  ADD: "SERVICE/ADD",
  DELETE: "SERVICE/DELETE",
  SEND_MESSAGE: "SERVICE/SEND_MESSAGE",
  SUCCESS: "SERVICE/SUCCESS",
  FAIL: "SERVICE/FAIL"
};

const INITIAL_STATE = {
  error: null,
  loading: false,
  data: [],
  service: {}
};

export default function Service(state = INITIAL_STATE, action) {
  const { GET, GET_BY_ID, ADD, SEND_MESSAGE, DELETE, SUCCESS, FAIL } = Types;
  switch (action.type) {
    case GET:
      return { ...state, loading: true, error: null };
    case GET_BY_ID:
      return { ...state, loading: true, error: null };
    case ADD:
      return { ...state, loading: true, error: null };
    case SEND_MESSAGE:
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
  getServiceById: id => ({
    type: Types.GET_BY_ID,
    id
  }),
  addService: payload => ({
    type: Types.ADD,
    payload
  }),
  sendMessage: payload => ({
    type: Types.SEND_MESSAGE,
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
