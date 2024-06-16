import { useEffect, useState, useMemo } from "react"
import * as THREE from "three"
import { extend, useFrame } from "@react-three/fiber"
import { shaderMaterial } from "@react-three/drei"

import vertex from "../shaders/sea/vertex.glsl"
import fragment from "../shaders/sea/fragment.glsl"

const SeaShaderMaterial = shaderMaterial({ uTime: 0 }, vertex, fragment)

extend({ SeaShaderMaterial })

function Sea() {
  const [hovered, setHovered] = useState(false)

  const textureLoader = new THREE.TextureLoader()

  const seaMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color(0, 0, 0.3),
  })

  const waveMaterial = useMemo(() => {
    const material = new SeaShaderMaterial()

    const oceanTexture = textureLoader.load(
      "/textures/ocean.png",
      (texture) => {
        texture.wrapS = THREE.RepeatWrapping
        texture.wrapT = THREE.RepeatWrapping
      }
    )

    material.uniforms.uOceanTexture = new THREE.Uniform(oceanTexture)
    material.uniforms.uKrakenPos = new THREE.Uniform(new THREE.Vector2(0, 0))

    return material
  }, [])

  useEffect(() => {
    document.body.style.cursor = hovered
      ? `url("/img/tentacle.png"), auto`
      : "auto"
  }, [hovered])

  useFrame((state) => {
    // UPDATE MATERIAL
    const elapsedTime = state.clock.getElapsedTime()
    waveMaterial.uniforms.uTime.value = elapsedTime
  })

  return (
    <group>
      <mesh
        name="waves"
        rotation={[-Math.PI / 2, 0, 0]}
        material={waveMaterial}
        position={[0, 0.01, 0]}
      >
        <planeGeometry args={[30, 8, 10, 10]} />
      </mesh>

      <mesh
        receiveShadow
        rotation-x={-Math.PI / 2}
        name="sea"
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        material={seaMaterial}
      >
        <planeGeometry args={[30, 6, 4, 4]} />
      </mesh>

      <mesh
        receiveShadow
        rotation-x={-Math.PI / 2}
        position={[0, 0, -3]}
        material={seaMaterial}
      >
        <planeGeometry args={[30, 4, 4, 4]} />
      </mesh>
    </group>
  )
}

export default Sea
