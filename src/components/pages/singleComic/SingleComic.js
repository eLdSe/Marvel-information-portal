import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from "react";

import Spinner from "../../spiner/Spiner";
import ErrorMessage from "../../errorMessage/ErrorMessage";
import MarvelService from "../../../services/MarvelService";
import Skeleton from '../../skeleton/Skeleton';

import './singleComic.scss';


const SingleComic = () => {


    const [comic, setComic] = useState(null)
    const [Loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const { comicId } = useParams()


    const marvelService = new MarvelService();

    useEffect(() => {
        updateComic()
    }, [comicId])


    const updateComic = () => {
        onComicLoading();
        marvelService
            .getComics(comicId)
            .then(onComicLoad)
            .catch(onError);
    };

    const onComicLoad = (comic) => {
        setComic(comic)
        setLoading(false)
    };

    const onError = () => {
        setLoading(false)
        setError(true)
    };

    const onComicLoading = () => {
        setLoading(true)
    };

    const skeleton = comic || Loading || error ? null : <Skeleton />;
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = Loading ? <Spinner /> : null;
    const content = !(Loading || error || !comic) ? <View comic={comic} /> : null;

    return (
        <div className="single-comic">
            {skeleton}
            {errorMessage}
            {spinner}
            {content}
        </div>
    )
}

const View = ({ comic }) => {
    const {title, decoration, pageCount, thumbnail, language,price} = comic
    return (
        <>
            <img src={thumbnail} alt={title} className="single-comic__img" />
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{decoration}</p>
                <p className="single-comic__descr">{pageCount}</p>
                <p className="single-comic__descr">{language}</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <Link to={"/comics"} className="single-comic__back">Back to all</Link>
        </>
    )
}

export default SingleComic;