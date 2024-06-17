import * as THREE from "three"
import { useEffect, useRef, useState } from "react"
import { useGLTF, useAnimations } from "@react-three/drei"
import { GLTF } from "three-stdlib"
import { useFrame } from "@react-three/fiber"

type GLTFResult = GLTF & {
  nodes: {
    Boat_B: THREE.Mesh
    Boat_F: THREE.Mesh
    Mast_Back: THREE.Mesh
    Mast_Front: THREE.Mesh
    Roap_Front: THREE.Mesh
    Roap_Mid: THREE.Mesh
    Roap_Top: THREE.Mesh
    Bone: THREE.Bone
    Bone_1: THREE.Bone
    Bone_2: THREE.Bone
    Bone_3: THREE.Bone
    Bone_4: THREE.Bone
  }
  materials: {
    lambert3SG: THREE.MeshStandardMaterial
  }
  animations: GLTFAction[]
}

type ActionName = "Break"

interface GLTFAction extends THREE.AnimationClip {
  name: ActionName
}

type TBoatStatus = "fishing" | "afraid" | "broken"

const MODEL = "/models/boat.glb"

const BOAT_RANGE = 7
const FISHING_SPEED = 0.1

function Boat({ status = "broken" }: { status: TBoatStatus }) {
  const group = useRef<THREE.Group>(null)
  const { nodes, animations } = useGLTF(MODEL) as GLTFResult
  const { actions, mixer } = useAnimations(animations, group)
  const [broken, setBroken] = useState(false)

  const boatTarget = new THREE.Vector3(0, 0, 0)

  useEffect(() => {
    const switchBroken = () => setBroken(true)

    if (status === "broken" && actions["Break"]) {
      const animation = actions["Break"]
      animation.setLoop(THREE.LoopOnce, 0)
      animation.clampWhenFinished = true
      animation.play()

      mixer.addEventListener("finished", switchBroken)

      return () => mixer.removeEventListener("finished", switchBroken)
    }
  }, [status])

  useFrame((state) => {
    if (!group?.current) return null

    const elapsedTime = state.clock.getElapsedTime()

    if (status === "fishing") {
      group.current.position.x =
        BOAT_RANGE * Math.sin(elapsedTime * FISHING_SPEED)

      boatTarget.x = BOAT_RANGE * Math.sin((elapsedTime + 0.05) * FISHING_SPEED)

      group.current.lookAt(boatTarget)
    }

    if (broken) {
      group.current.position.y =
        Math.sin(elapsedTime * 1.5) / 8 - Math.sin(0.1 + elapsedTime * 5) / 23
    }
  })

  return (
    <group ref={group} dispose={null} scale={0.2} name="boat">
      <group
        name="Scene"
        position={[0, -0.5, 0]}
        rotation={[0, -Math.PI / 2, 0]}
      >
        <group name="Boat_Arm">
          <primitive object={nodes.Bone} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload(MODEL)

export default Boat
