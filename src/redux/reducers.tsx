import { VideoType } from "../components/types/VideoType";

const initialState = {
  videos: [],
  activeVideo: null,
};

type videosReducerAction = 
  | { type: 'FETCH_VIDEO', payload: VideoType[] }
  | { type: 'SET_ACTIVE_VIDEO', payload: VideoType | null }
;

export const videosReducer = (state = initialState, action: videosReducerAction) => {
  switch (action.type) {
    case 'FETCH_VIDEO': 
      return {
        ...state,
        videos: action.payload,
      } 
    case 'SET_ACTIVE_VIDEO':
      return {
        ...state,
        activeVideo: action.payload,
      };
    default:
      return state;
  }
};
