import { useState, useEffect } from 'react';
import s from '../components/App.module.css';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Loader from './Loader';
import Modal from './Modal';
import { Toaster } from 'react-hot-toast';
import imageAPI from '../services/pixabay-api';

const App = () => {
  const [imageName, setImageName] = useState('');
  const [images, setImages] = useState(null);
  const [imagesLength, setImagesLength] = useState('');
  const [status, setStatus] = useState('idle');
  const [page, setPage] = useState(1);
  const [numberResults, setNumberResults] = useState(12);
  const [showModal, setShowModal] = useState(false);
  const [largeImage, setLargeImage] = useState('');
  const [altLargeImage, setAltLargeImage] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const API_KEY = '24082194-32c1b396cbebb1b9a26199ae3';
    const URL = 'https://pixabay.com/api/';

    if (!imageName) {
      return;
    }

    if (imageName) {
      setStatus('pending');

      imageAPI
        .fetchImage(imageName, API_KEY, URL, page, numberResults)
        .then(({ hits }) => {
          setImages(hits);
          setStatus('resolved');
          setImagesLength(hits.length);
        })
        .catch(error => {
          setError(error);
          setStatus('rejected');
        });
    }

    if (page) {
      imageAPI
        .fetchImage(imageName, API_KEY, URL, page, numberResults)
        .then(({ hits }) => {
          setImages(hits);
          setStatus('resolved');
          setImagesLength(hits.length);
        })
        .catch(error => {
          setError(error);
          setStatus('rejected');
        });
    }
  }, [imageName, numberResults, page]);

  const handleFormSubmit = imageName => {
    setImageName(imageName);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  const handleClickImage = (url, alt) => {
    setLargeImage(url);
    setAltLargeImage(alt);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  if (status === 'idle') {
    return (
      <div>
        <Searchbar onSubmit={handleFormSubmit} />
        <Toaster />
      </div>
    );
  }

  if (status === 'pending') {
    return (
      <div>
        <Searchbar onSubmit={handleFormSubmit} />
        <Loader />
      </div>
    );
  }

  if (status === 'rejected' || imagesLength === 0) {
    return <h1>'Please update ↻ and enter the correct name'</h1>;
  }

  if (status === 'resolved') {
    return (
      <div className={s.App}>
        <Searchbar onSubmit={handleFormSubmit} />
        {imagesLength && (
          <ImageGallery imagesData={images} onClick={handleClickImage} />
        )}
        <Button loadMore={handleLoadMore} />
        {showModal && (
          <Modal
            src={largeImage}
            alt={altLargeImage}
            onCloseModal={closeModal}
          />
        )}
        <Toaster />
      </div>
    );
  }
};

export default App;
