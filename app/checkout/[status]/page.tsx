import Link from "next/link";
import { CheckCircle2, Clock3, XCircle } from "lucide-react";

const content = {
  success: { icon: CheckCircle2, title: "¡Gracias por tu compra!", text: "Recibimos tu pago. Te enviaremos las novedades del pedido por email." },
  pending: { icon: Clock3, title: "Tu pago está pendiente", text: "Mercado Pago está procesando la operación. Te avisaremos cuando se confirme." },
  failure: { icon: XCircle, title: "No pudimos procesar el pago", text: "No se realizó ningún cargo. Podés volver a intentarlo cuando quieras." },
};
export function generateStaticParams() { return Object.keys(content).map((status) => ({ status })); }
export const dynamicParams = false;
export default async function ResultPage({ params }: { params: Promise<{ status: string }> }) { const { status } = await params; const state = content[status as keyof typeof content] ?? content.pending; const Icon = state.icon; return <main className="result-page container"><Icon /><span className="eyebrow">Foxstore</span><h1>{state.title}</h1><p>{state.text}</p><Link href="/" className="button dark">Volver a la tienda</Link></main>; }
