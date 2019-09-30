import { bchChangeReceiverAddress, fundingAddress, fundingWif, ticker, tokenReceiverAddress } from "./server/config";

const BITBOXSDK = require("bitbox-sdk");
const BigNumber = require("bignumber.js");
const slpjs = require("slpjs");

const BITBOX = new BITBOXSDK.BITBOX({
    restURL: "https://rest.bitcoin.com/v2/"
});
const bitboxNetwork = new slpjs.BitboxNetwork(BITBOX);

export const genesis = async () => {
    let balances;
    balances = await bitboxNetwork.getAllSlpBalancesAndUtxos(fundingAddress);
    let decimals = 2;
    let documentUri = "info@simpleledger.io";
    let documentHash = null;
    let initialTokenQty = 1000000;
    initialTokenQty = new BigNumber(initialTokenQty).times(10 ** decimals);
    balances.nonSlpUtxos.forEach(txo => (txo.wif = fundingWif));
    await bitboxNetwork.simpleTokenGenesis(
        name,
        ticker,
        initialTokenQty,
        documentUri,
        documentHash,
        decimals,
        tokenReceiverAddress,
        null,
        bchChangeReceiverAddress,
        balances.nonSlpUtxos
    );
};
export const sendTokens = async (tokeId, amount, tokenAddr, bchAddr) => {
    let sendAmounts = [ amount ];

    let tokenDecimals;
    const tokenInfo = await bitboxNetwork.getTokenInformation(tokenId);
    tokenDecimals = tokenInfo.decimals;

    let balances;
    balances = await bitboxNetwork.getAllSlpBalancesAndUtxos(fundingAddress);

    if(balances.slpTokenBalances[tokenId] === undefined) {
        throw new Error('slpErrors');
    }

    sendAmounts = sendAmounts.map(a => (new BigNumber(a)).times(10**tokenDecimals));

    let inputUtxos = balances.slpTokenUtxos[tokenId];

    inputUtxos = inputUtxos.concat(balances.nonSlpUtxos);

    inputUtxos.forEach(txo => txo.wif = fundingWif);

    await bitboxNetwork.simpleTokenSend(
        tokenId,
        sendAmounts,
        inputUtxos,
        tokenReceiverAddress,
        bchChangeReceiverAddress
    )
};
