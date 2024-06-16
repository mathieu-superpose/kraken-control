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

function Boat({ status = "broken" }: { status: TBoatStatus }) {
  const group = useRef<THREE.Group>(null)
  const { nodes, animations } = useGLTF(MODEL) as GLTFResult
  const { actions, mixer } = useAnimations(animations, group)
  const [broken, setBroken] = useState(true)

  useEffect(() => {
    if (status === "broken" && actions["Break"]) {
      const animation = actions["Break"]
      animation.setLoop(THREE.LoopOnce, 0)
      animation.clampWhenFinished = true
      animation.play()

      mixer.addEventListener('finished', (e) => setBroken(true));
    }
  }, [status])

  useFrame((state) => {
    if(!group?.current) return null

    const elapsedTime = state.clock.getElapsedTime()

    if(broken) {
      group.current.position.y = Math.sin(elapsedTime * 2) / 6
    }
  })

  return (
    <group ref={group} dispose={null} scale={0.2}>
      <group name="Scene">
        <group name="Boat_Arm">
          <primitive object={nodes.Bone} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload(MODEL)

export default Boat
