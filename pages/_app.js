import "../styles/globals.css";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import theme from "../utils/theme";
import { SessionProvider } from "next-auth/react";
import { NhostNextProvider } from "@nhost/nextjs";
import { NhostApolloProvider } from "@nhost/react-apollo";
import { NhostClient } from "@nhost/react";

const nhost = new NhostClient({
  subdomain: process.env.NEXT_PUBLIC_NHOST_SUBDOMAIN || "",
  region: process.env.NEXT_PUBLIC_NHOST_REGION || "",
});

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <NhostNextProvider nhost={nhost}>
          <NhostApolloProvider nhost={nhost}>
            <Component {...pageProps} />
          </NhostApolloProvider>
        </NhostNextProvider>
      </ChakraProvider>
    </SessionProvider>
  );
}

export default MyApp;
export { nhost };
