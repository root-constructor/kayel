import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import './Hero.css'

const Hero = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        if (!canvasRef.current) return

        // Scene setup
        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
        const renderer = new THREE.WebGLRenderer({
            canvas: canvasRef.current,
            alpha: true,
            antialias: true
        })

        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        camera.position.z = 5

        // Create particles
        const particlesGeometry = new THREE.BufferGeometry()
        const particlesCount = 1000
        const posArray = new Float32Array(particlesCount * 3)

        for (let i = 0; i < particlesCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 10
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3))

        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.02,
            color: 0x00ffff,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        })

        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial)
        scene.add(particlesMesh)

        // Create floating geometric shapes
        const geometries = [
            new THREE.OctahedronGeometry(0.3),
            new THREE.TetrahedronGeometry(0.3),
            new THREE.IcosahedronGeometry(0.3)
        ]

        const material = new THREE.MeshBasicMaterial({
            color: 0x00ffff,
            wireframe: true,
            transparent: true,
            opacity: 0.3
        })

        const shapes: THREE.Mesh[] = []
        for (let i = 0; i < 5; i++) {
            const geometry = geometries[Math.floor(Math.random() * geometries.length)]
            const mesh = new THREE.Mesh(geometry, material)
            mesh.position.set(
                (Math.random() - 0.5) * 8,
                (Math.random() - 0.5) * 8,
                (Math.random() - 0.5) * 5
            )
            shapes.push(mesh)
            scene.add(mesh)
        }

        // Mouse movement effect
        let mouseX = 0
        let mouseY = 0

        const handleMouseMove = (event: MouseEvent) => {
            mouseX = (event.clientX / window.innerWidth) * 2 - 1
            mouseY = -(event.clientY / window.innerHeight) * 2 + 1
        }

        window.addEventListener('mousemove', handleMouseMove)

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate)

            // Rotate particles
            particlesMesh.rotation.y += 0.001
            particlesMesh.rotation.x += 0.0005

            // Animate shapes
            shapes.forEach((shape, index) => {
                shape.rotation.x += 0.01 * (index + 1)
                shape.rotation.y += 0.01 * (index + 1)
                shape.position.y += Math.sin(Date.now() * 0.001 + index) * 0.001
            })

            // Camera movement based on mouse
            camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.05
            camera.position.y += (mouseY * 0.5 - camera.position.y) * 0.05

            renderer.render(scene, camera)
        }

        animate()

        // Handle resize
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight
            camera.updateProjectionMatrix()
            renderer.setSize(window.innerWidth, window.innerHeight)
        }

        window.addEventListener('resize', handleResize)

        // Cleanup
        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('resize', handleResize)
            renderer.dispose()
            particlesGeometry.dispose()
            particlesMaterial.dispose()
            geometries.forEach(geo => geo.dispose())
            material.dispose()
        }
    }, [])

    return (
        <section id="home" className="hero">
            <canvas ref={canvasRef} className="webgl-background" />

            <div className="hero-content container">
                <h1 className="hero-title">
                    Building the <span className="gradient-text">Future</span><br />
                    of Technology
                </h1>

                <p className="hero-subtitle">
                    Premium tech consultancy delivering cutting-edge solutions<br />
                    for forward-thinking businesses
                </p>

                <div className="hero-cta">
                    <a href="#contact" className="btn btn-primary">Start Your Project</a>
                    <a href="#services" className="btn btn-secondary">Our Services</a>
                </div>

                <div className="scroll-indicator">
                    <div className="scroll-line"></div>
                </div>
            </div>
        </section>
    )
}

export default Hero
