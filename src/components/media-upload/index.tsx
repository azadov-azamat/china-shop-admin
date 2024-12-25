import React, { useState, useRef } from 'react';
import Sortable from 'sortablejs';
import { ALLOWED_TYPES } from '../../utils/constants.ts';
import { useAppDispatch, useAppSelector } from '../../redux/hooks.ts';
import { createMedia, getUploadUrl } from '../../redux/reducers/media.ts';
import ImagePreview from '../image-preview';

interface MediaUploadComponentProps {
  model: any;
  type: string;
  contentType: string;
}

const MediaUploadComponent: React.FC<MediaUploadComponentProps> = ({ model, type, contentType }) => {
  console.log(model);
  const dispatch = useAppDispatch();
  const {uploadData, media: newMedia} = useAppSelector(state => state.media)
  const [media, setMedia] = useState<any[]>(model?.media?.content ? model?.media.content.toArray() : model?.media);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const sortableContainerRef = useRef<HTMLUListElement | null>(null);

  const validateFile = (file: File) => {
    return ALLOWED_TYPES.includes(file.type);
  };

  React.useEffect(() => {
    if (sortableContainerRef.current) {
      Sortable.create(sortableContainerRef.current, {
        animation: 150,
        ghostClass: 'ghost',
        chosenClass: 'chosen',
        group: 'shared-list',
        onEnd: onSortEnd,
      });
    }
  }, [media]);

  const onSortEnd = async (event: any) => {
    const updatedMedia = [...media];

    event.to.childNodes.forEach((child: any, index: number) => {
      const id = child.dataset.itemId;
      const item = updatedMedia.find((mediaItem) => mediaItem.id === id);
      if (item) {
        item.order = index;
      }
    });

    setMedia(updatedMedia);

    const promises = updatedMedia.map((item) => item.save());
    await Promise.all(promises);
  };

  const uploadPhoto = async (file: File) => {
    const modelId = model?.id;
    console.log("tushdi 2", modelId);

    if (modelId) {
      try {
        await dispatch(getUploadUrl({type, modelId}))

        const { uploadUrl, id } = uploadData
        console.log("uploadUrl", uploadUrl);
        const response = await fetch(uploadUrl, {
          method: 'PUT',
          headers: { 'Content-Type': file.type },
          body: file,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const url = uploadUrl.split('?')[0];

        await dispatch(createMedia({
          id,
          [type]: model,
          path: url,
          mediaType: 'photo',
          contentType,
        }))

        if (media?.length) {
          setMedia([...media, newMedia])
        } else {
          setMedia([newMedia])
        }
      } catch (error) {
        console.error('Error during photo upload:', error);
      }
    }
  };

  const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && validateFile(file)) {
      uploadPhoto(file);
    }
  };

  return (
    <div className="w-full max-w-4xl bg-white m-2.5">
      <div className="mt-4 mb-4">
        {media?.length > 0 ? (
          <ul className="flex flex-wrap gap-2" ref={sortableContainerRef}>
            {media.map((item) => (
              <li key={item.id} data-item-id={item.id} className="list-item">
                <ImagePreview
                  media={item}
                  onDelete={(id: string) => setMedia((prev) => prev.filter((m) => m.id !== id))}
                  isDeleting={false}
                />
              </li>
            ))}
          </ul>
        ) : (
          <p>No media available</p>
        )}
      </div>
      <div
        className="relative flex flex-col items-center justify-center h-44 border-2 border-dashed border-blue-200 rounded-lg cursor-pointer hover:border-blue-500 transition duration-300">
        <span className="text-blue-500 text-6xl mb-2">📷</span>
        <p className="text-gray-400 text-sm mt-2 transition-opacity duration-300">Drag & drop files here or click to
          upload</p>
        <input
          type="file"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          ref={fileInputRef}
          onChange={handleFileInput}
          accept="image/*"
        />
      </div>
      <p className="text-gray-400 text-sm mt-5">
        Не допускаются к размещению фотографии с водяными знаками, чужих объектов и рекламные баннеры. JPG, PNG или GIF.
        Максимальный размер файла 10 мб
      </p>
    </div>
  );
};

export default MediaUploadComponent;
