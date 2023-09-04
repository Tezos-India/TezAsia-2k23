package com.blitzkrieg.polyess

import androidx.annotation.NonNull
import io.flutter.embedding.android.FlutterActivity
import io.flutter.embedding.engine.FlutterEngine
import io.flutter.plugin.common.MethodChannel

class MainActivity: FlutterActivity() {
    private val CHANNEL = "polyess.wallet/eth"

    override fun configureFlutterEngine(@NonNull flutterEngine: FlutterEngine) {
        super.configureFlutterEngine(flutterEngine)
        MethodChannel(flutterEngine.dartExecutor.binaryMessenger, CHANNEL).setMethodCallHandler { call, result ->
            if (call.method == "getWallet") {
                val seed : String = (call.argument("seed") as? String) ?: ""
                val eth = Wallet().getWallet(seed)
                result.success(eth)
            } else {
                result.notImplemented()
            }
        }
    }
}
