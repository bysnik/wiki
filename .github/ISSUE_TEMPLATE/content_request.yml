name: Предложить новый материал
about: Хотите добавить статью, лекцию, практику или разбор задания?
title: '[Контент] '
labels: enhancement
body:
  - type: markdown
    attributes:
      value: Отлично! Новый контент — основа проекта.
  - type: input
    id: topic
    attributes:
      label: Тема материала
      description: Например, «Настройка Samba в ALT Linux» или «Задание 3.2 демонстрационного экзамена»
    validations:
      required: true
  - type: textarea
    id: description
    attributes:
      label: Описание
      description: Что вы хотите добавить? Есть ли у вас черновик или источники?
    validations:
      required: true
  - type: checkboxes
    id: license
    attributes:
      label: Лицензирование
      options:
        - label: Я подтверждаю, что материал может быть опубликован под лицензией GNU GPL v3.0
          required: true