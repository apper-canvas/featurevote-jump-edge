import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from 'react-redux'
import { RouterProvider } from "react-router-dom"
import { ToastContainer } from 'react-toastify'
import { router } from "@/router/index"
import { store } from "@/store/store"
import "./index.css"

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
    <ToastContainer
      position="top-right"
      autoClose={4000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
  </Provider>
)