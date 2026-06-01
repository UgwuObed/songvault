const TATUM_API_KEY = process.env.TATUM_API_KEY!;
const SUI_RPC_URL = process.env.NEXT_PUBLIC_SUI_RPC_URL!;

async function suiRPC(method: string, params: any[] = []) {
  const response = await fetch(`${SUI_RPC_URL}/${TATUM_API_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: 1,
      method,
      params,
    }),
  });

  if (!response.ok) {
    throw new Error(`Tatum RPC error: ${response.statusText}`);
  }

  const data = await response.json();
  if (data.error) throw new Error(data.error.message);
  return data.result;
}

export async function getSuiChainInfo() {
  const [checkpoint, chainId] = await Promise.all([
    suiRPC("sui_getLatestCheckpointSequenceNumber"),
    suiRPC("sui_getChainIdentifier"),
  ]);

  return {
    chainId,
    latestCheckpoint: checkpoint,
    network: "mainnet",
    rpcProvider: "Tatum",
  };
}