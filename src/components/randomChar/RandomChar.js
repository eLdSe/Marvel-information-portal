import { useState, useEffect } from "react";
import useMarvelService from "../../services/MarvelService";

import Spinner from "../spiner/Spiner";
import Skeleton from "../skeleton/Skeleton";
import ErrorMessage from "../errorMessage/ErrorMessage";

import "./randomChar.scss";
import mjolnir from "../../resources/img/mjolnir.png";

const RandomChar = () => {

  const [char, setChar] = useState(null)


  const { getCharacter,process, setProcess } = useMarvelService();

  const onCharLoad = (char) => {
    setChar(char)
  };

  const updateChar = () => {
    const id = Math.floor(Math.random() * 20) + 1;
    getCharacter(id)
      .then(onCharLoad)
      .then(()=> setProcess('confirmed'))
  };

  useEffect(() => {
    updateChar();
    const timerId = setInterval(updateChar, 60000);

    return () => {
      clearInterval(timerId)
    }
  }, [])


  const setContent = (process, char) => {
    switch (process) {
      case 'waiting':
        return <Skeleton />
        break
      case 'loadind':
        return <Spinner />
        break
      case 'confirmed':
        return <View char={char} />
        break
      case 'error':
        return <ErrorMessage />
        break
      default:
        throw new Error('Unexpected process state !');
        break
    }
  }

  return (
    <div className="randomchar">
      {setContent(process, char)}
      <div className="randomchar__static">
        <p className="randomchar__title">
          Random character for today!
          <br />
          Do you want to get to know him better?
        </p>
        <p className="randomchar__title">Or choose another one</p>
        <button onClick={updateChar} className="button button__main">
          <div className="inner">try it</div>
        </button>
        <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
      </div>
    </div>
  );

}

const View = ({ char }) => {
  if (!char) {
    return <Spinner />
  }


  const { name, description, thumbnail, homepage, wiki } = char;
  return (
    <div className="randomchar__block">
      <img src={thumbnail} alt="Random character" className="randomchar__img" />
      <div className="randomchar__info">
        <p className="randomchar__name">{name}</p>
        <p className="randomchar__descr">{description}</p>
        <div className="randomchar__btns">
          <a href={homepage} target='_blank' rel="noopener noreferrer" className="button button__main">
            <div className="inner">homepage</div>
          </a>
          <a href={wiki} target='_blank' rel="noopener noreferrer" className="button button__secondary">
            <div className="inner">Wiki</div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default RandomChar;
