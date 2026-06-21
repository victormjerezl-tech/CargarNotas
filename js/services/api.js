// ============================================================================
// API SERVICE - Centraliza todas las llamadas a Edge Functions
// ============================================================================

const API_CONFIG = {
  SUPABASE_URL: 'https://slwbzfxwrxrsnlizapps.supabase.co',
  SUPABASE_ANON_KEY: 'sb_publishable_9yQQumW9JF5A-NjFjtp3Og_7HBfSDpr',
};

// ============================================================================
// USUARIOS - User Management
// ============================================================================

const usuariosAPI = {
  /**
   * Crear nuevo usuario
   * POST /functions/v1/users-create_user
   */
  crear: async (email, password, metadata = {}) => {
    const { data, error } = await supabase.functions.invoke(
      'users-create_user',
      {
        method: 'POST',
        body: {
          email,
          password,
          rol: metadata.rol || 'docente',
          nombre: metadata.nombre || '',
          apellido: metadata.apellido || '',
          cedula: metadata.cedula || '',
          especialidad: metadata.especialidad || null,
          cargo: metadata.cargo || null,
        },
      }
    );
    if (error) throw error;
    return data;
  },

  /**
   * Listar usuarios
   * GET /functions/v1/users-list_users
   */
  listar: async (filters = {}) => {
    const { data, error } = await supabase.functions.invoke(
      'users-list_users',
      {
        method: 'GET',
        body: filters,
      }
    );
    if (error) throw error;
    return data;
  },

  /**
   * Obtener usuario por ID
   * GET /functions/v1/users-get_user
   */
  obtener: async (userId) => {
    const { data, error } = await supabase.functions.invoke(
      'users-get_user',
      {
        method: 'GET',
        body: { user_id: userId },
      }
    );
    if (error) throw error;
    return data;
  },

  /**
   * Actualizar usuario
   * POST /functions/v1/users-update_user
   */
  actualizar: async (userId, updates) => {
    const { data, error } = await supabase.functions.invoke(
      'users-update_user',
      {
        method: 'POST',
        body: { user_id: userId, ...updates },
      }
    );
    if (error) throw error;
    return data;
  },

  /**
   * Habilitar usuario
   * POST /functions/v1/users-enable_user
   */
  habilitar: async (userId) => {
    const { data, error } = await supabase.functions.invoke(
      'users-enable_user',
      {
        method: 'POST',
        body: { user_id: userId },
      }
    );
    if (error) throw error;
    return data;
  },

  /**
   * Deshabilitar usuario
   * POST /functions/v1/users-disable_user
   */
  deshabilitar: async (userId) => {
    const { data, error } = await supabase.functions.invoke(
      'users-disable_user',
      {
        method: 'POST',
        body: { user_id: userId },
      }
    );
    if (error) throw error;
    return data;
  },

  /**
   * Cambiar email
   * POST /functions/v1/users-change_email
   */
  cambiarEmail: async (userId, nuevoEmail) => {
    const { data, error } = await supabase.functions.invoke(
      'users-change_email',
      {
        method: 'POST',
        body: { user_id: userId, new_email: nuevoEmail },
      }
    );
    if (error) throw error;
    return data;
  },

  /**
   * Resetear contraseña
   * POST /functions/v1/users-reset_password
   */
  resetearPassword: async (email) => {
    const { data, error } = await supabase.functions.invoke(
      'users-reset_password',
      {
        method: 'POST',
        body: { email },
      }
    );
    if (error) throw error;
    return data;
  },
};

// ============================================================================
// PERÍODOS ACADÉMICOS - Academic Periods
// ============================================================================

const periodosAPI = {
  /**
   * Listar años escolares
   * GET /functions/v1/periodos-list_anios
   */
  listarAnios: async () => {
    const { data, error } = await supabase.functions.invoke(
      'periodos-list_anios',
      { method: 'GET' }
    );
    if (error) throw error;
    return data;
  },

  /**
   * Crear año escolar
   * POST /functions/v1/periodos-create_anio
   */
  crearAnio: async (nombre, fechaInicio, fechaFin) => {
    const { data, error } = await supabase.functions.invoke(
      'periodos-create_anio',
      {
        method: 'POST',
        body: {
          nombre,
          fecha_inicio: fechaInicio,
          fecha_fin: fechaFin,
        },
      }
    );
    if (error) throw error;
    return data;
  },

  /**
   * Listar lapsos de un año
   * GET /functions/v1/periodos-list_lapsos
   */
  listarLapsos: async (anioId) => {
    const { data, error } = await supabase.functions.invoke(
      'periodos-list_lapsos',
      {
        method: 'GET',
        body: { anio_id: anioId },
      }
    );
    if (error) throw error;
    return data;
  },

  /**
   * Crear lapso
   * POST /functions/v1/periodos-create_lapso
   */
  crearLapso: async (anioId, numero, fechaInicio, fechaFin) => {
    const { data, error } = await supabase.functions.invoke(
      'periodos-create_lapso',
      {
        method: 'POST',
        body: {
          anio_id: anioId,
          numero,
          fecha_inicio: fechaInicio,
          fecha_fin: fechaFin,
        },
      }
    );
    if (error) throw error;
    return data;
  },

  /**
   * Activar lapso
   * POST /functions/v1/periodos-activate_lapso
   */
  activarLapso: async (lapsoId) => {
    const { data, error } = await supabase.functions.invoke(
      'periodos-activate_lapso',
      {
        method: 'POST',
        body: { lapso_id: lapsoId },
      }
    );
    if (error) throw error;
    return data;
  },

  /**
   * Cerrar lapso
   * POST /functions/v1/periodos-close_lapso
   */
  cerrarLapso: async (lapsoId) => {
    const { data, error } = await supabase.functions.invoke(
      'periodos-close_lapso',
      {
        method: 'POST',
        body: { lapso_id: lapsoId },
      }
    );
    if (error) throw error;
    return data;
  },

  /**
   * Cerrar año escolar
   * POST /functions/v1/periodos-close_anio
   */
  cerrarAnio: async (anioId) => {
    const { data, error } = await supabase.functions.invoke(
      'periodos-close_anio',
      {
        method: 'POST',
        body: { anio_id: anioId },
      }
    );
    if (error) throw error;
    return data;
  },

  /**
   * Obtener período académico activo
   * GET /functions/v1/periodos-get_activo
   */
  obtenerActivo: async () => {
    const { data, error } = await supabase.functions.invoke(
      'periodos-get_activo',
      { method: 'GET' }
    );
    if (error) throw error;
    return data;
  },
};

// ============================================================================
// SECCIONES - Sections/Grades
// ============================================================================

const seccionesAPI = {
  /**
   * Listar secciones
   * GET /functions/v1/secciones-listar
   */
  listar: async (filters = {}) => {
    const { data, error } = await supabase.functions.invoke(
      'secciones-listar',
      {
        method: 'GET',
        body: filters,
      }
    );
    if (error) throw error;
    return data;
  },

  /**
   * Crear sección
   * POST /functions/v1/secciones-crear
   */
  crear: async (seccionData) => {
    const { data, error } = await supabase.functions.invoke(
      'secciones-crear',
      {
        method: 'POST',
        body: seccionData,
      }
    );
    if (error) throw error;
    return data;
  },

  /**
   * Editar sección
   * POST /functions/v1/secciones-editar
   */
  editar: async (seccionId, updates) => {
    const { data, error } = await supabase.functions.invoke(
      'secciones-editar',
      {
        method: 'POST',
        body: { seccion_id: seccionId, ...updates },
      }
    );
    if (error) throw error;
    return data;
  },

  /**
   * Asignar docente a materia en sección
   * POST /functions/v1/secciones-asignar-docente
   */
  asignarDocente: async (seccionId, materiaId, docenteId) => {
    const { data, error } = await supabase.functions.invoke(
      'secciones-asignar-docente',
      {
        method: 'POST',
        body: {
          seccion_id: seccionId,
          materia_id: materiaId,
          docente_id: docenteId,
        },
      }
    );
    if (error) throw error;
    return data;
  },

  /**
   * Cambiar docente de una materia
   * POST /functions/v1/secciones-cambiar-docente
   */
  cambiarDocente: async (seccionId, materiaId, nuevoDocenteId) => {
    const { data, error } = await supabase.functions.invoke(
      'secciones-cambiar-docente',
      {
        method: 'POST',
        body: {
          seccion_id: seccionId,
          materia_id: materiaId,
          nuevo_docente_id: nuevoDocenteId,
        },
      }
    );
    if (error) throw error;
    return data;
  },

  /**
   * Listar materias de una sección
   * GET /functions/v1/secciones-listar-materias
   */
  listarMaterias: async (seccionId) => {
    const { data, error } = await supabase.functions.invoke(
      'secciones-listar-materias',
      {
        method: 'GET',
        body: { seccion_id: seccionId },
      }
    );
    if (error) throw error;
    return data;
  },

  /**
   * Agregar materia a sección
   * POST /functions/v1/secciones-agregar-materia
   */
  agregarMateria: async (seccionId, materiaId) => {
    const { data, error } = await supabase.functions.invoke(
      'secciones-agregar-materia',
      {
        method: 'POST',
        body: {
          seccion_id: seccionId,
          materia_id: materiaId,
        },
      }
    );
    if (error) throw error;
    return data;
  },

  /**
   * Quitar materia de sección
   * POST /functions/v1/secciones-quitar-materia
   */
  quitarMateria: async (seccionId, materiaId) => {
    const { data, error } = await supabase.functions.invoke(
      'secciones-quitar-materia',
      {
        method: 'POST',
        body: {
          seccion_id: seccionId,
          materia_id: materiaId,
        },
      }
    );
    if (error) throw error;
    return data;
  },

  /**
   * Clonar sección a otro año
   * POST /functions/v1/secciones-clonar-otro-anio
   */
  clonarAOtroAnio: async (seccionId, anioDestino) => {
    const { data, error } = await supabase.functions.invoke(
      'secciones-clonar-otro-anio',
      {
        method: 'POST',
        body: {
          seccion_id: seccionId,
          anio_destino: anioDestino,
        },
      }
    );
    if (error) throw error;
    return data;
  },

  /**
   * Toggle sección (activa/inactiva)
   * POST /functions/v1/secciones-toggle
   */
  toggle: async (seccionId) => {
    const { data, error } = await supabase.functions.invoke(
      'secciones-toggle',
      {
        method: 'POST',
        body: { seccion_id: seccionId },
      }
    );
    if (error) throw error;
    return data;
  },
};

// ============================================================================
// ESTUDIANTES - Students
// ============================================================================

const estudiantesAPI = {
  /**
   * Listar estudiantes
   * GET /functions/v1/listar-estudiantes
   */
  listar: async (filters = {}) => {
    const { data, error } = await supabase.functions.invoke(
      'listar-estudiantes',
      {
        method: 'GET',
        body: filters,
      }
    );
    if (error) throw error;
    return data;
  },

  /**
   * Inscribir estudiante
   * POST /functions/v1/inscribir-estudiante
   */
  inscribir: async (estudianteData) => {
    const { data, error } = await supabase.functions.invoke(
      'inscribir-estudiante',
      {
        method: 'POST',
        body: estudianteData,
      }
    );
    if (error) throw error;
    return data;
  },

  /**
   * Cambiar estudiante de sección
   * POST /functions/v1/cambiar-seccion
   */
  cambiarSeccion: async (estudianteId, nuevaSeccionId) => {
    const { data, error } = await supabase.functions.invoke(
      'cambiar-seccion',
      {
        method: 'POST',
        body: {
          estudiante_id: estudianteId,
          nueva_seccion_id: nuevaSeccionId,
        },
      }
    );
    if (error) throw error;
    return data;
  },

  /**
   * Promover estudiante
   * POST /functions/v1/promover-estudiante
   */
  promover: async (estudianteId) => {
    const { data, error } = await supabase.functions.invoke(
      'promover-estudiante',
      {
        method: 'POST',
        body: { estudiante_id: estudianteId },
      }
    );
    if (error) throw error;
    return data;
  },

  /**
   * Repetir grado (estudiante)
   * POST /functions/v1/repetir-grado
   */
  repetir: async (estudianteId) => {
    const { data, error } = await supabase.functions.invoke(
      'repetir-grado',
      {
        method: 'POST',
        body: { estudiante_id: estudianteId },
      }
    );
    if (error) throw error;
    return data;
  },

  /**
   * Retirar estudiante
   * POST /functions/v1/retirar-estudiante
   */
  retirar: async (estudianteId) => {
    const { data, error } = await supabase.functions.invoke(
      'retirar-estudiante',
      {
        method: 'POST',
        body: { estudiante_id: estudianteId },
      }
    );
    if (error) throw error;
    return data;
  },
};

// ============================================================================
// EXPORTAR TODOS LOS SERVICIOS
// ============================================================================

const API = {
  usuarios: usuariosAPI,
  periodos: periodosAPI,
  secciones: seccionesAPI,
  estudiantes: estudiantesAPI,
};

window.API = API;
