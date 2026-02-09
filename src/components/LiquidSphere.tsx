import { useRef, useEffect } from 'react'
import * as THREE from 'three'

interface LiquidSphereProps {
    size?: number
}

const LiquidSphere = ({ size = 400 }: LiquidSphereProps) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const mouseRef = useRef({ x: 0, y: 0 })
    const targetMouseRef = useRef({ x: 0, y: 0 })

    useEffect(() => {
        if (!containerRef.current) return

        const container = containerRef.current
        const width = size
        const height = size

        // Scene setup
        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000)
        camera.position.z = 4

        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance'
        })
        renderer.setSize(width, height)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        container.appendChild(renderer.domElement)

        // Create sphere geometry with more detail for smooth deformation
        const geometry = new THREE.IcosahedronGeometry(1.2, 64)
        const originalPositions = geometry.attributes.position.array.slice()

        // Liquid metal shader material
        const material = new THREE.ShaderMaterial({
            uniforms: {
                uTime: { value: 0 },
                uMouse: { value: new THREE.Vector2(0, 0) },
                uResolution: { value: new THREE.Vector2(width, height) }
            },
            vertexShader: `
                uniform float uTime;
                uniform vec2 uMouse;
                
                varying vec3 vNormal;
                varying vec3 vPosition;
                varying vec3 vReflect;
                
                // Simplex noise function
                vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
                vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
                vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
                vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
                
                float snoise(vec3 v) {
                    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
                    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
                    
                    vec3 i  = floor(v + dot(v, C.yyy));
                    vec3 x0 = v - i + dot(i, C.xxx);
                    
                    vec3 g = step(x0.yzx, x0.xyz);
                    vec3 l = 1.0 - g;
                    vec3 i1 = min(g.xyz, l.zxy);
                    vec3 i2 = max(g.xyz, l.zxy);
                    
                    vec3 x1 = x0 - i1 + C.xxx;
                    vec3 x2 = x0 - i2 + C.yyy;
                    vec3 x3 = x0 - D.yyy;
                    
                    i = mod289(i);
                    vec4 p = permute(permute(permute(
                        i.z + vec4(0.0, i1.z, i2.z, 1.0))
                        + i.y + vec4(0.0, i1.y, i2.y, 1.0))
                        + i.x + vec4(0.0, i1.x, i2.x, 1.0));
                        
                    float n_ = 0.142857142857;
                    vec3 ns = n_ * D.wyz - D.xzx;
                    
                    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
                    
                    vec4 x_ = floor(j * ns.z);
                    vec4 y_ = floor(j - 7.0 * x_);
                    
                    vec4 x = x_ *ns.x + ns.yyyy;
                    vec4 y = y_ *ns.x + ns.yyyy;
                    vec4 h = 1.0 - abs(x) - abs(y);
                    
                    vec4 b0 = vec4(x.xy, y.xy);
                    vec4 b1 = vec4(x.zw, y.zw);
                    
                    vec4 s0 = floor(b0)*2.0 + 1.0;
                    vec4 s1 = floor(b1)*2.0 + 1.0;
                    vec4 sh = -step(h, vec4(0.0));
                    
                    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
                    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
                    
                    vec3 p0 = vec3(a0.xy, h.x);
                    vec3 p1 = vec3(a0.zw, h.y);
                    vec3 p2 = vec3(a1.xy, h.z);
                    vec3 p3 = vec3(a1.zw, h.w);
                    
                    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
                    p0 *= norm.x;
                    p1 *= norm.y;
                    p2 *= norm.z;
                    p3 *= norm.w;
                    
                    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
                    m = m * m;
                    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
                }
                
                void main() {
                    vNormal = normal;
                    vPosition = position;
                    
                    // Mouse influence on deformation
                    float mouseInfluence = length(uMouse) * 0.3;
                    vec3 mouseDir = vec3(uMouse.x, uMouse.y, 0.0);
                    
                    // Liquid deformation
                    float noise1 = snoise(position * 2.0 + uTime * 0.5) * 0.15;
                    float noise2 = snoise(position * 4.0 - uTime * 0.3) * 0.08;
                    float noise3 = snoise(position * 1.0 + uTime * 0.2 + mouseDir) * mouseInfluence;
                    
                    vec3 newPosition = position + normal * (noise1 + noise2 + noise3);
                    
                    // Calculate reflection vector for metallic look
                    vec3 worldPosition = (modelMatrix * vec4(newPosition, 1.0)).xyz;
                    vec3 worldNormal = normalize(mat3(modelMatrix) * normal);
                    vec3 I = normalize(worldPosition - cameraPosition);
                    vReflect = reflect(I, worldNormal);
                    
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
                }
            `,
            fragmentShader: `
                uniform float uTime;
                uniform vec2 uMouse;
                
                varying vec3 vNormal;
                varying vec3 vPosition;
                varying vec3 vReflect;
                
                void main() {
                    // Fresnel effect for metallic rim
                    vec3 viewDirection = normalize(cameraPosition - vPosition);
                    float fresnel = pow(1.0 - dot(viewDirection, vNormal), 3.0);
                    
                    // Liquid metal base colors (chrome/mercury look)
                    vec3 baseColor = vec3(0.7, 0.75, 0.8);
                    vec3 highlightColor = vec3(0.0, 1.0, 1.0); // Cyan accent
                    vec3 shadowColor = vec3(0.1, 0.15, 0.2);
                    
                    // Environment reflection simulation
                    float envReflection = dot(vReflect, vec3(0.0, 1.0, 0.0)) * 0.5 + 0.5;
                    
                    // Lighting
                    vec3 lightDir1 = normalize(vec3(1.0, 1.0, 1.0));
                    vec3 lightDir2 = normalize(vec3(-1.0, 0.5, 0.5));
                    
                    float diff1 = max(dot(vNormal, lightDir1), 0.0);
                    float diff2 = max(dot(vNormal, lightDir2), 0.0) * 0.5;
                    
                    // Specular highlights
                    vec3 halfDir1 = normalize(lightDir1 + viewDirection);
                    float spec1 = pow(max(dot(vNormal, halfDir1), 0.0), 128.0);
                    
                    vec3 halfDir2 = normalize(lightDir2 + viewDirection);
                    float spec2 = pow(max(dot(vNormal, halfDir2), 0.0), 64.0) * 0.5;
                    
                    // Combine for liquid metal effect
                    vec3 color = mix(shadowColor, baseColor, diff1 + diff2);
                    color = mix(color, highlightColor, fresnel * 0.4);
                    color += vec3(spec1 + spec2) * 1.5;
                    color = mix(color, baseColor * 1.2, envReflection * 0.3);
                    
                    // Add subtle color shift based on mouse
                    color += highlightColor * length(uMouse) * 0.15;
                    
                    gl_FragColor = vec4(color, 0.95);
                }
            `,
            transparent: true
        })

        const sphere = new THREE.Mesh(geometry, material)
        scene.add(sphere)

        // Mouse tracking
        const handleMouseMove = (event: MouseEvent) => {
            const rect = container.getBoundingClientRect()
            const x = ((event.clientX - rect.left) / rect.width) * 2 - 1
            const y = -((event.clientY - rect.top) / rect.height) * 2 + 1
            targetMouseRef.current = { x, y }
        }

        const handleMouseLeave = () => {
            targetMouseRef.current = { x: 0, y: 0 }
        }

        container.addEventListener('mousemove', handleMouseMove)
        container.addEventListener('mouseleave', handleMouseLeave)

        // Animation loop
        let animationId: number
        const clock = new THREE.Clock()

        const animate = () => {
            animationId = requestAnimationFrame(animate)

            const elapsed = clock.getElapsedTime()

            // Smooth mouse follow
            mouseRef.current.x += (targetMouseRef.current.x - mouseRef.current.x) * 0.05
            mouseRef.current.y += (targetMouseRef.current.y - mouseRef.current.y) * 0.05

            // Update uniforms
            material.uniforms.uTime.value = elapsed
            material.uniforms.uMouse.value.set(mouseRef.current.x, mouseRef.current.y)

            // Gentle rotation
            sphere.rotation.y = elapsed * 0.15 + mouseRef.current.x * 0.3
            sphere.rotation.x = Math.sin(elapsed * 0.2) * 0.1 + mouseRef.current.y * 0.2

            renderer.render(scene, camera)
        }

        animate()

        // Cleanup
        return () => {
            cancelAnimationFrame(animationId)
            container.removeEventListener('mousemove', handleMouseMove)
            container.removeEventListener('mouseleave', handleMouseLeave)
            container.removeChild(renderer.domElement)
            geometry.dispose()
            material.dispose()
            renderer.dispose()
        }
    }, [size])

    return (
        <div
            ref={containerRef}
            className="liquid-sphere-container"
            style={{
                width: size,
                height: size,
                cursor: 'pointer'
            }}
        />
    )
}

export default LiquidSphere
