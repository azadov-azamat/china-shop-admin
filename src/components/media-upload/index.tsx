import React, { useState, useRef } from 'react';
import Croppr from 'croppr';
import { useAppDispatch } from '../../redux/hooks.ts';

interface ModalMediaUploadProps {
  data: {
    model: any;
    type: string;
    contentType: string;
  };
  close?: () => void;
  network: {
    request: (url: string) => Promise<any>;
  };
  store: {
    createRecord: (type: string, data: any) => any;
  };
}

const ModalMediaUpload: React.FC<ModalMediaUploadProps> = ({ data, close, network, store }) => {
  const dispatch = useAppDispatch();
  const [cropprInstance, setCropprInstance] = useState<any>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const mediaPath = () => {
    const { model, contentType } = data;

    if (model?.media) {
      if (Array.isArray(model.media) && contentType) {
        return (
          model.media.find((media: any) => media.contentType === contentType)?.path ||
          '/images/placeholder.webp'
        );
      }
      return model.media?.path || '/images/placeholder.webp';
    }
    return '/images/placeholder.webp';
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const uploadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result as string);
        setupCroppr();
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const setupCroppr = () => {
    requestAnimationFrame(() => {
      const instance = new Croppr('#crop-image', {
        // aspectRatio: 3 / 4,
        // Additional options...
      });
      setCropprInstance(instance);
    });
  };

  const getCroppedImageBlob = (url: string, croppedData: any): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const image = new Image();

      image.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = croppedData.width;
        canvas.height = croppedData.height;
        const ctx = canvas.getContext('2d');

        ctx?.drawImage(
          image,
          croppedData.x,
          croppedData.y,
          croppedData.width,
          croppedData.height,
          0,
          0,
          croppedData.width,
          croppedData.height
        );

        canvas.toBlob(
          (blob) => {
            if (blob) resolve(blob);
            URL.revokeObjectURL(url);
          },
          'image/png'
        );
      };

      image.onerror = () => {
        reject(new Error('Image loading error'));
        URL.revokeObjectURL(url);
      };

      image.src = url;
    });
  };

  const uploadCroppedImage = async (blob: Blob) => {
    try {
      const { model, type, contentType } = data;
      const modelId = model?.id;

      if (modelId) {
        const { uploadUrl, id } = await network.request(
          `media/upload-url/${type}?id=${modelId}`
        );
        await uploadBlob(blob, uploadUrl, blob.type);

        const url = uploadUrl.split('?')[0];

        const media = store.createRecord('media', {
          id,
          [type]: model,
          path: url,
          mediaType: 'photo',
          contentType,
        });

        await media.save();
      }
      close?.();
    } catch (error) {
      console.error('Error during photo upload:', error);
    }
  };

  const uploadBlob = async (blob: Blob, uploadUrl: string, contentType: string) => {
    const response = await fetch(uploadUrl, {
      method: 'PUT',
      headers: { 'Content-Type': contentType },
      body: blob,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  };

  const onSave = async () => {
    if (!cropprInstance || !file) return;

    const croppedData = cropprInstance.getValue();
    const url = URL.createObjectURL(file);

    try {
      const blob = await getCroppedImageBlob(url, croppedData);
      await uploadCroppedImage(blob);
    } catch (error) {
      console.error('Error in cropping image:', error);
    }
  };

  return (
    <div>
      <div>
        <img id="crop-image" src={imageSrc || mediaPath()} alt="To crop" />
      </div>
      <input
        id="hidden-file-input"
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={uploadFile}
      />
      <button onClick={triggerFileInput}>Upload File</button>
      <button onClick={onSave}>Save</button>
    </div>
  );
};

export default ModalMediaUpload;
