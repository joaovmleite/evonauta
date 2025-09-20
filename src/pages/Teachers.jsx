import React, { useMemo, useState, useCallback } from 'react';
import { useAppContext } from '../context/AppContext';

// Útilitario de escape para evitar XSS
const escapeHtml = (str) => String(str).replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','\'':'&#39;','"':'&quot;'})[c]);

function DegreeClassSelect({ degrees, classes, formDegrees, formClasses, onDegreeChange, onClassChange }) {
  return (
    <>
      <select
        multiple
        value={formDegrees}
        onChange={onDegreeChange}
        required
        className="uk-select"
        style={{ minWidth: 180, minHeight: 80, borderColor: '#b1040e', background: '#fafbfc', color: '#222', marginRight: 8 }}
      >
        {degrees.map(({ id, name }) => (
          <option key={id} value={id}>{name}</option>
        ))}
      </select>
      <select
        multiple
        value={formClasses}
        onChange={onClassChange}
        required
        className="uk-select"
        style={{ minWidth: 120, minHeight: 80, borderColor: '#b1040e', background: '#fafbfc', color: '#222' }}
      >
        {classes.map(({ name }, idx) => (
          <option key={idx + 1} value={idx + 1}>{name}</option>
        ))}
      </select>
    </>
  );
}

function RelationshipForm({ open, onClose, teachers, matters, degrees, classes, onSubmit }) {
  const [teacher, setTeacher] = useState('');
  const [matter, setMatter] = useState('');
  const [selectedDegrees, setSelectedDegrees] = useState([]);
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [error, setError] = useState('');

  const handleSelectChange = setter => e => setter(Array.from(e.target.selectedOptions, o => Number(o.value)));

  const handleSubmit = e => {
    e.preventDefault();
    if (!teacher || !matter || !selectedDegrees.length || !selectedClasses.length) {
      setError('Todos os campos são obrigatórios.');
      return;
    }

    setError('');

    onSubmit({
      teacher: Number(teacher),
      matter: escapeHtml(matter),
      degrees: selectedDegrees,
      classes: selectedClasses
    });

    setTeacher('');
    setMatter('');
    setSelectedDegrees([]);
    setSelectedClasses([]);
  };

  if (!open) return null;
  
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
      background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000
    }}>
      <div style={{
        background: '#fff', borderRadius: 12, padding: 32, minWidth: 400, maxWidth: 520, width: '100%',
        boxShadow: '0 2px 32px rgba(0,0,0,0.18)',
        position: 'relative',
        display: 'flex', flexDirection: 'column',
      }}>
        <button onClick={onClose} style={{ position: 'absolute', top: 12, right: 16, fontSize: 22, background: 'none', border: 'none', cursor: 'pointer', color: '#b1040e' }}>×</button>
        <h3 style={{ color: '#b1040e', textAlign: 'center', marginBottom: 24 }}>Novo relacionamento</h3>
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
            <select className="uk-select" value={teacher} onChange={e => setTeacher(e.target.value)} required>
              <option value=''>Selecione o professor</option>
              {teachers.map(({ id, name }) => (
                <option key={id} value={id}>{name}</option>
              ))}
            </select>
            <select className="uk-select" value={matter} onChange={e => setMatter(e.target.value)} required>
              <option value=''>Selecione a matéria</option>
              {matters.map(({ id, name }) => (
                <option key={id} value={id}>{name}</option>
              ))}
            </select>
          </div>
          <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
            <DegreeClassSelect
              degrees={degrees}
              classes={classes}
              formDegrees={selectedDegrees}
              formClasses={selectedClasses}
              onDegreeChange={handleSelectChange(setSelectedDegrees)}
              onClassChange={handleSelectChange(setSelectedClasses)}
            />
          </div>
          {error && <div style={{ color: 'red', marginBottom: 12 }}>{error}</div>}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
            <button type="button" className="uk-button uk-button-default" onClick={onClose}>Cancelar</button>
            <button type="submit" className="uk-button uk-button-danger">Adicionar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function StudentsModal({ open, onClose, degree, students, classes }) {
  if (!open) return null;

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
      background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
    }}>
      <div style={{ background: '#fff', borderRadius: 12, padding: 32, minWidth: 340, maxWidth: 520, maxHeight: '90vh', overflow: 'auto', boxShadow: '0 2px 32px rgba(0,0,0,0.18)', position: 'relative' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: 12, right: 16, fontSize: 22, background: 'none', border: 'none', cursor: 'pointer', color: '#b1040e' }}>×</button>
        <h3 style={{ color: '#b1040e', textAlign: 'center', marginBottom: 24 }}>Alunos da série: {degree?.name}</h3>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {students.length === 0 ? (
            <li style={{ color: '#888', textAlign: 'center', padding: 16 }}>Nenhum aluno encontrado.</li>
          ) : students.map(s => (
            <li
              key={s.id}
              style={{
                background: '#fafbfc',
                border: '1px solid #eee',
                borderRadius: 6,
                marginBottom: 10,
                padding: '10px 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: 16,
                color: '#222',
                boxShadow: '0 1px 4px rgba(0,0,0,0.03)'
              }}
            >
              <span style={{ fontWeight: 500 }}>{s.name}</span>
              <span style={{ color: '#b1040e', fontSize: 15, marginLeft: 12 }}>Turma {classes[s.classId - 1]?.name || '-'}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}


// Utilitários
const getClassIdsForDegree = (degreeId, students) =>
  Array.from(new Set(students.filter(s => s.degreeId === degreeId).map(s => s.classId))).sort((a, b) => a - b);

export default function Teachers() {
  const {
    teachers,
    degrees,
    classes,
    matters,
    relationships,
    students,
    loading,
    error
  } = useAppContext();

  const [showForm, setShowForm] = useState(false);
  const [degreeFilter, setDegreeFilter] = useState('');
  const [classFilter, setClassFilter] = useState('');
  
  const [selectedTurmas, setSelectedTurmas] = useState({}); // { [relId_degreeId]: classId }
  const [showStudents, setShowStudents] = useState({ degreeId: null, classId: null });

  const [refresh, setRefresh] = useState(0);
  React.useEffect(() => {
    setRefresh(r => r + 1);
  }, [students]);


  const filteredRelationships = useMemo(() =>
    relationships.filter(rel =>
      (!degreeFilter || rel.degrees.some(d => d.degreeId === Number(degreeFilter))) &&
      (!classFilter || rel.degrees.some(d => d.classes.some(c => (c.classId || c.classPosition) === Number(classFilter))))
    ),
    [relationships, degreeFilter, classFilter, refresh]
  );

  const handleAddRelationship = useCallback(({ teacher, matter, degrees: degs, classes: cls }) => {
    const nextId = relationships.length ? Math.max(...relationships.map(r => r.id)) + 1 : 1;
    relationships.push({
      id: nextId,
      teacherId: Number(teacher),
      matterId: Number(matter),
      degrees: degs.map(degreeId => ({
        degreeId,
        classes: cls.map(classId => ({ classId }))
      }))
    });
    setShowForm(false);
  }, [relationships]);


  if (loading) return <div>Carregando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="uk-container uk-margin-medium-top uk-margin-large-bottom" style={{ background: '#ffff', padding: '20px', border: '1px solid #bcbcbc' }}>
      <div
        className="uk-align-center"
        style={{
          maxWidth: 1200,
          width: '100%',
          margin: '0 auto',
          boxSizing: 'border-box',
          padding: '0 8px',
        }}
      >
        <h2 className="uk-heading-line uk-text-center" style={{ color: '#b1040e' }}><span>Professores</span></h2>
        <RelationshipForm
          open={showForm}
          onClose={() => setShowForm(false)}
          teachers={teachers}
          matters={matters}
          degrees={degrees}
          classes={classes}
          onSubmit={handleAddRelationship}
        />
        <div className="uk-flex uk-flex-between uk-flex-middle uk-margin-bottom uk-child-width-expand@s uk-grid-small" data-uk-grid>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <select className="uk-select uk-form-width-medium uk-margin-right" value={degreeFilter} onChange={e => setDegreeFilter(e.target.value)}>
                <option value=''>Todas as séries</option>
                {degrees.map(({ id, name }) => (
                  <option key={id} value={id}>{name}</option>
                ))}
              </select>
              <select className="uk-select uk-form-width-medium uk-margin-right" value={classFilter} onChange={e => setClassFilter(e.target.value)}>
                <option value=''>Todas as turmas</option>
                {classes.map(({ name }, idx) => (
                  <option key={idx + 1} value={idx + 1}>{name}</option>
                ))}
              </select>
            </div>
            <div>
              <button className="uk-button uk-button-danger" onClick={() => setShowForm(true)}>
                Adicionar relacionamento
              </button>
            </div>
          </div>
        </div>
        <div
          className="uk-overflow-auto uk-margin-top"
          style={{
            maxHeight: 600,
            overflowY: 'auto',
            overflowX: 'auto',
            WebkitOverflowScrolling: 'touch',
            width: '100%',
          }}
        >
          <table
            className="uk-table uk-table-divider uk-table-hover uk-table-middle uk-table-striped"
            style={{ minWidth: 900, width: '100%' }}
          >
            <thead>
              <tr style={{ backgroundColor: '#b1040e' }}>
                <th style={{ color: "#ffff"}}>Professor</th>
                <th style={{ color: "#ffff"}}>Matéria</th>
                <th style={{ color: "#ffff"}}>Séries</th>
                <th style={{ color: "#ffff"}}>Turmas</th>
                <th style={{ color: "#ffff"}}>Alunos</th>
              </tr>
            </thead>
            <tbody>
              {filteredRelationships.map(rel => {
                const teacher = teachers.find(t => t.id === rel.teacherId);
                const matter = matters.find(m => m.id === rel.matterId);
                return (
                  <tr key={rel.id}>
                    <td>{teacher?.name || '-'}</td>
                    <td>{matter?.name || '-'}</td>
                    <td>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                        {rel.degrees.map(d => (
                          <span key={d.degreeId}>{degrees.find(deg => deg.id === d.degreeId)?.name || '-'}</span>
                        ))}
                      </div>
                    </td>
                    <td style={{ minWidth: 120 }}>
                      {rel.degrees.map(d => {
                        const classIds = getClassIdsForDegree(d.degreeId, students);
                        const turmaNomes = classIds.map(cid => classes[cid - 1]?.name || '-');
                        const relKey = `${rel.id}_${d.degreeId}`;
                        const selected = selectedTurmas[relKey] || classIds[0] || '';
                        return (
                          <div key={d.degreeId} style={{ display: "flex", flexDirection: "column", marginBottom: 4 }}>
                            <span style={{ fontWeight: 500 }}>{degrees.find(deg => deg.id === d.degreeId)?.name}:</span>
                            <select
                              className="uk-select"
                              style={{ marginLeft: 6, minWidth: 60, display: 'inline-block', width: 'auto' }}
                              value={selected}
                              onChange={e => setSelectedTurmas(st => ({ ...st, [relKey]: Number(e.target.value) }))}
                            >
                              {turmaNomes.length > 0 ? turmaNomes.map((name, idx) => (
                                <option key={classIds[idx]} value={classIds[idx]}>{name}</option>
                              )) : <option value="">-</option>}
                            </select>
                          </div>
                        );
                      })}
                    </td>
                    <td>
                      {rel.degrees.map(d => {
                        const relKey = `${rel.id}_${d.degreeId}`;
                        const classIds = getClassIdsForDegree(d.degreeId, students);
                        const selected = selectedTurmas[relKey] || classIds[0] || '';
                        return (
                          <button
                            key={d.degreeId}
                            className="uk-button uk-button-text uk-button-small"
                            style={{ display: "block", color: '#b1040e', marginRight: 4 }}
                            onClick={() => setShowStudents({ degreeId: d.degreeId, classId: selected })}
                          >
                            {degrees.find(deg => deg.id === d.degreeId)?.name || ''}
                          </button>
                        );
                      })}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <StudentsModal
          open={!!showStudents.degreeId}
          onClose={() => setShowStudents({ degreeId: null, classId: null })}
          degree={degrees.find(d => d.id === showStudents.degreeId)}
          students={students.filter(s => s.degreeId === showStudents.degreeId && (!showStudents.classId || s.classId === showStudents.classId))}
          classes={classes}
        />
      </div>
    </div>
  );
}