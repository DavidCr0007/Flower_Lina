# Flor para Lina

Tarjeta de cumpleaños interactiva, diseñada para verse en pantalla completa y especialmente en móviles. La experiencia presenta una apertura animada, una felicitación, un jardín con fotos, una carta desplegable y efectos de confeti y sonido.

## Vista general

El proyecto no necesita instalación, compilación ni dependencias externas. El marcado está en [`index.html`](index.html), los estilos en [`assets/css/style.css`](assets/css/style.css) y la lógica en [`assets/js/app.js`](assets/js/app.js). Las ilustraciones principales se generan dinámicamente en SVG y los recursos fotográficos se cargan desde el propio repositorio.

## Ejecutarlo localmente

Puede abrirse `index.html` directamente en un navegador. Para probarlo con un servidor local (recomendado para que las rutas y la vista previa se comporten como en producción), desde la raíz del proyecto ejecute:

```bash
python3 -m http.server 8000
```

Luego visite `http://localhost:8000`.

## Personalización

Edite el objeto `CONFIG`, situado al inicio de [`assets/js/app.js`](assets/js/app.js):

- `nombre`, `edad`, `titulo` y `dedicatoria` cambian los textos de la felicitación.
- `fotos` contiene las rutas de las imágenes del jardín. Actualmente están configuradas las 17 fotos de `Imagenes/`.
- `revelarFotosAlTocar` controla la privacidad inicial de la galería: con `true`, el primer toque revela una foto y el siguiente la amplía; con `false`, se muestran desde el inicio.
- `carta` define el encabezado, párrafos, despedida y firma del pergamino.
- `cancion` define la ruta del audio de fondo. Si no se desea música, elimine o adapte esa parte de la configuración y de la lógica de audio.
- `volumenMusica` controla la ganancia interna de la aplicación. Se limita automáticamente entre 0.50 y 0.75; `0.65` es el valor recomendado.

La interfaz usa una paleta editorial de baja saturación: azul petróleo `#3E6E8E`, marino `#173A57`, dorado antiguo `#B8923A`, terracota `#A8556A`, verde salvia `#6E8B5E` y marfil `#F4ECD8`.

Mantenga exactamente las mayúsculas y minúsculas de los nombres de archivo: los servidores web suelen distinguirlas.

## Estructura

```text
.
├── index.html       # Marcado y metadatos para GitHub Pages
├── assets/
│   ├── css/style.css # Estilos y diseño adaptable
│   └── js/app.js     # Configuración, interacción y efectos
├── Imagenes/        # 17 fotografías usadas en el jardín
├── audio/           # Música de fondo opcional
└── Flores/          # Flores del jardín y la imagen de vista previa social
```

## Comportamiento y accesibilidad

- La interacción empieza al tocar o pulsar `Enter`/espacio en la pantalla de apertura, lo que permite inicializar el audio en navegadores móviles.
- El ramo se puede abrir con clic, `Enter` o barra espaciadora; `Esc` cierra la carta y el visor de fotos.
- Se respeta `prefers-reduced-motion` para reducir las animaciones.
- Las fotografías pueden ampliarse al seleccionarlas.
- El jardín usa los PNG transparentes de `Flores/`, incluido `Ramo.png` como elemento central interactivo.
- El fondo del jardín se rellena con una capa decorativa de tulipanes y girasoles, con opacidad y movimiento suaves para no competir con las fotos.
- En equipos táctiles, los controles mantienen objetivos de al menos 44 px y se ajustan el contenido y la carta para pantallas estrechas u horizontales.

## Estado actual y comprobaciones

- Las 17 rutas de fotos configuradas existen y el JavaScript externo supera la comprobación de sintaxis.
- La música de fondo usa `audio/bff.m4a`, una versión más ligera; conserve esa ruta o actualice `CONFIG.cancion` si sustituye el archivo. `audio/bff.webm` se conserva como respaldo.
- El contenido de la carta conserva textos de plantilla (`[Escribe aquí…]` y `[Tu nombre]`); debe personalizarse antes de compartir la tarjeta.
- Los metadatos Open Graph y la URL canónica ya apuntan a la publicación de GitHub Pages; cámbielos si el repositorio o el dominio se mueven.

## Publicación

Es un sitio estático: puede alojarse en GitHub Pages, Netlify, Vercel o cualquier servidor que entregue los archivos tal como están. Antes de publicar, confirme que el audio esté incluido y que las rutas canónicas y Open Graph correspondan al dominio final.
