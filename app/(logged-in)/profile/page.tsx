"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UserIcon } from "@/app/components/user-icon";
import { ProfilePictureUpload } from "@/app/components/profile-picture-upload";
import { getUserByEmail } from "@/app/api/users";
import { useSession } from "next-auth/react";
import { User } from "@/app/types/User";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  ensemble: z.string(),
  stimmgruppe: z.string(),
  personal_info: z.string(),
});

const Profile = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUserData = async () => {
      if (session?.user?.email) {
        try {
          const userData = await getUserByEmail(session.user.email);
          setUser(userData);
          form.reset({
            name: userData.name,
            ensemble: userData.ensemble,
            stimmgruppe: userData.stimmgruppe || "",
            personal_info: userData.personal_info || "",
          });
        } catch (error) {
          console.error("Error loading user data:", error);
        }
      }
      setIsLoading(false);
    };

    loadUserData();
  }, [session]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      ensemble: "",
      stimmgruppe: "",
      personal_info: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  const handleCancel = () => {
    if (user) {
      form.reset({
        name: user.name,
        ensemble: user.ensemble,
        stimmgruppe: user.stimmgruppe || "",
        personal_info: user.personal_info || "",
      });
    }
  };

  const handlePictureUpload = (url: string) => {
    setUser((prev) => (prev ? { ...prev, picture: url } : null));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-400">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-400">User not found</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center p-4">
      <div className="w-full max-w-2xl space-y-6">
        <div className="flex items-center gap-2 pl-4">
          <UserIcon currentColor="hsl(var(--foreground))" />
          <h1 className="text-2xl font-semibold">Profile</h1>
        </div>

        <ProfilePictureUpload
          currentPicture={user.picture}
          onUploadSuccess={handlePictureUpload}
        />

        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>Update your profile information</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="ensemble"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ensemble</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your ensemble" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Kammerchor">Kammerchor</SelectItem>
                          <SelectItem value="Orchester">Orchester</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="stimmgruppe"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Stimmgruppe</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your voice group" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Sopran">Sopran</SelectItem>
                          <SelectItem value="Alt">Alt</SelectItem>
                          <SelectItem value="Tenor">Tenor</SelectItem>
                          <SelectItem value="Bass">Bass</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="personal_info"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Personal Info</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us about yourself"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-between gap-4 sm:justify-end">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Save Changes</Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
