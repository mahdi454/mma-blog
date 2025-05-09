import { Article } from "@/utils/types";
import RenderBlock from "./block";

type PostProps = {
    blocks: Article;
  };
  
  const Post: React.FC<PostProps> = ({ blocks }) => {
    return (
      <article className="space-y-3 md:space-y-4">
        {blocks.blocks.map((block, index) => (
          <div key={block.id}>
            <RenderBlock block={block} index={index} blocks={blocks} />
          </div>
        ))}
      </article>
    );
  };
  
  export default Post