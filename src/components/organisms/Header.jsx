import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAuth } from "@/layouts/Root";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isAuthenticated } = useSelector(state => state.user);
  const { logout } = useAuth();

  const navigation = [
    { name: "Board", path: "/" },
    { name: "Submit Idea", path: "/submit" },
    { name: "Roadmap", path: "/roadmap" }
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

const handleNavigation = (path) => {
    if (path === "/submit" && !isAuthenticated) {
      // Redirect to login with return path
      navigate(`/login?redirect=${encodeURIComponent(path)}`);
    } else {
      navigate(path);
    }
    setIsMobileMenuOpen(false);
  };

  const handleLogout = async () => {
    await logout();
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-white border-b border-surface-200 sticky top-0 z-40 backdrop-blur-sm bg-white/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <button
              onClick={() => navigate("/")}
              className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                <ApperIcon name="Lightbulb" className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                  FeatureVote
                </h1>
                <p className="text-xs text-surface-500 -mt-0.5">Product Feedback</p>
              </div>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  location.pathname === item.path
                    ? "bg-primary-50 text-primary-700 border border-primary-200"
                    : "text-surface-600 hover:text-surface-900 hover:bg-surface-50"
                }`}
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Desktop CTA & User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
onClick={() => handleNavigation("/submit")}
              size="md"
              className="shadow-sm"
            >
              <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
              Submit Idea
            </Button>
            
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <span className="text-sm text-surface-600">
                  {user?.firstName || user?.name || 'User'}
                </span>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  size="md"
                >
                  <ApperIcon name="LogOut" className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <Button
                onClick={() => navigate("/login")}
                variant="outline"
                size="md"
              >
                <ApperIcon name="LogIn" className="w-4 h-4 mr-2" />
                Login
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 text-surface-600 hover:text-surface-900 hover:bg-surface-50 rounded-lg transition-colors"
          >
            <ApperIcon name={isMobileMenuOpen ? "X" : "Menu"} className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-surface-200 bg-white"
          >
            <div className="px-4 py-4 space-y-2">
              {navigation.map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className={`block w-full text-left px-4 py-3 text-base font-medium rounded-lg transition-all duration-200 ${
                    location.pathname === item.path
                      ? "bg-primary-50 text-primary-700 border border-primary-200"
                      : "text-surface-600 hover:text-surface-900 hover:bg-surface-50"
                  }`}
                >
                  {item.name}
                </button>
              ))}
              
              <div className="pt-4 border-t border-surface-200 space-y-2">
                <Button
                  onClick={() => handleNavigation("/submit")}
                  size="lg"
                  className="w-full justify-center"
                >
                  <ApperIcon name="Plus" className="w-5 h-5 mr-2" />
                  Submit New Idea
                </Button>
                
                {isAuthenticated ? (
                  <div className="space-y-2">
                    <div className="px-4 py-2 text-sm text-surface-600 text-center">
                      {user?.firstName || user?.name || 'User'}
                    </div>
                    <Button
                      onClick={handleLogout}
                      variant="outline"
                      size="lg"
                      className="w-full justify-center"
                    >
                      <ApperIcon name="LogOut" className="w-5 h-5 mr-2" />
                      Logout
                    </Button>
                  </div>
                ) : (
                  <Button
                    onClick={() => handleNavigation("/login")}
                    variant="outline"
                    size="lg"
                    className="w-full justify-center"
                  >
                    <ApperIcon name="LogIn" className="w-5 h-5 mr-2" />
                    Login
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile FAB */}
      <div className="md:hidden fixed bottom-6 right-6 z-50">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
onClick={() => handleNavigation("/submit")}
          className="w-14 h-14 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-full shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center"
        >
          <ApperIcon name="Plus" className="w-6 h-6" />
        </motion.button>
      </div>
    </header>
  );
};

export default Header;