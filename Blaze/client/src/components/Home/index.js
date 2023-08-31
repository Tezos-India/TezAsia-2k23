import React from "react";
import useToggle from "../Hooks/useToggle";
import BackToTop from "../BackToTop";
import Drawer from "../Mobile/Drawer";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import HeroHome from "./HeroHome";
import TeamHomeEight from "./TeamHomeEight";
import WorkPartHomeEight from "./WorkPartHomeEight";

function HomeEight() {
  const [drawer, setDrawer] = useToggle(false);
  return (
    <>
      <Drawer drawer={drawer} action={setDrawer.toggle} />
      <Header drawer={drawer} action={setDrawer.toggle} />
      <HeroHome />
      <WorkPartHomeEight />
      {/* <TeamHomeEight />
      <Footer /> */}
      <BackToTop className="back-to-top-8" />
    </>
  );
}

export default HomeEight;
