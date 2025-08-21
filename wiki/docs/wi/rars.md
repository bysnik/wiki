# RARS Emulator

![alt text](/public/img/rars-1.png)

RARS (RISC-V Assembler, Simulator, and Runtime) транслирует и симулирует выполнение программ, написанных на языке ассемблера RISC-V. Его основная цель — быть эффективной средой разработки для начинающих знакомиться с RISC-V.

## Установка

Скачайте [Rars Emulator](https://github.com/TheThirdOne/rars)

Установите OpenJDK:
```bash
apt-get install java-21-openjdk
```

Запустите Rars Emulator:
```bash
java -jar rars1_6.jar
```


Можно создать пункт в меню (пример для KDE):
![alt text](/public/img/rars.png)

## Пример: hello-world

```asm
#
# Программа на ассемблере Risc-V для вывода "Hello World!"
# в стандартный вывод (stdout).
#
# a0-a2 - параметры для функций Linux
# a7 - номер функции в Linux
#

.global _start      # Предоставить адрес начала программы линковщику

# Настройка параметров для вывода "Hello World!"
# и вызов Linux для выполнения.

_start: addi  a0, x0, 1      # 1 = StdOut (стандартный вывод)
        la    a1, helloworld # загрузить адрес строки helloworld
        addi  a2, x0, 13     # длина нашей строки
        addi  a7, x0, 64     # системный вызов write в Linux
        ecall                # Вызов Linux для вывода строки

# Настройка параметров для завершения программы
# и вызов Linux для выполнения.

        addi    a0, x0, 0   # Код возврата 0 (успешное завершение)
        addi    a7, x0, 93  # Код команды завершения (93)
        ecall               # Вызов Linux для завершения программы

.data
helloworld:      .ascii "Hello World!\n"
```
![alt text](/public/img/rars-hello-world.png)