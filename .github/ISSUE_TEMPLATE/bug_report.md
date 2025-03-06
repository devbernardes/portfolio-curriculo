---
name: Bug Report
description: Reporte um problema ou erro encontrado
title: "[BUG]: "
labels: ["bug"]
assignees: []
body:
  - type: markdown
    attributes:
      value: |
        Obrigado por dedicar seu tempo para preencher este relatório de bug!
  - type: input
    id: description
    attributes:
      label: Descrição do Bug
      description: Uma descrição clara e concisa do que é o bug.
      placeholder: Quando eu clico no botão X, a página não carrega corretamente...
    validations:
      required: true
  - type: textarea
    id: reproduce
    attributes:
      label: Passos para Reproduzir
      description: Como podemos reproduzir este problema?
      placeholder: |
        1. Vá para '...'
        2. Clique em '...'
        3. Role até '...'
        4. Veja o erro
    validations:
      required: true
  - type: textarea
    id: expected
    attributes:
      label: Comportamento Esperado
      description: O que você esperava que acontecesse?
      placeholder: A página deveria carregar normalmente mostrando...
    validations:
      required: true
  - type: textarea
    id: screenshots
    attributes:
      label: Capturas de Tela
      description: Se aplicável, adicione capturas de tela para ajudar a explicar o problema.
      placeholder: Você pode arrastar e soltar imagens aqui...
    validations:
      required: false
  - type: dropdown
    id: browsers
    attributes:
      label: Navegadores
      description: Em quais navegadores você encontrou este problema?
      multiple: true
      options:
        - Chrome
        - Firefox
        - Safari
        - Microsoft Edge
        - Opera
        - Outro (especifique nos detalhes adicionais)
    validations:
      required: false
  - type: textarea
    id: additional
    attributes:
      label: Informações Adicionais
      description: Adicione qualquer outra informação sobre o problema aqui.
      placeholder: Versão do sistema operacional, detalhes do dispositivo, etc.
    validations:
      required: false
---