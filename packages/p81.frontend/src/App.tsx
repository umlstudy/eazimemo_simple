import {
  ApolloClient, ApolloProvider, InMemoryCache
} from "@apollo/client";
import { Button } from "@mui/material";
import { SjButton, SjButton2 } from "@sejong/react.common";
import { ReactElement } from 'react';
import GoogleLogin from "react-google-login";
import MemoListPage from "./component/page/MemoListPage";
import SjButton3 from "./SjButton3";

const client = new ApolloClient({
  uri: 'https://48p1r2roz4.sse.codesandbox.io',
  cache: new InMemoryCache()
});

// https://react.vlpt.us/basic/13-array-insert.html
function App():ReactElement {
  const responseGoogle = (response:unknown) => {
    alert('ACCCCCCCCCCCCC');
    console.log("AAAAAAAAAAAAAAAA");

    console.log(response);
    console.log("BBBBBBBBBBBBBBBBBBB");
    alert('CCCCCCCCCCCCC');
  };

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
        clientId="659513124731-m1eujuvrfuk5ddihbv5dogqd69el7lf2.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        scope="https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email"
      />
    </ApolloProvider>
  );
}

export default App;