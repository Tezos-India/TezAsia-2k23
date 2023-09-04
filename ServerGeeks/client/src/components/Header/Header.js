import React from "react"
import gamifyLogo from "../../assets/gamifyLogo.png";
import { useNavigate } from "react-router-dom";
import {
    useMantineTheme,
    createStyles,
    Text,
    Image,
    Group,
    Space,
    Card,
    Avatar,
    Button,
    Title,
  } from "@mantine/core";

function Header() {
    const navigate = useNavigate();
    return(
        <Group position="apart" className="header">
            {/* <Title
                weight={700}
                size="lg"
                sx={(theme) => ({
                    color: '#ffffff',
                })}
            >
            Gamify
          </Title> */}
          <img src={gamifyLogo} alt="Uno Game Logo" height={50} />
          <Group position="right">
            <Button
                  weight={700}
                  size="lg"
                  onClick={() => navigate("/uno", { replace: true })}
                  color="dark" 
                  radius="md"
              >
              Uno
            </Button>

            <Button
                  weight={700}
                  size="lg"
                  onClick={() => navigate("/chess", { replace: true })}
                  color="dark" 
                  radius="md"
              >
              Chess
            </Button>

            <Button
                  weight={700}
                  size="lg"
                  onClick={() => navigate("/leaderboard", { replace: true })}
                  color="dark" 
                  radius="md"
              >
              Leaderboard
            </Button>
          </Group>
        </Group>
    );
}

export default Header;