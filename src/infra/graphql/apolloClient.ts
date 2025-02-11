import { ApolloClient, InMemoryCache, HttpLink, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { cookiesService } from "@infra/cookies/cookies.service";
import { environmentService } from "@infra/environment/environment.service";

const environment = environmentService();
const cookies = cookiesService();

const httpLink = new HttpLink({
  uri: environment.baseApiUrl,
});

const authLink = setContext((_, { headers }) => {
  const token = cookies.get("accessToken");
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const httpClient = new ApolloClient({
  link: from([authLink, httpLink]),
  cache: new InMemoryCache(),
});

export default httpClient;
