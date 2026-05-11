import '@fortawesome/fontawesome-free/css/all.min.css';
// Se usa el 'default' porque viene de un modulo exportado como 'default',
// pero esta re-exportacion es una del tipo "nombrada" (named export).
export { default as SidebarMenu } from "./components/SidebarMenu"; 
export { default as InputReclamos } from "./components/InputReclamos";
export { default as SelectReclamos } from "./components/SelectReclamos";
export { default as TextAreaReclamos } from "./components/TextAreaReclamos";
