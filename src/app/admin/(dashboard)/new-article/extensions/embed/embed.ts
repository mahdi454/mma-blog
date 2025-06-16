// src/extensions/embed.ts
import { Node, mergeAttributes } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import EmbedComponent from './embedComponent'

export const Embed = Node.create({
  name: 'embed',
  
  group: 'block',
  
  content: '',
  
  marks: '',
  
  atom: true,
  
  draggable: true,

  addAttributes() {
    return {
      src: {
        default: null,
      },
      type: {
        default: 'youtube',
      },
      title: {
        default: null,
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-embed]',
        getAttrs: element => {
          const dom = element as HTMLElement
          
          return {
            src: dom.getAttribute('data-src'),
            type: dom.getAttribute('data-type'),
            title: dom.getAttribute('data-title'),
          }
        },
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'div',
      mergeAttributes(
        { 'data-embed': '' },
        { 'data-src': HTMLAttributes.src },
        { 'data-type': HTMLAttributes.type },
        { 'data-title': HTMLAttributes.title },
      ),
      '',
    ]
  },

  addCommands() {
    return {
      setEmbed: attributes => ({ commands }) => {
        return commands.insertContent({
          type: this.name,
          attrs: attributes,
        })
      },
    }
  },

  addNodeView() {
    return ReactNodeViewRenderer(EmbedComponent)
  },
})

// Add this to ensure TypeScript recognizes the command
declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    embed: {
      /**
       * Add an embed
       */
      setEmbed: (attributes: { src: string; type: string; title?: string }) => ReturnType
    }
  }
}

export default Embed