import React from "react";

export default function Footer() {
  return (
    <div className="bg-darkslateblue-200 text-left text-aliceblue font-mynft-caption flex flex-row pb-10 pt-6">
      <div className="py-4 md:py-6 px-8 md:px-8 space-y-4 md:space-y-0 md:space-x-6 w-[50vw]">
        <div className="p-6 md:p-6 border-b border-darkslateblue-100">
          <div className="mb-4 text-xl md:text-2xl text-gray-100 font-extrabold">
            FlexPass
          </div>
          <p className="text-white text-sm md:text-base">
            Unforgettable era of entertainment through our gateway to
            exceptional shows and experiences!
          </p>
        </div>
        <div className="text-aliceblue">
          <div className="mb-2 text-lg font-semibold">Join our community</div>
          <div className="flex gap-1">
            <img className="w-4 h-4" alt="" src="../twitter.svg" />
            <img className="w-4 h-4" alt="" src="../facebook.svg" />
            <img className="w-4 h-4" alt="" src="../instagram.svg" />
            <img className="w-4 h-4" alt="" src="../youtube.svg" />
            <img className="w-4 h-4" alt="" src="../telegram.svg" />
          </div>
        </div>
      </div>
      <div className="py-4 md:py-6 px-8 md:px-8 space-y-4 md:space-y-0 md:space-x-6 flex flex-row w-[40vw] ml-72">
        <div className="mt-2 md:mt-0 px-20">
          <div className="mb-2 text-lg font-semibold">Market Place</div>
          <div className="space-y-1 text-lightsteelblue">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 hidden">
                <img alt="" src="/iconclock.svg" />
              </div>
              <div>Explore</div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 hidden">
                <img alt="" src="/iconclock1.svg" />
              </div>
              <div>How it works</div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 hidden">
                <img alt="" src="/iconclock2.svg" />
              </div>
              <div>Jobs</div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 hidden">
                <img alt="" src="/iconclock3.svg" />
              </div>
              <div>Help center</div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 hidden">
                <img alt="" src="/iconclock4.svg" />
              </div>
              <div>Blogs</div>
            </div>
          </div>
        </div>
        <div className="mt-2 md:mt-0">
          <div className="mb-2 text-lg font-semibold">Company</div>
          <div className="space-y-1 text-lightsteelblue">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 hidden">
                <img alt="" src="/iconclock5.svg" />
              </div>
              <div>About Us</div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 hidden">
                <img alt="" src="/iconclock6.svg" />
              </div>
              <div>Contact Us</div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 hidden">
                <img alt="" src="/iconclock7.svg" />
              </div>
              <div>Feature</div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 hidden">
                <img alt="" src="/iconclock8.svg" />
              </div>
              <div>Discover</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
