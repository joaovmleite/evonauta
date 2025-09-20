import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchJson } from '../utils/fetchJson';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [degrees, setDegrees] = useState([]);
  const [classes, setClasses] = useState([]);
  const [matters, setMatters] = useState([]);
  const [relationships, setRelationships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const [students, teachers, degrees, classesObj, matters, relationships] = await Promise.all([
          fetchJson('students.json'),
          fetchJson('teachers.json'),
          fetchJson('degrees.json'),
          fetchJson('classes.json'),
          fetchJson('matters.json'),
          fetchJson('relationships.json'),
        ]);
        setStudents(students);
        setTeachers(teachers);
        setDegrees(degrees);
        setClasses(classesObj.classes || []);
        setMatters(matters);
        setRelationships(relationships);
        setError(null);
      } catch (e) {
        setError('Erro ao carregar dados iniciais.');
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const value = {
    students, setStudents,
    teachers, setTeachers,
    degrees, setDegrees,
    classes, setClasses,
    matters, setMatters,
    relationships, setRelationships,
    loading, error
  };


  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  return useContext(AppContext);
}
