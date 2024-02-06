import './Slider.scss';
import { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from '../../redux/store';
import { fetchVideo, setActiveVideo } from '../../redux/actions';
import { VideoType } from '../types/VideoType';
import { videos as allVideos } from '../../data';
import { Popup } from '../Popup/Popup';
import { register } from 'swiper/element/bundle';
import { Navigation } from 'swiper/modules';

register();

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'swiper-container': any;
      'swiper-slide': any;
    }
  }
}

type ISwiper = {
  swiperElRef: HTMLDivElement,
  initialize: () => void,
}

export const Slider: React.FC = () => {
  const dispatch = useDispatch();
  const videos = useSelector((state: RootState) => state.videos.videos);
  const activeVideo = useSelector((state: RootState) => state.videos.activeVideo);
  const swiperElRef = useRef<ISwiper>(null);

  useEffect(() => {
    dispatch(fetchVideo(allVideos));

    const swiperEl = swiperElRef.current;
    if (!swiperEl) return;
    const swiperParams = {
      modules: [Navigation],
      navigation: true,
      breakpoints: {
        0: {
          slidesPerView: 1,
        },
        480: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 4,
        },
      },
      injectStyles: [`
        .swiper-button-next {
          transition: opacity 0.3s;
        }
        .swiper-button-next:hover {
          opacity: 0.7;
        }
      `],
    };
    Object.assign(swiperEl, swiperParams);
    swiperEl.initialize();
  }, [dispatch]);
  
  const openVideo = (video: VideoType) => {
    dispatch(setActiveVideo(video));
  };

  return (
    <div className="slider">
      <swiper-container ref={swiperElRef} init="false">
        {videos.map((video: VideoType) => {
          const { id, img } = video;
          return (
          <swiper-slide key={id} onClick={() => openVideo(video)}>
            <img className="slider-img" src={`./img/${img}`} alt="" />
          </swiper-slide>
          )
        })}
      </swiper-container>

      {activeVideo && <Popup />}
    </div>
  );
};
