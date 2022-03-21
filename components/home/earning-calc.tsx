import { useEffect, useMemo, useState } from "react";
import { fetchExchangeRate } from "../../lib/utils";
import { BigNumber } from "bignumber.js";
import { getTargetVotingYield } from "../../lib/celo";
import { useContractKit } from "@celo-tools/use-contractkit";

export default function EarningCalculator() {
  const { kit } = useContractKit();
  const [exchangeRate, setExchangeRate] = useState<number | undefined>(
    undefined
  );
  const [estimatedAPY, setEstimatedAPY] = useState<BigNumber | undefined>(
    undefined
  );
  const [celoAmountToInvest, setCeloAmountToInvest] = useState("1000.00");
  const celoToInvestInUSD = useMemo(
    () => parseFloat(celoAmountToInvest) * exchangeRate,
    [celoAmountToInvest, exchangeRate]
  );
  const yearlyEarning = useMemo(() => {
    if (!exchangeRate) return undefined;
    if (celoAmountToInvest === "") return new BigNumber(0);
    return new BigNumber(celoAmountToInvest).times(estimatedAPY).div(100);
  }, [celoAmountToInvest, estimatedAPY]);
  const yearlyEarningInUSD = useMemo(
    () => yearlyEarning?.times(exchangeRate),
    [yearlyEarning, exchangeRate]
  );

  const monthlyEarning = useMemo(() => yearlyEarning?.div(12), [yearlyEarning]);
  const monthlyEarningInUSD = useMemo(
    () => monthlyEarning?.times(exchangeRate),
    [monthlyEarning, exchangeRate]
  );

  useEffect(() => {
    fetchExchangeRate().then((resp) => setExchangeRate(resp));
    getTargetVotingYield(kit).then((value) => setEstimatedAPY(value));
  }, []);
  return (
    <div className="mt-20 lg:mt-0 lg:p-10 p-8 text-gray-dark border border-gray-light rounded-md">
      <h3 className="text-xl font-medium">Calculate Your Earnings</h3>
      <div className="mt-5">
        <label htmlFor="amount" className="block text-sm text-gray-dark">
          If you invest this much CELO:
        </label>

        <div className="relative mt-2.5 w-full rounded-md shadow-sm text-left cursor-default focus:outline-none text-gray-dark-dark">
          <input
            type="number"
            name="amount"
            id="amount"
            className="block w-full h-full lg:px-5 lg:py-4 px-3 py-2 text-lg lg:text-xl bg-gray-light-light border border-gray-light rounded-md focus:border-primary focus:ring-primary focus:bg-primary-light-light"
            placeholder="0.00 CELO"
            value={celoAmountToInvest}
            onChange={(e) => setCeloAmountToInvest(e.target.value)}
          />
          <div className="absolute inset-y-0 right-0 flex items-center">
            <label htmlFor="currency" className="sr-only">
              Currency
            </label>
            <div className="h-full py-0 pl-2 pr-7 text-sm lg:text-lg rounded-md flex items-center justify-center text-primary">
              <span>
                $ {celoToInvestInUSD ? celoToInvestInUSD.toFixed(2) : "-"}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10">
        <p className="text-sm">You could be earning:</p>
        <div className="flex items-center mt-3">
          <p className="text-2xl lg:text-3xl text-primary font-medium">
            {estimatedAPY ? `${estimatedAPY.toFixed(2)}%` : "-"} APY
          </p>
          <p className="text-gray ml-5 hidden lg:block">
            (Annual Percentage Yield)
          </p>
        </div>
        <div className="mt-5">
          <p className="text-gray text-sm">Yearly Earning</p>
          <div className="flex justify-between items-baseline mt-2">
            <p>{yearlyEarning ? yearlyEarning.toFixed(2) : "-"} CELO</p>
            <p className="text-gray">
              $ {yearlyEarningInUSD ? yearlyEarningInUSD.toFixed(2) : "-"}
            </p>
          </div>
        </div>
        <div className="mt-5">
          <p className="text-gray text-sm">Monthly Earning</p>
          <div className="flex justify-between items-baseline mt-2">
            <p>{monthlyEarning ? monthlyEarning.toFixed(2) : "-"} CELO</p>
            <p className="text-gray">
              $ {monthlyEarningInUSD ? monthlyEarningInUSD.toFixed(2) : "-"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
