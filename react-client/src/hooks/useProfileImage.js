import { useState, useEffect } from 'react';

export function useProfileImage(imgSrc, placeholderSrc) {
  const [imageSource, setImageSource] = useState(placeholderSrc);
  useEffect(() => {
    const image = new Image();
    image.addEventListener('load', () => setImageSource(image.src));
    image.addEventListener('error', e => {
      setImageSource(placeholderSrc);
      console.error(`Error loading image ${imgSrc}. Falling back to ${placeholderSrc}.`, e);
    });
    image.src = imgSrc;
  }, [imgSrc, placeholderSrc]);
  return { imageSource };
}