import { Suspense } from "react"

import { useTarget } from "./hooks/useTarget"

import Lights from "./environment/Lights"
import Background from "./environment/Background"
import Sea from "./models/Sea"
import Arrow from "./models/Arrow"
import Kraken from "./models/Kraken"
import Boat from "./models/Boat"

function Scene() {
  const target = useTarget()

  return (
    <>
      <Lights />
      <Background />

      <Sea />
      <Arrow target={target} visible={true} />

      <Suspense fallback={null}>
        <Kraken target={target}/>
      </Suspense>

      <Suspense fallback={null}>
        <Boat status="broken" />
      </Suspense>
    </>
  )
}

export default Scene
