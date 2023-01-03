import logo from './logo.svg';
import React from 'react';
import './App.css';
import Title from './components/Title';
import Form from './components/Form';
import MainCard from './components/MainCard';
import Favorites from './components/Favorites';


const jsonLocalStorage = {
  setItem: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  getItem: (key) => {
    return JSON.parse(localStorage.getItem(key));
  },
};

const fetchCat = async (text) => {
  const OPEN_API_DOMAIN = "https://cataas.com";
  const response = await fetch(`${OPEN_API_DOMAIN}/cat/says/${text}?json=true`);
  const responseJson = await response.json();
  return `${OPEN_API_DOMAIN}/${responseJson.url}`;
};






const App = () => {
  const CAT1 = "https://cataas.com/cat/HSENVDU4ZMqy7KQ0/says/react";
  const CAT2 = "https://cataas.com/cat/BxqL2EjFmtxDkAm2/says/inflearn";
  const CAT3 = "https://cataas.com/cat/18MD6byVC1yKGpXp/says/JavaScript";

  const [counter, setCounter] = React.useState(() => {
    return jsonLocalStorage.getItem('counter');
  });

  const [mainCatImg, setMainCatImg] = React.useState(CAT1);

  const [favorites, setFavorites] = React.useState(() => {
    return jsonLocalStorage.getItem('favorites') || [];
  });

  const alreadyFavorite = favorites.includes(mainCatImg);

  async function setInitialCat() {
    const newCat = await fetchCat('first cat');
    console.log(newCat);
    setMainCatImg(newCat);
  }

  React.useEffect(() => {
    setInitialCat();
  }, []);



  async function updateMainCat(value) {

    const newCat = await fetchCat(value);

    setMainCatImg(newCat);

    setCounter((prev) => {
      const nextCounter = prev + 1;
      jsonLocalStorage.setItem("counter", nextCounter);
      return nextCounter;
    });

  }

  function handleHeartClick() {
    const nextFavorites = [...favorites, mainCatImg];
    setFavorites(nextFavorites);
    jsonLocalStorage.setItem('favorites', nextFavorites);


  }

  // const counterCheck = counter === null;
  // 내가 짰으나 코파일이 반은 해준 코드 `${}` 는 백틱안에 변수를 넣을 수 있음
  // const titleChange = counterCheck ? 고양이 가라사대' : `${counter}번째 고양이 가라사대`;
  // 강사님 코드
  const counterTitle = counter === null ? "" : counter + "번째 ";

  return (
    <div>
      <Title>{counterTitle}고양이 가라사대</Title>
      <Form updateMainCat={updateMainCat} />
      <MainCard img={mainCatImg} onHeartClick={handleHeartClick} alreadyFavorite={alreadyFavorite} />
      <Favorites favorites={favorites} />
    </div>
  );
};

export default App;
