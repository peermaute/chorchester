"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
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
import { UserIcon } from "@/components/ui/icons/custom-icons";
import { ProfilePictureUpload } from "@/app/components/profile-picture-upload";
import { getUserByEmail, updateUser } from "@/app/api/users";
import { useSession } from "next-auth/react";
import { User } from "@/app/types/User";
import { toast } from "sonner";
import { Skeleton } from "../../components/ui/skeleton";
import { cn } from "@/lib/utils";

const MAX_PERSONAL_INFO_LENGTH = 1000;
const MAX_NAME_LENGTH = 255;

const formSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(MAX_NAME_LENGTH, {
      message: `Name must be at most ${MAX_NAME_LENGTH} characters.`,
    }),
  ensemble: z.string(),
  stimmgruppe: z.string().optional(),
  instrumentengruppe: z.string().optional(),
  personal_info: z.string().max(MAX_PERSONAL_INFO_LENGTH, {
    message: `Personal info must be at most ${MAX_PERSONAL_INFO_LENGTH} characters.`,
  }),
});

const voiceGroups = ["Sopran", "Alt", "Tenor", "Bass"];

const instrumentGroups = [
  "Geige",
  "Bratsche",
  "Cello",
  "Kontrabass",
  "Flöte",
  "Oboe",
  "Klarinette",
  "Fagott",
  "Horn",
  "Trompete",
  "Posaune",
  "Tuba",
  "Schlagwerk",
  "Harfe",
  "Weitere",
];

const Profile = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      ensemble: "",
      stimmgruppe: "",
      instrumentengruppe: "",
      personal_info: "",
    },
  });

  const selectedEnsemble = form.watch("ensemble");
  const showStimmgruppe =
    selectedEnsemble === "Kammerchor" ||
    selectedEnsemble === "Kammerchor & Orchester";
  const showInstrumentengruppe =
    selectedEnsemble === "Orchester" ||
    selectedEnsemble === "Kammerchor & Orchester";
  const isBothEnsembles = selectedEnsemble === "Kammerchor & Orchester";

  useEffect(() => {
    const loadUserData = async () => {
      if (status === "loading") {
        return;
      }

      if (status === "unauthenticated") {
        setIsLoading(false);
        setError("Please sign in to view your profile");
        return;
      }

      if (!session?.user?.email) {
        setIsLoading(false);
        setError("No session found");
        return;
      }

      try {
        const userData = await getUserByEmail(session.user.email);
        setUser(userData);
        form.reset({
          name: userData.name,
          ensemble: userData.ensemble,
          stimmgruppe: userData.stimmgruppe || "",
          instrumentengruppe: userData.instrumentengruppe || "",
          personal_info: userData.personal_info || "",
        });
        setError(null);
      } catch (error) {
        console.error("Error loading user data:", error);
        setError("Failed to load user data");
      } finally {
        setIsLoading(false);
      }
    };

    loadUserData();
  }, [session, status, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!session?.user?.email) return;

    try {
      setIsSubmitting(true);
      const updatedUser = await updateUser(session.user.email, {
        ...values,
        picture: user?.picture,
      });
      setUser(updatedUser);
      toast.success("Profil erfolgreich aktualisiert!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Fehler beim Aktualisieren des Profils");
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleCancel = () => {
    if (user) {
      form.reset({
        name: user.name,
        ensemble: user.ensemble,
        stimmgruppe: user.stimmgruppe || "",
        instrumentengruppe: user.instrumentengruppe || "",
        personal_info: user.personal_info || "",
      });
    }
  };

  const handlePictureUpload = async (url: string) => {
    if (!session?.user?.email) return;

    try {
      const updatedUser = await updateUser(session.user.email, {
        name: user?.name || "",
        ensemble: user?.ensemble || "",
        stimmgruppe: user?.stimmgruppe || "",
        instrumentengruppe: user?.instrumentengruppe || "",
        personal_info: user?.personal_info || "",
        picture: url,
      });
      setUser(updatedUser);
      toast.success("Profile picture updated successfully!");
    } catch (error) {
      console.error("Error updating profile picture:", error);
      toast.error("Failed to update profile picture");
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center p-4">
        <div className="w-full max-w-2xl space-y-6">
          <div className="flex items-center gap-2 pl-4">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-8 w-24" />
          </div>

          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-4 w-48" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-32 w-32 rounded-full mx-auto" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-4 w-56" />
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-10 w-full" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
        <p className="text-destructive">Fehler: {error}</p>
        <Button variant="outline" onClick={() => router.push("/")}>
          Zurück zur Startseite
        </Button>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
        <p className="text-muted-foreground">Kein Benutzerprofil gefunden</p>
        <Button variant="outline" onClick={() => router.push("/")}>
          Zurück zur Startseite
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center p-4">
      <div className="w-full max-w-2xl space-y-6">
        <div className="flex items-center gap-2 pl-4">
          <UserIcon currentColor="hsl(var(--foreground))" />
          <h1 className="text-2xl font-semibold">Profil</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Profilbild</CardTitle>
            <CardDescription>Aktualisiere dein Profilbild</CardDescription>
          </CardHeader>
          <CardContent>
            <ProfilePictureUpload
              currentPicture={user.picture || ""}
              onUploadSuccess={handlePictureUpload}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Benutzerinformationen</CardTitle>
            <CardDescription>
              Aktualisiere deine persönlichen Informationen
            </CardDescription>
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
                        <Input placeholder="Dein Name" {...field} />
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
                            <SelectValue placeholder="Select ensemble" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Kammerchor">Kammerchor</SelectItem>
                          <SelectItem value="Orchester">Orchester</SelectItem>
                          <SelectItem value="Kammerchor & Orchester">
                            Kammerchor & Orchester
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {showStimmgruppe && (
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
                              <SelectValue placeholder="Select voice group" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {voiceGroups.map((group) => (
                              <SelectItem key={group} value={group}>
                                {group}
                              </SelectItem>
                            ))}
                            {isBothEnsembles && (
                              <SelectItem value="Dirigent">Dirigent</SelectItem>
                            )}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                {showInstrumentengruppe && (
                  <FormField
                    control={form.control}
                    name="instrumentengruppe"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Instrumentengruppe</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select instrument group" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {instrumentGroups.map((group) => (
                              <SelectItem key={group} value={group}>
                                {group}
                              </SelectItem>
                            ))}
                            {isBothEnsembles && (
                              <SelectItem value="Dirigent">Dirigent</SelectItem>
                            )}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                <FormField
                  control={form.control}
                  name="personal_info"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Persönliches</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Textarea
                            placeholder="Erzähl uns etwas über dich"
                            className="resize-none pb-6"
                            {...field}
                          />
                          <div className="absolute bottom-1 right-1 text-[10px] text-muted-foreground/50 bg-background/80 px-1 rounded">
                            {field.value?.length || 0}/
                            {MAX_PERSONAL_INFO_LENGTH}
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex flex-col xs:flex-row justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCancel}
                  >
                    Abbrechen
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="min-w-[180px]"
                  >
                    {isSubmitting ? "Speichern..." : "Änderungen speichern"}
                  </Button>
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
