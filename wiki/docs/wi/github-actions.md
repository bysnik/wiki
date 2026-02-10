В GitHub Actions порядок выполнения **jobs** определяется следующими правилами:

---

### 1. По умолчанию — параллельный запуск
Если у `job` нет указанных зависимостей через `needs`, все такие jobs запускаются **параллельно** сразу после старта workflow:

```yaml
jobs:
  job1:
    runs-on: ubuntu-latest
    steps: [...]
  
  job2:
    runs-on: ubuntu-latest
    steps: [...]  # Запустится одновременно с job1
```

---

### 2. Последовательный запуск через `needs`
Чтобы задать порядок, используйте `needs` — job запустится **только после успешного завершения** указанных зависимостей:

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    steps: [...]

  test:
    needs: build  # Ждёт успешного завершения build
    runs-on: ubuntu-latest
    steps: [...]

  deploy:
    needs: test   # Ждёт успешного завершения test
    runs-on: ubuntu-latest
    steps: [...]
```

Порядок выполнения: `build` → `test` → `deploy`

---

### 3. Параллельные ветви зависимостей
Можно создавать сложные графы зависимостей:

```yaml
jobs:
  setup:
    runs-on: ubuntu-latest
    steps: [...]

  test-backend:
    needs: setup
    runs-on: ubuntu-latest
    steps: [...]

  test-frontend:
    needs: setup
    runs-on: ubuntu-latest
    steps: [...]  # Запустится параллельно с test-backend

  deploy:
    needs: [test-backend, test-frontend]  # Ждёт оба теста
    runs-on: ubuntu-latest
    steps: [...]
```

Порядок:
```
setup
   ├── test-backend ─┐
   └── test-frontend ─┤
                      └── deploy
```

---

### 4. Важные нюансы

| Поведение | Описание |
|-----------|----------|
| **В пределах job** | Шаги (`steps`) всегда выполняются **последовательно** |
| **Статус зависимостей** | По умолчанию job ждёт **успешного** (`success`) завершения зависимостей. Можно изменить через `if: always()` |
| **Отказ одного job** | Если зависимый job завершился с ошибкой, зависимые от него jobs **не запустятся** (если не указано `if: always()`) |
| **Матрицы (`strategy.matrix`)** | Каждая комбинация матрицы выполняется как отдельный job, но в рамках одной логической группы |

---

### 5. Пример с обработкой ошибок

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    steps: [...]

  notify-on-failure:
    needs: build
    if: ${{ failure() }}  # Запустится только при ошибке в build
    runs-on: ubuntu-latest
    steps: [...]
```
