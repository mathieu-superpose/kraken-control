import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import * as THREE from "three"

const VERTICAL_SPEED = 10
const VERICAL_AMPLITUDE_ADJUST = 10
const VERTICAL_HEIGHT = 0.5
const ROTATION_SPEED = 10

function Arrow({ target }: { target: THREE.Vector3 }) {
  const arrowRef = useRef<THREE.Group>(null)
  const arrowMaterial = new THREE.MeshStandardMaterial({ color: "white" })

  useFrame((state, delta) => {
    if (!arrowRef?.current) return null

    const elapsedTime = state.clock.getElapsedTime()

    // target position
    arrowRef.current.position.copy(target)

    // vertical mouvement
    const verticalAdjust = Math.sin(elapsedTime * VERTICAL_SPEED) / VERICAL_AMPLITUDE_ADJUST
    arrowRef.current.position.y = VERTICAL_HEIGHT + verticalAdjust

    // rotation mouvement
    if (verticalAdjust > 0) {
      arrowRef.current.rotation.y += delta * ROTATION_SPEED
    }
  })

  return (
    <group ref={arrowRef} scale={0.7}>
      <mesh material={arrowMaterial}>
        <boxGeometry args={[0.2, 0.9, 0.2]} />
      </mesh>
      <mesh
        material={arrowMaterial}
        position={[0, -0.19, -0.16]}
        rotation={[-Math.PI * 0.2, 0, 0]}
      >
        <boxGeometry args={[0.2, 0.5, 0.2]} />
      </mesh>
      <mesh
        material={arrowMaterial}
        position={[0, -0.19, 0.16]}
        rotation={[Math.PI * 0.2, 0, 0]}
      >
        <boxGeometry args={[0.2, 0.5, 0.2]} />
      </mesh>
    </group>
  )
}

export default Arrow
