function Cube() {
  return (
    <mesh castShadow receiveShadow position={[0.5, 0.5, -0.5]} >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color='red' />
    </mesh>
  )
}

export default Cube
