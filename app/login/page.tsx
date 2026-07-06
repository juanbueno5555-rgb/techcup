import type { Metadata } from 'next'
import { LoginForm } from '@/components/auth/login-form'

export const metadata: Metadata = {
  title: 'Iniciar sesión — TechCup',
  description: 'Accede a la plataforma TechCup para seguir el torneo de fútbol de la Decanatura de Ingeniería de Sistemas.',
}

export default function LoginPage() {
  return <LoginForm />
}
