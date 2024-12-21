import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useAuth, UserButton, SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/clerk-react";


const Navbar = () => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const { isSignedIn } = useAuth();

  // Define navItems with section IDs
  const navItems = [
    { label: "Home", href: "#home" },
    { label: "About Us", href: "#about-us" },
    { label: "Features", href: "#features" },
    { label: "Contact Us", href: "#contact-us" },
  ];

  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  // Smooth scroll function
  const handleScroll = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileDrawerOpen(false); // Close mobile menu after selection
    }
  };

  return (
    <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-neutral-300 bg-gray-100">
      <div className="container px-4 mx-auto relative lg:text-lg"> {/* Increased font size */}
        <div className="flex justify-between items-center">
          {/* Logo and Branding */}
          <div className="flex items-center flex-shrink-0">
            <img
              className="h-12 w-12 mr-2 rounded-full border-2 border-orange-500" // Increased logo size
              src={'/logo.png'}
              alt="Logo"
            />
            <span className="text-2xl font-semibold tracking-tight text-orange-500">DishCovery</span> {/* Increased font size */}
          </div>

          {/* Navigation Links */}
          <ul className="hidden lg:flex ml-14 space-x-12">
            {navItems.map((item, index) => (
              <li key={index}>
                <button
                  onClick={() => handleScroll(item.href)}
                  className="text-xl text-gray-800 hover:text-orange-500 transition" // Increased font size for nav items
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Auth Buttons or User Button */}
          <div className="hidden lg:flex justify-center space-x-12 items-center">
            <SignedOut>
              {/* Log In and Sign Up buttons as Clerk pop-ups */}
              <SignInButton mode="modal">
                <button className="py-3 px-4 border border-gray-300 rounded-md text-lg text-gray-800 hover:bg-gray-200 transition"> {/* Increased font size */}
                  Log In
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="bg-gradient-to-r from-yellow-400 to-orange-500 py-3 px-4 text-lg rounded-md text-white hover:from-yellow-500 hover:to-orange-600 transition"> {/* Increased font size */}
                  Sign up
                </button>
              </SignUpButton>
            </SignedOut>

            <SignedIn>
              {/* User Button when signed in */}
              <UserButton />
            </SignedIn>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden md:flex flex-col justify-end">
            <button onClick={toggleNavbar}>
              {mobileDrawerOpen ? (
                <X className="text-gray-800 text-xl" /> 
              ) : (
                <Menu className="text-gray-800 text-xl" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileDrawerOpen && (
          <div className="fixed right-0 z-20 bg-white/90 border border-neutral-300 shadow-lg w-full p-8 flex flex-col justify-center items-center lg:hidden">
            <ul>
              {navItems.map((item, index) => (
                <li key={index} className="py-4">
                  <button
                    onClick={() => handleScroll(item.href)}
                    className="text-xl text-gray-800 hover:text-orange-500 transition" // Increased font size for mobile menu items
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
            <div className="flex space-x-6 mt-4">
              <SignedOut>
                {/* Mobile Log In and Sign Up as Clerk pop-ups */}
                <SignInButton mode="modal">
                  <button className="py-3 px-4 border border-gray-300 rounded-md text-lg text-gray-800 hover:bg-gray-200 transition"> {/* Increased font size */}
                    Log In
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="py-3 px-4 text-lg rounded-md bg-gradient-to-r from-yellow-400 to-orange-500 text-white hover:from-yellow-500 hover:to-orange-600 transition"> {/* Increased font size */}
                    Sign up
                  </button>
                </SignUpButton>
              </SignedOut>

              <SignedIn>
                {/* User button in mobile view */}
                <UserButton />
              </SignedIn>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
