import { OrbitControls } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"

import Lights from "./environment/Lights"
import Cube from "./models/Cube"
import Floor from "./models/Floor"

function App() {
  return (
    <Canvas shadows orthographic camera={{ position: [5, 5, 5], zoom: 100 }}>
      <Lights />

      <Floor />
      <Cube />

      <OrbitControls makeDefault />
    </Canvas>
  )
}

export default App
