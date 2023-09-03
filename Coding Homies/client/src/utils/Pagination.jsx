// import React from "react";

// export default function Pagination({
//   postsPerPage,
//   totalPosts,
//   paginateFront,
//   paginateBack,
//   currentPage,
// }) {


//   return (
//     <div className='py-2'>
//       <div>
//         <p className='text-sm text-gray-700'>
//           Showing
//           <span className='font-medium'>{currentPage * postsPerPage - 10}</span>
//           to
//           <span className='font-medium'> {currentPage * postsPerPage} </span>
//           of
//           <span className='font-medium'> {totalPosts} </span>
//           results
//         </p>
//       </div>
//       <nav className='block'></nav>
//       <div>
//         <nav
//           className='relative z-0 inline-flex rounded-md shadow-sm -space-x-px'
//           aria-label='Pagination'
//         >
//           <a
//             onClick={() => {
//               paginateBack();
//             }}
//             href='#'
//             className='relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50'
//           >
//             <span>Previous</span>
//           </a>

//           <a
//             onClick={() => {
//               paginateFront();
//             }}
//             href='#'
//             className='relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50'
//           >
//             <span>Next</span>
//           </a>
//         </nav>
//       </div>
//     </div>
//   );
// }
import React from "react";

export default function Pagination({
  postsPerPage,
  totalPosts,
  paginateFront,
  paginateBack,
  currentPage,
}) {


  return (
    <div className='py-2'>
      <div className="flex justify-center mt-8">
        <p className='text-sm font-montserrat text-[#fff]'>
          Showing
          <span className='font-medium'>{currentPage * postsPerPage - 10}</span>
          to
          <span className='font-medium'> {currentPage * postsPerPage} </span>
          of
          <span className='font-medium'> {totalPosts} </span>
          results
        </p>
      </div>
      <nav className='block'></nav>
      <div className="mt-10 flex justify-center">
        <nav
          className='relative z-0 inline-flex rounded-md shadow-sm -space-x-px' aria-label='Pagination'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mt-2 ">
          <path strokeLinecap="round" strokeLinejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
          </svg>

          <a onClick={() => {paginateBack(); }}
            href='#'
            className='relative w-20 inline-flex font-montserrat items-center px-2 py-2  rounded-l-md border border-gray-300 bg-zinc-900 text-sm font-medium text-zinc-100 hover:text-zinc-400 '>
            <span>Previous</span>
          </a>

          <a onClick={() => { paginateFront();
            }}
            href='#'
            className=' rounded-r-md w-20 relative inline-flex font-montserrat  items-center pl-5 border border-gray-300 bg-zinc-900 text-sm font-medium text-zinc-100  hover:text-zinc-400  '     >
            <span>Next</span>
            
          </a>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mt-2 ">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
           </svg>
        </nav>
      </div>
    </div>
  );
}