import React, { useMemo } from 'react'
import {motion} from 'framer-motion'

type Props = {
  description:string 
  name:string  
  thumbnail:string
  tagString:string 
}


const NftPreview = ({description,name,thumbnail,tagString}: Props) => {
  const tags = useMemo(()=>{
      return tagString ? tagString.split(',') : []
  },[tagString])
  return (
    <div className='p-4 w-[336px]  overflow-auto bg-gradient-to-tr backdrop-brightness-110 shadow-xl border border-gray-300  rounded-xl'>
      <motion.div layout animate={{scale:[0,1]}} transition={{duration:0.3}} className='rounded-lg  flex items-center justify-center overflow-hidden'>
      <img className=' w-full' src={thumbnail} alt='preview'/>
      </motion.div>
      <p className='font-medium text-lg mt-4'>{name}</p>
      <p className='text-gray-400 mt-1 whitespace-pre-wrap'>{description}</p>
      {tags.length !== 0 && <div className='flex flex-wrap gap-1.5 mt-2'>
        {tags.map((tag,index)=>(
          <motion.div animate={{scale:[0,1.1,1]}} key={index} className="tag">{tag}</motion.div>
        ))}
      </div>}
    </div>
  )
}

export default NftPreview

