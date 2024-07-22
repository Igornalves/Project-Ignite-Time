import { 
  HistoryConteiner,
  HistoryList,
  Status
} from "./styles"

export default function History() {
  return ( 
    <HistoryConteiner>
      <h1>Meu histórico</h1>

      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Tarefa</td>
              <td>20 minutos</td>
              <td>Há 2 meses</td>
              <td><Status stautsColor="green">Concluído</Status></td>
            </tr>
            <tr>
              <td>Tarefa</td>
              <td>20 minutos</td>
              <td>Há 2 meses</td>
              <td><Status stautsColor="yellow">Andamento</Status></td>
            </tr>
            <tr>
              <td>Tarefa</td>
              <td>20 minutos</td>
              <td>Há 2 meses</td>
              <td><Status stautsColor="red">Interrompido</Status></td>
            </tr>
            <tr>
              <td>Tarefa</td>
              <td>20 minutos</td>
              <td>Há 2 meses</td>
              <td><Status stautsColor="green">Concluído</Status></td>
            </tr>
            <tr>
              <td>Tarefa</td>
              <td>20 minutos</td>
              <td>Há 2 meses</td>
              <td><Status stautsColor="yellow">Andamento</Status></td>
            </tr>
            <tr>
              <td>Tarefa</td>
              <td>20 minutos</td>
              <td>Há 2 meses</td>
              <td><Status stautsColor="red">Interrompido</Status></td>
            </tr>
          </tbody>
        </table>
      </HistoryList>
    </HistoryConteiner>
  );
}
