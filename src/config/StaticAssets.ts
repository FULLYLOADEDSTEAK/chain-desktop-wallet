// Every created wallet get initialized with a new CRO asset
import { getRandomId } from '../crypto/RandomGen';
import { AssetCreationType, UserAssetConfig, UserAssetType } from '../models/UserAsset';
import { WalletConfig, SupportedChainName } from './StaticConfig';
import { checkIfTestnet } from '../utils/utils';
import iconCronosSvg from '../assets/icon-cronos-blue.svg';
import iconCroSvg from '../assets/icon-cro.svg';

// This will be used later for asset recreation/migration
export const STATIC_ASSET_COUNT = 2;

// Update Explorer Url - https://cronoscan.com
export const MAINNET_EVM_EXPLORER_URL = 'https://cronoscan.com';
// There's no testnet explorer on cronoscan.com. Use cronos.org/explorer instead.
export const TESTNET_EVM_EXPLORER_URL = 'https://cronos.org/explorer/testnet3';

export const TestNetEvmConfig: UserAssetConfig = {
  explorer: {
    tx: `${TESTNET_EVM_EXPLORER_URL}/tx`,
    address: `${TESTNET_EVM_EXPLORER_URL}/address`,
  },
  explorerUrl: TESTNET_EVM_EXPLORER_URL,
  chainId: '338',
  fee: { gasLimit: `50000`, networkFee: `20000000000` },
  indexingUrl: 'https://cronos.org/explorer/testnet3/api',
  isLedgerSupportDisabled: false,
  isStakingDisabled: false,
  nodeUrl: 'https://evm-t3.cronos.org/',
  memoSupportDisabled: true,
};

export const MainNetEvmConfig: UserAssetConfig = {
  explorer: {
    tx: `${MAINNET_EVM_EXPLORER_URL}/tx`,
    address: `${MAINNET_EVM_EXPLORER_URL}/address`,
  },
  explorerUrl: MAINNET_EVM_EXPLORER_URL,
  chainId: '25',
  fee: { gasLimit: `50000`, networkFee: `20000000000` },
  // indexingUrl sticks with https://cronos.org/explorer for now
  indexingUrl: 'https://cronos.org/explorer/api',
  isLedgerSupportDisabled: false,
  isStakingDisabled: false,
  nodeUrl: 'https://evm.cronos.org',
  memoSupportDisabled: true,
};

// Every created wallet get initialized with a new CRO asset
export const CRONOS_TENDERMINT_ASSET = (walletConfig: WalletConfig) => {
  const { network } = walletConfig;
  const assetSymbol = network.coin.croDenom.toString().toUpperCase();

  const config: UserAssetConfig = {
    explorerUrl: walletConfig.explorerUrl,
    explorer: walletConfig.explorer,
    chainId: network.chainId,
    fee: { gasLimit: '300000', networkFee: '10000' },
    indexingUrl: walletConfig.indexingUrl,
    isLedgerSupportDisabled: true,
    isStakingDisabled: true,
    nodeUrl: network.defaultNodeUrl,
    memoSupportDisabled: false,
  };

  return {
    balance: '0',
    description:
      'Cronos (CRO) is the native token of the Crypto.org Chain. The Crypto.org Chain was created to build a network of cryptocurrency projects, and develop merchants’ ability to accept crypto as a form of payment. The Crypto.org Chain is a high performing native blockchain solution, which will make the transaction flows between crypto users and merchants accepting crypto seamless, cost-efficient and secure.\\r\\n\\r\\nBusinesses can use Crypto.org pay Checkout and/or Invoice to enable customers to complete checkout and pay for goods and services with cryptocurrencies using the Crypto.org Wallet App. Businesses receive all their payments instantly in CRO or stable coins, or in fiat.',
    icon_url:
      // 'https://s3-ap-southeast-1.amazonaws.com/monaco-cointrack-production/uploads/coin/colorful_logo/5c1248c15568a4017c20aa87/cro.png',
      iconCroSvg,
    identifier: getRandomId(),
    name: SupportedChainName.CRYPTO_ORG,
    symbol: assetSymbol,
    mainnetSymbol: 'CRO', // This is to be used solely for markets data since testnet market prices is always non existent
    stakedBalance: '0',
    unbondingBalance: '0',
    rewardsBalance: '0',
    decimals: 8,
    assetType: UserAssetType.TENDERMINT,
    isSecondaryAsset: false,
    assetCreationType: AssetCreationType.STATIC,
    config,
  };
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const CRONOS_EVM_ASSET = (walletConfig: WalletConfig) => {
  const { network } = walletConfig;

  const isTestnet = checkIfTestnet(network);

  const config: UserAssetConfig = isTestnet ? TestNetEvmConfig : MainNetEvmConfig;

  return {
    balance: '0',
    description: '',
    icon_url:
      // 'https://firebasestorage.googleapis.com/v0/b/chain-desktop-wallet.appspot.com/o/cronos_logo.png?alt=media&token=781c48a3-e89e-4dd4-87d3-d1a1b8e2e456',
      iconCronosSvg,
    identifier: getRandomId(),
    name: SupportedChainName.CRONOS,
    symbol: isTestnet ? 'TCRO' : 'CRO',
    mainnetSymbol: 'CRO', // This is to be used solely for markets data since testnet market prices is always non existent
    stakedBalance: '0',
    unbondingBalance: '0',
    rewardsBalance: '0',
    decimals: 18,
    assetType: UserAssetType.EVM,
    isSecondaryAsset: true,
    assetCreationType: AssetCreationType.STATIC,
    config,
  };
};
