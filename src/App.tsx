import { Routes, Route } from 'react-router-dom'
import Gallery from './pages/Gallery'
import About from './pages/About'

function App() {
    return (
        <Routes>
            <Route path='/' element={<Gallery />} />
            <Route path='/about' element={<About />} />
        </Routes>
    )
}

export default App
