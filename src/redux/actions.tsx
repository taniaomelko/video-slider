import { VideoType } from "../components/types/VideoType";

export const fetchVideo = (videos: VideoType[]) => ({
  type: 'FETCH_VIDEO',
  payload: videos,
});

export const setActiveVideo = (video: VideoType | null) => ({
  type: 'SET_ACTIVE_VIDEO',
  payload: video,
});
