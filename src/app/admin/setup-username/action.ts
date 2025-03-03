"use server";

import { createClient } from "@/utils/supabase/server";

export async function setUsernameDb(username: string, profileImage: File | null) {
  const supabase = await createClient();

  try {
    // Get the current user's ID
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      throw new Error("User not authenticated.");
    }

    let imageUrl = null;

    // Fetch the current profile data to get the existing image URL
    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("avatar_url")
      .eq("id", user.id)
      .single();

    if (profileError) {
      console.error("Error fetching user profile:", profileError.message);
    }

    // Delete the existing image from storage if a new image is provided
    if (profileImage && profileData?.avatar_url) {
      // Extract the file path from the avatar_url
      const avatarUrl = profileData.avatar_url;
      const urlParts = avatarUrl.split("/profile-images/"); // Split by the bucket name
      const existingImagePath = urlParts[1]; // Get the part after the bucket name

      if (existingImagePath) {
        const { error: deleteError } = await supabase
          .storage
          .from('profile-images')
          .remove([existingImagePath]);

        if (deleteError) {
          console.error("Error deleting existing image:", deleteError.message);
        } else {
          console.log("Existing image deleted successfully");

          // Add a delay to ensure deletion completes
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }
    }

    // Upload the profile image if provided
    if (profileImage) {
      const fileExt = profileImage.name.split('.').pop();
      const filePath = `${user.id}-${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase
        .storage
        .from('profile-images')
        .upload(filePath, profileImage);

      if (uploadError) {
        throw new Error(uploadError.message);
      }

      // Get the public URL of the uploaded image
      const { data: publicUrlData } = await supabase
        .storage
        .from('profile-images')
        .getPublicUrl(filePath);

      imageUrl = publicUrlData.publicUrl;
    }

    // Insert or update the username and profile image in the profiles table
    const { error: upsertError } = await supabase
      .from("profiles")
      .upsert({ id: user.id, username, avatar_url: imageUrl, email: user.email });

    if (upsertError) {
      throw new Error(upsertError.message);
    }

    return { data: "Profile updated successfully!", error: null };
  } catch (err) {
    return { data: null, error: err instanceof Error ? err.message : "An unknown error occurred." };
  }
}