import React, { useRef } from 'react';

type Props = {
  images: string[]
  onImagesLoad?: () => void
}

const ImagesLoader: React.FunctionComponent<Props> = ({images, onImagesLoad}) => {
  const loadCount = useRef(0);
  const totalLoadCount = images.length;

  const onLoad = () => {
      loadCount.current++
    if (onImagesLoad && loadCount.current === totalLoadCount) {
      onImagesLoad()
    }
  }
  
  return (
    <>
      {images.map((image, index) => <img key={index} src={image} alt='' style={{display: 'none'}} onLoad={onLoad}/>)}
    </>
  )
}

export default ImagesLoader