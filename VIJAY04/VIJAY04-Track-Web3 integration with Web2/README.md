## TezAsia 23 Hackathon Submission form Details


1. Team Name : VIJAY04
2. Project name : Web3 integration with Web2 Track-Fair Reselling Marketplace Using Tezos Technology.
3. Project's Description : Creating Kivy cross-platform Application to interact Web2 Technologies such as api and database to connect web3 technologies.
4. What problem you are trying to solve : Application that provides confidentiality of their show tickets sold on a fair price for an Authorized Reseller
5. Tech Stack used while building the project :pytezos module api for verification of users and to perform transaction from resellers to the admin
6. Project Demo Photos, Videos :https://github.com/IN4111/TezAsia-2k23/blob/main/VIJAY04/VIJAY04-Track-Web3%20integration%20with%20Web2/Photo.png
7. Your Deployed Smart Contract's Link : NA
8. If your project is deployed , then include the Live Project Link ( optional ) :NA
9. Folder link to project codebase on Tezos-India/TezAsia-2k23 Repository :NA
10. Github repository link :https://github.com/IN4111/TezAsia-2k23/tree/main/VIJAY04/VIJAY04-Track-Web3%20integration%20with%20Web2
11. Your PPT file  :https://docs.google.com/presentation/d/1PT8F_KjF2Vzo33Q_X0s8f2qhTZlc0qhH/edit?usp=share_link&ouid=109290593335147932927&rtpof=true&sd=true
12. Your Team members Info.
        team_mate_1:
        Name:VIJAY.N
        Email:inin4111@gmail.com

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
  
