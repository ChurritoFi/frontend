import { gql } from "graphql-tag";
import { useMutation } from "urql";
// import {
//   UpdateValidatorGroupSocialInfoDocument,
//   UpdateValidatorGroupSocialInfoMutation,
//   UpdateValidatorGroupSocialInfoMutationVariables,
// } from "../lib/generated/graphql";

export default function useVgMutation() {
  // TODO:
  // const [updateVgResult, updateVg] = useMutation<
  //   UpdateValidatorGroupSocialInfoMutation,
  //   UpdateValidatorGroupSocialInfoMutationVariables
  // >(UpdateValidatorGroupSocialInfoDocument);
  // return { updateVgResult, updateVg };
  return {
    updateVg: async (variables: any): Promise<any> => {
      throw new Error("Not implemented");
    },
  };
}
