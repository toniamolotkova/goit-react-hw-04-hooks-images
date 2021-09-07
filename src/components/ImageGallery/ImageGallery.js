import { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import PropTypes from 'prop-types';

import s from './ImageGallery.module.css';

import API from '../../services/imageApi';
import ImageGalleryItem from 'components/ImageGalleryItem';
import Button from 'components/Button';
import Loader from 'react-loader-spinner';
import NotFoundImage from 'components/NotFoundImage';
import Modal from 'components/Modal';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

function ImageGallery({ searchValue }) {

  const [images, setImages] = useState(null);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);
  const [modalImageInfo, setModalImageInfo] = useState(null);

  useEffect(() => {
    if (!searchValue) return;
    setStatus(Status.PENDING);

    API.fetchImagesWithQuery(searchValue, 1)
      .then(response => {
        setImages(response);
        setStatus(Status.RESOLVED);

        // setImages(prevImages => ([...prevImages, ...response]));
        // setStatus(Status.RESOLVED);

        // window.scrollTo({
        // top: document.documentElement.scrollHeight,
        // behavior: 'smooth',
        // });
      })
      .catch(error => {
        setError(error.message);
        setStatus(Status.REJECTED);
      });
  }, [searchValue]);

  useEffect(() => {
    if (!searchValue) return;
    setStatus(Status.PENDING);

    API.fetchImagesWithQuery(searchValue, page)
      .then(response => {
        setImages(prevImages => [...prevImages, ...response]);
        setStatus(Status.RESOLVED);

        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      })
      .catch(error => {
        setError(error);
        setStatus(Status.REJECTED);
      });
  }, [page]);

  // componentDidUpdate(prevProps, prevState) {
  //   const prevValue = prevProps.searchValue;
  //   const nextValue = this.props.searchValue;
  //   if (prevValue !== nextValue) {
  //     this.setState({ status: Status.PENDING });

  //     API.fetchImagesWithQuery(nextValue, page)
  //       .then(images => {
  //         if (images.length === 0) {
  //           return this.setState({
  //             error: toast.error(`Can't find ${nextValue}. Sorry:(`),
  //             status: Status.REJECTED,
  //           });
  //         }

  //         return this.setState({ images, status: Status.RESOLVED });
  //       })
  //       .catch(error => this.setState({ error, status: Status.REJECTED }));
  //   }

  //   if (prevState.page !== this.state.page) {
  //     API.fetchImagesWithQuery(nextValue, this.state.page)
  //       .then(images => {
  //         this.setState(prevState => ({
  //           images: [...prevState.images, ...images],
  //           status: Status.RESOLVED,
  //         }));

  //         window.scrollTo({
  //           top: document.documentElement.scrollHeight,
  //           behavior: 'smooth',
  //         });
  //       })
  //       .catch(error =>
  //         this.setState({
  //           error,
  //           status: Status.REJECTED,
  //         }),
  //       );
  //   }
  // }

  const handleClickBtn = () => {
    setPage(page + 1);
  };

  const toggleModal = modalImageInfo => {
    setModalImageInfo(modalImageInfo);
  };

  if (status === 'idle') {
    return (
      <h1 style={{ color: 'darkblue', textAlign: 'center' }}>
        Find your image!
      </h1>
    );
  }

  if (status === 'pending') {
    return (
      <Loader
        type="Puff"
        color="#00BFFF"
        height={100}
        width={100}
        timeout={3000}
      />
    );
  }

  if (status === 'rejected') {
    return <NotFoundImage />;
  }

  if (status === 'resolved') {
    return (
      <>
        <ul className={s.gallery}>
          {images.map(image => (
            <ImageGalleryItem
              onOpenModal={() => toggleModal(image)}
              key={image.id}
              image={image.webformatURL}
              descr={image.tags}
            />
          ))}
        </ul>
        <Button onClick={handleClickBtn} />
        {modalImageInfo && (
          <Modal onClose={toggleModal} imageInfo={modalImageInfo} />
        )}
      </>
    );
  }
}

ImageGallery.propTypes = {
  searchValue: PropTypes.string.isRequired,
};

export default ImageGallery;

