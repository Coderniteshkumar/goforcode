import { useState, useEffect, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  Menu, Rocket, X, LogIn, Mail, Lock, 
  Loader2, Eye, EyeOff 
} from "lucide-react";

interface NavbarProps {
  onLoginSuccess?: (userData: any) => void; 
}

const Navbar = ({ onLoginSuccess }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  
  // --- Form States ---
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Password toggle state
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  //  login api
  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email: email, password: password }),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('user',data.user)
        localStorage.setItem('token',data.token)
        if (onLoginSuccess) {
          onLoginSuccess(data);
        }
        setIsLoading(false);
        setIsLoginOpen(false);
      } else {
        throw new Error("Invalid credentials");
      }
    } catch {
      setError("Login failed. Please check your details.");
      setIsLoading(false);
    }
  };

  const navLinks = [
    { label: "About", href: "#" },
    { label: "Curriculum", href: "#curriculum" },
    { label: "Features", href: "#features" },
    { label: "Enquire Now", href: "#contact" },
    { label: "Course", href: "/course" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-300 ${
          isScrolled 
            ? "bg-background/80 backdrop-blur-xl border-b border-border/50 py-2 shadow-sm" 
            : "bg-transparent py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo */}
            <a href="/" className="flex items-center gap-2 group shrink-0">
              <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center transition-transform group-hover:rotate-12">
                <Rocket className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-xl sm:text-2xl font-display font-bold tracking-tight">
                <span style={{ color: "#4489F6" }}>GoFor</span>Code
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1 lg:gap-8">
              {navLinks.map((link, index) => (
                <a 
                  key={index} 
                  href={link.href} 
                  className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-[#4489F6] transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:block">
                <Button
                  variant="outline"
                  onClick={() => setIsLoginOpen(true)}
                  className="border-[#4489F6] text-[#4489F6] hover:bg-[#4489F6] hover:text-white transition-all gap-2"
                >
                  <LogIn className="w-4 h-4" />
                  <span className="hidden lg:inline">Login</span>
                  <span className="lg:hidden">Login</span>
                </Button>
              </div>

              {/* Mobile Menu Button */}
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
                className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors text-foreground"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* --- MOBILE SIDEBAR --- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[70] md:hidden"
            />
            <motion.div
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-[280px] bg-background z-[80] md:hidden shadow-2xl p-6 border-l border-border"
            >
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-center mb-8">
                  <span className="font-bold text-[#4489F6]">Navigation</span>
                  <X className="w-6 h-6 cursor-pointer" onClick={() => setIsMobileMenuOpen(false)} />
                </div>
                <div className="flex flex-col gap-4">
                  {navLinks.map((link, idx) => (
                    <a key={idx} href={link.href} onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium hover:text-[#4489F6] border-b border-border/50 pb-2">
                      {link.label}
                    </a>
                  ))}
                  <Button 
                    onClick={() => { setIsMobileMenuOpen(false); setIsLoginOpen(true); }} 
                    className="mt-4 w-full bg-[#4489F6] text-white gap-2 h-12"
                  >
                    <LogIn className="w-5 h-5" /> Login
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* --- LOGIN MODAL --- */}
      <AnimatePresence>
        {isLoginOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => !isLoading && setIsLoginOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }} 
              animate={{ scale: 1, opacity: 1, y: 0 }} 
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-md bg-background border border-border p-6 sm:p-8 rounded-3xl shadow-2xl"
            >
              <button 
                onClick={() => setIsLoginOpen(false)}
                className="absolute top-5 right-5 p-2 hover:bg-muted rounded-full transition-colors"
                disabled={isLoading}
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center mb-8">
                <div className="w-12 h-12 bg-[#4489F6]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-6 h-6 text-[#4489F6]" />
                </div>
                <h2 className="text-2xl font-bold">Welcome Back</h2>
                <p className="text-muted-foreground text-sm mt-1">Please enter your details to Login</p>
              </div>

              <form className="space-y-5" onSubmit={handleLogin}>
                {error && <div className="text-red-500 text-sm bg-red-500/10 p-3 rounded-xl border border-red-500/20">{error}</div>}
                
                <div className="space-y-2">
                  <label className="text-sm font-semibold ml-1">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3.5 w-5 h-5 text-muted-foreground/60" />
                    <input 
                      required type="email" value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alex@example.com" 
                      className="w-full bg-muted/40 border border-border rounded-xl py-3.5 pl-11 pr-4 outline-none focus:ring-2 focus:ring-[#4489F6]/50 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold ml-1">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-3.5 w-5 h-5 text-muted-foreground/60" />
                    <input 
                      required 
                      type={showPassword ? "text" : "password"} // Dynamic type
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••" 
                      className="w-full bg-muted/40 border border-border rounded-xl py-3.5 pl-11 pr-12 outline-none focus:ring-2 focus:ring-[#4489F6]/50 transition-all"
                    />
                    {/* Password Toggle Button */}
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-3.5 p-1 text-muted-foreground/60 hover:text-[#4489F6] transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <Button 
                  disabled={isLoading}
                  type="submit" 
                  className="w-full bg-[#4489F6] hover:bg-[#3574d3] text-white py-7 rounded-xl text-lg font-semibold shadow-lg shadow-[#4489F6]/20 transition-all"
                >
                  {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : "Login"}
                </Button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;