import { useState } from "react";
import { addresses } from "../addresses";
import { useAccount, useWalletClient } from "wagmi";
import { ReadWriteFactory, CreateV3PoolParams } from "doppler-v3-sdk";
import { getDrift } from "../utils/drift";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { base } from "viem/chains";

const TICK_SPACING = 200;
const weth = "0x4200000000000000000000000000000000000006";

function roundToTickSpacing(tick: number): number {
  return Math.round(tick / TICK_SPACING) * TICK_SPACING;
}

function DeployDoppler() {
  const account = useAccount();
  const { data: walletClient } = useWalletClient(account);
  const [initialSupply, setInitialSupply] = useState("");
  const [numTokensToSell, setNumTokensToSell] = useState("");
  const [tokenName, setTokenName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [startTick, setStartTick] = useState("");
  const [endTick, setEndTick] = useState("");
  const [numPositions, setNumPositions] = useState("");
  const [maxShareToBeSold, setMaxShareToBeSold] = useState("");
  const [maxShareToBond, setMaxShareToBond] = useState("");
  const [isDeploying, setIsDeploying] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const {
    tokenFactory,
    governanceFactory,
    v3Initializer,
    liquidityMigrator,
    airlock,
  } = addresses;

  const handleStartTickChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartTick(e.target.value);
  };

  const handleEndTickChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndTick(e.target.value);
  };

  const handleNumPositionsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNumPositions(e.target.value);
  };

  const handleMaxShareToBeSoldChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setMaxShareToBeSold(e.target.value);
  };

  const handleMaxShareToBondChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setMaxShareToBond(e.target.value);
  };

  const handleMaxShareToBondBlur = () => {
    if (maxShareToBond) {
      setMaxShareToBond(maxShareToBond);
    }
  };

  const handleMaxShareToSoldBlur = () => {
    if (maxShareToBeSold) {
      setMaxShareToBeSold(maxShareToBeSold);
    }
  };

  const handleNumPositionsBlur = () => {
    if (numPositions) {
      setNumPositions(numPositions);
    }
  };

  const handleStartTickBlur = () => {
    if (startTick) {
      const value = Number(startTick);
      const roundedValue = roundToTickSpacing(value);
      setStartTick(roundedValue.toString());
    }
  };

  const handleEndTickBlur = () => {
    if (endTick) {
      const value = Number(endTick);
      const roundedValue = roundToTickSpacing(value);
      setEndTick(roundedValue.toString());
    }
  };

  const handleDeploy = async (e: React.FormEvent) => {
    if (!walletClient) throw new Error("Wallet client not found");
    e.preventDefault();
    setIsDeploying(true);
    try {
      if (!weth) throw new Error("WETH address not loaded");
      if (!account.address) throw new Error("Account address not found");

      const createV3PoolParams: CreateV3PoolParams = {
        integrator: account.address,
        userAddress: account.address,
        numeraire: weth,
        contracts: {
          tokenFactory,
          governanceFactory,
          v3Initializer,
          liquidityMigrator,
        },
        tokenConfig: {
          name: tokenName,
          symbol: tokenSymbol,
          tokenURI: `https://pure.xyz/token/${tokenName}`,
        },
        vestingConfig: "default",
      };

      const drift = getDrift(base, walletClient);

      // TODO: ReadWriteFactory types need to be fixed
      // @ts-ignore
      const rwFactory = new ReadWriteFactory(airlock, drift);
      const createData = await rwFactory.encodeCreateData(createV3PoolParams);
      await rwFactory.create(createData);
    } catch (error) {
      console.error("Deployment failed:", error);
    } finally {
      setIsDeploying(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h3 className="text-2xl font-bold mb-4">Deploy Market</h3>
      <Card className="p-6">
        <form onSubmit={handleDeploy} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="tokenName">Token Name</Label>
              <Input
                id="tokenName"
                value={tokenName}
                onChange={(e) => setTokenName(e.target.value)}
                placeholder="Enter token name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tokenSymbol">Token Symbol</Label>
              <Input
                id="tokenSymbol"
                value={tokenSymbol}
                onChange={(e) => setTokenSymbol(e.target.value)}
                placeholder="Enter token symbol"
                required
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="advancedOptions"
                checked={showAdvanced}
                onCheckedChange={(checked) => setShowAdvanced(!!checked)}
              />
              <Label htmlFor="advancedOptions">Show Advanced Options</Label>
            </div>

            {showAdvanced && (
              <>
                <Separator className="my-6" />

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="initialSupply">
                      Initial Supply (in tokens)
                    </Label>
                    <Input
                      id="initialSupply"
                      type="number"
                      value={initialSupply}
                      onChange={(e) => setInitialSupply(e.target.value)}
                      placeholder="Enter initial token supply"
                      min="0"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="numTokensToSell">
                      Number of Tokens to Sell
                    </Label>
                    <Input
                      id="numTokensToSell"
                      type="number"
                      value={numTokensToSell}
                      onChange={(e) => setNumTokensToSell(e.target.value)}
                      placeholder="Enter number of tokens to sell"
                      min="0"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="startTick">
                      Start Tick (will be rounded to nearest {TICK_SPACING})
                    </Label>
                    <Input
                      id="startTick"
                      type="number"
                      value={startTick}
                      onChange={handleStartTickChange}
                      onBlur={handleStartTickBlur}
                      placeholder={`Enter start tick (multiple of ${TICK_SPACING})`}
                      required
                    />
                    {startTick && Number(startTick) % TICK_SPACING !== 0 && (
                      <p className="text-sm text-destructive">
                        Start tick must be divisible by {TICK_SPACING}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="endTick">
                      End Tick (will be rounded to nearest {TICK_SPACING})
                    </Label>
                    <Input
                      id="endTick"
                      type="number"
                      value={endTick}
                      onChange={handleEndTickChange}
                      onBlur={handleEndTickBlur}
                      placeholder={`Enter end tick (multiple of ${TICK_SPACING})`}
                      required
                    />
                    {endTick && Number(endTick) % TICK_SPACING !== 0 && (
                      <p className="text-sm text-destructive">
                        End tick must be divisible by {TICK_SPACING}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="numPositions">Number of Positions</Label>
                    <Input
                      id="numPositions"
                      type="number"
                      value={numPositions}
                      onChange={handleNumPositionsChange}
                      onBlur={handleNumPositionsBlur}
                      placeholder="Enter number of positions"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="maxShareToBeSold">
                      Max Share to Be Sold
                    </Label>
                    <Input
                      id="maxShareToBeSold"
                      type="number"
                      value={maxShareToBeSold}
                      onChange={handleMaxShareToBeSoldChange}
                      onBlur={handleMaxShareToSoldBlur}
                      placeholder="Enter max share to be sold"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="maxShareToBond">Max Share to Bond</Label>
                    <Input
                      id="maxShareToBond"
                      type="number"
                      value={maxShareToBond}
                      onChange={handleMaxShareToBondChange}
                      onBlur={handleMaxShareToBondBlur}
                      placeholder="Enter max share to bond"
                      required
                    />
                  </div>
                </div>
              </>
            )}
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={
              isDeploying ||
              !tokenName ||
              !tokenSymbol ||
              (showAdvanced &&
                (!startTick ||
                  !endTick ||
                  Number(startTick) % TICK_SPACING !== 0 ||
                  Number(endTick) % TICK_SPACING !== 0 ||
                  !numPositions ||
                  !maxShareToBeSold ||
                  !initialSupply ||
                  !numTokensToSell ||
                  !maxShareToBond))
            }
          >
            {isDeploying ? "Deploying..." : "Deploy Market"}
          </Button>
        </form>
      </Card>
    </div>
  );
}

export default DeployDoppler;
