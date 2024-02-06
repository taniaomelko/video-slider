import './Popup.scss';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { setActiveVideo } from '../../redux/actions';
import { VideoType } from '../types/VideoType';

export const Popup:React.FC = () => {
  const videos = useSelector((state: RootState) => state.videos.videos);
  const activeVideo = useSelector((state: RootState) => state.videos.activeVideo);
  const dispatch = useDispatch();
  
  const handleBulletClick = (video: VideoType) => {
    dispatch(setActiveVideo(video));
  }

  const closePopup = () => {
    dispatch(setActiveVideo(null));
  }

  return (
    <>
    {activeVideo && (
      <div className="popup-overlay" onClick={closePopup}>
        <div className="popup-content" onClick={(e) => e.stopPropagation()}>
          <div className="popup-video">
            <iframe 
              key={activeVideo.id}
              src={`${activeVideo.url}?autoplay=1`}
              width="100%" 
              height="100%" 
              frameBorder="0" 
              allow="autoplay; fullscreen" 
              title={activeVideo.id}
            ></iframe>
          </div>

          <div className="popup-close" onClick={closePopup}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M3.70696 3.70708C4.09748 3.31655 4.73049 3.31655 5.12103 3.70708L11.9999 10.5859L18.8786 3.70708C19.2692 3.31655 19.9023 3.31655 20.2927 3.70708C20.6832 4.0976 20.6832 4.73061 20.2927 5.12115L13.4139 12L20.2927 18.8788C20.6832 19.2694 20.6832 19.9024 20.2927 20.2929C19.9023 20.6834 19.2692 20.6834 18.8786 20.2929L11.9999 13.4141L5.12103 20.2929C4.73049 20.6834 4.09748 20.6834 3.70696 20.2929C3.31643 19.9024 3.31643 19.2694 3.70696 18.8788L10.5858 12L3.70696 5.12115C3.31643 4.73061 3.31643 4.0976 3.70696 3.70708Z" fill="currentColor"/>
            </svg>
          </div>

          <div className="popup-pagination">
            <div className="pagination">
              {videos.map((video: VideoType) => (
                <div 
                  key={video.id} 
                  onClick={() => handleBulletClick(video)}
                  className={`pagination-bullet ${activeVideo.id === video.id ? 'active' : ''}`}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )}
    </>
  );
}
