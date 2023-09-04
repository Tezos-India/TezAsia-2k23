import "./Background.css";
import { useMantineTheme } from "@mantine/core";

const cardsPics = [
  "/images/Cards/Blue_2.png",
  "/images/Cards/Green_5.png",
  "/images/Cards/Red_9.png",
  "/images/Cards/Yellow_0.png",
  "/images/Cards/Blue_3.png",
  "/images/Cards/Green_4.png",
  "/images/Cards/Red_7.png",
  "/images/Cards/Yellow_1.png",
  "/images/Cards/Wild.png",
  "/images/Cards/Wild_Draw.png",
  "/images/Cards/Yellow_8.png",
  "/images/Cards/Blue_6.png",
];

function Background() {
  const theme = useMantineTheme();

  return (
    <div
      className="area"
      style={{
        backgroundColor: theme.colors.red[8],
        zIndex: -1000
      }}
    >
      <div className="cards">
        {cardsPics.map((card, i) => {
          return <img key={i} src={card} alt="uno card pics" />;
        })}
      </div>
    </div>
  );
}

export default Background;
