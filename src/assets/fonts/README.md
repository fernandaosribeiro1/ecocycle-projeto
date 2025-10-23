Coloque aqui as fontes usadas pelo projeto.

Instruções:
1. Coloque os arquivos de fonte (preferencialmente `.woff2`) neste diretório.
   - Exemplo: `Geist-Regular.woff2` e `Geist-Extrabold.woff2`
2. Certifique-se que os nomes correspondem aos usados em `src/styles.scss`.
   - `Geist-Regular.woff2` -> font-weight: 500
   - `Geist-Extrabold.woff2` -> font-weight: 800
3. Após adicionar, rode o servidor dev (`npm start`) e abra o DevTools > Network > filtre por "font" para confirmar que as fontes foram carregadas.
4. Se preferir hospedar as fontes em CDN, atualize os caminhos em `src/styles.scss`.

Observações:
- `font-display: swap` já está configurado em `src/styles.scss` para melhorar UX de carregamento.
- Em ambientes de produção, prefira `.woff2` por ser menor e eficiente.
