import * as THREE from "three"
import { useEffect, useRef, useState } from "react"
import { useGLTF, useAnimations } from "@react-three/drei"
import { GLTF } from "three-stdlib"
import { useFrame } from "@react-three/fiber"

type GLTFResult = GLTF & {
  nodes: {
    BezierCurve002: THREE.SkinnedMesh
    BezierCurve002_1: THREE.SkinnedMesh
    BezierCurve002_2: THREE.SkinnedMesh
    Base: THREE.Bone
    Top: THREE.Bone
  }
  materials: {
    ["Skin1.001"]: THREE.MeshStandardMaterial
    ["Skin2.001"]: THREE.MeshStandardMaterial
    ["Suckers.001"]: THREE.MeshStandardMaterial
  }
  animations: GLTFAction[]
}

type ActionName = "Attack" | "Idle"

interface GLTFAction extends THREE.AnimationClip {
  name: ActionName
}

const MODEL = "/models/kraken.glb"

function Kraken({ target }: { target: THREE.Vector3 }) {
  const group = useRef<THREE.Group>(null)
  const { nodes, materials, animations } = useGLTF(MODEL) as GLTFResult
  const { actions, mixer } = useAnimations(animations, group)

  const [attack, setAttack] = useState(false)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const switchAttack = () => setAttack(false)

    const attackAnimation = actions["Attack"]
    const idleAnimation = actions["Idle"]

    if (attackAnimation && idleAnimation) {
      if (attack) {
        idleAnimation.stop()

        attackAnimation.setLoop(THREE.LoopOnce, 1)
        attackAnimation.play()

        mixer.addEventListener("finished", switchAttack)

        return () => mixer.removeEventListener("finished", switchAttack)
      } else {
        attackAnimation.stop()
        attackAnimation.reset()

        idleAnimation.play()
      }
    }
  }, [attack])

  useFrame((state, delta) => {
    if (!group?.current) return null

    group.current.position.lerp(target, delta * 2)

    const boat = state.scene.getObjectByName("boat")

    if (!boat) return null

    group.current.lookAt(boat.position)
  })

  function attacking() {
    setAttack(true)
  }

  useEffect(() => {
    document.body.style.cursor = hovered
      ? `url("/img/tentacle-attack.png"), auto`
      : "auto"
  }, [hovered])

  return (
    <group
      ref={group}
      dispose={null}
      name="kraken"
      onClick={attacking}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <group name="Scene">
        <group name="Armature">
          <group name="Tentacle">
            <skinnedMesh
              name="BezierCurve002"
              geometry={nodes.BezierCurve002.geometry}
              material={materials["Skin1.001"]}
              skeleton={nodes.BezierCurve002.skeleton}
              morphTargetDictionary={nodes.BezierCurve002.morphTargetDictionary}
              morphTargetInfluences={nodes.BezierCurve002.morphTargetInfluences}
            />
            <skinnedMesh
              name="BezierCurve002_1"
              geometry={nodes.BezierCurve002_1.geometry}
              material={materials["Skin2.001"]}
              skeleton={nodes.BezierCurve002_1.skeleton}
              morphTargetDictionary={
                nodes.BezierCurve002_1.morphTargetDictionary
              }
              morphTargetInfluences={
                nodes.BezierCurve002_1.morphTargetInfluences
              }
            />
            <skinnedMesh
              name="BezierCurve002_2"
              geometry={nodes.BezierCurve002_2.geometry}
              material={materials["Suckers.001"]}
              skeleton={nodes.BezierCurve002_2.skeleton}
              morphTargetDictionary={
                nodes.BezierCurve002_2.morphTargetDictionary
              }
              morphTargetInfluences={
                nodes.BezierCurve002_2.morphTargetInfluences
              }
            />
          </group>
          <primitive object={nodes.Base} />
          <primitive object={nodes.Top} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload(MODEL)

export default Kraken
