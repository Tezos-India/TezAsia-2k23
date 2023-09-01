import React from 'react'

import './Categories.css'

const Categories = () => {
  return (
    <div className='w-full my-10'>
   

   
   <div class="content" className='grid grid-cols-4 gap-10'>
     
      <div class="card">
         
            <div class="icon"><i class="material-icons md-36"></i></div>
            <p class="title">Action</p>
           
         
      </div>
      <div class="card">
         
            <div class="icon"><i class="material-icons md-36"></i></div>
            <p class="title">Violence</p>
            
         
      </div>
      
      <div class="card">
         
            <div class="icon"><i class="material-icons md-36"></i></div>
            <p class="title">Strategy</p>
            
         
      </div>
      
      <div class="card">
         
            <div class="icon"><i class="material-icons md-36"></i></div>
            <p class="title">RPG</p>
            
         
      </div>
      
      
      
     
      
   

   
   </div>
</div>


 
  )
}

export default Categories
