import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { FallbackGlobe } from './FallbackGlobe';

export const ThreeGlobe: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [hasWebGLError, setHasWebGLError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check WebGL availability
    const checkWebGL = () => {
      try {
        const canvas = document.createElement('canvas');
        return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
      } catch {
        return false;
      }
    };

    if (!checkWebGL()) {
      setHasWebGLError(true);
      return;
    }

    let animationFrameId: number;
    let renderer: THREE.WebGLRenderer | null = null;

    try {
      // Scene & Camera
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        45,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
      );
      camera.position.z = 4.8;

      // Renderer with antialias and alpha
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      // Globe Group
      const globeGroup = new THREE.Group();
      scene.add(globeGroup);

      // Inner Core Globe
      const coreGeometry = new THREE.SphereGeometry(1.6, 48, 48);
      const coreMaterial = new THREE.MeshPhongMaterial({
        color: new THREE.Color('#03180f'),
        emissive: new THREE.Color('#052517'),
        specular: new THREE.Color('#10b981'),
        shininess: 30,
        transparent: true,
        opacity: 0.95,
      });
      const coreSphere = new THREE.Mesh(coreGeometry, coreMaterial);
      globeGroup.add(coreSphere);

      // Wireframe Grid Mesh
      const wireframeGeometry = new THREE.SphereGeometry(1.62, 32, 24);
      const wireframeMaterial = new THREE.MeshBasicMaterial({
        color: new THREE.Color('#10b981'),
        wireframe: true,
        transparent: true,
        opacity: 0.18,
      });
      const wireframeMesh = new THREE.Mesh(wireframeGeometry, wireframeMaterial);
      globeGroup.add(wireframeMesh);

      // Atmospheric Outer Glow Shell
      const glowGeometry = new THREE.SphereGeometry(1.85, 32, 32);
      const glowMaterial = new THREE.ShaderMaterial({
        uniforms: {
          glowColor: { value: new THREE.Color('#a3e635') },
        },
        vertexShader: `
          varying vec3 vNormal;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          varying vec3 vNormal;
          uniform vec3 glowColor;
          void main() {
            float intensity = pow(0.65 - dot(vNormal, vec3(0, 0, 1.0)), 2.0);
            gl_FragColor = vec4(glowColor, intensity * 0.45);
          }
        `,
        blending: THREE.AdditiveBlending,
        side: THREE.BackSide,
        transparent: true,
      });
      const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial);
      globeGroup.add(glowMesh);

      // Environmental Surface Dot Cloud (Generating natural landmass-like clusters)
      const dotCount = 1800;
      const dotGeometry = new THREE.BufferGeometry();
      const dotPositions = new Float32Array(dotCount * 3);
      const dotColors = new Float32Array(dotCount * 3);
      const color1 = new THREE.Color('#10b981');
      const color2 = new THREE.Color('#bef264');

      for (let i = 0; i < dotCount; i++) {
        const phi = Math.acos(-1 + (2 * i) / dotCount);
        const theta = Math.sqrt(dotCount * Math.PI) * phi;
        const radius = 1.63 + (Math.random() * 0.03);

        const x = radius * Math.cos(theta) * Math.sin(phi);
        const y = radius * Math.sin(theta) * Math.sin(phi);
        const z = radius * Math.cos(phi);

        dotPositions[i * 3] = x;
        dotPositions[i * 3 + 1] = y;
        dotPositions[i * 3 + 2] = z;

        const mixedColor = color1.clone().lerp(color2, Math.random() * 0.8);
        dotColors[i * 3] = mixedColor.r;
        dotColors[i * 3 + 1] = mixedColor.g;
        dotColors[i * 3 + 2] = mixedColor.b;
      }

      dotGeometry.setAttribute('position', new THREE.BufferAttribute(dotPositions, 3));
      dotGeometry.setAttribute('color', new THREE.BufferAttribute(dotColors, 3));

      const dotMaterial = new THREE.PointsMaterial({
        size: 0.03,
        vertexColors: true,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending,
      });
      const pointsMesh = new THREE.Points(dotGeometry, dotMaterial);
      globeGroup.add(pointsMesh);

      // Orbiting Equatorial Eco Ring
      const ringGeometry = new THREE.RingGeometry(2.1, 2.22, 64);
      const ringMaterial = new THREE.MeshBasicMaterial({
        color: new THREE.Color('#10b981'),
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.25,
      });
      const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
      ringMesh.rotation.x = Math.PI / 2.3;
      ringMesh.rotation.y = Math.PI / 6;
      globeGroup.add(ringMesh);

      // Secondary Dotted Orbit Ring
      const ring2Geometry = new THREE.BufferGeometry();
      const ring2Points = 120;
      const ring2Pos = new Float32Array(ring2Points * 3);
      for (let i = 0; i < ring2Points; i++) {
        const angle = (i / ring2Points) * Math.PI * 2;
        const r = 2.4;
        ring2Pos[i * 3] = Math.cos(angle) * r;
        ring2Pos[i * 3 + 1] = Math.sin(angle) * (r * 0.35);
        ring2Pos[i * 3 + 2] = Math.sin(angle) * r;
      }
      ring2Geometry.setAttribute('position', new THREE.BufferAttribute(ring2Pos, 3));
      const ring2Material = new THREE.PointsMaterial({
        color: new THREE.Color('#bef264'),
        size: 0.035,
        transparent: true,
        opacity: 0.6,
      });
      const ring2PointsMesh = new THREE.Points(ring2Geometry, ring2Material);
      globeGroup.add(ring2PointsMesh);

      // KRCE Node Marker Beacon (~Trichy location on globe coordinates)
      // Lat 10.8° N, Long 78.7° E
      const lat = 10.8 * (Math.PI / 180);
      const lon = (78.7 - 90) * (Math.PI / 180);
      const beaconRadius = 1.66;
      const beaconX = beaconRadius * Math.cos(lat) * Math.cos(lon);
      const beaconY = beaconRadius * Math.sin(lat);
      const beaconZ = beaconRadius * Math.cos(lat) * Math.sin(lon);

      const beaconGeometry = new THREE.SphereGeometry(0.045, 16, 16);
      const beaconMaterial = new THREE.MeshBasicMaterial({
        color: new THREE.Color('#bef264'),
      });
      const beaconMesh = new THREE.Mesh(beaconGeometry, beaconMaterial);
      beaconMesh.position.set(beaconX, beaconY, beaconZ);
      globeGroup.add(beaconMesh);

      // Beacon Pulse Outer Ring
      const pulseGeometry = new THREE.RingGeometry(0.06, 0.09, 32);
      const pulseMaterial = new THREE.MeshBasicMaterial({
        color: new THREE.Color('#10b981'),
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.8,
      });
      const pulseMesh = new THREE.Mesh(pulseGeometry, pulseMaterial);
      pulseMesh.position.set(beaconX * 1.01, beaconY * 1.01, beaconZ * 1.01);
      pulseMesh.lookAt(0, 0, 0);
      globeGroup.add(pulseMesh);

      // Lights
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.65);
      scene.add(ambientLight);

      const dirLight1 = new THREE.DirectionalLight(0xbef264, 1.8);
      dirLight1.position.set(5, 4, 3);
      scene.add(dirLight1);

      const dirLight2 = new THREE.DirectionalLight(0x10b981, 1.2);
      dirLight2.position.set(-5, -3, -2);
      scene.add(dirLight2);

      // Mouse drag / tilt interaction variables
      let isDragging = false;
      let previousMousePosition = { x: 0, y: 0 };
      let targetRotationY = 0;
      let targetRotationX = 0.2;

      const onMouseDown = (e: MouseEvent) => {
        isDragging = true;
        previousMousePosition = { x: e.clientX, y: e.clientY };
      };

      const onMouseMove = (e: MouseEvent) => {
        if (isDragging) {
          const deltaX = e.clientX - previousMousePosition.x;
          const deltaY = e.clientY - previousMousePosition.y;
          targetRotationY += deltaX * 0.005;
          targetRotationX += deltaY * 0.005;
          previousMousePosition = { x: e.clientX, y: e.clientY };
        }
      };

      const onMouseUp = () => {
        isDragging = false;
      };

      const domElem = renderer.domElement;
      domElem.addEventListener('mousedown', onMouseDown);
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);

      // Resize handler
      const handleResize = () => {
        if (!container || !renderer) return;
        const width = container.clientWidth;
        const height = container.clientHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
      };

      window.addEventListener('resize', handleResize);

      // Animation Loop
      let clock = new THREE.Clock();
      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);
        const elapsedTime = clock.getElapsedTime();

        // Slow auto rotation + smooth damping to user drag
        targetRotationY += 0.0025;
        globeGroup.rotation.y += (targetRotationY - globeGroup.rotation.y) * 0.05;
        globeGroup.rotation.x += (targetRotationX - globeGroup.rotation.x) * 0.05;

        // Subtle ring oscillation
        ringMesh.rotation.z = elapsedTime * 0.05;
        ring2PointsMesh.rotation.y = -elapsedTime * 0.08;

        // Pulse beacon animation
        const pulseScale = 1 + Math.sin(elapsedTime * 4) * 0.35;
        pulseMesh.scale.set(pulseScale, pulseScale, pulseScale);
        pulseMaterial.opacity = 0.85 - (pulseScale - 1);

        if (renderer) {
          renderer.render(scene, camera);
        }
      };

      animate();

      return () => {
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener('resize', handleResize);
        domElem.removeEventListener('mousedown', onMouseDown);
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);

        if (container && renderer && renderer.domElement) {
          container.removeChild(renderer.domElement);
        }

        // Dispose geometries and materials
        coreGeometry.dispose();
        coreMaterial.dispose();
        wireframeGeometry.dispose();
        wireframeMaterial.dispose();
        glowGeometry.dispose();
        glowMaterial.dispose();
        dotGeometry.dispose();
        dotMaterial.dispose();
        ringGeometry.dispose();
        ringMaterial.dispose();
        ring2Geometry.dispose();
        ring2Material.dispose();
        beaconGeometry.dispose();
        beaconMaterial.dispose();
        pulseGeometry.dispose();
        pulseMaterial.dispose();
        if (renderer) {
          renderer.dispose();
        }
      };
    } catch (err) {
      console.warn('Three.js initialization notice - switching to fallback globe:', err);
      setHasWebGLError(true);
    }
  }, []);

  if (hasWebGLError) {
    return <FallbackGlobe />;
  }

  return (
    <div
      className="relative w-full h-[360px] md:h-[440px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Ambient Glow */}
      <div className="absolute w-72 h-72 rounded-full bg-emerald-500/15 blur-3xl pointer-events-none" />
      <div className="absolute w-60 h-60 rounded-full bg-lime-400/10 blur-2xl pointer-events-none" />

      {/* Three.js Canvas Container */}
      <div ref={mountRef} className="w-full h-full flex items-center justify-center" />

      {/* Floating Badges */}
      <div className="absolute bottom-3 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-forest-900/80 border border-emerald-500/30 backdrop-blur-md text-[11px] font-mono text-emerald-300 shadow-lg pointer-events-none">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        <span>KRCE GEO-COORDINATES: 10.8° N, 78.7° E</span>
      </div>

      <div className={`absolute top-4 right-4 px-2.5 py-1 rounded-full bg-forest-900/80 border border-lime-400/30 text-[10px] font-mono text-lime-300 backdrop-blur-md transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-60'} pointer-events-none`}>
        ✦ DRAG TO ROTATE 3D GLOBE
      </div>
    </div>
  );
};
