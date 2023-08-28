import { rest } from 'msw'




export const handlers = [
  // Match a GET request to a third-party server.
  rest.post('http://localhost:3000/files', (req, res, ctx) => {
    // Simulate the server's response for file upload
    return res(ctx.json({ message: 'File upload successful' }));
  }),
]


