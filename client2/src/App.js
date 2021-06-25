import {lazy, Suspense, useEffect} from "react";
import {connect} from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import {Switch, Route} from 'react-router-dom';
import {createStructuredSelector} from "reselect";
import {selectCurrentUser} from "./redux/user/user.selectors";

const HomePage = lazy(() => import('./pages/home'));
const SignIn = lazy(() => import('./pages/signIn'));
const Chat = lazy(() => import('./pages/chat'));

function App() {
    const { isAuthenticated, isLoading } = useAuth0();

    useEffect(() => {
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

export default connect(mapStateToProps)(App);
