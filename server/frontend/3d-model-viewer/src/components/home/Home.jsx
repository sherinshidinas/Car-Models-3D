import React, { useEffect, useState } from "react";
import axios from "axios";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import Model from "../Model";
import "./home.scss";

function Home() {
  const [models, setModels] = useState([]);

  useEffect(() => {
    fetchModels();
  }, []);

  const fetchModels = async () => {
    try {
      const response = await axios.get("http://localhost:8802/api/models");
      setModels(response.data);
      console.log("models", response);
    } catch (error) {
      console.log("Error occured while fetching models!");
    }
  };
  return (
    <div className="models">
      <div className="container">
        <ul>
          {models.map((model) => (
            <li key={model._id}>
              <div className="modelCanvas">
                <Canvas style={{ height: 300 }}>
                  <ambientLight intensity={1.5} />
                  <pointLight position={[20, 20, 20]} intensity={2} />
                  <pointLight position={[-10, -10, -10]} intensity={2} />
                  <spotLight
                    position={[15, 15, 15]}
                    angle={0.3}
                    penumbra={1}
                    intensity={2}
                  />
                  <directionalLight position={[0, 10, 0]} intensity={2} />
                  <directionalLight position={[0, -10, 0]} intensity={1.5} />
                  <Model path={`http://localhost:8802/${model.path}`} />
                  <OrbitControls />
                </Canvas>
              </div>
              <div className="modelName">{model.name}</div>
              <div className="modelDesc">{model.description}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Home;
