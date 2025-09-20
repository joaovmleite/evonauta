import React, { useMemo, useState, useCallback } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useAppContext } from '../context/AppContext';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const NAMES = ['Ana', 'Bruno', 'Carlos', 'Daniela', 'Eduardo', 'Fernanda', 'Gabriel', 'Helena', 'Igor', 'Juliana', 'Kleber', 'Larissa', 'Marcos', 'Natália', 'Otávio', 'Patrícia', 'Rafael', 'Sabrina', 'Tiago', 'Vanessa'];
const SURNAMES = ['Silva', 'Souza', 'Oliveira', 'Santos', 'Lima', 'Pereira', 'Ferreira', 'Almeida', 'Costa', 'Gomes'];

function randomName() {
  return `${NAMES[Math.floor(Math.random() * NAMES.length)]} ${SURNAMES[Math.floor(Math.random() * SURNAMES.length)]}`;
}

function Students() {
  const { students, degrees, classes, setStudents, loading, error } = useAppContext();
  const [degreeFilter, setDegreeFilter] = useState('');
  const [classFilter, setClassFilter] = useState('');
  const [edit, setEdit] = useState(null); // { id, name, classId }
  const [showChart, setShowChart] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 30;

  const handleGenerateStudents = useCallback(() => {
    setStudents(prev => {
      const nextId = prev.length ? Math.max(...prev.map(s => s.id)) + 1 : 1;
      const newStudents = Array.from({ length: 300 }, (_, i) => {
        const degree = degrees[Math.floor(Math.random() * degrees.length)];
        const classIdx = Math.floor(Math.random() * classes.length);
        return {
          id: nextId + i,
          ra: Math.floor(Math.random() * 1000000),
          name: randomName(),
          degreeId: degree.id,
          classId: classIdx + 1
        };
      });
      return [...prev, ...newStudents];
    });
  }, [setStudents, degrees, classes]);

  const studentsByDegree = useMemo(() => {
    const map = Object.fromEntries(degrees.map(d => [d.name, 0]));
    students.forEach(s => {
      const degree = degrees.find(d => d.id === s.degreeId);
      if (degree) map[degree.name]++;
    });
    return map;
  }, [students, degrees]);

  const chartData = useMemo(() => ({
    labels: Object.keys(studentsByDegree),
    datasets: [
      {
        label: 'Alunos por série',
        data: Object.values(studentsByDegree),
        backgroundColor: 'rgba(53, 162, 235, 0.5)'
      }
    ]
  }), [studentsByDegree]);


  const filteredStudents = useMemo(() =>
    students.filter(s =>
      (!degreeFilter || s.degreeId === Number(degreeFilter)) &&
      (!classFilter || s.classId === Number(classFilter))
    ),
    [students, degreeFilter, classFilter]
  );

  // Paginação: calcula alunos da página atual
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);
  const paginatedStudents = useMemo(() => {
    const start = (currentPage - 1) * studentsPerPage;
    return filteredStudents.slice(start, start + studentsPerPage);
  }, [filteredStudents, currentPage]);

  // Resetar página ao filtrar
  React.useEffect(() => {
    setCurrentPage(1);
  }, [degreeFilter, classFilter, students]);

  const startEdit = student => setEdit({ id: student.id, name: student.name, classId: student.classId });
  const cancelEdit = () => setEdit(null);

  function escapeHtml(str) {
    return String(str).replace(/[&<>'"]/g, function (c) {
      return ({'&':'&amp;','<':'&lt;','>':'&gt;','\'':'&#39;','"':'&quot;'})[c];
    });
  }

  const saveEdit = () => {
    if (!edit.name.trim()) {
      alert('O nome do aluno não pode ser vazio.');
      return;
    }
    setStudents(prev => prev.map(s =>
      s.id === edit.id ? { ...s, name: escapeHtml(edit.name), classId: Number(edit.classId) } : s
    ));
    setEdit(null);
  };

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="uk-container uk-margin-medium-top uk-margin-large-bottom" style={{ background: '#ffff', padding: '20px', border: '1px solid #bcbcbc' }}>
      <div className="uk-width-1-1@m uk-width-2-3@l uk-align-center">
        <h2 className="uk-heading-line uk-text-center" style={{ color: '#b1040e' }}><span>Alunos</span></h2>
        <div className="uk-flex uk-flex-between uk-flex-middle uk-margin-bottom uk-child-width-expand@s uk-grid-small" data-uk-grid >
          <div>
            <select className="uk-select uk-form-width-medium uk-margin-right" value={degreeFilter} onChange={e => setDegreeFilter(e.target.value)}>
              <option value=''>Todas as séries</option>
              {degrees.map(d => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select>
            <select className="uk-select uk-form-width-small uk-margin-right" value={classFilter} onChange={e => setClassFilter(e.target.value)}>
              <option value=''>Todas as turmas</option>
              {classes.map((c, idx) => (
                <option key={idx + 1} value={idx + 1}>{c.name}</option>
              ))}
            </select>
          </div>
          <div className="uk-flex uk-flex-middle uk-width-auto">
            <button
              className="uk-button uk-button-danger uk-margin-xsmall-right"
              onClick={() => setShowChart(true)}
              type="button"
            >
              <span data-uk-icon="icon: bar-chart"></span>Gráfico
            </button>
            <button
              className="uk-button uk-button-danger"
              onClick={handleGenerateStudents}
              type="button"
            >
              +300 alunos
            </button>
          </div>
        </div>

        {/* Modal centralizado com backdrop escuro usando UIKit */}
        <div className={showChart ? "uk-modal uk-open" : "uk-modal"} style={{display: showChart ? 'block' : 'none'}}>
          <div className="uk-modal-dialog uk-modal-body uk-width-large uk-margin-auto-vertical">
            <button className="uk-modal-close-default" type="button" data-uk-close onClick={() => setShowChart(false)}></button>
            <h3 className="uk-modal-title">Distribuição de Alunos</h3>*

            <Bar data={chartData} options={{
              responsive: true,
              plugins: { legend: { display: false }, title: { display: false, text: '' } }
            }} />
          </div>
          <div className="uk-modal-bg uk-animation-fade" onClick={() => setShowChart(false)}></div>
        </div>

        <div className="uk-overflow-auto uk-margin-top" style={{ maxHeight: 600, overflowY: 'auto' }}>
          <table className="uk-table uk-table-divider uk-table-hover uk-table-middle uk-table-striped">
            <thead>
              <tr style={{ backgroundColor: '#b1040e' }}>
                <th style={{ color: "#ffff"}}>Nome</th>
                <th style={{ color: "#ffff"}}>Série</th>
                <th style={{ color: "#ffff"}}>Turma</th>
                <th style={{ color: "#ffff"}}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {paginatedStudents.map(student => {
                const degree = degrees.find(d => d.id === student.degreeId);
                const classObj = classes[student.classId - 1];
                const isEditing = edit && edit.id === student.id;
                return (
                  <tr key={student.id}>
                    <td>
                      {isEditing ? (
                        <input className="uk-input" value={edit.name} onChange={e => setEdit(edit => ({ ...edit, name: e.target.value }))} />
                      ) : student.name}
                    </td>
                    <td>{degree ? degree.name : '-'}</td>
                    <td>
                      {isEditing ? (
                        <select className="uk-select" value={edit.classId} onChange={e => setEdit(edit => ({ ...edit, classId: e.target.value }))}>
                          {classes.map((c, idx) => (
                            <option key={idx + 1} value={idx + 1}>{c.name}</option>
                          ))}
                        </select>
                      ) : (classObj ? classObj.name : '-')}
                    </td>
                    <td>
                      {isEditing ? (
                        <>
                          <button className="uk-button uk-button-primary uk-button-small" onClick={saveEdit}>Salvar</button>
                          <button className="uk-button uk-button-default uk-button-small" onClick={cancelEdit}>Cancelar</button>
                        </>
                      ) : (
                        <button className="uk-button uk-button-text uk-button-small" style={{ color: '#b1040e' }} onClick={() => startEdit(student)}>Editar</button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Paginação inteligente */}
        {totalPages > 1 && (
          <div className="uk-flex uk-flex-center uk-margin-top">
            <ul className="uk-pagination">
              {(() => {
                const maxButtons = 11;
                const pages = [];
                if (totalPages <= maxButtons) {
                  for (let i = 1; i <= totalPages; i++) {
                    pages.push(i);
                  }
                } else {
                  // Sempre mostra 1, ... , algumas do meio, ..., última
                  let start = Math.max(1, currentPage - 4);
                  let end = Math.min(totalPages, currentPage + 4);
                  if (start <= 2) {
                    start = 1;
                    end = maxButtons - 2;
                  } else if (end >= totalPages - 1) {
                    end = totalPages;
                    start = totalPages - (maxButtons - 3);
                  }
                  // Primeira página
                  pages.push(1);
                  if (start > 2) pages.push('ellipsis-start');
                  for (let i = start + (start === 1 ? 1 : 0); i <= end - (end === totalPages ? 1 : 0); i++) {
                    if (i !== 1 && i !== totalPages) pages.push(i);
                  }
                  if (end < totalPages - 1) pages.push('ellipsis-end');
                  
                  // Última página
                  if (totalPages !== 1) pages.push(totalPages);
                }
                return pages.map((p, idx) => {
                  if (p === 'ellipsis-start' || p === 'ellipsis-end') {
                    return <li key={p + idx}><span style={{ padding: '0 8px' }}>...</span></li>;
                  }
                  return (
                    <li key={p} className={currentPage === p ? 'uk-active' : ''}>
                      <button
                        className="uk-button uk-button-default"
                        style={{ minWidth: 36, height: 28, margin: 2, background: currentPage === p ? '#b1040e' : undefined, color: currentPage === p ? '#fff' : undefined }}
                        onClick={() => setCurrentPage(p)}
                      >
                        {p}
                      </button>
                    </li>
                  );
                });
              })()}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Students;
