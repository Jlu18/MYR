import { SYNC_USER_PROJ, SYNC_EXAMP_PROJ, DELTE_PROJ } from '../actions/projectActions';

const initial_state = {
  userProjs: [],
  examplProjs: []
};

export default function project(state = initial_state, action) {
  switch (action.type) {
    case SYNC_USER_PROJ:
      return {
        ...state,
        userProjs: action.payload
      };
    case SYNC_EXAMP_PROJ:
      return {
        ...state,
        examplProjs: action.payload
      };
    case DELTE_PROJ:
      let userProjs = state.userProjs.filter(x => {
        return x.id !== action.payload.id;
      });
      return {
        ...state,
        ...userProjs
      };
    default:
      return state;
  }
}
