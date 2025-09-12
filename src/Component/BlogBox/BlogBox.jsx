import React from 'react'

function BlogBox({blog}) {
    const handleReadMore = ()=>{
        console.log("hey i am working")
    }
  return (
    <div className='p-2 border rounded-md'>
            <div className="w-full h-60 max-w-full max-h-96 overflow-hidden">
              <img src="https://physiotheraphy-assets.s3.ap-south-1.amazonaws.com/1746170630534_16.jpg" className='w-full h-full object-top '/>
            </div>
            <div className='px-2 text-start'>
            <div className='flex items-center justify-between  mb-2 mt-2'>
            <h1 className='text-lg font-medium text-gray-900'>This is My Title </h1>
            <h1 className='text-base font-medium text-gray-900'>24-05-2025</h1>


            </div>
            <p className='font-normal text-base'>this is the contain that is going to visable when user click on this part Lorem ipsum dolor qui minima perferendis harum consequuntur dolorum quibusdam. Officiis alias quam fugit?...<span className='text-blue-900 font-semibold text-lg'>
                <button onClick={handleReadMore}>

              read more
                </button>
              </span> </p>
            </div>

          </div>

  )
}

export default BlogBox