import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "@/components/organisms/Header";

function Layout() {
  // App-level state and methods can be defined here
  // and passed to child routes via useOutletContext if needed
  const contextValue = {};

  return (
    <div className="min-h-screen bg-surface-50">
      <Header />
      
      <main>
        <Outlet context={contextValue} />
      </main>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{ zIndex: 9999 }}
      />
    </div>
  );
}

export default Layout;