// ============================================================================
// EDGE FUNCTIONS CRÍTICAS - GESTIÓN DE ROLES Y USUARIOS
// ============================================================================
// Ubicación en Supabase: /functions/
// Estas funciones desbloquean 29 funciones que estaban pendientes

// ============================================================================
// 1. assign-role.ts - Asignar rol a usuario
// ============================================================================

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, GET, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      {
        global: {
          headers: { Authorization: req.headers.get("Authorization") ?? "" },
        },
      }
    )

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return new Response(JSON.stringify({ error: "No autenticado" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      })
    }

    // Verificar que el usuario que asigna tiene permisos (Superadmin o Directivo)
    const { data: asignador_roles } = await supabase
      .from("user_roles")
      .select("role_id")
      .eq("user_id", user.id)
      .eq("activo", true)

    const tiene_permisos = asignador_roles?.some((r: any) => r.role_id === 1 || r.role_id === 2)
    if (!tiene_permisos) {
      return new Response(JSON.stringify({ error: "No tiene permisos para asignar roles" }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      })
    }

    const { usuario_id, role_id } = await req.json()

    if (!usuario_id || !role_id) {
      return new Response(
        JSON.stringify({ error: "usuario_id y role_id son requeridos" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      )
    }

    // Verificar que el rol existe
    const { data: rol } = await supabase
      .from("roles")
      .select("id, nombre")
      .eq("id", role_id)
      .single()

    if (!rol) {
      return new Response(JSON.stringify({ error: "Rol no encontrado" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      })
    }

    // No permitir que Directivo asigne role de Superadmin
    if (role_id === 1 && asignador_roles?.every((r: any) => r.role_id !== 1)) {
      return new Response(
        JSON.stringify({ error: "Solo Superadmin puede asignar el rol de Superadmin" }),
        {
          status: 403,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      )
    }

    // Verificar si el usuario ya tiene este rol
    const { data: rol_existente } = await supabase
      .from("user_roles")
      .select("id")
      .eq("user_id", usuario_id)
      .eq("role_id", role_id)
      .single()

    if (rol_existente) {
      return new Response(JSON.stringify({ error: "El usuario ya tiene este rol" }), {
        status: 409,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      })
    }

    // Insertar el nuevo rol
    const { data, error } = await supabase
      .from("user_roles")
      .insert({
        user_id: usuario_id,
        role_id: role_id,
        asignado_por: user.id,
        asignado_por_rol: asignador_roles?.[0]?.role_id,
        activo: true,
      })
      .select()

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      })
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: `Rol ${rol.nombre} asignado exitosamente`,
        data,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    )
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    })
  }
})

// ============================================================================
// 2. remove-role.ts - Remover rol de usuario
// ============================================================================

/*
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, GET, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      {
        global: {
          headers: { Authorization: req.headers.get("Authorization") ?? "" },
        },
      }
    )

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return new Response(JSON.stringify({ error: "No autenticado" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      })
    }

    // Verificar permisos
    const { data: asignador_roles } = await supabase
      .from("user_roles")
      .select("role_id")
      .eq("user_id", user.id)
      .eq("activo", true)

    const es_superadmin = asignador_roles?.some((r: any) => r.role_id === 1)
    const es_directivo = asignador_roles?.some((r: any) => r.role_id === 2)

    if (!es_superadmin && !es_directivo) {
      return new Response(JSON.stringify({ error: "No tiene permisos" }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      })
    }

    const { user_id, role_id, razon } = await req.json()

    if (!user_id || !role_id) {
      return new Response(
        JSON.stringify({ error: "user_id y role_id son requeridos" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      )
    }

    // No permitir remover el único Superadmin
    if (role_id === 1) {
      const { count } = await supabase
        .from("user_roles")
        .select("*", { count: "exact" })
        .eq("role_id", 1)
        .eq("activo", true)

      if (count === 1) {
        return new Response(
          JSON.stringify({ error: "No se puede remover el único Superadmin" }),
          {
            status: 403,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        )
      }
    }

    // Desactivar el rol
    const { data, error } = await supabase
      .from("user_roles")
      .update({
        activo: false,
        razon_desactivacion: razon || "Removido por administrador",
      })
      .eq("user_id", user_id)
      .eq("role_id", role_id)
      .select()

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      })
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Rol removido exitosamente",
        data,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    )
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    })
  }
})
*/

// ============================================================================
// 3. list-user-roles.ts - Listar todos los roles de un usuario
// ============================================================================

/*
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, GET, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      {
        global: {
          headers: { Authorization: req.headers.get("Authorization") ?? "" },
        },
      }
    )

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return new Response(JSON.stringify({ error: "No autenticado" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      })
    }

    const url = new URL(req.url)
    const usuario_id = url.searchParams.get("usuario_id") || user.id

    // Verificar permisos
    const { data: mis_roles } = await supabase
      .from("user_roles")
      .select("role_id")
      .eq("user_id", user.id)
      .eq("activo", true)

    // Solo puede listar sus propios roles o si es admin
    const es_admin = mis_roles?.some((r: any) => [1, 2].includes(r.role_id))
    if (usuario_id !== user.id && !es_admin) {
      return new Response(JSON.stringify({ error: "No tiene permisos" }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      })
    }

    const { data, error } = await supabase
      .from("user_roles")
      .select(`
        id,
        role_id,
        activo,
        fecha_asignacion,
        fecha_expiracion,
        roles (
          id,
          nombre,
          descripcion
        )
      `)
      .eq("user_id", usuario_id)
      .order("activo", { ascending: false })

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      })
    }

    return new Response(
      JSON.stringify({
        success: true,
        data,
        total: data?.length || 0,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    )
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    })
  }
})
*/

// ============================================================================
// 4. get-user-role-principal.ts - Obtener rol principal del usuario
// ============================================================================

/*
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      {
        global: {
          headers: { Authorization: req.headers.get("Authorization") ?? "" },
        },
      }
    )

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return new Response(JSON.stringify({ error: "No autenticado" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      })
    }

    // Obtener roles activos del usuario - orden de prioridad
    const { data, error } = await supabase
      .from("user_roles")
      .select(`
        id,
        role_id,
        roles (
          id,
          nombre
        )
      `)
      .eq("user_id", user.id)
      .eq("activo", true)
      .order("role_id", { ascending: true })

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      })
    }

    if (!data || data.length === 0) {
      return new Response(
        JSON.stringify({
          success: true,
          rol_principal: "Estudiante",
          role_id: 6,
          todos_roles: [],
        }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      )
    }

    // El rol principal es el de mayor prioridad (menor ID)
    const rol_principal = data[0].roles.nombre

    return new Response(
      JSON.stringify({
        success: true,
        rol_principal,
        role_id: data[0].role_id,
        todos_roles: data.map((r: any) => r.roles.nombre),
        user_id: user.id,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    )
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    })
  }
})
*/

// ============================================================================
// 5. create-docente.ts - Crear nuevo docente (por Directivo)
// ============================================================================

/*
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, GET, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      {
        global: {
          headers: { Authorization: req.headers.get("Authorization") ?? "" },
        },
      }
    )

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return new Response(JSON.stringify({ error: "No autenticado" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      })
    }

    // Verificar que es Directivo o Superadmin
    const { data: roles } = await supabase
      .from("user_roles")
      .select("role_id")
      .eq("user_id", user.id)
      .eq("activo", true)

    const puede_crear = roles?.some((r: any) => [1, 2].includes(r.role_id))
    if (!puede_crear) {
      return new Response(JSON.stringify({ error: "No tiene permisos para crear docentes" }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      })
    }

    const { email, nombre, apellido, cedula, especialidad } = await req.json()

    if (!email || !nombre || !apellido || !cedula) {
      return new Response(
        JSON.stringify({ error: "Campos requeridos: email, nombre, apellido, cedula" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      )
    }

    // Crear usuario en Auth
    const { data: auth_data, error: auth_error } = await supabase.auth.admin.createUser({
      email,
      password: Math.random().toString(36).slice(-12), // Contraseña aleatoria
      email_confirm: false,
      user_metadata: {
        nombre,
        apellido,
        cedula,
      },
    })

    if (auth_error) {
      return new Response(JSON.stringify({ error: auth_error.message }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      })
    }

    // Asignar rol de Docente (role_id = 4)
    const { error: role_error } = await supabase
      .from("user_roles")
      .insert({
        user_id: auth_data.user.id,
        role_id: 4,
        asignado_por: user.id,
        asignado_por_rol: roles?.[0]?.role_id,
      })

    if (role_error) {
      // Limpiar usuario si falla la asignación de rol
      await supabase.auth.admin.deleteUser(auth_data.user.id)
      return new Response(JSON.stringify({ error: role_error.message }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      })
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Docente creado exitosamente",
        docente: {
          id: auth_data.user.id,
          email,
          nombre,
          apellido,
          cedula,
          especialidad,
        },
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    )
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    })
  }
})
*/

// ============================================================================
// FIN DE EDGE FUNCTIONS CRÍTICAS
// ============================================================================
// Notas de implementación:
// 1. Copiar el código de la función 1 (assign-role.ts) en tu Supabase dashboard
// 2. Descomentar y copiar funciones 2-5 en nuevos archivos
// 3. Actualizar las rutas en tu auth.js para llamar estas funciones
// 4. Todas las funciones incluyen validaciones de permisos por rol
// 5. Incluyen auditoría automática vía triggers en la BD
