import smartpy as sp

Treasury = sp.io.import_script_from_url("file:contracts/treasury/contract.py").Treasury
Fa12 = sp.io.import_script_from_url("file:contracts/fa12/contract.py")
FA12 = Fa12.FA12
FA12_config = Fa12.FA12_config
Errors = sp.io.import_script_from_url("file:contracts/treasury/utils/errors.py")


@sp.add_test(name = "treasury", is_default = True)
def test():
    scenario = sp.test_scenario()
    scenario.add_flag("default_record_layout", "comb")
    scenario.h1("Treasury")
    scenario.table_of_contents()

    admin = sp.test_account("admin")
    users = [sp.test_account(f"User{i}") for i in range(20)]
    manager = sp.test_account("manager")

    scenario.h1("Accounts")
    scenario.show([admin, *users])

    scenario.h1("FA1.2 contract")
    fa12 = FA12(
        admin = admin.address,
        config              = FA12_config(support_upgradable_metadata = True),
        token_metadata      = {"": "ipfs://Qm1token.."},
        contract_metadata   = {"": "ipfs://Qm1fa12.."}
    )
    scenario += fa12

    scenario.h1("Treasury")
    treasury = Treasury(
        admin = admin.address,
        manager = manager.address,
        fa12 = fa12.address,
        metadata = {"": sp.utils.metadata_of_url("ipfs://Qm1..")},
    )
    scenario += treasury

    fa12.mint(
        address = treasury.address,
        value = 10000,
    ).run(sender = admin)

    scenario.show(fa12.data.balances[treasury.address].balance == 10000)

    treasury.withdraw(
        user = users[0].address,
        amount = 1000,
    ).run(sender = manager)

    scenario.show(fa12.data.balances[treasury.address].balance == 9000)
    scenario.show(fa12.data.balances[users[0].address].balance == 1000)
    

    