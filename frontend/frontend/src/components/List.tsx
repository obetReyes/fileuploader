import { FilesToUploadI } from '@/utils/interfaces'
import { FileComponent } from './FileComponent'


interface Props {
  filesToUpload: FilesToUploadI
  setFilesToUpload: React.Dispatch<React.SetStateAction<FilesToUploadI>>
  setErrorMsg:React.Dispatch<React.SetStateAction<string>>
}



//shows the files in a list that are gonna be uploaded
export const List = ({ filesToUpload, setFilesToUpload,setErrorMsg}: Props) => {
 
  return (
    <ul className="menu bg-base-200 w-8/12 h-[25rem] rounded-box overflow-y-auto ">
      <div>
        <h2 className="menu-title">imagenes y videos</h2>

        {filesToUpload.files.length === 0 ? <ul> <li className='flex'><a>aun no has agregado ningun archivo</a></li> </ul> :
          <ul>
            {filesToUpload.files.map((file, index) => {
                console.log(file.name)
                return (
                  <li key={file.name}>
                              
                      <FileComponent 
                     setErrorMsg={setErrorMsg}
                      filesToUpload={filesToUpload}
                      index={index} 
                      setFilesToUpload={setFilesToUpload} 
                      file={file}
  
                      />
                  </li>
                )
            })}
             </ul>}

      </div>
    </ul>
  )
}
