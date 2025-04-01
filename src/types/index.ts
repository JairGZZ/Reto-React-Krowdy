// src/types/index.ts
export interface EmailContent {
    subject: string
    body: string
  }
  
  export interface FormState {
    template: 'invitation' | 'reminder' | 'custom' | null
    channels: {
      sms: boolean
      email: boolean
      whatsapp: boolean
    }
    messages: {
      sms: string
      email: EmailContent
      whatsapp: string
    }
  }
  
  export type FormContextType = {
    state: FormState
    setTemplate: (template: FormState['template']) => void
    toggleChannel: (channel: keyof FormState['channels']) => void
    updateMessages: (messages: Partial<FormState['messages']>) => void
  }