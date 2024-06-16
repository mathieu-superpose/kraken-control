import * as THREE from "three"
import { useRef } from "react"
import { useGLTF, useAnimations } from "@react-three/drei"
import { GLTF } from "three-stdlib"

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
}

type ActionName = "Break"
type GLTFActions = Record<ActionName, THREE.AnimationAction>

const MODEL = "/models/boat.glb"

function Boat() {
  const group = useRef<THREE.Group>(null)
  const { nodes, materials, animations } = useGLTF(MODEL) as GLTFResult
  const { actions } = useAnimations<GLTFActions>(animations, group)

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
