// src/components/EmbedComponentView.tsx
import * as React from 'react'
import { NodeViewProps, NodeViewWrapper } from '@tiptap/react'

const EmbedComponent: React.FC<NodeViewProps> = ({ node }) => {
  const { src, type, title } = node.attrs

  const renderEmbed = () => {
    switch (type) {
      case 'youtube':
        const youtubeId = extractYoutubeId(src)
        if (!youtubeId) return <div>Invalid YouTube URL</div>

        return (
          <div className="w-full aspect-video">
            <iframe
              src={`https://www.youtube.com/embed/${youtubeId}`}
              title={title || "YouTube video"}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full rounded-lg"
            />
          </div>
        )

      case 'twitter':
        return (
          <div className="w-full max-w-xl mx-auto  bg-white p-1  rounded-md shadow overflow-hidden">
            <blockquote className="twitter-tweet" data-dnt="true">
              <a href={src} target="_blank" rel="noopener noreferrer">
                {title || "View on Twitter"}
              </a>
            </blockquote>
          <TwitterScript />
        </div>
        )

      case 'instagram':
        return (
          <div className="instagram-embed w-full max-w-xl mx-auto">
            <blockquote
              className="instagram-media bg-transparent"
              data-instgrm-permalink={src}
              data-instgrm-version="14"
            >
              <a href={src} target="_blank" rel="noopener noreferrer">
                {title || "View on Instagram"}
              </a>
            </blockquote>
            <InstagramScript />
          </div>
        )

      default:
        return <div>Unsupported embed type</div>
    }
  }

  return (
    <NodeViewWrapper className="embed-component">
      <div className="embed-container ">
        {renderEmbed()}
      </div>
    </NodeViewWrapper>
  )
}


// Helper function to extract YouTube ID from URL
function extractYoutubeId(url: string): string | null {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)
  return (match && match[2].length === 11) ? match[2] : null
}

// Load Twitter widget script
const TwitterScript = () => {
  React.useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://platform.twitter.com/widgets.js'
    script.async = true
    document.body.appendChild(script)
    return () => {
      document.body.removeChild(script)
    }
  }, [])
  return null
}

// Load Instagram embed script
const InstagramScript = () => {
  React.useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://www.instagram.com/embed.js'
    script.async = true
    document.body.appendChild(script)
    return () => {
      document.body.removeChild(script)
    }
  }, [])
  return null
}

export default EmbedComponent