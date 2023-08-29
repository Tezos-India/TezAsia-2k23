import SellIcon from "@mui/icons-material/Sell";
import SettingsIcon from "@mui/icons-material/Settings";
import SummarizeIcon from '@mui/icons-material/Summarize';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer, { DrawerProps } from "@mui/material/Drawer";
import MaterialLink from "@mui/material/Link";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { TransactionInvalidBeaconError } from "./TransactionInvalidBeaconError";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { UserContext, UserContextType } from "./App";
import { address } from "./type-aliases";

export enum PagesPaths {
  CATALOG = "",
  OFFERS = "offers",
  MINT = "mint",
}
const item = {
  py: "2px",
  px: 3,
  color: "rgba(255, 255, 255, 0.7)",
  "&:hover, &:focus": {
    bgcolor: "rgba(255, 255, 255, 0.08)",
  },
};

export default function Navigator(props: DrawerProps) {
  const { ...other } = props;
  const location = useLocation();
  const {
    userAddress,
    nftContratTokenMetadataMap,
    storage,
    nftContrat,
    refreshUserContextOnPageReload
  } = React.useContext(UserContext) as UserContextType;
  const [disableWithdraw, setDisableWithdraw] = useState<boolean>(false);
  const [categories, setCategories] = useState<
    {
      id: string;
      children: { id: string; icon: JSX.Element; path: string }[];
    }[]
  >([
    {
      id: "Administration",
      children: [
        {
          id: "Mint AnswerNFT Collection",
          icon: <SettingsIcon />,
          path: "/" + PagesPaths.MINT,
        },
      ],
    },
  ]);
  const withdrawAdmin = async () => {
    try {
      const op = await nftContrat?.methods
        .withdraw().send({amount: 10, mutez: true});
      await op?.confirmation(2);

      console.log(
        "AnswerNFT Miniting Fees Withdrawed",
        // { variant: "success" }
      );

      refreshUserContextOnPageReload(); //force all app to refresh the context
    } catch (error) {
      console.table(`Error: ${JSON.stringify(error, null, 2)}`);
      let tibe: TransactionInvalidBeaconError =
        new TransactionInvalidBeaconError(error);
      console.log(tibe.data_message)
      //   , {
      //   variant: "error",
      //   autoHideDuration: 10000,
      // });
    }
  }
  useEffect(() => {
    if (nftContratTokenMetadataMap && nftContratTokenMetadataMap.size > 0)
      setCategories([
        {
          id: "Trading",
          children: [
            {
              id: "Questions/Answers catalogue",
              icon: <SummarizeIcon />,
              path: "/" + PagesPaths.CATALOG,
            },
            {
              id: "Sell NFTs",
              icon: <SellIcon />,
              path: "/" + PagesPaths.OFFERS,
            },
          ],
        },
        {
          id: "Administration",
          children: [
            {
              id: "AnswerNFT collection",
              icon: <SettingsIcon />,
              path: "/" + PagesPaths.MINT,
            },
          ],
        },
      ]);
  }, [nftContratTokenMetadataMap, userAddress]);

  return (
    <Drawer variant="permanent" {...other}>
      <Toolbar />

      <Box
        sx={{
          borderColor: "text.secondary",
          borderStyle: "solid",
          borderWidth: "1px",
          paddingTop: 5,
          height: "calc(100vh - 64px)",
        }}
      >
        <List disablePadding>
          {userAddress
            ? categories.map(({ id, children }) => (
                <Box key={id}>
                  <ListItem sx={{ py: 1, px: 2 }}>
                    <ListItemText>
                      <Typography variant="h5">{id}</Typography>
                    </ListItemText>
                  </ListItem>
                  {children.map(({ id: childId, icon, path }) => (
                    <ListItem
                      selected={path === location.pathname}
                      disablePadding
                      key={childId}
                    >
                      <ListItemButton sx={item}>
                        <Link style={{ textDecoration: "none" }} to={path}>
                          <Stack direction="row">
                            <ListItemIcon>{icon}</ListItemIcon>
                            <ListItemText>{childId}</ListItemText>
                          </Stack>
                        </Link>
                      </ListItemButton>
                    </ListItem>
                  ))}
                  <Divider sx={{ mt: 2 }} />
                </Box>
              ))
            : ""}
          {(storage && storage.administrators.indexOf(userAddress! as address) >= 0) ?
              <Box key="admin-dqwiq14c1-withdraw">
                <ListItem sx={{ py: 1, px: 2 }}>
                  <ListItemText>
                    <Typography variant="h5">Withdraw(Admin only)</Typography>
                  </ListItemText>
                </ListItem>
                  <ListItem
                    disablePadding
                    key="child-admin-withdraw"
                  >
                    <ListItemButton disabled={disableWithdraw} onClick={async () => {
                      setDisableWithdraw(true);
                      await withdrawAdmin();
                      setDisableWithdraw(false);
                    }}>
                        <Stack direction="row">
                          <ListItemIcon><MonetizationOnIcon/></ListItemIcon>
                          <ListItemText>Withdraw</ListItemText>
                        </Stack>
                    </ListItemButton>
                  </ListItem>
                <Divider sx={{ mt: 2 }} />
              </Box>
            : ""}
        </List>
      </Box>
    </Drawer>
  );
}
