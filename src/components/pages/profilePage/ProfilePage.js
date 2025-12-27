import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useEffect, useState } from 'react';
import Spinner from '../../spiner/Spiner';

import './profilePage.scss';

const ProfilePage = (props) => {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        console.log('STORED USER:', storedUser);

        if (!storedUser?.id) return;

        fetch(`http://localhost:5000/profile/${storedUser.id}`)
            .then(res => res.json())
            .then(data => {
                console.log('PROFILE DATA:', data);
                setUser(data);
            })
            .catch(err => console.error('PROFILE FETCH ERROR:', err));
    }, []);


    const onOutput = () => {
        localStorage.removeItem('isAuth');
        localStorage.removeItem('user');
        props.setLogin(false);
        navigate('/characters');
    };

    if (!user) {
        return <Spinner/>
    }

    return (
        <div className="profile-page">
            <Helmet>
                <meta
                    name="description"
                    content="profile information page"
                />
                <title>Profile</title>
            </Helmet>

            <div className="profile-page__card">

                <div className="profile-page__avatar">
                    <div className="avatar-placeholder"></div>
                </div>

                <div className="profile-page__info">
                    <div className="profile-page__item">
                        <span className="label">Email:</span>
                        <span className="value">{user.email}</span>
                    </div>

                    <div className="profile-page__item">
                        <span className="label">Username:</span>
                        <span className="value">{user.username}</span>
                    </div>

                    <div className="profile-page__item">
                        <span className="label">Registered:</span>
                        <span className="value">
                            {new Date(user.created_at).toLocaleDateString()}
                        </span>
                    </div>
                </div>

                <div className="profile-page__actions">
                    <button className="profile-page__btn">
                        Edit profile
                    </button>

                    <button onClick={onOutput} className="profile-page__btn logout">
                        Logout
                    </button>
                </div>

            </div>
        </div>
    );
};

export default ProfilePage;
