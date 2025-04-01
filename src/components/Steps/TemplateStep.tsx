import { useForm } from '../../context/FormContext'
import styled from 'styled-components'

const Container = styled.div`
  h2 {
    margin-bottom: 1.5rem;
    color: #1f2937;
    font-size: 1.5rem;
    font-weight: 600;
  }
`

const TemplateCard = styled.div<{ $selected: boolean }>`
  padding: 1.5rem;
  margin: 0.75rem 0;
  border: 2px solid ${props => props.$selected ? '#2563eb' : '#e5e7eb'};
  border-radius: 8px;
  background: white;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #3b82f6;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  }

  ${props => props.$selected && `
    background-color: #eff6ff;
    border-color: #2563eb;
  `}
`

function TemplateStep() {
  const { state, setTemplate } = useForm()

  return (
    <Container>
      <h2>Selección de Plantilla</h2>
      <TemplateCard 
        $selected={state.template === 'invitation'}
        onClick={() => setTemplate('invitation')}
      >
        <h3>Invitación</h3>
        <p>Plantilla estándar para nuevas invitaciones</p>
      </TemplateCard>
      
      <TemplateCard
        $selected={state.template === 'reminder'}
        onClick={() => setTemplate('reminder')}
      >
        <h3>Recordatorio</h3>
        <p>Plantilla para recordatorios de eventos confirmados</p>
      </TemplateCard>
      
      <TemplateCard
        $selected={state.template === 'custom'}
        onClick={() => setTemplate('custom')}
      >
        <h3>Personalizado</h3>
        <p>Crea un mensaje completamente personalizado</p>
      </TemplateCard>
    </Container>
  )
}

export default TemplateStep