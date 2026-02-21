// import { Laptop, Code2 } from 'lucide-react'
// import React from 'react'

// function Logo() {
//     return (
//         <div className='h-screen bg-black flex justify-center items-center w-full'>

//             <span className='flex flex-col items-center'>
//                 <Laptop  size={150} className='text-blue-500' />
//                 <Code2 size={100}  className=''/>
//                 <span className='text-white text-5xl font-extrabold'>G<span className='text-blue-500'>F</span>C</span>
//             </span>
//         </div>
//     )
// }

// export default Logo

import { Laptop, Code2 } from "lucide-react";

export default function LogoIcon() {
  return (
    <div className="h-screen bg-black flex flex-col justify-center items-center">

      {/* Icon Container */}
      <div className="relative w-[150px] h-[90px] flex items-center justify-center">

        {/* Laptop */}
        <Laptop size={150} strokeWidth={1} className="text-blue-500 font-normal" />

        {/* Code icon inside laptop */}
        <div className="absolute top-[38%] left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Code2 size={55} className="text-white" />
        </div>

      </div>

      {/* GFC Text */}
      <span className="mt-3 text-white text-5xl font-bold tracking-wide">
        G<span className="text-blue-500">F</span>C
      </span>

    </div>
  );
}