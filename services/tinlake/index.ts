import Tinlake, { ITinlake } from 'tinlake'
import { ContractAddresses } from 'tinlake/dist/Tinlake'
import Eth from 'ethjs'
import { ethers } from 'ethers'
import config from '../../config'

let tinlake: ITinlake | null = null
let currentAddresses: null | ContractAddresses = null
let currentContractConfig: null | any = null

// initTinlake returns a singleton tinlake. Tinlake is re-intialized if addresses or contractConfig has been changed.
export function initTinlake({
  addresses,
  contractConfig,
}: { addresses?: ContractAddresses | null; contractConfig?: any | null } = {}): ITinlake {
  if (tinlake === null) {
    const { transactionTimeout } = config
    const ethersProvider = new ethers.providers.Web3Provider(window.ethereum)
    tinlake = new Tinlake({
      transactionTimeout,
      provider: getDefaultHttpProvider(),
      ethers: {
        provider: ethersProvider,
        signer: ethersProvider.getSigner(),
      },
    }) as any
    tinlake!.setEthConfig({ gasLimit: `0x${config.gasLimit.toString(16)}` })
  }

  let resetContractAddresses = false
  if (!deepEqual(addresses || null, currentAddresses)) {
    currentAddresses = addresses || null
    tinlake!.contractAddresses = currentAddresses || {}
    resetContractAddresses = true
  }

  if (!deepEqual(contractConfig || null, currentContractConfig)) {
    currentContractConfig = contractConfig || null
    tinlake!.contractConfig = currentContractConfig || {}
    resetContractAddresses = true
  }

  if (resetContractAddresses && tinlake!.contractAddresses && tinlake!.contractConfig) {
    tinlake!.setContracts!()
  }

  return tinlake!
}

export function getTinlake(): ITinlake | null {
  return tinlake
}

export function getDefaultHttpProvider(): any {
  const { rpcUrl } = config
  const httpProvider = new Eth.HttpProvider(rpcUrl)
  return httpProvider
}

export function getDefaultEthersProvider(): ethers.providers.Provider {
  return new ethers.providers.InfuraProvider('kovan', '092108ec6aea46ab97b2175b45130455')
}

function deepEqual(a: any, b: any): boolean {
  return JSON.stringify(a) === JSON.stringify(b)
}
