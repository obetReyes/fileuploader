import { renderWithClient } from './utils';
import App from '../src/App';
import userEvent from '@testing-library/user-event'
import { images } from './seed';
import { waitFor } from '@testing-library/react';
import { server } from './setup';


describe('App init state', () => {
  it("check if the list where all the files upload are showed exists", async() => {
    const app = renderWithClient(<App />)
    expect(await app.findByText(/imagenes y videos/i)).
    toBeInTheDocument()
    expect(await app.findByText(/aun no has agregado ningun archivo/i)).toBeInTheDocument()
  })
  it("check if input to upload files exists", async() => {
    const app = renderWithClient(<App />)
    expect(await app.findByLabelText(/elegir imagen o video/i)).toBeInTheDocument()
  })

  it("if there are no files uploaded, the button agregar evidencia should be disabled", async() => {
    const app = renderWithClient(<App />)
    const submitButton = await app.findByText(/agregar evidencia/i)
    expect(submitButton).toBeDisabled()
  })

  it("upload a file", async() => {
    userEvent.setup()
    
    const file = new File(['test'], 'test.png', {type: 'image/png'})
    const app = renderWithClient(<App />)
    const input = await app.findByLabelText(/elegir imagen o video/i) as HTMLInputElement; // Explicitly cast to HTMLInputElement

    await userEvent.upload(input, file);
  
    expect(input.files![0]).toBe(file);
    expect(input.files!.item(0)).toBe(file);
    expect(input.files).toHaveLength(1);
  })

  
  it("upload multiple files, also check if the file is added to the list", async () => {
     userEvent.setup();
    const app = renderWithClient(<App />);
    const input = await app.findByLabelText(/elegir imagen o video/i) as HTMLInputElement; // Explicitly cast to HTMLInputElement
  
    for (const image of images) {
      const file = new File([image.blobPart], image.filename, { type: image.type });
      await userEvent.upload(input, file);
      await waitFor(() => {
        expect(app.getByText(image.filename)).toBeInTheDocument();
      });
    }
  });
 
    it("check if file in the list can be renamed", async() => {
       userEvent.setup()
    
      const file = new File(['test'], 'test.png', {type: 'image/png'})
      const app = renderWithClient(<App />)
      const input = await app.findByLabelText(/elegir imagen o video/i) as HTMLInputElement; // Explicitly cast to HTMLInputElement
  
      await userEvent.upload(input, file);
      
      const renameBtn =  app.getByTestId(/renombrar archivo/i)
      await userEvent.click(renameBtn);

      
      const renameInput = app.getByPlaceholderText(/nuevo nombre/i)

      await userEvent.type(renameInput, "testImageRenamed")
      
      const submitNewNameBtn = app.getByTestId(/confirmar renombre/i)
      await userEvent.click(submitNewNameBtn)
      expect(await app.findByText(/testImageRenamed/i)).toBeInTheDocument();
    })

    it("check if the file rename can be cancelled and what happens to the renombrar archivo button if the ", async() => {
     userEvent.setup()
    
      const file = new File(['test'], 'test.png', {type: 'image/png'})
      const app = renderWithClient(<App />)
      const input = await app.findByLabelText(/elegir imagen o video/i) as HTMLInputElement; // Explicitly cast to HTMLInputElement
  
      await userEvent.upload(input, file);
      
      const renameBtn =  app.getByTestId(/renombrar archivo/i)
      await userEvent.click(renameBtn);

      
      const renameInput = app.getByPlaceholderText(/nuevo nombre/i)

      await userEvent.type(renameInput, "testImageRenamed")
      
      const submitNewNameBtn = app.getByTestId(/confirmar renombre/i)
      await userEvent.click(submitNewNameBtn)
      expect(await app.findByText(/testImageRenamed/i)).toBeInTheDocument();
    })

  
    it("check if file in the list can be removed", async() => {
    userEvent.setup()
    
      const file = new File(['test'], 'test.png', {type: 'image/png'})
      const app = renderWithClient(<App />)
      const input = await app.findByLabelText(/elegir imagen o video/i) as HTMLInputElement; // Explicitly cast to HTMLInputElement
  
      await userEvent.upload(input, file);
    
      expect(await app.findByText("test.png")).toBeInTheDocument();
      const deleteFileBtn =  app.getByTestId(/remover archivo/i)
      await userEvent.click(deleteFileBtn);

  
      expect(app.queryByText("test.png")).not.toBeInTheDocument();

    })

 
    it("if there is a file or there are files in the list and they are submited, a div showing  a progress  bar and a text should be in the dom also an error message because the server is not running and the files should not be removed from the dom", async() => {
       userEvent.setup()
    
      const file = new File(['test'], 'test.png', {type: 'image/png'})
      const app = renderWithClient(<App />)
      const input = await app.findByLabelText(/elegir imagen o video/i) as HTMLInputElement; // Explicitly cast to HTMLInputElement
  

      await userEvent.upload(input, file);
      const submitBtn = app.getByText(/agregar evidencia/i)
      await userEvent.click(submitBtn)
      
     waitFor(() => {
        expect(app.queryByText(/agregar evidencia/i)).not.toBeInTheDocument(); //the submitBtn should not be there because the files are being uploaded and a loading spinner will appear
      })

       waitFor(() => {
        expect(app.getByTestId(/subiendo archivos/i)).toBeInTheDocument()
      })
    

      waitFor(() => {
        expect(app.getByText(/no se pudo establecer conexion con el servidor/i)).toBeInTheDocument()
      })
    })


    it("if the files are sucessfully upload the list should not appear in the dom also and there should not be an error alert, just a message that where they notify the user that the files were uploaded ", async() => {
      server.listen()

     userEvent.setup()
    
      const file = new File(['test'], 'test.png', {type: 'image/png'})
      const app = renderWithClient(<App />)
      const input = await app.findByLabelText(/elegir imagen o video/i) as HTMLInputElement; // Explicitly cast to HTMLInputElement
  

      await userEvent.upload(input, file);
      const submitBtn = app.getByText(/agregar evidencia/i)
      await userEvent.click(submitBtn)

      waitFor(() => {
        expect(app.getByTestId(/subiendo archivos/i)).toBeInTheDocument()
      })
    

      waitFor(() => {
        expect(app.getByText(/los archivos se han agregado correctamente!/i)).toBeInTheDocument()
      })

      await waitFor(() => {
        expect(app.queryByText(/no se pudo establecer conexion con el servidor/i)).not.toBeInTheDocument(); //the submitBtn should not be there because the files are being uploaded and a loading spinner will appear
      })
    })
    server.close()
  });
