import { Suspense } from "react"

import { useTarget } from "./hooks/useTarget"

import Lights from "./environment/Lights"
import Background from "./environment/Background"
import Cube from "./models/Cube"
import Sea from "./models/Sea"

import Arrow from "./models/Arrow"

import Boat from "./models/Boat"

function Scene() {
  const target = useTarget()

  return (
    <>
      <Lights />
      <Background />

      <Sea />
      <Cube target={target} />
      <Arrow target={target} visible={true} />

      <Suspense fallback={null}>
        <Boat />
      </Suspense>
    </>
  )
}

export default Scene
