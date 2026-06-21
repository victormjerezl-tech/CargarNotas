# 🧪 GUÍA DE PRUEBAS - MVP NOTAS Henry Pittier

**Documento de Validación y Pruebas del Sistema**  
**Versión:** 1.0.0 MVP  
**Fecha:** 21 de Junio de 2026

---

## 📋 Casos de Prueba

### TEST 1: Autenticación y Redirección por Rol

**Objetivo:** Verificar que el login funcione y redirija según el rol

**Pasos:**
1. Abrir `index.html`
2. Ingresar credenciales de usuario con rol **Superadmin**
3. Verificar redirección a `/pages/superadmin/dashboard.html`
4. Cerrar sesión
5. Repetir con rol **Directivo** → `/pages/directivo/dashboard.html`
6. Repetir con rol **Docente** → `/pages/docente/dashboard.html`
7. Repetir con rol **Estudiante** → `/pages/estudiante/dashboard.html`

**Resultado Esperado:** ✅ Cada rol redirige a su dashboard correcto

---

### TEST 2: Sidebar y Navegación

**Objetivo:** Verificar que la navegación lateral funcione correctamente

**Pasos:**
1. Acceder a cualquier dashboard
2. Hacer clic en cada opción del sidebar
3. Verificar que se cargue contenido diferente
4. Verificar que el item activo se resalte
5. Probar respuesta en mobile (sidebar oculto)

**Resultado Esperado:** ✅ Navegación fluida y activos resaltados

---

### TEST 3: Información de Usuario

**Objetivo:** Verificar que los datos del usuario se carguen correctamente

**Pasos:**
1. Acceder a cualquier dashboard
2. Verificar nombre y email en el navbar
3. Verificar avatar con iniciales correctas
4. Hacer clic en "Mi Perfil"
5. Verificar información personal

**Resultado Esperado:** ✅ Datos cargados correctamente

---

### TEST 4: Dashboard Superadmin

**Objetivo:** Validar funcionalidades del panel superadmin

**Pasos:**
1. Acceder como Superadmin
2. **Panel Principal:**
   - Verificar estadísticas (usuarios activos, docentes, estudiantes)
   - Verificar lista de períodos académicos

3. **Gestión de Usuarios:**
   - Ver tabla de usuarios
   - Hacer clic en "Crear Usuario"
   - Completar formulario
   - Seleccionar rol y verificar campos adicionales (especialidad para Docente, cargo para Directivo)

4. **Asignación de Roles:**
   - Ver tabla de usuarios
   - Hacer clic en "Cambiar Rol"
   - Seleccionar nuevo rol

5. **Auditoría:**
   - Acceder a módulo (en desarrollo)

**Resultado Esperado:** ✅ Interfaz completa y funcional

---

### TEST 5: Dashboard Directivo

**Objetivo:** Validar funcionalidades del panel directivo

**Pasos:**
1. Acceder como Directivo
2. **Panel Principal:**
   - Ver estadísticas de docentes, estudiantes, período

3. **Gestión de Personal:**
   - Ver opción de agregar personal
   - Interfaz accesible

4. **Períodos Académicos:**
   - Ver lista de períodos
   - Ver botón de crear período
   - Verificar estado de cada período

5. **Secciones:**
   - Ver opciones de gestión
   - Botón de crear sección

6. **Estudiantes:**
   - Ver opciones de gestión

**Resultado Esperado:** ✅ Dashboard operativo

---

### TEST 6: Dashboard Evaluación Docente

**Objetivo:** Validar panel de evaluación

**Pasos:**
1. Acceder como Evaluación_docente
2. **Panel Principal:**
   - Ver estadísticas de secciones
   - Ver período actual

3. **Asignación de Docentes:**
   - Ver tabla de asignaciones
   - Hacer clic en "Asignar Docente"
   - Completar campos (Sección, Materia, Docente)

4. **Revisión de Notas:**
   - Filtrar por sección y lapso
   - Ver tabla de calificaciones

5. **Reportes:**
   - Ver opciones de reportes disponibles

**Resultado Esperado:** ✅ Funcionalidades accesibles

---

### TEST 7: Dashboard Docente

**Objetivo:** Validar panel de docentes

**Pasos:**
1. Acceder como Docente
2. **Panel Principal:**
   - Ver estadísticas (secciones, período)

3. **Mis Secciones:**
   - Ver tarjetas de secciones asignadas
   - Ver materias por sección
   - Hacer clic en "Cargar Notas"

4. **Cargar Notas:**
   - Seleccionar sección
   - Seleccionar lapso
   - Ver tabla de estudiantes
   - Completar notas (1-20)
   - Hacer clic en "Guardar"

5. **Historial:**
   - Ver opciones de historial

6. **Asesorías:**
   - Ver opciones de asesorías

**Resultado Esperado:** ✅ Interfaz de carga de notas funcional

---

### TEST 8: Dashboard Control de Estudios

**Objetivo:** Validar panel de control

**Pasos:**
1. Acceder como Control_estudios
2. **Panel Principal:**
   - Ver estadísticas

3. **Gestión de Estudiantes:**
   - Ver tabla de estudiantes
   - Opciones de editar/agregar

4. **Gestión de Secciones:**
   - Ver opciones

5. **Inscripciones:**
   - Ver opciones

6. **Reportes:**
   - Ver opciones de reportes

**Resultado Esperado:** ✅ Panel operativo

---

### TEST 9: Dashboard Estudiante

**Objetivo:** Validar panel de estudiante

**Pasos:**
1. Acceder como Estudiante
2. **Mis Notas:**
   - Ver tabla de notas
   - Ver promedio general
   - Ver período actual

3. **Mis Detalles:**
   - Ver información personal
   - Nombre, cédula, email, sección

4. **Historial Académico:**
   - Ver opciones

**Resultado Esperado:** ✅ Panel de lectura funcional

---

### TEST 10: Página de Perfil

**Objetivo:** Validar funcionalidades de perfil

**Pasos:**
1. Desde cualquier dashboard, hacer clic en "Mi Perfil"
2. **Información Personal:**
   - Verificar campos cargados
   - Campos deshabilitados (read-only)

3. **Cambiar Contraseña:**
   - Completar campos
   - Verificar validación (mínimo 8 caracteres)
   - Hacer clic en "Actualizar"

4. **Información de Cuenta:**
   - Ver ID, rol, fechas

5. **Acciones Rápidas:**
   - Hacer clic en "Ir al Dashboard"
   - Hacer clic en "Cerrar Sesión"

**Resultado Esperado:** ✅ Funcionalidades completas

---

### TEST 11: Responsividad

**Objetivo:** Verificar funcionamiento en diferentes dispositivos

**Pasos:**
1. Abrir Firefox Developer Tools (F12)
2. Cambiar a device emulation
3. Probar con **iPhone 12** (375px)
4. Probar con **iPad** (768px)
5. Probar con **Desktop** (1920px)
6. Verificar:
   - Sidebar oculto en mobile
   - Navbar responsive
   - Tablas scrolleables
   - Botones accesibles

**Resultado Esperado:** ✅ Funciona en todos los tamaños

---

### TEST 12: Integración de APIs

**Objetivo:** Verificar llamadas a Edge Functions

**Pasos:**
1. Abrir Console del navegador (F12 → Console)
2. Acceder a dashboard
3. Verificar que NO haya errores de CORS
4. Verificar que las tablas se carguen con datos
5. En caso de error, verificar URL de Supabase
6. Verificar que los métodos de API.js se ejecuten sin error

**Resultado Esperado:** ✅ APIs responden correctamente

---

### TEST 13: Validación de Seguridad

**Objetivo:** Verificar que el acceso se restrinja correctamente

**Pasos:**
1. Acceder como **Estudiante**
2. Intentar acceder a `/pages/superadmin/dashboard.html` directamente (URL)
3. Verificar redirección a login
4. Hacer login como **Docente**
5. Verificar que vaya a dashboard de docente

**Resultado Esperado:** ✅ Redirección segura

---

### TEST 14: Logout y Limpieza de Sesión

**Objetivo:** Verificar limpieza de datos al cerrar sesión

**Pasos:**
1. Acceder a cualquier dashboard
2. Abrir DevTools → Application → Storage
3. Verificar que exista **userSession** en SessionStorage
4. Hacer clic en "Cerrar Sesión"
5. Verificar que sessionStorage esté vacío
6. Intentar acceder a dashboard nuevamente
7. Verificar redirección a login

**Resultado Esperado:** ✅ Sesión limpiada correctamente

---

### TEST 15: Navegación de Roles Múltiples

**Objetivo:** Verificar que usuarios con múltiples roles funcionen

**Pasos:**
1. Si un usuario tiene múltiples roles
2. Verificar que vea el rol principal en su perfil
3. Verificar que acceda al dashboard del rol principal
4. (En futuras versiones: permitir cambio de rol)

**Resultado Esperado:** ✅ Sistema preparado para múltiples roles

---

## 🔍 Validación Final

### Checklist de Aceptación

- [ ] Login funciona con todos los roles
- [ ] Cada rol redirigue a su dashboard
- [ ] Sidebars navegan correctamente
- [ ] Datos de usuario cargan correctamente
- [ ] Tablas muestran datos
- [ ] Formularios se pueden completar
- [ ] Responsive en mobile
- [ ] Navbar con información correcta
- [ ] Perfil se carga correctamente
- [ ] Logout limpia sesión
- [ ] Sin errores en consola
- [ ] APIs responden correctamente
- [ ] Seguridad: redirecciones funcionan
- [ ] Bootstrap e iconos cargan correctamente
- [ ] Colores por rol son diferenciados

---

## 🐛 Reporte de Issues

Si encuentras problemas, documenta:

**Formato:**
```
ISSUE #: [Número]
AMBIENTE: [Local/Producción]
ROL AFECTADO: [Superadmin/Directivo/etc]
NAVEGADOR: [Chrome/Firefox/Safari]
RESOLUCIÓN: [Pasos para reproducir]

DESCRIPCIÓN:
[Descripción del problema]

RESULTADO ESPERADO:
[Qué debería pasar]

RESULTADO ACTUAL:
[Qué está pasando]

CAPTURAS/LOGS:
[Si aplica]
```

---

## ✅ Validación de MVP Completado

Después de pasar todas estas pruebas, el MVP está validado y listo para:

- ✅ Implementación en producción
- ✅ Capacitación de usuarios
- ✅ Integración en infraestructura
- ✅ Pruebas de carga
- ✅ Migración de datos

---

**Documento de Pruebas - Fin**  
**Versión:** 1.0  
**Última Actualización:** 21/06/2026
