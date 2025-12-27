import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';

import Spinner from "../spiner/Spiner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import useMarvelService from "../../services/MarvelService";

import "./charList.scss";


const CharList = (props) => {
  const marvelService = useMarvelService();

  const [charList, setCharList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [newItemLoading, setNewItemLoading] = useState(false)
  const [offset, setOffset] = useState(0)
  const [charEnded, setCharEnded] = useState(false)
  const [charClose, setCharClose] = useState(false)
  const refs = useRef([]);



  const onRequest = useCallback((offset = 0) => {
    onCharListNewItemLoaded();
    marvelService
      .getAllCharacters(offset)
      .then(onCharListLoaded)
      .catch(onError);
  }, []);

  useEffect(() => {
    onRequest(0)
  }, [onRequest])

  useEffect(() => {
    refs.current = new Array(charList.length)
      .fill(null)
      .map(() => React.createRef());
  }, [charList]);



  const onCharListNewItemLoaded = () => {
    setNewItemLoading(true)
  };

  const onCharListLoaded = (newCharList) => {
    let end = false;
    let close = false;

    if (newCharList.length < 9) {
      end = true;
      close = true;
    }

    setCharList(charList => [...charList, ...newCharList])
    setLoading(false)
    setNewItemLoading(false)
    setOffset(offset => offset + 9)
    setCharEnded(end)
    setCharClose(close)

  };

  const onCharListClose = () => {
    if (charList.length <= 9) return null;

    setCharList(charList => charList.slice(0, 9),)
    setOffset(9)
    setCharEnded(false)
    setCharClose(false)
  };


  const onError = () => {
    setError(true)
    setLoading(false)
  };


  function renderItems(arr) {
    const items = arr.map((item, i) => {
      if (!refs.current[i]) {
        refs.current[i] = React.createRef();
      }
      let imgStyle = { objectFit: "cover" };
      if (
        item.thumbnail ===
        "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
      ) {
        imgStyle = { objectFit: "unset" };
      }
      const idSelected = props.isSelected === item.id

      return (
        <CSSTransition key={item.id} nodeRef={refs.current[i]} timeout={500} classNames='char__item'>

          <li ref={refs.current[i]}
            className={`char__item ${idSelected ? 'char__item_selected' : ''}`}
            onClick={() => props.onSelectedChar(item.id)}
            tabIndex={0}
          >
            <img src={item.thumbnail} alt={item.name} style={imgStyle} />
            <div className="char__name">{item.name}</div>
          </li>
        </CSSTransition>

      );
    });

    return (
      <TransitionGroup component='ul' className="char__grid" appear={true}>
        {items}
      </TransitionGroup>
    )
  }


  const items = renderItems(charList);

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error) ? items : null;

  return (
    <div className="char__list">
      {errorMessage}
      {spinner}
      {content}

      <button
        disabled={newItemLoading}
        style={{ display: charEnded ? "none" : "block" }}
        onClick={(e) => {
          e.preventDefault();
          onRequest(offset);
        }}
        className="button button__main button__long"
      >
        <div className="inner">load more</div>
      </button>
      <button
        onClick={onCharListClose}
        disabled={newItemLoading}
        style={{ display: charClose ? "block" : "none" }}
        className="button button__main button__long"
      >
        <div className="inner">close</div>
      </button>
    </div>
  );
}


export default CharList;
