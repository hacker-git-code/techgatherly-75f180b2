
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Mail, Phone, User, MessageSquare } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { Input } from '@/components/ui/input';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Toggle } from '@/components/ui/toggle';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';

interface SignupFormValues {
  name: string;
  identifier: string;
  password: string;
  isPhone: boolean;
}

interface OtpFormValues {
  otp: string;
}

const Signup = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [identifier, setIdentifier] = useState('');
  const [name, setName] = useState('');
  const [usePassword, setUsePassword] = useState(false);
  const [isPhone, setIsPhone] = useState(false);
  
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
      identifier: '',
      password: '',
      isPhone: false,
    },
  });

  const otpForm = useForm<OtpFormValues>({
    defaultValues: {
      otp: '',
    },
  });

  const onSubmit = async (data: SignupFormValues) => {
    setIsLoading(true);
    setIdentifier(data.identifier);
    setName(data.name);
    setIsPhone(data.isPhone);
    
    try {
      if (usePassword) {
        // Signup with password
        const email = isPhone ? '' : data.identifier;
        const phone = isPhone ? data.identifier : '';
        
        const { data: userData, error } = await supabase.auth.signUp({
          email,
          phone,
          password: data.password,
          options: {
            data: {
              name: data.name,
            },
          },
        });
        
        if (error) {
          toast.error(error.message);
          setIsLoading(false);
          return;
        }
        
        toast.success('Account created successfully!');
        navigate('/chat');
      } else {
        // Signup with OTP
        const options = {
          data: {
            name: data.name,
          },
          emailRedirectTo: window.location.origin + '/chat',
        };
        
        let authResult;
        if (isPhone) {
          // Phone OTP
          authResult = await supabase.auth.signInWithOtp({
            phone: data.identifier,
            options,
          });
        } else {
          // Email OTP
          authResult = await supabase.auth.signInWithOtp({
            email: data.identifier,
            options,
          });
        }
        
        const { error } = authResult;
        
        if (error) {
          toast.error(error.message);
          setIsLoading(false);
          return;
        }
        
        toast.success(`OTP sent to your ${isPhone ? 'phone' : 'email'}!`);
        setShowOtpForm(true);
      }
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
        email: !isPhone ? identifier : undefined,
        phone: isPhone ? identifier : undefined,
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

  const toggleAuthMethod = () => {
    setUsePassword(!usePassword);
  };

  const toggleIdentifierType = () => {
    setIsPhone(!isPhone);
    form.setValue('isPhone', !isPhone);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Navbar />
      <div className="pt-24 flex justify-center items-center px-4">
        <div className="glass-panel max-w-md w-full p-8 bg-white/90 dark:bg-gray-800/90 shadow-xl">
          <h1 className="text-3xl font-bold text-center mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">Sign Up</h1>
          <p className="text-gray-600 dark:text-gray-300 text-center mb-8">
            Create an account to access our AI assistant and event features.
          </p>
          
          {!showOtpForm ? (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                          <Input 
                            placeholder="John Doe" 
                            className="pl-10 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600" 
                            {...field} 
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-center space-x-2 mb-3">
                  <Toggle 
                    pressed={!isPhone} 
                    onPressedChange={() => isPhone && toggleIdentifierType()} 
                    className={`px-4 py-2 ${!isPhone ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300' : ''}`}
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    Email
                  </Toggle>
                  <Toggle 
                    pressed={isPhone} 
                    onPressedChange={() => !isPhone && toggleIdentifierType()} 
                    className={`px-4 py-2 ${isPhone ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300' : ''}`}
                  >
                    <Phone className="mr-2 h-4 w-4" />
                    Phone
                  </Toggle>
                </div>
                
                <FormField
                  control={form.control}
                  name="identifier"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{isPhone ? 'Phone Number' : 'Email'}</FormLabel>
                      <FormControl>
                        <div className="relative">
                          {isPhone ? (
                            <Phone className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                          ) : (
                            <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                          )}
                          <Input 
                            placeholder={isPhone ? "+1234567890" : "your@email.com"} 
                            className="pl-10 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600" 
                            {...field} 
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {usePassword && (
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                            <Input 
                              type="password" 
                              placeholder="••••••••" 
                              className="pl-10 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600" 
                              {...field} 
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                
                <div className="flex justify-center">
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={toggleAuthMethod}
                    className="w-full mb-2 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
                  >
                    {usePassword ? (
                      <>
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Use OTP Instead
                      </>
                    ) : (
                      <>
                        <Lock className="mr-2 h-4 w-4" />
                        Use Password Instead
                      </>
                    )}
                  </Button>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-2.5"
                  disabled={isLoading}
                >
                  {isLoading ? 
                    (usePassword ? 'Creating Account...' : 'Sending OTP...') : 
                    (usePassword ? 'Create Account' : 'Send OTP')}
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
                    <FormItem className="space-y-4">
                      <FormLabel className="text-center block">
                        Enter the OTP sent to your {isPhone ? 'phone' : 'email'}
                      </FormLabel>
                      <FormControl>
                        <div className="flex justify-center">
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
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="flex flex-col space-y-3">
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-2.5"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Verifying...' : 'Verify OTP'}
                  </Button>
                  
                  <Button 
                    type="button" 
                    variant="outline"
                    className="w-full bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
                    onClick={() => setShowOtpForm(false)}
                  >
                    Back to Signup
                  </Button>
                </div>
              </form>
            </Form>
          )}
          
          <div className="mt-6 text-center">
            <p className="text-gray-600 dark:text-gray-300">
              Already have an account? <Link to="/login" className="text-blue-500 hover:text-blue-700 font-medium">Log In</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
