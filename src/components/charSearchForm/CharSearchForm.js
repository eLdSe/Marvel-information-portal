import { useRef, useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage as FormikErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';

import decoration from '../../resources/img/Avengers_logo.png'
import './charSearchForm.scss';

const levenshtein = (a, b) => {
    a = a.toLowerCase();
    b = b.toLowerCase();

    const matrix = Array.from({ length: a.length + 1 }, () =>
        Array(b.length + 1).fill(0)
    );

    for (let i = 0; i <= a.length; i++) matrix[i][0] = i;
    for (let j = 0; j <= b.length; j++) matrix[0][j] = j;

    for (let i = 1; i <= a.length; i++) {
        for (let j = 1; j <= b.length; j++) {
            const cost = a[i - 1] === b[j - 1] ? 0 : 1;

            matrix[i][j] = Math.min(
                matrix[i - 1][j] + 1,
                matrix[i][j - 1] + 1,
                matrix[i - 1][j - 1] + cost
            );
        }
    }

    return matrix[a.length][b.length];
};


const CharSearchForm = () => {
    const [char, setChar] = useState({});
    const searchRef = useRef(null)
    const [term, setTerm] = useState('');

    const { error, getCharacterByName, clearError } = useMarvelService();


    useEffect(() => {
        updateChar()
    }, [])

    const onCharLoaded = (char) => {
        setChar(char);
    }

    const updateChar = (name) => {
        clearError();

        getCharacterByName(name)
            .then(onCharLoaded);
    }

    const searchCharacters = (items, term) => {
        if (!term) return items;

        const normalizedTerm = term.toLowerCase();

        return items.filter(item => {
            const name = item.name.toLowerCase();

            return (
                name.startsWith(normalizedTerm) ||
                name.includes(normalizedTerm) ||
                levenshtein(name, normalizedTerm) <= 2
            );
        });
    };


    const onUpdateSearch = (value) => {
        setTerm(value);
    };


    const errorMessage = error ? <div className="char__search-critical-error"><ErrorMessage /></div> : null;

    const filteredChars = char ? searchCharacters(char, term) : null;

    const results =
        !term.trim()
            ? null
            : filteredChars && filteredChars.length > 0
                ? (
                    <ul className="char__search-list">
                        {filteredChars.slice(0, 5).map(char => (
                            <li key={char.id} className="char__search-item">
                                <Link to={`/characters/${char.id}`}>
                                    <img
                                        src={char.thumbnail}
                                        alt={char.name}
                                    />
                                    <span>{char.name}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                )
                : (
                    <div className="char__search-error">
                        The character was not found. Check the name and try again
                    </div>
                );


    return (
        <div className="char__search-form" ref={searchRef}>
            <Formik
                initialValues={{
                    charName: ''
                }}
                validationSchema={Yup.object({
                    charName: Yup.string()
                })}
                onSubmit={() => { }}
            >
                <Form>
                    <label className="char__search-label" htmlFor="charName">Or find a character by name:</label>
                    <div className="char__search-wrapper">
                        <Field name="charName">
                            {({ field }) => (
                                <input
                                    {...field}
                                    type="text"
                                    placeholder="Enter name"
                                    onChange={(e) => {
                                        field.onChange(e);
                                        onUpdateSearch(e.target.value);
                                    }}
                                />
                            )}
                        </Field>
                        <img src={decoration} alt="decoration" className='decoration' />
                    </div>
                    <FormikErrorMessage component="div" className="char__search-error" name="charName" />
                </Form>
            </Formik>
            {results}
            {errorMessage}
        </div>
    )
}

export default CharSearchForm;