import { useQuery } from "urql";
import {
  ValidatorGroupsSuggestionQuery,
  ValidatorGroupsSuggestionQueryVariables,
  ValidatorGroupsSuggestionDocument,
} from "../lib/generated/graphql";

export default function useValidatorGroups(sort?: boolean, limit?: number) {
  const [result] = useQuery<
    ValidatorGroupsSuggestionQuery,
    ValidatorGroupsSuggestionQueryVariables
  >({
    query: ValidatorGroupsSuggestionDocument,
    variables: { sort_by_score: sort, limit: limit },
  });
  return result;
}
