import s from './NotFoundImage.module.css';
import image from '../../assets/notfound.jpg';

const NotFindImage = () => {
  return (
    <>
      <img src={image} alt="try to find smth" className={s.img} />
      <h2 className={s.title}> Try to find something else</h2>
    </>
  );
};

export default NotFindImage;
