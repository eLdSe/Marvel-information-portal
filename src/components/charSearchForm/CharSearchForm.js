import { useState, useRef } from "react";
import { Formik, Form, Field, ErrorMessage as FormikErrorMessage } from 'formik';
import * as Yup from 'yup';

import MarvelService from "../../services/MarvelService";

import "./charSearchForm.scss";


const marvelService = new MarvelService();

const CharSearchForm = () => {
    const [char, setChar] = useState(null);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);


    const resultRef = useRef(null);
    const inputRef = useRef(null);

    const updateChar = (name) => {
        setError(false);
        setLoading(true);

        marvelService
            .getCharacterByName(name)
            .then(res => {
                setLoading(false);

                if (res.length > 0) {
                    setChar(res[0]);
                    setError(false);
                } else {
                    setChar(null);
                    setError(true);
                }
            })
            .catch(() => {
                setLoading(false);
                setChar(null);
                setError(true);
            });
    };

    const handleBlur = () => {
        setTimeout(() => {
            if (
                resultRef.current &&
                resultRef.current.contains(document.activeElement)
            ) {
                return;
            }

            setChar(null);
            setError(false);
        }, 150);
    };

    return (
        <div className="char__search">
            <h2 className="char__search-title">Find a character</h2>

            <Formik
                initialValues={{ name: '' }}
                validationSchema={Yup.object({
                    name: Yup.string()
                })}
                onSubmit={({ name }) => updateChar(name)}
            >
                <Form className="char__search-form">
                    <Field
                        name="name"
                        type="text"
                        placeholder="Enter character name..."
                        className="char__search-input"
                        innerRef={inputRef}
                        onBlur={handleBlur}
                    />

                    <button type="submit" className="char__search-btn" disabled={loading}>
                        {loading ? "Searching..." : "Search"}
                    </button>

                    <FormikErrorMessage
                        name="name"
                        component="div"
                        className="char__search-error"
                    />
                </Form>
            </Formik>

            {char && !error && (
                <div className="char__search-result" ref={resultRef}>
                    <div className="char__search-card">
                        <a href={`/characters/${char.id}`}>
                            <img
                                src={char.thumbnail}
                                alt={char.name}
                                className="char__search-img char__search-img--clickable"
                            />
                        </a>
                        <div className="char__search-info">
                            <h3>{char.name}</h3>
                            <a className="char__search-link" href={`/characters/${char.id}`}>
                                Go to page
                            </a>
                        </div>
                    </div>
                </div>
            )}

            {error && (
                <p className="char__search-error">
                    Character not found
                </p>
            )}
        </div>
    );

};

export default CharSearchForm;
