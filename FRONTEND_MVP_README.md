# 📚 NOTAS - Henry Pittier | MVP Frontend Completado

**Versión:** 1.0.0 MVP  
**Estado:** Funcional y Operativo  
**Última Actualización:** 21 de Junio de 2026

---

## 🎯 Descripción General

Frontend completamente funcional para un **Sistema de Gestión Académica Multi-Rol** diseñado para la institución educativa Henry Pittier. El sistema soporta 6 roles con funcionalidades específicas, integración total con Supabase y Edge Functions backend, y una interfaz moderna y responsiva.

---

## 👥 Roles Soportados

### 1. **Superadmin** (Color: Rojo Oscuro #c41e3a)
- **Dashboard:** `/pages/superadmin/dashboard.html`
- **Funcionalidades:**
  - ✅ Panel de control central
  - ✅ Gestión completa de usuarios
  - ✅ Asignación y revocación de roles
  - ✅ Auditoría del sistema
  - ✅ Configuración del sistema
  - ✅ Ver estadísticas generales

### 2. **Directivo** (Color: Azul #0056b3)
- **Dashboard:** `/pages/directivo/dashboard.html`
- **Funcionalidades:**
  - ✅ Gestión de personal (docentes, administrativos)
  - ✅ Gestión de períodos académicos
  - ✅ Gestión de secciones
  - ✅ Gestión de estudiantes
  - ✅ Abrir/cerrar períodos académicos
  - ✅ Asignación de roles de personal

### 3. **Evaluación Docente** (Color: Púrpura #6f42c1)
- **Dashboard:** `/pages/evaluacion_docente/dashboard.html`
- **Funcionalidades:**
  - ✅ Asignación de docentes a materias/secciones
  - ✅ Revisión de calificaciones
  - ✅ Modificación de notas entre lapsos
  - ✅ Reportes de evaluación
  - ✅ Ver tipos de evaluación aplicados

### 4. **Docente** (Color: Verde #28a745)
- **Dashboard:** `/pages/docente/dashboard.html`
- **Funcionalidades:**
  - ✅ Ver secciones asignadas
  - ✅ Cargar notas de estudiantes
  - ✅ Definir porcentajes de evaluación
  - ✅ Ver historial de notas cargadas
  - ✅ Gestionar asesorías (si aplica)
  - ✅ Panel de materias y estudiantes

### 5. **Control de Estudios** (Color: Naranja #fd7e14)
- **Dashboard:** `/pages/control_estudios/dashboard.html`
- **Funcionalidades:**
  - ✅ Gestión completa de estudiantes
  - ✅ Gestión de inscripciones
  - ✅ Gestión de secciones
  - ✅ Traslados y cambios de sección
  - ✅ Generación de reportes
  - ✅ Estadísticas académicas

### 6. **Estudiante** (Color: Azul Claro #17a2b8)
- **Dashboard:** `/pages/estudiante/dashboard.html`
- **Funcionalidades:**
  - ✅ Ver propias notas actuales
  - ✅ Ver detalles académicos personales
  - ✅ Historial académico
  - ✅ Promedio general
  - ✅ Información de sección

---

## 🛠️ Estructura de Archivos

```
/
├── index.html                          # Landing/Login principal
├── pages/
│   ├── perfil.html                    # Perfil de usuario (todos los roles)
│   ├── dashboard-base.html            # Plantilla base para dashboards
│   ├── superadmin/
│   │   └── dashboard.html             # Dashboard Superadmin
│   ├── directivo/
│   │   └── dashboard.html             # Dashboard Directivo
│   ├── evaluacion_docente/
│   │   └── dashboard.html             # Dashboard Evaluación Docente
│   ├── docente/
│   │   └── dashboard.html             # Dashboard Docente
│   ├── control_estudios/
│   │   └── dashboard.html             # Dashboard Control Estudios
│   └── estudiante/
│       └── dashboard.html             # Dashboard Estudiante
├── js/
│   ├── auth.js                        # Lógica de autenticación
│   ├── supabase.js                    # Configuración Supabase
│   └── services/
│       ├── api.js                     # Servicio centralizado de APIs
│       └── session.js                 # Gestión de sesiones y navegación
├── css/
│   ├── bootstrap.min.css              # Bootstrap 5.3.2
│   └── styles.css                     # Estilos personalizados
└── supabase/
    ├── [esquemas y definiciones]
    └── edge_functions/
        └── [funciones de borde]
```

---

## 🚀 Guía de Inicio Rápido

### 1. **Acceso al Sistema**

1. Accede a `index.html` (la página de login)
2. Ingresa credenciales de usuario
3. El sistema detecta tu rol automáticamente
4. Serás redirigido a tu dashboard correspondiente

### 2. **Rutas de Acceso por Rol**

| Rol | URL |
|-----|-----|
| Superadmin | `/pages/superadmin/dashboard.html` |
| Directivo | `/pages/directivo/dashboard.html` |
| Evaluación Docente | `/pages/evaluacion_docente/dashboard.html` |
| Docente | `/pages/docente/dashboard.html` |
| Control Estudios | `/pages/control_estudios/dashboard.html` |
| Estudiante | `/pages/estudiante/dashboard.html` |

### 3. **Flujo de Trabajo Recomendado**

```
Superadmin → Crear Usuarios → Asignar Roles
    ↓
Directivo → Crear Períodos → Crear Secciones → Asignar Docentes
    ↓
Control Estudios → Inscribir Estudiantes
    ↓
Evaluación Docente → Asignar Docentes a Materias
    ↓
Docentes → Cargar Notas
    ↓
Estudiantes → Ver Notas
```

---

## 📊 Servicios y APIs

### **API Service** (`js/services/api.js`)

Centraliza todas las llamadas a Edge Functions con métodos organizados por entidad:

#### Usuarios
```javascript
API.usuarios.crear(email, password, metadata)
API.usuarios.listar(filters)
API.usuarios.obtener(userId)
API.usuarios.actualizar(userId, updates)
API.usuarios.habilitar(userId)
API.usuarios.deshabilitar(userId)
```

#### Períodos
```javascript
API.periodos.listarAnios()
API.periodos.crearAnio(nombre, fechaInicio, fechaFin)
API.periodos.listarLapsos(anioId)
API.periodos.crearLapso(anioId, numero, fechaInicio, fechaFin)
API.periodos.activarLapso(lapsoId)
API.periodos.obtenerActivo()
```

#### Secciones
```javascript
API.secciones.listar(filters)
API.secciones.crear(seccionData)
API.secciones.asignarDocente(seccionId, materiaId, docenteId)
API.secciones.listarMaterias(seccionId)
```

#### Estudiantes
```javascript
API.estudiantes.listar(filters)
API.estudiantes.inscribir(estudianteData)
API.estudiantes.cambiarSeccion(estudianteId, nuevaSeccionId)
API.estudiantes.promover(estudianteId)
```

### **Session Service** (`js/services/session.js`)

Gestión de sesiones de usuario:

```javascript
// Verificar autenticación
sessionAPI.estaAutenticado()

// Obtener información
sessionAPI.obtenerUsuario()
sessionAPI.obtenerRolPrincipal()
sessionAPI.obtenerInfo(campo)

// Guardar sesión
sessionAPI.guardarSesion(user, rolData)

// Limpiar sesión
sessionAPI.limpiarSesion()

// Navegación
nav.redirigirPorRol()
nav.logout()
nav.irAPerfil()
```

---

## 🎨 Características de Diseño

- ✅ **Interfaz responsiva** - Funciona en desktop, tablet y mobile
- ✅ **Colores diferenciados por rol** - Fácil identificación visual
- ✅ **Navegación intuitiva** - Menús contextuales según rol
- ✅ **Bootstrap 5.3.2** - Framework moderno y accesible
- ✅ **Icons Bootstrap** - Más de 2000 iconos disponibles
- ✅ **Temas consistentes** - Paleta de colores coordinada

---

## 🔐 Seguridad Implementada

- ✅ Autenticación con Supabase Auth
- ✅ Session Storage + Local Storage
- ✅ Verificación de roles antes de cargar módulos
- ✅ Redirección automática si no está autenticado
- ✅ Logout seguro con limpieza de sesión
- ✅ Tokens JWT manejados por Supabase

---

## 🔧 Configuración Necesaria

### Variables de Entorno (en `js/supabase.js`)

```javascript
const SUPABASE_URL = 'https://slwbzfxwrxrsnlizapps.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_9yQQumW9JF5A-NjFjtp3Og_7HBfSDpr';
```

> ⚠️ **Nota:** Estas credenciales son públicas (ANON_KEY) por seguridad. Las operaciones sensibles se realizan en Edge Functions con permisos elevados.

---

## 📱 Funcionalidades Principales por Módulo

### **Superadmin**
- Dashboard con KPIs
- CRUD completo de usuarios
- Asignación de roles
- Panel de auditoría
- Configuración del sistema

### **Directivo**
- Gestión de período académico
- Asignación de docentes
- Configuración de secciones
- Estadísticas de personal
- Reportes administrativos

### **Evaluación Docente**
- Asignación de docentes a materias
- Revisión centralizada de calificaciones
- Modificación de notas entre lapsos
- Reportes de métodos de evaluación

### **Docente**
- Panel de secciones asignadas
- Carga de notas por estudiante
- Definición de porcentajes de evaluación
- Historial de cargas
- Gestión de asesorías

### **Control de Estudios**
- Inscripción de estudiantes
- Gestión de cambios de sección
- Traslados académicos
- Generación de reportes
- Estadísticas de inscripción

### **Estudiante**
- Panel personal de notas
- Ver detalles académicos
- Historial de períodos anteriores
- Promedio general

---

## ✅ Checklist de MVP Completado

- [x] Login y autenticación
- [x] Dashboard Superadmin
- [x] Dashboard Directivo
- [x] Dashboard Evaluación Docente
- [x] Dashboard Docente
- [x] Dashboard Control Estudios
- [x] Dashboard Estudiante
- [x] Página de perfil común
- [x] Servicio centralizado de APIs
- [x] Gestión de sesiones
- [x] Navegación por roles
- [x] Interfaz responsiva
- [x] Integración con Edge Functions
- [x] Sistema de seguridad básico

---

## 🐛 Problemas Conocidos y Mejoras Futuras

### Para Próximas Versiones:
- [ ] Implementar reportes completos (PDF/Excel)
- [ ] Agregar gráficos de estadísticas
- [ ] Sistema de notificaciones en tiempo real
- [ ] Exportación de datos
- [ ] Búsqueda avanzada y filtros
- [ ] Validaciones adicionales de formularios
- [ ] Cache local para mejor rendimiento
- [ ] Modo oscuro

---

## 📞 Soporte y Contacto

Para reportar issues o solicitar características nuevas:
- **Email:** soporte@ejemplo.com
- **Teléfono:** +58 (000) 000-0000
- **Repositorio:** GitHub (victormjerezl-tech/CargarNotas)

---

## 📄 Licencia

Este proyecto está bajo licencia de la institución educativa Henry Pittier.

---

**¡Sistema completamente funcional y listo para producción!** 🎉
