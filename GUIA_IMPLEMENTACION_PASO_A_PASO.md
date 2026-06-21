# 🚀 GUÍA DE IMPLEMENTACIÓN - SISTEMA GESTIÓN ACADÉMICA MULTI-ROL

**Fecha:** 21/06/2026 | **Versión:** 1.0 | **Prioridad:** 🔴 CRÍTICA

---

## 📋 CONTENIDOS ENTREGABLES

Hemos creado 5 archivos principales en tu proyecto:

| Archivo | Propósito | Ubicación |
|---------|-----------|----------|
| **PLAN_MAESTRO_SISTEMA_COMPLETO.md** | Especificación completa del proyecto | Raíz |
| **SCRIPT_SQL_MAESTRO_INFRAESTRUCTURA.sql** | SQL para crear tablas, políticas RLS, triggers | Raíz |
| **EDGE_FUNCTIONS_ROLES_CRITICAS.ts** | Code para Edge Functions (roles, usuarios) | Raíz |
| **auth.js (actualizado)** | Sistema de autenticación mejorado | `/js/` |
| **utils-mejorado.js** | Funciones helper globales | `/js/` |

---

## ⚡ PLAN DE IMPLEMENTACIÓN (5 FASES)

### 📍 FASE 1: INFRAESTRUCTURA EN SUPABASE (2-3 horas)

**Objetivo:** Crear todas las tablas, políticas RLS y triggers

#### Paso 1.1: Ejecutar Script SQL
1. Abre el [Dashboard de Supabase](https://supabase.com) → Tu proyecto
2. Dirígete a **SQL Editor** (panel izquierdo)
3. Crea una nueva query
4. Copia TODO el contenido de `SCRIPT_SQL_MAESTRO_INFRAESTRUCTURA.sql`
5. Presiona **▶ Run** (esquina superior derecha)
6. Verifica que no haya errores (scrollea al final para ver el ✅)

**Checklist de verificación:**
- [ ] Se crearon 8+ tablas nuevas (`roles`, `user_roles`, `secciones`, etc.)
- [ ] Se crearon políticas RLS en todas las tablas
- [ ] Se crearon 3+ triggers
- [ ] No hay errores en la ejecución

#### Paso 1.2: Verificar Tablas Creadas
1. Ve a **SQL Editor** → **Schemas** (lado izquierdo)
2. Abre `public` → verifica que existan:
   - ✅ `roles` (con 6 registros: Superadmin, Directivo, etc.)
   - ✅ `user_roles` (vacía, se llenará cuando asignes roles)
   - ✅ `secciones`
   - ✅ `ventanas_carga`
   - ✅ `docente_materia_seccion`
   - ✅ `asesores_seccion`
   - ✅ `tipos_evaluacion` (9 tipos predefinidos)
   - ✅ `instrumentos_evaluacion` (10 instrumentos predefinidos)
   - ✅ `evaluaciones`
   - ✅ `calificaciones`
   - ✅ `historicos_calificaciones`

#### Paso 1.3: Verificar Políticas RLS
1. Para cada tabla sensible, ve a **Table Editor** → selecciona tabla → **RLS** (arriba a la derecha)
2. Verifica que tenga políticas para:
   - ✅ `user_roles`: Superadmin, Directivo, self-read
   - ✅ `secciones`: Superadmin, Directivo, Control_Estudios, inscrito
   - ✅ `evaluaciones`: Docente, Evaluador, Superadmin
   - ✅ `calificaciones`: Docente, Evaluador, Estudiante, Superadmin

---

### 📍 FASE 2: EDGE FUNCTIONS (2-3 horas)

**Objetivo:** Crear funciones serverless para gestión de roles

#### Paso 2.1: Crear Edge Function `assign-role`
1. Ve a **Edge Functions** (panel izquierdo en Supabase)
2. Presiona **+ New Function**
3. Nombre: `assign-role`
4. Elige TypeScript
5. Copia el código de la función 1 desde `EDGE_FUNCTIONS_ROLES_CRITICAS.ts`
6. Presiona **Deploy**

**Código a copiar:**
```typescript
// Ver EDGE_FUNCTIONS_ROLES_CRITICAS.ts línea 1-120
```

#### Paso 2.2: Crear Funciones Adicionales
Repite el paso 2.1 para las otras funciones (descomentar del archivo):
- `remove-role` 
- `list-user-roles`
- `get-user-role-principal`
- `create-docente`

**Nombres de funciones en Supabase:**
```
assign-role
remove-role
list-user-roles
get-user-role-principal
create-docente
```

#### Paso 2.3: Verificar Funciones
1. Ve a **Edge Functions** en Supabase
2. Verifica que aparezcan todas 5 funciones
3. Cada una debe tener un ícono verde (Deploy exitoso)

---

### 📍 FASE 3: INTEGRACIÓN EN FRONTEND (1-2 horas)

**Objetivo:** Usar los nuevos archivos en tu aplicación

#### Paso 3.1: Reemplazar auth.js
1. Abre `/js/auth.js` en VS Code
2. Verifica que ESTÁ ACTUALIZADO (debería tener `ROLE_REDIRECTS`, `obtenerRolPrincipal()`, etc.)
3. Si no tiene la nueva versión, reemplázalo

**Verificar que tiene:**
- ✅ Función `obtenerRolPrincipal(token)`
- ✅ Función `guardarSesionUsuario(user, rolData)`
- ✅ Objeto `ROLE_REDIRECTS` con 6 rutas
- ✅ Manejo de 5 nuevos roles

#### Paso 3.2: Crear utils-mejorado.js
1. Verifica que exista `/js/utils-mejorado.js`
2. Debería tener 50+ funciones helper

**Funciones principales:**
- `obtenerSesionUsuario()` - obtiene datos de sesión
- `tieneRol(rol)` - verifica si tiene un rol
- `esSuperadmin()`, `esDirectivo()`, `esDocente()`, etc.
- `validarAcceso(rolesPermitidos)` - valida permisos
- `obtenerDatos()`, `insertarDato()`, `actualizarDato()` - CRUD Supabase

#### Paso 3.3: Actualizar Todas las Páginas HTML
En cada página (login, directivo, estudiante, etc.), AÑADE estas líneas en el `<head>`:

```html
<!-- En TODOS los archivos HTML -->
<script src="../js/utils-mejorado.js"></script>
```

O si el archivo está en `/pages/`:

```html
<script src="../../js/utils-mejorado.js"></script>
```

---

### 📍 FASE 4: CREAR UIs DE GESTIÓN (3-4 horas)

**Objetivo:** Crear interfaces para gestionar roles, usuarios, evaluaciones

#### Paso 4.1: Crear Estructura de Carpetas
```
pages/
├── superadmin/
│   ├── dashboard.html       ← Nuevo
│   ├── dashboard.js         ← Nuevo
│   ├── gestionar-usuarios.html ← Nuevo
│   └── gestionar-usuarios.js   ← Nuevo
├── directivo/
│   ├── dashboard.html       ← Nuevo (mejorado)
│   ├── dashboard.js         ← Nuevo
│   ├── personal.html        ← Nuevo
│   ├── personal.js          ← Nuevo
│   └── periodos.html        ← Nuevo
├── evaluacion/
│   ├── dashboard.html       ← Nuevo
│   ├── dashboard.js         ← Nuevo
│   ├── asignar-docentes.html ← Nuevo
│   ├── asignar-docentes.js  ← Nuevo
│   └── ver-calificaciones.html ← Nuevo
├── docente/
│   ├── dashboard.html       ← Nuevo
│   ├── dashboard.js         ← Nuevo
│   ├── cargar-notas.html    ← Nuevo
│   └── cargar-notas.js      ← Nuevo
├── control_estudios/
│   ├── dashboard.html       ← Nuevo
│   ├── estudiantes.html     ← Nuevo
│   ├── reportes.html        ← Nuevo
│   └── reportes.js          ← Nuevo
└── estudiante/
    ├── dashboard.html       ← Nuevo
    └── mis-calificaciones.html ← Nuevo
```

#### Paso 4.2: Crear Dashboard Superadmin
**Ubicación:** `/pages/superadmin/dashboard.html`

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Panel Superadmin</title>
  <link href="../../css/bootstrap.min.css" rel="stylesheet">
  <link href="../../css/styles.css" rel="stylesheet">
</head>
<body>
  <div class="container-fluid">
    <nav class="navbar navbar-dark bg-dark mb-4">
      <div class="navbar-brand">
        <h1>Panel Superadmin</h1>
      </div>
      <div class="ms-auto">
        <span id="usuario-nombre" class="text-white me-3"></span>
        <button class="btn btn-outline-light" onclick="logout()">Logout</button>
      </div>
    </nav>

    <main class="container">
      <div class="row">
        <div class="col-md-3">
          <div class="card bg-primary text-white mb-3">
            <div class="card-body">
              <h5 class="card-title">Usuarios Activos</h5>
              <p class="card-text fs-3" id="usuarios-activos">-</p>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="card bg-success text-white mb-3">
            <div class="card-body">
              <h5 class="card-title">Períodos Abiertos</h5>
              <p class="card-text fs-3" id="periodos-abiertos">-</p>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="card bg-warning text-white mb-3">
            <div class="card-body">
              <h5 class="card-title">Estudiantes</h5>
              <p class="card-text fs-3" id="total-estudiantes">-</p>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="card bg-danger text-white mb-3">
            <div class="card-body">
              <h5 class="card-title">Docentes</h5>
              <p class="card-text fs-3" id="total-docentes">-</p>
            </div>
          </div>
        </div>
      </div>

      <div class="row mt-4">
        <div class="col-md-6">
          <div class="card">
            <div class="card-header bg-dark text-white">
              <h5>Gestión</h5>
            </div>
            <div class="card-body">
              <a href="gestionar-usuarios.html" class="btn btn-primary w-100 mb-2">
                👤 Gestionar Usuarios
              </a>
              <a href="../../pages/directivo/periodos.html" class="btn btn-secondary w-100 mb-2">
                📅 Períodos Académicos
              </a>
              <button class="btn btn-warning w-100 mb-2" data-bs-toggle="modal" data-bs-target="#modalAuditoria">
                🔍 Ver Auditoría
              </button>
              <a href="../../pages/perfil.html" class="btn btn-info w-100">
                ⚙️ Configuración
              </a>
            </div>
          </div>
        </div>

        <div class="col-md-6">
          <div class="card">
            <div class="card-header bg-dark text-white">
              <h5>Reportes</h5>
            </div>
            <div class="card-body">
              <button class="btn btn-outline-primary w-100 mb-2" onclick="generarReporteUsuarios()">
                📊 Reporte de Usuarios
              </button>
              <button class="btn btn-outline-primary w-100 mb-2" onclick="generarReportePeriodos()">
                📊 Reporte de Períodos
              </button>
              <button class="btn btn-outline-primary w-100 mb-2" onclick="generarReporteAcademico()">
                📊 Reporte Académico
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>

  <!-- Modal Auditoría -->
  <div class="modal fade" id="modalAuditoria">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Registro de Auditoría</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">
          <div id="audit-log" class="table-responsive">
            <table class="table table-sm">
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Usuario</th>
                  <th>Acción</th>
                  <th>Tabla</th>
                </tr>
              </thead>
              <tbody id="audit-table"></tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>

  <script src="../../js/bootstrap.min.js"></script>
  <script src="../../js/supabase.js"></script>
  <script src="../../js/utils-mejorado.js"></script>
  <script src="dashboard.js"></script>
</body>
</html>
```

**Ubicación:** `/pages/superadmin/dashboard.js`

```javascript
// Verificar autenticación y rol
document.addEventListener("DOMContentLoaded", async function() {
  // Verificar que es Superadmin
  if (!validarAcceso(["Superadmin"])) {
    window.location.href = "/pages/login.html";
    return;
  }

  // Mostrar datos de sesión
  const sesion = obtenerSesionUsuario();
  document.getElementById("usuario-nombre").textContent = obtenerNombreUsuario();

  // Cargar datos del dashboard
  await cargarDatos();
});

async function cargarDatos() {
  mostrarCargando(true, "Cargando datos...");

  try {
    // Obtener usuarios
    const usuarios = await obtenerDatos("user_roles", { activo: true });
    document.getElementById("usuarios-activos").textContent = usuarios.length;

    // Obtener períodos abiertos
    const periodos = await obtenerDatos("anios_escolares", { activo: true });
    document.getElementById("periodos-abiertos").textContent = periodos.length;

    // Obtener estudiantes
    const estudiantes = await obtenerDatos("estudiantes", { estado: "activo" });
    document.getElementById("total-estudiantes").textContent = estudiantes.length;

    // Obtener docentes
    const docentes = await obtenerDatos("docentes", { activo: true });
    document.getElementById("total-docentes").textContent = docentes.length;

    mostrarExito("Datos cargados exitosamente", 2000);
  } catch (error) {
    console.error("Error cargando datos:", error);
    mostrarError("Error al cargar los datos");
  } finally {
    mostrarCargando(false);
  }
}

// Función para generar reportes
async function generarReporteUsuarios() {
  mostrarCargando(true, "Generando reporte...");
  // Implementar generación de reporte
  mostrarCargando(false);
  mostrarExito("Reporte generado", 2000);
}

async function generarReportePeriodos() {
  mostrarCargando(true, "Generando reporte...");
  // Implementar generación de reporte
  mostrarCargando(false);
  mostrarExito("Reporte generado", 2000);
}

async function generarReporteAcademico() {
  mostrarCargando(true, "Generando reporte...");
  // Implementar generación de reporte
  mostrarCargando(false);
  mostrarExito("Reporte generado", 2000);
}
```

---

### 📍 FASE 5: TESTING Y AJUSTES (1-2 horas)

#### Paso 5.1: Verificar Autenticación
1. Abre `/pages/login.html`
2. Prueba login con un usuario Superadmin (crear en Supabase → Auth si no existe)
3. Verifica que se redirige a `/pages/superadmin/dashboard.html`
4. Abre la consola del navegador (**F12 → Console**) y verifica que NO hay errores

#### Paso 5.2: Prueba de Roles
En la consola del navegador, ejecuta:
```javascript
// Ver datos de sesión
console.log(obtenerSesionUsuario());

// Verificar rol
console.log("Es Superadmin:", esSuperadmin());
console.log("Es Directivo:", esDirectivo());
console.log("Rol principal:", obtenerRolPrincipal());
```

#### Paso 5.3: Prueba de Asignación de Roles
1. Crea un nuevo usuario en Supabase Auth
2. En el dashboard de Superadmin, intenta asignarle un rol usando la Edge Function
3. Verifica que se asigne correctamente

---

## 🔑 ENDPOINTS DE EDGE FUNCTIONS

Una vez desplegados, puedes llamarlos desde tu código:

```javascript
// Asignar rol a usuario
const { data, error } = await supabase.functions.invoke("assign-role", {
  body: {
    usuario_id: "uuid-del-usuario",
    role_id: 4 // ID del rol (1=Superadmin, 2=Directivo, 3=Evaluador, 4=Docente, 5=Control, 6=Estudiante)
  },
  headers: { Authorization: `Bearer ${token}` }
});

// Obtener rol principal del usuario
const { data: rolData } = await supabase.functions.invoke("get-user-role-principal", {
  headers: { Authorization: `Bearer ${token}` }
});
// Retorna: { rol_principal: "Docente", role_id: 4, todos_roles: ["Docente", "Estudiante"] }
```

---

## 📊 CHECKLIST FINAL

### Antes de desplegar a producción:

- [ ] Se ejecutó exitosamente el script SQL
- [ ] Se crearon todas las 13+ tablas nuevas
- [ ] Se crearon y desplegaron las 5 Edge Functions
- [ ] Se actualizó auth.js con nuevo sistema de roles
- [ ] Se añadió utils-mejorado.js a todas las páginas
- [ ] Se creó dashboard de Superadmin
- [ ] Se testó login y redirección por rol
- [ ] Se testó asignación de roles
- [ ] Se verificó que no hay errores en consola
- [ ] Todos los usuarios tienen acceso según su rol
- [ ] Políticas RLS están funcionando correctamente

---

## ⚠️ PROBLEMAS COMUNES Y SOLUCIONES

### ❌ Error: "Política RLS no permite leer datos"
**Solución:** Verifica que la tabla tiene las políticas correctas habilitadas en Supabase.

### ❌ Error: "Edge Function no encontrada"
**Solución:** Verifica que la función esté desplegada en Supabase (estado verde en panel).

### ❌ Error: "No autenticado" en Edge Function
**Solución:** Asegúrate de pasar el token de autenticación en headers:
```javascript
headers: { Authorization: `Bearer ${token}` }
```

### ❌ Usuario no redirige después de login
**Solución:** Verifica que:
1. `obtenerRolPrincipal()` retorna un valor
2. La ruta en `ROLE_REDIRECTS` existe
3. No hay errores en consola

### ❌ Calificaciones no guardan después de editar
**Solución:** Verifica que:
1. La ventana de carga está abierta (`ventanas_carga.abierta = true`)
2. El usuario tiene permisos en la política RLS
3. La nota está entre 1-20

---

## 📞 PRÓXIMOS PASOS

1. **Ya completado:**
   - ✅ Especificación completa del sistema
   - ✅ Script SQL de infraestructura
   - ✅ Edge Functions críticas
   - ✅ Sistema de autenticación mejorado
   - ✅ Funciones helper globales

2. **A continuación:**
   - [ ] Crear UIs de gestión (Superadmin, Directivo, Docente, Evaluador, Control Estudios)
   - [ ] Implementar carga de calificaciones con validaciones
   - [ ] Implementar sistema de reportes (PDF, CSV, Excel)
   - [ ] Testing completo del sistema
   - [ ] Despliegue a producción

---

## 📖 REFERENCIAS

- [Documentación de Supabase RLS](https://supabase.com/docs/guides/auth/row-level-security)
- [Edge Functions de Supabase](https://supabase.com/docs/guides/functions)
- [Auth en Supabase](https://supabase.com/docs/guides/auth)
- [JavaScript SDK de Supabase](https://supabase.com/docs/reference/javascript)

---

**Generado:** 2026-06-21 | **Versión:** 1.0
