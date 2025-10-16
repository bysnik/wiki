name: Сообщить об ошибке или неточности
description: Нашли опечатку, битую ссылку или устаревшую команду?
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
      placeholder: https://bysnik.github.io/wiki/...
    validations:
      required: true