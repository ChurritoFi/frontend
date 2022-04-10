import { useQuery } from "urql";
import {
  ValidatorGroupQuery,
  ValidatorGroupQueryVariables,
  ValidatorGroupDocument,
} from "../lib/generated/graphql";

export default function useVG(address: string) {
  const [result] = useQuery<ValidatorGroupQuery, ValidatorGroupQueryVariables>({
    query: ValidatorGroupDocument,
    variables: { address },
    pause: !address,
  });
  return result;
}
