import React from 'react'

interface PropsI{
    addFilesToTheList: (event: React.ChangeEvent<HTMLInputElement>) => Promise<void>
}

//component that adds the input value (image or video) to the list component, the list shows the files that are gonna be uploaded 
export const AddFilesInput = ({addFilesToTheList}:PropsI) => {
  return (
    <label id='file' className='cursor-pointer btn'>elegir imagen o video
    <input  onChange={addFilesToTheList} accept="image/*,audio/*,video/*" type="file" id='file' className="file-input w-full max-w-xs hidden" />
 
    </label>
  )
}
