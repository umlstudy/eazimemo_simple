import {
  ApolloClient, ApolloProvider, InMemoryCache
} from "@apollo/client";
import { Button } from "@mui/material";
import { SjButton, SjButton2 } from "@sejong/react.common";
import { ReactElement, useState } from 'react';
import GoogleLogin, { GoogleLogout } from "react-google-login";
import MemoListPage from "./component/page/MemoListPage";
import SjButton3 from "./SjButton3";
import { googleConfig } from "./GoogleConfig";

const client = new ApolloClient({
  uri: 'https://48p1r2roz4.sse.codesandbox.io',
  cache: new InMemoryCache()
});

const googleClientId = '617246850621-95f9qhmehd380g2df86pjhrqc84n8nij.apps.googleusercontent.com'

const success = (response:unknown) => {
  console.log(response) // eslint-disable-line
}

const error = (response: unknown) => {
  console.error(response) // eslint-disable-line
}

const loading = () => {
  console.log('loading') // eslint-disable-line
}


const MountTest = () => {
  const [showButton, toggleShow] = useState(true)

  if (showButton) {
    return (
      <GoogleLogin
        onSuccess={res => {
          toggleShow(false)
          success(res)
        }}
        onFailure={error}
        clientId={googleClientId}
        redirectUri="http://localhost:3000/"
      >
        Auth then Hide button
      </GoogleLogin>
    )
  }

  return <button onClick={() => toggleShow(true)}>show button</button>
}

// https://react.vlpt.us/basic/13-array-insert.html
function App():ReactElement {
  const responseGoogle = (response:unknown) => {
    // alert('ACCCCCCCCCCCCC');
    console.log("AAAAAAAAAAAAAAAA");

    console.log(response);
    console.log("BBBBBBBBBBBBBBBBBBB");
    // alert('CCCCCCCCCCCCC');
  };


  const logout = () => {
    console.log('logout');
    console.log('logout2');
    console.log('logout3');
  }

  return (
    <ApolloProvider client={client}>
      <div>hello</div>
      <Button variant="contained">
         sadfasdfasdfasdf
      </Button>
      <SjButton3/>
      <SjButton2/>
      <SjButton>김김용용</SjButton>
      <MemoListPage></MemoListPage>
      <br/>
      <GoogleLogin
        clientId={googleConfig.clientId}
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        scope="https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email"
      />
      <div>
        <MountTest />
        <br />
        <br />
        <GoogleLogin
          clientId={googleClientId}
          scope="https://www.googleapis.com/auth/analytics"
          onSuccess={success}
          onFailure={error}
          onRequest={loading}
          responseType="id_token"
          isSignedIn
          theme="dark"
        // disabled
        // prompt="consent"
        // className='button'
        // style={{ color: 'red' }}
        >
          <span>Analytics</span>
        </GoogleLogin>
        <br />
        <br />
        <GoogleLogin
          clientId={googleClientId}
          scope="https://www.googleapis.com/auth/adwords"
          onSuccess={success}
          onFailure={error}
          onRequest={loading}
          responseType="code"
        // uxMode="redirect"
        // redirectUri="http://google.com"
        // disabled
        // prompt="consent"
        // className='button'
        // style={{ color: 'red' }}
        >
          <span>Adwords</span>
        </GoogleLogin>
        <br />
        <br />
        <GoogleLogin onSuccess={success} onFailure={error} clientId={googleClientId} />
        <br />
        <br />
        <GoogleLogin theme="dark" onSuccess={success} onFailure={error} clientId={googleClientId} />
        <br />
        <br />
        <GoogleLogin theme="dark" style={{ background: 'blue' }} onSuccess={success} onFailure={error} clientId={googleClientId} 
        redirectUri="http://localhost:3000/"/>
        <br />
        <br />
        <GoogleLogout 
          clientId={googleClientId} 
          buttonText="Logout" 
          onLogoutSuccess={logout} />
      </div>
    </ApolloProvider>
  );
}

export default App;