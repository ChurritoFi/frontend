import { useQuery } from "urql";
import {
  Order_By,
  ValidatorGroupsDocument,
  ValidatorGroupsQuery,
  ValidatorGroupsQueryVariables,
} from "../lib/generated/graphql";

export default function useVg(sort?: boolean, limit?: number) {
  const [result] = useQuery<
    ValidatorGroupsQuery,
    ValidatorGroupsQueryVariables
  >({
    query: ValidatorGroupsDocument,
    variables: {
      order_by: sort ? { overall_score: Order_By.Desc } : undefined,
      limit: limit,
    },
  });
  return result;
}
