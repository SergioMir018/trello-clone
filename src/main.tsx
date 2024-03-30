import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import Board from './components/Board.tsx'

const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/board/:boardId',
        element: <Board />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
    <RouterProvider router={router} />
)
