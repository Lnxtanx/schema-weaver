import { useState } from "react";
import { subscribeToNewsletter } from "@/lib/api/blog";

export function BlogSubscribe() {
  const [email, setEmail] = useState("");
  const [subscribeStatus, setSubscribeStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [subscribeMessage, setSubscribeMessage] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribeStatus("loading");

    const result = await subscribeToNewsletter(email);

    if (result.success) {
      setSubscribeStatus("success");
      setSubscribeMessage(result.message);
      setEmail("");
    } else {
      setSubscribeStatus("error");
      setSubscribeMessage(result.message);
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Subscribe to updates</h3>
          <p className="text-sm text-muted-foreground mt-1">Get notified when we publish new updates.</p>
        </div>
        <form onSubmit={handleSubscribe} className="flex gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary w-full md:w-72"
          />
          <button
            type="submit"
            disabled={subscribeStatus === "loading"}
            className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 disabled:opacity-50 cursor-pointer"
          >
            {subscribeStatus === "loading" ? "Subscribing..." : "Subscribe"}
          </button>
        </form>
      </div>
      {subscribeStatus !== "idle" && (
        <p className={`mt-3 text-sm ${subscribeStatus === "success" ? "text-emerald-500 font-medium" : "text-red-500 font-medium"}`}>
          {subscribeMessage}
        </p>
      )}
    </div>
  );
}
