import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

let visitorId = localStorage.getItem('demo-visitor-id');
let accountId = localStorage.getItem('demo-account-id');
const isNewVisitor = !visitorId;
const isNewAccount = !accountId;

if (!visitorId) {
  visitorId = 'visitor-' + Math.random().toString(36).slice(2);
  localStorage.setItem('demo-visitor-id', visitorId);
}
if (!accountId) {
  accountId = 'account-' + Math.random().toString(36).slice(2);
  localStorage.setItem('demo-account-id', accountId);
}

pendo.initialize({
  visitor: {
    id: visitorId,
  },
  account: {
    id: accountId,
  },
  sessionReplay: { isActive: true },
});

// Pendo Track Event: the visitor and account IDs are resolved and Pendo has
// started. Module-level code runs once per page load, so this fires once per app start.
window.pendo?.track?.('Visitor identified', {
  is_new_visitor: isNewVisitor,
  is_new_account: isNewAccount,
  session_replay_active: true,
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
