import {Component } from 'react';

import MarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spiner/Spiner';

import './charList.scss';
import abyss from '../../resources/img/abyss.jpg';

class CharList extends Component {
    state={
        chars:[],
        loader:true,
        error: false
    }
    
    marvelServis = new MarvelService()
    

    componentDidMount(){
        this.onUpdateCharList(1)
    }

    onUpdateCharList =(offset = 0)=>{
        this.marvelServis
            .getAllCharacters(offset)
            .then(this.onCharListLoaded)
            .catch(this.onError)
    }

    onCharListLoaded =(chars)=>{
        this.setState({
            chars,
            loader:false
        });
    } 

    onError = () => {
        this.setState({
            error: true, 
            loading: false });
    }

    renderItem = (chars) => {
        if (!Array.isArray(chars)) return null;

        return chars.map(char => (
            <li key={char.name} className="char__item">
                <img src={char.thumbnail || abyss} alt={char.name} />
                <div className="char__name">{char.name}</div>
            </li>
        ));
    }



    render(){
        const {chars, loader , error} = this.state
        const item = this.renderItem(chars)
        const errorMessage = error? <ErrorMessage/> : null
        const spinner = loader? <Spinner/> : null
        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                <ul className="char__grid">
                    {item}
                </ul>
                <button className="button button__main button__long">
                    <div onClick={(e)=> {
                        e.preventDefault();
                        this.onUpdateCharList(chars.length)}} className="inner">load more</div>
                </button>
            </div>
        )
    }

}

export default CharList;