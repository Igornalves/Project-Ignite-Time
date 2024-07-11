import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home/intex'
import History from '../pages/History/intex'
import DefaultLayout from '../global/layouts/DefaultLayout'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<History />} />
      </Route>
    </Routes>
  )
}
