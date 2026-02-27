import Link from "next/link";
import KeySlot from "./KeySlot";

interface Props {
  searchParams: Promise<{ session_id?: string }>;
}

interface PurchaseData {
  slot_count: number;
  individual_keys: string[];
  email: string;
}

type FetchResult =
  | { ok: true; data: PurchaseData }
  | { ok: false; status: number };

async function fetchPurchaseData(session_id: string): Promise<FetchResult> {
  try {
    const res = await fetch(
      `https://tulipalk.me/editor-collab/webhook/v1/redirect_key?session_id=${session_id}`,
      { cache: "no-store" }
    );
    if (!res.ok) return { ok: false, status: res.status };
    return { ok: true, data: await res.json() };
  } catch {
    return { ok: false, status: 0 };
  }
}

export default async function CheckoutRedirectPage({ searchParams }: Props) {
  const { session_id } = await searchParams;

  if (!session_id) {
    return <ErrorState
      title="Invalid link"
      message="No session ID was provided in the URL, If you believe this is an error on our end, Please contact us."
    />;
  }

  const result = await fetchPurchaseData(session_id);

  if (!result.ok) {
    if (result.status === 404) {
      return <ErrorState
        title="Session not found"
        message="We couldn't find a purchase linked to this session, Please refresh the page or contact us if you believe this is a mistake."
      />;
    }
    if (result.status === 500) {
      return <ErrorState
        title="Server error."
        message="We're experiencing issues on our end right now. Please contact us with your Stripe receipt email in hand and we'll sort it out as soon as possible."
      />;
    }
    return <ErrorState
      title="Something went wrong"
      message="We couldn't retrieve your purchase details. If you just completed your purchase, wait a few seconds and refresh. If the issue persists, contact us."
    />;
  }

  const { data } = result;

  return (
    <main className="min-h-screen bg-ink text-white flex items-center justify-center px-6 py-24">
      <div className="w-full max-w-lg flex flex-col gap-8">

        {/* Header */}
        <div className="flex flex-col items-center text-center gap-3">
          <div
            className="flex h-14 w-14 items-center justify-center rounded-2xl mb-1"
            style={{ background: "rgba(95,213,236,0.12)", border: "1px solid rgba(95,213,236,0.30)" }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="#5FD5EC" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="size-7">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Purchase confirmed!</h1>
          <p className="text-sm text-zinc-400 leading-6 max-w-sm">
            Your {data.slot_count > 1 ? `${data.slot_count} keys have` : "key has"} been sent to{" "}
            <span className="text-white font-medium">{data.email}</span>. Save them somewhere safe.
          </p>
        </div>

        {/* Keys */}
        <div
          className="flex flex-col gap-3 rounded-2xl p-5"
          style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)" }}
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
            Your activation {data.individual_keys.length === 1 ? "key" : "keys"}
          </p>
          {data.individual_keys.map((key, i) => (
            <KeySlot key={i} value={key} />
          ))}
        </div>

        {/* Next steps */}
        <div
          className="flex flex-col gap-3 rounded-2xl p-5"
          style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)" }}
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Next steps</p>
          {[
            "Install Editor Collab via the Geode mod menu if you haven't already.",
            'Open a level in the editor, Press the editor collab button and when its coloured, Go into a level and press the share button.',
            "Enter your key(s), Then press Activate.",
            "Enjoy Hosting!"
          ].map((step, i) => (
            <div key={i} className="flex items-start gap-3">
              <span
                className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold"
                style={{ background: "rgba(95,213,236,0.12)", color: "#5FD5EC" }}
              >
                {i + 1}
              </span>
              <p className="text-sm text-zinc-400 leading-6">{step}</p>
            </div>
          ))}
        </div>

        {/* Footer links */}
        <div className="flex flex-col items-center gap-2 text-center">
          <p className="text-xs text-zinc-500">
            Need help?{" "}
            <Link href="/faq" className="text-zinc-300 underline underline-offset-2 hover:text-white transition-colors">
              Check the FAQ
            </Link>{" "}
            or{" "}
            <Link href="/contact" className="text-zinc-300 underline underline-offset-2 hover:text-white transition-colors">
              Contact us
            </Link>
            .
          </p>
          <Link
            href="/"
            className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors mt-1"
          >
            ← Back to home
          </Link>
        </div>

      </div>
    </main>
  );
}

function ErrorState({ title, message }: { title: string; message: string }) {
  return (
    <main className="min-h-screen bg-ink text-white flex items-center justify-center px-6">
      <div className="w-full max-w-md flex flex-col items-center text-center gap-5">
        <div
          className="flex h-14 w-14 items-center justify-center rounded-2xl"
          style={{ background: "rgba(254,55,148,0.10)", border: "1px solid rgba(254,55,148,0.25)" }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="#FE3794" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="size-7">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
            <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
        </div>
        <h1 className="text-xl font-bold">{title}</h1>
        <p className="text-sm text-zinc-400 leading-6 max-w-sm">{message}</p>
        <Link
          href="/contact"
          className="text-sm text-zinc-300 underline underline-offset-2 hover:text-white transition-colors"
        >
          Contact support
        </Link>
        <Link href="/" className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors">
          ← Back to home
        </Link>
      </div>
    </main>
  );
}
