import type { NextPage } from "next";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import Button from "../components/design/Button";
import { FiChevronRight } from "react-icons/fi";
import NextLink from "../components/design/NextLink";
import { ipfsToGatewayLink } from "../lib/utils";
const HeroNftCard = ({
  img,
  title,
  desc,
}: {
  img: string;
  title: string;
  desc: string;
}) => {
  return (
    <Tilt
      glareEnable={true}
      glareBorderRadius="8px"
      className="rounded-lg overflow-hidden"
      perspective={2000}
    >
      <div className="rounded-xl noise p-3  border border-gray-100/50 backdrop-blur-2xl bg-gradient-to-tr from-white/30 to-white/30 w-[300px] left-8  ">
        <img
          className="rounded-lg mb-4 w-full aspect-square object-cover "
          src={img}
          alt="image"
        />
        <h6 className="text-xl font-bold">{title}</h6>
        <p className="truncate text-slate-700">{desc}</p>
      </div>
    </Tilt>
  );
};

const Home: NextPage = () => {
  return (
    <div>
      <div className="grid my-20 md:my-48 md:grid-cols-2 gap-16 justify-between max-w-screen-xl mx-auto">
        {/* Left Side */}
        <div className="flex flex-col  ">
          <h1 className="text-4xl  text-center md:text-left  font-bold    lg:text-5xl">
            World{"'"}s most{" "}
            <span className=" bg-clip-text bg-gradient-to-b text-transparent from-cyan-400 to-blue-600">
              {" "}
              seamless{" "}
            </span>{" "}
            <br />
            <span className=" bg-clip-text bg-gradient-to-b text-transparent from-cyan-400 to-blue-600">
              NFT minting
            </span>{" "}
            platform
            <br />
          </h1>
          <p className="md:text-xl text-center md:text-left mt-4 text-gray-600">
            Create , preview and mint your dream NFT without any hassle on Tezos
            blockchain using TezMint
          </p>
          <div className="mt-4">
            <NextLink href="/create">
              <Button
                size="lg"
                variant="primary"
                className="flex items-center group justify-center gap-2"
              >
                Create my Nft{" "}
                <FiChevronRight className="h-6 w-6 group-hover:translate-x-2 duration-200 ease-out" />{" "}
              </Button>
            </NextLink>
          </div>
        </div>
        {/* Right Side */}
        <div className="flex items-center justify-center relative">
          {/* <div className="h-80 blur-md rounded-full w-80 z-[-1] bg-gradient-to-tr from-cyan-400 via-indigo-500 to-violet-600"/> */}
          <img
            src="/mesh1.png"
            className="z-[-1] scale-125 md:scale-100 duration-200 md:absolute md:translate-x-20  md:translate-y-20 -rotate-45"
          />

          <motion.div
            animate={{ y: [-20, 0, -20] }}
            transition={{
              repeat: Infinity,
              duration: 3,
            }}
            className="absolute"
          >
            <HeroNftCard
              title="Eternal Soul"
              img="/homepage_art.jfif"
              desc="Fantasy Art"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Home;
