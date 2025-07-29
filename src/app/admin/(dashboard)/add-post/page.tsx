import { Button } from "@/components/ui/button";
import { getUser } from "@/queries/user";
import { createClient } from "@/utils/supabase/server";
import { CircleCheckBig } from "lucide-react";
import { redirect } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import EmbedBlock from "./embedBlock";
import MediaList from "./mediaList";

export default async function PrivatePage() {
  const supabase = await createClient();
  const userData = await getUser();
  if (!userData?.email) {
    redirect("/admin/sign-in");
  }
  try {
    const { data: media, error: mediaErr } = await supabase
      .from("social_media")
      .select("*")
      .eq("author_id", userData.id)
      .order("created_at", { ascending: false });
    console.log(media);
    if (mediaErr) {
      throw new Error(mediaErr?.message || "Error fetching articles");
    }
    return (
      <div className="w-full ">
        <Dialog>
          <DialogTrigger asChild>
            <div className="w-full  flex items-center justify-center mt-12 text-center">
              <Button className="w-full max-w-sm">Add Embed</Button>
            </div>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Embed Media</DialogTitle>
              <DialogDescription>
                Add YouTube videos, tweets, or Instagram posts to your content.
              </DialogDescription>
            </DialogHeader>
            <EmbedBlock />
          </DialogContent>
        </Dialog>

        {!media.length && mediaErr == null ? (
          <div className="flex flex-col items-center justify-center mt-24  ">
            <CircleCheckBig width="32" height="32" className="text-green-500" />

            <h3 className="font-semibold text-xl mt-4 text-gray-50">
              Welcome, You&apos;re all set!
            </h3>
            <p className="text-gray-200 text-center mt-2">
              Thank you for joining us, add your first Media Embed.
            </p>
          </div>
        ) : (
          <MediaList media={media} />
        )}
      </div>
    );
  } catch (error) {
    return (
      <div className="text-center text-red-500">Error loading articles</div>
    );
  }
}
