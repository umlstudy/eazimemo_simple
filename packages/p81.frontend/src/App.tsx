import {
  ApolloClient, ApolloProvider, InMemoryCache
} from "@apollo/client";
import { Button } from "@mui/material";
import { SjLogUtil } from "@sejong/common";
import { SjButton, SjButton2 } from "@sejong/react.common";
import { ReactElement, useState } from 'react';
import GoogleLogin, { GoogleLogout } from "react-google-login";
import { googleConfig } from "./GoogleConfig";
import SjButton3 from "./SjButton3";

const client = new ApolloClient({
  uri: 'https://48p1r2roz4.sse.codesandbox.io',
  cache: new InMemoryCache()
});

const googleClientId = googleConfig.clientId;


const LoginAndOut = () => {

  const [userEmail, setUserEmail] = useState(null);

  const responseGoogle = (response: any) => {
    SjLogUtil.debug("responseGoogle");
    SjLogUtil.debug("user_email => " + response.profileObj.email);
    SjLogUtil.debug("user_email => " + response.profileObj.googleId);
    SjLogUtil.debug("user_email => " + response.profileObj.name);

    window.localStorage.setItem("user_id", response.profileObj.googleId);
    window.localStorage.setItem("user_email", response.profileObj.email);
    window.localStorage.setItem("user_name", response.profileObj.name);
    setUserEmail(response.profileObj.email);

  };

  const responseGoogleFail = (response: any) => {
    SjLogUtil.debug("responseGoogleFail");
    console.log(response.details);
    alert(response.details);
  };

  const logout = () => {
    window.localStorage.removeItem("user_id");
    window.localStorage.removeItem("user_email");
    window.localStorage.removeItem("user_name");
  };

  const logoutFail = () => {
    SjLogUtil.debug("FAIL!!!!!!!!!!!!!!!!!!!!!");
  };

  SjLogUtil.debug("== render ==>> " + userEmail);
  return (
    <>
    {
        userEmail === null ? (
        <GoogleLogin
          clientId={googleClientId}
          buttonText="로그인"
          onSuccess={responseGoogle}
          onFailure={responseGoogleFail}
          cookiePolicy={'single_host_origin'}
          scope="https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email"
        />
        ) : (
          <>
            <div> {window.localStorage.getItem("user_name")}님({userEmail}) </div>
            <GoogleLogout
              clientId={googleClientId}
              buttonText="로그아웃"
                onLogoutSuccess={logout}
                onFailure={logoutFail}
              />
          </>
        )
    }
    </>
  )
}

// https://react.vlpt.us/basic/13-array-insert.html
function App():ReactElement {

  // <MemoListPage></MemoListPage>
  return (
    <ApolloProvider client={client}>
      <div>hello</div>
      <Button variant="contained">
         sadfasdfasdfasdf
      </Button>
      <SjButton3/>
      <SjButton2/>
      <SjButton>김김용용</SjButton>
      <br/>
      <div>
        <LoginAndOut/>
      </div>
    </ApolloProvider>
  );
}

export default App;