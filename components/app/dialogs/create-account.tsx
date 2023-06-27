import React, { Fragment, useCallback, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import CreateAccountAsset from "../../icons/create-account-asset";
import { waitForTransaction } from "@wagmi/core";
import { useCelo } from "../../../hooks/useCelo";
import { createWalletAction } from "../../../lib/walletAction";

function CreateAccount() {
  const [open, setOpen] = useState(false);
  const { address, contracts } = useCelo();

  const findIfAccountExists = useCallback(async () => {
    if (!address) {
      setOpen(false);
      return;
    }
    try {
      const accounts = await contracts.getAccounts();
      const isAccount = await accounts.read.isAccount([address]);
      setOpen(!isAccount);
      console.log("isAccount", isAccount);
    } catch (err) {
      console.log("Failed to determine account", err);
    }
  }, [address]);

  const createAccount = useCallback(
    createWalletAction(async () => {
      console.log("creating account");
      if (address == null) return;
      try {
        const accounts = await contracts.getAccounts();
        const txHash = await accounts.write.createAccount();
        console.log("txHash", txHash);
        await waitForTransaction({ hash: txHash });
      } catch (err) {
        console.log("there is an err");
        console.log(err);
        throw err;
      } finally {
        findIfAccountExists();
      }
    }),
    [address]
  );

  useEffect(() => {
    console.log(`Current address: ${address}`);
    findIfAccountExists();
  }, [address]);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        static
        className="fixed z-10 inset-0 overflow-y-auto"
        open={open}
        onClose={() => console.log("This doesn't close")}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as="div"
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 z-20 bg-gray-dark bg-opacity-90 transition-opacity" />{" "}
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block bg-white rounded-lg text-center overflow-hidden shadow-xl transform transition-all my-8 align-middle p-5 lg:p-14 max-w-sm relative z-30">
              <div>
                <div className="mt-5">
                  <div className="flex flex-col items-center">
                    <Dialog.Title
                      as="h3"
                      className="text-2xl font-medium text-primary"
                    >
                      Create Account For Wallet
                    </Dialog.Title>
                    <Dialog.Description as="p" className="mt-5 text-gray">
                      It seems there is no Account created for this Wallet
                      Address yet. Create an Account & start staking your CELO.
                    </Dialog.Description>
                    <div className="mt-8">
                      <CreateAccountAsset />
                    </div>
                    <div className="mt-8">
                      <button
                        className="px-8 py-2 w-full bg-primary text-white text-lg border border-primary rounded-md shadow focus:outline-none"
                        onClick={createAccount}
                      >
                        Create Account
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default CreateAccount;
