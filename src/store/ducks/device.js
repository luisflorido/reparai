export const Types = {
  GET: "DEVICE/GET",
  ADD: "DEVICE/ADD",
  DELETE: "DEVICE/DELETE",
  SUCCESS: "DEVICE/SUCCESS",
  FAIL: "DEVICE/FAIL"
};

const INITIAL_STATE = {
  error: null,
  loading: false,
  data: []
};

export default function Device(state = INITIAL_STATE, action) {
  const { GET, ADD, DELETE, SUCCESS, FAIL } = Types;
  switch (action.type) {
    case GET:
      return { ...state, loading: true };
    case ADD:
      return { ...state, loading: true };
    case DELETE:
      return { ...state, loading: true };
    case SUCCESS:
      return { ...state, ...action.payload, loading: false, error: false };
    case FAIL:
      return { ...state, loading: false, error: true };
    default:
      return state;
  }
}

export const Creators = {
  getDevice: () => ({
    type: Types.GET
  }),
  addDevice: payload => ({
    type: Types.ADD,
    payload
  }),
  deleteDevice: payload => ({
    type: Types.DELETE,
    payload
  }),
  deviceSuccess: payload => ({
    type: Types.SUCCESS,
    payload
  }),
  deviceFail: () => ({
    type: Types.FAIL
  })
};
