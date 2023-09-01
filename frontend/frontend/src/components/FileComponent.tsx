import React, { useState } from 'react'
import { RenameInput } from './RenameInput'
import { FilesToUploadI } from '@/utils/interfaces'



interface Props{
  file:File
  index:number
  setFilesToUpload:React.Dispatch<React.SetStateAction<FilesToUploadI>>
  filesToUpload: FilesToUploadI
  setErrorMsg:React.Dispatch<React.SetStateAction<string>>
}

//every file in a list is a file component, the file component contains two buttons one to delete the file from the list and one to rename the file, the rename button is a component by itself:

export const FileComponent = ({setFilesToUpload, index, file, filesToUpload, setErrorMsg }:Props) => {

  const [handleInput, setHandleInput] = useState<boolean>(false)


  function removeFileFromUpload(idx: number) {


    const removeFileFromfiles = filesToUpload.files.filter((_file, index) => {
     return idx !== index
    })
    const removeImageFromImages  = filesToUpload.images.filter((_file, index) => {
      return idx !== index
    })
    setFilesToUpload({files:removeFileFromfiles, images:removeImageFromImages})
  }


  function triggerRename(state: boolean) {
    setHandleInput(state)
  }
  
  
  return (
  <>
  {
  
    handleInput  ?
  
      
      <RenameInput 
        triggerRename={triggerRename}
                    index={index}
                    setFilesToUpload={setFilesToUpload}
                    filesToUpload={filesToUpload}
                  setErrorMsg={setErrorMsg}
                    file={file}
                    />
                    :
                    <div  className='flex flex-row justify-between  hover:!bg-transparent'>
                      <div className="avatar">
  <div className="rounded w-[15vh] h-[8vw] flex-1">
    {file.type.includes("video") ? <video    controls >
  <source src={filesToUpload.images[index]} type={file.type}/>
</video> : <img  src={filesToUpload.images[index]} />}
    
  </div>
</div>              
                    <a className=' cursor-default'>
                       {file.name}
                       </a>
                       <div className='flex gap-2'>
                         {/* trigger rename icon */ }
           
                       <div className='rounded-full shadow-lg bg-sky-600 p-1 hover:bg-sky-700 '   onClick={() => triggerRename(true)}>
           
           <svg  data-testid="renombrar archivo"  width="17" height="17" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M10 4H8V6H5C3.34315 6 2 7.34315 2 9V15C2 16.6569 3.34315 18 5 18H8V20H10V4ZM8 8V16H5C4.44772 16 4 15.5523 4 15V9C4 8.44772 4.44772 8 5 8H8Z" fill="currentColor" /><path d="M19 16H12V18H19C20.6569 18 22 16.6569 22 15V9C22 7.34315 20.6569 6 19 6H12V8H19C19.5523 8 20 8.44771 20 9V15C20 15.5523 19.5523 16 19 16Z" fill="currentColor" /></svg> </div>
                  {/* trigger rename icon */ }
           
                   {/* delete icon */ }
                  <div className='rounded-full shadow-lg bg-red-600 p-1 hover:bg-red-700 '  placeholder=''   onClick={() => removeFileFromUpload(index)}>
                 <svg width="17" data-testid="remover archivo"  height="17"  viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 11C7.44772 11 7 11.4477 7 12C7 12.5523 7.44772 13 8 13H16C16.5523 13 17 12.5523 17 12C17 11.4477 16.5523 11 16 11H8Z" fill="currentColor" /><path fillRule="evenodd" clipRule="evenodd" d="M1 5C1 2.79086 2.79086 1 5 1H19C21.2091 1 23 2.79086 23 5V19C23 21.2091 21.2091 23 19 23H5C2.79086 23 1 21.2091 1 19V5ZM5 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3Z" fill="currentColor" /></svg>
               </div>
               
                   {/* delete icon */ }
                       </div>
                    
                 </div>
    
  }
  
  </>
  
  )
}
