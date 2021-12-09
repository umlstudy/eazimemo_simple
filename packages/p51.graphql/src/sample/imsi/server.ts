// https://helloinyong.tistory.com/265

// $ npm install -S apollo-server-express compression express graphql
// $ npm install -D @types/compression @types/express @types/graphql @types/graphql - depth - limit @types/node graphql-depth-limit graphql-import graphql-import-node

import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import depthLimit from 'graphql-depth-limit';
import { createServer } from 'http';
import compression from 'compression';
import cors from 'cors';
import schema from './schema';

const app = express();
const server = new ApolloServer({
    schema,
    validationRules: [depthLimit(7)],
});

app.use('*', cors );
app.use(compression());

server.applyMiddleware({ app, path: '/graphql' });

const httpServer = createServer(app);
httpServer.listen(
    { port: 8000 },
    (): void => console.log(`server Start`)
);