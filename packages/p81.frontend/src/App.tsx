import {
  ApolloClient, ApolloProvider, InMemoryCache
} from "@apollo/client";
import { ReactElement } from 'react';
import DocPhoto from './DocPhoto';

const client = new ApolloClient({
  uri: 'https://48p1r2roz4.sse.codesandbox.io',
  cache: new InMemoryCache()
});

// https://react.vlpt.us/basic/13-array-insert.html
function App():ReactElement {
  return (
    <ApolloProvider client={client}>
      <DocPhoto breed='aaa'/>
    </ApolloProvider>
  );
}

export default App;