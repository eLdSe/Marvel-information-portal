import { Link, useParams } from 'react-router-dom';
import { useEffect, useState, useCallback } from "react";
import { Helmet } from 'react-helmet';

import Spinner from "../../spiner/Spiner";
import ErrorMessage from "../../errorMessage/ErrorMessage";
import useMarvelService from "../../../services/MarvelService";
import Skeleton from '../../skeleton/Skeleton';

import './singleComic.scss';

const SingleComic = () => {

    const { getComics, onProcess,setProcess ,clearError} = useMarvelService();

    const [comic, setComic] = useState(null)
    const { comicId } = useParams()


    const updateComic = useCallback(() => {
        clearError()
        getComics(comicId)
            .then(onComicLoad)
            .then(()=> setProcess('confirmed'))
    }, [comicId]);


    useEffect(() => {
        updateComic();
    }, [updateComic]);


    const onComicLoad = (comic) => {
        setComic(comic)
    };


    const setContent = (process, comic) => {
        switch (process) {
            case 'waiting':
                return <Skeleton />
                break
            case 'loadind':
                return <Spinner />
                break
            case 'confirmed':
                return <View comic={comic}/>
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
        <div className="single-comic">
            {setContent(onProcess,comic)}
        </div>
    )
}

const View = ({ comic }) => {
    const { title, decoration, pageCount, thumbnail, language, price } = comic
    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content={`${title} information page`}
                />
                <title>{title}</title>
            </Helmet>

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