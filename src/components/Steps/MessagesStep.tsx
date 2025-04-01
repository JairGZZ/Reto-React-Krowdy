import { useForm } from '../../context/FormContext'
import styled from 'styled-components'

const Container = styled.div`
  h3 {
    margin: 1rem 0 0.5rem;
    color: #1f2937;
    font-size: 1.125rem;
    font-weight: 600;
  }
`

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  margin-bottom: 1rem;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 2px #bfdbfe;
  }
`

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  min-height: 150px;
  font-size: 1rem;
  line-height: 1.5;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 2px #bfdbfe;
  }
`

function MessagesStep() {
  const { state, updateMessages } = useForm()

  return (
    <Container>
      {state.channels.sms && (
        <div>
          <h3>Mensaje SMS</h3>
          <TextArea
            value={state.messages.sms}
            onChange={(e) => updateMessages({ sms: e.target.value })}
            placeholder="Escribe tu mensaje SMS..."
          />
        </div>
      )}

      {state.channels.email && (
        <div>
          <h3>Correo Electrónico</h3>
          <Input
            type="text"
            value={state.messages.email.subject}
            onChange={(e) => updateMessages({ 
              email: { ...state.messages.email, subject: e.target.value } 
            })}
            placeholder="Asunto del correo"
          />
          <TextArea
            value={state.messages.email.body}
            onChange={(e) => updateMessages({ 
              email: { ...state.messages.email, body: e.target.value } 
            })}
            placeholder="Cuerpo del correo electrónico..."
          />
        </div>
      )}

      {state.channels.whatsapp && (
        <div>
          <h3>Mensaje de WhatsApp</h3>
          <TextArea
            value={state.messages.whatsapp}
            onChange={(e) => updateMessages({ whatsapp: e.target.value })}
            placeholder="Escribe tu mensaje de WhatsApp..."
          />
        </div>
      )}
    </Container>
  )
}

export default MessagesStep