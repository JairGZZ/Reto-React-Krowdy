import { FormProvider } from './context/FormContext'
import Wizard from './components/Wizard/Wizard'
import styled from 'styled-components'

const AppContainer = styled.div`
  min-height: 100vh;
  padding: 2rem;
  background-color: #f5f5f5;
`

function App() {
  return (
    <FormProvider>
      <AppContainer>
        <Wizard />
      </AppContainer>
    </FormProvider>
  )
}

export default App