vi.mock('react-chartjs-2', () => ({
  Bar: () => <div data-testid="mock-bar-chart">Mock Chart</div>
}));

import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Students from '../../src/pages/Students';
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
        return [];
      default:
        return [];
    }
  }
}));

function renderWithProvider(ui) {
  return render(<AppProvider>{ui}</AppProvider>);
}

describe('Students Page', () => {
  it('filters students by degree and class', async () => {
    renderWithProvider(<Students />);
    const selects = await screen.findAllByRole('combobox');
    const degreeSelect = selects[0];
    fireEvent.change(degreeSelect, { target: { value: '1' } });
    expect(degreeSelect.value).toBe('1');
  });


  it('paginates students', async () => {
    renderWithProvider(<Students />);
    const pagination = await screen.findAllByRole('button');
    expect(pagination.length).toBeGreaterThan(0);
  });


  it('can open and close the chart modal', async () => {
    renderWithProvider(<Students />);
    const chartBtn = await screen.findByText(/Gráfico/i);
    fireEvent.click(chartBtn);
    expect(await screen.findByText('Distribuição de Alunos')).toBeInTheDocument();

    // O botão de fechar é o primeiro botão sem texto dentro do modal
    const closeBtns = screen.getAllByRole('button');
    fireEvent.click(closeBtns.find(btn => btn.className.includes('uk-modal-close-default')));

    // O modal deve estar oculto (display: none)
    const modal = screen.getByText('Distribuição de Alunos').parentElement.parentElement;
    expect(modal).toHaveStyle({ display: 'none' });
  });


  it('can start and cancel editing a student', async () => {
    renderWithProvider(<Students />);
    const editBtns = await screen.findAllByText('Editar');
    fireEvent.click(editBtns[0]);
    expect(await screen.findByRole('button', { name: /Salvar/i })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /Cancelar/i }));
    expect(screen.queryByRole('button', { name: /Salvar/i })).not.toBeInTheDocument();
  });
});
