# HU-19 - Diagrama de proceso del curso de ciberseguridad

```mermaid
flowchart LR
    A((Inicio))

    subgraph Sistema
        S1[Sistema muestra el catalogo de cursos]
        S2[Sistema verifica prerrequisitos]
        D1{Fundamentos completado?}
        S3[Sistema muestra mensaje de curso bloqueado]
        S4[Sistema abre la pagina del curso y sus unidades]
        S5[Sistema presenta unidades de buenas practicas, hashing, cifrado, trafico, scripts de auditoria y analisis de logs]
        S6[Sistema muestra la mision: video, documentacion y reto]
        S7[Sistema desbloquea la evaluacion de la unidad]
        D2{Quedan unidades por completar?}
        S8[Sistema desbloquea la evaluacion final]
        S9[Sistema registra el curso como completado]
        S10[Sistema habilita la ruta siguiente y conserva el progreso]
    end

    subgraph Usuario
        U1[Usuario selecciona el curso de ciberseguridad]
        U2[Usuario navega las unidades y abre una mision]
        U3[Usuario completa el reto y avanza por las misiones de la unidad]
        U4[Usuario responde y aprueba la evaluacion de la unidad]
        U5[Usuario abre la siguiente unidad pendiente]
        U6[Usuario responde y aprueba la evaluacion final]
    end

    B1((Fin bloqueado))
    B2((Fin curso completado))

    A --> S1 --> U1 --> S2 --> D1
    D1 -- No --> S3 --> B1
    D1 -- Si --> S4 --> S5 --> U2 --> S6 --> U3 --> S7 --> U4 --> D2
    D2 -- Si --> U5 --> U2
    D2 -- No --> S8 --> U6 --> S9 --> S10 --> B2
```

## Resumen de la HU

- El curso solo queda disponible cuando el usuario completa `Fundamentos de Python`.
- El flujo del curso cubre unidades sobre buenas practicas, hashing, cifrado, analisis de trafico, scripts de auditoria y cierre con analisis de logs.
- Al completar las misiones de cada unidad, se habilita su evaluacion.
- Al aprobar todas las unidades, se habilita la evaluacion final.
- Al aprobar la evaluacion final, el sistema marca el curso como completado y conserva el progreso.
