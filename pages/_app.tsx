import type { AppProps } from "next/app";
import Head from "next/head";
import { Web3ContractCache } from "@celo/contractkit/lib/web3-contract-cache";
import { WrapperCache } from "@celo/contractkit/lib/contract-cache";
import { AddressRegistry } from "@celo/contractkit/lib/address-registry";
import { ContractKit } from "@celo/contractkit";
import { CeloProvider } from "@celo/react-celo";
import { createClient, Provider } from "urql";
import * as Fathom from "fathom-client";

import "tailwindcss/tailwind.css";
import "@celo/react-celo/lib/styles.css";
import "../style/global.css";
import { useRouter } from "next/router";
import { useEffect } from "react";

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

// This creates a contracts cache exactly the same as contractkit.contracts
// See https://github.com/celo-org/react-celo/blob/master/guides/contract-cache-recipes.md
// TODO: use only the contracts we need
function fullContractsCache(
  connection: ContractKit["connection"],
  registry: AddressRegistry
) {
  const web3Contracts = new Web3ContractCache(registry);
  return new WrapperCache(connection, web3Contracts, registry);
}

const client = createClient({
  url: process.env.NEXT_PUBLIC_GRAPHQL_API_URL!,
});

function App({ Component, pageProps }: AppProps) {
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

  const appUrl =
    typeof window === "undefined"
      ? "https://churrito.fi"
      : window.location.origin;

  return (
    <div>
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Jost:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;500;600;700&family=Jost:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/churritofi-logo.png" />
        <title>ChurritoFi - Staking CELO made easy</title>
      </Head>
      <CeloProvider
        dapp={{
          name: "ChurritoFi",
          description: "Stake your CELO",
          url: appUrl,
          icon: `${appUrl}/favicon.ico`,
        }}
        buildContractsCache={fullContractsCache}
      >
        <Provider value={client}>
          <div suppressHydrationWarning className="antialiased">
            {typeof window === "undefined" ? null : (
              <>
                <Component {...pageProps} />
              </>
            )}
          </div>
        </Provider>
      </CeloProvider>
    </div>
  );
}
export default App;
