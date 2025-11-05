import { Component } from "react";

import Spinner from "../spiner/Spiner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import MarvelService from "../../services/MarvelService";

import "./charList.scss";

class CharList extends Component {
  state = {
    charList: [],
    loading: true,
    error: false,
    newItemLoading: false,
    offset: 0,
    charEnded: false, 
  };

  marvelService = new MarvelService();

  componentDidMount() {
    this.onRequest();
  }

  onRequest = (offset) => {
    this.onCharListNewItemLoaded();
    this.marvelService
      .getAllCharacters(offset)
      .then(this.onCharListLoaded)
      .catch(this.onError);
  };

  onCharListNewItemLoaded = () => {
    this.setState({
      newItemLoading: true,
    });
  };

  onCharListLoaded = (newCharList) => {
    let end = false; 
    if (newCharList.length < 9){
      end = true
    }

    this.setState(({offset , charList}) =>({
      charList: [...charList,...newCharList],
      loading:false,
      newItemLoading:false,
      offset: offset+9,
      charEnded:end
    }))
  };

  onError = () => {
    this.setState({
      error: true,
      loading: false,
    });
  };
  renderItems(arr) {
    const items = arr.map((item) => {
      let imgStyle = { objectFit: "cover" };
      if (
        item.thumbnail ===
        "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
      ) {
        imgStyle = { objectFit: "unset" };
      }

      return (
        <li
          className="char__item"
          key={item.id}
          onClick={() => this.props.onSelectedChar(item.id)}
        >
          <img src={item.thumbnail} alt={item.name} style={imgStyle} />
          <div className="char__name">{item.name}</div>
        </li>
      );
    });
    // А эта конструкция вынесена для центровки спиннера/ошибки
    return <ul className="char__grid">{items}</ul>;
  }

  render() {
    const { charList, loading, error, newItemLoading, offset , charEnded} = this.state;

    const items = this.renderItems(charList);

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
          style={{'display': charEnded? 'none' : 'block'}} 
          onClick={(e)=> {
            e.preventDefault(); 
            this.onRequest(offset);} }   
            className="button button__main button__long">
          <div className="inner">load more</div>
        </button>
      </div>
    );
  }
}


export default CharList;
