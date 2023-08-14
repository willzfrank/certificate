import * as React from 'react'
// import { Control } from 'react-hook-form'

// const AddModuleTypeVideo = ({
//   formControl,
// }: {
//   formControl: Control<
//     { videoName: string; videoFile: string; videoDescription: string },
//     any
//   >
// }) => {
//   return (
//     <div>
//       <div className="py-2 grid md:grid-cols-[150px,1fr] grid-cols-[100px,1fr] items-center">
//         <label htmlFor="videoName">Video Title</label>
//         <input
//           type="text"
//           placeholder="Module 1"
//           id="videoName"
//           {...formControl.register('videoName', { required: true })}
//           className="px-4 py-2 rounded border md:w-[450px] w-full text-[15px] text-muted focus:border-app-dark-500"
//         />
//       </div>
//       <div className="pt-2 grid md:grid-cols-[150px,1fr] grid-cols-[100px,1fr] items-center">
//         <label htmlFor="videoFile">Video</label>
//         <div className="relative">
//           <input
//             type="file"
//             id="videoFile"
//             accept='video/*'
//             {...formControl.register('videoFile', { required: true })}
//             className="px-4 text-sm py-2 rounded border md:w-[450px] w-full text-muted focus:border-app-dark-500"
//           />
//         </div>
//       </div>

//       <div className="pt-4 grid md:grid-cols-[150px,1fr] grid-cols-[100px,1fr] items-start">
//         <label htmlFor="#videoDescription">Video Description</label>
//         <div className="relative">
//           <textarea
//             rows={4}
//             id="videoFile"
//             {...formControl.register('videoDescription', { required: true })}
//             className="px-4 text-sm py-2 rounded border md:w-[450px] w-full text-muted focus:border-app-dark-500"
//           />
//         </div>
//       </div>

//       <div className="grid grid-cols-[100px,1fr] md:grid-cols-[150px,1fr] items-center my-2">
//         <p></p>
//         <p className="text-sm text-muted">
//           Note about length of videos/size restrictions goes here
//         </p>
//       </div>
//     </div>
//   )
// }

// export default AddModuleTypeVideo
