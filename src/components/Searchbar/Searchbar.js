import { useState } from 'react';
import s from './Searchbar.module.css';
import toast from 'react-hot-toast';

const Searchbar = ({ onSubmit }) => {
  const [imageName, setImageName] = useState('');

  const handleNameChange = e => {
    setImageName(e.currentTarget.value.toLowerCase());
  };
  const handleSubmit = e => {
    e.preventDefault();
    if (imageName.trim() === '') {
      toast.error('Enter something');
      return;
    }
    onSubmit(imageName);
    setImageName(' ');
  };

  return (
    <header className={s.Searchbar}>
      <form className={s.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={s.SearchFormButton}>
          <span className={s.SearchFormButtonLabel}>🔍</span>
        </button>

        <input
          className={s.SearchFormInput}
          type="text"
          name="imageName"
          value={imageName}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleNameChange}
        />
      </form>
    </header>
  );
};
export default Searchbar;
