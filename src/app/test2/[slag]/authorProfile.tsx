import { createClient } from "@/utils/supabase/server";
import Image from "next/image";

const AuthorProfile = async ({ blocksId }: { blocksId: string }) => {
    const supabase = await createClient()
    const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", blocksId)
        .maybeSingle();



    return (
        <div className="flex items-center gap-2  py-1 pl-1 pr-6 rounded-full hover:cursor-pointer">
            <Image
                src={profileData?.avatar_url || "/user1.png"}
                alt="Profile Picture"
                className="w-12 md:w-16 h-12 md:h-16 rounded-full object-cover object-[center_0%]  bg-emerald-500  p-[1px]"
                width={100}
                height={100}
                loading="lazy"
            />
            <div className="leading-tight">
                <p className="font-semibold tracking-wide">
                    &#64;{profileData?.username?.toUpperCase() || "Unknown"}
                </p>

            </div>
        </div>
    );

};
export default AuthorProfile