import { useEffect } from "react"
import * as THREE from "three"
import { useFrame } from "@react-three/fiber"

import Lights from "./environment/Lights"
import Cube from "./models/Cube"
import Floor from "./models/Floor"

function Scene() {
  const pointer = new THREE.Vector2()
  const raycaster = new THREE.Raycaster()
  const target = new THREE.Vector3()

  useEffect(() => {
    const onMouseMove = (e) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1
      pointer.y = -(e.clientY / window.innerHeight) * 2 + 1
    }

    window.addEventListener("mousemove", onMouseMove)

    return () => {
      window.removeEventListener("mousemove", onMouseMove)
    }
  })

  useFrame((state) => {
    raycaster.setFromCamera(pointer, state.camera)
    const intersects = raycaster.intersectObjects(state.scene.children)

    if (intersects.length > 1) {
      for (const inter of intersects) {
        if (inter.object?.name === "floor") {
          target.copy(inter.point)
        }
      }
    }
  })

  return (
    <>
      <Lights />

      <Floor />
      <Cube target={target} />
    </>
  )
}

export default Scene
