import React from "react";

export default function Home() {
  return (
    <div className="uk-container uk-margin-large-top uk-margin-large-bottom">
      <div className="uk-width-1-1@m uk-width-2-3@l uk-align-center">
        <h1 className="uk-heading-line uk-text-center">
          <span>FAQ do Desafio Técnico - Evolucional</span>
        </h1>
        <div className="uk-margin-large-bottom">
          <ul uk-accordion="collapsible: true" className="uk-accordion">
            <li>
              <a className="uk-accordion-title" href="#">
                Como fiz a análise dos requisitos?
              </a>
              <div className="uk-accordion-content">
                <p>
                  Iniciei o projeto lendo cuidadosamente o arquivo <code>Instruções.txt</code> e todos os arquivos de dados JSON fornecidos. Assim, garanti que todas as funcionalidades implementadas estivessem totalmente alinhadas com o escopo solicitado.
                </p>
              </div>
            </li>
            <li>
              <a className="uk-accordion-title" href="#">
                Como estruturei o projeto?
              </a>
              <div className="uk-accordion-content">
                <p>
                  Optei por usar React com Vite para garantir simplicidade, performance e modularidade. Centralizei o carregamento dos dados em um contexto global (Context API), o que facilitou o acesso e a manipulação dos dados em todas as telas do sistema.
                </p>
              </div>
            </li>
            <li>
              <a className="uk-accordion-title" href="#">
                Quais funcionalidades principais implementei?
              </a>
              <div className="uk-accordion-content">
                <ul className="uk-list uk-list-bullet">
                  <li>
                    <strong>Centralização do estado com Context API:</strong><br/>
                    Implementei o Context API do React para compartilhar dados e funções entre todas as páginas, facilitando a manutenção e evitando duplicidade de lógica.
                  </li>
                  <li>
                    <strong>Filtros dinâmicos e geração em massa:</strong><br/>
                    Implementei filtros de série e turma, além da geração em massa de alunos, para agilizar a manipulação dos dados e simular cenários reais de uso.
                  </li>
                  <li>
                    <strong>Visualização de dados com gráficos:</strong><br/>
                    Implementei na tela de alunos um gráfico de distribuição por série, exibido em modal centralizado, para facilitar a análise visual dos dados.
                  </li>
                  <li>
                    <strong>Relacionamentos entre professores, matérias e turmas:</strong><br/>
                    Implementei na tela de professores a visualização e edição dos vínculos entre professores, matérias, séries e turmas, com interface clara e uso de modais para evitar navegação excessiva.
                  </li>
                  <li>
                    <strong>Interface moderna e responsiva:</strong><br/>
                    Construí toda a interface com UIKit, garantindo responsividade, visual limpo e alinhamento com o padrão institucional solicitado.
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <a className="uk-accordion-title" href="#">
                Como fiz a validação e o tratamento dos dados?
              </a>
              <div className="uk-accordion-content">
                <ul className="uk-list uk-list-bullet">
                  <li>
                    <strong>Validação de campos obrigatórios:</strong><br/>
                    Implementei validação em todos os formulários e campos editáveis para impedir o envio de dados vazios ou inválidos, garantindo integridade e previsibilidade no sistema.
                  </li>
                  <li>
                    <strong>Sanitização contra XSS:</strong><br/>
                    Sanitizei todas as entradas do usuário com funções de escape de HTML antes de salvar ou exibir dados, prevenindo ataques de Cross-Site Scripting.
                  </li>
                  <li>
                    <strong>Feedback imediato ao usuário:</strong><br/>
                    Implementei mensagens de alerta e bloqueio de ações sempre que o usuário tenta inserir dados inválidos, promovendo uma experiência mais segura e transparente.
                  </li>
                  <li>
                    <strong>Validação no fluxo de atualização do estado:</strong><br/>
                    Apliquei as validações diretamente nas funções de manipulação de estado, evitando inconsistências e reduzindo a chance de erros silenciosos na interface.
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <a className="uk-accordion-title" href="#">
                Quais problemas técnicos enfrentei e como resolvi?
              </a>
              <div className="uk-accordion-content">
                <ul className="uk-list uk-list-bullet">
                  <li>
                    <strong>Integração do UIKit com React:</strong><br/>
                    Como o UIKit é baseado em classes CSS e atributos <code>data-uk</code>, enquanto o React manipula o DOM de forma virtual, precisei garantir que o UIKit estivesse carregado no <code>index.html</code> e, em alguns casos, forçar a atualização de componentes usando atributos <code>data-uk</code> ou métodos do UIKit.
                  </li>
                  <li>
                    <strong>Validação e segurança dos formulários:</strong><br/>
                    Implementei validações em todos os formulários e campos editáveis para evitar campos vazios e possíveis ataques XSS, usando funções de escape de HTML para sanitizar entradas do usuário.
                  </li>
                  <li>
                    <strong>Centralização e responsividade dos componentes:</strong><br/>
                    Ajustei o layout para garantir centralização e boa visualização em diferentes tamanhos de tela, utilizando classes do UIKit como <code>uk-align-center</code>, <code>uk-width-xlarge</code> e grids responsivos.
                  </li>
                  <li>
                    <strong>Exibição de modais com backdrop escuro:</strong><br/>
                    Adaptei a estrutura dos modais para seguir o padrão do UIKit, utilizando as classes <code>uk-modal</code>, <code>uk-modal-dialog</code> e <code>uk-modal-bg</code> para garantir centralização e fundo escurecido.
                  </li>
                  <li>
                    <strong>Ajuste de largura e tabelas grandes:</strong><br/>
                    Ajustei o componente principal para usar larguras maiores e envolvi as tabelas em containers com <code>uk-overflow-auto</code> para evitar quebras de layout em telas menores.
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <a className="uk-accordion-title" href="#">
                Como organizei a estrutura do código?
              </a>
              <div className="uk-accordion-content">
                <ul className="uk-list uk-list-bullet">
                  <li>
                    <strong>Separação por responsabilidade:</strong><br/>
                    Dividi o código em componentes React reutilizáveis, contexto global para dados e funções compartilhadas, e utilitários para lógica auxiliar. Isso facilitou a manutenção, permitiu evolução incremental e reduziu o risco de bugs ao isolar funcionalidades.
                  </li>
                  <li>
                    <strong>Organização dos arquivos:</strong><br/>
                    Mantive as páginas principais (Alunos, Professores, Home) em <code>src/pages</code>, componentes reutilizáveis em <code>src/components</code> e o contexto em <code>src/context</code>. Essa estrutura torna o projeto intuitivo para novos desenvolvedores e agiliza a localização de funcionalidades.
                  </li>
                  <li>
                    <strong>Estilo e tema centralizados:</strong><br/>
                    Usei o UIKit para padronizar a interface, centralizando customizações de cor e fonte para fácil ajuste visual. Isso garante consistência visual e facilita adaptações futuras de identidade visual.
                  </li>
                  <li>
                    <strong>Leitura e manipulação de dados:</strong><br/>
                    Centralizei toda a lógica de leitura, filtragem e atualização dos dados no contexto, evitando duplicidade e facilitando testes. Assim, qualquer alteração de regra de negócio afeta todo o sistema de forma previsível.
                  </li>
                  <li>
                    <strong>Por que essa organização?</strong><br/>
                    Escolhi modularidade e separação clara para facilitar a escalabilidade, manutenção e colaboração em equipe. Um código bem organizado reduz o tempo de onboarding, minimiza conflitos e torna o projeto mais robusto a mudanças de escopo.
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <a className="uk-accordion-title" href="#">
                Como fiz a validação final?
              </a>
              <div className="uk-accordion-content">
                <ul className="uk-list uk-list-bullet">
                  <li>
                    <strong>Testes manuais de fluxo:</strong><br/>
                    Testei manualmente todas as funcionalidades principais, simulando os fluxos de uso previstos no desafio, para garantir aderência ao escopo e ausência de erros visíveis. Isso me permitiu identificar rapidamente problemas de usabilidade e lógica.
                  </li>
                  <li>
                    <strong>Validação cruzada com requisitos:</strong><br/>
                    Revisei cada requisito do arquivo <code>Instruções.txt</code> após a implementação, assegurando que todos os pontos solicitados estavam presentes e funcionais.
                  </li>
                  <li>
                    <strong>Revisão visual e responsiva:</strong><br/>
                    Realizei ajustes de layout, responsividade e UX para garantir boa experiência em diferentes tamanhos de tela e navegadores, validando que o sistema se comporta bem em cenários reais de uso.
                  </li>
                  <li>
                    <strong>Por que essa abordagem?</strong><br/>
                    Escolhi a validação manual e cruzada por ser a forma mais eficiente e realista para um projeto de escopo reduzido, onde o tempo de entrega é curto e a flexibilidade é importante. Assim, garanto que o sistema entregue valor real ao usuário final e atenda exatamente ao que foi pedido.
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="uk-heading-bullet uk-text-left">Observações Finais</h2>
          <p>
            Desenvolvi este projeto priorizando eficiência, clareza e aderência ao escopo, sem exagerar em "firulas" visuais, mas sempre buscando entregar um sistema funcional, limpo e fácil de usar. Meu foco foi garantir que cada requisito fosse atendido e que o código estivesse bem organizado para facilitar futuras manutenções e evoluções. Não sou especialista em design, mas procurei entregar uma interface agradável e responsiva, alinhada ao padrão institucional.
          </p>
        </div>
      </div>
    </div>
  );
}
