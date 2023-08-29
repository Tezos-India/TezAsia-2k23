import Logo from '../assets/logo.svg'
import Discord from '../assets/social/discord.svg'
import Github from '../assets/social/github.svg'
import Twitter from '../assets/social/twitter.svg'

export default function Footer() {
  return (
    <div className="flex justify-center">
      <div>
        <img src={Logo} className="m-0 justify-center" alt="Logo" />
        <div className="mb-5 mt-6 flex flex-row justify-center">
          <img src={Discord} className="mx-auto" alt="Discord" />
          <img src={Twitter} className="mx-auto" alt="Twitter" />
          <img src={Github} className="mx-auto" alt="Github" />
        </div>
        <p className="font-primary text-footerGray">Copyright 2023</p>
      </div>
    </div>
  )
}
