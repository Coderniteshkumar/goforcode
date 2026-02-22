import { useState, useEffect, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, Rocket, X, LogIn, Mail, Lock, Loader2 } from "lucide-react";

interface NavbarProps {
  onLoginSuccess?: (userData: any) => void; 
}

const Navbar = ({ onLoginSuccess }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  
  // --- Form & API States ---
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // --- Demo API Logic ---
  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Demo API Call (JSONPlaceholder ka use kar rahe hain)
      const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        body: JSON.stringify({
          username: email,
          password: password,
        }),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Login Success:", data);
        // Simulate a small delay for realistic feel
        setTimeout(() => {
          setIsLoading(false);
          setIsLoginOpen(false);
          onLoginSuccess?.(data);
          alert("Login Successful! (Demo)");
        }, 1500);
      } else {
        throw new Error("Invalid credentials");
      }
    } catch {
      setError("Something went wrong. Please try again.");
      setIsLoading(false);
    }
  };

  const navLinks = [
    { label: "About", href: "#" },
    { label: "Curriculum", href: "#curriculum" },
    { label: "Features", href: "#features" },
    { label: "Contact", href: "#contact" },
    { label: "Course", href: "/course" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-background/80 backdrop-blur-xl border-b border-border/50 py-3" : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg gradient-bg flex items-center justify-center">
              <Rocket className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-2xl font-display font-bold">
              <span style={{ color: "#4489F6" }}>GoFor</span>Code
            </span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, index) => (
              <a key={index} href={link.href} className="text-sm text-muted-foreground hover:text-foreground">
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden md:block">
            <Button
              variant="outline"
              onClick={() => setIsLoginOpen(true)}
              className="border-[#4489F6] text-[#4489F6] hover:bg-[#4489F6] hover:text-white gap-2"
            >
              <LogIn className="w-4 h-4" /> Login
            </Button>
          </div>

          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden p-2 text-foreground">
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.nav>

      {/* --- LOGIN MODAL WITH API LOGIC --- */}
      <AnimatePresence>
        {isLoginOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => !isLoading && setIsLoginOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-md bg-background border border-border p-8 rounded-2xl shadow-2xl"
            >
              <button 
                onClick={() => setIsLoginOpen(false)}
                className="absolute top-4 right-4 p-1 hover:bg-muted rounded-full"
                disabled={isLoading}
              >
                <X className="w-5 h-5" />
              </button>

              <h2 className="text-2xl font-bold mb-6">Welcome Back</h2>

              <form className="space-y-4" onSubmit={handleLogin}>
                {error && <p className="text-red-500 text-sm bg-red-500/10 p-2 rounded">{error}</p>}
                
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <input 
                      required
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com" 
                      className="w-full bg-muted/50 border border-border rounded-lg py-2.5 pl-10 pr-4 outline-none focus:ring-2 focus:ring-[#4489F6]/50 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-1.5 block">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <input 
                      required
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••" 
                      className="w-full bg-muted/50 border border-border rounded-lg py-2.5 pl-10 pr-4 outline-none focus:ring-2 focus:ring-[#4489F6]/50 transition-all"
                    />
                  </div>
                </div>

                <Button 
                  disabled={isLoading}
                  type="submit" 
                  className="w-full bg-[#4489F6] hover:bg-[#3574d3] text-white py-6 mt-2"
                >
                  {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Sign In"}
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