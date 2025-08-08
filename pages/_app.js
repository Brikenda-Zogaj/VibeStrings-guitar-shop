import '../styles/globals.css';
import { ApolloProvider } from "@apollo/client";
import client from "../lib/apollo-client";
// Correctly import the provider, not the context object
import { LanguageProvider } from "../context/LanguageContext"; 

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
       {/* Use the correct component name */}
      <LanguageProvider>
        <Component {...pageProps} />
      </LanguageProvider>
    </ApolloProvider>
  );
}

export default MyApp;