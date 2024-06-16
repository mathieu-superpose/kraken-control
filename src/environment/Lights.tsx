function Lights() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[-5, 5, -5]} intensity={1.5} />
    </>
  )
}

export default Lights
