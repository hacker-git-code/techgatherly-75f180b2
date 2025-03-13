
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Mail, User } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { Input } from '@/components/ui/input';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';

interface SignupFormValues {
  name: string;
  email: string;
}

interface OtpFormValues {
  otp: string;
}

const Signup = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  
  // Check if user is already logged in
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        navigate('/chat');
      }
    };
    
    checkSession();
  }, [navigate]);
  
  const form = useForm<SignupFormValues>({
    defaultValues: {
      name: '',
      email: '',
    },
  });

  const otpForm = useForm<OtpFormValues>({
    defaultValues: {
      otp: '',
    },
  });

  const onSubmit = async (data: SignupFormValues) => {
    setIsLoading(true);
    setEmail(data.email);
    setName(data.name);
    
    try {
      const { data: otpData, error } = await supabase.auth.signInWithOtp({
        email: data.email,
        options: {
          data: {
            name: data.name,
          },
          emailRedirectTo: window.location.origin + '/chat',
        },
      });
      
      if (error) {
        toast.error(error.message);
        setIsLoading(false);
        return;
      }
      
      toast.success('OTP sent to your email!');
      setShowOtpForm(true);
    } catch (error) {
      console.error('Signup error:', error);
      toast.error('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOtp = async (data: OtpFormValues) => {
    setIsLoading(true);
    
    try {
      // Fix: Remove the 'data' property from options since it's not allowed by VerifyOtpParams type
      const { data: sessionData, error } = await supabase.auth.verifyOtp({
        email,
        token: data.otp,
        type: 'signup',
      });
      
      if (error) {
        toast.error(error.message);
        setIsLoading(false);
        return;
      }
      
      // After successful verification, update the user's metadata with their name
      if (sessionData.user) {
        const { error: updateError } = await supabase.auth.updateUser({
          data: { name }
        });
        
        if (updateError) {
          console.error('Error updating user metadata:', updateError);
        }
      }
      
      toast.success('Account created successfully!');
      navigate('/chat');
    } catch (error) {
      console.error('OTP verification error:', error);
      toast.error('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-24 flex justify-center items-center px-4">
        <div className="glass-panel max-w-md w-full p-8">
          <h1 className="heading-lg text-center mb-6">Sign Up</h1>
          <p className="text-tech-darkGray/80 text-center mb-8">
            Create an account to access our AI assistant and event features.
          </p>
          
          {!showOtpForm ? (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-2.5 h-5 w-5 text-tech-darkGray/50" />
                          <Input 
                            placeholder="John Doe" 
                            className="pl-10" 
                            {...field} 
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-2.5 h-5 w-5 text-tech-darkGray/50" />
                          <Input 
                            placeholder="your@email.com" 
                            className="pl-10" 
                            {...field} 
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full bg-tech-blue hover:bg-tech-blue/90"
                  disabled={isLoading}
                >
                  {isLoading ? 'Sending OTP...' : 'Send OTP'}
                </Button>
              </form>
            </Form>
          ) : (
            <Form {...otpForm}>
              <form onSubmit={otpForm.handleSubmit(verifyOtp)} className="space-y-6">
                <FormField
                  control={otpForm.control}
                  name="otp"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Enter the OTP sent to your email</FormLabel>
                      <FormControl>
                        <InputOTP maxLength={6} {...field}>
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="flex flex-col space-y-3">
                  <Button 
                    type="submit" 
                    className="w-full bg-tech-blue hover:bg-tech-blue/90"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Verifying...' : 'Verify OTP'}
                  </Button>
                  
                  <Button 
                    type="button" 
                    variant="outline"
                    className="w-full"
                    onClick={() => setShowOtpForm(false)}
                  >
                    Back to Signup
                  </Button>
                </div>
              </form>
            </Form>
          )}
          
          <div className="mt-6 text-center">
            <p className="text-tech-darkGray/80">
              Already have an account? <Link to="/login" className="text-tech-blue hover:text-tech-blue/90">Log In</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
