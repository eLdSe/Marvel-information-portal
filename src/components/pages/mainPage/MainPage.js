import { Helmet } from "react-helmet";
import RandomChar from "../../randomChar/RandomChar";
import CharList from "../../charList/CharList";
import CharInfo from "../../charInfo/CharInfo";
import ErrorBoundary from "../../errorBoundary/ErrorBoundary";
import decoration from "../../../resources/img/vision.png";
import CharSearchForm from "../../charSearchForm/CharSearchForm";


import { useState } from "react";


const MainPage = () => {
    const [selectedChar, setChar] = useState(null);


    const onSelectedChar = (id) => {
        setChar(id);
    };

    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content="Marvel information portal"
                />
                <title>Marvel information portal</title>
            </Helmet>
            <CharSearchForm />
            <ErrorBoundary>
                <RandomChar />
            </ErrorBoundary>
            <div className="char__content">
                <ErrorBoundary>
                    <CharList
                        onSelectedChar={onSelectedChar}
                        isSelected={selectedChar}
                    />
                </ErrorBoundary>
                <ErrorBoundary>
                    <CharInfo selectedChar={selectedChar} />
                </ErrorBoundary>
            </div>
            <img className="bg-decoration" src={decoration} alt="vision" />
        </>
    )
}


export default MainPage