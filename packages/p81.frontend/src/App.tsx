import {
  ApolloClient, ApolloProvider, InMemoryCache
} from "@apollo/client";
import { Button } from "@mui/material";
import { SjButton, SjButton2 } from "@sejong/react.common";
import { ReactElement } from 'react';
import SjButton3 from "./SjButton3";

const client = new ApolloClient({
  uri: 'https://48p1r2roz4.sse.codesandbox.io',
  cache: new InMemoryCache()
});

// https://react.vlpt.us/basic/13-array-insert.html
function App():ReactElement {
  return (
    <ApolloProvider client={client}>
      <div>hello</div>
      <Button variant="contained">
         sadfasdfasdfasdf
      </Button>
      <SjButton3/>
      <SjButton2/>
      <SjButton>김김용용</SjButton>
    </ApolloProvider>
  );
}

export default App;