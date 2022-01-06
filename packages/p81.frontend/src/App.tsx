import {
  ApolloClient, ApolloProvider, InMemoryCache
} from "@apollo/client";
import { ReactElement } from 'react';

const client = new ApolloClient({
  uri: 'https://48p1r2roz4.sse.codesandbox.io',
  cache: new InMemoryCache()
});

// https://react.vlpt.us/basic/13-array-insert.html
function App():ReactElement {
  return (
    <ApolloProvider client={client}>
      <div>hello</div>
    </ApolloProvider>
  );
}

export default App;