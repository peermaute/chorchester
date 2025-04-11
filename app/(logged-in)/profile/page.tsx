"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
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

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  ensemble: z.string(),
  stimmgruppe: z.string(),
  personal_info: z.string(),
});

type User = {
  picture: string;
  name: string;
  ensemble: string;
  stimmgruppe: string;
  personal_info: string;
};

const Profile = () => {
  const router = useRouter();
  const user: User = {
    picture: "/person.svg",
    name: "John Doe",
    ensemble: "Kammerchor",
    stimmgruppe: "Tenor",
    personal_info: "John is a great singer.",
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user.name,
      ensemble: user.ensemble,
      stimmgruppe: user.stimmgruppe,
      personal_info: user.personal_info,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  const handleCancel = () => {
    form.setValue("name", user.name);
    form.setValue("ensemble", user.ensemble);
    form.setValue("stimmgruppe", user.stimmgruppe);
    form.setValue("personal_info", user.personal_info);
  };

  return (
    <div className="flex flex-col items-center p-4">
      <div className="w-full max-w-2xl space-y-6">
        <div className="flex items-center gap-2 pl-4">
          <UserIcon currentColor="hsl(var(--foreground))" />
          <h1 className="text-2xl font-semibold">Profile</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Profile Picture</CardTitle>
            <CardDescription>Update your profile picture</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center items-center">
              <div className="relative w-48 h-48">
                <Image
                  src={user.picture}
                  alt="Profile Picture"
                  fill
                  className="rounded-full object-cover"
                  priority
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Update your profile information</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your name" {...field} />
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
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select an ensemble" />
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
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a stimmgruppe" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem
                            value="Sopran"
                            disabled={form.watch("ensemble") === "Orchester"}
                          >
                            Sopran
                          </SelectItem>
                          <SelectItem
                            value="Alt"
                            disabled={form.watch("ensemble") === "Orchester"}
                          >
                            Alt
                          </SelectItem>
                          <SelectItem
                            value="Tenor"
                            disabled={form.watch("ensemble") === "Orchester"}
                          >
                            Tenor
                          </SelectItem>
                          <SelectItem
                            value="Bass"
                            disabled={form.watch("ensemble") === "Orchester"}
                          >
                            Bass
                          </SelectItem>
                          <SelectItem
                            value="Streichinstrumente"
                            disabled={form.watch("ensemble") === "Kammerchor"}
                          >
                            Streichinstrumente
                          </SelectItem>
                          <SelectItem
                            value="Holzblaeser"
                            disabled={form.watch("ensemble") === "Kammerchor"}
                          >
                            Holzbläser
                          </SelectItem>
                          <SelectItem
                            value="Blechblaeser"
                            disabled={form.watch("ensemble") === "Kammerchor"}
                          >
                            Blechbläser
                          </SelectItem>
                          <SelectItem
                            value="Schlaginstrumente"
                            disabled={form.watch("ensemble") === "Kammerchor"}
                          >
                            Schlaginstrumente
                          </SelectItem>
                          <SelectItem
                            value="Tasteninstrumente"
                            disabled={form.watch("ensemble") === "Kammerchor"}
                          >
                            Tasteninstrumente
                          </SelectItem>
                          <SelectItem value="Andere">Andere</SelectItem>
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
                          placeholder="Enter your personal information"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    type="button"
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Save</Button>
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
