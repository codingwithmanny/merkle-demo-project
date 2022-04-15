// Imports
// ========================================================
import React, { useState } from 'react';
import { useConnect, useAccount, useNetwork, useSignMessage } from 'wagmi';

// Styles
// ========================================================
/**
 * 
 */
const styles = {
  main: 'w-full items-center bg-slate-100 px-4 py-8',
  card: 'mx-auto w-full bg-white border border-slate-200 rounded-lg p-8 shadow-sm',
  h1: 'text-center mb- text-4xl font-semibold text-slate-800',
  label: 'block text-slate-400 text-sm mb-2',
  input: 'px-4 text-slate-500 h-12 rounded-lg border border-slate-200 w-full mb-4',
  p: 'mb-4 text-slate-500 font-medium',
  psmall: 'mb-4 text-slate-500',
  button: 'h-12 mb-4 px-8 rounded-md w-full transition-all ease-in-out duration-200 font-[20px] font-medium flex justify-center items-center hover:shadow-xl',
  errors: 'p-4 mb-4 text-sm rounded-lg border border-red-300 bg-red-200 text-red-600',
  pre: 'mb-4 bg-slate-200 p-4 rounded-lg overflow-scroll w-full'
}

/**
 * 
 * @param name 
 * @returns 
 */
const getButtonStyles = (name?: string) => {
  switch (name) {
    case 'MetaMask':
      return `disabled:bg-[rgba(245,132,21,1)] disabled:opacity-50 bg-[rgba(245,132,21,1)] text-white hover:bg-[#e87e14]`
    case 'WalletConnect':
      return `disabled:bg-[rgba(59,153,252,1)] disabled:opacity-50 bg-[rgba(59,153,252,1)] text-white hover:bg-[#3389e4]`
    case 'Coinbase Wallet':
      return `disabled:bg-[rgba(0,82,255,1)] disabled:opacity-50 bg-[rgba(0,82,255,1)] text-white hover:bg-[#0047e1]`
    default:
      return `disabled:hover:bg-slate-500 disabled:opacity-50 bg-slate-500 text-white hover:bg-slate-600`
  }
};

const apiUrl = 'http://localhost:5001/api';

// Main Component
// ========================================================
const App = () => {
  // State / Props
  const [
    {
      data: { connector, connectors },
      error,
      loading,
    },
    connect,
  ] = useConnect();
  const [{ data: accountData }, disconnect] = useAccount();
  const [state, setState] = useState({
    wallet: '',
    proof: '',
    root: ''
  });
  const [debug, setDebug] = useState<any>();

  // Functions
  const getMerkleProof = async () => {
    try {
      const result = await fetch(`${apiUrl}/merkle`)
    } catch (error) {
      console.log({ error });
    }
  }

  /**
   * 
   * @param event 
   */
  const onSubmitFormAddWallet = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const result = await fetch(`${apiUrl}/wallets`,
        {
          method: 'post',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            address: state.wallet
          })
        });

      const json = await result.json();
      setDebug(json);
    } catch (error) {
      console.log({ error });
    }
  };

  /**
   * 
   * @param event 
   */
  const onSubmitFormCreateProof = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const result = await fetch(`${apiUrl}/merkle`,
        {
          method: 'post',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            address: state.wallet
          })
        });

      const json = await result.json();
      setDebug(json);
    } catch (error) {
      console.log({ error });
    }
  };

  /**
   * 
   * @param event 
   */
  const onSubmitFormVerifyProof = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const result = await fetch(`${apiUrl}/merkle/verify`,
        {
          method: 'post',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            address: state.wallet,
            proof: JSON.parse(state.proof),
            root: state.root
          })
        });

      const json = await result.json();
      setDebug(json);
    } catch (error) {
      console.log({ error });
    }
  };

  /**
   * 
   */
  const onClickGetAllWallets = async () => {
    try {
      const result = await fetch(`${apiUrl}/wallets`,
        {
          method: 'get',
          headers: {
            'Content-Type': 'application/json'
          }
        });

      const json = await result.json();
      setDebug(json);
    } catch (error) {
      console.log({ error });
    }
  }

  /**
   * 
   * @param event 
   */
  const onChangeInput = (key: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [key]: event.target.value
    })
  }

  // Render / UI
  return (
    <main className={styles.main}>
      <div className={styles.card}>
        <div className="flex">
          <div className='w-1/2 pr-4'>
            <h1 className="text-2xl font-semibold text-slate-800 mb-8">Merkle Tree Example</h1>

            <div className="block mb-8">
              <p className={styles.p}>Add To White List</p>

              <form onSubmit={onSubmitFormAddWallet}>
                <div>
                  <label className={styles.label}>Add Wallet Address To White List</label>
                  <input className={styles.input} type="text" value={state.wallet} onChange={onChangeInput('wallet')} placeholder="0x01..." />
                </div>
                <div>
                  <button type='submit' className={`${styles.button} ${getButtonStyles()}`}>Submit</button>
                </div>
              </form>
            </div>

            <div className="block mb-8">
              <p className={styles.p}>View White List</p>
              <button onClick={onClickGetAllWallets} className={`${styles.button} ${getButtonStyles()}`}>Get All Wallets</button>
            </div>

            <div className="block mb-8">
              <p className={styles.p}>Create Merkle Proof</p>

              <form onSubmit={onSubmitFormCreateProof}>
                <div>
                  <label className={styles.label}>Create Merkle Proof</label>
                  <input className={styles.input} type="text" value={state.wallet} onChange={onChangeInput('wallet')} placeholder="0x01..." />
                </div>
                <div>
                  <button type='submit' className={`${styles.button} ${getButtonStyles()}`}>Submit</button>
                </div>
              </form>
            </div>

            <div className="block mb-8">
              <p className={styles.p}>Verify Proof</p>
              <form onSubmit={onSubmitFormVerifyProof}>
                <div>
                  <label className={styles.label}>Wallet Address</label>
                  <input className={styles.input} type="text" value={state.wallet} onChange={onChangeInput('wallet')} placeholder="0x01..." />
                </div>
                <div>
                  <label className={styles.label}>Root</label>
                  <input className={styles.input} type="text" value={state.root} onChange={onChangeInput('root')} placeholder="0x01..." />
                </div>
                <div>
                  <label className={styles.label}>Verify Proof</label>
                  <input className={styles.input} type="text" value={state.proof} onChange={onChangeInput('proof')} placeholder="['0x01...']" />
                </div>
                <div>
                  <button type='submit' className={`${styles.button} ${getButtonStyles()}`}>Submit</button>
                </div>
              </form>
            </div>

            <hr className="mb-4" />

            {!accountData ? <div>
              {connectors.map((option) => (
                <button
                  title={`Connect Your Wallet With ${option.name}`}
                  className={`${styles.button} ${getButtonStyles(option.name)}`}
                  disabled={!option.ready}
                  key={option.name}
                  onClick={() => connect(option)}
                >
                  {option.name}
                  {!option.ready && ' (unsupported)'}
                  {loading && option.name === connector?.name && <small className='ml-2'>(Awaiting Connetion...)</small>}
                </button>
              ))}
            </div> : null}

            {accountData ? <div>
              <p className={styles.psmall}><small>Connected With Wallet</small></p>
              <pre title={accountData?.address} className={styles.pre}>
                <code>{accountData?.address}</code>
              </pre>
              <button className={`${styles.button} ${getButtonStyles()}`}>Get Merkle Proof</button>
            </div> : null}

            <hr className="mb-4" />
          </div>
          <div className='w-1/2 pl-4'>
            <p className="text-slate-600 mb-4">Debug</p>
            <pre className={`${styles.pre} h-full max-h-[650px]`}><code>{JSON.stringify(debug, null, ' ')}</code></pre>
          </div>
        </div>

      </div>
    </main >
  )
}

// Exports
// ========================================================
export default App
