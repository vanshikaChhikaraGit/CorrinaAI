export const code_snippet = (domainId: string): string => {
  return `const iframe = document.createElement("iframe");

const iframeStyles = (styleString) => {
  const style = document.createElement("style");
  style.textContent = styleString;
  document.head.append(style);
};

iframeStyles(\`
  .chat-frame {
    position: fixed;
    bottom: 50px;
    right: 50px;
    border: none;
  }
\`);

iframe.src = "http://localhost:3000/chatbot";
iframe.classList.add("chat-frame");
document.body.appendChild(iframe);

window.addEventListener("message", (e) => {
  if (e.origin !== "http://localhost:3000/") return null;
  let dimensions = JSON.parse(e.data);
  iframe.width = dimensions.width;
  iframe.height = dimensions.height;
  iframe.contentWindow.postMessage("${domainId}",
   "http://localhost:3000/");
});`;
};
