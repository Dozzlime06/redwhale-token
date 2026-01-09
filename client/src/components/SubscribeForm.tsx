import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertSubscriberSchema, type InsertSubscriber } from "@shared/schema";
import { useCreateSubscriber } from "@/hooks/use-subscribers";
import { Loader2, Mail } from "lucide-react";

export function SubscribeForm() {
  const { mutate, isPending } = useCreateSubscriber();
  
  const form = useForm<InsertSubscriber>({
    resolver: zodResolver(insertSubscriberSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: InsertSubscriber) => {
    mutate(data, {
      onSuccess: () => {
        form.reset();
      },
    });
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col sm:flex-row gap-3 w-full max-w-md mx-auto mt-8">
      <div className="relative flex-1">
        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          {...form.register("email")}
          placeholder="Enter your email"
          disabled={isPending}
          className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
        />
        {form.formState.errors.email && (
          <span className="absolute -bottom-6 left-0 text-xs text-red-500">
            {form.formState.errors.email.message}
          </span>
        )}
      </div>
      <button
        type="submit"
        disabled={isPending}
        className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-primary/20 hover:shadow-primary/40 whitespace-nowrap"
      >
        {isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : "Join the School"}
      </button>
    </form>
  );
}
