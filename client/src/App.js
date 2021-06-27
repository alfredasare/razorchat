import {lazy, Suspense, useEffect} from "react";
import {connect} from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import {Switch, Route} from 'react-router-dom';
import {createStructuredSelector} from "reselect";
import {selectCurrentUser} from "./redux/user/user.selectors";
import {getUserByEmailStart} from "./redux/user/user.actions";

const HomePage = lazy(() => import('./pages/home'));
const SignIn = lazy(() => import('./pages/signIn'));
const Chat = lazy(() => import('./pages/chat'));

function App({currentUser, getUserByEmail}) {
    const { isAuthenticated, isLoading, user } = useAuth0();

    useEffect(() => {
        if (isAuthenticated) {
            getUserByEmail(user.email);
        }

        console.log(isAuthenticated);

        // eslint-disable-next-line
    }, [isAuthenticated]);

    if (isLoading) {
        return <h1>Loading...</h1>
    }

    return (
        <Suspense fallback={<h1>Loading</h1>}>
            <Switch>
                <Route exact path='/' component={HomePage}/>
                <Route path='/signin' render={() => !isAuthenticated ? <SignIn/> : (<Chat />)}/>
                <Route path='/chat' render={() => !isAuthenticated ? <SignIn /> : (<Chat />)}/>
            </Switch>
        </Suspense>
    );
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
    getUserByEmail: email => dispatch(getUserByEmailStart(email))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
