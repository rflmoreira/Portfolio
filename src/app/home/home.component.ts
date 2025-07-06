import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';

declare var THREE: any;

@Component({
  selector: 'app-home',
  standalone: true, // Marca o componente como standalone
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {
  
  private scene: any;
  private camera: any;
  private renderer: any;
  private controls: any;
  private logoGroup: any;
  private diamondOutlines: any[] = [];
  private animationId: number | null = null;

  constructor() { }

  ngOnInit() {
    window.scroll(0, 0);
    // Remove o carregamento do Three.js daqui pois será feito no AfterViewInit
  }

  ngAfterViewInit() {
    // Aguarda o Three.js carregar completamente
    this.waitForThreeJS();
  }

  ngOnDestroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    if (this.renderer) {
      this.renderer.dispose();
    }
  }

  private loadThreeJS() {
    return new Promise<void>((resolve) => {
      // Verifica se o Three.js já foi carregado
      if ((window as any).THREE) {
        resolve();
        return;
      }

      // Carrega Three.js dinamicamente
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
      script.onload = () => {
        // Carrega OrbitControls após Three.js
        const controlsScript = document.createElement('script');
        controlsScript.src = 'https://threejs.org/examples/js/controls/OrbitControls.js';
        controlsScript.onload = () => {
          resolve();
        };
        controlsScript.onerror = () => {
          // Se OrbitControls falhar, continua sem os controles
          console.warn('OrbitControls não pôde ser carregado, continuando sem controles de mouse');
          resolve();
        };
        document.head.appendChild(controlsScript);
      };
      script.onerror = () => {
        console.error('Erro ao carregar Three.js');
        resolve(); // Resolve mesmo com erro para não travar
      };
      document.head.appendChild(script);
    });
  }

  private async waitForThreeJS() {
    await this.loadThreeJS();
    // Aguarda um pouco mais para garantir que tudo foi carregado
    setTimeout(() => {
      this.init3DAnimation();
    }, 500);
  }

  private init3DAnimation() {
    const container = document.getElementById('logo-animation-container');
    const fallback = document.getElementById('animation-fallback');
    
    if (!container) {
      console.error('Container não encontrado');
      return;
    }

    if (!(window as any).THREE) {
      console.error('Three.js não carregado');
      return;
    }

    const THREE = (window as any).THREE;

    // Cena
    this.scene = new THREE.Scene();

    // Câmera
    const containerRect = container.getBoundingClientRect();
    this.camera = new THREE.PerspectiveCamera(75, containerRect.width / containerRect.height, 0.1, 1000);
    this.camera.position.z = 10; // Reduzido de 15 para 10 para deixar mais próximo

    // Renderizador
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(containerRect.width, containerRect.height);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setClearColor(0x000000, 0); // Fundo transparente
    
    // Esconde o fallback e adiciona o canvas
    if (fallback) {
      fallback.style.display = 'none';
    }
    container.appendChild(this.renderer.domElement);

    // Controles da câmera com melhor verificação
    try {
      if (THREE.OrbitControls) {
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.screenSpacePanning = false;
        this.controls.enableRotate = true;
        this.controls.enableZoom = false; // Desabilita o zoom
        this.controls.enablePan = false;
        
        // Configurações específicas para dispositivos móveis
        this.controls.touches = {
          ONE: THREE.TOUCH.ROTATE,
          TWO: THREE.TOUCH.DOLLY_PAN
        };
        
        // Adiciona estilos para melhor experiência touch
        this.renderer.domElement.style.touchAction = 'none';
        
        console.log('OrbitControls inicializado com sucesso - Desktop e Mobile');
      } else {
        console.warn('OrbitControls não disponível, criando controles básicos');
        this.addBasicControls(container);
      }
    } catch (e) {
      console.warn('Erro ao inicializar OrbitControls:', e);
      this.addBasicControls(container);
    }

    // Iluminação
    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
    directionalLight.position.set(10, 10, 10);
    this.scene.add(directionalLight);

    // Material
    const metallicMaterial = new THREE.MeshStandardMaterial({
      color: 0xc0c0c0,
      metalness: 1.0,
      roughness: 0.4,
    });

    // Geometria (Criação do Logo)
    this.logoGroup = new THREE.Group();
    const numberOfDiamonds = 5;
    const initialSize = 8; // Aumentado de 6 para 8
    const thickness = 0.4; // Aumentado de 0.3 para 0.4

    // Cria vários contornos de diamante concêntricos
    for (let i = 0; i < numberOfDiamonds; i++) {
      const size = initialSize - i * 1.5; // Aumentado de 1.2 para 1.5
      const diamond = this.createDiamondOutline(size, thickness, metallicMaterial);
      this.diamondOutlines.push(diamond);
      this.logoGroup.add(diamond);
    }

    this.scene.add(this.logoGroup);

    // Evento de redimensionamento
    window.addEventListener('resize', () => this.onWindowResize(container), false);

    // Inicia a animação
    this.animate();

    console.log('Animação 3D inicializada com sucesso');
  }

  private createDiamondOutline(size: number, thickness: number, material: any) {
    const THREE = (window as any).THREE;
    const diamondGroup = new THREE.Group();
    const segmentLength = Math.sqrt(2 * (size / 2) ** 2);

    const segmentGeometry = new THREE.BoxGeometry(segmentLength, thickness, thickness);

    const positions = [
      { x: size / 4, y: size / 4, z: 0 },
      { x: size / 4, y: -size / 4, z: 0 },
      { x: -size / 4, y: -size / 4, z: 0 },
      { x: -size / 4, y: size / 4, z: 0 }
    ];
    const rotations = [
      -Math.PI / 4,
      Math.PI / 4,
      -Math.PI / 4,
      Math.PI / 4
    ];

    for (let i = 0; i < 4; i++) {
      const segment = new THREE.Mesh(segmentGeometry, material);
      segment.position.set(positions[i].x, positions[i].y, positions[i].z);
      segment.rotation.z = rotations[i];
      diamondGroup.add(segment);
    }

    return diamondGroup;
  }

  private addBasicControls(container: HTMLElement) {
    let isMouseDown = false;
    let isTouching = false;
    let mouseX = 0;
    let mouseY = 0;
    let touchX = 0;
    let touchY = 0;

    // Eventos de mouse para desktop
    container.addEventListener('mousedown', (event) => {
      isMouseDown = true;
      mouseX = event.clientX;
      mouseY = event.clientY;
      container.style.cursor = 'grabbing';
    });

    container.addEventListener('mousemove', (event) => {
      if (!isMouseDown || !this.logoGroup) return;

      const deltaX = event.clientX - mouseX;
      const deltaY = event.clientY - mouseY;

      this.logoGroup.rotation.y += deltaX * 0.01;
      this.logoGroup.rotation.x += deltaY * 0.01;

      mouseX = event.clientX;
      mouseY = event.clientY;
    });

    container.addEventListener('mouseup', () => {
      isMouseDown = false;
      container.style.cursor = 'grab';
    });

    container.addEventListener('mouseleave', () => {
      isMouseDown = false;
      container.style.cursor = 'grab';
    });

    // Eventos de toque para dispositivos móveis
    container.addEventListener('touchstart', (event) => {
      event.preventDefault();
      isTouching = true;
      const touch = event.touches[0];
      touchX = touch.clientX;
      touchY = touch.clientY;
    }, { passive: false });

    container.addEventListener('touchmove', (event) => {
      event.preventDefault();
      if (!isTouching || !this.logoGroup || event.touches.length === 0) return;

      const touch = event.touches[0];
      const deltaX = touch.clientX - touchX;
      const deltaY = touch.clientY - touchY;

      this.logoGroup.rotation.y += deltaX * 0.01;
      this.logoGroup.rotation.x += deltaY * 0.01;

      touchX = touch.clientX;
      touchY = touch.clientY;
    }, { passive: false });

    container.addEventListener('touchend', (event) => {
      event.preventDefault();
      isTouching = false;
    }, { passive: false });

    container.addEventListener('touchcancel', (event) => {
      event.preventDefault();
      isTouching = false;
    }, { passive: false });

    // Define o cursor inicial para desktop
    container.style.cursor = 'grab';
    
    // Adiciona estilos CSS para melhor experiência touch
    container.style.touchAction = 'none';
    container.style.userSelect = 'none';
    container.style.webkitUserSelect = 'none';

    console.log('Controles básicos adicionados - Desktop (mouse) e Mobile (touch)');
  }

  private onWindowResize(container: HTMLElement) {
    if (!this.camera || !this.renderer) return;

    const containerRect = container.getBoundingClientRect();
    this.camera.aspect = containerRect.width / containerRect.height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(containerRect.width, containerRect.height);
  }

  private animate() {
    this.animationId = requestAnimationFrame(() => this.animate());

    // Animações
    if (this.logoGroup) {
      this.logoGroup.rotation.y += 0.005;
      this.logoGroup.rotation.x += 0.001;
    }

    this.diamondOutlines.forEach((diamond, index) => {
      const speed = 0.01;
      if (index % 2 === 0) {
        diamond.rotation.z += speed;
      } else {
        diamond.rotation.z -= speed;
      }
    });

    if (this.controls) {
      this.controls.update();
    }

    if (this.renderer && this.scene && this.camera) {
      this.renderer.render(this.scene, this.camera);
    }
  }
}