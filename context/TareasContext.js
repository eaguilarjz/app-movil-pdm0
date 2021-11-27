import React, { createContext, useState, useCallback, useEffect } from 'react';
import { apiUrl } from '../config';

export const TareasContext = createContext();

export function TareasProvider({ children }) {
  const [tareas, setTareas] = useState([{ id: 1, titulo: 'Titulo' }]);
  const [tareaActual, setTareaActual] = useState({
    titulo: '',
    descripcion: '',
  });

  const obtenerTareas = useCallback(async () => {
    try {
      const url = apiUrl + '/tareas';
      const response = await fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const datos = await response.json();
      setTareas(datos);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    /* Lógica para llenar la lista de tareas desde la API */
    obtenerTareas();
  }, [obtenerTareas]);

  const completarTarea = useCallback(async (id, completada) => {
    try {
      const url = apiUrl + '/tareas/' + id;
      const response = await fetch(url, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          completada: completada,
        }),
      });
      const datos = await response.json();
      setTareas(prev => [
        ...prev.map(tarea => (tarea.id === id ? datos : tarea)),
      ]);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const guardarTarea = useCallback(async tarea => {
    try {
      const url = apiUrl + '/tareas';
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tarea),
      });
      const datos = await response.json();
      setTareas(prev => [...prev, datos]);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const modificarTarea = useCallback(async tarea => {
    try {
      const url = apiUrl + '/tareas/' + tarea.id;
      const response = await fetch(url, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tarea),
      });
      const datos = await response.json();
      setTareas(prev => [...prev.map(t => (t.id === tarea.id ? datos : t))]);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const borrarTarea = useCallback(async id => {
    try {
      const url = apiUrl + '/tareas/' + id;
      await fetch(url, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
      setTareas(prev => prev.filter(tarea => tarea.id !== id));
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <TareasContext.Provider
      value={{
        tareas,
        tareaActual,
        setTareaActual,
        obtenerTareas,
        completarTarea,
        guardarTarea,
        borrarTarea,
        modificarTarea,
      }}
    >
      {children}
    </TareasContext.Provider>
  );
}
