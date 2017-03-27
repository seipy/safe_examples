import ACTION_TYPES from '../actions/actionTypes';
import { MESSAGES } from '../constants';

const initialState = {
  client: '',
  tasks: [],
  account: null,
  config: null,
  coreData: {
    id: '',
    inbox: [],
    saved: [],
    outbox: []
  },
  inboxSize: 0,
  rootSDHandle: 0
};

const initializer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.AUTHORISE_APP: {
      const tasks = state.tasks.slice();
      tasks.push(MESSAGES.INITIALIZE.AUTHORISE_APP);
      return { ...state, tasks };
      break;
    }
    case `${ACTION_TYPES.AUTHORISE_APP}_SUCCESS`:
      return { ...state, client: action.payload };
      break;
    case ACTION_TYPES.SET_INITIALIZER_TASK:
      const tasks = state.tasks.slice();
      tasks.push(action.task);
      return { ...state, tasks };
      break;
    case `${ACTION_TYPES.GET_CONFIG_FILE}_SUCCESS`:
      return { ...state, config: action.payload.data };
      break;
    case `${ACTION_TYPES.REFRESH_EMAILS}_SUCCESS`:
      return { ...state, accounts: action.payload.data };
      break;
    case ACTION_TYPES.PUSH_TO_INBOX: {
      const inbox = state.coreData.inbox.slice();
      inbox.push(action.data);

      return {
        ...state,
        coreData: {
          ...state.coreData,
          inbox
        }
      };
      break;
    }
    case ACTION_TYPES.CLEAR_INBOX: {
      return {
        ...state,
        coreData: {
          ...state.coreData,
          inbox: []
        }
      };
    }
    default:
      return state;
      break;
  }
};

export default initializer;
