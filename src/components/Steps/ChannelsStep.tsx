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

const ChannelOption = styled.label`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  margin: 0.5rem 0;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  background: white;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #3b82f6;
  }

  input {
    width: 1.25rem;
    height: 1.25rem;
    accent-color: #2563eb;
  }

  span {
    flex: 1;
    font-weight: 500;
    color: #1f2937;
  }
`

function ChannelsStep() {
  const { state, toggleChannel } = useForm()

  return (
    <Container>
      <h2>Selección de Canales</h2>
      
      <ChannelOption>
        <input
          type="checkbox"
          checked={state.channels.sms}
          onChange={() => toggleChannel('sms')}
        />
        <span>SMS</span>
      </ChannelOption>
      
      <ChannelOption>
        <input
          type="checkbox"
          checked={state.channels.email}
          onChange={() => toggleChannel('email')}
        />
        <span>Correo Electrónico</span>
      </ChannelOption>
      
      <ChannelOption>
        <input
          type="checkbox"
          checked={state.channels.whatsapp}
          onChange={() => toggleChannel('whatsapp')}
        />
        <span>WhatsApp</span>
      </ChannelOption>
    </Container>
  )
}

export default ChannelsStep