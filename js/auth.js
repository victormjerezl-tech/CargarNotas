// ============================================================================
// AUTENTICACIÓN - Login y Gestión de Sesión
// ============================================================================

// Obtener rol principal del usuario
async function obtenerRolPrincipal(userId) {
  try {
    // Intentar obtener el rol desde Supabase
    const { data, error } = await supabase
      .from('user_roles')
      .select('*')
      .eq('user_id', userId)
      .limit(1)
      .single();

    if (!error && data) {
      return {
        rol_principal: data.role || 'Estudiante',
        role_id: data.role_id || 6,
        todos_roles: [data.role] || [],
      };
    }

    // Si no hay rol específico, asignar "Estudiante" por defecto
    return {
      rol_principal: 'Estudiante',
      role_id: 6,
      todos_roles: ['Estudiante'],
    };
  } catch (err) {
    console.warn('No se pudo obtener rol, asignando por defecto:', err);
    return {
      rol_principal: 'Estudiante',
      role_id: 6,
      todos_roles: ['Estudiante'],
    };
  }
}

// Manejador del formulario de login
document.getElementById("loginForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const alertBox = document.getElementById("alert");

  if (!alertBox) {
    console.error("Elemento alert no encontrado");
    return;
  }

  alertBox.classList.add("d-none");

  // 1. Login en Supabase
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    alertBox.className = "alert alert-danger";
    alertBox.textContent = `Error de autenticación: ${error.message}`;
    alertBox.classList.remove("d-none");
    console.error("Error login:", error);
    return;
  }

  if (!data?.session?.access_token || !data?.user) {
    alertBox.className = "alert alert-danger";
    alertBox.textContent = "No se obtuvo token de sesión";
    alertBox.classList.remove("d-none");
    return;
  }

  // 2. Obtener rol principal del usuario
  const rolData = await obtenerRolPrincipal(data.user.id);

  // 3. Guardar sesión
  sessionAPI.guardarSesion(data.user, rolData || {});

  // 4. Redirigir según rol principal
  nav.redirigirPorRol();
});
