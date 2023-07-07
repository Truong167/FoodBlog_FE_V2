import { useEffect, useState } from 'react'

import upload from '../../assets/images/upload.png'

const ImageForm = () => {
//     const [selectedFile, setSelectedFile] = useState()
//     const [preview, setPreview] = useState()
//     useEffect(() => {
//         if (!selectedFile) {
//             setPreview(undefined)
//             return
//         }

//         const objectUrl = URL.createObjectURL(selectedFile)
//         setPreview(objectUrl)

//         // free memory when ever this component is unmounted
//         return () => URL.revokeObjectURL(objectUrl)
//     }, [selectedFile])

//     const onSelectFile = e => {
//         if (!e.target.files || e.target.files.length === 0) {
//             return
//         }
//         setSelectedFile(e.target.files[0])
//     }
//   return (
//     <div >
//       {image  ?
//         <div >
//             <img src={image} alt='Upload' />
//             <div >
//                 <div >
//                     <input type='file' accept='image/*' name='recipe' />
                    
//                 </div>
//                 <div>
                    
//                 </div>
//             </div>
//         </div>
//         :
//         <>
//             <div>
//                 <img src={upload} alt='Upload'/>
//                 <p >Bạn đã đăng hình món mình nấu ở đây chưa?</p>
//                 <p>Chia sẻ với mọi người thành phẩm nấu nướng của bạn nào!</p>
//             </div>
//             <input type='file' accept='image/*' name='recipe' />
//         </>

//     }
//     </div>
//   )
}

export default ImageForm
