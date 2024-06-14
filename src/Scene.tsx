import Lights from "./environment/Lights"
import Cube from "./models/Cube"
import Floor from "./models/Floor"

function Scene() {
  return (
    <>
      <Lights />

      <Floor />
      <Cube />
    </>
  )
}

export default Scene
