"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useDebounceCallback } from 'usehooks-ts'
import { signUpSchema } from "@/schemas/signUpSchema"
import axios, { AxiosError } from 'axios'
import { ApiResponse } from "@/types/ApiResponse"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Loader2 } from "lucide-react"


const signUp = () => {
    const { toast } = useToast();
    const router = useRouter();

    const [username, setusername] = useState('');
    const [usernameMessage, setUsernameMessage] = useState('');
    const [isCheckingUsername, setIsCheckingUsername] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const debounced = useDebounceCallback(setusername, 300);

    const form = useForm<z.infer<typeof signUpSchema>>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            username: '',
            email: '',
            password: ''
        },
    });

    useEffect(() => {
        const checkUsernameUnique = async () => {
            if (username) {
                setUsernameMessage('');
                setIsCheckingUsername(true);
                try {
                    const response = await axios.get(`/api/check-username-unique?username=${username}`);
                    console.log('Printing response in SignUp page: ', response);
                    setUsernameMessage(response.data.message);
                } catch (error) {
                    const axiosError = error as AxiosError<ApiResponse>
                    setUsernameMessage(axiosError.response?.data.message ?? 'Error checking username');
                } finally {
                    setIsCheckingUsername(false);
                }
            }
        }
        checkUsernameUnique();
    }, [username]);

    const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
        setIsSubmitting(true);
        try {
            const response = await axios.post(`/api/sign-up`, data);
            toast({
                title: 'Success',
                description: response.data.message
            });
            router.replace(`/verify/${username}`);
            setIsSubmitting(false);
        } catch (error) {
            console.error("Error in signUp of User: ", error);
            const axiosError = error as AxiosError<ApiResponse>;
            let erroMessage = axiosError.response?.data.message;
            toast({
                title: 'SignUp failed',
                description: erroMessage ?? 'Error signing up',
                variant: "destructive"
            });
            setIsSubmitting(false);
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-cyan-950">
          <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
            <div className="text-center">
              <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6 text-gray-800">
                GhostFeedback
              </h1>
              <p className="mb-4 text-gray-600">Sign up to start your anonymous adventure</p>
            </div>
      
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="username"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            debounced(e.target.value);
                          }}
                          className="border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </FormControl>
                      {isCheckingUsername && <Loader2 className="animate-spin" />}
                      <FormMessage />
                      <p className={`text-sm ${usernameMessage == "Username is unique" ? 'text-green-500' : 'text-red-500'}`}>
                        {usernameMessage}
                      </p>
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
                        <Input
                          placeholder="email"
                          {...field}
                          className="border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="password"
                          {...field}
                          className="border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full bg-teal-800 hover:bg-teal-700 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Please wait
                    </>
                  ) : (
                    'Sign Up'
                  )}
                </Button>
              </form>
            </Form>
      
            <div className="text-center mt-4">
              <p className="text-gray-600">
                Already a member?{' '}
                <Link href="/sign-in" className="text-teal-600 hover:text-teal-800">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      );
      
}

export default signUp
