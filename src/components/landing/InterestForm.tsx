import { useState, forwardRef } from "react";
import { motion } from "framer-motion";
import { Send, User, Mail, Phone, BookOpen, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().trim().email("Please enter a valid email"),
  phone: z.string().trim().min(10, "Please enter a valid phone number").max(13),  
  courseInterest: z.string().min(1, "Please select a course"),
});

type FormData = z.infer<typeof formSchema>;

const InterestForm = forwardRef<HTMLDivElement>((_, ref) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    courseInterest: "",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    try {
      formSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Partial<FormData> = {};
        error.errors.forEach((err) => {
          const path = err.path[0] as keyof FormData;
          newErrors[path] = err.message;
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    toast({
      title: "Interest Submitted! 🎉",
      description: "We'll contact you shortly with more details.",
    });
  };

  if (isSubmitted) {
    return (
      <section  ref={ref}  className="py-24 px-4 relative">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card rounded-3xl p-12 text-center"
          >
            <div className="w-20 h-20 rounded-full gradient-bg flex items-center justify-center mx-auto mb-6 glow-primary">
              <CheckCircle className="w-10 h-10 text-primary-foreground" />
            </div>
            <h3 className="text-3xl font-display font-bold mb-4">
              You're In! 🚀
            </h3>
            <p className="text-muted-foreground mb-6">
              Thank you for your interest in GoForCode! Our team will reach out 
              to you within 24 hours with all the details.
            </p>
            <p className="text-sm text-muted-foreground">
              Check your email at <strong className="text-foreground">{formData.email}</strong>
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section  ref={ref} id="contact" className="py-24 px-4 relative">
      {/* Background Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full blur-3xl opacity-10"
             style={{ background: 'hsl(var(--primary))' }} />
      </div>

      <div className="max-w-2xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <span className="inline-block px-4 py-1 rounded-full text-sm font-medium gradient-bg text-primary-foreground mb-4">
            Limited Seats
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-4">
            Ready to <span className="gradient-text">Start?</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Fill in your details and we'll get back to you within 24 hours.
          </p>
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="glass-card rounded-3xl p-8 md:p-10"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium flex items-center gap-2">
                <User className="w-4 h-4 text-primary" />
                Full Name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className={`h-12 bg-secondary/50 border-border/50 focus:border-primary ${errors.name ? 'border-destructive' : ''}`}
              />
              {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className={`h-12 bg-secondary/50 border-border/50 focus:border-primary ${errors.email ? 'border-destructive' : ''}`}
              />
              {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
            </div>

            {/* Phone Field */}
            { <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-medium flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                Mobile Number
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+91 98765 43210"
                minLength={10}
                maxLength={13}
                
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className={`h-12 bg-secondary/50 border-border/50 focus:border-primary ${errors.phone ? 'border-destructive' : ''}`}
              />
              {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
            </div> }
           


            {/* Course Interest Field */}
            <div className="space-y-2">
              <Label htmlFor="course" className="text-sm font-medium flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-primary" />
                Course Interest
              </Label>
              <Select
                value={formData.courseInterest}
                onValueChange={(value) => handleInputChange("courseInterest", value)}
              >
                <SelectTrigger className={`h-12 bg-secondary/50 border-border/50 focus:border-primary ${errors.courseInterest ? 'border-destructive' : ''}`}>
                  <SelectValue placeholder="Select a course" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fullstack">Full Stack Development</SelectItem>
                  <SelectItem value="frontend">Frontend with React</SelectItem>
                  <SelectItem value="backend">Backend Development</SelectItem>
                  <SelectItem value="uiux">UI/UX with Shadcn</SelectItem>
                </SelectContent>
              </Select>
              {errors.courseInterest && <p className="text-sm text-destructive">{errors.courseInterest}</p>}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-14 text-lg font-semibold gradient-bg glow-primary hover:scale-[1.02] transition-transform"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  I'm Interested
                  <Send className="ml-2 w-5 h-5" />
                </>
              )}
            </Button>
          </form>

          <p className="text-xs text-center text-muted-foreground mt-6">
            By submitting, you agree to receive communication about GoForCode courses.
          </p>
        </motion.div>
      </div>
    </section>
  );
});

InterestForm.displayName = "InterestForm";

export default InterestForm;
