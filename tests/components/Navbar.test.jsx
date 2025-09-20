
import { describe, it, expect } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from '../../src/components/Navbar';

function renderWithRouter(ui, { route = '/' } = {}) {
  window.history.pushState({}, 'Test page', route);
  return render(
    <MemoryRouter initialEntries={[route]}>
      <Routes>
        <Route path="*" element={ui} />
      </Routes>
    </MemoryRouter>
  );
}

describe('Navbar', () => {
  it('renders all navigation links and brand', () => {
    renderWithRouter(<Navbar />);
    expect(screen.getByText('Evolucional University')).toBeInTheDocument();
    expect(screen.getByText('Inicio')).toBeInTheDocument();
    expect(screen.getByText('Alunos')).toBeInTheDocument();
    expect(screen.getByText('Professores')).toBeInTheDocument();
  });

  it('highlights the active link based on route', () => {
    renderWithRouter(<Navbar />, { route: '/students' });
    const alunosLink = screen.getByText('Alunos');
    expect(alunosLink.className).toContain('active');
    expect(screen.getByText('Inicio').className).not.toContain('active');
  });

  it('opens and closes the mobile menu', () => {
    renderWithRouter(<Navbar />);
    
    fireEvent.click(screen.getByLabelText('Abrir menu'));
    expect(screen.getByLabelText('Fechar menu')).toBeInTheDocument();
    
    fireEvent.click(screen.getByLabelText('Fechar menu'));
    expect(screen.queryByLabelText('Fechar menu')).not.toBeInTheDocument();
  });

  it('navigates to correct page when mobile menu link is clicked', () => {
    renderWithRouter(<Navbar />);
    fireEvent.click(screen.getByLabelText('Abrir menu'));
    const alunosLink = screen.getAllByText('Alunos')[1]; // Menu Link no Mobile
    fireEvent.click(alunosLink);
    
    expect(screen.queryByLabelText('Fechar menu')).not.toBeInTheDocument();
  });
});
