import { BeaconWallet } from "@taquito/beacon-wallet";

export const wallet = new BeaconWallet({
	name: "TezoTix",
	preferredNetwork: "ghostnet",
});

// Setup connectWallet function (on ghostnet)
export const connectWallet = async () => {
	wallet.connect();
	await wallet.requestPermissions({ network: { type: "ghostnet" } });
};
export const disconnectWallet = async () => {
	wallet.disconnect();
	await wallet.clearActiveAccount();
};

export const getAccount = async () => {
	const activeAccount = await wallet.client.getActiveAccount();
	if (activeAccount) {
		return activeAccount.address;
	} else {
		return "";
	}
};
