export const Types = {
  GET: "CATEGORY/GET",
  ADD: "CATEGORY/ADD",
  DELETE: "CATEGORY/DELETE",
  SUCCESS: "CATEGORY/SUCCESS",
  FAIL: "CATEGORY/FAIL"
};

const INITIAL_STATE = {
  error: null,
  loading: false,
  data: []
};

export default function Category(state = INITIAL_STATE, action) {
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
  getCategory: () => ({
    type: Types.GET
  }),
  addCategory: payload => ({
    type: Types.ADD,
    payload
  }),
  deleteCategory: payload => ({
    type: Types.DELETE,
    payload
  }),
  categorySuccess: payload => ({
    type: Types.SUCCESS,
    payload
  }),
  categoryFail: () => ({
    type: Types.FAIL
  })
};
