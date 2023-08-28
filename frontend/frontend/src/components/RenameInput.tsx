import { useState } from "react";
import { FilesToUploadI } from "@/utils/interfaces";

interface Props {
  index: number   
  filesToUpload: FilesToUploadI
  setFilesToUpload: React.Dispatch<React.SetStateAction<FilesToUploadI>>
  triggerRename(state: boolean): void
  setErrorMsg:React.Dispatch<React.SetStateAction<string>>
  file: File
}

// the task of this component is to rename an specific file , the component check if the new name that is gonna be set for an specific file is not duplicated and its length has to be more than 4 characters
export const RenameInput = ({ setFilesToUpload, triggerRename, filesToUpload, index, file, setErrorMsg }: Props) => { 
  const [Input, setInput] = useState<string>("")


  // function to check a  duplicatedName in a file
  const checkDuplicatedNames = (filename: string) => {
    const duplicatedName = filesToUpload.files.some((file) => {
      if (file.name == filename) {
        return true
      }
      return false
    })
    return duplicatedName
  }


    //the renamefile function checks if the current filename which will be the input state  value  is already in the files to upload list  if it is false it will assing  the new name to the current file we get the file through the filetoModify constant and set the new files to upload list to the new array with the name of the file modified
  function renameFile(filename: string) {
    const fileToModify = filesToUpload.files[index]

    const isDuplicated = checkDuplicatedNames(filename)

    if (isDuplicated == false) {

      const fileUpdated = new File([fileToModify], filename, { type: fileToModify.type });

      const arrayModified = [...filesToUpload.files]
      arrayModified.splice(filesToUpload.files.indexOf(fileToModify), 1, fileUpdated)

      setFilesToUpload({ files: arrayModified, images: filesToUpload.images })
      triggerRename(false)
    } else {
      setErrorMsg("ya existe un archivo del mismo tipo con el mismo nombre")

    }
  }



  return (

    <div className=' flex flex-row justify-between hover:!bg-transparent'>
         {/* show the image of the file when the client is changing the filename */ }
      <div className="avatar">
        <div className="rounded w-[15vh] h-[8vw] flex-1">
          {file.type.includes("video") ? <video controls >
            <source src={filesToUpload.images[index]} type={file.type} />
          </video> : <img src={filesToUpload.images[index]} />}
        </div>
      </div>
    {/* set new name for the file input */ }
      <input type='text' className='flex-1  p-1 rounded' placeholder='nuevo nombre' minLength={3} maxLength={100} required onChange={(e) => {
        e.preventDefault()
        setInput(e.target.value)
      }} />



      <div className='flex gap-2'>
        {/* confirm name change */}

        <button className=' disabled:bg-gray-400 rounded-full shadow-lg bg-green-700 p-1 hover:bg-green-800' disabled={Input.length < 3} onClick={() => {

          renameFile(Input + "." + file.type.replace(/image|video|\//gi, ""))
         

        }}>
            {/* confirm name change button */}
          <svg width="17" data-testid="confirmar renombre" height="17" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.2426 16.3137L6 12.071L7.41421 10.6568L10.2426 13.4853L15.8995 7.8284L17.3137 9.24262L10.2426 16.3137Z" fill="currentColor" /><path fillRule="evenodd" clipRule="evenodd" d="M1 5C1 2.79086 2.79086 1 5 1H19C21.2091 1 23 2.79086 23 5V19C23 21.2091 21.2091 23 19 23H5C2.79086 23 1 21.2091 1 19V5ZM5 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3Z" fill="currentColor" /></svg>
        </button>
        {/* confirm name change */}

        {/* cancel file rename button */}

        <div className='rounded-full shadow-lg bg-rose-700 p-1 hover:bg-rose-800' onClick={() => {
          triggerRename(false)

        }}>
          <svg width="17" data-testid="cancelar renombramiento" height="17" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.3956 7.75734C16.7862 8.14786 16.7862 8.78103 16.3956 9.17155L13.4142 12.153L16.0896 14.8284C16.4802 15.2189 16.4802 15.8521 16.0896 16.2426C15.6991 16.6331 15.0659 16.6331 14.6754 16.2426L12 13.5672L9.32458 16.2426C8.93405 16.6331 8.30089 16.6331 7.91036 16.2426C7.51984 15.8521 7.51984 15.2189 7.91036 14.8284L10.5858 12.153L7.60436 9.17155C7.21383 8.78103 7.21383 8.14786 7.60436 7.75734C7.99488 7.36681 8.62805 7.36681 9.01857 7.75734L12 10.7388L14.9814 7.75734C15.372 7.36681 16.0051 7.36681 16.3956 7.75734Z" fill="currentColor" /><path fillRule="evenodd" clipRule="evenodd" d="M4 1C2.34315 1 1 2.34315 1 4V20C1 21.6569 2.34315 23 4 23H20C21.6569 23 23 21.6569 23 20V4C23 2.34315 21.6569 1 20 1H4ZM20 3H4C3.44772 3 3 3.44772 3 4V20C3 20.5523 3.44772 21 4 21H20C20.5523 21 21 20.5523 21 20V4C21 3.44772 20.5523 3 20 3Z" fill="currentColor" /></svg>
        </div>
       {/* cancel file rename button */}
      </div>



    </div>
  )
}
