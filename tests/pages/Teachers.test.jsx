import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Teachers from '../../src/pages/Teachers';
import { AppProvider } from '../../src/context/AppContext';

vi.mock('../../src/utils/fetchJson', () => ({
  fetchJson: async (file) => {
    switch (file) {
      case 'students.json':
        return [
          { id: 1, ra: 123, name: 'Aluno Teste', degreeId: 1, classId: 1 },
          { id: 2, ra: 456, name: 'Outro Aluno', degreeId: 2, classId: 2 }
        ];
      case 'teachers.json':
        return [ { id: 1, name: 'Prof. Teste' } ];
      case 'degrees.json':
        return [ { id: 1, name: '1ª Série' }, { id: 2, name: '2ª Série' } ];
      case 'classes.json':
        return { classes: [ { id: 1, name: 'A' }, { id: 2, name: 'B' } ] };
      case 'matters.json':
        return [ { id: 1, name: 'Matemática' } ];
      case 'relationships.json':
        return [
          {
            id: 1,
            teacherId: 1,
            matterId: 1,
            degrees: [
              { degreeId: 1, classes: [ { classId: 1 } ] },
              { degreeId: 2, classes: [ { classId: 2 } ] }
            ]
          }
        ];
      default:
        return [];
    }
  }
}));

function renderWithProvider(ui) {
  return render(<AppProvider>{ui}</AppProvider>);
}

describe('Teachers Page', () => {
  it('shows filter selects for degree and class', async () => {
    renderWithProvider(<Teachers />);
    const selects = await screen.findAllByRole('combobox');
    expect(selects.length).toBeGreaterThanOrEqual(2);
  });

  it('can open and close the relationship form modal', async () => {
    renderWithProvider(<Teachers />);
    const addBtn = await screen.findByText('Adicionar relacionamento');
    fireEvent.click(addBtn);
    expect(await screen.findByText('Novo relacionamento')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /Cancelar/i }));
    expect(screen.queryByText('Novo relacionamento')).not.toBeInTheDocument();
  });
});
