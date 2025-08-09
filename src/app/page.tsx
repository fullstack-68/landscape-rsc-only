import { getTodos } from "./db";
import { FormInput } from "@/components/FormInput";
import { TodoList } from "@/components/TodoList";

// Force dynamic rendering for a route
// export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Home({ params, searchParams }: PageProps) {
  const todos = await getTodos();
  const message = ((await searchParams)?.message ?? "") as string;
  const curId = ((await searchParams)?.curId ?? "") as string;
  let mode = ((await searchParams)?.mode ?? "ADD") as "ADD" | "EDIT";
  if (mode !== "ADD" && mode !== "EDIT") mode = "ADD";

  console.log({ mode, curId });
  return (
    <main className="container">
      <a href="/">
        <h1>Todo (RSC Only)</h1>
      </a>
      <FormInput message={message} mode={mode} curId={curId} />
      <TodoList todos={todos} mode={mode} curId={curId} />
    </main>
  );
}
