import { gql } from "graphql-tag";
import { useMutation } from "urql";
// import {
//   UpdateValidatorGroupSocialInfoDocument,
//   UpdateValidatorGroupSocialInfoMutation,
//   UpdateValidatorGroupSocialInfoMutationVariables,
// } from "../lib/generated/graphql";

export default function useVGMutation() {
  // TODO:
  // const [updateVGResult, updateVG] = useMutation<
  //   UpdateValidatorGroupSocialInfoMutation,
  //   UpdateValidatorGroupSocialInfoMutationVariables
  // >(UpdateValidatorGroupSocialInfoDocument);
  // return { updateVGResult, updateVG };
  return {
    updateVG: async (variables: any): Promise<any> => {
      throw new Error("Not implemented");
    },
  };
}
