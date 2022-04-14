import { useQuery } from "urql";
import {
  ValidatorGroupsSuggestionQuery,
  ValidatorGroupsSuggestionQueryVariables,
  ValidatorGroupsSuggestionDocument,
  Order_By,
} from "../lib/generated/graphql";

export default function useValidatorGroups(sort?: boolean, limit?: number) {
  const [result] = useQuery<
    ValidatorGroupsSuggestionQuery,
    ValidatorGroupsSuggestionQueryVariables
  >({
    query: ValidatorGroupsSuggestionDocument,
    variables: {
      order_by: sort ? { overall_score: Order_By.Desc } : undefined,
      limit: limit,
    },
  });
  return result;
}
