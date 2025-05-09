"use client"
import { timeSince } from "@/lib/utils";
import { Article } from "@/utils/types";
import { Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ArticleGrid({
    articles
}: {
    articles: Article[];

}) {
    return (
        <div className=" col-span-1 flex flex-col space-y-4">

            {
                articles.map((article,index) => (


                    <div key={index} className=" flex flex-col h-full rounded-sm overflow-hidden shadow-md bg-slate-950">
                        {/* Image */}
                        <div className="relative w-full h-48  lg:h-52 2xl:h-60 bg-slate-950">
                            {article.blocks[0].type === "image" ? (
                                <>

                                    <Image
                                        width={1000}
                                        height={500}
                                        src={article.blocks[0].url || ""}
                                        alt={article.blocks[0].desc || "Image"}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            const target = e.target as HTMLImageElement; // Assert type
                                            target.src =
                                                "https://via.placeholder.com/1000x500?text=Image+Not+Available"; // Fallback image
                                        }}
                                    />
                                </>
                            ) : (
                                <div className="flex items-center justify-center w-full h-full bg-gray-200">
                                    <p className="text-gray-500 text-sm">
                                        No Image Available
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Content */}
                        <div className="flex flex-col flex-grow justify-between px-2 py-1 bg-slate-900 border-t-2 border-emerald-700">
                            <h3 className=" line-clamp-3 text-sm font-semibold">
                                {article.blocks.map(title=>
                                    title.type==="text" && (<p>{title.content}</p>)
                                )}
                            </h3>
                            <div className="w-full flex justify-between items-center mt-2">
                                <Link href={`/articles/${article.id}`}>
                                    <button className=" self-start text-emerald-600 hover:text-emerald-500 text-sm">
                                        [ Read More ]
                                        {/* <span className="text-xl font-extrabold scale-95 group-hover:scale-110">
                          &rarr;
                        </span>  */}
                                    </button>
                                </Link>
                                <div className="flex items-center gap-1">
                                    <span>
                                        <Clock width={14} />
                                    </span>
                                    <p className="text-xs">
                                        {" "}
                                        {timeSince(article.created_at)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }


        </div>
    )
}