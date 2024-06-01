import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import Login from "./pages/Login"
import ProtectedRoute from "../components/ProtectedRoute"


function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <ProtectedRoute>  <Dashboard /> </ProtectedRoute>
    },
    {
      path: "/login",
      element: <Login onClose={() => { }} />
    }
  ])
  return <RouterProvider router={router} />

}

export default App
