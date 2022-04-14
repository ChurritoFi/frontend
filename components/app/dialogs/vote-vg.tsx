import { Dialog, RadioGroup, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { floatToPercentage } from "../../../lib/utils";
import { VgSuggestion } from "../../../lib/types";

function VoteVg({
  open,
  setOpen,
  selectedVg,
  setSelectedVg,
  validatorGroups,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedVg: string | null | undefined;
  setSelectedVg: React.Dispatch<React.SetStateAction<string | any>>;
  validatorGroups: VgSuggestion[];
}) {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        static
        className="fixed z-30 inset-0 overflow-y-auto"
        open={open}
        onClose={setOpen}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-dark bg-opacity-90 transition-opacity" />
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
            <div className="inline-block bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all my-8 align-middle px-10 py-7">
              <div>
                <div className="mt-5">
                  <div className="flex justify-between items-baseline">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium text-gray-dark"
                    >
                      Select Validator Group
                    </Dialog.Title>
                    <button
                      className="px-8 py-2 bg-primary text-white text-lg rounded-md shadow hover:bg-primary-dark focus:bg-primary-dark focus:outline-none active:bg-primary-dark-dark"
                      onClick={() => setOpen(false)}
                    >
                      Continue
                    </button>
                  </div>
                  <div className="mt-5">
                    <div className="flex overflow-x-auto">
                      <RadioGroup value={selectedVg} onChange={setSelectedVg}>
                        <div className="relative bg-white rounded-md -space-y-px">
                          <div
                            className="grid gap-5 lg:gap-12 p-4 text-sm text-gray"
                            style={{
                              gridTemplateColumns: "0.5fr 2fr 1fr 1fr 1fr 1fr",
                            }}
                          >
                            <div className="text-center">Select</div>
                            <div className="text-left">Validator Group</div>
                            <div className="text-center">Group Score</div>
                            <div className="text-center">Performance Score</div>
                            <div className="text-center">
                              Transparency Score
                            </div>
                            <div className="text-center">Estimated APY</div>
                          </div>
                          {validatorGroups.slice(0, 5).map((vg, vgIdx) => (
                            <RadioGroup.Option
                              key={vg.address}
                              value={vg.address}
                              className={({ checked }) =>
                                `${
                                  vgIdx === 0
                                    ? "rounded-tl-md rounded-tr-md"
                                    : ""
                                } ${
                                  vgIdx === validatorGroups.length - 1
                                    ? "rounded-bl-md rounded-br-md"
                                    : ""
                                } ${
                                  checked
                                    ? "bg-primary-light-light border-primary-light z-10"
                                    : "border-gray-light"
                                } relative border p-4 cursor-pointer focus:outline-none`
                              }
                            >
                              {({ active, checked }) => (
                                <>
                                  <div
                                    className="grid gap-5 lg:gap-12 text-gray-dark text-lg"
                                    style={{
                                      gridTemplateColumns:
                                        "0.5fr 2fr 1fr 1fr 1fr 1fr",
                                    }}
                                  >
                                    <div
                                      className={`${
                                        checked
                                          ? "bg-primary-dark border-transparent"
                                          : "bg-white border-gray-dark"
                                      } ${
                                        active
                                          ? "ring-2 ring-offset-2 ring-primary"
                                          : ""
                                      } h-4 w-4 rounded-full border flex items-center justify-center flex-shrink-0 mx-auto my-auto`}
                                      aria-hidden="true"
                                    >
                                      <span className="rounded-full bg-white w-1.5 h-1.5" />
                                    </div>

                                    <RadioGroup.Label
                                      as="span"
                                      className="text-left"
                                    >
                                      {vg.name == ""
                                        ? `...${vg.address.slice(-7)}`
                                        : vg.name}
                                    </RadioGroup.Label>
                                    <RadioGroup.Description className="text-center">
                                      {floatToPercentage(vg.group_score)}%
                                    </RadioGroup.Description>
                                    <RadioGroup.Description className="text-center">
                                      {floatToPercentage(vg.performance_score)}%
                                    </RadioGroup.Description>
                                    <RadioGroup.Description className="text-center">
                                      {floatToPercentage(vg.transparency_score)}
                                      %
                                    </RadioGroup.Description>
                                    <RadioGroup.Description className="text-center">
                                      {vg.estimated_apy.toFixed(2)}%
                                    </RadioGroup.Description>
                                  </div>
                                </>
                              )}
                            </RadioGroup.Option>
                          ))}
                        </div>
                      </RadioGroup>
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

export default VoteVg;
