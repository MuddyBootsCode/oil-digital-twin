import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
    uri: 'http://0.0.0.0:4000',
    cache: new InMemoryCache(),
});

export default client;