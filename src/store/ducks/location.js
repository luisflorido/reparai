export const Types = {
  GET: "LOCATION/GET",
  ADD: "LOCATION/ADD",
  DELETE: "LOCATION/DELETE",
  SUCCESS: "LOCATION/SUCCESS",
  FAIL: "LOCATION/FAIL"
};

const INITIAL_STATE = {
  error: null,
  loading: false,
  data: []
};

export default function Location(state = INITIAL_STATE, action) {
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
  getLocation: () => ({
    type: Types.GET
  }),
  addLocation: payload => ({
    type: Types.ADD,
    payload
  }),
  deleteLocation: payload => ({
    type: Types.DELETE,
    payload
  }),
  locationSuccess: payload => ({
    type: Types.SUCCESS,
    payload
  }),
  locationFail: () => ({
    type: Types.FAIL
  })
};
