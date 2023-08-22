package com.blitzkrieg.polyess

import wallet.core.jni.CoinType
import wallet.core.jni.HDWallet
import java.lang.System.loadLibrary


class Wallet {

    init {
        loadLibrary("TrustWalletCore")
    }

    private val pass = ""

    fun getWallet(seed : String) : String {
        val wall = HDWallet(seed,pass)
        val coinEth : CoinType = CoinType.ETHEREUM
        return wall.getAddressForCoin(coinEth)
    }
}