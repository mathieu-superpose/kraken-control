function Sea() {
  return (
    <group>
      <mesh receiveShadow rotation-x={-Math.PI / 2} name="sea">
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
