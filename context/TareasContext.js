import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from 'react';
import { apiUrl } from '../config';
import { AuthContext } from './AuthContext';

export const TareasContext = createContext();

export function TareasProvider({ children }) {
  const [tareas, setTareas] = useState([]);
  const [tareaActual, setTareaActual] = useState({
    titulo: '',
    descripcion: '',
  });
  const auth = useContext(AuthContext);

  const obtenerTareas = useCallback(async () => {
    if (!auth.token) return;
    try {
      const url = apiUrl + '/tareas';
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.token}`,
        },
      });
      if (response.status === 401) return await auth.logout();

      const datos = await response.json();
      console.log(datos);
      setTareas(datos);
      console.log(datos);
    } catch (error) {
      await auth.logout();
      console.log(error);
    }
  }, [auth.token]);

  useEffect(() => {
    /* Lógica para llenar la lista de tareas desde la API */
    obtenerTareas();
  }, [obtenerTareas, auth.token]);

  const completarTarea = useCallback(
    async (id, completada) => {
      try {
        const url = apiUrl + '/tareas/' + id;
        const response = await fetch(url, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${auth.token}`,
          },
          body: JSON.stringify({
            completada: completada,
          }),
        });
        if (response.status === 401) return await auth.logout();

        const datos = await response.json();
        setTareas(prev => [
          ...prev.map(tarea => (tarea.id === id ? datos : tarea)),
        ]);
      } catch (error) {
        await auth.logout();
        console.log(error);
      }
    },
    [auth.token]
  );

  const guardarTarea = useCallback(
    async tarea => {
      try {
        const url = apiUrl + '/tareas';
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${auth.token}`,
          },
          body: JSON.stringify(tarea),
        });
        if (response.status === 401) return await auth.logout();

        const datos = await response.json();
        console.log(datos);
        setTareas(prev => [...prev, datos]);
      } catch (error) {
        await auth.logout();
        console.log(error);
      }
    },
    [auth.token]
  );

  const modificarTarea = useCallback(
    async tarea => {
      try {
        const url = apiUrl + '/tareas/' + tarea.id;
        const response = await fetch(url, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${auth.token}`,
          },
          body: JSON.stringify(tarea),
        });
        if (response.status === 401) return await auth.logout();

        const datos = await response.json();
        setTareas(prev => [...prev.map(t => (t.id === tarea.id ? datos : t))]);
      } catch (error) {
        await auth.logout();
        console.log(error);
      }
    },
    [auth.token]
  );

  const borrarTarea = useCallback(
    async id => {
      try {
        const url = apiUrl + '/tareas/' + id;
        const response = await fetch(url, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${auth.token}`,
          },
        });
        if (response.status === 401) return await auth.logout();

        setTareas(prev => prev.filter(tarea => tarea.id !== id));
      } catch (error) {
        await auth.logout();
        console.log(error);
      }
    },
    [auth.token]
  );

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
