name: Сообщить об ошибке или неточности
about: Нашли опечатку, битую ссылку или устаревшую команду?
title: '[Ошибка] '
labels: bug
body:
  - type: markdown
    attributes:
      value: Спасибо за помощь в улучшении вики!
  - type: textarea
    id: description
    attributes:
      label: Описание проблемы
      description: Где и что пошло не так? Укажите конкретную страницу и суть ошибки.
    validations:
      required: true
  - type: input
    id: url
    attributes:
      label: Ссылка на страницу
      description: URL страницы на https://bysnik.github.io/wiki/
      placeholder: https://bysnik.github.io/wiki/...
    validations:
      required: true
  - type: textarea
    id: expected
    attributes:
      label: Как должно быть (если знаете)
      description: Например, правильная команда в ALT Linux или корректная формулировка.
    validations:
      required: false