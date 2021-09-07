import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import './App.css';

import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';

function App() {
  const [searchValue, setSearchValue] = useState('');


  const handleFormSubmit = searchValue => {
    setSearchValue(searchValue);
  };

  return (
    <div className="App">
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery searchValue={searchValue} />
      <ToastContainer />
    </div>
  );
}

export default App;