import { ApolloClient, InMemoryCache, HttpLink, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { cookiesService } from "@infra/cookies/cookies.service";
import { environmentService } from "@infra/environment/environment.service";

const environment = environmentService();
const cookies = cookiesService();

// Configuração do link HTTP para Apollo Client
const httpLink = new HttpLink({
  uri: environment.baseApiUrl + 'graphql',  // URL do seu servidor GraphQL
  fetchOptions: {
    mode: 'cors', // Definir o modo como CORS
    credentials: 'include',
    method: 'POST',  // Permite que cookies sejam enviados com as requisições
  },
});

// Configuração de autenticação com o token
const authLink = setContext((_, { headers }) => {
  const token = cookies.get("accessToken");  // Pegando o token do cookie
  return {
    headers: {
      ...headers,
      'Connection': 'keep-alive',
      Authorization: token ? `Bearer ${token}` : "",  // Remova a vírgula extra
      'Content-Type': 'application/json',
    },
  };
});

// Configuração final do Apollo Client
const client = new ApolloClient({
  link: from([authLink, httpLink]),  // Combinando o authLink e o httpLink
  cache: new InMemoryCache(),  // Configuração do cache para o Apollo
});

export default client;
