import { useState } from 'react'
import { useForm } from '../../context/FormContext'
import TemplateStep from '../Steps/TemplateStep'
import ChannelsStep from '../Steps/ChannelsStep'
import MessagesStep from '../Steps/MessagesStep'
import styled from 'styled-components'

const StepContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
`

const Navigation = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #eee;
`

const Button = styled.button<{ $primary?: boolean }>`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  background: ${props => props.$primary ? '#2563eb' : '#6b7280'};
  color: white;
  font-weight: 500;
  cursor: pointer;
  transition: opacity 0.2s;

  &:disabled {
    background: #d1d5db;
    cursor: not-allowed;
    opacity: 0.7;
  }

  &:not(:disabled):hover {
    opacity: 0.9;
  }
`

function Wizard() {
  const { state } = useForm()
  const [currentStep, setCurrentStep] = useState(0)
  
  const steps = [
    <TemplateStep />,
    <ChannelsStep />,
    <MessagesStep />
  ]

  const validateMessages = (): boolean => {
    if (state.template === 'custom') {
      return Object.entries(state.channels).every(([channel, selected]) => {
        if (!selected) return true
        if (channel === 'email') {
          return state.messages.email.subject.trim() !== '' && 
                 state.messages.email.body.trim() !== ''
        }
        return state.messages[channel as keyof typeof state.messages].trim() !== ''
      })
    }
    return true
  }

  const handleNext = () => setCurrentStep(prev => prev + 1)
  const handleBack = () => setCurrentStep(prev => prev - 1)

  const handleSubmit = () => {
    const payload = {
      template: state.template,
      channels: Object.entries(state.channels)
        .filter(([_, selected]) => selected)
        .map(([channel]) => channel),
      messages: state.messages
    }
    
    console.log('Datos a enviar:', JSON.stringify(payload, null, 2))
    alert('Datos guardados correctamente. Revisa la consola del navegador para ver el JSON.')
  }

  return (
    <StepContainer>
      {steps[currentStep]}
      <Navigation>
        {currentStep > 0 && (
          <Button onClick={handleBack}>Atrás</Button>
        )}
        <Button 
          $primary 
          onClick={currentStep === steps.length - 1 ? handleSubmit : handleNext}
          disabled={
            (currentStep === 0 && !state.template) ||
            (currentStep === 1 && !Object.values(state.channels).some(Boolean)) ||
            (currentStep === 2 && !validateMessages())
          }
        >
          {currentStep === steps.length - 1 ? 'Enviar' : 'Siguiente'}
        </Button>
      </Navigation>
    </StepContainer>
  )
}

export default Wizard