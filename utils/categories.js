import { BsCode } from 'react-icons/bs';
import { GiCakeSlice, GiForest, GiGuitar } from 'react-icons/gi';
import { FaLeaf, FaCarAlt, FaDog, FaRunning } from 'react-icons/fa';

export const categories = [
  {
    name: 'development',
    icon: <BsCode />,
  },
  {
    name: 'nature',
    icon: <FaLeaf />,
  },
  {
    name: 'cars',
    icon: <FaCarAlt />,
  },
  {
    name: 'food',
    icon: <GiCakeSlice />,
  },
  {
    name: 'music',
    icon: <GiGuitar />,
  },
  {
    name: 'forest',
    icon: <GiForest />,
  },
  {
    name: 'animals',
    icon: <FaDog />,
  },
  {
    name: 'sports',
    icon: <FaRunning />,
  },
];
