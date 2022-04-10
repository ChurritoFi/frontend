import { useQuery } from "urql";
import {
  ValidatorGroupsDocument,
  ValidatorGroupsQuery,
  ValidatorGroupsQueryVariables,
} from "../lib/generated/graphql";

export default function useVG(sort?: boolean, limit?: number) {
  const [result] = useQuery<
    ValidatorGroupsQuery,
    ValidatorGroupsQueryVariables
  >({
    query: ValidatorGroupsDocument,
    variables: { sort_by_score: sort, limit: limit },
  });
  return result;
}
