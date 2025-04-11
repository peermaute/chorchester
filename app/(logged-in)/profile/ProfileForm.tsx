"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { User } from "@/app/types/User";
import { updateProfile } from "./actions";
import { useState } from "react";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  ensemble: z.string(),
  stimmgruppe: z.string(),
  personal_info: z.string(),
});

interface ProfileFormProps {
  user: User;
}

export default function ProfileForm({ user }: ProfileFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user.name,
      ensemble: user.ensemble,
      stimmgruppe: user.stimmgruppe,
      personal_info: user.personal_info,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const result = await updateProfile(user.id, values);
      if (result.success) {
        router.refresh();
      } else {
        console.error("Failed to update profile:", result.error);
      }
    } catch (error) {
      console.error("Failed to update profile:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleCancel = () => {
    form.setValue("name", user.name);
    form.setValue("ensemble", user.ensemble);
    form.setValue("stimmgruppe", user.stimmgruppe);
    form.setValue("personal_info", user.personal_info);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
        <CardDescription>Update your profile information</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                  <Select onValueChange={field.onChange} value={field.value}>
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
                  <Select onValueChange={field.onChange} value={field.value}>
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
              <Button variant="outline" type="button" onClick={handleCancel}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
