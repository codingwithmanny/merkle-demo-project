# Merkle Sample Project

This monorepo demonstrates how merkletrees work with a frontend, a backend to generate proofs, and a contract that validates if a user can interact with the contract period.

## Requirements

- NVM or NodeJS ^16.14.0
- Docker

## Services

There are 3 different services that are run:

**api**
Backend service that connects to a database to store whitelist wallet addresses and generate merkleproofs

**contract**
Contract and local ethereum node that runs the server for the contract and handles the deployment

**react**
Frontend code that interacts with the api and the contract

## Local Setup

### 1 - Running The Services

```bash
# install dependencies
nvm use;
yarn install;

# start docker & setup database
cd packages/api;
docker compose up -d; # docker compose down --remove-orphans -v;
cp .env.example .env;
npx prisma migrate dev;

# run services
cd ../..;
yarn dev;
```

### 2 - Importing The Wallet

In Metamask import a new wallet while in the `Localhost` network.

```
Account #0: 0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266 (10000 ETH)
Private Key: 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
```

### 3 - Deploying Contract

In a new terminal window:

```bash
# deploy contract to get contract address
cd packages/contract;
yarn deploy;

# Expected similar output:
# Contract deployed to: 0x5FbDB2315678afecb367f032d93F642f64180aa3

cd ../react;
cp .env.example .env;
```

Modify the `.env` file to be:

```txt
VITE_CONTRACT_ADDRESS="0x5FbDB2315678afecb367f032d93F642f64180aa3"
VITE_SUPPORTED_CHAIN="Localhost"
```
