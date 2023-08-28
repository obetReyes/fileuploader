import { Alert } from './components/Alert';
import { List } from './components/List'
import { useEffect, useState } from 'react'
import axios, { AxiosError } from 'axios';
import { FilesToUploadI } from './utils/interfaces';
import {  useMutation } from '@tanstack/react-query';
import { AddFilesInput } from './components/AddFilesInput';


/* components wrapper
include:
-app states (files, and progress bar, errors)
-check duplicated files function (to avoid duplicated file uploads)
- addFilestotheist function  (function to add files to the list component that shows the files in the list that are gonna be uploaded)
-upload files function tries to upload the files to the server and handle the errors, loading, using react query

*/
function App() {
  const [progress, setProgress] = useState<number | boolean>(false)
  const [errorMsg, setErrorMsg] = useState<string>("")
  const [filesToUpload, setFilesToUpload] = useState<FilesToUploadI>({
    files: [],
    images: []
  })



  function checkDuplicatedFiles(selectedFile: File) {

    const checkDuplicates = [...filesToUpload.files].some((file) => { //check if the file that is trying to be uploaded is already in the array

      if (file.name === selectedFile.name) {
        return true
      }
    })
    if (checkDuplicates === true) {

      setFilesToUpload({ files: [...filesToUpload.files], images: [...filesToUpload.images] })
    }
    if (checkDuplicates === false) {

      setFilesToUpload({ files: [...filesToUpload.files, selectedFile], images: [...filesToUpload.images, URL.createObjectURL(selectedFile!)] })

    }

  }


  async function apiCall(files: any[]): Promise<string> {
    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append(`files[${index}]`, file); // Usa la misma clave 'files' con índice
    });
    const response = await axios.post('http://localhost:3000/files', formData, {
      onUploadProgress: function (progressEvent) {

        let percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total!
        );
        setProgress(percentCompleted);
      }
    });
    return response.data
  }


  const { mutate, isLoading, isSuccess, reset, isError, error } = useMutation<string, AxiosError, any[]>(apiCall);

  async function addFilesToTheList(event: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = event.target?.files?.[0]

    if (selectedFile) {
      checkDuplicatedFiles(selectedFile)
    }
  }


  async function uploadFiles(files: FilesToUploadI) {
    mutate(files.files, {
      onSuccess: () => {

        setFilesToUpload({ files: [], images: [] })

        setProgress(0)

        setTimeout(() => {
          reset()
        }, 800);
      },
      onError: (error: any) => {
        if (axios.isAxiosError<Record<string, unknown>>(error)) {
          error.message = String(error.message);
      
          setProgress(0)          // Do something with this error...
        }
        if (error.code == "ERR_NETWORK") {
          setErrorMsg("no se pudo establecer conexion con el servidor");
        }
        if (error.message == "Request failed with status code 422") {
          setErrorMsg("necesitas agregar imagenes o videos a la evidencia")
        }

        return error;

      },

    })
  }


  useEffect(() => {
    setTimeout(() => {
      setErrorMsg("")
    }, 800);
   
  }, [errorMsg])




  return (
    <div className='flex  flex-col items-center justify-center gap-20 w-12/12 h-[90vh]'>
      <List filesToUpload={filesToUpload} setFilesToUpload={setFilesToUpload} setErrorMsg={setErrorMsg} />

      <div className='flex flex-col items-center gap-4 justify-center'>
        <AddFilesInput addFilesToTheList={addFilesToTheList} />


        {isLoading ? <span className="loading loading-spinner loading-md"></span> : <button className='btn btn-warning' onClick={() => uploadFiles(filesToUpload)} disabled={filesToUpload.files.length < 1}>agregar evidencia</button>}


        {progress ? <div data-testid="subiendo archivos">
          subiendo archivos % {progress}  <progress className="progress w-56" value={progress as number} max="100"></progress></div> : null}

        

        {errorMsg.length > 0 && isError  ?  <Alert error={ !errorMsg  ? "ocurrio un error" + error.message :errorMsg} />  : null}
      </div>

    </div>
  )
}

export default App
