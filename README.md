# SongVault

Store music metadata on Walrus and retrieve it from anywhere using a Blob ID.

Built for the Tatum x Build on Sui with Walrus Hackathon.

**Stack:** Next.js 15, TypeScript, Walrus, Sui Mainnet, Tatum RPC
**Live Demo** https://songvault-opal.vercel.app

---

## What is SongVault?

SongVault is a decentralized music metadata registry built on Sui.

Artists, labels, or music platforms can store track metadata (title, artist, album, genre, cover art, audio preview, etc.) as a blob on Walrus. Every upload gets a unique Blob ID that can be used to retrieve the metadata later.

The app uses Tatum's Sui Mainnet RPC to verify chain information before storing data on Walrus.

No traditional database is required. Metadata is stored on Walrus and retrieved directly using the Blob ID.

---

## Features

* Store music metadata on Walrus
* Retrieve metadata using a Blob ID
* Verify Sui Mainnet connectivity through Tatum RPC
* Decentralized storage by default
* Simple music vault interface with track previews

---

## How It Works

1. User enters track metadata.
2. SongVault verifies Sui Mainnet connectivity through Tatum RPC.
3. Metadata is converted to JSON.
4. JSON is uploaded to Walrus.
5. Walrus returns a Blob ID.
6. The Blob ID can be used later to retrieve the track metadata.

---

## Architecture

```text
User
  ↓
Next.js Frontend
  ↓
Next.js API Routes
  ↓
Walrus Publisher
  ↓
Walrus Storage

           ↘
        Tatum RPC
        (Sui Mainnet)
```

---

## Tech Stack

| Layer        | Technology                           |
| ------------ | ------------------------------------ |
| Frontend     | Next.js 15, TypeScript, Tailwind CSS |
| Storage      | Walrus                               |
| RPC Provider | Tatum                                |
| Blockchain   | Sui Mainnet                          |
| Deployment   | Vercel                               |

---

## Getting Started

### Prerequisites

* Node.js 18+
* Tatum API Key

### Installation

```bash
git clone https://github.com/UgwuObed/songvault
cd songvault
npm install
```

### Environment Variables

```env
TATUM_API_KEY=tatum_api_key

NEXT_PUBLIC_WALRUS_AGGREGATOR_URL=https://aggregator.walrus-testnet.walrus.space

WALRUS_PUBLISHER_URL=https://publisher.walrus-testnet.walrus.space

NEXT_PUBLIC_SUI_RPC_URL=https://sui-mainnet.gateway.tatum.io
```

### Run

```bash
npm run dev
```

---

## Usage

### Upload Metadata

* Enter track information
* Click **Store on Walrus**
* Receive a Blob ID

### Retrieve Metadata

* Enter a Blob ID
* Click **Find**
* Metadata is fetched directly from Walrus

---

## Tatum Integration

SongVault uses Tatum's Sui Mainnet RPC during uploads to verify chain information before storing metadata.

Methods used:

* `sui_getLatestCheckpointSequenceNumber`
* `sui_getChainIdentifier`

This allows uploads to be validated against live Sui Mainnet data.

---

## Walrus Integration

Track metadata is stored as JSON blobs on Walrus.

After upload, Walrus returns a Blob ID which becomes the permanent reference for that metadata.

Publisher:
`https://publisher.walrus-testnet.walrus.space`

Aggregator:
`https://aggregator.walrus-testnet.walrus.space`

---

## Potential Use Cases

* Music metadata registry
* Music NFT metadata storage
* Decentralized music catalogs
* Independent artist distribution records
* Label-owned metadata archives

---

## Project Structure

```text
songvault/
├── app/
├── components/
├── lib/
│   ├── walrus.ts
│   └── tatum.ts
└── .env.local
```

---

## Hackathon

Built for the Tatum x Build on Sui with Walrus Hackathon.

---

## License

MIT
