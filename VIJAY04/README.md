## Web3 integration with Web2-Fair Reselling Marketplace Using Tezos Technology
# 1.Installing requirements
  Install required modules by the following command
  ``` pip install -r requirements.txt```
# 2.Creating Database and Tables
  Follow the following command to create a database
  ```create database tezos;```
  and run the following command
  ```mysql -u username -p tezos < config.sql```
# 3.Application for Admin
  To run admin application ,follow the following command ```python Admin_app.py``` .Modify ```user_name``` and ```password```
  in Admin_app.py with your connection user name and password.
# 4.Add a reseller
  Before adding a reseller ,create a tezos account in mainnet/ghostnet and dont forget to change the shell rpc.
# 5.Application for Reseller
  To run Reseller application ,follow the following command ```python Reseller_app.py``` and modify ```owner_account``` with admin public key in Reseller_app.py
  
