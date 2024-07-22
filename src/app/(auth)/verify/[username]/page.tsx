'use client'
import { useToast } from '@/components/ui/use-toast';
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { verifySchema } from '@/schemas/verifySchema';
import * as z from 'zod';
import axios, { AxiosError } from 'axios';
import { ApiResponse } from '@/types/ApiResponse';
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from '@/components/ui/input';

const verifyAccount = () => {
    const router = useRouter();
    const param = useParams();
    console.log('Printing params in verify/username: ', param);
    const params = useParams<{ username: string }>();
    const { toast } = useToast();

    const form = useForm<z.infer<typeof verifySchema>>({
        resolver: zodResolver(verifySchema),
    });

    const onSubmit = async (data: z.infer<typeof verifySchema>) => {
        console.log('Printing data in verify/username: ', data);;

        try {
            const response = await axios.post(`/api/verify-code`, {
                username: params.username,
                code: data.code
            });

            console.log('Printing Response in verify/username', response)

            toast({
                title: 'Verification Succesfull',
                description: response.data.message,
            })
            router.replace('/sign-in');
        } catch (error) {
            console.log("Error in verify/username: ", error);
            const axiosError = error as AxiosError<ApiResponse>;
            let errormessage = axiosError.response?.data.message;
            toast({
                title: 'Verifiaction Failed',
                description: errormessage,
                variant: 'destructive'
            })
        }

    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
                <div className="text-center">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                        Verify Your Account
                    </h1>
                    <p className="text-gray-600 mb-6">
                        Please enter the verification code we sent to your email to activate your account.
                    </p>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            name="code"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-700">Verification Code</FormLabel>
                                    <Input
                                        {...field}
                                        placeholder="Enter your code"
                                        className="border-gray-300 focus:ring-2 focus:ring-teal-500"
                                    />
                                    <FormMessage className="text-red-500" />
                                </FormItem>
                            )}
                        />
                        <Button
                            type="submit"
                            className="w-full bg-teal-800 text-white hover:bg-teal-700 focus:ring-2 focus:ring-teal-500"
                        >
                            Verify
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
}

export default verifyAccount
