import type { AppProps } from "next/app";
import Head from "next/head";
import { createClient, Provider } from "urql";
import * as Fathom from "fathom-client";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import celoGroups from "@celo/rainbowkit-celo/lists";
import { Celo } from "@celo/rainbowkit-celo/chains";

import "tailwindcss/tailwind.css";
import "@rainbow-me/rainbowkit/styles.css";
import "../style/global.css";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useIsServer from "../hooks/useIsServer";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "churrofi-widgets-xs": any;
      "churrofi-widgets-sm": any;
      "churrofi-widgets-md": any;
      "churrofi-widgets-lg": any;
      "churrofi-widgets-xl": any;
    }
  }
}

const client = createClient({
  url: process.env.NEXT_PUBLIC_GRAPHQL_API_URL!,
});

const { chains, publicClient } = configureChains(
  [Celo],
  [
    jsonRpcProvider({
      rpc: (chain) => ({ http: chain.rpcUrls.default.http[0] }),
    }),
  ]
);
const connectors = celoGroups({
  chains,
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
  appName: "ChurritoFi",
});
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

function App({ Component, pageProps }: AppProps) {
  const isServer = useIsServer();
  const router = useRouter();

  useEffect(() => {
    Fathom.load(process.env.NEXT_PUBLIC_FATHOM_ID ?? "", {
      includedDomains: ["churrito.fi"],
      url: "https://wildcat.churrito.fi/script.js",
    });

    function onRouteChangeComplete() {
      Fathom.trackPageview();
    }
    // Record a pageview when route changes
    router.events.on("routeChangeComplete", onRouteChangeComplete);

    // Unassign event listener
    return () => {
      router.events.off("routeChangeComplete", onRouteChangeComplete);
    };
  }, []);

  const appUrl = isServer ? "https://churrito.fi" : window.location.origin;

  return (
    <>
      <Head>
        <link rel="icon" href="/churritofi-logo.png" />
        <title>ChurritoFi - Staking CELO made easy</title>
      </Head>
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider chains={chains} coolMode={true}>
          <Provider value={client}>
            {/* TODO fix the real issue(s) and remove this */}
            <div suppressHydrationWarning className="antialiased">
              {isServer ? null : (
                <>
                  <Component {...pageProps} />
                </>
              )}
            </div>
          </Provider>
        </RainbowKitProvider>
      </WagmiConfig>
    </>
  );
}
export default App;
