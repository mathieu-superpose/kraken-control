import { OrbitControls } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"

import Scene from "./Scene"

const ORTHOGRAPHIC = false

function App() {
  if (ORTHOGRAPHIC)
    return (
      <Canvas shadows orthographic camera={{ position: [5, 5, 5], zoom: 100 }}>
        <Scene />

        <OrbitControls makeDefault />
      </Canvas>
    )

  return (
    <Canvas shadows camera={{ position: [5, 5, 5] }}>
      <Scene />

      <OrbitControls makeDefault />
    </Canvas>
  )
}

export default App
