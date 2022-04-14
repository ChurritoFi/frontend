import { Transition } from "@headlessui/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import Footer from "../../components/home/footer";
import Nav from "../../components/home/nav";
import useValidatorGroups from "../../hooks/useValidatorGroups";
import { FIELDS, Order, SortStatus } from "../../lib/explorer-types";
import { Validator, ValidatorGroup } from "../../lib/types";
import ReactTooltip from "react-tooltip";
import CopyIcon from "../../components/icons/copy";
import ProfileBadge from "../../components/icons/profile-claimed";
import Mobile from "../../components/mobile-view";
import { ValidatorsBlock } from "../../components/vg/ValidatorsBlock";

const formatter = new Intl.NumberFormat("en-US");

function calculateScore(vg: ValidatorGroup) {
  return vg.transparency_score * 0.1 + vg.performance_score * 0.9;
}

function hasProfile(vg: ValidatorGroup) {
  return (
    vg.email || vg.geographic_location || vg.twitter_username || vg.discord_tag
  );
}

function ValidatorExplorer() {
  const [validatorGroups, setValidatorGroups] = useState<ValidatorGroup[]>([]);
  const [sortStatus, setSortStatus] = useState<SortStatus>({
    key: "score",
    order: Order.DESC,
  });

  const [expandedVg, setExpandedVg] = useState("");

  const {
    fetching,
    error,
    data: validatorGroupsFromAPI,
  } = useValidatorGroups(true);

  useEffect(() => {
    if (fetching || error) return;

    if (validatorGroupsFromAPI?.validator_groups?.length) {
      setValidatorGroups(validatorGroupsFromAPI.validator_groups);
    }
  }, [fetching, validatorGroupsFromAPI]);

  const handleSort = (key: string) => {
    // set new sort status
    let newSortStatus: { key: string; order: Order };
    if (sortStatus.key == key) {
      newSortStatus = {
        key,
        order: sortStatus.order == Order.ASC ? Order.DESC : Order.ASC,
      };
      setSortStatus(newSortStatus);
    } else {
      newSortStatus = { key, order: Order.DESC };
      setSortStatus(newSortStatus);
    }

    // handle sorting logic
    let sortFn: (a: ValidatorGroup, b: ValidatorGroup) => number;
    if (newSortStatus.key == "name") {
      sortFn = (a, b) =>
        newSortStatus.order == Order.ASC
          ? (a.name?.toLowerCase() ?? "") > (b.name?.toLowerCase() ?? "")
            ? 1
            : -1
          : (a.name?.toLowerCase() ?? "") < (b.name?.toLowerCase() ?? "")
          ? 1
          : -1;
    } else if (newSortStatus.key == "available") {
      sortFn = (a, b) =>
        newSortStatus.order == Order.ASC
          ? a.available_votes - b.available_votes
          : b.available_votes - a.available_votes;
    } else if (newSortStatus.key == "received") {
      sortFn = (a, b) =>
        newSortStatus.order == Order.ASC
          ? a.recieved_votes - b.recieved_votes
          : b.recieved_votes - a.recieved_votes;
    } else if (newSortStatus.key == "attestation") {
      sortFn = (a, b) =>
        newSortStatus.order == Order.ASC
          ? a.attestation_score - b.attestation_score
          : b.attestation_score - a.attestation_score;
    } else if (newSortStatus.key == "apy") {
      sortFn = (a, b) =>
        newSortStatus.order == Order.ASC
          ? a.estimated_apy - b.estimated_apy
          : b.estimated_apy - a.estimated_apy;
    } else if (newSortStatus.key == "validators") {
      sortFn = (a, b) =>
        newSortStatus.order == Order.ASC
          ? a.validators.length - b.validators.length
          : b.validators.length - a.validators.length;
    } else {
      sortFn = (a, b) =>
        newSortStatus.order == Order.ASC
          ? calculateScore(a) - calculateScore(b)
          : calculateScore(b) - calculateScore(a);
    }

    setValidatorGroups(validatorGroups.sort(sortFn));
  };

  return (
    <>
      <div className="text-gray-dark">
        <ReactTooltip place="top" type="dark" effect="solid" />
        <Nav />
        <div className="flex flex-col">
          <ExplorerHeader handleSort={handleSort} sortStatus={sortStatus} />
          <Transition
            show={fetching}
            enter="transition-opacity duration-100"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-50"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-x-0 inset-y-0 bg-white bg-opacity-70 flex justify-center items-center text-xl">
              Fetching Validator Groups...
            </div>
          </Transition>

          <ul className="lg:px-40 py-10 space-y-3 flex-1 min-h-screen">
            {validatorGroups?.map((vg: ValidatorGroup) => (
              <li
                className="relative font-medium px-9 py-6 border border-gray-light rounded-md cursor-pointer hover:border-primary-light-light hover:shadow-lg transform transition-all duration-100 overflow-x-auto overflow-y-hidden w-auto"
                key={vg.address}
              >
                <Link href={`/validators/${vg.address}`} passHref>
                  <a className="absolute inset-0 z-10" />
                </Link>
                <div className="grid grid-cols-8 text-center">
                  <div>
                    <button
                      className="mx-auto flex items-center justify-center rounded-full p-2 relative z-20 hover:bg-primary-light-light"
                      onClick={() =>
                        setExpandedVg((curr) =>
                          curr == vg.address ? "" : vg.address
                        )
                      }
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`${
                          expandedVg == vg.address ? "rotate-180" : "rotate-0"
                        }
                              h-6 w-6 transform transition-all duration-200`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="whitespace-nowrap truncate">
                      {vg.name ? vg.name : "Unkown Group"}
                    </span>
                    {hasProfile(vg) && <ProfileBadge />}
                  </div>
                  <div className="flex flex-wrap justify-center items-center">
                    {vg.validators.map((v: Validator) => (
                      <svg
                        key={v.address}
                        className={`h-4 w-4 ml-2 shadow-lg  ${
                          v.currently_elected ? "text-gray-dark" : "text-gray"
                        }`}
                        viewBox="0 0 32 32"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M31.9217 28.2182L25.8851 2.03636C25.53 0.872727 24.2102 0 23.5 0H8.5C7.61226 0 6.53233 0.872727 6.17724 2.03636L0.140599 28.2182C-0.392046 29.9636 0.673244 32 1.91608 32H29.9687C31.3891 32 32.2768 29.9636 31.9217 28.2182Z"
                          fill="currentColor"
                        />
                      </svg>
                    ))}
                  </div>
                  <div className="whitespace-nowrap truncate flex justify-center items-center">
                    {formatter.format(vg.recieved_votes)} CELO
                  </div>
                  <div className="whitespace-nowrap truncate flex justify-center items-center">
                    {formatter.format(vg.available_votes)} CELO
                  </div>
                  <div className="whitespace-nowrap truncate flex justify-center items-center">
                    {(vg.attestation_score * 100).toFixed(2)} %
                  </div>
                  <div className="whitespace-nowrap truncate flex justify-center items-center">
                    {(calculateScore(vg) * 100).toFixed(2)} %
                  </div>
                  <div className="whitespace-nowrap truncate flex justify-center items-center">
                    {vg.estimated_apy.toFixed(2)} %
                  </div>
                </div>
                {expandedVg == vg.address && (
                  <div
                    className="mt-3 mb-10 grid"
                    style={{ gridTemplateColumns: "1fr 7fr" }}
                  >
                    <div />
                    <div>
                      <p className="inline-flex items-center text-gray space-x-1">
                        <span className="text-sm">{vg.address}</span>
                        <button
                          className="relative z-20 p-2"
                          onClick={() =>
                            navigator.clipboard.writeText(vg.address)
                          }
                        >
                          <CopyIcon size="sm" />
                        </button>
                      </p>
                      <ValidatorsBlock vg={vg} />
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>

          <Footer />
        </div>
      </div>
    </>
  );
}

export const DownArrow = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z"
      clipRule="evenodd"
    />
  </svg>
);

export const UpArrow = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
      clipRule="evenodd"
    />
  </svg>
);

const ExplorerHeader = ({
  handleSort,
  sortStatus,
}: {
  sortStatus: SortStatus;
  handleSort: (key: string) => void;
}) => (
  <div className="lg:px-40 lg:pt-40 px-10 pt-20 pb-6 border-b border-gray-light shadow">
    <div className="flex justify-between">
      <h3 className="font-medium text-2xl">Validator Groups</h3>
      <div className="flex items-center justify-end">
        <div className="ml-auto h-2 w-2 bg-secondary rounded-full mr-2.5"></div>
        <p className="text-secondary text-sm">Mainnet</p>
      </div>
    </div>

    <div className="mt-8 px-9 space-x-2 grid grid-cols-8 font-medium text-gray text-sm text-center">
      <div></div>
      {FIELDS.map((f) => (
        <button
          key={f.key}
          onClick={() => handleSort(f.key)}
          className={`hover:text-gray-dark focus:ring-2 focus:ring-primary focus:text-gray-dark transition-all rounded p-2 flex items-center ${
            f.key == "name" ? "justify-start" : "justify-center"
          }  ${sortStatus.key == f.key && "text-gray-dark"}`}
          data-tip={f.tip && f.tip}
          data-delay-show="350"
        >
          <span className="whitespace-nowrap">{f.name}</span>
          {sortStatus.key == f.key && (
            <span className="ml-0.5">
              {sortStatus.order == Order.DESC ? <DownArrow /> : <UpArrow />}
            </span>
          )}
        </button>
      ))}
    </div>
  </div>
);

export default ValidatorExplorer;
