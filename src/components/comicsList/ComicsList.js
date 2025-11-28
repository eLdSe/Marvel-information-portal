import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spiner/Spiner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './comicsList.scss';

const ComicsList = () => {

    const [comicsList, setComicsList] = useState([]);
    const [newItemLoading, setnewItemLoading] = useState(false);
    const [offset, setOffset] = useState(0);
    const [comicsEnded, setComicsEnded] = useState(false);
    const [comicsClose, setComicsClose] = useState(false)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)


    const marvelService = new useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
    }, [])

    const onRequest = (offset, initial) => {
        initial ? setnewItemLoading(false) : setnewItemLoading(true);
        marvelService
            .getAllComics(offset)
            .then(onComicsListLoaded)
            .catch(onError)
    }

    const onError = () => {
        setError(true)
        setLoading(false)
    };

    const onComicsListLoaded = (newComicsList) => {
        let ended = false;
        let close = false
        if (newComicsList.length < 8) {
            ended = true;
            close = true
        }
        setComicsList([...comicsList, ...newComicsList]);
        setLoading(false)
        setnewItemLoading(false);
        setOffset(offset + 8);
        setComicsEnded(ended);
        setComicsClose(close)
    }

    const onComicsListClose = () => {
        if (comicsList.length <= 8) return null

        setComicsList(comicsList => comicsList.splice(0, 8))
        setOffset(8);
        setComicsClose(false)
        setComicsEnded(false)

    }

    function renderItems(arr) {
        const items = arr.map((item, i) => {
            return (
                <li className="comics__item" key={i}>
                    <Link to={`/comics/${item.id}`}>
                        <img src={item.thumbnail} alt={item.title} className="comics__item-img" />
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.price}</div>
                    </Link>
                </li>
            )
        })

        return (
            <ul className="comics__grid">
                {items}
            </ul>
        )
    }

    const items = renderItems(comicsList);

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading && !newItemLoading ? <Spinner /> : null;

    return (
        <div className="comics__list">
            {errorMessage}
            {spinner}
            {items}
            <button
                disabled={newItemLoading}
                style={{ 'display': comicsEnded ? 'none' : 'block' }}
                className="button button__main button__long"
                onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
            <button
                disabled={newItemLoading}
                style={{ 'display': comicsClose ? 'block' : 'none' }}
                className="button button__main button__long"
                onClick={onComicsListClose}>
                <div className="inner">Close</div>
            </button>
        </div>
    )
}

export default ComicsList;