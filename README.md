# Crypto Chat - Criptografia Assimétrica

Um sistema didático interativo que explica e simula o funcionamento básico de criptografia assimétrica (RSA) entre dois usuários.

## 🎯 Objetivo

Ferramenta educacional que demonstra visualmente como funciona a criptografia de chave pública, permitindo aos estudantes entender:

- Como é gerado um par de chaves (pública e privada)
- Como criptografar mensagens usando a chave pública do destinatário
- Como descriptografar mensagens usando a chave privada
- Por que apenas o destinatário pode ler a mensagem

## ✨ Funcionalidades

- **Geração de Chaves**: Cria pares de chaves RSA para Alice e Bob
- **Chat Simulado**: Interface de chat entre dois usuários
- **Criptografia Visual**: Mostra a mensagem antes e depois da criptografia
- **Descriptografia Interativa**: Permite visualizar o processo de descriptografia
- **Explicações Didáticas**: Tooltips e painéis educacionais em cada etapa
- **Design Moderno**: Interface minimalista e elegante com animações suaves

## 🚀 Como Executar

### Pré-requisitos

- Node.js 18+ instalado
- npm ou yarn

### Instalação

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev
```

O aplicativo estará disponível em `http://localhost:5173`

### Build para Produção

```bash
npm run build
npm run preview
```

## 🛠️ Tecnologias Utilizadas

- **React 18** - Biblioteca UI
- **TypeScript** - Type safety
- **Vite** - Build tool e dev server
- **crypto-js** - Criptografia (implementação educacional)
- **React Icons** - Ícones

## 📚 Como Usar

1. **Passo 1**: Clique em "Gerar Chaves" para criar pares de chaves para Alice e Bob
2. **Passo 2**: Visualize as chaves pública e privada de cada usuário
3. **Passo 3**: Selecione o remetente e destinatário
4. **Passo 4**: Digite uma mensagem
5. **Passo 5**: Clique em "Criptografar e Enviar"
6. **Passo 6**: Observe a mensagem criptografada no chat
7. **Passo 7**: Clique em "Descriptografar" para revelar a mensagem original

## 🎓 Conceitos Ensinados

- **Criptografia Assimétrica**: Sistema de dois pares de chaves
- **Chave Pública**: Compartilhada livremente, usada para criptografar
- **Chave Privada**: Mantida em segredo, usada para descriptografar
- **Confidencialidade**: Apenas o destinatário pode ler a mensagem
- **Aplicações Reais**: HTTPS, e-mail criptografado, mensagens seguras

## 📝 Nota Técnica

Esta é uma implementação educacional simplificada. Para produção real, use bibliotecas como:
- `node-forge` para RSA completo
- Web Crypto API nativa do navegador
- OpenPGP.js para PGP

## 📄 Licença

Projeto educacional de código aberto.
