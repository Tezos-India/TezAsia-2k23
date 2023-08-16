import { Navbar } from '@/components/Navbar'
import { useEffect } from 'react';
import React from 'react'
import MultiLayerParallax from "@/components/exploreus/MultiLayerParallax"
import Profiles from '@/components/exploreus/TeamSection';
import { Footer } from '@/components/Footer';
import FAQPage from '@/components/exploreus/FAQPage';
import Image from 'next/image';
import AOS from 'aos';
import 'aos/dist/aos.css';
import VisionSection from '@/components/exploreus/VisionSection';

const AboutUs = () => {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  return (
    <div className="bg-gradient-to-br from-gray-900  to-gray-800 ">
      <Navbar />
      <hr className="border-t border-white h-2 my-2"></hr>
      <div>
        <MultiLayerParallax />
      </div>
      <div data-aos="fade-up-right" data-aos-duration="2000" className='p-16 '>
        <div className='text-4xl font-bold text-right text-white font-serif pb-8'>Staking</div>
        <div className='flex '>
          <Image src="/stake.png" alt="loading" width={400} height={600} />
          <div className='text-gray-300 text-justify'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi amet dolorum modi ad vel repellat culpa eveniet voluptas laudantium quam dignissimos quas, praesentium facere quae eligendi illum, debitis voluptate eum minima quidem. Incidunt quo perspiciatis nostrum laudantium? Alias laborum porro facilis ab minima temporibus perferendis ullam facere repellendus officiis blanditiis ipsa exercitationem, qui adipisci, a sit corrupti animi distinctio error cumque placeat. Perferendis atque, laudantium, animi nisi optio ea ab, blanditiis repudiandae doloremque dolorem voluptas officiis odio saepe. Aliquam officia placeat itaque distinctio exercitationem in officiis deserunt, provident doloremque neque minus iusto, rem error amet, molestiae doloribus? Nulla alias commodi excepturi beatae id aliquam earum obcaecati distinctio itaque fugit laborum exercitationem odio quam, in sit. Impedit, cupiditate itaque aliquid voluptate dolor atque expedita quod dolores doloremque eius quo nostrum, ex hic accusamus totam cumque id alias. Perferendis qui iste deleniti placeat eos aliquam ipsa culpa. Dolorum beatae sit recusandae ad pariatur vel corrupti, itaque odit quae facere quis animi repudiandae ab aut veniam autem quidem est provident unde officiis. Tenetur quas deserunt eaque reiciendis sapiente hic, voluptatibus exercitationem inventore fugiat ipsam vitae corrupti incidunt commodi earum! Amet perspiciatis eum consequatur odit, aspernatur doloribus a. Possimus ab mollitia esse enim ducimus.</div>
        </div>
      </div>
      <div data-aos="fade-up-left" data-aos-duration="2000" className='p-16 '>
        <div className='text-4xl font-bold text-left text-white font-serif pb-8'>Tezos Blockchain</div>
        <div className='flex '>
          <div className='text-gray-300 text-justify'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error, maxime itaque. Nesciunt quos porro unde, fuga dolores iure laboriosam aut, nam modi optio, iusto quod animi excepturi quam cumque! Voluptate molestiae eligendi provident perferendis quod et quis cum sapiente, repellendus at architecto numquam nam culpa quibusdam earum, suscipit ad quisquam sed pariatur nobis! Qui quibusdam quaerat ipsum accusamus quos eius facere, cupiditate repellendus, id maiores voluptates laudantium aperiam quia eaque blanditiis perferendis dolores dignissimos alias! Minima nesciunt atque labore aliquid sapiente? Quam, voluptatum reprehenderit corrupti eius quae cum saepe! Illo maiores possimus quibusdam ipsa quae itaque! Facilis numquam quod totam id labore, autem inventore veniam, quidem commodi error fugit porro non! Eveniet voluptates temporibus nostrum accusamus itaque maiores odit natus, voluptate quas nam eius sapiente provident saepe asperiores ipsam iure quia inventore officiis error voluptas voluptatem, dignissimos, fugit suscipit consequatur. Vel rerum architecto incidunt accusantium dicta quasi veritatis mollitia magni facilis, eligendi, ratione, porro quidem alias voluptatum in quisquam qui temporibus reprehenderit aspernatur unde? Animi, provident, esse porro aperiam ipsam tenetur quam explicabo, delectus ipsa soluta aspernatur. A recusandae similique earum quis dignissimos quae fuga tenetur, unde porro. Ut reprehenderit ratione cupiditate tempore dignissimos fugit error possimus mollitia quam eaque.</div>
          <Image src ="/tez.png" alt="loading" width={600} height={300}/>
        </div>
      </div>
      <Profiles  />
      <VisionSection/>
      <FAQPage />
      <Footer />
    </div>
  )
}
export default AboutUs