function Lights() {
  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[1, 7, 5]} intensity={1.5} />
    </>
  )
}

export default Lights
