import React from "react";
import { ValidatorGroup } from "../../lib/types";
import { ValidatorBlock } from "./ValidatorBlock";

export function ValidatorsBlock({ vg }: { vg: ValidatorGroup }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5">
      {vg.validators.map((v) => (
        <ValidatorBlock validator={v} />
      ))}
    </div>
  );
}
