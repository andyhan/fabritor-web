import LocalImagePanel from './LocalImagePanel';
import { createSvg, createImage } from '@/editor/image';
import RemoteImagePanel from './RemoteImagePanel';
import { Button, Flex } from 'antd';
import Title from '@/fabritor/components/Title';
import { useEffect, useState } from 'react';
import FallList from '@/fabritor/components/FallList';
import { fetchPhotos } from './pixabay';

export default function ImagePanel () {
  const [photos, setPhotos] = useState([]);
  const [illustrations, setIllustrations] = useState([]);
  const [vectors, setVectors] = useState([]);

  const addImage = async (options) => {
    await createImage({
      imageSource: options.img || options.url
    });
  }

  const addSvg = async (options) => {
    await createSvg(options);
  }

  const addPixabay = (item) => {
    createImage({
      imageSource: item.cover
    });
  }

  const renderPixabayButton = (type) => {
    return (
      <Button
        type="link"
        href={`https://pixabay.com/zh/${type}s/`}
        target="_blank">
        pixabay
      </Button>
    )
  }

  useEffect(() => {
    fetchPhotos('photo').then(setPhotos);
    fetchPhotos('illustration').then(setIllustrations);
    fetchPhotos('vector').then(setVectors);
  }, []);

  return (
    <div className="fabritor-panel-wrapper">
      <Flex gap={10} justify="space-around">
        <LocalImagePanel addImage={addImage} addSvg={addSvg} />
        <RemoteImagePanel addImage={addImage} />
      </Flex>
      <Title>来自{renderPixabayButton('vector')}的矢量图</Title>
      <FallList list={vectors} type="image" itemClick={addPixabay} />
      <Title>来自{renderPixabayButton('photo')}的图片</Title>
      <FallList list={photos} type="image" itemClick={addPixabay} />
      <Title>来自{renderPixabayButton('illustration')}的插画</Title>
      <FallList list={illustrations} type="image" itemClick={addPixabay} />
    </div>
  )
}