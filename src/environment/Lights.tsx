function Lights() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[1, 3, 1]} castShadow shadow-mapSize={1024} />
    </>
  )
}

export default Lights
