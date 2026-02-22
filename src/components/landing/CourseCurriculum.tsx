import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Lock, X, Send, Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast"; // Agar aap shadcn toast use kar rahe hain

const VIDEO_DATA = [
    { id: 1, title: "Introduction to React", duration: "10:30", thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=800", url: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
    { id: 2, title: "Setting up your Environment", duration: "05:45", thumbnail: "https://images.unsplash.com/photo-1547082299-de196ea013d6?q=80&w=800", url: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
    { id: 3, title: "Advanced Hooks & Patterns", duration: "15:20", thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800", url: "#" },
    { id: 4, title: "State Management with Redux", duration: "22:10", thumbnail: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800", url: "#" },
    { id: 5, title: "Backend Integration", duration: "22:10", thumbnail: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800", url: "#" },
    { id: 6, title: "Final Deployment", duration: "22:10", thumbnail: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800", url: "#" },
];

export const CourseCurriculum = () => {
    const { toast } = useToast();
    const [showForm, setShowForm] = useState(false);
    const [playingVideo, setPlayingVideo] = useState<string | null>(null);
    const [isRegistered, setIsRegistered] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
    });

    // Check if user is already registered in this session
    useEffect(() => {
        const userKey = localStorage.getItem("userEnquiryDone");
        if (userKey) setIsRegistered(true);
    }, []);

    const handleVideoClick = (videoUrl: string, index: number) => {
        if (index > 1) return; // Locked videos

        if (isRegistered) {
            setPlayingVideo(videoUrl);
        } else {
            setShowForm(true);
        }
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    access_key: "cf782a6f-31f0-4001-903f-30c591df8615", // Your Key
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    subject: "Student Watch Demo Video - GoForCode",
                    from_name: "GoForCode App"
                }),
            });

            const result = await response.json();

            if (result.success) {
                // Update States
                localStorage.setItem("userEnquiryDone", "true");
                setIsRegistered(true);
                setShowForm(false);
                
                // Clear Form
                setFormData({ name: "", email: "", phone: "" });

                toast({
                    title: "Access Granted! 🎉",
                    description: "Introductory lessons are now unlocked.",
                });
            } else {
                toast({
                    variant: "destructive",
                    title: "Submission Failed ❌",
                    description: "Please try again later.",
                });
            }
        } catch (error) {
            console.error(error);
            toast({
                variant: "destructive",
                title: "Server Error ❌",
                description: "Something went wrong.",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="course" className="py-20 bg-[#030712] text-white min-h-screen">
            <div className="max-w-6xl mx-auto px-4">
                <div className="mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-2 tracking-tight">
                        Course <span className="text-[#4489F6]">Curriculum</span>
                    </h2>
                    <p className="text-gray-400">Unlock first 2 lessons for free by sharing your contact info.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {VIDEO_DATA.map((video, index) => {
                        const isLocked = index > 1;
                        return (
                            <motion.div
                                key={video.id}
                                whileHover={!isLocked ? { y: -5 } : {}}
                                className={`relative group rounded-2xl overflow-hidden border transition-all ${
                                    isLocked ? "border-white/5 bg-white/5 opacity-60" : "border-white/10 bg-white/5 cursor-pointer hover:border-[#4489F6]/50"
                                }`}
                                onClick={() => handleVideoClick(video.url, index)}
                            >
                                <div className="relative aspect-video">
                                    <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
                                    <div className={`absolute inset-0 flex items-center justify-center ${isLocked ? "bg-black/60" : "bg-black/20 group-hover:bg-black/40"}`}>
                                        {isLocked ? <Lock className="text-yellow-500 w-8 h-8" /> : <Play className="text-white w-10 h-10 fill-current" />}
                                    </div>
                                </div>
                                <div className="p-4 flex justify-between items-center">
                                    <span className="text-sm font-medium">{video.title}</span>
                                    {!isLocked && <span className="text-[10px] text-green-400 bg-green-400/10 px-2 py-1 rounded">FREE</span>}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* --- ENQUIRY FORM MODAL --- */}
            <AnimatePresence>
                {showForm && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                            onClick={() => !isSubmitting && setShowForm(false)}
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
                            className="relative w-full max-w-md bg-[#111827] border border-white/10 rounded-3xl p-8 shadow-2xl"
                        >
                            <button onClick={() => setShowForm(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white" disabled={isSubmitting}>
                                <X className="w-5 h-5" />
                            </button>
                            <h3 className="text-2xl font-bold mb-2 text-center">Unlock Free Lessons</h3>
                            <p className="text-gray-400 text-sm mb-6 text-center">Fill in your details to start watching immediately.</p>

                            <form onSubmit={handleFormSubmit} className="space-y-4">
                                <div>
                                    <label className="text-xs font-semibold text-gray-400 uppercase">Full Name</label>
                                    <input 
                                        required 
                                        type="text" 
                                        value={formData.name}
                                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 mt-1 focus:border-[#4489F6] outline-none transition-all" 
                                        placeholder="John Doe" 
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-gray-400 uppercase">Email Address</label>
                                    <input 
                                        required 
                                        type="email" 
                                        value={formData.email}
                                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 mt-1 focus:border-[#4489F6] outline-none transition-all" 
                                        placeholder="john@example.com" 
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-gray-400 uppercase">Phone Number</label>
                                    <input 
                                        required 
                                        type="tel" 
                                        maxLength={10}
                                        value={formData.phone}
                                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 mt-1 focus:border-[#4489F6] outline-none transition-all" 
                                        placeholder="+91 98765 43210" 
                                    />
                                </div>
                                <Button 
                                    type="submit" 
                                    disabled={isSubmitting}
                                    className="w-full bg-[#4489F6] hover:bg-blue-600 h-12 rounded-xl mt-4 gap-2 font-bold"
                                >
                                    {isSubmitting ? <Loader2 className="animate-spin w-5 h-5" /> : "Unlock Now"}
                                    {!isSubmitting && <Send className="w-4 h-4" />}
                                </Button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* --- VIDEO PLAYER MODAL --- */}
            <AnimatePresence>
                {playingVideo && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4">
                        <button onClick={() => setPlayingVideo(null)} className="absolute top-6 right-6 text-white bg-white/10 p-2 rounded-full hover:bg-white/20">
                            <X className="w-6 h-6" />
                        </button>
                        <div className="w-full max-w-4xl aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-black">
                            <iframe 
                                src={`${playingVideo}?autoplay=1`} 
                                className="w-full h-full" 
                                allowFullScreen 
                                allow="autoplay; encrypted-media" 
                            />
                        </div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
};