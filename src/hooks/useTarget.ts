import { useEffect, useState } from "react"
import * as THREE from "three"
import { useThree } from "@react-three/fiber"

export function useTarget() {
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

      if (intersects.length) {
        for (const inter of intersects) {
          if (inter.object?.name === "sea") {
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

  return target
}
