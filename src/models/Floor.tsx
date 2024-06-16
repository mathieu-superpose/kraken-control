function Floor({ divisions = 10 }) {
  return (
    <group>
      <gridHelper args={[6, divisions, "#888", "#bbb"]} />
      <mesh receiveShadow rotation-x={-Math.PI / 2} name="floor">
        <planeGeometry args={[6, 6, 4, 4]} />
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

export default Floor
