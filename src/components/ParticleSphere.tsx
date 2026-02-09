import { useRef, useEffect } from 'react'
import * as THREE from 'three'

interface ParticleSphereProps {
    size?: number
}

const ParticleSphere = ({ size = 400 }: ParticleSphereProps) => {
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
        camera.position.z = 3.5

        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance'
        })
        renderer.setSize(width, height)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        container.appendChild(renderer.domElement)

        // Geometry: Use SphereGeometry to get the grid-like pattern from the reference
        // High segment count for dense particles
        const geometry = new THREE.SphereGeometry(1, 128, 128)

        // Material: Custom shader for wavy displacement and gradient coloring
        const material = new THREE.ShaderMaterial({
            uniforms: {
                uTime: { value: 0 },
                uMouse: { value: new THREE.Vector2(0, 0) },
                uColor1: { value: new THREE.Color('#00ffff') }, // Cyan
                uColor2: { value: new THREE.Color('#0066ff') }, // Blue
                uColor3: { value: new THREE.Color('#9933ff') }  // Purple
            },
            vertexShader: `
                uniform float uTime;
                uniform vec2 uMouse;
                
                varying vec2 vUv;
                varying float vDisplacement;
                varying vec3 vPos;
                
                // Simplex noise function (simplified)
                vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
                vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
                vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
                vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
                
                float snoise(vec3 v) {
                    const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
                    const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
                    
                    // First corner
                    vec3 i  = floor(v + dot(v, C.yyy) );
                    vec3 x0 = v - i + dot(i, C.xxx) ;
                    
                    // Other corners
                    vec3 g = step(x0.yzx, x0.xyz);
                    vec3 l = 1.0 - g;
                    vec3 i1 = min( g.xyz, l.zxy );
                    vec3 i2 = max( g.xyz, l.zxy );
                    
                    //   x0 = x0 - 0.0 + 0.0 * C.xxx;
                    //   x1 = x0 - i1  + 1.0 * C.xxx;
                    //   x2 = x0 - i2  + 2.0 * C.xxx;
                    //   x3 = x0 - 1.0 + 3.0 * C.xxx;
                    vec3 x1 = x0 - i1 + C.xxx;
                    vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y
                    vec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y
                    
                    // Permutations
                    i = mod289(i);
                    vec4 p = permute( permute( permute( 
                                i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
                            + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
                            + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
                            
                    // Gradients: 7x7 points over a square, mapped onto an octahedron.
                    // The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)
                    float n_ = 0.142857142857; // 1.0/7.0
                    vec3  ns = n_ * D.wyz - D.xzx;
                    
                    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)
                    
                    vec4 x_ = floor(j * ns.z);
                    vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)
                    
                    vec4 x = x_ *ns.x + ns.yyyy;
                    vec4 y = y_ *ns.x + ns.yyyy;
                    vec4 h = 1.0 - abs(x) - abs(y);
                    
                    vec4 b0 = vec4( x.xy, y.xy );
                    vec4 b1 = vec4( x.zw, y.zw );
                    
                    vec4 s0 = floor(b0)*2.0 + 1.0;
                    vec4 s1 = floor(b1)*2.0 + 1.0;
                    vec4 sh = -step(h, vec4(0.0));
                    
                    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
                    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
                    
                    vec3 p0 = vec3(a0.xy,h.x);
                    vec3 p1 = vec3(a0.zw,h.y);
                    vec3 p2 = vec3(a1.xy,h.z);
                    vec3 p3 = vec3(a1.zw,h.w);
                    
                    //Normalise gradients
                    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
                    p0 *= norm.x;
                    p1 *= norm.y;
                    p2 *= norm.z;
                    p3 *= norm.w;
                    
                    // Mix final noise value
                    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
                    m = m * m;
                    return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), 
                                                dot(p2,x2), dot(p3,x3) ) );
                }

                void main() {
                    vUv = uv;
                    
                    // Base position
                    vec3 pos = position;
                    
                    // Add noise-based displacement
                    // Frequency uTime helps animate it
                    float noiseFreq = 1.5;
                    float noiseAmp = 0.4;
                    vec3 noisePos = vec3(pos.x * noiseFreq + uTime * 0.5, pos.y * noiseFreq, pos.z * noiseFreq);
                    float noise = snoise(noisePos);
                    
                    vDisplacement = noise;
                    
                    // Displace along normal
                    vec3 newPos = pos + normal * noise * noiseAmp;
                    
                    // Mouse interaction
                    vec3 mousePos = vec3(uMouse.x * 2.0, uMouse.y * 2.0, 2.0);
                    float dist = distance(pos, mousePos);
                    float interact = smoothstep(2.0, 0.0, dist);
                    newPos += normal * interact * 0.5;

                    vPos = newPos;

                    vec4 mvPosition = modelViewMatrix * vec4(newPos, 1.0);
                    gl_PointSize = 2.5 * (1.0 / -mvPosition.z);
                    gl_Position = projectionMatrix * mvPosition;
                }
            `,
            fragmentShader: `
                uniform vec3 uColor1;
                uniform vec3 uColor2;
                uniform vec3 uColor3;
                
                varying float vDisplacement;
                varying vec3 vPos;
                
                void main() {
                    // Circular point
                    vec2 center = gl_PointCoord - vec2(0.5);
                    if (length(center) > 0.5) discard;
                    
                    // Color mixing based on displacement/position
                    vec3 color;
                    
                    // Mix colors based on the noise value (-1 to 1 mostly)
                    float mixVal = smoothstep(-0.5, 0.5, vDisplacement);
                    
                    // Gradient: Cyan -> Blue -> Purple
                    // Top/Outside: Cyan/Blue
                    // Bottom/Inside: Purple
                    
                    // Use Y position for gradient + displacement
                    float gradientFactor = (vPos.y + 1.0) * 0.5 + vDisplacement * 0.3;
                    
                    if (gradientFactor > 0.6) {
                        color = mix(uColor2, uColor1, (gradientFactor - 0.6) * 2.5);
                    } else {
                        color = mix(uColor3, uColor2, gradientFactor * 1.66);
                    }
                    
                    gl_FragColor = vec4(color, 1.0);
                }
            `,
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        })

        const particles = new THREE.Points(geometry, material)
        scene.add(particles)

        console.log('ParticleSphere: Initialized stylized version')

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

            // Slow rotation
            particles.rotation.y = elapsed * 0.1
            particles.rotation.z = elapsed * 0.05

            renderer.render(scene, camera)
        }

        animate()

        // Cleanup
        return () => {
            cancelAnimationFrame(animationId)
            container.removeEventListener('mousemove', handleMouseMove)
            container.removeEventListener('mouseleave', handleMouseLeave)
            if (container.contains(renderer.domElement)) {
                container.removeChild(renderer.domElement)
            }
            geometry.dispose()
            material.dispose()
            renderer.dispose()
        }
    }, [size])

    return (
        <div
            ref={containerRef}
            className="particle-sphere-container"
            style={{
                width: size,
                height: size,
                cursor: 'pointer',
                position: 'relative'
            }}
        />
    )
}

export default ParticleSphere
