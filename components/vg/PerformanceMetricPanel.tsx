import React from "react";
import ReactTooltip from "react-tooltip";
import { ValidatorGroup } from "../../lib/types";

const formatter = new Intl.NumberFormat("en-US");
export default function PerformanceMetricsPanel({
  VG,
}: {
  VG: ValidatorGroup;
}) {
  return (
    <div className="mt-10 border border-gray-light rounded-md p-10 text-gray-dark">
      <ReactTooltip place="top" type="dark" effect="solid" />
      <h4 className="text-xl font-medium">Performance Metrics</h4>
      {/* first row in performance metrics panel */}
      <div className="grid grid-cols-4 mt-5 gap-28">
        <div className="grid grid-rows-2 gap-1 text-left">
          <p
            className="text-sm text-gray"
            data-tip="Validators Elected vs Total Validators in the Group"
          >
            Elected/Total Validators
          </p>
          <div className="text-2xl font-medium flex flex-wrap">
            {VG.Validators.map((v) => (
              <svg
                className={`h-5 w-5 ml-2 mt-0.5 ${
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
        </div>
        <div className="grid grid-rows-2 gap-1 text-center">
          <p
            className="text-sm text-gray"
            data-tip="A score calculated based on how transparent the Validator Group is with providing information related to it."
          >
            Transparency Score
          </p>
          <p className="text-2xl font-medium">
            {(VG.TransparencyScore * 100).toFixed(2)}/100
          </p>
        </div>
        <div className="grid grid-rows-2 gap-1 text-center">
          <p
            className="text-sm text-gray"
            data-tip="A score calculated based on how efficient the Validator Group has been in the past."
          >
            Performance Score
          </p>
          <p className="text-2xl font-medium">
            {(VG.PerformanceScore * 100).toFixed(2)}/100
          </p>
        </div>
        <div className="grid grid-rows-2 gap-1 text-center">
          <p
            className="text-sm text-gray"
            data-tip="Estimated Annual Percentage of Yield that the Validator Group can provide on staking."
          >
            Estimated APY
          </p>
          <p className="text-2xl font-medium">{VG.EstimatedAPY.toFixed(2)}%</p>
        </div>
      </div>
      {/* second row in performance metrics panel */}
      <div className="grid grid-cols-6 mt-10 gap-20">
        <div className="grid grid-rows-2 gap-1 text-center">
          <p
            className="text-sm text-gray"
            data-tip="Votes received by the Validator Group"
          >
            Recieved Votes
          </p>
          <p className="text-base font-medium">
            {formatter.format(VG.RecievedVotes)} CELO
          </p>
        </div>
        <div className="grid grid-rows-2 gap-1 text-center">
          <p
            className="text-sm text-gray"
            data-tip="Votes available to be received by the Validator Group"
          >
            Available Votes
          </p>
          <p className="text-base font-medium">
            {formatter.format(VG.AvailableVotes)} CELO
          </p>
        </div>
        <div className="grid grid-rows-2 gap-1 text-center">
          <p
            className="text-sm text-gray"
            data-tip="Total number of epochs served by the Validator Group on Mainnet"
          >
            Epochs Served
          </p>
          <p className="text-base font-medium">
            {formatter.format(VG.EpochsServed)}
          </p>
        </div>
        <div className="grid grid-rows-2 gap-1 text-center">
          <p
            className="text-sm text-gray"
            data-tip="Amount of CELOs locked by the Validator Group."
          >
            Locked CELO
          </p>
          <p className="text-base font-medium">
            {formatter.format(VG.LockedCelo)} CELO
          </p>
        </div>
        <div className="grid grid-rows-2 gap-1 text-center">
          <p
            className="text-sm text-gray"
            data-tip="Current Slashing Penalty ratio for the Validator Group. A score of 1.0 refers to no slashing penalty."
          >
            Slashing Score
          </p>
          <p className="text-base font-medium">
            {VG.SlashingPenaltyScore.toFixed(2)}
          </p>
        </div>
        <div className="grid grid-rows-2 gap-1 text-center">
          <p
            className="text-sm text-gray"
            data-tip="How regularly that validator participates in consensus. A score of 100% refers to highest participation."
          >
            Group Score
          </p>
          <p className="text-base font-medium">
            {(VG.GroupScore * 100).toFixed(2)}%
          </p>
        </div>
      </div>
    </div>
  );
}
