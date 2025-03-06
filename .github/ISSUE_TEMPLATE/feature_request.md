---
name: Solicitação de Funcionalidade
description: Sugira uma ideia ou recurso para este projeto
title: "[FEATURE]: "
labels: ["enhancement"]
assignees: []
body:
  - type: markdown
    attributes:
      value: |
        Obrigado por sugerir uma nova funcionalidade para o projeto!
  - type: textarea
    id: problem
    attributes:
      label: Problema Relacionado
      description: Sua solicitação de funcionalidade está relacionada a um problema? Por favor, descreva.
      placeholder: Fico frustrado quando [...]
    validations:
      required: false
  - type: textarea
    id: solution
    attributes:
      label: Solução Desejada
      description: Descreva a solução que você gostaria de ver implementada.
      placeholder: Eu gostaria que houvesse uma forma de [...]
    validations:
      required: true
  - type: textarea
    id: alternatives
    attributes:
      label: Alternativas Consideradas
      description: Descreva alternativas que você considerou para resolver o problema.
      placeholder: Também pensei em implementar [...]
    validations:
      required: false
  - type: textarea
    id: context
    attributes:
      label: Contexto Adicional
      description: Adicione qualquer outro contexto, capturas de tela ou exemplos sobre a solicitação de funcionalidade aqui.
      placeholder: Esta funcionalidade seria útil para [...]
    validations:
      required: false
  - type: dropdown
    id: priority
    attributes:
      label: Prioridade Sugerida
      description: Qual você acredita que deveria ser a prioridade desta funcionalidade?
      options:
        - Baixa (seria bom ter)
        - Média (melhoraria significativamente a experiência)
        - Alta (essencial para o uso adequado)
    validations:
      required: false
  - type: checkboxes
    id: terms
    attributes:
      label: Confirmações
      description: Antes de enviar, por favor confirme o seguinte
      options:
        - label: Verifiquei que não existe uma solicitação similar já aberta
          required: true
        - label: Esta é uma solicitação de funcionalidade e não um relatório de bug
          required: true
---