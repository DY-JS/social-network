import React, {FC} from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Header from "./components/header/Header";
import Navbar from "./components/navbar/Navbar";
import Profile from "./components/profile/Profile";
import Dialogs from "./components/dialogs/Dialogs";
import News from "./components/news/News";
import Music from "./components/music/Music";
import Settings from "./components/settings/Settings";
import {Provider} from "react-redux";
import store from "./redux/store";
import DialogsContainer from "./containers/DialogsContainer";
import ProfileContainer from './containers/ProfileContainer';
import Users from "./components/users/Users";
import {UsersContainer} from "./containers/UsersContainer";

// interface AppProps {
//     profilePage: IProfilePage;
//     dialogsPage: IDialogsPage;
//     sidebar: SidebarType;
// }

const App = () => {
    return (
        <BrowserRouter>
            <Provider store={store}>
            <div className="app-wrapper">
                <Header/>
                <Navbar/>
                <div className="app-content">
                    <Switch>
                        <Route path='/dialogs' render={() => <DialogsContainer /> }/>
                        <Route path='/profile' render={() => <ProfileContainer />}/>
                        {/*<Route path='/dialogs' component={Dialogs}/>*/}
                        {/*<Route path='/profile' component={Profile}/>*/}
                        <Route path='/news' component={News}/>
                        <Route path='/music' component={Music}/>
                        <Route path='/settings' component={Settings}/>
                        <Route path='/users' component={UsersContainer}/>
                    </Switch>
                </div>
            </div>
            </Provider>
        </BrowserRouter>
    );
}

export default App;
