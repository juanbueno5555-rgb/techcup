import type { Metadata } from 'next'
import { ChatView } from '@/components/app/chat-view'

export const metadata: Metadata = {
  title: 'Chat — TechCup',
  description: 'Coordina con tu equipo, contacta soporte y envía mensajes directos.',
}

export default function ChatPage() {
  return <ChatView />
}
