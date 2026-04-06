# Contexto da Sessão: react-native-horizon

Este projeto foi iniciado em Abril de 2026. O objetivo é criar uma biblioteca moderna de alto desempenho para exibir imagens 360 (equirretangulares) no React Native.

**Decisões Arquiteturais:**
1. **Framework:** Utilizado o **Expo Module SDK** (mesmo para apps CLI puros) para garantir o uso de JSI (JavaScript Interface) e evitar a lentidão da antiga Bridge.
2. **Gerenciador de Pacotes:** `bun` para instalação de dependências e execução de scripts.
3. **Padrão Nativo:** Implementação "Swift/Kotlin First".
4. **Localização:** `/Users/daviborges/Desktop/react-native-horizon`.

---

# Plano de Implementação: Imagens 360

## 🎯 Objetivo
Desenvolver um componente `HorizonView` que permita visualizar fotos 360 com controle de rotação manual e zoom suave.

## 🛠️ Tecnologias Escolhidas
- **iOS:** `SceneKit` (Nativo da Apple). Criação de uma `SCNSphere` com a textura da foto na face interna.
- **Android:** `SceneView` (Baseado no motor Filament do Google). Renderização equirretangular de alta performance.
- **JS/TS:** Componente Expo Module com tipagem rigorosa.

---

## 📋 Fase 1: Definição da Interface (TypeScript)
- [x] Criar a Spec do módulo em `src/ReactNativeHorizonView.tsx`.
- [x] Definir a prop `sourceURL` (string) para carregar imagens remotas.
- [x] Definir a prop `initialYaw` e `initialPitch` para controle de ângulo inicial.
- [x] **Verificação:** Rodar `bun run build` na raiz para garantir que o TypeScript está válido.

## 📋 Fase 2: Implementação iOS (Swift + SceneKit)
- [x] Modificar `ios/ReactNativeHorizonModule.swift` para expor as props da view 360.
- [x] Instanciar um `SCNView` dentro do componente.
- [x] Criar uma `SCNSphere` invertida (normals pointing inside).
- [x] Mapear a `UIImage` (carregada via URL) como material da esfera.
- [x] Adicionar um `SCNCamera` no centro da esfera (0, 0, 0).
- [ ] **Verificação:** Rodar `npm run ios` no diretório `example/` e ver a imagem 360 estática.

## 📋 Fase 3: Implementação Android (Kotlin + SceneView)
- [x] Adicionar dependência do `SceneView` no `android/build.gradle`.
- [x] Implementar `ReactNativeHorizonModule.kt` e `ReactNativeHorizonView.kt`.
- [x] Criar um `SceneView` e configurar esfera invertida para renderizar o panorama.
- [x] Implementar o carregamento assíncrono da imagem 360 usando Coroutines.
- [ ] **Verificação:** Rodar `npm run android` no diretório `example/` e ver a imagem 360 estática.

## 📋 Fase 4: Gestos e Interatividade (Pan & Zoom)
- [x] **iOS:** Mapear `UIPanGestureRecognizer` para rotacionar o `cameraNode` (eixos X e Y).
- [x] **Android:** Utilizar o listener de gestos do `SceneView` para atualizar o ângulo de visão.
- [x] **JS:** Expor eventos `onRotationChange` para o React Native.
- [ ] **Verificação:** Testar no simulador/emulador se o "drag" do mouse/dedo rotaciona a imagem sem jitter.

---

## Status Atual (06/04/2026)

- Implementacao iOS avancou para um viewer 360 real com SceneKit (`SCNView` + `SCNSphere` invertida + `SCNCamera` no centro).
- `sourceURL`, `initialYaw`, `initialPitch`, `onLoad` e `onRotationChange` foram conectados de JS para iOS/Android.
- Exemplo em `example/App.tsx` foi atualizado para usar a API nova e URL de panorama.
- Android foi migrado para `SceneView` + Filament com esfera invertida, carregamento remoto assíncrono, pan/zoom e evento de rotação.
- Verificacoes pendentes de runtime real em emulador/simulador (`npm run android` e `npm run ios`).

## 📋 Fase 5: Finalização e Exemplo
- [ ] Atualizar o `example/App.tsx` para incluir um seletor de imagens 360 de teste.
- [ ] Documentar o uso no `README.md`.
- [ ] **Verificação:** Rodar o app de exemplo do zero em ambas as plataformas.

---

## 🏁 Critérios de Sucesso
1. Imagens de 4K carregam sem travar a UI (Main Thread livre).
2. Rotação suave (60 FPS) via gestos.
3. Suporte a URLs remotas (HTTPS).
4. Tipagem completa no VS Code para quem instalar a biblioteca.
