import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { globeHotspots } from '../../data/climateData';
import { GlobeHotspot } from '../../types/climate';
import { Layers, RotateCw, ZoomIn, ZoomOut, Compass, Info, X } from 'lucide-react';

export type GlobeLayer = 'temperature' | 'co2' | 'seaLevel' | 'deforestation' | 'natural';

interface EarthGlobe3DProps {
  initialLayer?: GlobeLayer;
  heightClass?: string;
  onHotspotSelect?: (hotspot: GlobeHotspot) => void;
  showControlBar?: boolean;
}

export const EarthGlobe3D: React.FC<EarthGlobe3DProps> = ({
  initialLayer = 'temperature',
  heightClass = 'h-[500px] md:h-[650px]',
  onHotspotSelect,
  showControlBar = true,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeLayer, setActiveLayer] = useState<GlobeLayer>(initialLayer);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [selectedHotspot, setSelectedHotspot] = useState<GlobeHotspot | null>(null);
  const [hoveredHotspot, setHoveredHotspot] = useState<GlobeHotspot | null>(null);

  // References to keep Three.js instances
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const globeGroupRef = useRef<THREE.Group | null>(null);
  const cloudsMeshRef = useRef<THREE.Mesh | null>(null);
  const earthMeshRef = useRef<THREE.Mesh | null>(null);
  const layerMeshesRef = useRef<THREE.Group | null>(null);
  const pinMeshesRef = useRef<{ mesh: THREE.Object3D; hotspot: GlobeHotspot }[]>([]);

  // Dragging and interaction state
  const isDraggingRef = useRef<boolean>(false);
  const prevMousePosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const rotationVelocityRef = useRef<{ x: number; y: number }>({ x: 0, y: 0.002 });
  const autoRotateRef = useRef<boolean>(true);
  autoRotateRef.current = autoRotate;

  // Convert Latitude / Longitude to 3D Sphere Position
  const latLngToVector3 = (lat: number, lng: number, radius: number): THREE.Vector3 => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lng + 180) * (Math.PI / 180);
    const x = -(radius * Math.sin(phi) * Math.cos(theta));
    const z = radius * Math.sin(phi) * Math.sin(theta);
    const y = radius * Math.cos(phi);
    return new THREE.Vector3(x, y, z);
  };

  // Generate high-resolution procedural Earth texture
  const createEarthTexture = (layer: GlobeLayer): THREE.CanvasTexture => {
    const canvas = document.createElement('canvas');
    canvas.width = 2048;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d')!;

    // 1. Base Ocean Gradient
    const oceanGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
    if (layer === 'temperature') {
      oceanGrad.addColorStop(0, '#0c1a24');
      oceanGrad.addColorStop(0.5, '#052219');
      oceanGrad.addColorStop(1, '#0c1a24');
    } else {
      oceanGrad.addColorStop(0, '#05131e');
      oceanGrad.addColorStop(0.5, '#08201a');
      oceanGrad.addColorStop(1, '#05131e');
    }
    ctx.fillStyle = oceanGrad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 2. Latitude & Longitude Subtle Grid Lines
    ctx.strokeStyle = 'rgba(45, 106, 79, 0.15)';
    ctx.lineWidth = 1;
    for (let y = 0; y <= canvas.height; y += canvas.height / 12) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }
    for (let x = 0; x <= canvas.width; x += canvas.width / 24) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }

    // 3. Procedural Continents (Stylized vector approximation for realistic high-contrast landmasses)
    const drawLandmass = (cx: number, cy: number, rx: number, ry: number, color: string, irregularity = 8) => {
      ctx.fillStyle = color;
      ctx.beginPath();
      for (let i = 0; i <= 360; i += 10) {
        const rad = (i * Math.PI) / 180;
        const noise = Math.sin(i * irregularity) * 0.15 + Math.cos(i * 3) * 0.1;
        const x = cx + (rx + rx * noise) * Math.cos(rad);
        const y = cy + (ry + ry * noise) * Math.sin(rad);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.fill();
    };

    const landBaseColor = layer === 'temperature' ? '#184e38' : '#143d2c';

    // North America
    drawLandmass(canvas.width * 0.22, canvas.height * 0.32, 180, 140, landBaseColor);
    drawLandmass(canvas.width * 0.28, canvas.height * 0.22, 120, 70, landBaseColor);
    // South America
    drawLandmass(canvas.width * 0.32, canvas.height * 0.65, 110, 170, landBaseColor);
    // Europe
    drawLandmass(canvas.width * 0.52, canvas.height * 0.28, 90, 70, landBaseColor);
    // Africa
    drawLandmass(canvas.width * 0.53, canvas.height * 0.55, 130, 160, landBaseColor);
    // Asia & Siberia
    drawLandmass(canvas.width * 0.72, canvas.height * 0.30, 260, 140, landBaseColor);
    drawLandmass(canvas.width * 0.68, canvas.height * 0.48, 120, 90, landBaseColor);
    // Australia
    drawLandmass(canvas.width * 0.84, canvas.height * 0.72, 100, 75, landBaseColor);
    // Greenland
    drawLandmass(canvas.width * 0.38, canvas.height * 0.14, 70, 50, '#d1fae5');
    // Antarctica
    drawLandmass(canvas.width * 0.50, canvas.height * 0.95, 950, 45, '#e2e8f0');

    // 4. Specific Layer Visual Effects Overlay
    if (layer === 'temperature') {
      // Temperature Anomaly Heat Bands (Red/Amber near tropics and Arctic poles)
      const heatGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
      heatGrad.addColorStop(0.0, 'rgba(239, 68, 68, 0.45)');   // Arctic Amplification
      heatGrad.addColorStop(0.2, 'rgba(245, 158, 11, 0.25)');
      heatGrad.addColorStop(0.5, 'rgba(239, 68, 68, 0.35)');   // Equator heat stress
      heatGrad.addColorStop(0.8, 'rgba(245, 158, 11, 0.20)');
      heatGrad.addColorStop(1.0, 'rgba(239, 68, 68, 0.30)');   // Antarctic warming
      ctx.fillStyle = heatGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    } else if (layer === 'co2') {
      // Emission hotspots (East Asia, North America, Europe)
      const drawPlume = (x: number, y: number, r: number) => {
        const radGrad = ctx.createRadialGradient(x, y, 0, x, y, r);
        radGrad.addColorStop(0, 'rgba(244, 63, 94, 0.8)');
        radGrad.addColorStop(0.5, 'rgba(239, 68, 68, 0.4)');
        radGrad.addColorStop(1, 'rgba(239, 68, 68, 0)');
        ctx.fillStyle = radGrad;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      };
      drawPlume(canvas.width * 0.74, canvas.height * 0.35, 140); // East Asia
      drawPlume(canvas.width * 0.24, canvas.height * 0.34, 110); // USA
      drawPlume(canvas.width * 0.52, canvas.height * 0.30, 80);  // Europe
      drawPlume(canvas.width * 0.67, canvas.height * 0.44, 90);  // South Asia
    } else if (layer === 'seaLevel') {
      // Luminous Coastal Inundation highlight
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.8)';
      ctx.lineWidth = 4;
      ctx.shadowColor = '#06b6d4';
      ctx.shadowBlur = 10;
      // Coastline pulses
      ctx.strokeRect(canvas.width * 0.20, canvas.height * 0.38, 120, 60);
      ctx.strokeRect(canvas.width * 0.65, canvas.height * 0.45, 160, 90);
      ctx.strokeRect(canvas.width * 0.78, canvas.height * 0.65, 120, 80);
      ctx.shadowBlur = 0;
    } else if (layer === 'deforestation') {
      // Amazon, Congo, Southeast Asia forest alert zones
      const drawForestLoss = (x: number, y: number, r: number) => {
        const radGrad = ctx.createRadialGradient(x, y, 0, x, y, r);
        radGrad.addColorStop(0, 'rgba(234, 88, 12, 0.85)');
        radGrad.addColorStop(0.7, 'rgba(245, 158, 11, 0.35)');
        radGrad.addColorStop(1, 'rgba(245, 158, 11, 0)');
        ctx.fillStyle = radGrad;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      };
      drawForestLoss(canvas.width * 0.32, canvas.height * 0.58, 90); // Amazon
      drawForestLoss(canvas.width * 0.54, canvas.height * 0.54, 70); // Congo
      drawForestLoss(canvas.width * 0.77, canvas.height * 0.52, 60); // SE Asia
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    return texture;
  };

  // Generate Procedural Cloud Texture
  const createCloudsTexture = (): THREE.CanvasTexture => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;

    ctx.fillStyle = 'rgba(0, 0, 0, 0)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    for (let i = 0; i < 400; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const r = 10 + Math.random() * 35;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    return texture;
  };

  // Re-build or update earth texture when layer changes
  useEffect(() => {
    if (earthMeshRef.current) {
      const newTex = createEarthTexture(activeLayer);
      (earthMeshRef.current.material as THREE.MeshStandardMaterial).map = newTex;
      (earthMeshRef.current.material as THREE.MeshStandardMaterial).needsUpdate = true;
    }
  }, [activeLayer]);

  // Main Three.js Scene Setup
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth || 800;
    const height = mount.clientHeight || 500;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 5.2);
    cameraRef.current = camera;

    // 2. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    mount.innerHTML = '';
    mount.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 3. Globe Container Group
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);
    globeGroupRef.current = globeGroup;

    // 4. Earth Sphere
    const earthRadius = 2.0;
    const earthGeometry = new THREE.SphereGeometry(earthRadius, 64, 64);
    const earthMaterial = new THREE.MeshStandardMaterial({
      map: createEarthTexture(activeLayer),
      roughness: 0.7,
      metalness: 0.15,
      bumpScale: 0.05,
    });
    const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
    globeGroup.add(earthMesh);
    earthMeshRef.current = earthMesh;

    // 5. Cloud Sphere
    const cloudsGeometry = new THREE.SphereGeometry(earthRadius * 1.015, 48, 48);
    const cloudsMaterial = new THREE.MeshStandardMaterial({
      map: createCloudsTexture(),
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const cloudsMesh = new THREE.Mesh(cloudsGeometry, cloudsMaterial);
    globeGroup.add(cloudsMesh);
    cloudsMeshRef.current = cloudsMesh;

    // 6. Atmospheric Glow Outer Shell (Fresnel-like halo)
    const atmosphereGeometry = new THREE.SphereGeometry(earthRadius * 1.18, 48, 48);
    const atmosphereMaterial = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.65 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.2);
          gl_FragColor = vec4(0.06, 0.72, 0.51, 1.0) * intensity * 0.9;
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
      depthWrite: false,
    });
    const atmosphereMesh = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    scene.add(atmosphereMesh);

    // 7. Background Starfield / Dust Particles
    const starsGeometry = new THREE.BufferGeometry();
    const starCount = 600;
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i += 3) {
      starPositions[i] = (Math.random() - 0.5) * 40;
      starPositions[i + 1] = (Math.random() - 0.5) * 40;
      starPositions[i + 2] = (Math.random() - 0.5) * 40;
    }
    starsGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starsMaterial = new THREE.PointsMaterial({
      color: 0x10b981,
      size: 0.04,
      transparent: true,
      opacity: 0.6,
    });
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);

    // 8. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffffff, 1.8);
    sunLight.position.set(5, 3, 5);
    scene.add(sunLight);

    const backRimLight = new THREE.DirectionalLight(0x10b981, 0.8);
    backRimLight.position.set(-5, -2, -5);
    scene.add(backRimLight);

    // 9. Hotspot Pins on Globe
    const pinGroup = new THREE.Group();
    globeGroup.add(pinGroup);
    layerMeshesRef.current = pinGroup;
    pinMeshesRef.current = [];

    globeHotspots.forEach((hotspot) => {
      const pos = latLngToVector3(hotspot.lat, hotspot.lng, earthRadius * 1.02);

      // Pin root group
      const pinObj = new THREE.Group();
      pinObj.position.copy(pos);
      pinObj.lookAt(new THREE.Vector3(0, 0, 0)); // Point towards earth center

      // Glowing marker beacon
      const pinGeo = new THREE.SphereGeometry(0.045, 16, 16);
      const pinColor =
        hotspot.riskLevel === 'Critical'
          ? 0xef4444
          : hotspot.riskLevel === 'Severe'
          ? 0xf59e0b
          : 0x10b981;

      const pinMat = new THREE.MeshBasicMaterial({
        color: pinColor,
      });
      const pinSphere = new THREE.Mesh(pinGeo, pinMat);
      pinObj.add(pinSphere);

      // Outer pulse ring
      const ringGeo = new THREE.RingGeometry(0.05, 0.08, 24);
      const ringMat = new THREE.MeshBasicMaterial({
        color: pinColor,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.7,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      pinObj.add(ringMesh);

      pinGroup.add(pinObj);
      pinMeshesRef.current.push({ mesh: pinSphere, hotspot });
    });

    // 10. Mouse Interaction & Raycasting
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      isDraggingRef.current = true;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      prevMousePosRef.current = { x: clientX, y: clientY };
    };

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      if (isDraggingRef.current && globeGroupRef.current) {
        const deltaX = clientX - prevMousePosRef.current.x;
        const deltaY = clientY - prevMousePosRef.current.y;

        globeGroupRef.current.rotation.y += deltaX * 0.005;
        globeGroupRef.current.rotation.x += deltaY * 0.005;

        // Clamp x rotation to avoid flipping upside down
        globeGroupRef.current.rotation.x = Math.max(-Math.PI / 2.2, Math.min(Math.PI / 2.2, globeGroupRef.current.rotation.x));

        prevMousePosRef.current = { x: clientX, y: clientY };
        rotationVelocityRef.current = { x: deltaY * 0.001, y: deltaX * 0.001 };
      }

      // Raycasting for hover
      if (mountRef.current && cameraRef.current && !('touches' in e)) {
        const rect = mountRef.current.getBoundingClientRect();
        mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

        raycaster.setFromCamera(mouse, cameraRef.current);
        const interactiveMeshes = pinMeshesRef.current.map((item) => item.mesh);
        const intersects = raycaster.intersectObjects(interactiveMeshes, true);

        if (intersects.length > 0) {
          const hit = pinMeshesRef.current.find(
            (item) => item.mesh === intersects[0].object || item.mesh.children.includes(intersects[0].object)
          );
          if (hit) {
            setHoveredHotspot(hit.hotspot);
            mount.style.cursor = 'pointer';
            return;
          }
        }
        setHoveredHotspot(null);
        mount.style.cursor = isDraggingRef.current ? 'grabbing' : 'grab';
      }
    };

    const onPointerUp = () => {
      isDraggingRef.current = false;
      if (mountRef.current) {
        mountRef.current.style.cursor = 'grab';
      }
    };

    const onClick = (e: MouseEvent) => {
      if (mountRef.current && cameraRef.current) {
        const rect = mountRef.current.getBoundingClientRect();
        mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

        raycaster.setFromCamera(mouse, cameraRef.current);
        const interactiveMeshes = pinMeshesRef.current.map((item) => item.mesh);
        const intersects = raycaster.intersectObjects(interactiveMeshes, true);

        if (intersects.length > 0) {
          const hit = pinMeshesRef.current.find(
            (item) => item.mesh === intersects[0].object || item.mesh.children.includes(intersects[0].object)
          );
          if (hit) {
            setSelectedHotspot(hit.hotspot);
            if (onHotspotSelect) {
              onHotspotSelect(hit.hotspot);
            }
          }
        }
      }
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (cameraRef.current) {
        cameraRef.current.position.z += e.deltaY * 0.003;
        cameraRef.current.position.z = Math.max(3.2, Math.min(8.0, cameraRef.current.position.z));
      }
    };

    const domElement = renderer.domElement;
    domElement.style.cursor = 'grab';
    domElement.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);
    domElement.addEventListener('click', onClick);
    domElement.addEventListener('wheel', onWheel, { passive: false });

    // Touch support
    domElement.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);

    // 11. Responsive Resize
    const handleResize = () => {
      if (!mountRef.current || !rendererRef.current || !cameraRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // 12. Animation Loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (globeGroupRef.current) {
        if (!isDraggingRef.current && autoRotateRef.current) {
          globeGroupRef.current.rotation.y += 0.0018;
        }
      }

      if (cloudsMeshRef.current) {
        cloudsMeshRef.current.rotation.y += 0.0024;
      }

      // Animate hotspot beacon rings
      pinMeshesRef.current.forEach((item) => {
        const ring = item.mesh.parent?.children[1];
        if (ring) {
          ring.rotation.z += 0.02;
        }
      });

      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      domElement.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      domElement.removeEventListener('click', onClick);
      domElement.removeEventListener('wheel', onWheel);
      domElement.removeEventListener('touchstart', onPointerDown);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchend', onPointerUp);

      renderer.dispose();
      if (mount && mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  const handleZoom = (direction: 'in' | 'out') => {
    if (cameraRef.current) {
      const step = direction === 'in' ? -0.5 : 0.5;
      cameraRef.current.position.z = Math.max(3.2, Math.min(8.0, cameraRef.current.position.z + step));
    }
  };

  const handleResetView = () => {
    if (globeGroupRef.current && cameraRef.current) {
      globeGroupRef.current.rotation.set(0.2, 0, 0);
      cameraRef.current.position.set(0, 0, 5.2);
    }
  };

  return (
    <div className={`relative w-full ${heightClass} rounded-2xl overflow-hidden glass-panel flex flex-col`}>
      {/* 3D Canvas Mount Point */}
      <div ref={mountRef} className="w-full h-full flex-1 touch-none" />

      {/* Top Floating Overlay Badge */}
      <div className="absolute top-4 left-4 z-10 flex flex-wrap items-center gap-2 pointer-events-none">
        <div className="flex items-center gap-2 bg-climate-dark/80 backdrop-blur-md border border-climate-border px-3 py-1.5 rounded-full text-xs font-medium text-emerald-400 pointer-events-auto">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          Interactive 3D WebGL Earth
        </div>
        {hoveredHotspot && (
          <div className="bg-climate-dark/90 backdrop-blur-md border border-emerald-500/50 px-3 py-1.5 rounded-full text-xs text-white shadow-lg animate-fadeIn pointer-events-auto">
            📍 <span className="font-semibold text-emerald-300">{hoveredHotspot.title}</span> ({hoveredHotspot.anomalyText})
          </div>
        )}
      </div>

      {/* Control Buttons (Right Side) */}
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
        <button
          onClick={() => setAutoRotate(!autoRotate)}
          className={`p-2.5 rounded-xl border backdrop-blur-md transition-all ${
            autoRotate
              ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300 shadow-emerald-500/20'
              : 'bg-climate-dark/80 border-climate-border text-slate-300 hover:text-white'
          }`}
          title={autoRotate ? 'Pause Rotation' : 'Auto Rotate'}
        >
          <RotateCw className={`w-4 h-4 ${autoRotate ? 'animate-spin-slow' : ''}`} />
        </button>

        <button
          onClick={() => handleZoom('in')}
          className="p-2.5 rounded-xl border bg-climate-dark/80 border-climate-border text-slate-300 hover:text-white hover:border-emerald-500/40 backdrop-blur-md transition-all"
          title="Zoom In"
        >
          <ZoomIn className="w-4 h-4" />
        </button>

        <button
          onClick={() => handleZoom('out')}
          className="p-2.5 rounded-xl border bg-climate-dark/80 border-climate-border text-slate-300 hover:text-white hover:border-emerald-500/40 backdrop-blur-md transition-all"
          title="Zoom Out"
        >
          <ZoomOut className="w-4 h-4" />
        </button>

        <button
          onClick={handleResetView}
          className="p-2.5 rounded-xl border bg-climate-dark/80 border-climate-border text-slate-300 hover:text-white hover:border-emerald-500/40 backdrop-blur-md transition-all"
          title="Reset Orientation"
        >
          <Compass className="w-4 h-4" />
        </button>
      </div>

      {/* Bottom Layer Selector Bar */}
      {showControlBar && (
        <div className="absolute bottom-4 left-4 right-4 z-10 flex flex-wrap items-center justify-between gap-3 bg-climate-dark/85 backdrop-blur-xl border border-climate-border p-2.5 rounded-xl shadow-2xl">
          <div className="flex items-center gap-1.5 text-xs text-slate-300 font-medium px-2">
            <Layers className="w-4 h-4 text-emerald-400" />
            <span className="hidden sm:inline">Climate Layers:</span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => setActiveLayer('temperature')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeLayer === 'temperature'
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`}
            >
              🔥 Temp Anomaly
            </button>

            <button
              onClick={() => setActiveLayer('co2')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeLayer === 'co2'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`}
            >
              ☁️ CO₂ Plumes
            </button>

            <button
              onClick={() => setActiveLayer('seaLevel')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeLayer === 'seaLevel'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`}
            >
              🌊 Sea Level Risk
            </button>

            <button
              onClick={() => setActiveLayer('deforestation')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeLayer === 'deforestation'
                  ? 'bg-lime-500/20 text-lime-300 border border-lime-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`}
            >
              🌳 Forest Loss
            </button>
          </div>

          <div className="hidden lg:flex items-center gap-2 text-[11px] text-slate-400 pr-2">
            <Info className="w-3.5 h-3.5 text-emerald-400" />
            <span>Click red hotspot pins to inspect regions</span>
          </div>
        </div>
      )}

      {/* Selected Hotspot Modal Popup */}
      {selectedHotspot && (
        <div className="absolute inset-0 z-30 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-climate-card border border-emerald-500/40 rounded-2xl max-w-md w-full p-6 shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setSelectedHotspot(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">{selectedHotspot.imagePlaceholder}</span>
              <div>
                <span
                  className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider mb-1 ${
                    selectedHotspot.riskLevel === 'Critical'
                      ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                      : selectedHotspot.riskLevel === 'Severe'
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  }`}
                >
                  {selectedHotspot.riskLevel} Risk Zone
                </span>
                <h3 className="text-lg font-bold text-white leading-tight">{selectedHotspot.title}</h3>
              </div>
            </div>

            <div className="bg-climate-dark/60 border border-climate-border p-3 rounded-xl mb-4 text-xs font-mono text-emerald-400 flex items-center justify-between">
              <span>Observed Climate Metric:</span>
              <span className="font-bold text-amber-300">{selectedHotspot.anomalyText}</span>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed mb-6">
              {selectedHotspot.summary}
            </p>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setSelectedHotspot(null)}
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs transition-all shadow-lg shadow-emerald-900/30"
              >
                Close Hotspot Inspector
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
