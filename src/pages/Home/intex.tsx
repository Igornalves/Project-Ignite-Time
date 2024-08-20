import { HandPalm, Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { useEffect, useState } from 'react'

import { differenceInSeconds } from 'date-fns'

import {
  CountdownConteiner,
  FormConteiner,
  HomeConteiner,
  MinutesAmountInput,
  Separator,
  StartCountdownButton,
  StopCountdownButton,
  TaskInput,
} from './styles'

// Controlled or Uncontrolled
// const [task, setTask] = useState('') // controlled
// function handleSubmit(event){ } // Uncontrolled

// tipagem com o Zod para utilizar mais funcinalidades no sistema
const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(5, 'o intervalo precisa ser de no minimo de 5 min')
    .max(60, 'o intervalo precisar se de no maximo 60 min'),
})

// interface newCycleFormData {
//   task: string,
//   minutesAmount: number
// }

type newCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

// criando uma interface para melhor desenvolver o sistema
interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

export default function Home() {
  // criando um estado para aplicacao tipando elas de forma completa
  const [cycles, setCycles] = useState<Cycle[]>([])
  // quando iniciar aplicacao o estado da aplicacao e nula
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  // criando um estado para valor de segundos
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const { register, handleSubmit, watch, reset } = useForm<newCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)
  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0

  useEffect(() => {
    // criando uma varivael para roda o meeu projeto
    let interval: number

    if (activeCycle) {
      interval = setInterval(() => {
        const differenceSeconds = differenceInSeconds(
          new Date(), 
          activeCycle.startDate
        )

        if (differenceSeconds >= totalSeconds) {
          setCycles((state) => state.map((cycles) => {
              if (cycles.id === activeCycleId) {
                return { ...cycles, finishedDate: new Date() }
              } else {
                return cycles
              }
            }),
          )

          setAmountSecondsPassed(totalSeconds)

          clearInterval(interval)
        } else {
          setAmountSecondsPassed(
            differenceSeconds
          )
        }
      }, 1000)
    }
    // resetando o useEffect para cria um novo
    return () => {
      clearInterval(interval)
    }
  }, [activeCycle, totalSeconds, activeCycleId])

  function handleCreateNewCycle(data: newCycleFormData) {
    const id = String(new Date().getTime())

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }
    setCycles((state) => [...state, newCycle])
    setActiveCycleId(id)
    setAmountSecondsPassed(0)
    reset()
  }

  function handleInterruptCycle() {
    setCycles((state) => state.map((cycles) => {
      if (cycles.id === activeCycleId) {
        return { ...cycles, finishedDate: new Date() }
      } else {
        return cycles
      }
    }),
  )
    setActiveCycleId(null)
  }

  // console.log(formState.errors)

  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

  // ardondando o calculo de matematica aqui na divisao
  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  // criando variaveis para mudar o valor do minutos e secundos
  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  // console.log(activeCycle)

  // colocando um efeito para mostra a numeracao via titulo da pagina web
  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`
    }
  }, [minutes, seconds, activeCycle])

  // verificando o que esta acontecendo na variavel task
  const task = watch('task')
  const isSubmitDisabled = !task

  console.log(cycles)

  return (
    <HomeConteiner>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormConteiner>
          <label htmlFor="">Vou Trabalha em</label>
          <TaskInput
            id="task"
            list="task-suggestion"
            placeholder="Dê um nome para o seu projeto"
            disabled={!!activeCycle}
            {...register('task')}
          />

          <datalist id="task-suggestion">
            <option value="Projeto 1" />
            <option value="Projeto 2" />
            <option value="Projeto 3" />
            <option value="Projeto 4" />
            <option value="Banana" />
          </datalist>

          <label htmlFor="">durante</label>
          <MinutesAmountInput
            type="number"
            id="minutesAmount"
            placeholder="00"
            step={5}
            min={5}
            disabled={!!activeCycle}
            {...register('minutesAmount', { valueAsNumber: true })}
          />

          <span>minutos.</span>
        </FormConteiner>

        <CountdownConteiner>
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <Separator>:</Separator>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </CountdownConteiner>

        {activeCycle ? (
          <StopCountdownButton onClick={handleInterruptCycle} type="button">
            <HandPalm size={24} />
            Começar
          </StopCountdownButton>
        ) : (
          <StartCountdownButton disabled={isSubmitDisabled} type="submit">
            <Play size={24} />
            Começar
          </StartCountdownButton>
        )}
      </form>
    </HomeConteiner>
  )
}
