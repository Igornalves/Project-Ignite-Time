import { Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { useState } from 'react'

import {
  CountdownConteiner,
  FormConteiner,
  HomeConteiner,
  MinutesAmountInput,
  Separator,
  StartCountdownButton,
  TaskInput,
} from './styles'

// Controlled or Uncontrolled
// const [task, setTask] = useState('') // controlled
// function handleSubmit(event){ } // Uncontrolled

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, "informe a tarefa"),
  minutesAmount: zod
    .number()
    .min(5, "o intervalo precisa ser de no minimo de 5 min")
    .max(60, "o intervalo precisar se de no maximo 60 min"),
})

// interface newCycleFormData {
//   task: string, 
//   minutesAmount: number
// }

type newCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

interface Cycle {
  id: string,
  task: string, 
  minutesAmount: number
}

export default function Home() {

  const [cycles, setCycles] = useState<Cycle[]>([])

  const { register, handleSubmit, watch, formState, reset} = useForm<newCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    }
  });

  function handleCreateNewCycle(data: newCycleFormData) {
    
    reset()
  }

  console.log(formState.errors)

  const task = watch('task')

  const isSubmitDisabled = !task

  return (
    <HomeConteiner>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormConteiner>
          <label htmlFor="">Vou Trabalha em</label>
          <TaskInput 
            id="task" 
            placeholder="Dê um nome para o seu projeto" 
            list='task-suggestion'
            {...register('task')}
          />

          <datalist id='task-suggestion'>
            <option value='Projeto 1' />
            <option value='Projeto 2' />
            <option value='Projeto 3' />
            <option value='Projeto 4' />
            <option value='Banana' />
          </datalist>

          <label htmlFor="">durante</label>
          <MinutesAmountInput 
            type="number" 
            id="minutesAmount" 
            placeholder='00' 
            step={5}
            min={5}
            max={60}
            {...register('minutesAmount', { valueAsNumber: true })}
          />

          <span>minutos.</span>
        </FormConteiner>

        <CountdownConteiner>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownConteiner>

        <StartCountdownButton disabled={isSubmitDisabled} type="submit">
          <Play size={24} />
          Começar
        </StartCountdownButton>
      </form>
    </HomeConteiner>
  )
}
