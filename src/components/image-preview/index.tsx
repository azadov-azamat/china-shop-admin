import { FC } from 'react';
import { PiXCircle } from 'react-icons/pi';

interface ImagePreviewProps {
  media: {
    id: string;
    path: string;
  };
  onDelete: (mediaId: string) => void;
  isDeleting: boolean;
}

const ImagePreview: FC<ImagePreviewProps> = ({ media, onDelete, isDeleting }) => {
  return (
    <div
      className={`relative w-24 h-24 inline-block border border-gray-300 m-3 ${
        isDeleting ? 'opacity-70' : ''
      }`}
    >
      {!isDeleting && (
        <button
          onClick={() => onDelete(media.id)}
          className="absolute top-[-10px] right-[-10px] text-white bg-gray-700 border border-gray-700 rounded-full p-1 text-xs hover:bg-red-500 z-10 opacity-0 hover:opacity-100 transition-opacity duration-300"
        >
          <PiXCircle className={'w-4 h-4'}/>
        </button>
      )}
      <img
        src={media.path}
        alt="Preview"
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default ImagePreview;
