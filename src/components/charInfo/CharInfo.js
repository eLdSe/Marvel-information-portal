import { useEffect, useState } from "react";

import useMarvelService from "../../services/MarvelService";
import Spinner from "../spiner/Spiner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Skeleton from "../skeleton/Skeleton";

import "./charInfo.scss";


const CharInfo = ({ selectedChar }) => {

  const [char, setChar] = useState(null)

  const { getCharacter, process, setProcess, clearError } = useMarvelService()

  useEffect(() => {
    updateChar()
  }, [])

  useEffect(() => {
    updateChar()
  }, [selectedChar])


  const updateChar = () => {
    if (!selectedChar) return;

    clearError()
    getCharacter(selectedChar)
      .then(onCharLoad)
      .then(() => setProcess('confirmed'))
  };

  const onCharLoad = (char) => {
    setChar(char)
  };


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
    <div className="char__info">
      {setContent(process, char)}
    </div>
  );
}

const View = ({ char }) => {
  const { name, description, homepage, wiki, thumbnail, comics } = char;
  let imgStyle = { objectFit: "cover" };
  if (
    thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
  ) {
    imgStyle = { objectFit: "unset" };
  }

  return (
    <>
      <div className="char__basics">
        <img src={thumbnail} alt="name" style={imgStyle} />
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <a href={homepage} target='_blank' rel="noopener noreferrer" className="button button__main">
              <div className="inner">homepage</div>
            </a>
            <a href={wiki} target='_blank' rel="noopener noreferrer" className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">{description}</div>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">
        {comics.map((item, i) => {
          return (
            <li key={i} className="char__comics-item">
              {item}
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default CharInfo;
