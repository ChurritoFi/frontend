import React from "react";
import ReactTooltip from "react-tooltip";
import { ValidatorGroup } from "../../lib/types";
import { ValidatorsBlock } from "./ValidatorsBlock";

export default function ValidatorsPanel({ vg }: { vg: ValidatorGroup }) {
  return (
    <div className="mt-10 border border-gray-light rounded-md p-10 text-gray-dark">
      <ReactTooltip place="top" type="dark" effect="solid" />
      <div className="flex items-baseline justify-between">
        <h4 className="text-xl font-medium">Affiliated Validators</h4>
        <p className="font-medium">
          <span data-tip="Percentage of epoch rewards that goes to the Validator Group if its affiliated Validator is elected.">
            Group Share:
          </span>{" "}
          {(vg.group_share * 100).toFixed(0)}%
        </p>
      </div>
      <ValidatorsBlock vg={vg} />
    </div>
  );
}
