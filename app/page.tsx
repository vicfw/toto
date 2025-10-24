import UsersClient from "@/components/UsersClient";

export default function Page() {
  return (
    <main className="p-6">
      <h1 className="text-xl font-bold mb-4">User List</h1>
      <UsersClient />
    </main>
  );
}
