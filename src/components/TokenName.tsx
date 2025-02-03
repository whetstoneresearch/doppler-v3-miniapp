import pepeIcon from "../assets/icons/pepe.svg";
import ethIcon from "../assets/icons/eth.svg";

interface TokenNameProps {
  name: string;
  symbol: string;
  showSymbol?: boolean;
}

function TokenName({ name, symbol, showSymbol = true }: TokenNameProps) {
  return (
    <span className="token-name">
      {name === "Wrapped Ether" ? (
        <img src={ethIcon} alt="eth" className="token-icon" />
      ) : (
        <img src={pepeIcon} alt="pepe" className="token-icon" />
      )}
      {name} {showSymbol && `(${symbol})`}
    </span>
  );
}

export default TokenName;
