import { gql } from "graphql-tag";
import { useMutation } from "urql";
import {
  UpdateValidatorGroupSocialInfoDocument,
  UpdateValidatorGroupSocialInfoMutation,
  UpdateValidatorGroupSocialInfoMutationVariables,
} from "../lib/generated/graphql";

const UpdateVGSocial = gql`
  mutation (
    $id: ID!
    $email: String
    $twitter: String
    $discord: String
    $geoURL: String
  ) {
    UpdateVGSocialInfo(
      vg_id: $id
      email: $email
      twitter_username: $twitter
      discord_tag: $discord
      geographic_location: $geoURL
    ) {
      ID
      Email
      TwitterUsername
      DiscordTag
      GeographicLocation
    }
  }
`;

export default function useVGMutation() {
  const [updateVGResult, updateVG] = useMutation<
    UpdateValidatorGroupSocialInfoMutation,
    UpdateValidatorGroupSocialInfoMutationVariables
  >(UpdateValidatorGroupSocialInfoDocument);
  return { updateVGResult, updateVG };
}
