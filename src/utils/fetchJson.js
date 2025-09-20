// Utilitário para leitura dos arquivos JSON simulando um backend local
export async function fetchJson(file) {
  const response = await fetch(`/data/${file}`);
  if (!response.ok) throw new Error('Erro ao carregar ' + file);
  return response.json();
}
