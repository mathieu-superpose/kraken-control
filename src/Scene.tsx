import { Suspense, useEffect } from "react"
import * as THREE from "three"
import { useThree } from "@react-three/fiber"

import Lights from "./environment/Lights"
import Cube from "./models/Cube"
import Floor from "./models/Floor"

import Arrow from "./models/Arrow"

import Boat from "./models/Boat"

function Scene() {
  const pointer = new THREE.Vector2()
  const raycaster = new THREE.Raycaster()
  const target = new THREE.Vector3()
  const { camera, scene } = useThree()

  useEffect(() => {
    const onMouseDbClick = (e: MouseEvent) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1
      pointer.y = -(e.clientY / window.innerHeight) * 2 + 1

      raycaster.setFromCamera(pointer, camera)
      const intersects = raycaster.intersectObjects(scene.children)

      if (intersects.length > 1) {
        for (const inter of intersects) {
          if (inter.object?.name === "floor") {
            target.copy({
              x: inter.point.x,
              y: inter.point.y,
              z: inter.point.z,
            })
          }
        }
      }
    }

    window.addEventListener("dblclick", onMouseDbClick)

    return () => {
      window.removeEventListener("dblclick", onMouseDbClick)
    }
  })

  return (
    <>
      <Lights />

      <Floor />
      <Cube target={target} />
      <Arrow target={target} />

      <Suspense fallback={null}>
        <Boat />
      </Suspense>
    </>
  )
}

export default Scene
