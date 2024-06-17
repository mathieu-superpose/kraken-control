import { Canvas } from "@react-three/fiber"

import Scene from "./Scene"

const ORTHOGRAPHIC = false

function App() {
  if (ORTHOGRAPHIC)
    return (
      <Canvas shadows orthographic camera={{ position: [5, 5, 5], zoom: 100 }}>
        <Scene />
      </Canvas>
    )

  return (
    <Canvas shadows camera={{ position: [0, 2, 5], zoom: 1.5 }}>
      <Scene />
    </Canvas>
  )
}

export default App
