import React, { Suspense, useContext } from "react";
import Home from "./pages/home/Home"
import Register from "./pages/register/Register"
import AuthContext from './store/auth-context';
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Layout from "./layouts/Layout";
import Faqs from "./components/faqs/Faqs"
import Leaderboard from "./pages/leaderboard/Leaderboard"
import Profile from "./pages/profile/Profile"
import Market from "./pages/market/Market"
// import Error from "./pages/error/Error"
import LoadingSpinner from './components/misc/LoadingSpinner/LoadingSpinner'
import JoinRoom from './components/game/onboard/joinroom'
import Onboard from './components/game/onboard/onboard'
import JoinGame from './components/game/onboard/joingame'
import ChessGame from './components/game/chessUI/chessgame'
import {ColorContext} from './store/colorcontext'
import History from "./pages/history/History";
import Token from "./pages/token/Token";
import HistoryBoard from "./components/history/HistoryBoard";
import Nft from './components/market/Nft';

function Routes(){
    const ctx = useContext(AuthContext)
    const [didRedirect, setDidRedirect] = React.useState(false)

    const playerDidRedirect = React.useCallback(() => {
      setDidRedirect(true)
    }, [])
  
    const playerDidNotRedirect = React.useCallback(() => {
      setDidRedirect(false)
    }, [])
  
    const [userName, setUserName] = React.useState('')
    return (
<ColorContext.Provider value = {{didRedirect: didRedirect, playerDidRedirect: playerDidRedirect, playerDidNotRedirect: playerDidNotRedirect}}>
<BrowserRouter>
  <Layout>
    <Suspense
      fallback={
        <div className="centered">
          <LoadingSpinner />
        </div>
      }
    >
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        {!ctx.registered && <Route path="/register" exact>
          <Register />
        </Route>}
        {ctx.registered && <Route path = "/game" exact>
          <Onboard setUserName = {setUserName}/>
        </Route>}
        {ctx.registered && <Route path = "/game/:gameid/:mode/:addr/:amount/:nft" exact>
          {didRedirect ? 
            <React.Fragment>
              <JoinGame userName = {userName} isCreator = {true} />
              <ChessGame myUserName = {userName} />
            </React.Fragment> 
            :
          <JoinRoom />}
        </Route>}
        {ctx.registered && <Route path="/leaderboard" exact>
          <Leaderboard />
        </Route>}
        {ctx.registered && <Route path="/history/:id" exact>
          <History />
        </Route>}
        {ctx.registered && <Route path="/history" exact>
          <HistoryBoard />
        </Route>}
        {ctx.registered && <Route path="/market" exact>
          <Market />
        </Route>}
        {ctx.registered && <Route path="/tokens" exact>
          <Token />
        </Route>}
        {ctx.registered && <Route path="/profile/:id" exact>
          <Profile />
        </Route>}
        {ctx.registered && <Route path="/profile" exact>
          <Profile />
        </Route>}
        {ctx.registered && <Route path="/market/:id" exact>
          <Nft />
        </Route>}
        <Route path="/faq" exact>
          <Faqs />
        </Route>
        <Route path="*">
          <Home />
        </Route>
      </Switch>
    </Suspense>
  </Layout>
</BrowserRouter>
</ColorContext.Provider>)

}
export default Routes