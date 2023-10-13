import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import News from './components/news/News';
import Music from './components/music/Music';
import Settings from './components/settings/Settings';
import { Provider } from 'react-redux';
import store from './redux/store';
import DialogsContainer from './containers/DialogsContainer';
import ProfileContainer from './containers/ProfileContainer';
import UsersContainer from './containers/UsersContainer';
import HeaderContainer from './containers/HeaderContainer';
import Login from './components/login/Login';
import AuthRedirectForFC from './HOC/AuthRedirectForFC';

const App = () => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <div className='app-wrapper'>
                    <HeaderContainer />
                    <Navbar />
                    <div className='app-content'>
                        <Switch>
                            <Route path='/dialogs' component={AuthRedirectForFC(DialogsContainer)} />
                            {/*<Route path='/profile/:userId' render={*/}
                            {/*    (props) => <ProfileContainer {...props} />} />*/}

                            <Route path='/profile/:userId' component={ProfileContainer} />
                            <Route path='/news' component={News} />
                            <Route path='/music' component={Music} />
                            <Route path='/settings' component={Settings} />
                            <Route path='/users' component={UsersContainer} />
                            <Route path='/login' component={Login} />
                        </Switch>
                    </div>
                </div>
            </Provider>
        </BrowserRouter>
    );
};

export default App;
