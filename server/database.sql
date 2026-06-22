-- =============================================================
-- SCRIPT DE BASE DE DATOS: Sistema de Gestión de Empleados RRHH
-- BASE DE DATOS: PostgreSQL
-- =============================================================

-- TABLA: empleados
CREATE TABLE IF NOT EXISTS empleados (
    idEmpleados               SERIAL PRIMARY KEY,
    nombresEmpleados          VARCHAR(100),
    apellidosEmpleados        VARCHAR(100)    NOT NULL,
    fechaNacimientoEmpleados  DATE            NOT NULL,
    correoPersonalEmpleados   VARCHAR(150)    NOT NULL UNIQUE,
    numeroCelularEmpleados    VARCHAR(20)     NOT NULL,
    fechaContratacionEmpleados DATE           NOT NULL,
    puestoEmpleados           VARCHAR(100)    NOT NULL,
    salarioBasicoEmpleados    NUMERIC(12,2)  NOT NULL DEFAULT 0,
    asignacionesEmpleados     NUMERIC(12,2)  NOT NULL DEFAULT 0,
    deduccionesEmpleados      NUMERIC(12,2)  NOT NULL DEFAULT 0,
    estadoEmpleados           VARCHAR(20)    NOT NULL DEFAULT 'ACTIVO'
        CHECK (estadoEmpleados IN ('ACTIVO','INACTIVO')),
    correoEmpresarialEmpleados VARCHAR(150)    NOT NULL UNIQUE,
    passwordEmpleados         VARCHAR(255)    NOT NULL,
    rol_id                INTEGER NOT NULL REFERENCES roles(idRol) ON DELETE CASCADE,
    departamento_id           INTEGER NOT NULL REFERENCES departamentos(idDepartamento) ON DELETE CASCADE,
    fechaCreacion             TIMESTAMP      NOT NULL DEFAULT NOW(),
    fechaActualizacion        TIMESTAMP      NOT NULL DEFAULT NOW()
);


-- TABLA: roles
CREATE TABLE IF NOT EXISTS roles (
    idRol           SERIAL PRIMARY KEY,
    nombre_rol VARCHAR(20) NOT NULL UNIQUE,
    descripcion TEXT
);

INSERT INTO roles (nombre_rol, descripcion) VALUES
    ('EMPLEADO','Acceso a funcionalidades básicas'),
    ('ADMIN','Gestión completa del sistema'),
    ('RRHH','Gestión de personal y nóminas')
ON CONFLICT DO NOTHING;

CREATE TABLE IF NOT EXISTS departamentos (
    idDepartamento   SERIAL PRIMARY KEY,
    nombreDepartamento VARCHAR(100) NOT NULL,
    fechaCreacion      TIMESTAMP NOT NULL DEFAULT NOW(),
    fechaActualizacion TIMESTAMP NOT NULL DEFAULT NOW()
);

-- TABLA: usuarios
CREATE TABLE IF NOT EXISTS usuarios (
    idUsuario          SERIAL PRIMARY KEY,
    empleado_id        INTEGER NOT NULL REFERENCES empleados(idEmpleados) ON DELETE CASCADE,
    username           VARCHAR(100) NOT NULL UNIQUE,
    password_hash      VARCHAR(255) NOT NULL,
    rol_id             INTEGER NOT NULL REFERENCES roles(idRol),
    ultimo_login       TIMESTAMP,
    fechaCreacion      TIMESTAMP NOT NULL DEFAULT NOW(),
    fechaActualizacion TIMESTAMP NOT NULL DEFAULT NOW()
);

-- TABLA: turnos
CREATE TABLE IF NOT EXISTS turnos (
    idTurno          SERIAL PRIMARY KEY,
    nombre_turno      VARCHAR(50) NOT NULL,
    hora_entrada      TIME NOT NULL,
    hora_salida       TIME NOT NULL,
    descripcion       TEXT,
    fechaCreacion     TIMESTAMP NOT NULL DEFAULT NOW(),
    fechaActualizacion TIMESTAMP NOT NULL DEFAULT NOW()
);

-- TABLA: asistencias
CREATE TABLE IF NOT EXISTS asistencias (
    idAsistencia       SERIAL PRIMARY KEY,
    empleado_id        INTEGER NOT NULL REFERENCES empleados(idEmpleados) ON DELETE CASCADE,
    turno_id           INTEGER REFERENCES turnos(idTurno),
    fecha_hora_entrada TIMESTAMP NOT NULL,
    fecha_hora_salida  TIMESTAMP,
    tipo_asistencia    VARCHAR(20) NOT NULL DEFAULT 'NORMAL'
        CHECK (tipo_asistencia IN ('NORMAL','VACACIONES','ENFERMEDAD','OTRO')),
    fechaCreacion      TIMESTAMP NOT NULL DEFAULT NOW(),
    fechaActualizacion TIMESTAMP NOT NULL DEFAULT NOW()
);

-- TABLA: nominas
CREATE TABLE IF NOT EXISTS nominas (
    idNomina          SERIAL PRIMARY KEY,
    empleado_id       INTEGER NOT NULL REFERENCES empleados(idEmpleados) ON DELETE CASCADE,
    mes               DATE NOT NULL, -- primer día del mes
    salario_basico    NUMERIC(12,2) NOT NULL,
    asignaciones      NUMERIC(12,2) NOT NULL DEFAULT 0,
    deducciones       NUMERIC(12,2) NOT NULL DEFAULT 0,
    total_pagado      NUMERIC(12,2) GENERATED ALWAYS AS (salario_basico + asignaciones - deducciones) STORED,
    fecha_pago        TIMESTAMP,
    estado            VARCHAR(20) NOT NULL DEFAULT 'PENDIENTE'
        CHECK (estado IN ('PENDIENTE','PAGADO','RECHAZADO')),
    fechaCreacion      TIMESTAMP NOT NULL DEFAULT NOW(),
    fechaActualizacion TIMESTAMP NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_nomina_emp_mes UNIQUE (empleado_id, mes)
);

-- TABLA: configuracion
CREATE TABLE IF NOT EXISTS configuracion (
    id_config            SERIAL PRIMARY KEY,
    nombre_empresa       VARCHAR(150) NOT NULL,
    direccion_empresa    VARCHAR(250),
    telefono_empresa     VARCHAR(50),
    email_empresa        VARCHAR(150),
    periodicidad_nomina  VARCHAR(20) NOT NULL DEFAULT 'MENSUAL'
        CHECK (periodicidad_nomina IN ('MENSUAL','QUINCENAL')),
    fechaCreacion        TIMESTAMP NOT NULL DEFAULT NOW(),
    fechaActualizacion   TIMESTAMP NOT NULL DEFAULT NOW()
);











-- Asegurar única fila de configuración
CREATE UNIQUE INDEX IF NOT EXISTS uq_config_unica ON configuracion (id_config);

-- =============================================================
-- FUNCIÓN: actualizar_fecha_actualizacion (trigger helper)
-- =============================================================
CREATE OR REPLACE FUNCTION actualizar_fecha_actualizacion()
RETURNS TRIGGER AS $$
BEGIN
    NEW.fechaActualizacion = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- =============================================================
-- TRIGGERS: aplicar a todas las tablas que tienen fechaActualizacion
-- =============================================================
DO $$
DECLARE
    tbl TEXT;
BEGIN
    FOR tbl IN
        SELECT tablename FROM pg_tables WHERE schemaname = 'public' AND tablename IN (
            'empleados','usuarios','turnos','asistencias','nominas','configuracion'
        )
    LOOP
        EXECUTE format('DROP TRIGGER IF EXISTS trg_actualizar_%I ON %I', tbl, tbl);
        EXECUTE format('CREATE TRIGGER trg_actualizar_%I BEFORE UPDATE ON %I FOR EACH ROW EXECUTE FUNCTION actualizar_fecha_actualizacion()', tbl, tbl);
    END LOOP;
END $$;

-- =============================================================
-- ÍNDICES: para consultas frecuentes
-- =============================================================
CREATE INDEX IF NOT EXISTS idx_asistencias_emp ON asistencias(empleado_id);
CREATE INDEX IF NOT EXISTS idx_nominas_emp ON nominas(empleado_id);
CREATE INDEX IF NOT EXISTS idx_nominas_mes ON nominas(mes);
CREATE INDEX IF NOT EXISTS idx_usuarios_emp ON usuarios(empleado_id);
CREATE INDEX IF NOT EXISTS idx_asistencias_turno ON asistencias(turno_id);

-- =============================================================
-- DATOS INICIALES: empresa y usuario admin
-- =============================================================
INSERT INTO configuracion (nombre_empresa, direccion_empresa, telefono_empresa, email_empresa)
VALUES ('MiEmpresa SA', 'Calle Falsa 123', '+54 11 1234 5678', 'contacto@miempresa.com')
ON CONFLICT DO NOTHING;

INSERT INTO empleados (
    nombresEmpleados, apellidosEmpleados, fechaNacimientoEmpleados, correoPersonalEmpleados,
    numeroCelularEmpleados, fechaContratacionEmpleados, departamento_id, puestoEmpleados,
    salarioBasicoEmpleados, asignacionesEmpleados, deduccionesEmpleados, estadoEmpleados,
    correoEmpresarialEmpleados, passwordEmpleados, rol_id
) VALUES (
    'Admin', 'Sistema', '1990-01-01', 'admin.personal@email.com',
    '999000001', '2024-01-01', (SELECT idDepartamento FROM departamentos WHERE nombreDepartamento = 'Tecnología'), 'Administrador del Sistema',
    5000.00, 500.00, 100.00, 'ACTIVO',
    'admin@talentflow.com',
    -- password: Admin1234 hashed with bcrypt cost=10
    '$2a$10$Ku9v.0VmxXHJy2kBIEqJT.eF1EiVx.E/VT5m3oB9Sn6B9OhQfKkBK',
    (SELECT idRol FROM roles WHERE nombre_rol = 'ADMIN')
) ON CONFLICT (correoEmpresarialEmpleados) DO NOTHING;

INSERT INTO usuarios (empleado_id, username, password_hash, rol_id)
SELECT idEmpleados, 'admin', '$2a$10$Ku9v.0VmxXHJy2kBIEqJT.eF1EiVx.E/VT5m3oB9Sn6B9OhQfKkBK', (SELECT idRol FROM roles WHERE nombre_rol = 'ADMIN')
FROM empleados WHERE correoEmpresarialEmpleados = 'admin@talentflow.com'
ON CONFLICT (username) DO NOTHING;

-- Fin del script
