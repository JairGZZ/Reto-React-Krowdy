import { createContext, useContext, useState, useEffect } from 'react'
import { FormState, FormContextType } from '../types/index'

const TEMPLATES = {
  invitation: {
    sms: 'Hola [Nombre], te invitamos a participar en el proceso de [nombre del proceso/actividad] que se llevará a cabo el [fecha] a las [hora]. Por favor, confirma tu asistencia respondiendo a este mensaje. ¡Te esperamos!',
    whatsapp: 'Hola [Nombre], te invitamos a participar en el proceso de [nombre del proceso/actividad] que se llevará a cabo el [fecha] a las [hora]. Por favor, confirma tu asistencia respondiendo a este mensaje. ¡Te esperamos!',
    email: {
      subject: 'Invitación al proceso de [nombre del proceso]',
      body: `Estimado/a [Nombre],
Esperamos que te encuentres bien. A través de este medio, queremos invitarte a participar en el proceso de [nombre del proceso], que se llevará a cabo el [fecha] a las [hora]. El lugar del encuentro será [dirección/sala virtual].
Tu participación es muy importante para nosotros. Agradeceríamos que confirmes tu asistencia respondiendo a este correo.
Quedamos atentos a cualquier consulta que puedas tener.
Cordialmente,
[Nombre del remitente]
[Puesto]
[Empresa/Organización]`
    }
  },
  reminder: {
    sms: 'Hola [Nombre], te recordamos que el proceso de [nombre del proceso/actividad] al que confirmaste tu asistencia se realizará el [fecha] a las [hora]. ¡Te esperamos puntual!',
    whatsapp: 'Hola [Nombre], te recordamos que el proceso de [nombre del proceso/actividad] al que confirmaste tu asistencia se realizará el [fecha] a las [hora]. ¡Te esperamos puntual!',
    email: {
      subject: 'Recordatorio del proceso de [nombre del proceso]',
      body: `Estimado/a [Nombre],
Queremos recordarte que el proceso de [nombre del proceso], al que amablemente confirmaste tu asistencia, se realizará el [fecha] a las [hora].
El evento tendrá lugar en [dirección/sala virtual]. Si tienes alguna duda o necesitas asistencia previa, no dudes en contactarnos.
Te esperamos puntual.
Saludos cordiales,
[Nombre del remitente]
[Puesto]
[Empresa/Organización]`
    }
  }
}

const FormContext = createContext<FormContextType | null>(null)

const initialFormState: FormState = {
  template: null,
  channels: { sms: false, email: false, whatsapp: false },
  messages: {
    sms: '',
    email: { subject: '', body: '' },
    whatsapp: ''
  }
}

export function FormProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<FormState>(initialFormState)

  const setTemplate = (template: FormState['template']) => {
    setState(prev => ({
      ...prev,
      template,
      messages: initialFormState.messages
    }))
  }

  const toggleChannel = (channel: keyof FormState['channels']) => {
    setState(prev => ({
      ...prev,
      channels: { ...prev.channels, [channel]: !prev.channels[channel] }
    }))
  }

  const updateMessages = (messages: Partial<FormState['messages']>) => {
    setState(prev => ({
      ...prev,
      messages: { ...prev.messages, ...messages }
    }))
  }

  useEffect(() => {
    if (state.template && state.template !== 'custom') {
      const template = TEMPLATES[state.template]
      const updates: Partial<FormState['messages']> = {}
      
      if (state.channels.sms) updates.sms = template.sms
      if (state.channels.whatsapp) updates.whatsapp = template.whatsapp
      if (state.channels.email) updates.email = template.email
      
      setState(prev => ({
        ...prev,
        messages: { ...prev.messages, ...updates }
      }))
    }
  }, [state.template, state.channels])

  return (
    <FormContext.Provider value={{ state, setTemplate, toggleChannel, updateMessages }}>
      {children}
    </FormContext.Provider>
  )
}

export function useForm() {
  const context = useContext(FormContext)
  if (!context) throw new Error('useForm must be used within FormProvider')
  return context
}