import { BsMoonFill, BsSunFill } from 'react-icons/bs';
import { useTheme } from '../context/themeContext';

const ThemeButton = () => {
  const { darkTheme, toggleDarkTheme } = useTheme();
  return (
    <button className="theme-btn" onClick={toggleDarkTheme}>
      {darkTheme ? <BsSunFill /> : <BsMoonFill />}
    </button>
  );
};

export default ThemeButton;
