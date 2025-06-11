import { Navigate, useParams } from "react-router-dom";
import { useState } from "react";
import {
  useAccount,
  usePublicClient,
  useWalletClient,
} from "wagmi";
import { Address, formatEther, Hex, parseEther, zeroAddress } from "viem";
import {
  PermitSingle,
  SwapRouter02Encoder,
  CommandBuilder,
  getPermitSignature,
} from "doppler-router";
import { universalRouterAbi } from "../abis/UniversalRouterABI";
import { ReadQuoter } from "doppler-v3-sdk";
import { getDrift } from "@/utils/drift";
import { useAsset, usePositions } from "@/services/indexer";
import {
  Button,
  Input,
  Card,
  Separator,
  Skeleton,
  Label,
} from "../components/ui";
import LiquidityChart from "../components/LiquidityChart";
import TokenName from "../components/TokenName";
import { addresses } from "../addresses";


function ViewDoppler() {
  // Hooks and state initialization
  const { id } = useParams();
  const account = useAccount();
  const { data: walletClient } = useWalletClient(account);
  const publicClient = usePublicClient();
  const { universalRouter, quoterV2 } = addresses;
  const drift = getDrift(walletClient);
  const quoter = new ReadQuoter(quoterV2, zeroAddress, drift);

  // Validation and data fetching
  const isValidAddress = id?.match(/^0x[a-fA-F0-9]{40}$/);
  if (!isValidAddress || !id) return <Navigate to="/" />;

  const { data: assetData, isLoading: isAssetLoading } = useAsset(id);
  const { data: positions, isLoading: isPositionsLoading } = usePositions(
    assetData?.asset?.pool?.address
  );

  const isLoading = isAssetLoading || isPositionsLoading;
  const { baseToken, quoteToken } = assetData?.asset?.pool || {};
  const positionItems = positions?.positions?.items || [];

  const [swapState, setSwapState] = useState({
    numeraireAmount: "",
    assetAmount: "",
    activeField: "numeraire" as "numeraire" | "asset",
  });

  const handleSwap = async () => {
    if (!account.address || !baseToken || !quoteToken || !walletClient) return;

    const block = await publicClient.getBlock();
    const { activeField, numeraireAmount, assetAmount } = swapState;
    const isSellingNumeraire = activeField === "numeraire";
    const amount = parseEther(
      isSellingNumeraire ? numeraireAmount : assetAmount
    );

    let permit;
    let signature;
    if (!isSellingNumeraire) {
      permit = createPermitData({
        isSellingNumeraire,
        amount,
        blockTimestamp: block.timestamp,
        baseTokenAddress: baseToken.address as Address,
        quoteTokenAddress: quoteToken.address as Address,
      });

      signature = await getPermitSignature(
        permit,
        publicClient.chain.id,
        addresses.permit2,
        // @ts-ignore
        publicClient,
        walletClient
      );
    }

    console.log("permit", permit);
    console.log("signature", signature);

    const [commands, inputs] = buildSwapCommands({
      isSellingNumeraire,
      amount,
      permit,
      signature,
      baseTokenAddress: baseToken.address as Address,
      quoteTokenAddress: quoteToken.address as Address,
      account: account.address,
    });

    // const tx = await walletClient.writeContract({
    //   address: universalRouter,
    //   abi: universalRouterAbi,
    //   functionName: "execute",
    //   args: [commands, inputs],
    //   account: walletClient.account,
    //   value: isSellingNumeraire ? amount : undefined,
    // });

    const { request } = await publicClient.simulateContract({
      address: universalRouter,
      abi: universalRouterAbi,
      functionName: "execute",
      args: [commands, inputs],
      account: walletClient.account,
      value: isSellingNumeraire ? amount : undefined,
    });

    const txHash = await walletClient.writeContract(request);
    return await publicClient.waitForTransactionReceipt({ hash: txHash });
  };

  const handleAmountChange = async (
    value: string,
    field: typeof swapState.activeField
  ) => {
    setSwapState((prev) => ({
      ...prev,
      [field === "numeraire" ? "numeraireAmount" : "assetAmount"]: value,
      activeField: field,
    }));

    if (!baseToken?.address || !quoteToken?.address) return;

    try {
      const inputValue = parseFloat(value);
      if (isNaN(inputValue)) return;

      const { tokenIn, tokenOut } = getSwapDirection(
        field,
        quoteToken.address as Address,
        baseToken.address as Address
      );

      const inputValueInWei = parseEther(inputValue.toString());

      if (inputValueInWei === 0n) {
        setSwapState((prev) => ({
          ...prev,
          [field === "numeraire" ? "assetAmount" : "numeraireAmount"]: "",
        }));
        return;
      }

      const { amountOut } = await quoter.quoteExactInputV3({
        tokenIn,
        tokenOut,
        amountIn: inputValueInWei,
        fee: 10000,
        sqrtPriceLimitX96: 0n,
      });


      const formattedAmount = Number(formatEther(amountOut)).toFixed(4);
      setSwapState((prev) => ({
        ...prev,
        [field === "numeraire" ? "assetAmount" : "numeraireAmount"]:
          formattedAmount,
      }));
    } catch (error) {
      console.error("Invalid input:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6 text-lg">
      <header className="flex items-center flex-start">
        <TokenName
          name={quoteToken?.name ?? ""}
          symbol={quoteToken?.symbol ?? ""}
        />{" "}
        /{" "}
        <TokenName
          name={baseToken?.name ?? ""}
          symbol={baseToken?.symbol ?? ""}
        />
      </header>

      <Separator />

      {isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-[300px] w-full" />
          <Skeleton className="h-[200px] w-full" />
        </div>
      ) : (
        <>
          <LiquidityInfoCard
            liquidity={assetData?.asset?.pool?.liquidity}
            price={assetData?.asset?.pool?.price}
            currentTick={assetData?.asset?.pool?.tick}
            // @ts-ignore
            baseToken={baseToken}
            // @ts-ignore
            quoteToken={quoteToken}
            positions={positionItems}
          />

          <SwapCard
            // @ts-ignore
            baseToken={baseToken}
            // @ts-ignore
            quoteToken={quoteToken}
            swapState={swapState}
            onAmountChange={handleAmountChange}
            onSwap={handleSwap}
            isLoading={isLoading}
          />
        </>
      )}
    </div>
  );
}

function createPermitData({
  isSellingNumeraire,
  amount,
  blockTimestamp,
  baseTokenAddress,
  quoteTokenAddress,
}: {
  isSellingNumeraire: boolean;
  amount: bigint;
  blockTimestamp: bigint;
  baseTokenAddress: Address;
  quoteTokenAddress: Address;
}): PermitSingle {
  return {
    details: {
      token: isSellingNumeraire ? quoteTokenAddress : baseTokenAddress,
      amount: amount,
      expiration: 0n,
      nonce: 0n,
    },
    spender: addresses.universalRouter,
    sigDeadline: blockTimestamp + 3600n,
  };
}

function buildSwapCommands({
  isSellingNumeraire,
  amount,
  permit,
  signature,
  baseTokenAddress,
  quoteTokenAddress,
  account,
}: {
  isSellingNumeraire: boolean;
  amount: bigint;
  permit?: PermitSingle;
  signature?: Hex;
  baseTokenAddress: Address;
  quoteTokenAddress: Address;
  account: Address;
}) {
  const isToken0 = baseTokenAddress < quoteTokenAddress;
  const zeroForOne = isSellingNumeraire ? isToken0 : !isToken0;
  const pathArray = zeroForOne
    ? [baseTokenAddress, quoteTokenAddress]
    : [quoteTokenAddress, baseTokenAddress];


  const path = new SwapRouter02Encoder().encodePath(pathArray, 10000);

  const builder = new CommandBuilder();
  if (!isSellingNumeraire && permit && signature) {
    builder
      .addPermit2Permit(permit, signature)
      .addV3SwapExactIn(account, amount, 0n, path, true);
  } else {
    builder
      .addWrapEth(addresses.universalRouter, amount)
      .addV3SwapExactIn(account, amount, 0n, path, false);
  }

  console.log("builder", builder);

  return builder.build();
}

function getSwapDirection(
  activeField: "numeraire" | "asset",
  baseTokenAddress: Address,
  quoteTokenAddress: Address
) {
  return activeField === "numeraire"
    ? { tokenIn: baseTokenAddress, tokenOut: quoteTokenAddress }
    : { tokenIn: quoteTokenAddress, tokenOut: baseTokenAddress };
}

// Extracted UI components
const LiquidityInfoCard = ({
  liquidity,
  price,
  currentTick,
  baseToken,
  quoteToken,
  positions,
}: {
  liquidity?: bigint;
  price?: bigint;
  currentTick?: number;
  baseToken?: { symbol?: string };
  quoteToken?: { symbol?: string };
  positions: any[];
}) => (
  <Card className="p-6 space-y-4">
    <div className="grid grid-cols-2 gap-4">
      <StatItem label="Total Liquidity" value={liquidity?.toString()} />
      <StatItem
        label="Current Price"
        value={`1 ${quoteToken?.symbol} = ${price} ${baseToken?.symbol}`}
      />
    </div>
    <LiquidityChart positions={positions} currentTick={currentTick ?? 0} />
  </Card>
);

const StatItem = ({ label, value }: { label: string; value?: string }) => (
  <div className="space-y-1">
    <h3 className="text-sm font-medium text-muted-foreground">{label}</h3>
    <p className="text-xl font-semibold">{value || "-"}</p>
  </div>
);

const SwapCard = ({
  baseToken,
  quoteToken,
  swapState,
  onAmountChange,
  onSwap,
  isLoading,
}: {
  baseToken?: { name?: string; symbol?: string };
  quoteToken?: { name?: string; symbol?: string };
  swapState: {
    numeraireAmount: string;
    assetAmount: string;
    activeField: string;
  };
  onAmountChange: (value: string, field: "numeraire" | "asset") => void;
  onSwap: () => void;
  isLoading: boolean;
}) => (
  <Card className="p-6 space-y-6">
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Swap Tokens</h3>
      <Separator />

      <SwapInput
        label={`${quoteToken?.name} (${quoteToken?.symbol})`}
        value={swapState.numeraireAmount}
        onChange={(value) => onAmountChange(value, "numeraire")}
        disabled={isLoading}
      />

      <div className="relative">
        <Separator className="absolute top-1/2 w-full" />
        <div className="relative flex justify-center">
          <span className="bg-background px-2 text-muted-foreground">↓</span>
        </div>
      </div>

      <SwapInput
        label={`${baseToken?.name} (${baseToken?.symbol})`}
        value={swapState.assetAmount}
        onChange={(value) => onAmountChange(value, "asset")}
        disabled={isLoading}
      />

      <Button
        className="w-full"
        disabled={!swapState.numeraireAmount && !swapState.assetAmount}
        onClick={onSwap}
      >
        {swapState.activeField === "numeraire"
          ? `Buy ${baseToken?.symbol} with ${quoteToken?.symbol}`
          : `Buy ${quoteToken?.symbol} with ${baseToken?.symbol}`}
      </Button>
    </div>
  </Card>
);

const SwapInput = ({
  label,
  value,
  onChange,
  disabled,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}) => (
  <div className="space-y-2">
    <Label htmlFor={label}>{label}</Label>
    <Input
      type="number"
      id={label}
      placeholder="0.0"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      step="any"
    />
  </div>
);

export default ViewDoppler;
