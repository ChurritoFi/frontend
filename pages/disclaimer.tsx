import React from "react";
import Footer from "../components/home/footer";
import Nav from "../components/home/nav";

function Disclaimer() {
  return (
    <div>
      <Nav />

      <main className="md:mb-32 md:mt-52 mt-32 mb-16 px-8 prose prose-md lg:prose-lg mx-auto">
        <h1>Disclaimer</h1>
        <article>
          <h2>1. Information published on churrito.fi</h2>
          <p>
            The website https://churrito.fi/ (hereinafter, referred to as the
            "Website") provides information and material of a general nature.
            You are not authorized and nor should you rely on the Website for
            legal advice, business advice, or advice of any kind. You act at
            your own risk in reliance on the contents of the Website. Should you
            make a decision to act or not act you should contact a licensed
            attorney in the relevant jurisdiction in which you want or need
            help. In no way are the owners of, or contributors to, the Website
            responsible for the actions, decisions, or other behavior taken or
            not taken by you in reliance upon the Website.
          </p>
        </article>
        <article>
          <h2>2. Translations</h2>
          <p>
            The Website may contain translations of the English version of the
            content available on the Website. These translations are provided
            only as a convenience. In the event of any conflict between the
            English language version and the translated version, the English
            language version shall take precedence. If you notice any
            inconsistency, please report them on GitHub.
          </p>
        </article>
        <article>
          <h2>3. Risks related to the use of the Website</h2>
          <p>
            The Website will not be responsible for any losses, damages or
            claims arising from events falling within the scope of the following
            five categories:
          </p>
          <p>
            Mistakes made by the user of any kind, including but not limited to,
            forgotten passwords, payments sent to wrong addresses, and
            accidental deletion of wallets. Software problems of the Website
            and/or any investment-related software or service, e.g., corrupted
            wallet file, incorrectly constructed transactions, unsafe
            cryptographic libraries, malware affecting the Website and/or any
            Bitcoin-related software or service.
          </p>
          <p>
            Technical failures in the hardware of the user, e.g., data loss due
            to a faulty or damaged storage device. <br />
            Security problems experienced by the user, e.g., unauthorized access
            to users' wallets and/or accounts. <br />
            Actions or inactions of third parties and/or events experienced by
            third parties, e.g., bankruptcy of service providers, information
            security attacks on service providers, and fraud conducted by third
            parties.
          </p>
        </article>
        <article>
          <h2>4. Investment risks</h2>
          <p>
            The investment in cryptocurrencies can lead to loss of money over
            short or even long periods. The investors in cryptocurrencies should
            expect prices to have large range fluctuations. The information
            published on the Website cannot guarantee that the investors in
            cryptocurrencies would not lose money.
          </p>
          <h4>Protocol specific risks</h4>
          <p>
            Each decentralized network has it's own protocol, where each
            protocol might be different from the rest. By participating in these
            protocols you might expose yourself to several protocol specific
            risks, including but not limited to, slashing/loss of funds, burning
            of unclaimed rewards, locking of tokens for some time period or
            failure of the protocol itself. You act at your own risk when
            participating in any such protocol. In no way are the owners of, or
            contributors to, the Website responsible for mitigating such risks.
          </p>
        </article>
        <article>
          <h2>5. Compliance with tax obligations</h2>
          <p>
            The users of the Website are solely responsible to determinate what,
            if any, taxes apply to their transactions. The owners of, or
            contributors to, the Website are NOT responsible for determining the
            taxes that apply to transactions.
          </p>
        </article>
        <article>
          <h2>
            6. The Website does not store, send, or receive cryptocurrencies
          </h2>
          <p>
            The Website does not store, send or receive cryptocurrencies. This
            is because cryptocurrencies exist only by virtue of the ownership
            record maintained in the respective cryptocurrency network. Any
            transfer of title in cryptocurrencies occurs within their respective
            decentralized networks, and not on the Website.
          </p>
        </article>
        <article>
          <h2>7. No warranties</h2>
          <p>
            The Website is provided on an "as is" basis without any warranties
            of any kind regarding the Website and/or any content, data,
            materials and/or services provided on the Website.
          </p>
        </article>
        <article>
          <h2> 8. Limitation of liability</h2>
          <p>
            Unless otherwise required by law, in no event shall the owners of,
            or contributors to, the Website be liable for any damages of any
            kind, including, but not limited to, loss of use, loss of profits,
            or loss of data arising out of or in any way connected with the use
            of the Website.
          </p>
        </article>
        <article>
          <h2>9. Arbitration</h2>
          <p>
            The user of the Website agrees to arbitrate any dispute arising from
            or in connection with the Website or this disclaimer, except for
            disputes related to copyrights, logos, trademarks, trade names,
            trade secrets or patents.
          </p>
        </article>
        <article>
          <h2>10. Last amendment</h2>
          <p>
            This disclaimer was amended for the last time on August 19th, 2021.
          </p>
        </article>
      </main>
      <Footer />
    </div>
  );
}

export default Disclaimer;
