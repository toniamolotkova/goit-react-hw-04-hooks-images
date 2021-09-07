import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ image, descr, onOpenModal, largeImg }) => {
  
  return (
    <li className={s.item} onClick={onOpenModal}>
      <img src={image} alt={descr} className={s.image} source={largeImg} />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.string.isRequired,
  descr: PropTypes.string.isRequired,
  onOpenModal: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
