const bgColor = "#84a4f4"

function Background() {
  return (
    <>
      <color attach="background" args={[bgColor]} />
      <fog attach="fog" color={bgColor} near={9.5} far={10} />
    </>
  )
}

export default Background
