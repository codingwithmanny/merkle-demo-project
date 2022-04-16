// Imports
// ========================================================
import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider as WagmiProvider, defaultChains, developmentChains } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';

// Config
// ========================================================

/**
 * 
 */
const chains = [...defaultChains, ...developmentChains];

/**
 * 
 * @param param0 
 * @returns 
 */
const connectors = () => {
  // Return options
  return [
    new InjectedConnector({
      chains,
      options: { shimDisconnect: true }
    }),
  ]
}

// Main Render
// ========================================================
ReactDOM.render(
  <React.StrictMode>
    <WagmiProvider
      connectors={connectors}
    >
      <App />
    </WagmiProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
