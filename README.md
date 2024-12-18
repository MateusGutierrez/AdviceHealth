# AdviceHealth - WebApp de Consultório Médico

Este é um WebApp desenvolvido para gerenciar e acompanhar os agendamentos, consultas e faturamento de um consultório médico. A aplicação possui funcionalidades de exibição de estatísticas diárias, agendamento de pacientes e consulta a dados de pacientes atendidos.
## Tecnologias
  - React: Biblioteca JavaScript para construção de interfaces de usuário.
  - TypeScript: Superset do JavaScript que adiciona tipagem estática.
  - Vite: Build tool rápido e otimizado para desenvolvimento.
  - Material UI: Biblioteca de componentes de UI para React.
  - React Router: Navegação entre páginas.
  - Zod: Validação de dados.
    
#### Dependências:
  - @mui/material - Componentes de UI do Material UI
  - @mui/x-charts - Gráficos interativos
  - react-hook-form - Manipulação de formulários
  - zod - Validação de dados
  - zustand - Gerenciamento de estado
  - dayjs - Manipulação de datas
  - react-toastify - Notificações
  - lodash - Utilitários
  - uuid - Geração de identificadores únicos
    
## Funcionalidades

### 1. Área de Trabalho
A área de trabalho exibe informações estatísticas do consultório, incluindo:
- **Número de agendamentos do dia**
- **Número de pacientes atendidos no dia**
- **Faturamento do dia**
- **Agenda do dia**
- **Avisos e lembretes** importantes para o consultório

#### Exemplo de Dados Estatísticos:
- **Data**: 2024-12-16
- **Agendamentos do dia**: 25
- **Pacientes atendidos no dia**: 18
- **Faturamento do dia**: R$ 4750,00
- **Lembretes**:
  - Reunião com a equipe médica às 14:00
  - Enviar relatórios financeiros até o final do dia
  - Revisar registros médicos dos pacientes atendidos

### 2. Agendamento de Pacientes
A rotina de agendamento permite visualizar os horários disponíveis dos médicos e agendar consultas para os pacientes. A agenda dos médicos é atualizada conforme o horário do dia e as consultas agendadas.

#### Exemplo de Agenda do Médico:
- **Dra. Ana Pereira** (Cardiologia)
  - Disponível: 08:30, 16:30
- **Dr. Carlos Andrade** (Dermatologia)
  - Disponível: 09:00, 13:00, 15:30, 17:30
- **Dra. Beatriz Souza** (Oftalmologia)
  - Disponível: 10:00, 12:00, 14:00, 16:00

### 3. Consulta de Pacientes Agendados e Atendidos
Exibe os dados detalhados sobre os pacientes agendados e atendidos, incluindo:
- **Nome do paciente**
- **Médico responsável**
- **Data e hora do agendamento**
- **Status do atendimento (agendado ou atendido)**
- **Valor da consulta**

#### Exemplo de Dados de Agendamento:
- **Data**: 2024-12-16
- **Horário**: 08:00
- **Paciente**: João Silva
- **Médico**: Dra. Ana Pereira
- **Status**: Atendido
- **Valor**: R$ 350,00

---

## Instalação

Para rodar a aplicação localmente, siga os seguintes passos:

1. Clone este repositório:
   ```bash
   git clone git@github.com:MateusGutierrez/AdviceHealth.git

2. Navegue até o repositório:
   ```bash
   cd app
   
3. Instalar as dependências:
   ```bash
   yarn
5. Inicie o servidor:
   ```bash
   yarn dev
