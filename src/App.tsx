import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import {
  useAccount,
  useConnect,
  useBalance,
  useSwitchChain,
  useDisconnect,
} from "wagmi";
import DeployDoppler from "./pages/DeployDoppler";
import ViewDoppler from "./pages/ViewDoppler";
import HomePage from "./pages/HomePage";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import "./theme.css";

function App() {
  const account = useAccount();
  const { connectors, connect } = useConnect();
  const { disconnect } = useDisconnect();
  const { switchChain } = useSwitchChain();
  const { data: balance } = useBalance({
    address: account.addresses?.[0],
  });

  const handleConnect = () => {
    connect({ connector: connectors[0] });
  };

  const handleDisconnect = () => {
    disconnect();
  };

  const isUniSepolia = account.chain?.id === 1301;

  const handleSwitchNetwork = () => {
    if (switchChain) {
      switchChain({ chainId: 1301 });
    }
  };

  return (
    <Router>
      <div className="app min-h-screen flex flex-col">
        <nav className="w-full border-b">
          <div className="flex h-24 items-center px-8">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" asChild>
                <Link to="/" className="text-lg">
                  Home
                </Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link to="/deploy" className="text-lg">
                  Deploy Market
                </Link>
              </Button>
            </div>

            <div className="ml-auto flex items-center space-x-4">
              {account.status === "connected" ? (
                <Card className="flex items-center gap-4 px-4 py-2">
                  <div className="flex flex-col text-sm">
                    <span className="font-medium">
                      {account.addresses?.[0]?.slice(0, 6)}...
                      {account.addresses?.[0]?.slice(-4)}
                    </span>
                    <span className="text-muted-foreground">
                      {balance?.formatted.slice(0, 6)} ETH
                    </span>
                  </div>
                  <Separator orientation="vertical" className="h-6" />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleDisconnect}
                    className="h-8 w-8"
                  >
                    ⏻
                  </Button>
                </Card>
              ) : (
                <Button onClick={handleConnect}>Connect Wallet</Button>
              )}
            </div>
          </div>
        </nav>

        {account.status === "connected" && !isUniSepolia && (
          <div className="flex-1 flex items-center justify-center bg-background/80 backdrop-blur">
            <Card className="p-6 flex flex-col items-center gap-4">
              <p className="text-lg">
                Please switch to UniChain Sepolia network
              </p>
              <Button onClick={handleSwitchNetwork}>Switch Network</Button>
            </Card>
          </div>
        )}

        <main className="flex-1 p-6">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/deploy" element={<DeployDoppler />} />
            <Route path="/doppler/:id" element={<ViewDoppler />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
