import { useEffect, useState } from "react"

function Sea() {
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    document.body.style.cursor = hovered ? `url("/img/tentacle.png"), auto` : "auto"
  }, [hovered])

  return (
    <group>
      <mesh
        receiveShadow
        rotation-x={-Math.PI / 2}
        name="sea"
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <planeGeometry args={[30, 6, 4, 4]} />
        <meshStandardMaterial
          transparent
          color="blue"
          polygonOffset
          polygonOffsetUnits={1}
          polygonOffsetFactor={1}
        />
      </mesh>
      <mesh receiveShadow rotation-x={-Math.PI / 2} position={[0, 0, 3]}>
        <planeGeometry args={[30, 4, 4, 4]} />
        <meshStandardMaterial
          transparent
          color="blue"
          polygonOffset
          polygonOffsetUnits={1}
          polygonOffsetFactor={1}
        />
      </mesh>
      <mesh receiveShadow rotation-x={-Math.PI / 2} position={[0, 0, -3]}>
        <planeGeometry args={[30, 4, 4, 4]} />
        <meshStandardMaterial
          transparent
          color="blue"
          polygonOffset
          polygonOffsetUnits={1}
          polygonOffsetFactor={1}
        />
      </mesh>
    </group>
  )
}

export default Sea
