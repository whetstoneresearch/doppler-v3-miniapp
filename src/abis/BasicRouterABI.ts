export const basicRouterAbi = [
  {
    type: "constructor",
    inputs: [{ name: "_router", type: "address", internalType: "address" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "exactInputSingleV3",
    inputs: [
      { name: "pool", type: "address", internalType: "address" },
      { name: "recipient", type: "address", internalType: "address" },
      { name: "zeroForOne", type: "bool", internalType: "bool" },
      { name: "amountIn", type: "uint256", internalType: "uint256" },
      { name: "amountOutMinimum", type: "uint256", internalType: "uint256" },
      { name: "deadline", type: "uint256", internalType: "uint256" },
    ],
    outputs: [{ name: "", type: "int256", internalType: "BalanceDelta" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "exactInputSingleV4",
    inputs: [
      {
        name: "key",
        type: "tuple",
        internalType: "struct PoolKey",
        components: [
          { name: "currency0", type: "address", internalType: "Currency" },
          { name: "currency1", type: "address", internalType: "Currency" },
          { name: "fee", type: "uint24", internalType: "uint24" },
          { name: "tickSpacing", type: "int24", internalType: "int24" },
          { name: "hooks", type: "address", internalType: "contract IHooks" },
        ],
      },
      { name: "zeroForOne", type: "bool", internalType: "bool" },
      { name: "amountIn", type: "uint128", internalType: "uint128" },
      { name: "amountOutMinimum", type: "uint128", internalType: "uint128" },
      { name: "hookData", type: "bytes", internalType: "bytes" },
      { name: "deadline", type: "uint256", internalType: "uint256" },
    ],
    outputs: [{ name: "", type: "int256", internalType: "BalanceDelta" }],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "exactOutputSingleV3",
    inputs: [
      { name: "pool", type: "address", internalType: "address" },
      { name: "recipient", type: "address", internalType: "address" },
      { name: "zeroForOne", type: "bool", internalType: "bool" },
      { name: "amountOut", type: "uint256", internalType: "uint256" },
      { name: "amountInMaximum", type: "uint256", internalType: "uint256" },
      { name: "deadline", type: "uint256", internalType: "uint256" },
    ],
    outputs: [{ name: "", type: "int256", internalType: "BalanceDelta" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "exactOutputSingleV4",
    inputs: [
      {
        name: "key",
        type: "tuple",
        internalType: "struct PoolKey",
        components: [
          { name: "currency0", type: "address", internalType: "Currency" },
          { name: "currency1", type: "address", internalType: "Currency" },
          { name: "fee", type: "uint24", internalType: "uint24" },
          { name: "tickSpacing", type: "int24", internalType: "int24" },
          { name: "hooks", type: "address", internalType: "contract IHooks" },
        ],
      },
      { name: "zeroForOne", type: "bool", internalType: "bool" },
      { name: "amountOut", type: "uint128", internalType: "uint128" },
      { name: "amountInMaximum", type: "uint128", internalType: "uint128" },
      { name: "hookData", type: "bytes", internalType: "bytes" },
      { name: "deadline", type: "uint256", internalType: "uint256" },
    ],
    outputs: [{ name: "", type: "int256", internalType: "BalanceDelta" }],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "router",
    inputs: [],
    outputs: [
      { name: "", type: "address", internalType: "contract IUniversalRouter" },
    ],
    stateMutability: "view",
  },
] as const;
