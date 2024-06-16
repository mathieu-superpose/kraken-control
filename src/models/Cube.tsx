import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import * as THREE from "three"

function Cube({ target }: { target: THREE.Vector3 }) {
  const cubeRef = useRef<THREE.Group>(null)

  useFrame((_state, delta) => {
    if (!cubeRef?.current) return null

    cubeRef.current.position.lerp(target, delta * 2)
  })

  return (
    <group ref={cubeRef} name="cube">
      <mesh castShadow receiveShadow position={[0, 0.5, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="red" />
      </mesh>
    </group>
  )
}

export default Cube
