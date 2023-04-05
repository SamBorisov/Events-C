require("@nomicfoundation/hardhat-toolbox");



/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  defaultNetwork:"localhost",
  networks: {
    // localhost: {
    //   url:'http://127.0.0.1:8545/'
    // },

    // ropsten: {
    //   url: "https://ropsten.infura.io/v3/40c2813049e44ec79cb4d7e0d18de173",
    //   accounts: ['']
    //  },
    // rinkeby: {
    //   url: "https://rinkeby.infura.io/v3/ba900937b83f4883b926713999277b1f",
    //   accounts: ['']
    // },
    // kovan: {
    //   url: "https://kovan.infura.io",
    //   accounts: ['']
    // },
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: process.env.API_KEY_ETHERSCAN
  }
};
